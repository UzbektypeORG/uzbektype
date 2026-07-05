import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { db } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

// Promo analytics with a time filter, for the admin "Reklama" tab.
// period: all | today | yesterday | month | custom (with month=YYYY-MM)
export async function GET(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const period = searchParams.get("period") || "all";
  const month = searchParams.get("month"); // YYYY-MM for custom

  // Time window, computed with server time so it matches how events are stored.
  let where = sql``;
  if (period === "today") {
    where = sql`WHERE created_at >= date_trunc('day', now())`;
  } else if (period === "yesterday") {
    where = sql`WHERE created_at >= date_trunc('day', now()) - interval '1 day'
                  AND created_at < date_trunc('day', now())`;
  } else if (period === "month") {
    where = sql`WHERE created_at >= date_trunc('month', now())`;
  } else if (period === "custom" && month && /^\d{4}-\d{2}$/.test(month)) {
    const start = `${month}-01`;
    where = sql`WHERE created_at >= ${start}::date
                  AND created_at < (${start}::date + interval '1 month')`;
  }

  const rows = await db.execute<{
    promo: string;
    impressions: number;
    uniqueUsers: number;
    uniqueClickers: number;
    clicks: number;
    dismisses: number;
  }>(sql`
    SELECT
      promo,
      COUNT(*) FILTER (WHERE event = 'impression')::int AS impressions,
      COUNT(DISTINCT anon_id) FILTER (WHERE event = 'impression')::int AS "uniqueUsers",
      COUNT(DISTINCT anon_id) FILTER (WHERE event = 'click')::int AS "uniqueClickers",
      COUNT(*) FILTER (WHERE event = 'click')::int AS clicks,
      COUNT(*) FILTER (WHERE event = 'dismiss')::int AS dismisses
    FROM promo_event
    ${where}
    GROUP BY promo
    ORDER BY impressions DESC
  `);

  return NextResponse.json({
    promo: rows.map((p) => ({
      promo: p.promo,
      impressions: Number(p.impressions),
      uniqueUsers: Number(p.uniqueUsers),
      uniqueClickers: Number(p.uniqueClickers),
      clicks: Number(p.clicks),
      dismisses: Number(p.dismisses),
    })),
  });
}
