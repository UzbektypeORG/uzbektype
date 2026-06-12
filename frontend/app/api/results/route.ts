import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db, testResults, users } from "@/db";
import { eq, sql } from "drizzle-orm";
import { sendChannelMessage } from "@/lib/telegram";
import { verifyTestToken } from "@/lib/test-token";
import { isBannedEmail } from "@/lib/banned-emails";

// ─── Anti-cheat tuning ──────────────────────────────────────────────────────
// The fastest genuine result on the site is ~131 WPM, so MAX_WPM = 150 leaves
// a real fast typist comfortable headroom while rejecting fabricated scores.
const MAX_WPM = 150;
// Keystroke ceiling: 14 chars/s ≈ 168 net WPM — above any real typist here
// (legit top is ~10.5 cps), lethal to a payload claiming superhuman bursts.
const MAX_CPS = 14;
// A token is good for 15 min — long enough to read the text and run a test,
// short enough to bound replay.
const TOKEN_MAX_AGE_MS = 15 * 60_000;
// Slack between the reported typing duration and real server wall-clock.
const TIME_TOLERANCE_S = 3;

// Anti-cheat rejection response. Crucially this looks IDENTICAL to a normal
// save — HTTP 200, no error, no warning — so a cheater gets zero feedback that
// they were caught. The row is simply never inserted, so it never appears in
// the database or on the leaderboard.
function silentDrop() {
  return NextResponse.json({ id: null, recordType: null });
}

const DIFFICULTY_LABELS: Record<"easy" | "medium" | "hard", string> = {
  easy: "Oson",
  medium: "O'rta",
  hard: "Qiyin",
};

function htmlEscape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// 6 different message styles — picked at random per record so the channel
// doesn't read like the same template every time. Name, difficulty, and WPM
// stay accurate; only the surrounding copy varies.
function buildRecordMessage(
  rawName: string,
  difficulty: "easy" | "medium" | "hard",
  wpm: number
): string {
  const D = DIFFICULTY_LABELS[difficulty];
  const n = htmlEscape(rawName);

  const templates = [
    `🏆 <b>Yangi rekord — ${D} daraja</b>\n\n${n} ${wpm} WPM bilan saytdagi barcha avvalgi natijalardan o'zib ketdi.\n\nuzbektype.uz`,
    `🥇 <b>Rekord sindirildi</b>\n\nDaraja: ${D}\nTezlik: ${wpm} WPM\nLider: ${n}\n\nTabriklaymiz! 👏\n\nuzbektype.uz`,
    `📣 <b>${D} darajada yangi liderlik</b>\n\n${n} ${wpm} WPM ko'rsatkichi bilan saytda yangi rekord egasi bo'ldi.\n\nuzbektype.uz`,
    `🏅 <b>Lider o'zgardi</b>\n\n${D} kategoriyasida — ${n}\nYangi natija: ${wpm} WPM\n\nuzbektype.uz`,
    `🎯 <b>Yangi rekord</b>\n\n👤 Lider: ${n}\n🎚 Daraja: ${D}\n⌨️ Tezlik: ${wpm} WPM\n\nTabriklaymiz!\n\nuzbektype.uz`,
    `📰 <b>${D} — saytda yangi rekord</b>\n\n${n} ${wpm} WPM ga erishib, eski natijani ortda qoldirdi.\n\nuzbektype.uz`,
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const LANGUAGES = ["uz", "en", "ru"] as const;
const TEST_TYPES = ["10s", "30s", "60s", "10w", "30w", "60w"] as const;
const DIFFICULTIES = ["easy", "medium", "hard"] as const;

type Body = {
  language?: unknown;
  testType?: unknown;
  difficulty?: unknown;
  wpm?: unknown;
  accuracy?: unknown;
  stars?: unknown;
  correctChars?: unknown;
  correctedChars?: unknown;
  incorrectChars?: unknown;
  totalChars?: unknown;
  timeElapsed?: unknown;
  token?: unknown;
};

function isInt(v: unknown, min: number, max: number): v is number {
  return typeof v === "number" && Number.isInteger(v) && v >= min && v <= max;
}
function isNum(v: unknown, min: number, max: number): v is number {
  return typeof v === "number" && Number.isFinite(v) && v >= min && v <= max;
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as Body | null;
  if (!body) return NextResponse.json({ error: "invalid_body" }, { status: 400 });

  if (typeof body.language !== "string" || !LANGUAGES.includes(body.language as (typeof LANGUAGES)[number])) {
    return NextResponse.json({ error: "invalid_language" }, { status: 400 });
  }
  if (typeof body.testType !== "string" || !TEST_TYPES.includes(body.testType as (typeof TEST_TYPES)[number])) {
    return NextResponse.json({ error: "invalid_test_type" }, { status: 400 });
  }
  if (typeof body.difficulty !== "string" || !DIFFICULTIES.includes(body.difficulty as (typeof DIFFICULTIES)[number])) {
    return NextResponse.json({ error: "invalid_difficulty" }, { status: 400 });
  }
  if (!isInt(body.wpm, 0, 500)) return NextResponse.json({ error: "invalid_wpm" }, { status: 400 });
  if (!isNum(body.accuracy, 0, 100)) return NextResponse.json({ error: "invalid_accuracy" }, { status: 400 });
  if (!isInt(body.stars, 0, 5)) return NextResponse.json({ error: "invalid_stars" }, { status: 400 });
  if (!isInt(body.correctChars, 0, 100000)) return NextResponse.json({ error: "invalid_correct_chars" }, { status: 400 });
  if (!isInt(body.correctedChars, 0, 100000)) return NextResponse.json({ error: "invalid_corrected_chars" }, { status: 400 });
  if (!isInt(body.incorrectChars, 0, 100000)) return NextResponse.json({ error: "invalid_incorrect_chars" }, { status: 400 });
  if (!isInt(body.totalChars, 0, 100000)) return NextResponse.json({ error: "invalid_total_chars" }, { status: 400 });
  if (!isNum(body.timeElapsed, 0, 600)) return NextResponse.json({ error: "invalid_time_elapsed" }, { status: 400 });

  // ─── Anti-cheat ───────────────────────────────────────────────────────────
  // From here on, nothing the client *claims* about its score is trusted.
  // A valid server-issued token must be present, the timing/char arithmetic
  // must be internally consistent, and WPM/accuracy are RECOMPUTED server-side
  // (the client's `wpm`/`accuracy` are ignored — only the raw chars+time feed
  // the stored values). This is what makes a fabricated 496 WPM impossible.
  // Every failure below returns silentDrop() — a 200 that looks like success
  // but never inserts the row. The cheater sees no error and no warning; the
  // score just never reaches the database or leaderboard.

  // Permanently banned address (repeat offender) — drop regardless of score.
  if (isBannedEmail(session.user.email)) return silentDrop();

  const now = Date.now();
  const token = verifyTestToken(body.token, now, TOKEN_MAX_AGE_MS);
  if (!token) return silentDrop();
  if (
    token.uid !== session.user.id ||
    token.tt !== body.testType ||
    token.df !== body.difficulty ||
    token.lg !== body.language
  ) {
    return silentDrop();
  }

  const t = body.timeElapsed; // seconds, validated 0..600 above
  if (t <= 0 || body.totalChars <= 0) return silentDrop();

  // The reported typing time cannot exceed real wall-clock since the token was
  // issued — you can't claim 60 s of typing 4 s after the test started.
  const wallElapsed = (now - token.iat) / 1000;
  if (t > wallElapsed + TIME_TOLERANCE_S) return silentDrop();

  // Char counts must add up exactly (correct + corrected + incorrect = total).
  if (body.correctChars + body.correctedChars + body.incorrectChars !== body.totalChars) {
    return silentDrop();
  }

  // Recompute the canonical metrics from raw fields, mirroring the client's
  // own formulas (see TypingTest.tsx): WPM uses correct+corrected chars,
  // accuracy uses pure-correct over total. These — not the client's claims —
  // are what we store.
  const serverWpm = Math.round(((body.correctChars + body.correctedChars) / 5 / t) * 60);
  const serverAccuracy = (body.correctChars / body.totalChars) * 100;

  // Physical plausibility ceilings — anything above is dropped silently.
  if (serverWpm > MAX_WPM) return silentDrop();
  if (body.totalChars / t > MAX_CPS) return silentDrop();
  // ──────────────────────────────────────────────────────────────────────────

  // Snapshot the previous all-time max for this difficulty BEFORE inserting,
  // so we can tell whether the incoming row breaks it. Cross-test-type
  // (10s/30s/.../60w) — one record per difficulty, not per category.
  const prevRow = await db.execute<{ maxWpm: number }>(sql`
    SELECT COALESCE(MAX(wpm), 0)::int AS "maxWpm"
    FROM test_result
    WHERE difficulty = ${body.difficulty}
  `);
  const prevMax = Number(prevRow.rows[0]?.maxWpm ?? 0);

  // Snapshot user's previous personal best for this difficulty, so we can
  // distinguish a personal record (beats own best but not global) from a
  // top record (beats global). Same cross-test-type logic.
  const prevUserRow = await db.execute<{ maxWpm: number }>(sql`
    SELECT COALESCE(MAX(wpm), 0)::int AS "maxWpm"
    FROM test_result
    WHERE difficulty = ${body.difficulty} AND user_id = ${session.user.id}
  `);
  const prevUserMax = Number(prevUserRow.rows[0]?.maxWpm ?? 0);

  const [row] = await db
    .insert(testResults)
    .values({
      userId: session.user.id,
      language: body.language,
      testType: body.testType,
      difficulty: body.difficulty,
      wpm: serverWpm,
      accuracy: serverAccuracy.toFixed(2),
      stars: body.stars,
      correctChars: body.correctChars,
      correctedChars: body.correctedChars,
      incorrectChars: body.incorrectChars,
      totalChars: body.totalChars,
      timeElapsed: body.timeElapsed.toFixed(2),
    })
    .returning({ id: testResults.id });

  const beatsGlobal = serverWpm > prevMax;
  const beatsPersonal = serverWpm > prevUserMax;
  const recordType: "top" | "personal" | null = beatsGlobal
    ? "top"
    : beatsPersonal
    ? "personal"
    : null;

  // Telegram announcement when the global record falls. Awaited (not
  // fire-and-forget) because Vercel's serverless runtime kills the function
  // as soon as the response is returned — a void/unawaited fetch never
  // makes it out. announceRecord traps its own errors so a Telegram outage
  // can't fail the result save.
  //
  // Debug mode: setting TELEGRAM_DEBUG_ALL=true posts every saved result
  // to the channel (with a [DEBUG] prefix) so the pipeline can be verified
  // without having to actually break a record. Unset the env var to return
  // to record-only behaviour — no code change needed.
  const debugAll = process.env.TELEGRAM_DEBUG_ALL === "true";
  if (beatsGlobal || debugAll) {
    await announceRecord({
      userId: session.user.id,
      difficulty: body.difficulty as "easy" | "medium" | "hard",
      wpm: serverWpm,
      debug: !beatsGlobal && debugAll,
    });
  }

  return NextResponse.json({ id: row.id, recordType });
}

async function announceRecord(params: {
  userId: string;
  difficulty: "easy" | "medium" | "hard";
  wpm: number;
  debug?: boolean;
}) {
  try {
    const [u] = await db
      .select({
        firstName: users.firstName,
        lastName: users.lastName,
        name: users.name,
      })
      .from(users)
      .where(eq(users.id, params.userId))
      .limit(1);

    const fullName =
      [u?.firstName, u?.lastName].filter(Boolean).join(" ").trim() ||
      u?.name?.trim() ||
      "Anonim";

    const message = params.debug
      ? `🧪 <b>[DEBUG] Test natija</b>\n\nFoydalanuvchi: ${htmlEscape(fullName)}\nDaraja: ${DIFFICULTY_LABELS[params.difficulty]}\nWPM: ${params.wpm}\n\n<i>Bu rekord emas — pipeline tekshiruvi.</i>`
      : buildRecordMessage(fullName, params.difficulty, params.wpm);

    await sendChannelMessage(message);
  } catch {
    // Never throw out of fire-and-forget.
  }
}
