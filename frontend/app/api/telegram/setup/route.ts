import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

// One-off admin helper for pointing the bot at /api/telegram/webhook. The bot
// token is a sensitive Vercel env var (not readable locally), so the server
// makes the call itself. Open while signed in to /admode:
//   GET /api/telegram/setup          → current webhook info (check it's empty
//                                      or ours before replacing it)
//   GET /api/telegram/setup?apply=1  → setWebhook to this deployment's origin
export async function GET(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!token || !secret) {
    return NextResponse.json({ error: "TELEGRAM_BOT_TOKEN or TELEGRAM_WEBHOOK_SECRET not set" }, { status: 500 });
  }

  const api = (method: string, body?: Record<string, unknown>) =>
    fetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body ?? {}),
    }).then((r) => r.json());

  const url = new URL(req.url);
  let applied: unknown = null;
  if (url.searchParams.get("apply") === "1") {
    applied = await api("setWebhook", {
      url: `${url.origin}/api/telegram/webhook`,
      secret_token: secret,
      allowed_updates: ["message", "callback_query"],
    });
  }

  const info = (await api("getWebhookInfo")) as { result?: Record<string, unknown> };
  return NextResponse.json({
    applied,
    webhook: info.result ?? info,
    adminChatIdSet: !!process.env.TELEGRAM_ADMIN_CHAT_ID,
  });
}
