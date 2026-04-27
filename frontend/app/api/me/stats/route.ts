import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db, testResults } from "@/db";
import { desc, eq, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  // Aggregate stats
  const aggRow = await db
    .select({
      totalTests: sql<number>`COUNT(*)::int`,
      avgWpm: sql<number>`COALESCE(AVG(${testResults.wpm}), 0)::int`,
      bestWpm: sql<number>`COALESCE(MAX(${testResults.wpm}), 0)::int`,
      avgAccuracy: sql<number>`COALESCE(AVG(${testResults.accuracy}), 0)::float`,
    })
    .from(testResults)
    .where(eq(testResults.userId, userId));
  const agg = aggRow[0] ?? { totalTests: 0, avgWpm: 0, bestWpm: 0, avgAccuracy: 0 };

  // Last 50 results (used for chart + recent table)
  const recent = await db
    .select({
      id: testResults.id,
      language: testResults.language,
      testType: testResults.testType,
      difficulty: testResults.difficulty,
      wpm: testResults.wpm,
      accuracy: testResults.accuracy,
      stars: testResults.stars,
      createdAt: testResults.createdAt,
    })
    .from(testResults)
    .where(eq(testResults.userId, userId))
    .orderBy(desc(testResults.createdAt))
    .limit(50);

  return NextResponse.json({
    totals: {
      totalTests: Number(agg.totalTests),
      avgWpm: Number(agg.avgWpm),
      bestWpm: Number(agg.bestWpm),
      avgAccuracy: Math.round(Number(agg.avgAccuracy) * 10) / 10,
    },
    recent: recent.map((r) => ({
      ...r,
      accuracy: Number(r.accuracy),
    })),
  });
}
