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

  // Daily unique visitors for the last year, broken down by signed-in vs guest.
  // Overview slices the tail to render the 14-day chart; the dedicated
  // Tashriflar tab consumes the full range and aggregates to weekly/monthly.
  //
  // Today (CURRENT_DATE) is intentionally EXCLUDED: it's still in progress, so
  // its partial count would render as a misleading dip on the timeline (worst
  // in the morning). The chart therefore ends at yesterday. Note this only
  // affects the time-series — the "Bugun" breakdown tile still counts today.
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
    WHERE visit_date >= CURRENT_DATE - INTERVAL '365 days'
      AND visit_date < CURRENT_DATE
    GROUP BY day
    ORDER BY day ASC
  `);

  // Unique visitors broken down by period and sign-in status.
  // A browser counts as "signed-in" for the period if it has at least one
  // signed-in row inside that period; otherwise it's a guest.
  const visitorRow = await db.execute<{
    todayTotal: number;
    todaySignedIn: number;
    weekTotal: number;
    weekSignedIn: number;
    monthTotal: number;
    monthSignedIn: number;
    allTotal: number;
    allSignedIn: number;
  }>(sql`
    SELECT
      COUNT(DISTINCT anon_id) FILTER (WHERE visit_date = CURRENT_DATE)::int AS "todayTotal",
      COUNT(DISTINCT anon_id) FILTER (WHERE visit_date = CURRENT_DATE AND signed_in)::int AS "todaySignedIn",
      COUNT(DISTINCT anon_id) FILTER (WHERE visit_date >= CURRENT_DATE - INTERVAL '6 days')::int AS "weekTotal",
      COUNT(DISTINCT anon_id) FILTER (WHERE visit_date >= CURRENT_DATE - INTERVAL '6 days' AND signed_in)::int AS "weekSignedIn",
      COUNT(DISTINCT anon_id) FILTER (WHERE visit_date >= CURRENT_DATE - INTERVAL '29 days')::int AS "monthTotal",
      COUNT(DISTINCT anon_id) FILTER (WHERE visit_date >= CURRENT_DATE - INTERVAL '29 days' AND signed_in)::int AS "monthSignedIn",
      COUNT(DISTINCT anon_id)::int AS "allTotal",
      COUNT(DISTINCT anon_id) FILTER (WHERE signed_in)::int AS "allSignedIn"
    FROM daily_visit
  `);
  const v = visitorRow[0];

  function bucket(total: number | undefined, signedIn: number | undefined) {
    const t = Number(total ?? 0);
    const s = Number(signedIn ?? 0);
    return { total: t, signedIn: s, guests: Math.max(0, t - s) };
  }

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
    .limit(200);

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

  // All users with their counts (for user-management table). LEFT JOIN +
  // GROUP BY is more reliable across drivers than scalar subqueries — the
  // earlier subquery form returned 0/null for bestWpm in production.
  const allUsers = await db
    .select({
      id: users.id,
      email: users.email,
      firstName: users.firstName,
      lastName: users.lastName,
      name: users.name,
      avatarUrl: users.avatarUrl,
      createdAt: users.createdAt,
      testCount: sql<number>`COUNT(${testResults.id})::int`,
      bestWpm: sql<number>`COALESCE(MAX(${testResults.wpm}), 0)::int`,
    })
    .from(users)
    .leftJoin(testResults, eq(testResults.userId, users.id))
    .groupBy(
      users.id,
      users.email,
      users.firstName,
      users.lastName,
      users.name,
      users.avatarUrl,
      users.createdAt
    )
    .orderBy(desc(users.createdAt))
    .limit(200);

  // Promo analytics — per-promo impressions, unique viewers (by anon_id),
  // CTA clicks and dismissals. Powers the "Reklama" tab.
  const promoRows = await db.execute<{
    promo: string;
    impressions: number;
    uniqueUsers: number;
    clicks: number;
    dismisses: number;
  }>(sql`
    SELECT
      promo,
      COUNT(*) FILTER (WHERE event = 'impression')::int AS impressions,
      COUNT(DISTINCT anon_id) FILTER (WHERE event = 'impression')::int AS "uniqueUsers",
      COUNT(*) FILTER (WHERE event = 'click')::int AS clicks,
      COUNT(*) FILTER (WHERE event = 'dismiss')::int AS dismisses
    FROM promo_event
    GROUP BY promo
    ORDER BY impressions DESC
  `);

  // Cast Drizzle row results — accuracy comes back as a string (numeric type).
  return NextResponse.json({
    promo: promoRows.map((p) => ({
      promo: p.promo,
      impressions: Number(p.impressions),
      uniqueUsers: Number(p.uniqueUsers),
      clicks: Number(p.clicks),
      dismisses: Number(p.dismisses),
    })),
    totals: {
      users: totals?.userCount ?? 0,
      results: totals?.resultCount ?? 0,
      last24h: totals?.last24h ?? 0,
      last7d: totals?.last7d ?? 0,
      last30d: totals?.last30d ?? 0,
    },
    daily: daily.map((d) => ({
      day: d.day,
      count: Number(d.count),
    })),
    visitorTimeline: dailyVisitorRows.map((d) => ({
      day: d.day,
      total: Number(d.total),
      signedIn: Number(d.signedIn),
      guests: Number(d.guests),
    })),
    visitorBreakdown: {
      today: bucket(v?.todayTotal, v?.todaySignedIn),
      week: bucket(v?.weekTotal, v?.weekSignedIn),
      month: bucket(v?.monthTotal, v?.monthSignedIn),
      allTime: bucket(v?.allTotal, v?.allSignedIn),
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
