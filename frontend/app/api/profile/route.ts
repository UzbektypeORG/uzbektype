import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db, users } from "@/db";
import { eq } from "drizzle-orm";
import { hasLink } from "@/lib/name-filter";
import { sendNameChangeAlert } from "@/lib/signup-alert";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

// Only the pixel avatars the profile page offers. Anything else would let a
// direct API call put an arbitrary (ad) image on the leaderboard.
const AVATAR_PATTERN = /^https:\/\/api\.dicebear\.com\/7\.x\/pixel-art\/svg\?seed=[a-z0-9]{1,20}$/;

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
    if (hasLink(fn)) return NextResponse.json({ error: "name_has_link" }, { status: 400 });
    update.firstName = fn;
  }
  if (typeof body.lastName === "string") {
    const ln = normalizeName(body.lastName);
    if (ln.length > 30) return NextResponse.json({ error: "last_name_too_long" }, { status: 400 });
    if (hasLink(ln)) return NextResponse.json({ error: "name_has_link" }, { status: 400 });
    update.lastName = ln;
  }
  if (typeof body.avatarUrl === "string") {
    if (!AVATAR_PATTERN.test(body.avatarUrl)) return NextResponse.json({ error: "invalid_avatar" }, { status: 400 });
    update.avatarUrl = body.avatarUrl;
  }

  const [current] = await db
    .select({ email: users.email, firstName: users.firstName, lastName: users.lastName, name: users.name })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);
  if (!current) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const oldName = [current.firstName, current.lastName].filter(Boolean).join(" ");
  const newName = [update.firstName ?? current.firstName, update.lastName ?? current.lastName]
    .filter(Boolean)
    .join(" ");
  // Each half can pass alone while the pair reads as an ad ("Site" + "Uz").
  if (hasLink(newName)) return NextResponse.json({ error: "name_has_link" }, { status: 400 });

  await db.update(users).set(update).where(eq(users.id, session.user.id));

  if (newName !== oldName) {
    // Awaited: a serverless function may be frozen right after responding.
    await sendNameChangeAlert(
      { id: session.user.id, email: current.email },
      oldName || current.name || "",
      newName
    );
  }
  return NextResponse.json({ ok: true });
}
