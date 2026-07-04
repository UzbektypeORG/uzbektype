import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

// Lightweight admin-status probe for client components (e.g. the leaderboard
// deciding whether to expose the admin-only "all-time" filter). Reads the
// signed admin cookie — no body, no DB.
export async function GET() {
  return NextResponse.json({ isAdmin: await isAdmin() });
}
