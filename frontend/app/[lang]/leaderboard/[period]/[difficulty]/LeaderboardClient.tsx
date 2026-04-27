"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getCurrentUser, type User } from "@/lib/mockAuth";
import { useGoogleLogin } from "@/lib/useGoogleLogin";
import { getTestResults } from "@/lib/localStorage";

type Language = "uz" | "en" | "ru";
type Period = "weekly" | "monthly" | "alltime";
type Difficulty = "easy" | "medium" | "hard";

interface Entry {
  rank: number;
  userName: string;
  avatarSeed: string;
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

const mockNames = [
  "Akmal", "Dilnoza", "Sardor", "Shahzoda", "Bekzod", "Madina", "Rustam", "Nilufar",
  "Aziz", "Gulnora", "Jasur", "Kamola", "Otabek", "Munisa", "Farrux", "Zarina",
  "Sherzod", "Aliya", "Bobur", "Diyora", "Husniddin", "Lola", "Mirzo", "Nargiza",
  "Odil",
];

// Difficulty multiplier matches calculateStars.ts: easy=0.8, medium=1.0, hard=1.2
const DIFFICULTY_BASE_WPM: Record<Difficulty, number> = { easy: 155, medium: 140, hard: 120 };

function generateEntries(period: Period, difficulty: Difficulty): Entry[] {
  const baseSeed = period === "weekly" ? 1 : period === "monthly" ? 2 : 3;
  const baseWpm = DIFFICULTY_BASE_WPM[difficulty];

  return mockNames.map((name, i) => {
    const seed = (i + 1) * baseSeed;
    const wpm = Math.round(baseWpm - i * 2.5 - (seed % 5));
    const accuracy = Math.round(99 - i * 0.3 - (seed % 3) * 0.5);
    const testCount = period === "weekly" ? 5 + (seed % 15) : period === "monthly" ? 20 + (seed % 60) : 80 + (seed % 200);
    return {
      rank: i + 1,
      userName: name,
      avatarSeed: name.toLowerCase(),
      bestWpm: Math.max(wpm, 25),
      avgAccuracy: Math.max(accuracy, 85),
      testCount,
    };
  });
}

function calculateMockRank(userBestWpm: number, difficulty: Difficulty): number {
  if (userBestWpm <= 0) return 0;
  const baseWpm = DIFFICULTY_BASE_WPM[difficulty];
  if (userBestWpm >= baseWpm) return 1;
  const rank = Math.ceil((baseWpm - userBestWpm) / 2.5) + 1;
  return Math.max(1, Math.min(rank, 9999));
}

export default function LeaderboardClient({ lang, period, difficulty }: { lang: Language; period: Period; difficulty: Difficulty }) {
  const [user, setUser] = useState<User | null>(null);
  const { handleLogin: handleGoogleLogin, isLoggingIn } = useGoogleLogin(lang);
  const [mounted, setMounted] = useState(false);
  const [userBestWpm, setUserBestWpm] = useState(0);
  const t = content[lang];
  const entries = generateEntries(period, difficulty);
  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3);
  const tableSize = entries.length;

  useEffect(() => {
    setMounted(true);
    setUser(getCurrentUser());
    const results = getTestResults();
    if (results.length > 0) {
      // For mock: only count results that match the current difficulty filter
      const filtered = results.filter((r) => r.difficulty === difficulty);
      const source = filtered.length > 0 ? filtered : results;
      setUserBestWpm(Math.max(...source.map((r) => r.wpm)));
    } else {
      setUserBestWpm(0);
    }
    const handleAuthChange = () => {
      setUser(getCurrentUser());
      const r = getTestResults();
      if (r.length > 0) {
        const filtered = r.filter((x) => x.difficulty === difficulty);
        const source = filtered.length > 0 ? filtered : r;
        setUserBestWpm(Math.max(...source.map((x) => x.wpm)));
      }
    };
    window.addEventListener("auth-change", handleAuthChange);
    return () => window.removeEventListener("auth-change", handleAuthChange);
  }, [difficulty]);

  const userRank = useMemo(() => {
    if (!user) return null;
    return calculateMockRank(userBestWpm, difficulty);
  }, [user, userBestWpm, difficulty]);

  const userInTop3 = userRank !== null && userRank > 0 && userRank <= 3;
  const userInTable = userRank !== null && userRank > 3 && userRank <= tableSize;
  const userBelowTable = userRank !== null && userRank > tableSize;

  return (
    <main className="min-h-screen px-4 sm:px-6 py-8 md:py-12">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">{t.title}</h1>
          <p className="text-sm text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Filters: difficulty + period side by side */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex border border-border rounded-lg p-1 gap-1">
            {(Object.keys(t.difficulties) as Difficulty[]).map((d) => (
              <Link
                key={d}
                href={`/${lang}/leaderboard/${period}/${d}`}
                className={`px-3 md:px-4 py-2 text-sm rounded-md transition-colors ${
                  difficulty === d ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                }`}
              >
                {t.difficulties[d]}
              </Link>
            ))}
          </div>
          <div className="inline-flex border border-border rounded-lg p-1 gap-1">
            {(Object.keys(t.periods) as Period[]).map((p) => (
              <Link
                key={p}
                href={`/${lang}/leaderboard/${p}/${difficulty}`}
                className={`px-3 md:px-4 py-2 text-sm rounded-md transition-colors ${
                  period === p ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                }`}
              >
                {t.periods[p]}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-3xl mx-auto">
          <PodiumCard entry={top3[1]} place={2} medal="🥈" isUser={userRank === 2} user={user} userBestWpm={userBestWpm} youLabel={t.you} />
          <PodiumCard entry={top3[0]} place={1} medal="🥇" tall isUser={userRank === 1} user={user} userBestWpm={userBestWpm} youLabel={t.you} />
          <PodiumCard entry={top3[2]} place={3} medal="🥉" isUser={userRank === 3} user={user} userBestWpm={userBestWpm} youLabel={t.you} />
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
                  <th className="text-right py-3 px-4 font-medium hidden md:table-cell">{t.headers.tests}</th>
                </tr>
              </thead>
              <tbody>
                {rest.map((entry) => {
                  const isUserSlot = mounted && userInTable && user && userRank === entry.rank;
                  if (isUserSlot && user) {
                    return (
                      <tr key={entry.rank} className="border-b border-border/50 last:border-0 bg-primary/10 ring-1 ring-primary/30">
                        <td className="py-3 px-4 font-mono font-bold text-primary">{entry.rank}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img src={user.avatarUrl} alt={user.displayName} className="w-8 h-8 rounded-full bg-accent border border-primary/40" />
                            <span className="font-semibold">{user.displayName}</span>
                            <span className="text-[9px] uppercase tracking-wide bg-primary text-primary-foreground px-1.5 py-px rounded font-bold">{t.you}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-primary">{userBestWpm}</td>
                        <td className="py-3 px-4 text-right font-mono hidden sm:table-cell">—</td>
                        <td className="py-3 px-4 text-right font-mono text-muted-foreground hidden md:table-cell">—</td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={entry.rank} className="border-b border-border/50 last:border-0 hover:bg-accent/30 transition-colors">
                      <td className="py-3 px-4 font-mono text-muted-foreground">{entry.rank}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.avatarSeed}`}
                            alt={entry.userName}
                            className="w-8 h-8 rounded-full bg-accent"
                          />
                          <span className="font-medium">{entry.userName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-semibold">{entry.bestWpm}</td>
                      <td className="py-3 px-4 text-right font-mono hidden sm:table-cell">{entry.avgAccuracy}%</td>
                      <td className="py-3 px-4 text-right font-mono text-muted-foreground hidden md:table-cell">{entry.testCount}</td>
                    </tr>
                  );
                })}
                {mounted && userBelowTable && user && (
                  <>
                    <tr>
                      <td colSpan={5} className="py-2 px-4">
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
                          <img src={user.avatarUrl} alt={user.displayName} className="w-8 h-8 rounded-full bg-accent border border-primary/40" />
                          <span className="font-semibold">{user.displayName}</span>
                          <span className="text-[9px] uppercase tracking-wide bg-primary text-primary-foreground px-1.5 py-px rounded font-bold">{t.you}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-primary">
                        {userBestWpm > 0 ? userBestWpm : <span className="text-xs text-muted-foreground italic">{t.noResults}</span>}
                      </td>
                      <td className="py-3 px-4 text-right font-mono hidden sm:table-cell">—</td>
                      <td className="py-3 px-4 text-right font-mono text-muted-foreground hidden md:table-cell">—</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </section>

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

function PodiumCard({ entry, place, medal, tall, isUser, user, userBestWpm, youLabel }: { entry?: Entry; place: number; medal: string; tall?: boolean; isUser?: boolean; user?: User | null; userBestWpm?: number; youLabel: string }) {
  if (!entry) return <div />;
  const showUser = isUser && user;
  const avatarSrc = showUser ? user!.avatarUrl : `https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.avatarSeed}`;
  const displayName = showUser ? user!.displayName : entry.userName;
  const wpmValue = showUser && userBestWpm ? userBestWpm : entry.bestWpm;
  return (
    <div className={`flex flex-col items-center text-center ${tall ? "order-first md:order-none" : ""}`}>
      <div className="text-3xl md:text-4xl mb-2">{medal}</div>
      <img
        src={avatarSrc}
        alt={displayName}
        className={`rounded-full bg-accent border-2 ${
          showUser ? "border-primary ring-2 ring-primary/30" : place === 1 ? "border-yellow-400" : "border-border"
        } ${place === 1 ? "w-20 h-20 md:w-24 md:h-24" : "w-16 h-16 md:w-20 md:h-20"} mb-2`}
      />
      <p className="text-sm md:text-base font-semibold truncate max-w-full mb-1">{displayName}</p>
      {showUser && (
        <span className="text-[9px] uppercase tracking-wide bg-primary text-primary-foreground px-1.5 py-px rounded font-bold mb-1">{youLabel}</span>
      )}
      <div className={`w-full rounded-t-lg flex items-center justify-center ${
        showUser ? "bg-primary/20" : place === 1 ? "bg-yellow-400/20" : place === 2 ? "bg-muted" : "bg-muted/50"
      } ${place === 1 ? "h-20" : place === 2 ? "h-14" : "h-10"}`}>
        <span className={`font-mono font-bold text-lg md:text-xl ${showUser ? "text-primary" : ""}`}>{wpmValue}</span>
      </div>
    </div>
  );
}
