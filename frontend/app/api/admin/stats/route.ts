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

  // Daily unique visitors for the last 14 days, broken down by signed-in vs guest.
  const dailyVisitorRows = await db.execute<{
    day: string;
    total: number;
    signedIn: number;
    guests: number;
  }>(sql`
    SELECT
      to_char(visit_date, 'YYYY-MM-DD') AS day,
      COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE signed_in)::int AS "signedIn",
      COUNT(*) FILTER (WHERE NOT signed_in)::int AS guests
    FROM daily_visit
    WHERE visit_date >= CURRENT_DATE - INTERVAL '13 days'
    GROUP BY day
    ORDER BY day ASC
  `);

  // Rolling unique visitor totals (anon_id is unique per browser).
  const visitorTotalsRow = await db.execute<{
    today: number;
    last7d: number;
    last30d: number;
    todayGuests: number;
    last7dGuests: number;
    last30dGuests: number;
  }>(sql`
    SELECT
      COUNT(DISTINCT anon_id) FILTER (WHERE visit_date = CURRENT_DATE)::int AS today,
      COUNT(DISTINCT anon_id) FILTER (WHERE visit_date >= CURRENT_DATE - INTERVAL '6 days')::int AS "last7d",
      COUNT(DISTINCT anon_id) FILTER (WHERE visit_date >= CURRENT_DATE - INTERVAL '29 days')::int AS "last30d",
      COUNT(DISTINCT anon_id) FILTER (WHERE visit_date = CURRENT_DATE AND NOT signed_in)::int AS "todayGuests",
      COUNT(DISTINCT anon_id) FILTER (WHERE visit_date >= CURRENT_DATE - INTERVAL '6 days' AND NOT signed_in)::int AS "last7dGuests",
      COUNT(DISTINCT anon_id) FILTER (WHERE visit_date >= CURRENT_DATE - INTERVAL '29 days' AND NOT signed_in)::int AS "last30dGuests"
    FROM daily_visit
    WHERE visit_date >= CURRENT_DATE - INTERVAL '29 days'
  `);
  const visitorTotals = visitorTotalsRow.rows[0];

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
    dailyVisitors: dailyVisitorRows.rows.map((d) => ({
      day: d.day,
      total: Number(d.total),
      signedIn: Number(d.signedIn),
      guests: Number(d.guests),
    })),
    visitorTotals: {
      today: visitorTotals?.today ?? 0,
      last7d: visitorTotals?.last7d ?? 0,
      last30d: visitorTotals?.last30d ?? 0,
      todayGuests: visitorTotals?.todayGuests ?? 0,
      last7dGuests: visitorTotals?.last7dGuests ?? 0,
      last30dGuests: visitorTotals?.last30dGuests ?? 0,
    },
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
