"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { X } from "lucide-react";
import { OPEN_LOGIN_EVENT } from "@/lib/useGoogleLogin";

type Language = "uz" | "en" | "ru";
type ErrorKey = "wrong" | "expired" | "too_many" | "banned" | "network";

const content = {
  uz: {
    title: "Saytga kirish",
    subtitle: "Natijalaringiz saqlanadi va reytingda qatnashasiz",
    telegram: "Telegram orqali kirish",
    recommended: "Tavsiya etiladi",
    google: "Google bilan kirish",
    or: "yoki",
    stepsTitle: "Telegram orqali kirish",
    step1: "Botda @uzbektype kanaliga obuna bo'ling",
    step2: "Bot yuborgan 6 xonali kodni shu yerga kiriting",
    openBot: "Botni ochish",
    codeLabel: "Kirish kodi",
    submit: "Kirish",
    checking: "Tekshirilmoqda...",
    back: "Orqaga",
    errors: {
      wrong: "Kod noto'g'ri. Qaytadan tekshirib kiriting.",
      expired: "Kod eskirgan. «Botni ochish» ni bosib, yangi kod oling.",
      too_many: "Urinishlar tugadi. «Orqaga» ni bosib, qaytadan boshlang.",
      banned: "Bu akkaunt bloklangan.",
      network: "Internet bilan muammo. Qaytadan urinib ko'ring.",
    },
  },
  en: {
    title: "Sign in",
    subtitle: "Your results get saved and you join the leaderboard",
    telegram: "Sign in with Telegram",
    recommended: "Recommended",
    google: "Sign in with Google",
    or: "or",
    stepsTitle: "Sign in with Telegram",
    step1: "Join the @uzbektype channel in the bot",
    step2: "Enter the 6-digit code the bot sends you",
    openBot: "Open the bot",
    codeLabel: "Sign-in code",
    submit: "Sign in",
    checking: "Checking...",
    back: "Back",
    errors: {
      wrong: "Wrong code. Check it and try again.",
      expired: "The code has expired. Tap “Open the bot” for a new one.",
      too_many: "Too many attempts. Tap “Back” and start over.",
      banned: "This account is blocked.",
      network: "Connection problem. Please try again.",
    },
  },
  ru: {
    title: "Вход на сайт",
    subtitle: "Ваши результаты сохранятся, и вы попадёте в рейтинг",
    telegram: "Войти через Telegram",
    recommended: "Рекомендуем",
    google: "Войти через Google",
    or: "или",
    stepsTitle: "Вход через Telegram",
    step1: "Подпишитесь на канал @uzbektype в боте",
    step2: "Введите 6-значный код, который пришлёт бот",
    openBot: "Открыть бота",
    codeLabel: "Код входа",
    submit: "Войти",
    checking: "Проверяем...",
    back: "Назад",
    errors: {
      wrong: "Неверный код. Проверьте и попробуйте снова.",
      expired: "Код устарел. Нажмите «Открыть бота», чтобы получить новый.",
      too_many: "Слишком много попыток. Нажмите «Назад» и начните заново.",
      banned: "Этот аккаунт заблокирован.",
      network: "Проблема с интернетом. Попробуйте снова.",
    },
  },
};

function TelegramIcon({ size = 18, fill = "currentColor" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

// Sign-in chooser, opened from any login button via useGoogleLogin().
// Telegram flow: lib/telegram-login.ts.
export default function LoginModal() {
  const [lang, setLang] = useState<Language | null>(null);
  const [step, setStep] = useState<"choose" | "code">("choose");
  const [botUrl, setBotUrl] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState<ErrorKey | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // A fresh attempt per opening; fetched up front so the Telegram button can
  // be a plain link (opening a window after an await gets popup-blocked).
  const startAttempt = useCallback(async () => {
    setBotUrl(null);
    try {
      const res = await fetch("/api/telegram-login/start", { method: "POST" });
      const data = (await res.json()) as { url?: string };
      setBotUrl(data.url ?? null);
    } catch {
      setError("network");
    }
  }, []);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const l = (e as CustomEvent<{ lang?: string }>).detail?.lang;
      setLang(l === "en" || l === "ru" ? l : "uz");
      setStep("choose");
      setCode("");
      setError(null);
      startAttempt();
    };
    window.addEventListener(OPEN_LOGIN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_LOGIN_EVENT, onOpen);
  }, [startAttempt]);

  useEffect(() => {
    if (!lang) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLang(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lang]);

  useEffect(() => {
    if (step === "code") inputRef.current?.focus();
  }, [step]);

  if (!lang) return null;
  const t = content[lang];

  const submit = async (value: string) => {
    if (value.length !== 6 || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/telegram-login/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: value }),
      });
      if (res.ok) {
        // Full navigation so every component picks up the new session.
        window.location.href = `/${lang}/profile`;
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: ErrorKey };
      setError(data.error && data.error in t.errors ? data.error : "network");
      setCode("");
    } catch {
      setError("network");
    }
    setSubmitting(false);
  };

  const onCodeChange = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 6);
    setCode(digits);
    setError(null);
    if (digits.length === 6) submit(digits);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setLang(null)} />

      <div className="relative bg-background border border-border rounded-lg p-6 w-full max-w-sm shadow-xl animate-fade-in">
        <button
          onClick={() => setLang(null)}
          aria-label="Close"
          className="absolute top-3 right-3 text-muted-foreground/60 hover:text-foreground transition-colors"
        >
          <X size={18} />
        </button>

        {step === "choose" ? (
          <>
            <h2 className="text-lg font-semibold text-center">{t.title}</h2>
            <p className="text-sm text-muted-foreground text-center mt-1 mb-6">{t.subtitle}</p>

            <a
              href={botUrl ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!botUrl}
              onClick={(e) => {
                if (!botUrl) return e.preventDefault();
                setStep("code");
              }}
              className={`relative w-full px-4 py-3 rounded-lg bg-[#229ED9] text-white font-medium text-sm inline-flex items-center justify-center gap-2 transition-opacity ${
                botUrl ? "hover:opacity-90" : "opacity-60 cursor-wait"
              }`}
            >
              <TelegramIcon />
              {t.telegram}
              <span className="absolute -top-2 right-3 text-[10px] font-semibold uppercase tracking-wide bg-background text-[#229ED9] border border-[#229ED9]/40 rounded-full px-2 py-0.5">
                {t.recommended}
              </span>
            </a>

            <div className="flex items-center gap-3 my-4 text-xs text-muted-foreground">
              <div className="h-px flex-1 bg-border" />
              {t.or}
              <div className="h-px flex-1 bg-border" />
            </div>

            <button
              onClick={() => signIn("google", { callbackUrl: `/${lang}/profile` })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background hover:border-foreground transition-all text-sm font-medium inline-flex items-center justify-center gap-2"
            >
              <GoogleIcon />
              {t.google}
            </button>

            {error === "network" && <p className="text-xs text-red-500 text-center mt-3">{t.errors.network}</p>}
          </>
        ) : (
          <>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 w-12 h-12 rounded-full bg-[#229ED9]/10 flex items-center justify-center">
                <TelegramIcon size={26} fill="#229ED9" />
              </div>
              <h2 className="text-lg font-semibold">{t.stepsTitle}</h2>
            </div>

            <ol className="mt-4 space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#229ED9]/15 text-[#229ED9] text-xs font-semibold flex items-center justify-center">1</span>
                {t.step1}
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#229ED9]/15 text-[#229ED9] text-xs font-semibold flex items-center justify-center">2</span>
                {t.step2}
              </li>
            </ol>

            <label className="block mt-5 text-xs text-muted-foreground" htmlFor="tg-login-code">
              {t.codeLabel}
            </label>
            <input
              id="tg-login-code"
              ref={inputRef}
              value={code}
              onChange={(e) => onCodeChange(e.target.value)}
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="••••••"
              disabled={submitting}
              className="mt-1 w-full text-center text-2xl tracking-[0.5em] font-semibold tabular-nums py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:border-[#229ED9] disabled:opacity-60"
            />

            {error && <p className="text-xs text-red-500 mt-2">{t.errors[error]}</p>}

            <button
              onClick={() => submit(code)}
              disabled={code.length !== 6 || submitting}
              className="mt-4 w-full px-4 py-2.5 rounded-lg bg-[#229ED9] text-white font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {submitting ? t.checking : t.submit}
            </button>

            <div className="mt-4 flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  setStep("choose");
                  setCode("");
                  setError(null);
                  startAttempt();
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ← {t.back}
              </button>
              {botUrl && (
                <a href={botUrl} target="_blank" rel="noopener noreferrer" className="text-[#229ED9] hover:underline">
                  {t.openBot}
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
