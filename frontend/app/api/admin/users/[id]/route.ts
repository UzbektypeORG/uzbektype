import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { db, users, testResults } from "@/db";
import { desc, eq, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "invalid_id" }, { status: 400 });
  }

  // Profile
  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      firstName: users.firstName,
      lastName: users.lastName,
      avatarUrl: users.avatarUrl,
      image: users.image,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .where(eq(users.id, id))
    .limit(1);

  if (!user) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  // Overall totals
  const [totals] = await db
    .select({
      totalTests: sql<number>`COUNT(*)::int`,
      avgWpm: sql<number>`COALESCE(AVG(${testResults.wpm}), 0)::int`,
      bestWpm: sql<number>`COALESCE(MAX(${testResults.wpm}), 0)::int`,
      avgAccuracy: sql<number>`COALESCE(AVG(${testResults.accuracy}), 0)::float`,
      totalStars: sql<number>`COALESCE(SUM(${testResults.stars}), 0)::int`,
    })
    .from(testResults)
    .where(eq(testResults.userId, id));

  // Per-difficulty breakdown
  const byDifficulty = await db
    .select({
      difficulty: testResults.difficulty,
      count: sql<number>`COUNT(*)::int`,
      bestWpm: sql<number>`MAX(${testResults.wpm})::int`,
      avgWpm: sql<number>`AVG(${testResults.wpm})::int`,
    })
    .from(testResults)
    .where(eq(testResults.userId, id))
    .groupBy(testResults.difficulty);

  // All results (newest first, capped to 200)
  const results = await db
    .select({
      id: testResults.id,
      language: testResults.language,
      testType: testResults.testType,
      difficulty: testResults.difficulty,
      wpm: testResults.wpm,
      accuracy: testResults.accuracy,
      stars: testResults.stars,
      correctChars: testResults.correctChars,
      correctedChars: testResults.correctedChars,
      incorrectChars: testResults.incorrectChars,
      totalChars: testResults.totalChars,
      timeElapsed: testResults.timeElapsed,
      createdAt: testResults.createdAt,
    })
    .from(testResults)
    .where(eq(testResults.userId, id))
    .orderBy(desc(testResults.createdAt))
    .limit(200);

  return NextResponse.json({
    user,
    totals: {
      totalTests: Number(totals?.totalTests ?? 0),
      avgWpm: Number(totals?.avgWpm ?? 0),
      bestWpm: Number(totals?.bestWpm ?? 0),
      avgAccuracy: Math.round(Number(totals?.avgAccuracy ?? 0) * 10) / 10,
      totalStars: Number(totals?.totalStars ?? 0),
    },
    byDifficulty: byDifficulty.map((d) => ({
      difficulty: d.difficulty,
      count: Number(d.count),
      bestWpm: Number(d.bestWpm),
      avgWpm: Number(d.avgWpm),
    })),
    results: results.map((r) => ({
      ...r,
      accuracy: Number(r.accuracy),
      timeElapsed: Number(r.timeElapsed),
    })),
  });
}
