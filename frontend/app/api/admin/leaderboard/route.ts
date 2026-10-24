import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { db, users, testResults } from "@/db";
import { and, desc, eq, gte, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

// Admin view of exactly what the public leaderboard shows for a period +
// difficulty (same query and limit as /api/leaderboard), plus email so the
// admin can tell accounts apart and act on them.

const PERIODS = ["weekly", "monthly", "alltime"] as const;
const DIFFICULTIES = ["easy", "medium", "hard"] as const;
type Period = (typeof PERIODS)[number];
type Difficulty = (typeof DIFFICULTIES)[number];

const TOP_LIMIT = 25;

function periodStart(p: Period): Date | null {
  if (p === "alltime") return null;
  const days = p === "weekly" ? 7 : 30;
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}

export async function GET(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const period = url.searchParams.get("period") as Period | null;
  const difficulty = url.searchParams.get("difficulty") as Difficulty | null;

  if (!period || !PERIODS.includes(period)) {
    return NextResponse.json({ error: "invalid_period" }, { status: 400 });
  }
  if (!difficulty || !DIFFICULTIES.includes(difficulty)) {
    return NextResponse.json({ error: "invalid_difficulty" }, { status: 400 });
  }

  const start = periodStart(period);
  const filter = start
    ? and(eq(testResults.difficulty, difficulty), gte(testResults.createdAt, start))
    : eq(testResults.difficulty, difficulty);

  const top = await db
    .select({
      userId: users.id,
      email: users.email,
      firstName: users.firstName,
      lastName: users.lastName,
      name: users.name,
      avatarUrl: users.avatarUrl,
      bestWpm: sql<number>`MAX(${testResults.wpm})::int`.as("best_wpm"),
      avgAccuracy: sql<number>`AVG(${testResults.accuracy})::float`.as("avg_accuracy"),
      testCount: sql<number>`COUNT(*)::int`.as("test_count"),
    })
    .from(users)
    .innerJoin(testResults, eq(testResults.userId, users.id))
    .where(filter)
    .groupBy(users.id, users.email, users.firstName, users.lastName, users.name, users.avatarUrl)
    .orderBy(desc(sql`MAX(${testResults.wpm})`))
    .limit(TOP_LIMIT);

  return NextResponse.json({
    top: top.map((row, i) => ({
      ...row,
      avgAccuracy: Math.round(Number(row.avgAccuracy) * 10) / 10,
      testCount: Number(row.testCount),
      rank: i + 1,
    })),
  });
}
