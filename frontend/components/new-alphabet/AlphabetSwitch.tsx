import Link from "next/link";

type Language = "uz" | "en" | "ru";

const titles: Record<Language, { current: string; next: string }> = {
  uz: { current: "Joriy alifbo", next: "Yangi alifbo · 22.04.2027 dan" },
  en: { current: "Current alphabet", next: "New alphabet · from 22.04.2027" },
  ru: { current: "Нынешний алфавит", next: "Новый алфавит · с 22.04.2027" },
};

// Navbar switch between the regular test and /yangi-alifbo. The labels are
// the same word in both spellings (Oʻzbekcha → Özbekça), so the switch shows
// the change itself and reads the same in every UI language.
export default function AlphabetSwitch({ lang, isNew, compact = false }: { lang: Language; isNew: boolean; compact?: boolean }) {
  const t = titles[lang];
  const base = `rounded-full transition-colors ${compact ? "px-2.5 py-1 text-[11px]" : "px-3 py-1 text-xs"}`;
  const active = "bg-primary text-primary-foreground font-semibold";
  const idle = "text-muted-foreground hover:text-foreground";
  return (
    <div className="inline-flex items-center gap-0.5 p-0.5 rounded-full border border-border" role="group" aria-label={`${t.current} / ${t.next}`}>
      <Link href={`/${lang}/tests/30s-easy`} title={t.current} aria-current={!isNew ? "page" : undefined} className={`${base} ${!isNew ? active : idle}`}>
        Oʻzbekcha
      </Link>
      <Link href={`/${lang}/yangi-alifbo`} title={t.next} aria-current={isNew ? "page" : undefined} className={`${base} ${isNew ? active : idle}`}>
        Özbekça
      </Link>
    </div>
  );
}
