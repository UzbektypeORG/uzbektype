/**
 * Send a plain message to the configured Telegram channel.
 *
 * Returns silently when env vars are missing so local dev / preview deploys
 * don't surface noise. Network failures are also swallowed — call this as
 * fire-and-forget; never block a user-facing response on it.
 */
export async function sendChannelMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHANNEL_ID;
  if (!token || !chatId) {
    console.warn("[telegram] env vars missing — TELEGRAM_BOT_TOKEN or TELEGRAM_CHANNEL_ID not set");
    return;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "<no body>");
      console.error(`[telegram] sendMessage HTTP ${res.status}: ${body.slice(0, 500)}`);
      return;
    }
    console.log("[telegram] sendMessage ok");
  } catch (err) {
    console.error("[telegram] sendMessage threw:", err);
  }
}

// ─── Admin DM (sign-up alerts with a "Bloklash" button) ────────────────────
// Same bot as the channel posts, but sent to the admin's private chat
// (TELEGRAM_ADMIN_CHAT_ID — numeric id; the admin must /start the bot once).
// Button presses come back to /api/telegram/webhook.

export type InlineKeyboard = { text: string; callback_data: string }[][];

export async function callTelegram(method: string, payload: Record<string, unknown>): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.warn(`[telegram] ${method} skipped — TELEGRAM_BOT_TOKEN not set`);
    return;
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "<no body>");
      console.error(`[telegram] ${method} HTTP ${res.status}: ${body.slice(0, 500)}`);
    }
  } catch (err) {
    console.error(`[telegram] ${method} threw:`, err);
  }
}

export async function sendAdminMessage(text: string, keyboard?: InlineKeyboard): Promise<void> {
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
  if (!chatId) {
    console.warn("[telegram] admin alert skipped — TELEGRAM_ADMIN_CHAT_ID not set");
    return;
  }
  await callTelegram("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    ...(keyboard && { reply_markup: { inline_keyboard: keyboard } }),
  });
}
