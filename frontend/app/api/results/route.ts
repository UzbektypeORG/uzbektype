import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db, testResults, users } from "@/db";
import { eq, sql } from "drizzle-orm";
import { sendChannelMessage } from "@/lib/telegram";

const DIFFICULTY_LABELS: Record<"easy" | "medium" | "hard", string> = {
  easy: "osonda",
  medium: "o'rtada",
  hard: "qiyinda",
};

function htmlEscape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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

  // Snapshot the previous all-time max for this difficulty BEFORE inserting,
  // so we can tell whether the incoming row breaks it. Cross-test-type
  // (10s/30s/.../60w) — one record per difficulty, not per category.
  const prevRow = await db.execute<{ maxWpm: number }>(sql`
    SELECT COALESCE(MAX(wpm), 0)::int AS "maxWpm"
    FROM test_result
    WHERE difficulty = ${body.difficulty}
  `);
  const prevMax = Number(prevRow.rows[0]?.maxWpm ?? 0);

  const [row] = await db
    .insert(testResults)
    .values({
      userId: session.user.id,
      language: body.language,
      testType: body.testType,
      difficulty: body.difficulty,
      wpm: body.wpm,
      accuracy: body.accuracy.toFixed(2),
      stars: body.stars,
      correctChars: body.correctChars,
      correctedChars: body.correctedChars,
      incorrectChars: body.incorrectChars,
      totalChars: body.totalChars,
      timeElapsed: body.timeElapsed.toFixed(2),
    })
    .returning({ id: testResults.id });

  // Fire-and-forget Telegram announcement when the global record falls.
  if (body.wpm > prevMax) {
    void announceRecord({
      userId: session.user.id,
      difficulty: body.difficulty,
      wpm: body.wpm,
    });
  }

  return NextResponse.json({ id: row.id });
}

async function announceRecord(params: {
  userId: string;
  difficulty: "easy" | "medium" | "hard";
  wpm: number;
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

    const text =
      `🏆 <b>Rekord yangilandi</b>\n\n` +
      `${htmlEscape(fullName)} ${DIFFICULTY_LABELS[params.difficulty]} rekord urdi\n` +
      `WPM ${params.wpm}`;

    await sendChannelMessage(text);
  } catch {
    // Never throw out of fire-and-forget.
  }
}
