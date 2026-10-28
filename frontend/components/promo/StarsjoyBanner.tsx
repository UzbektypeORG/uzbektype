"use client";

import { useEffect } from "react";
import { trackPromo } from "@/lib/track-promo";
import type { Language } from "@/types";

// Starsjoy (Telegram Stars & Premium) banner on the results screen: one line
// of text, shown in full, plus an arrow. Three designs to choose from; the
// live one is STARSJOY_VARIANT. Analytics match the old results banner: one
// impression per results screen, one click event.

export type StarsjoyVariant = "premium" | "minimal" | "personal";
export const STARSJOY_VARIANT: StarsjoyVariant = "premium";

const STARSJOY_URL = "https://t.me/StarsjoyBot?start=uzbektype";

const TEXT: Record<Language, string> = {
  uz: "Telegram Premium va Stars sotib oling!",
  en: "Buy Telegram Premium and Stars!",
  ru: "Купите Telegram Premium и Stars!",
};

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

const STYLES: Record<StarsjoyVariant, { card: string; icon: string; text: string; arrow: string; glow?: string }> = {
  // Telegram Premium's violet-to-pink with a gold Stars accent.
  premium: {
    card: "border border-[#B455F5]/30 hover:border-[#B455F5]/60 bg-gradient-to-r from-[#6D5BFF]/[0.12] via-[#B455F5]/[0.08] to-[#F2709C]/5 hover:shadow-lg hover:shadow-[#B455F5]/15",
    icon: "shadow-md shadow-[#B455F5]/30",
    text: "text-foreground",
    arrow: "bg-gradient-to-r from-[#6D5BFF] via-[#B455F5] to-[#F2709C] text-white shadow-md shadow-[#B455F5]/25",
    glow: "bg-[#B455F5]/20 group-hover:bg-[#B455F5]/30",
  },
  // The site's own black-and-white look.
  minimal: {
    card: "border border-border hover:border-foreground",
    icon: "ring-1 ring-border",
    text: "text-foreground",
    arrow: "border border-border text-muted-foreground group-hover:text-foreground group-hover:border-foreground",
  },
  // Inverted card with gold.
  personal: {
    card: "bg-foreground hover:shadow-xl hover:shadow-amber-500/10",
    icon: "ring-1 ring-background/20",
    text: "text-background",
    arrow: "bg-gradient-to-r from-amber-300 to-amber-500 text-black shadow-md shadow-amber-500/20",
    glow: "bg-amber-400/20 group-hover:bg-amber-400/30",
  },
};

export default function StarsjoyBanner({
  lang,
  variant = STARSJOY_VARIANT,
  track = true,
}: {
  lang: Language;
  variant?: StarsjoyVariant;
  // Off on preview pages so they don't skew the real numbers.
  track?: boolean;
}) {
  const s = STYLES[variant];

  useEffect(() => {
    if (track) trackPromo("starsjoy_banner", "impression", lang);
  }, [track, lang]);

  return (
    <a
      href={STARSJOY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        if (track) trackPromo("starsjoy_banner", "click", lang);
      }}
      className={`group relative flex items-center gap-3 md:gap-4 w-full overflow-hidden rounded-xl px-4 md:px-6 py-4 md:py-5 transition-all duration-300 ${s.card}`}
    >
      {s.glow && (
        <span className={`pointer-events-none absolute -right-10 -top-12 w-44 h-44 rounded-full blur-2xl transition-colors ${s.glow}`} aria-hidden="true" />
      )}
      {/* Starsjoy logo (copied from the Starsjoy project, downscaled to 192px) */}
      <span className={`relative flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full overflow-hidden group-hover:scale-105 transition-transform ${s.icon}`}>
        <img src="/promo/starsjoy-logo.png" alt="Starsjoy" width={48} height={48} className="w-full h-full object-cover" />
      </span>
      <span className={`relative flex-1 min-w-0 text-base md:text-lg font-semibold leading-snug ${s.text}`}>{TEXT[lang]}</span>
      <span className={`relative flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center group-hover:translate-x-0.5 transition-all duration-300 ${s.arrow}`}>
        <Arrow />
      </span>
    </a>
  );
}
