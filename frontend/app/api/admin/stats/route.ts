import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { db, users, testResults } from "@/db";
import { desc, sql, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // High-level totals
  const totalsRow = await db
    .select({
      userCount: sql<number>`(SELECT COUNT(*)::int FROM "user")`,
      resultCount: sql<number>`(SELECT COUNT(*)::int FROM test_result)`,
      last24h: sql<number>`(SELECT COUNT(*)::int FROM test_result WHERE created_at >= NOW() - INTERVAL '24 hours')`,
      last7d: sql<number>`(SELECT COUNT(*)::int FROM test_result WHERE created_at >= NOW() - INTERVAL '7 days')`,
      last30d: sql<number>`(SELECT COUNT(*)::int FROM test_result WHERE created_at >= NOW() - INTERVAL '30 days')`,
    })
    .from(sql`(SELECT 1) AS placeholder`)
    .limit(1);
  const totals = totalsRow[0];

  // Daily test counts for the last 14 days (for chart)
  const daily = await db.execute<{ day: string; count: number }>(sql`
    SELECT
      to_char(date_trunc('day', created_at), 'YYYY-MM-DD') AS day,
      COUNT(*)::int AS count
    FROM test_result
    WHERE created_at >= NOW() - INTERVAL '14 days'
    GROUP BY day
    ORDER BY day ASC
  `);

  // Top 10 users overall (any difficulty / period)
  const topUsers = await db
    .select({
      userId: users.id,
      email: users.email,
      firstName: users.firstName,
      lastName: users.lastName,
      name: users.name,
      avatarUrl: users.avatarUrl,
      bestWpm: sql<number>`MAX(${testResults.wpm})::int`,
      testCount: sql<number>`COUNT(${testResults.id})::int`,
    })
    .from(users)
    .innerJoin(testResults, eq(testResults.userId, users.id))
    .groupBy(users.id, users.email, users.firstName, users.lastName, users.name, users.avatarUrl)
    .orderBy(desc(sql`MAX(${testResults.wpm})`))
    .limit(10);

  // Recent 20 test results with user info
  const recent = await db
    .select({
      id: testResults.id,
      userId: users.id,
      email: users.email,
      firstName: users.firstName,
      lastName: users.lastName,
      name: users.name,
      avatarUrl: users.avatarUrl,
      language: testResults.language,
      testType: testResults.testType,
      difficulty: testResults.difficulty,
      wpm: testResults.wpm,
      accuracy: testResults.accuracy,
      stars: testResults.stars,
      createdAt: testResults.createdAt,
    })
    .from(testResults)
    .innerJoin(users, eq(users.id, testResults.userId))
    .orderBy(desc(testResults.createdAt))
    .limit(20);

  // All users with their counts (for user-management table)
  const allUsers = await db
    .select({
      id: users.id,
      email: users.email,
      firstName: users.firstName,
      lastName: users.lastName,
      name: users.name,
      avatarUrl: users.avatarUrl,
      createdAt: users.createdAt,
      testCount: sql<number>`COALESCE((SELECT COUNT(*)::int FROM test_result WHERE user_id = ${users.id}), 0)`,
      bestWpm: sql<number>`COALESCE((SELECT MAX(wpm)::int FROM test_result WHERE user_id = ${users.id}), 0)`,
    })
    .from(users)
    .orderBy(desc(users.createdAt))
    .limit(200);

  // Cast Drizzle row results — accuracy comes back as a string (numeric type).
  return NextResponse.json({
    totals: {
      users: totals?.userCount ?? 0,
      results: totals?.resultCount ?? 0,
      last24h: totals?.last24h ?? 0,
      last7d: totals?.last7d ?? 0,
      last30d: totals?.last30d ?? 0,
    },
    daily: daily.rows.map((d) => ({
      day: d.day,
      count: Number(d.count),
    })),
    topUsers: topUsers.map((u) => ({
      ...u,
      bestWpm: Number(u.bestWpm),
      testCount: Number(u.testCount),
    })),
    recent: recent.map((r) => ({
      ...r,
      accuracy: Number(r.accuracy),
    })),
    users: allUsers.map((u) => ({
      ...u,
      testCount: Number(u.testCount),
      bestWpm: Number(u.bestWpm),
    })),
  });
}
