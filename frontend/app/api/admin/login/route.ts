import { NextResponse } from "next/server";
import { checkCredentials, setAdminCookie } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { username?: unknown; password?: unknown }
    | null;
  if (!body || typeof body.username !== "string" || typeof body.password !== "string") {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  if (!checkCredentials(body.username, body.password)) {
    return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
  }

  await setAdminCookie();
  return NextResponse.json({ ok: true });
}
