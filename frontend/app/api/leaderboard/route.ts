import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db, users, testResults } from "@/db";
import { and, desc, eq, gt, gte, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

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

  // Top: each user's best WPM in this period+difficulty, sorted desc.
  const top = await db
    .select({
      userId: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      name: users.name,
      avatarUrl: users.avatarUrl,
      bestWpm: sql<number>`MAX(${testResults.wpm})::int`.as("best_wpm"),
    })
    .from(users)
    .innerJoin(testResults, eq(testResults.userId, users.id))
    .where(filter)
    .groupBy(users.id, users.firstName, users.lastName, users.name, users.avatarUrl)
    .orderBy(desc(sql`MAX(${testResults.wpm})`))
    .limit(TOP_LIMIT);

  // The current user's rank, if signed in and has at least one result.
  const session = await auth();
  const myId = session?.user?.id ?? null;
  let me: { rank: number; bestWpm: number } | null = null;

  if (myId) {
    const myBestRow = await db
      .select({ best: sql<number>`MAX(${testResults.wpm})::int` })
      .from(testResults)
      .where(start
        ? and(eq(testResults.userId, myId), eq(testResults.difficulty, difficulty), gte(testResults.createdAt, start))
        : and(eq(testResults.userId, myId), eq(testResults.difficulty, difficulty)));
    const myBest = myBestRow[0]?.best;

    if (myBest != null) {
      // Subquery: each user's best WPM in this filter
      const sub = db
        .select({
          userId: testResults.userId,
          best: sql<number>`MAX(${testResults.wpm})::int`.as("best"),
        })
        .from(testResults)
        .where(filter)
        .groupBy(testResults.userId)
        .as("sub");

      const betterRow = await db
        .select({ count: sql<number>`COUNT(*)::int` })
        .from(sub)
        .where(gt(sub.best, myBest));
      const better = betterRow[0]?.count ?? 0;

      me = { rank: better + 1, bestWpm: myBest };
    }
  }

  return NextResponse.json({
    top: top.map((row, i) => ({
      userId: row.userId,
      firstName: row.firstName,
      lastName: row.lastName,
      name: row.name,
      avatarUrl: row.avatarUrl,
      bestWpm: row.bestWpm,
      rank: i + 1,
    })),
    me,
  });
}
