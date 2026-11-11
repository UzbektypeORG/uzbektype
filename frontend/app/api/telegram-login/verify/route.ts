import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { eq } from "drizzle-orm";
import { db, users, sessions } from "@/db";
import { isBannedEmail } from "@/lib/banned-emails";
import { sendSignupAlert } from "@/lib/signup-alert";
import { LOGIN_COOKIE, consumeCode } from "@/lib/telegram-login";
import { telegramEmail } from "@/lib/telegram-email";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

// Auth.js defaults (database strategy): 30-day session, cookie name with the
// __Secure- prefix on https. Kept in sync by hand since we create the session
// row ourselves — Auth.js's Credentials provider can't use database sessions.
const SESSION_MAX_AGE = 30 * 24 * 60 * 60;

// Step 3 of "Telegram orqali kirish" (see lib/telegram-login.ts).
export async function POST(req: Request) {
  const loginId = req.headers.get("cookie")?.match(new RegExp(`(?:^|; )${LOGIN_COOKIE}=([^;]+)`))?.[1];
  const body = (await req.json().catch(() => null)) as { code?: unknown } | null;
  const code = typeof body?.code === "string" ? body.code.replace(/\D/g, "") : "";

  if (!loginId) return NextResponse.json({ error: "expired" }, { status: 400 });
  if (code.length !== 6) return NextResponse.json({ error: "wrong" }, { status: 400 });

  const result = await consumeCode(loginId, code);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });

  const email = telegramEmail(result.telegramId);
  if (await isBannedEmail(email)) return NextResponse.json({ error: "banned" }, { status: 403 });

  let [user] = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1);
  if (!user) {
    [user] = await db
      .insert(users)
      .values({ email, name: result.telegramName })
      .returning({ id: users.id });
    await sendSignupAlert({ id: user.id, name: result.telegramName, email });
  }

  const sessionToken = randomBytes(32).toString("hex");
  await db.insert(sessions).values({
    sessionToken,
    userId: user.id,
    expires: new Date(Date.now() + SESSION_MAX_AGE * 1000),
  });

  const secure = new URL(req.url).protocol === "https:";
  const res = NextResponse.json({ ok: true });
  res.cookies.set(`${secure ? "__Secure-" : ""}authjs.session-token`, sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  res.cookies.delete({ name: LOGIN_COOKIE, path: "/api/telegram-login" });
  return res;
}
