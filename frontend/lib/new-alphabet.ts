// The 2026 Uzbek Latin alphabet (law O'RQ-1184, signed 21.10.2026, in force
// 22.04.2027): Oʻ→Ö, Gʻ→Ğ, Sh→Ş, Ch→Ç; 28 letters + the tutuq sign (ʼ).
// Shared by the /yangi-alifbo practice page and its converter tool.

export const NEW_ALPHABET = [
  "A", "B", "D", "E", "F", "G", "Ğ", "H", "I", "J", "K", "L", "M", "N",
  "O", "Ö", "P", "Q", "R", "S", "Ş", "Ç", "T", "U", "V", "X", "Y", "Z",
] as const;

export const LETTER_CHANGES = [
  { old: "Oʻ oʻ", new: "Ö ö", example: { old: "oʻzbek", new: "özbek" } },
  { old: "Gʻ gʻ", new: "Ğ ğ", example: { old: "gʻisht", new: "ğişt" } },
  { old: "Sh sh", new: "Ş ş", example: { old: "shahar", new: "şahar" } },
  { old: "Ch ch", new: "Ç ç", example: { old: "choy", new: "çoy" } },
] as const;

// After o/g, an apostrophe of any shape is the oʻ/gʻ mark: Uzbek spelling
// has no o/g + tutuq words (moʻjiza, moʻtabar are oʻ words too). After any
// other letter (maʼno, sheʼr) the apostrophe is the tutuq and stays.
const OKINA = "['ʻ‘’`ʼ]";

function matchCase(src: string, lower: string, upper: string): string {
  return src === src.toUpperCase() ? upper : lower;
}

export function toNewAlphabet(text: string): string {
  return (
    text
      .replace(new RegExp(`([Oo])${OKINA}`, "g"), (_m, o: string) => matchCase(o, "ö", "Ö"))
      .replace(new RegExp(`([Gg])${OKINA}`, "g"), (_m, g: string) => matchCase(g, "ğ", "Ğ"))
      .replace(/([Ss])([Hh])/g, (_m, s: string) => matchCase(s, "ş", "Ş"))
      .replace(/([Cc])([Hh])/g, (_m, c: string) => matchCase(c, "ç", "Ç"))
  );
}

// ─── Typing helpers ─────────────────────────────────────────────────────────
// Keyboards don't have Ö Ğ Ş Ç yet, so the practice test accepts the old
// two-key spelling and folds it into the new letter: o' → ö, sh → ş, etc.

const COMBOS: Record<string, { base: string; modifiers: string }> = {
  ö: { base: "o", modifiers: "'ʻ‘’`ʼ" },
  ğ: { base: "g", modifiers: "'ʻ‘’`ʼ" },
  ş: { base: "s", modifiers: "hH" },
  ç: { base: "c", modifiers: "hH" },
};

export const SPECIAL_LETTERS = ["ö", "ğ", "ş", "ç"] as const;

// True when `typed` is the first key of the two-key form of `expected`
// (e.g. "o" while "ö" is expected) — shown as pending rather than wrong.
export function isComboPrefix(typed: string, expected: string): boolean {
  const combo = COMBOS[expected.toLowerCase()];
  return !!combo && typed.toLowerCase() === combo.base && (typed === typed.toUpperCase()) === (expected === expected.toUpperCase());
}

// Apostrophe look-alikes all count as the tutuq sign.
const APOSTROPHES = "'ʻ‘’`ʼ";

export function charsMatch(typed: string, expected: string): boolean {
  if (typed === expected) return true;
  return APOSTROPHES.includes(typed) && APOSTROPHES.includes(expected);
}

// Appends `chars` to `typed`, folding two-key forms into new letters where
// the target text expects one.
export function appendTyped(typed: string, chars: string, target: string, combos: boolean): string {
  let out = typed;
  for (const ch of chars) {
    if (combos && out.length > 0) {
      const i = out.length - 1;
      const expected = target[i];
      const combo = expected ? COMBOS[expected.toLowerCase()] : undefined;
      if (combo && isComboPrefix(out[i], expected) && combo.modifiers.includes(ch)) {
        out = out.slice(0, i) + expected;
        continue;
      }
    }
    if (out.length < target.length) out += ch;
  }
  return out;
}
