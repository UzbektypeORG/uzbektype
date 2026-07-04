"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useGoogleLogin } from "@/lib/useGoogleLogin";
import { displayName, avatarSrc } from "@/lib/userDisplay";

type Language = "uz" | "en" | "ru";
type Period = "weekly" | "monthly" | "alltime";
type Difficulty = "easy" | "medium" | "hard";

interface Entry {
  userId: string;
  firstName: string | null;
  lastName: string | null;
  name: string | null;
  avatarUrl: string | null;
  bestWpm: number;
  rank: number;
}

interface MeRank {
  rank: number;
  bestWpm: number;
}

const content = {
  uz: {
    title: "Eng kuchlilar",
    periods: { weekly: "Hafta", monthly: "Oy", alltime: "Doimiy" },
    difficulties: { easy: "Oson", medium: "O'rta", hard: "Qiyin" },
    viewAll: "Barchasini ko'rish",
    wpm: "WPM",
    loginTitle: "Reytingda qatnashing",
    loginDesc: "Google bilan kiring va natijalaringiz reytingda paydo bo'lsin",
    loginCta: "Google bilan kirish",
    loginLoading: "Kuting...",
    youLabel: "Siz",
    yourPosition: "Sizning o'rningiz",
    noResults: "Hali natijangiz yo'q — birinchi testni topshiring",
    inTop: "Siz topdasiz!",
  },
  en: {
    title: "Top typists",
    periods: { weekly: "Week", monthly: "Month", alltime: "All time" },
    difficulties: { easy: "Easy", medium: "Medium", hard: "Hard" },
    viewAll: "View all",
    wpm: "WPM",
    loginTitle: "Join the leaderboard",
    loginDesc: "Sign in with Google and your results will appear in the rankings",
    loginCta: "Sign in with Google",
    loginLoading: "Loading...",
    youLabel: "You",
    yourPosition: "Your position",
    noResults: "No results yet — take your first test",
    inTop: "You're in the top!",
  },
  ru: {
    title: "Топ печатников",
    periods: { weekly: "Неделя", monthly: "Месяц", alltime: "Всё время" },
    difficulties: { easy: "Лёгкий", medium: "Средний", hard: "Сложный" },
    viewAll: "Смотреть все",
    wpm: "WPM",
    loginTitle: "Участвуйте в рейтинге",
    loginDesc: "Войдите через Google и ваши результаты появятся в рейтинге",
    loginCta: "Войти через Google",
    loginLoading: "Загрузка...",
    youLabel: "Вы",
    yourPosition: "Ваша позиция",
    noResults: "Пока нет результатов — пройдите первый тест",
    inTop: "Вы в топе!",
  },
};

function entryName(e: Entry): string {
  const parts = [e.firstName, e.lastName].filter(Boolean);
  if (parts.length > 0) return parts.join(" ");
  return e.name ?? "—";
}

function entryAvatar(e: Entry): string {
  if (e.avatarUrl) return e.avatarUrl;
  return `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(e.userId)}`;
}

function GoogleIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function rankPrefix(rank: number) {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return rank.toString();
}

function rankColorClass(rank: number) {
  if (rank === 1) return "text-yellow-500";
  if (rank === 2) return "text-zinc-400";
  if (rank === 3) return "text-amber-700";
  return "text-muted-foreground";
}

export default function LeaderboardWidget({
  lang,
  limit = 10,
  variant = "card",
}: {
  lang: Language;
  limit?: number;
  variant?: "card" | "inline";
}) {
  const [period, setPeriod] = useState<Period>("weekly");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const { data: session, status } = useSession();
  const user = session?.user ?? null;
  const mounted = status !== "loading";
  const { handleLogin, isLoggingIn } = useGoogleLogin(lang);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [me, setMe] = useState<MeRank | null>(null);
  const [loading, setLoading] = useState(true);
  const t = content[lang];

  useEffect(() => {
    setLoading(true);
    fetch(`/api/leaderboard?period=${period}&difficulty=${difficulty}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: { top: Entry[]; me: MeRank | null }) => {
        setEntries(data.top.slice(0, limit));
        setMe(data.me);
      })
      .catch(() => {
        setEntries([]);
        setMe(null);
      })
      .finally(() => setLoading(false));
  }, [period, difficulty, user, limit]);

  const userRank = me?.rank ?? null;
  const userBestWpm = me?.bestWpm ?? 0;
  const userInTop = userRank !== null && userRank > 0 && userRank <= limit;

  const containerClass =
    variant === "card"
      ? "border border-border rounded-xl bg-background/60 backdrop-blur-sm p-4 md:p-5"
      : "p-4";

  return (
    <div className={containerClass}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </svg>
          {t.title}
        </h3>
      </div>

      <div className="flex gap-1.5 mb-3 text-[11px]">
        <div className="flex flex-1 gap-0.5 border border-border rounded-lg p-0.5">
          {(Object.keys(t.difficulties) as Difficulty[]).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`flex-1 px-1.5 py-1 rounded-md transition-colors ${
                difficulty === d ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              }`}
            >
              {t.difficulties[d]}
            </button>
          ))}
        </div>
        <div className="flex flex-1 gap-0.5 border border-border rounded-lg p-0.5">
          {(Object.keys(t.periods) as Period[]).filter((p) => p !== "alltime").map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 px-1.5 py-1 rounded-md transition-colors ${
                period === p ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              }`}
            >
              {t.periods[p]}
            </button>
          ))}
        </div>
      </div>

      <ol className="space-y-1 mb-3 min-h-[40px]">
        {loading &&
          Array.from({ length: limit || 5 }).map((_, i) => (
            <li key={`sk-${i}`} className="flex items-center gap-2 px-2 py-1.5">
              <span className="w-5 h-3 shimmer rounded" />
              <span className="w-6 h-6 shimmer rounded-full flex-shrink-0" />
              <span className="h-3 shimmer rounded flex-1 max-w-[120px]" />
              <span className="w-8 h-3 shimmer rounded ml-auto" />
            </li>
          ))}
        {!loading && entries.length === 0 && (
          <li className="text-center text-[11px] text-muted-foreground py-4">
            {t.noResults}
          </li>
        )}
        {!loading && entries.map((entry) => {
          const isUserSlot = mounted && user !== null && entry.userId === user.id;
          return (
            <li
              key={entry.userId}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-md ${
                isUserSlot ? "bg-primary/10 border border-primary/40 ring-1 ring-primary/20" : entry.rank <= 3 ? "bg-accent/40" : ""
              }`}
            >
              <span className={`w-5 text-center text-xs font-mono ${rankColorClass(entry.rank)}`}>
                {rankPrefix(entry.rank)}
              </span>
              <img
                src={entryAvatar(entry)}
                alt={entryName(entry)}
                className={`w-6 h-6 rounded-full bg-accent flex-shrink-0 ${isUserSlot ? "border border-primary/40" : ""}`}
                style={{ imageRendering: "pixelated" }}
              />
              <span className={`text-sm flex-1 truncate ${isUserSlot ? "font-semibold flex items-center gap-1.5" : ""}`}>
                <span className="truncate">{entryName(entry)}</span>
                {isUserSlot && (
                  <span className="text-[9px] uppercase tracking-wide bg-primary text-primary-foreground px-1 py-px rounded font-bold">
                    {t.youLabel}
                  </span>
                )}
              </span>
              <span className={`font-mono text-sm ${isUserSlot ? "font-bold text-primary" : "font-semibold"}`}>{entry.bestWpm}</span>
              <span className="text-[10px] text-muted-foreground">{t.wpm}</span>
            </li>
          );
        })}
      </ol>

      {/* User position row (only if logged in and NOT already in top) */}
      {mounted && user && !userInTop && (
        <div className="mb-3">
          <div className="flex items-center gap-1 mb-1.5 px-2">
            <div className="flex-1 border-t border-dashed border-border" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.yourPosition}</span>
            <div className="flex-1 border-t border-dashed border-border" />
          </div>
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-primary/10 border border-primary/40 ring-1 ring-primary/20">
            <span className="w-5 text-center text-xs font-mono font-bold text-primary">
              {userRank ? `#${userRank}` : "—"}
            </span>
            <img
              src={avatarSrc(user)}
              alt={displayName(user)}
              className="w-6 h-6 rounded-full bg-accent flex-shrink-0 border border-primary/40"
            />
            <span className="text-sm flex-1 truncate font-semibold flex items-center gap-1.5">
              <span className="truncate">{displayName(user)}</span>
              <span className="text-[9px] uppercase tracking-wide bg-primary text-primary-foreground px-1 py-px rounded font-bold">
                {t.youLabel}
              </span>
            </span>
            {userBestWpm > 0 ? (
              <>
                <span className="font-mono text-sm font-bold text-primary">{userBestWpm}</span>
                <span className="text-[10px] text-muted-foreground">{t.wpm}</span>
              </>
            ) : (
              <span className="text-[10px] text-muted-foreground italic">{t.noResults}</span>
            )}
          </div>
        </div>
      )}

      {/* Login CTA (only when not logged in) */}
      {mounted && !user && (
        <div className="border border-dashed border-border rounded-lg p-3 mb-3 text-center space-y-2">
          <div>
            <p className="text-xs font-semibold mb-0.5">{t.loginTitle}</p>
            <p className="text-[11px] text-muted-foreground leading-snug">{t.loginDesc}</p>
          </div>
          <button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full px-3 py-2 rounded-md border border-border hover:border-foreground transition-all text-xs font-medium disabled:opacity-50 inline-flex items-center justify-center gap-2"
          >
            <GoogleIcon size={14} />
            {isLoggingIn ? t.loginLoading : t.loginCta}
          </button>
        </div>
      )}

      <Link
        href={`/${lang}/leaderboard/${period}/${difficulty}`}
        className="block text-center text-xs text-muted-foreground hover:text-foreground transition-colors py-1.5 border-t border-border pt-3"
      >
        {t.viewAll} →
      </Link>
    </div>
  );
}
