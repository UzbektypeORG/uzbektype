"use client";

import { useEffect } from "react";
import { trackPromo } from "@/lib/track-promo";
import type { Language } from "@/types";

// Starsjoy (Telegram Stars & Premium) banner on the results screen. Three
// designs to choose from; the live one is STARSJOY_VARIANT. Analytics match
// the old results banner: one impression per results screen, one click event.

export type StarsjoyVariant = "premium" | "minimal" | "personal";
export const STARSJOY_VARIANT: StarsjoyVariant = "premium";

const STARSJOY_URL = "https://t.me/StarsjoyBot?start=uzbektype";

const copy = {
  uz: {
    title: "Telegram Premium va Stars",
    subtitle: "Starsjoy orqali bir necha soniyada sotib oling",
    cta: "Sotib olish",
    personalTitle: (wpm: number) => `${wpm} WPM — zo'r natija!`,
    personalSubtitle: "O'zingizni Telegram Premium bilan taqdirlang",
    personalCta: "Premium olish",
    badge: "Starsjoy",
  },
  en: {
    title: "Telegram Premium & Stars",
    subtitle: "Buy in seconds with Starsjoy",
    cta: "Buy now",
    personalTitle: (wpm: number) => `${wpm} WPM — great result!`,
    personalSubtitle: "Treat yourself to Telegram Premium",
    personalCta: "Get Premium",
    badge: "Starsjoy",
  },
  ru: {
    title: "Telegram Premium и Stars",
    subtitle: "Купите за пару секунд через Starsjoy",
    cta: "Купить",
    personalTitle: (wpm: number) => `${wpm} WPM — отличный результат!`,
    personalSubtitle: "Порадуйте себя Telegram Premium",
    personalCta: "Получить Premium",
    badge: "Starsjoy",
  },
};

function StarIcon({ size = 22, gradient }: { size?: number; gradient: "gold" | "premium" }) {
  const id = `sj-${gradient}`;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          {gradient === "gold" ? (
            <>
              <stop offset="0%" stopColor="#FFD84D" />
              <stop offset="100%" stopColor="#F59E0B" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#6D5BFF" />
              <stop offset="55%" stopColor="#B455F5" />
              <stop offset="100%" stopColor="#F2709C" />
            </>
          )}
        </linearGradient>
      </defs>
      <path
        fill={`url(#${id})`}
        d="M12 2.5l2.83 5.73 6.32.92-4.57 4.46 1.08 6.3L12 16.93l-5.66 2.98 1.08-6.3L2.85 9.15l6.32-.92L12 2.5z"
      />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

export default function StarsjoyBanner({
  lang,
  wpm,
  variant = STARSJOY_VARIANT,
  track = true,
}: {
  lang: Language;
  wpm: number;
  variant?: StarsjoyVariant;
  // Off on preview pages so they don't skew the real numbers.
  track?: boolean;
}) {
  const t = copy[lang];

  useEffect(() => {
    if (track) trackPromo("starsjoy_banner", "impression", lang);
  }, [track, lang]);

  const linkProps = {
    href: STARSJOY_URL,
    target: "_blank",
    rel: "noopener noreferrer",
    onClick: () => {
      if (track) trackPromo("starsjoy_banner", "click", lang);
    },
  };

  if (variant === "minimal") {
    return (
      <a
        {...linkProps}
        className="group flex items-center justify-between gap-3 w-full rounded-xl border border-border hover:border-foreground px-4 md:px-5 py-3 md:py-3.5 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full bg-amber-400/10 flex items-center justify-center">
            <StarIcon gradient="gold" size={20} />
          </div>
          <div className="min-w-0">
            <div className="text-sm md:text-base font-semibold truncate">{t.title}</div>
            <div className="text-[11px] md:text-xs text-muted-foreground truncate">{t.subtitle}</div>
          </div>
        </div>
        <span className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all">
          {t.cta}
          <Arrow />
        </span>
      </a>
    );
  }

  if (variant === "personal") {
    return (
      <a
        {...linkProps}
        className="group relative block w-full overflow-hidden rounded-xl bg-foreground text-background min-h-[90px] md:min-h-[104px] hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300"
      >
        {/* Scattered stars */}
        <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true">
          <span className="absolute right-[30%] top-3"><StarIcon gradient="gold" size={10} /></span>
          <span className="absolute right-[22%] bottom-4"><StarIcon gradient="gold" size={14} /></span>
          <span className="absolute right-[38%] bottom-6"><StarIcon gradient="gold" size={8} /></span>
          <span className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-amber-400/20 blur-2xl group-hover:bg-amber-400/30 transition-colors" />
        </div>
        <div className="relative flex items-center justify-between gap-3 px-4 md:px-6 py-3 md:py-4 h-full">
          <div className="flex items-center gap-3 md:gap-4 min-w-0">
            <div className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full bg-background/10 flex items-center justify-center group-hover:scale-105 transition-transform">
              <StarIcon gradient="gold" size={26} />
            </div>
            <div className="min-w-0">
              <div className="text-sm md:text-base font-semibold truncate">{t.personalTitle(wpm)}</div>
              <div className="text-[11px] md:text-xs opacity-70 truncate">{t.personalSubtitle}</div>
            </div>
          </div>
          <span className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 text-black text-xs md:text-sm font-semibold shadow-md shadow-amber-500/20 group-hover:translate-x-0.5 transition-transform">
            {t.personalCta}
            <Arrow />
          </span>
        </div>
      </a>
    );
  }

  // "premium" — Telegram Premium's violet-to-pink with a gold Stars accent.
  return (
    <a
      {...linkProps}
      className="group relative block w-full overflow-hidden rounded-xl min-h-[90px] md:min-h-[104px] border border-[#B455F5]/30 hover:border-[#B455F5]/60 bg-gradient-to-r from-[#6D5BFF]/[0.12] via-[#B455F5]/[0.08] to-[#F2709C]/5 hover:shadow-lg hover:shadow-[#B455F5]/15 transition-all duration-300"
    >
      <div className="pointer-events-none absolute -right-10 -top-12 w-44 h-44 rounded-full bg-[#B455F5]/20 blur-2xl group-hover:bg-[#B455F5]/30 transition-colors" aria-hidden="true" />
      <div className="relative flex items-center justify-between gap-3 px-4 md:px-6 py-3 md:py-4 h-full">
        <div className="flex items-center gap-3 md:gap-4 min-w-0">
          <div className="relative flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#6D5BFF] via-[#B455F5] to-[#F2709C] flex items-center justify-center shadow-md shadow-[#B455F5]/30 group-hover:scale-105 transition-transform">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M12 2.5l2.83 5.73 6.32.92-4.57 4.46 1.08 6.3L12 16.93l-5.66 2.98 1.08-6.3L2.85 9.15l6.32-.92L12 2.5z" />
            </svg>
            <span className="absolute -right-1 -bottom-1"><StarIcon gradient="gold" size={16} /></span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm md:text-base font-semibold text-foreground truncate">{t.title}</span>
              <span className="hidden sm:inline text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#B455F5]/15 text-[#9b3fe0] dark:text-[#d29bff]">
                {t.badge}
              </span>
            </div>
            <div className="text-[11px] md:text-xs text-muted-foreground truncate">{t.subtitle}</div>
          </div>
        </div>
        <span className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-[#6D5BFF] via-[#B455F5] to-[#F2709C] text-white text-xs md:text-sm font-semibold shadow-md shadow-[#B455F5]/25 group-hover:shadow-lg group-hover:translate-x-0.5 transition-all duration-300">
          {t.cta}
          <Arrow />
        </span>
      </div>
    </a>
  );
}
