import { createHash, randomInt } from "crypto";
import { and, eq, gt, isNull, sql } from "drizzle-orm";
import { db, telegramLogins } from "@/db";
import { telegramApi, callTelegram, type InlineKeyboard } from "@/lib/telegram";

// "Telegram orqali kirish" flow:
//   1. site  → POST /api/telegram-login/start creates a telegram_login row and
//              returns the bot deep link t.me/<bot>?start=login_<id>
//   2. bot   → /start login_<id>: binds the Telegram account to the row, asks
//              the user to join @uzbektype ("Obuna bo'ldim" re-checks), then
//              sends a 6-digit code
//   3. site  → POST /api/telegram-login/verify with the code (+ the row id
//              from an httpOnly cookie) signs the user in
// The code is only valid together with the cookie of the browser that started
// the attempt, and each attempt allows MAX_ATTEMPTS guesses.

export const BOT_USERNAME = "uzbektype_bot";
export const CHANNEL_URL = "https://t.me/uzbektype";
export const LOGIN_COOKIE = "tg_login";
export const LOGIN_TTL_MS = 10 * 60 * 1000;
export const CODE_TTL_MS = 5 * 60 * 1000;
export const MAX_ATTEMPTS = 5;
export const START_PREFIX = "login_";
export const SUB_CHECK_PREFIX = "tgsub:";

export function hashCode(code: string): string {
  return createHash("sha256").update(code).digest("hex");
}

type TgUser = { id: number; first_name?: string; last_name?: string; username?: string };

async function isChannelMember(telegramId: number): Promise<boolean> {
  const channel = process.env.TELEGRAM_CHANNEL_ID;
  if (!channel) return true; // Not configured (local/preview) — don't lock everyone out.
  const member = await telegramApi<{ status: string }>("getChatMember", {
    chat_id: channel,
    user_id: telegramId,
  });
  return !!member && ["creator", "administrator", "member"].includes(member.status);
}

async function findOpenLogin(loginId: string) {
  if (!/^[0-9a-f-]{36}$/.test(loginId)) return null;
  const [row] = await db
    .select()
    .from(telegramLogins)
    .where(
      and(
        eq(telegramLogins.id, loginId),
        isNull(telegramLogins.usedAt),
        gt(telegramLogins.expiresAt, new Date())
      )
    )
    .limit(1);
  return row ?? null;
}

const EXPIRED_TEXT =
  "⏳ Bu kirish havolasi eskirgan.\n\nSaytdagi <b>Telegram orqali kirish</b> tugmasini qaytadan bosing.";

function subscribeKeyboard(loginId: string): InlineKeyboard {
  return [
    [{ text: "📢 Kanalga o'tish", url: CHANNEL_URL }],
    [{ text: "✅ Obuna bo'ldim", callback_data: `${SUB_CHECK_PREFIX}${loginId}` }],
  ];
}

// Issues a fresh code (any earlier one for this attempt stops working).
async function issueCode(loginId: string): Promise<string> {
  const code = randomInt(0, 1_000_000).toString().padStart(6, "0");
  await db
    .update(telegramLogins)
    .set({ codeHash: hashCode(code), attempts: 0, expiresAt: new Date(Date.now() + CODE_TTL_MS) })
    .where(eq(telegramLogins.id, loginId));
  return code;
}

function codeText(code: string): string {
  return (
    `✅ Rahmat, obuna tasdiqlandi!\n\n` +
    `🔐 Kirish kodingiz: <code>${code}</code>\n\n` +
    `Kodni saytdagi maydonga kiriting. U 5 daqiqa amal qiladi.\n` +
    `<i>Kodni hech kimga bermang.</i>`
  );
}

// Bot side of step 2, for "/start login_<id>".
export async function handleLoginStart(chatId: number, from: TgUser, loginId: string) {
  const row = await findOpenLogin(loginId);
  if (!row) {
    await callTelegram("sendMessage", { chat_id: chatId, text: EXPIRED_TEXT, parse_mode: "HTML" });
    return;
  }
  // First Telegram account to open the link owns the attempt.
  if (row.telegramId && row.telegramId !== String(from.id)) {
    await callTelegram("sendMessage", { chat_id: chatId, text: EXPIRED_TEXT, parse_mode: "HTML" });
    return;
  }

  const name = [from.first_name, from.last_name].filter(Boolean).join(" ").trim() || from.username || null;
  await db
    .update(telegramLogins)
    .set({ telegramId: String(from.id), telegramName: name })
    .where(eq(telegramLogins.id, row.id));

  if (!(await isChannelMember(from.id))) {
    await callTelegram("sendMessage", {
      chat_id: chatId,
      text:
        `👋 Assalomu alaykum!\n\n` +
        `UzbekType'ga kirish uchun avval <b>@uzbektype</b> kanaliga obuna bo'ling — ` +
        `yangiliklar va oylik g'oliblar shu yerda e'lon qilinadi.\n\n` +
        `Obuna bo'lgach, <b>«✅ Obuna bo'ldim»</b> tugmasini bosing.`,
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: subscribeKeyboard(row.id) },
    });
    return;
  }

  const code = await issueCode(row.id);
  await callTelegram("sendMessage", { chat_id: chatId, text: codeText(code), parse_mode: "HTML" });
}

// Bot side of the "✅ Obuna bo'ldim" button.
export async function handleSubscribeCheck(cq: {
  id: string;
  from: { id: number };
  data?: string;
  message?: { message_id: number; chat: { id: number } };
}) {
  const loginId = (cq.data ?? "").slice(SUB_CHECK_PREFIX.length);
  const row = await findOpenLogin(loginId);
  if (!row || row.telegramId !== String(cq.from.id) || !cq.message) {
    await callTelegram("answerCallbackQuery", {
      callback_query_id: cq.id,
      text: "Havola eskirgan. Saytda qaytadan boshlang.",
      show_alert: true,
    });
    return;
  }

  if (!(await isChannelMember(cq.from.id))) {
    await callTelegram("answerCallbackQuery", {
      callback_query_id: cq.id,
      text: "Siz hali kanalga obuna bo'lmagansiz. Avval «Kanalga o'tish» ni bosing.",
      show_alert: true,
    });
    return;
  }

  const code = await issueCode(row.id);
  await callTelegram("editMessageText", {
    chat_id: cq.message.chat.id,
    message_id: cq.message.message_id,
    text: codeText(code),
    parse_mode: "HTML",
  });
  await callTelegram("answerCallbackQuery", { callback_query_id: cq.id });
}

// Site side of step 3. Counts the guess first, then compares, so parallel
// requests can't get more than MAX_ATTEMPTS tries.
export async function consumeCode(
  loginId: string,
  code: string
): Promise<{ ok: true; telegramId: string; telegramName: string | null } | { ok: false; error: "expired" | "wrong" | "too_many" }> {
  if (!/^[0-9a-f-]{36}$/.test(loginId)) return { ok: false, error: "expired" };

  const [row] = await db
    .update(telegramLogins)
    .set({ attempts: sql`${telegramLogins.attempts} + 1` })
    .where(
      and(
        eq(telegramLogins.id, loginId),
        isNull(telegramLogins.usedAt),
        gt(telegramLogins.expiresAt, new Date())
      )
    )
    .returning();

  if (!row || !row.codeHash || !row.telegramId) return { ok: false, error: "expired" };
  if (row.attempts > MAX_ATTEMPTS) return { ok: false, error: "too_many" };
  if (row.codeHash !== hashCode(code)) return { ok: false, error: "wrong" };

  // Mark used; the usedAt guard makes a double submit sign in only once.
  const [used] = await db
    .update(telegramLogins)
    .set({ usedAt: new Date() })
    .where(and(eq(telegramLogins.id, row.id), isNull(telegramLogins.usedAt)))
    .returning({ id: telegramLogins.id });
  if (!used) return { ok: false, error: "expired" };

  return { ok: true, telegramId: row.telegramId, telegramName: row.telegramName };
}
