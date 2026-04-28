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
  if (!token || !chatId) return;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
  } catch {
    // Swallowed — see comment above.
  }
}
