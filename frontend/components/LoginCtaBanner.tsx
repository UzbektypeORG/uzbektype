"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, type User } from "@/lib/mockAuth";
import { useGoogleLogin } from "@/lib/useGoogleLogin";

type Language = "uz" | "en" | "ru";

const content = {
  uz: {
    title: "Natijangizni saqlang",
    desc: "Google bilan kiring — testlaringiz tarixi saqlanadi va siz reytingda qatnashasiz",
    cta: "Google bilan kirish",
    loading: "Kuting...",
  },
  en: {
    title: "Save your result",
    desc: "Sign in with Google — your test history is saved and you join the leaderboard",
    cta: "Sign in with Google",
    loading: "Loading...",
  },
  ru: {
    title: "Сохраните свой результат",
    desc: "Войдите через Google — история тестов сохранится и вы попадёте в рейтинг",
    cta: "Войти через Google",
    loading: "Загрузка...",
  },
};

export default function LoginCtaBanner({ lang }: { lang: Language }) {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const { handleLogin, isLoggingIn } = useGoogleLogin(lang);
  const t = content[lang];

  useEffect(() => {
    setMounted(true);
    setUser(getCurrentUser());
    const handleAuthChange = () => setUser(getCurrentUser());
    window.addEventListener("auth-change", handleAuthChange);
    return () => window.removeEventListener("auth-change", handleAuthChange);
  }, []);

  if (!mounted || user) return null;

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
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        {isLoggingIn ? t.loading : t.cta}
      </button>
    </div>
  );
}
