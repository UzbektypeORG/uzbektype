// Emails permanently blocked from saving results. Repeat cheaters whose
// accounts we deleted can simply sign in again with the same Google identity
// and re-create a fresh user row — so deletion alone is whack-a-mole. Any
// address listed here gets no test token and has its result POSTs rejected,
// no matter how many times the account is recreated.
//
// Keep entries lower-cased; comparison is case-insensitive and trimmed.
const BANNED = new Set<string>([
  "abdurahmonkarimov453@gmail.com", // 488 WPM then 197 WPM — fabricated scores, twice
]);

export function isBannedEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return BANNED.has(email.trim().toLowerCase());
}
