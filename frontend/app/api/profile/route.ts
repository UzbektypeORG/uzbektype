import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db, users } from "@/db";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

function normalizeName(value: string): string {
  return value
    .trim()
    .toLocaleLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toLocaleUpperCase() + w.slice(1))
    .join(" ");
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as
    | { firstName?: unknown; lastName?: unknown; avatarUrl?: unknown }
    | null;
  if (!body) return NextResponse.json({ error: "invalid_body" }, { status: 400 });

  const update: { firstName?: string; lastName?: string; avatarUrl?: string; updatedAt: Date } = {
    updatedAt: new Date(),
  };

  if (typeof body.firstName === "string") {
    const fn = normalizeName(body.firstName);
    if (fn.length > 30) return NextResponse.json({ error: "first_name_too_long" }, { status: 400 });
    update.firstName = fn;
  }
  if (typeof body.lastName === "string") {
    const ln = normalizeName(body.lastName);
    if (ln.length > 30) return NextResponse.json({ error: "last_name_too_long" }, { status: 400 });
    update.lastName = ln;
  }
  if (typeof body.avatarUrl === "string") {
    if (body.avatarUrl.length > 2048) return NextResponse.json({ error: "avatar_url_too_long" }, { status: 400 });
    update.avatarUrl = body.avatarUrl;
  }

  await db.update(users).set(update).where(eq(users.id, session.user.id));
  return NextResponse.json({ ok: true });
}
