import { NextResponse } from "next/server";
import { callTelegram } from "@/lib/telegram";
import { banUser, unbanUser, keyboards, htmlEscape } from "@/lib/signup-alert";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

// Telegram bot webhook. Handles the buttons on the admin's sign-up alerts
// (see lib/signup-alert.ts) and answers /start with the chat id, which is
// what TELEGRAM_ADMIN_CHAT_ID must be set to.
//
// Trust: Telegram echoes TELEGRAM_WEBHOOK_SECRET (given to setWebhook) in a
// header, and every button press must come from the admin's own account.

type CallbackQuery = {
  id: string;
  from: { id: number };
  data?: string;
  message?: { message_id: number; chat: { id: number }; text?: string };
};

type Update = {
  message?: { chat: { id: number }; text?: string };
  callback_query?: CallbackQuery;
};

// Status line appended under the alert text; stripped again before re-editing.
const STATUS_SEP = "\n\n━━━━━━━━\n";

export async function POST(req: Request) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!secret || req.headers.get("x-telegram-bot-api-secret-token") !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const update = (await req.json().catch(() => null)) as Update | null;
  if (!update) return NextResponse.json({ ok: true });

  if (update.message?.text?.startsWith("/start")) {
    await callTelegram("sendMessage", {
      chat_id: update.message.chat.id,
      text: `Chat ID: <code>${update.message.chat.id}</code>`,
      parse_mode: "HTML",
    });
    return NextResponse.json({ ok: true });
  }

  const cq = update.callback_query;
  if (cq) await handleCallback(cq);

  // Always 200, otherwise Telegram keeps retrying the same update.
  return NextResponse.json({ ok: true });
}

async function handleCallback(cq: CallbackQuery) {
  const adminId = process.env.TELEGRAM_ADMIN_CHAT_ID;
  if (!adminId || String(cq.from.id) !== adminId) {
    await callTelegram("answerCallbackQuery", { callback_query_id: cq.id, text: "Ruxsat yo'q" });
    return;
  }

  const [action, userId] = (cq.data ?? "").split(":");
  const msg = cq.message;
  if (!msg || !userId) {
    await callTelegram("answerCallbackQuery", { callback_query_id: cq.id });
    return;
  }

  const target = { chat_id: msg.chat.id, message_id: msg.message_id };
  const baseText = htmlEscape((msg.text ?? "").split(STATUS_SEP)[0]);
  const setStatus = (status: string, keyboard: ReturnType<typeof keyboards.initial>) =>
    callTelegram("editMessageText", {
      ...target,
      text: `${baseText}${STATUS_SEP}${status}`,
      parse_mode: "HTML",
      disable_web_page_preview: true,
      reply_markup: { inline_keyboard: keyboard },
    });

  let toast = "";
  switch (action) {
    case "ban?":
      await callTelegram("editMessageReplyMarkup", {
        ...target,
        reply_markup: { inline_keyboard: keyboards.confirm(userId) },
      });
      break;
    case "cancel":
      await callTelegram("editMessageReplyMarkup", {
        ...target,
        reply_markup: { inline_keyboard: keyboards.initial(userId) },
      });
      break;
    case "ban!": {
      const email = await banUser(userId);
      if (email) {
        await setStatus("🚫 <b>Bloklandi</b> — saytdan o'chirildi, qayta ro'yxatdan o'ta olmaydi", keyboards.banned(userId));
        toast = "Bloklandi";
      } else {
        await setStatus("⚠️ Foydalanuvchi allaqachon o'chirilgan", []);
        toast = "Foydalanuvchi topilmadi";
      }
      break;
    }
    case "unban": {
      const email = await unbanUser(userId);
      await setStatus(
        email ? "↩️ <b>Blokdan chiqarildi</b> — qayta ro'yxatdan o'ta oladi" : "⚠️ Blok topilmadi",
        []
      );
      toast = email ? "Blokdan chiqarildi" : "Blok topilmadi";
      break;
    }
  }

  await callTelegram("answerCallbackQuery", { callback_query_id: cq.id, ...(toast && { text: toast }) });
}
