import { db, users, bannedEmails } from "@/db";
import { eq } from "drizzle-orm";
import { normalizeEmail } from "@/lib/banned-emails";
import { sendAdminMessage, type InlineKeyboard } from "@/lib/telegram";

// Sign-up alert flow, sent to the admin's Telegram DM:
//   alert           → [🚫 Bloklash]
//   ban?:<id>       → [✅ Ha, bloklash] [Bekor qilish]   (guards against mis-taps)
//   ban!:<id>       → email into banned_email, user row deleted → [↩️ Blokdan chiqarish]
//   unban:<id>      → email out of banned_email (deleted data does not come back)
//   cancel:<id>     → back to [🚫 Bloklash]
// <id> is the user id; callback_data is capped at 64 bytes, so no emails in it.

export function htmlEscape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export const keyboards = {
  initial: (id: string): InlineKeyboard => [[{ text: "🚫 Bloklash", callback_data: `ban?:${id}` }]],
  confirm: (id: string): InlineKeyboard => [
    [
      { text: "✅ Ha, bloklash", callback_data: `ban!:${id}` },
      { text: "Bekor qilish", callback_data: `cancel:${id}` },
    ],
  ],
  banned: (id: string): InlineKeyboard => [[{ text: "↩️ Blokdan chiqarish", callback_data: `unban:${id}` }]],
};

export async function sendSignupAlert(user: { id?: string; name?: string | null; email?: string | null }) {
  if (!user.id || !user.email) return;
  const text =
    `🆕 <b>Yangi foydalanuvchi</b>\n\n` +
    `👤 ${htmlEscape(user.name?.trim() || "—")}\n` +
    `📧 ${htmlEscape(user.email)}`;
  await sendAdminMessage(text, keyboards.initial(user.id));
}

// A name passes the link filter on sign-up and gets swapped for an ad later,
// so every rename is reported too, with the same block button.
export async function sendNameChangeAlert(
  user: { id: string; email: string },
  oldName: string,
  newName: string
) {
  const text =
    `✏️ <b>Ism o'zgardi</b>\n\n` +
    `Eski: ${htmlEscape(oldName || "—")}\n` +
    `Yangi: <b>${htmlEscape(newName || "—")}</b>\n` +
    `📧 ${htmlEscape(user.email)}`;
  await sendAdminMessage(text, keyboards.initial(user.id));
}

// Admin-panel bans get a Telegram message too, so they can be undone from
// the same "Blokdan chiqarish" button as bans made in Telegram.
export async function sendPanelBanAlert(user: { id: string; email: string; name: string }) {
  const text =
    `🚫 <b>Admin paneldan bloklandi</b>\n\n` +
    `👤 ${htmlEscape(user.name || "—")}\n` +
    `📧 ${htmlEscape(user.email)}`;
  await sendAdminMessage(text, keyboards.banned(user.id));
}

// Blocks the email and deletes the user (results, sessions and accounts go
// with it via ON DELETE CASCADE, so they're signed out immediately).
// Returns the email, or null if the user no longer exists.
export async function banUser(userId: string): Promise<string | null> {
  const [user] = await db
    .select({ email: users.email })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  if (!user) return null;

  const email = normalizeEmail(user.email);
  await db
    .insert(bannedEmails)
    .values({ email, userId, reason: "telegram" })
    .onConflictDoUpdate({ target: bannedEmails.email, set: { userId } });
  await db.delete(users).where(eq(users.id, userId));
  return email;
}

// Lifts the block so the address can sign up again (as a fresh account).
export async function unbanUser(userId: string): Promise<string | null> {
  const [row] = await db
    .delete(bannedEmails)
    .where(eq(bannedEmails.userId, userId))
    .returning({ email: bannedEmails.email });
  return row?.email ?? null;
}
