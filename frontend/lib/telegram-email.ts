// Telegram accounts have no email, but the whole ban flow (banned_email,
// isBannedEmail) and user.email NOT NULL key off one. A stable per-account
// address under our own domain keeps all of that working unchanged. No
// server imports here, so the UI can use it to hide the address.

export function telegramEmail(telegramId: string): string {
  return `tg${telegramId}@telegram.uzbektype.uz`;
}

export function telegramIdFromEmail(email: string | null | undefined): string | null {
  const m = email?.match(/^tg(\d+)@telegram\.uzbektype\.uz$/);
  return m ? m[1] : null;
}
