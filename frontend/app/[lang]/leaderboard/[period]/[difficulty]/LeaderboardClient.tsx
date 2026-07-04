"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useGoogleLogin } from "@/lib/useGoogleLogin";
import { displayName, avatarSrc } from "@/lib/userDisplay";

type SessionUser = ReturnType<typeof useSession>["data"] extends infer T
  ? T extends { user: infer U } ? U : null
  : null;

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
  avgAccuracy: number;
  testCount: number;
  rank: number;
}

interface MeRank {
  rank: number;
  bestWpm: number;
  avgAccuracy: number;
  testCount: number;
}

const content = {
  uz: {
    title: "Reyting",
    subtitle: "Eng tez yozuvchilar",
    periods: { weekly: "Hafta", monthly: "Oy", alltime: "Doimiy" },
    difficulties: { easy: "Oson", medium: "O'rta", hard: "Qiyin" },
    headers: { rank: "#", user: "Foydalanuvchi", wpm: "Eng yaxshi WPM", accuracy: "Aniqlik", tests: "Testlar" },
    you: "Siz",
    yourPosition: "Sizning o'rningiz",
    noResults: "Hali natijangiz yo'q — birinchi testni topshiring",
    cta: "Testni boshlash",
    loginPrompt: "Reytingda qatnashish uchun kiring",
    loginCta: "Google bilan kirish",
  },
  en: {
    title: "Leaderboard",
    subtitle: "Fastest typists",
    periods: { weekly: "Week", monthly: "Month", alltime: "All time" },
    difficulties: { easy: "Easy", medium: "Medium", hard: "Hard" },
    headers: { rank: "#", user: "User", wpm: "Best WPM", accuracy: "Accuracy", tests: "Tests" },
    you: "You",
    yourPosition: "Your position",
    noResults: "No results yet — take your first test",
    cta: "Start a test",
    loginPrompt: "Sign in to join the leaderboard",
    loginCta: "Sign in with Google",
  },
  ru: {
    title: "Рейтинг",
    subtitle: "Самые быстрые печатники",
    periods: { weekly: "Неделя", monthly: "Месяц", alltime: "Всё время" },
    difficulties: { easy: "Лёгкий", medium: "Средний", hard: "Сложный" },
    headers: { rank: "#", user: "Пользователь", wpm: "Лучший WPM", accuracy: "Точность", tests: "Тесты" },
    you: "Вы",
    yourPosition: "Ваша позиция",
    noResults: "Пока нет результатов — пройдите первый тест",
    cta: "Начать тест",
    loginPrompt: "Войдите, чтобы участвовать в рейтинге",
    loginCta: "Войти через Google",
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

export default function LeaderboardClient({ lang, period, difficulty }: { lang: Language; period: Period; difficulty: Difficulty }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user ?? null;
  const mounted = status !== "loading";
  const { handleLogin: handleGoogleLogin, isLoggingIn } = useGoogleLogin(lang);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [me, setMe] = useState<MeRank | null>(null);
  const [loading, setLoading] = useState(true);
  // null = unknown yet. The all-time filter is admin-only, so it stays hidden
  // until the probe confirms admin status.
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const t = content[lang];

  useEffect(() => {
    fetch("/api/admin/check", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { isAdmin: false }))
      .then((d: { isAdmin?: boolean }) => setIsAdmin(!!d.isAdmin))
      .catch(() => setIsAdmin(false));
  }, []);

  // A non-admin can't sit on the all-time view (e.g. via a direct link) —
  // bounce them to the weekly board for the same difficulty.
  useEffect(() => {
    if (isAdmin === false && period === "alltime") {
      router.replace(`/${lang}/leaderboard/weekly/${difficulty}`);
    }
  }, [isAdmin, period, lang, difficulty, router]);

  // Users see weekly + monthly; all-time is revealed only once admin confirms.
  const visiblePeriods = (Object.keys(t.periods) as Period[]).filter(
    (p) => p !== "alltime" || isAdmin === true
  );
  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3);
  const tableSize = entries.length;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/leaderboard?period=${period}&difficulty=${difficulty}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: { top: Entry[]; me: MeRank | null }) => {
        setEntries(data.top);
        setMe(data.me);
      })
      .catch((err) => console.error("Failed to load leaderboard:", err))
      .finally(() => setLoading(false));
  }, [period, difficulty, user]);

  const userRank = me?.rank ?? null;
  const userBestWpm = me?.bestWpm ?? 0;

  const userInTable = userRank !== null && userRank > 3 && userRank <= tableSize;
  const userBelowTable = userRank !== null && userRank > tableSize;

  return (
    <main className="min-h-screen px-4 sm:px-6 py-8 md:py-12">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">{t.title}</h1>
          <p className="text-sm text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Filters: difficulty + period side by side (always horizontal) */}
        <div className="flex items-center justify-center gap-2 md:gap-3">
          <div className="inline-flex border border-border rounded-lg p-1 gap-0.5">
            {(Object.keys(t.difficulties) as Difficulty[]).map((d) => (
              <Link
                key={d}
                href={`/${lang}/leaderboard/${period}/${d}`}
                className={`px-2 md:px-4 py-1.5 md:py-2 text-xs md:text-sm rounded-md transition-colors whitespace-nowrap ${
                  difficulty === d ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                }`}
              >
                {t.difficulties[d]}
              </Link>
            ))}
          </div>
          <div className="inline-flex border border-border rounded-lg p-1 gap-0.5">
            {visiblePeriods.map((p) => (
              <Link
                key={p}
                href={`/${lang}/leaderboard/${p}/${difficulty}`}
                className={`px-2 md:px-4 py-1.5 md:py-2 text-xs md:text-sm rounded-md transition-colors whitespace-nowrap ${
                  period === p ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                }`}
              >
                {t.periods[p]}
              </Link>
            ))}
          </div>
        </div>

        {loading ? (
          <LeaderboardSkeleton />
        ) : (
          <>
        <div className="rounded-2xl border border-border bg-gradient-to-b from-transparent via-accent/10 to-accent/30 p-5 md:p-6 max-w-3xl mx-auto">
          <div className="grid grid-cols-3 items-end gap-3 md:gap-4">
            {[top3[1], top3[0], top3[2]].map((entry) => entry ? (
              <FloatingPillar key={entry.userId} entry={entry} currentUserId={user?.id} youLabel={t.you} />
            ) : null)}
          </div>
        </div>

        <section className="border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-accent/30 text-muted-foreground">
                  <th className="text-left py-3 px-4 font-medium w-12">{t.headers.rank}</th>
                  <th className="text-left py-3 px-4 font-medium">{t.headers.user}</th>
                  <th className="text-right py-3 px-4 font-medium">{t.headers.wpm}</th>
                  <th className="text-right py-3 px-4 font-medium hidden sm:table-cell">{t.headers.accuracy}</th>
                </tr>
              </thead>
              <tbody>
                {!loading && rest.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-sm text-muted-foreground">
                      {t.noResults}
                    </td>
                  </tr>
                )}
                {rest.map((entry) => {
                  const isUserSlot = mounted && user && entry.userId === user.id;
                  return (
                    <tr key={entry.userId} className={`border-b border-border/50 last:border-0 ${isUserSlot ? "bg-primary/10 ring-1 ring-primary/30" : "hover:bg-accent/30"} transition-colors`}>
                      <td className={`py-3 px-4 font-mono ${isUserSlot ? "font-bold text-primary" : "text-muted-foreground"}`}>
                        {entry.rank}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={entryAvatar(entry)}
                            alt={entryName(entry)}
                            className={`w-8 h-8 rounded-full bg-accent ${isUserSlot ? "border border-primary/40" : ""}`}
                            style={{ imageRendering: "pixelated" }}
                          />
                          <span className={isUserSlot ? "font-semibold" : "font-medium"}>{entryName(entry)}</span>
                          {isUserSlot && (
                            <span className="text-[9px] uppercase tracking-wide bg-primary text-primary-foreground px-1.5 py-px rounded font-bold">{t.you}</span>
                          )}
                        </div>
                      </td>
                      <td className={`py-3 px-4 text-right font-mono ${isUserSlot ? "font-bold text-primary" : "font-semibold"}`}>{entry.bestWpm}</td>
                      <td className="py-3 px-4 text-right font-mono hidden sm:table-cell">{entry.avgAccuracy}%</td>
                    </tr>
                  );
                })}
                {mounted && userBelowTable && user && (
                  <>
                    <tr>
                      <td colSpan={4} className="py-2 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 border-t border-dashed border-border" />
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.yourPosition}</span>
                          <div className="flex-1 border-t border-dashed border-border" />
                        </div>
                      </td>
                    </tr>
                    <tr className="bg-primary/10 ring-1 ring-primary/30">
                      <td className="py-3 px-4 font-mono font-bold text-primary">#{userRank}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img src={avatarSrc(user)} alt={displayName(user)} className="w-8 h-8 rounded-full bg-accent border border-primary/40" style={{ imageRendering: "pixelated" }} />
                          <span className="font-semibold">{displayName(user)}</span>
                          <span className="text-[9px] uppercase tracking-wide bg-primary text-primary-foreground px-1.5 py-px rounded font-bold">{t.you}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-primary">
                        {userBestWpm > 0 ? userBestWpm : <span className="text-xs text-muted-foreground italic">{t.noResults}</span>}
                      </td>
                      <td className="py-3 px-4 text-right font-mono hidden sm:table-cell">
                        {me ? `${me.avgAccuracy}%` : "—"}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </section>
          </>
        )}

        {mounted && !user && (
          <div className="border border-dashed border-border rounded-lg p-6 text-center space-y-3">
            <p className="text-sm text-muted-foreground">{t.loginPrompt}</p>
            <button
              onClick={handleGoogleLogin}
              disabled={isLoggingIn}
              className="px-6 py-2.5 rounded-lg border border-border hover:border-foreground transition-all text-sm font-medium disabled:opacity-50 inline-flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              {t.loginCta}
            </button>
          </div>
        )}

        <div className="flex justify-center">
          <Link
            href={`/${lang}/tests/30s-${difficulty}`}
            className="px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all font-medium"
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </main>
  );
}

// Shown while the leaderboard data is in flight — mirrors the podium + table
// shape with a shimmer so the screen never looks empty.
function LeaderboardSkeleton() {
  const pillars = [
    { h: 130, avatar: 52 }, // 2nd
    { h: 180, avatar: 64 }, // 1st
    { h: 95, avatar: 52 },  // 3rd
  ];
  return (
    <>
      <div className="rounded-2xl border border-border bg-gradient-to-b from-transparent via-accent/10 to-accent/30 p-5 md:p-6 max-w-3xl mx-auto">
        <div className="grid grid-cols-3 items-end gap-3 md:gap-4">
          {pillars.map((p, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="shimmer rounded-full mb-2" style={{ width: p.avatar, height: p.avatar }} />
              <div className="shimmer rounded h-3 w-16 mb-1.5" />
              <div className="shimmer rounded h-4 w-10 mb-2" />
              <div className="shimmer rounded-lg w-full mx-2" style={{ height: p.h }} />
            </div>
          ))}
        </div>
      </div>

      <section className="border border-border rounded-lg overflow-hidden">
        <div className="divide-y divide-border/50">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 py-3.5 px-4">
              <div className="shimmer rounded h-4 w-4" />
              <div className="shimmer rounded-full h-8 w-8" />
              <div className="shimmer rounded h-3.5 flex-1 max-w-[180px]" />
              <div className="shimmer rounded h-4 w-12 ml-auto" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function rankColor(rank: number) {
  if (rank === 1) return { ring: "#facc15", base: "#eab308", deep: "#854d0e", text: "text-yellow-700 dark:text-yellow-400" };
  if (rank === 2) return { ring: "#cbd5e1", base: "#94a3b8", deep: "#475569", text: "text-zinc-600 dark:text-zinc-400" };
  return         { ring: "#d97706", base: "#b45309", deep: "#78350f", text: "text-amber-700 dark:text-amber-500" };
}

function FloatingPillar({ entry, currentUserId, youLabel }: { entry: Entry; currentUserId?: string; youLabel: string }) {
  const showUser = currentUserId !== undefined && entry.userId === currentUserId;
  const c = rankColor(entry.rank);
  const big = entry.rank === 1;
  const colH = entry.rank === 1 ? 180 : entry.rank === 2 ? 130 : 95;
  return (
    <div className="flex flex-col items-center text-center">
      <img
        src={entryAvatar(entry)}
        alt={entryName(entry)}
        className={`rounded-full mb-2 ${showUser ? "ring-2 ring-primary" : "ring-4"}`}
        style={{
          width: big ? 64 : 52,
          height: big ? 64 : 52,
          borderColor: showUser ? "var(--primary)" : c.ring,
          boxShadow: showUser ? "0 0 0 4px var(--primary)" : `0 0 0 4px ${c.ring}`,
          imageRendering: "pixelated",
        }}
      />
      <p className="text-xs md:text-sm font-semibold truncate max-w-full">{entryName(entry)}</p>
      {showUser && (
        <span className="text-[9px] uppercase tracking-wide bg-primary text-primary-foreground px-1.5 py-px rounded font-bold mt-0.5">{youLabel}</span>
      )}
      <p className={`font-mono text-base md:text-lg font-bold ${c.text} mt-0.5`}>{entry.bestWpm}</p>
      <div className="relative w-full mt-2" style={{ height: colH + 16 }}>
        <div
          className="absolute inset-x-2 top-0 rounded-lg flex items-center justify-center"
          style={{
            height: colH,
            background: `linear-gradient(180deg, ${c.ring} 0%, ${c.base} 70%, ${c.deep} 100%)`,
            boxShadow: `0 12px 24px -8px ${c.base}80, inset 0 1px 0 ${c.ring}`,
          }}
        >
          <span
            className="font-black text-white"
            style={{
              fontSize: big ? "3.5rem" : "2.5rem",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            {entry.rank}
          </span>
        </div>
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-3 rounded-full blur-md"
          style={{ backgroundColor: c.deep, opacity: 0.3 }}
        />
      </div>
    </div>
  );
}
