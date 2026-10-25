import { db, bannedEmails } from "@/db";
import { eq } from "drizzle-orm";

// Emails permanently blocked from the site. Repeat cheaters whose accounts we
// deleted can simply sign in again with the same Google identity and
// re-create a fresh user row — so deletion alone is whack-a-mole. A banned
// address can't sign in (auth signIn callback), gets no test token, and has
// its result POSTs rejected, no matter how many times it tries.
//
// Two sources: this hard-coded list (older bans) and the banned_email table,
// filled by the "Bloklash" button on the admin's Telegram sign-up alerts.
//
// Keep entries lower-cased; comparison is case-insensitive and trimmed.
const BANNED = new Set<string>([
  "abdurahmonkarimov453@gmail.com", // 488 WPM then 197 WPM — fabricated scores, twice
  "jaloliddindavlatov0@gmail.com", // "Rezzy Top" — burst-topped every difficulty then vanished
  "arslonovalisher095@gmail.com", // topped every difficulty; had a duplicate account too
]);

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function isBannedEmail(email: string | null | undefined): Promise<boolean> {
  if (!email) return false;
  const e = normalizeEmail(email);
  if (BANNED.has(e)) return true;
  const [row] = await db
    .select({ email: bannedEmails.email })
    .from(bannedEmails)
    .where(eq(bannedEmails.email, e))
    .limit(1);
  return !!row;
}
