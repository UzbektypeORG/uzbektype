import Link from "next/link";

type Language = "uz" | "en" | "ru";

const labels: Record<Language, string> = {
  uz: "Yangi alifboni sinash",
  en: "Try the new alphabet",
  ru: "Новый алфавит",
};

// Small fixed pill in the bottom-left corner of the landing page (the
// bottom-right is taken by KeyboardShortcutsInfo). A real <a>, so crawlers
// also follow it to /yangi-alifbo.
export default function NewAlphabetButton({ lang }: { lang: Language }) {
  return (
    <Link
      href={`/${lang}/yangi-alifbo`}
      className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-full border border-primary/40 bg-background/90 backdrop-blur shadow-lg shadow-primary/10 text-xs md:text-sm font-medium hover:border-primary hover:-translate-y-0.5 transition-all"
    >
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-[11px] font-bold">
        Ö
      </span>
      {labels[lang]}
      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/15 text-primary font-semibold">
        {lang === "ru" ? "НОВОЕ" : lang === "en" ? "NEW" : "YANGI"}
      </span>
    </Link>
  );
}
