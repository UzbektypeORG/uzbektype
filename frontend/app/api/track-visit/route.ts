import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db, dailyVisits } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { anonId?: unknown } | null;
  if (!body || typeof body.anonId !== "string") {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  // Browser-supplied UUID — trim and length-cap defensively.
  const anonId = body.anonId.slice(0, 64);
  if (!anonId) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const session = await auth();
  const signedIn = Boolean(session?.user?.id);

  // Insert one row per (anon_id, day). Repeat pings on the same day are silently
  // ignored so the table stays at "unique browsers per day".
  await db.execute(sql`
    INSERT INTO daily_visit (anon_id, visit_date, signed_in)
    VALUES (${anonId}, CURRENT_DATE, ${signedIn})
    ON CONFLICT (anon_id, visit_date) DO UPDATE
      SET signed_in = daily_visit.signed_in OR EXCLUDED.signed_in
  `);

  return new NextResponse(null, { status: 204 });
}
