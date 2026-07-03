"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface AuthorChannelCardProps {
  lang: "uz" | "en" | "ru";
}

const CHANNEL_URL = "https://t.me/shavkatovio";
const DISMISS_KEY = "uzbektype_author_card_dismissed";

const content = {
  uz: {
    label: "Muallif kanali",
    text: "AI yangiliklari va raqamli ko'nikmalar bo'yicha foydali kontent",
    cta: "@shavkatovio — obuna",
    close: "Yopish",
  },
  en: {
    label: "Author's channel",
    text: "Practical content on AI news and digital skills",
    cta: "@shavkatovio — subscribe",
    close: "Dismiss",
  },
  ru: {
    label: "Канал автора",
    text: "Полезный контент об AI и цифровых навыках",
    cta: "@shavkatovio — подписаться",
    close: "Закрыть",
  },
};

export default function AuthorChannelCard({ lang }: AuthorChannelCardProps) {
  // Dismissed per browser session so it doesn't nag on every result screen,
  // but comes back in a fresh session.
  const [hidden, setHidden] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(DISMISS_KEY) === "true";
  });

  if (hidden) return null;
  const t = content[lang];

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "true");
    } catch {
      // sessionStorage unavailable — just hide for this render.
    }
    setHidden(true);
  };

  return (
    <div className="relative rounded-lg border border-border bg-accent/30 p-4">
      <button
        onClick={dismiss}
        aria-label={t.close}
        className="absolute top-2 right-2 text-muted-foreground/60 hover:text-foreground transition-colors"
      >
        <X size={14} />
      </button>

      <div className="flex items-start gap-3 pr-5">
        <div className="mt-0.5 w-9 h-9 shrink-0 rounded-full bg-[#229ED9]/10 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#229ED9">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
          </svg>
        </div>

        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">
            {t.label}
          </p>
          <p className="text-sm text-foreground mb-2 leading-snug">{t.text}</p>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-medium text-[#229ED9] hover:underline"
          >
            {t.cta} →
          </a>
        </div>
      </div>
    </div>
  );
}
