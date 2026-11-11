import { NextResponse } from "next/server";
import { lt } from "drizzle-orm";
import { db, telegramLogins } from "@/db";
import { BOT_USERNAME, CODE_TTL_MS, LOGIN_COOKIE, LOGIN_TTL_MS, START_PREFIX } from "@/lib/telegram-login";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

// Step 1 of "Telegram orqali kirish" (see lib/telegram-login.ts): open an
// attempt and hand back the bot deep link for it.
export async function POST(req: Request) {
  // Opportunistic cleanup instead of a cron — attempts are tiny and short-lived.
  await db
    .delete(telegramLogins)
    .where(lt(telegramLogins.expiresAt, new Date(Date.now() - 24 * 60 * 60 * 1000)))
    .catch(() => {});

  const [row] = await db
    .insert(telegramLogins)
    .values({ expiresAt: new Date(Date.now() + LOGIN_TTL_MS) })
    .returning({ id: telegramLogins.id });

  const res = NextResponse.json({ url: `https://t.me/${BOT_USERNAME}?start=${START_PREFIX}${row.id}` });
  res.cookies.set(LOGIN_COOKIE, row.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: new URL(req.url).protocol === "https:",
    path: "/api/telegram-login",
    // A code issued at the very end of the attempt window still gets its full life.
    maxAge: (LOGIN_TTL_MS + CODE_TTL_MS) / 1000,
  });
  return res;
}
