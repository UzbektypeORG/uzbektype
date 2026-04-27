"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useSession } from "next-auth/react";
import { useGoogleLogin } from "@/lib/useGoogleLogin";
import { displayName, avatarSrc } from "@/lib/userDisplay";
import { getTestResults } from "@/lib/localStorage";
import type { TestResult } from "@/types";

type Language = "uz" | "en" | "ru";

const content = {
  uz: {
    loginRequired: {
      title: "Natijalaringizni saqlang",
      description: "Google orqali kiring va WPM tarixingizni, top natijalaringizni va o'sish grafigingizni ko'ring. Ro'yxatdan o'tish 1 soniya.",
      cta: "Google bilan kirish",
      loading: "Kuting...",
    },
    title: "Natijalarim",
    subtitle: "Yozish ko'nikmalaringizning rivoji",
    stats: {
      totalTests: "Jami testlar",
      avgWpm: "O'rtacha WPM",
      bestWpm: "Eng yaxshi WPM",
      avgAccuracy: "O'rtacha aniqlik",
    },
    chart: {
      title: "WPM rivoji (oxirgi 20 ta test)",
      empty: "Hali natijalar yo'q. Birinchi testingizni boshlang!",
    },
    recent: {
      title: "Oxirgi testlar",
      empty: "Test natijalari bu yerda ko'rinadi",
      headers: {
        date: "Sana",
        type: "Test",
        wpm: "WPM",
        accuracy: "Aniqlik",
        stars: "Yulduzlar",
      },
    },
    cta: "Yangi test boshlash",
  },
  en: {
    loginRequired: {
      title: "Save your results",
      description: "Sign in with Google to track your WPM history, best results, and progress over time. Takes 1 second.",
      cta: "Sign in with Google",
      loading: "Loading...",
    },
    title: "My results",
    subtitle: "Your typing skills progress",
    stats: {
      totalTests: "Total tests",
      avgWpm: "Average WPM",
      bestWpm: "Best WPM",
      avgAccuracy: "Average accuracy",
    },
    chart: {
      title: "WPM progress (last 20 tests)",
      empty: "No results yet. Start your first test!",
    },
    recent: {
      title: "Recent tests",
      empty: "Your test results will appear here",
      headers: {
        date: "Date",
        type: "Test",
        wpm: "WPM",
        accuracy: "Accuracy",
        stars: "Stars",
      },
    },
    cta: "Start a new test",
  },
  ru: {
    loginRequired: {
      title: "Сохраните свои результаты",
      description: "Войдите через Google и отслеживайте историю WPM, лучшие результаты и прогресс. Занимает 1 секунду.",
      cta: "Войти через Google",
      loading: "Загрузка...",
    },
    title: "Мои результаты",
    subtitle: "Прогресс ваших навыков печати",
    stats: {
      totalTests: "Всего тестов",
      avgWpm: "Средний WPM",
      bestWpm: "Лучший WPM",
      avgAccuracy: "Средняя точность",
    },
    chart: {
      title: "Прогресс WPM (последние 20 тестов)",
      empty: "Пока нет результатов. Начните первый тест!",
    },
    recent: {
      title: "Последние тесты",
      empty: "Ваши результаты будут отображаться здесь",
      headers: {
        date: "Дата",
        type: "Тест",
        wpm: "WPM",
        accuracy: "Точность",
        stars: "Звезды",
      },
    },
    cta: "Начать новый тест",
  },
};

export default function DashboardClient({ lang }: { lang: Language }) {
  const { data: session, status } = useSession();
  const user = session?.user ?? null;
  const mounted = status !== "loading";
  const [results, setResults] = useState<TestResult[]>([]);
  const { handleLogin: handleGoogleLogin, isLoggingIn } = useGoogleLogin(lang);
  const t = content[lang];

  useEffect(() => {
    setResults(getTestResults());
  }, [user]);

  const stats = useMemo(() => {
    if (results.length === 0) {
      return { totalTests: 0, avgWpm: 0, bestWpm: 0, avgAccuracy: 0 };
    }
    const totalTests = results.length;
    const avgWpm = Math.round(results.reduce((s, r) => s + r.wpm, 0) / totalTests);
    const bestWpm = Math.max(...results.map((r) => r.wpm));
    const avgAccuracy = Math.round(results.reduce((s, r) => s + r.accuracy, 0) / totalTests);
    return { totalTests, avgWpm, bestWpm, avgAccuracy };
  }, [results]);

  const chartData = useMemo(() => {
    return [...results]
      .reverse()
      .slice(-20)
      .map((r, i) => ({
        index: i + 1,
        wpm: r.wpm,
        accuracy: r.accuracy,
      }));
  }, [results]);

  if (!mounted) {
    return <main className="min-h-screen" />;
  }

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M3 3v18h18" />
              <path d="M18 9l-6 6-4-4-3 3" />
            </svg>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{t.loginRequired.title}</h1>
            <p className="text-muted-foreground text-sm">{t.loginRequired.description}</p>
          </div>
          <button
            onClick={handleGoogleLogin}
            disabled={isLoggingIn}
            className="px-6 py-3 rounded-lg border border-border hover:border-foreground transition-all font-medium disabled:opacity-50 flex items-center justify-center gap-2 mx-auto"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span>{isLoggingIn ? t.loginRequired.loading : t.loginRequired.cta}</span>
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 sm:px-6 py-8 md:py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <img src={avatarSrc(user)} alt={displayName(user)} className="w-14 h-14 rounded-full border border-border" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{t.title}</h1>
            <p className="text-sm text-muted-foreground">{displayName(user)} — {t.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <StatCard label={t.stats.totalTests} value={stats.totalTests.toString()} />
          <StatCard label={t.stats.avgWpm} value={stats.avgWpm.toString()} />
          <StatCard label={t.stats.bestWpm} value={stats.bestWpm.toString()} highlight />
          <StatCard label={t.stats.avgAccuracy} value={`${stats.avgAccuracy}%`} />
        </div>

        <section className="border border-border rounded-lg p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4">{t.chart.title}</h2>
          {chartData.length > 0 ? (
            <div className="w-full h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="index" tick={{ fontSize: 12 }} stroke="currentColor" className="text-muted-foreground" />
                  <YAxis tick={{ fontSize: 12 }} stroke="currentColor" className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Line type="monotone" dataKey="wpm" stroke="currentColor" strokeWidth={2} dot={{ r: 3 }} className="text-primary" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">{t.chart.empty}</p>
          )}
        </section>

        <section className="border border-border rounded-lg p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4">{t.recent.title}</h2>
          {results.length > 0 ? (
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left py-2 px-4 font-medium">{t.recent.headers.date}</th>
                    <th className="text-left py-2 px-4 font-medium">{t.recent.headers.type}</th>
                    <th className="text-right py-2 px-4 font-medium">{t.recent.headers.wpm}</th>
                    <th className="text-right py-2 px-4 font-medium">{t.recent.headers.accuracy}</th>
                    <th className="text-right py-2 px-4 font-medium">{t.recent.headers.stars}</th>
                  </tr>
                </thead>
                <tbody>
                  {results.slice(0, 10).map((r) => (
                    <tr key={r.id} className="border-b border-border/50 last:border-0">
                      <td className="py-3 px-4 whitespace-nowrap text-muted-foreground">
                        {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "—"}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="inline-block px-2 py-0.5 bg-accent rounded text-xs">
                          {r.testType} · {r.difficulty}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-semibold">{r.wpm}</td>
                      <td className="py-3 px-4 text-right font-mono">{r.accuracy}%</td>
                      <td className="py-3 px-4 text-right">{"★".repeat(r.stars)}<span className="text-muted-foreground/40">{"★".repeat(5 - r.stars)}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">{t.recent.empty}</p>
          )}
        </section>

        <div className="flex justify-center pt-4">
          <Link
            href={`/${lang}/tests/30s-easy`}
            className="px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all font-medium"
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`border rounded-lg p-3 md:p-4 ${highlight ? "border-primary/40 bg-primary/5" : "border-border"}`}>
      <p className="text-xs md:text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-2xl md:text-3xl font-bold font-mono">{value}</p>
    </div>
  );
}
