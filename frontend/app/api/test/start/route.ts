import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { issueTestToken } from "@/lib/test-token";
import { isBannedEmail } from "@/lib/banned-emails";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const LANGUAGES = ["uz", "en", "ru"];
const TEST_TYPES = ["10s", "30s", "60s", "10w", "30w", "60w"];
const DIFFICULTIES = ["easy", "medium", "hard"];

// Issues a short-lived, HMAC-signed token that stamps the real server-side
// start time of a test. The client must present it back to /api/results.
// Anonymous users get 401 (their results aren't saved anyway), so no token.
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // Banned address: hand back a syntactically valid but meaningless token so
  // the UI behaves normally, while /api/results silently drops the result.
  // No error here, so the client shows no warning.
  if (isBannedEmail(session.user.email)) {
    return NextResponse.json({ token: "banned" });
  }

  const body = (await req.json().catch(() => null)) as {
    language?: unknown;
    testType?: unknown;
    difficulty?: unknown;
  } | null;

  const language = body?.language;
  const testType = body?.testType;
  const difficulty = body?.difficulty;

  if (typeof language !== "string" || !LANGUAGES.includes(language)) {
    return NextResponse.json({ error: "invalid_language" }, { status: 400 });
  }
  if (typeof testType !== "string" || !TEST_TYPES.includes(testType)) {
    return NextResponse.json({ error: "invalid_test_type" }, { status: 400 });
  }
  if (typeof difficulty !== "string" || !DIFFICULTIES.includes(difficulty)) {
    return NextResponse.json({ error: "invalid_difficulty" }, { status: 400 });
  }

  const token = issueTestToken(
    { uid: session.user.id, tt: testType, df: difficulty, lg: language },
    Date.now()
  );

  return NextResponse.json({ token });
}
