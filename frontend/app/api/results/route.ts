import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db, testResults } from "@/db";

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

  return NextResponse.json({ id: row.id });
}
