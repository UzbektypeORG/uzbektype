"use client";

import { useSession } from "next-auth/react";
import { useGoogleLogin } from "@/lib/useGoogleLogin";

type Language = "uz" | "en" | "ru";

const content = {
  uz: {
    title: "Natijangizni saqlang",
    desc: "Kiring — testlaringiz tarixi saqlanadi va siz reytingda qatnashasiz",
    cta: "Kirish",
    loading: "Kuting...",
  },
  en: {
    title: "Save your result",
    desc: "Sign in — your test history is saved and you join the leaderboard",
    cta: "Sign in",
    loading: "Loading...",
  },
  ru: {
    title: "Сохраните свой результат",
    desc: "Войдите — история тестов сохранится и вы попадёте в рейтинг",
    cta: "Войти",
    loading: "Загрузка...",
  },
};

export default function LoginCtaBanner({ lang }: { lang: Language }) {
  const { data: session, status } = useSession();
  const { handleLogin, isLoggingIn } = useGoogleLogin(lang);
  const t = content[lang];

  if (status === "loading" || session?.user) return null;

  return (
    <div className="border border-primary/30 bg-primary/5 rounded-xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 animate-fade-in">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-sm md:text-base leading-tight">{t.title}</p>
          <p className="text-xs md:text-sm text-muted-foreground mt-0.5 leading-snug">{t.desc}</p>
        </div>
      </div>
      <button
        onClick={handleLogin}
        disabled={isLoggingIn}
        className="px-4 py-2.5 rounded-lg border border-border bg-background hover:border-foreground transition-all text-sm font-medium disabled:opacity-50 inline-flex items-center justify-center gap-2 flex-shrink-0 whitespace-nowrap"
      >
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path fill="#229ED9" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
        </svg>
        {isLoggingIn ? t.loading : t.cta}
      </button>
    </div>
  );
}
