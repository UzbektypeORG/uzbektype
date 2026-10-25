// Users were turning their leaderboard name into free advertising
// ("Ali nimadir.uz", "www.site.com", "t.me/kanal", "@kanal"). Shared by the
// profile API (rejects such names on save), displayName() (masks names saved
// before this check existed) and the admin panel (flags them for deletion).

// Common TLDs, used only for the spaced/obfuscated forms ("site . uz",
// "site[.]com", "site dot lol") — a plain "site.uz" is caught by LINK_PATTERN.
const TLDS =
  "uz|com|ru|net|org|io|me|app|dev|xyz|lol|site|online|store|shop|pro|info|co|ai|tech|top|club|link|fun|biz|tv|gg|cc|su|kz|tj|kg|tk|ml|ga|cf|bot";

// A TLD written as its own word, dot dropped ("qalamtype Uz"). Narrower than
// TLDS on purpose: words like "pro", "top" or "dev" are plausible nicknames.
const BARE_TLDS = "uz|com|ru|net|org|io|xyz|lol|online|site|store|info|biz|su|kz|tk|уз|ком";

// Competing typing sites advertise under their brand alone, no TLD at all.
// Named explicitly: a bare "type" would also catch nicknames like "Typer".
// "type\s*uz" covers glued forms such as "QalamTypeUz".
const BRANDS =
  "qalam\\s*type|қалам\\s*тайп|калам\\s*тайп|monkey\\s*type|ratatype|typeracer|typingclub|fastfingers|klavogonki|keybr|type\\s*uz";

const LINK_PATTERN = new RegExp(
  [
    "https?:",
    "://",
    "www",
    "t\\s*\\.\\s*me",
    "@\\w", // Telegram / Instagram handle
    "\\.[a-z0-9]", // "site.uz" — real names never have a dot glued to letters
    `(\\.|\\[\\s*\\.\\s*\\]|\\(\\s*\\.\\s*\\)|\\bdot\\b)\\s*(${TLDS})\\b`,
    `(^|\\s)(${BARE_TLDS})(\\s|$)`,
    BRANDS,
  ].join("|"),
  "i"
);

export function hasLink(value: string | null | undefined): boolean {
  return !!value && LINK_PATTERN.test(value);
}

// Drops every word that carries a link; "Ali nimadir.uz" → "Ali". Spaced
// forms ("site . uz") don't split into a single bad word, so if a link is
// still there after filtering, nothing of the name is kept.
export function stripLinks(value: string): string {
  if (!hasLink(value)) return value;
  const kept = value
    .split(/\s+/)
    .filter((w) => w && !hasLink(w))
    .join(" ")
    .trim();
  return hasLink(kept) ? "" : kept;
}
