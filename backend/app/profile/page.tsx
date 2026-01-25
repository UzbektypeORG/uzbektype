"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCurrentUser, type User } from "@/lib/mockAuth";
import { getRecentResults } from "@/lib/localStorage";
import type { TestResult, Language } from "@/types";

const translations = {
  uz: {
    back: "Orqaga",
    totalTests: "Jami Testlar",
    avgWpm: "O'rtacha WPM",
    bestWpm: "Eng Yaxshi WPM",
    avgAccuracy: "O'rtacha Aniqlik",
    testHistory: "Test Tarixi",
    noResults: "Hali test natijalari yo'q",
    takeFirstTest: "Birinchi Testni Boshlash",
    testType: "Test Turi",
    difficulty: "Qiyinchilik",
    language: "Til",
    wpm: "WPM",
    accuracy: "Aniqlik",
    stars: "Yulduzlar"
  },
  en: {
    back: "Back",
    totalTests: "Total Tests",
    avgWpm: "Average WPM",
    bestWpm: "Best WPM",
    avgAccuracy: "Avg Accuracy",
    testHistory: "Test History",
    noResults: "No test results yet",
    takeFirstTest: "Take Your First Test",
    testType: "Test Type",
    difficulty: "Difficulty",
    language: "Language",
    wpm: "WPM",
    accuracy: "Accuracy",
    stars: "Stars"
  },
  ru: {
    back: "Назад",
    totalTests: "Всего Тестов",
    avgWpm: "Средний WPM",
    bestWpm: "Лучший WPM",
    avgAccuracy: "Средняя Точность",
    testHistory: "История Тестов",
    noResults: "Пока нет результатов тестов",
    takeFirstTest: "Пройти Первый Тест",
    testType: "Тип Теста",
    difficulty: "Сложность",
    language: "Язык",
    wpm: "WPM",
    accuracy: "Точность",
    stars: "Звезды"
  }
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [results, setResults] = useState<TestResult[]>([]);
  const [currentLang, setCurrentLang] = useState<Language>("uz");
  const [stats, setStats] = useState({
    totalTests: 0,
    avgWpm: 0,
    bestWpm: 0,
    avgAccuracy: 0,
  });

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/');
      return;
    }

    setUser(currentUser);

    // Load test results from localStorage
    const testResults = getRecentResults(20);
    setResults(testResults);

    // Calculate stats
    if (testResults.length > 0) {
      const totalTests = testResults.length;
      const avgWpm = Math.round(
        testResults.reduce((sum, r) => sum + r.wpm, 0) / totalTests
      );
      const bestWpm = Math.max(...testResults.map(r => r.wpm));
      const avgAccuracy = Math.round(
        (testResults.reduce((sum, r) => sum + r.accuracy, 0) / totalTests) * 10
      ) / 10;

      setStats({ totalTests, avgWpm, bestWpm, avgAccuracy });
    }

    // Read language from localStorage
    const savedLang = localStorage.getItem("uzbektype_language") as Language | null;
    if (savedLang && (savedLang === "uz" || savedLang === "en" || savedLang === "ru")) {
      setCurrentLang(savedLang);
    }

    // Listen for language changes
    const handleLanguageChange = () => {
      const newLang = localStorage.getItem("uzbektype_language") as Language | null;
      if (newLang && (newLang === "uz" || newLang === "en" || newLang === "ru")) {
        setCurrentLang(newLang);
      }
    };

    window.addEventListener("languagechange", handleLanguageChange);
    return () => window.removeEventListener("languagechange", handleLanguageChange);
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const t = translations[currentLang];

  return (
    <main className="min-h-screen p-6 max-w-5xl mx-auto">
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full border-2 border-border flex items-center justify-center bg-muted/30">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user.displayName}</h1>
              <p className="text-muted-foreground">@{user.username}</p>
              <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
            </div>
          </div>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← {t.back}
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="border border-border rounded-lg p-6 hover:border-foreground/20 transition-colors">
            <div className="text-3xl font-bold">{stats.totalTests}</div>
            <div className="text-sm text-muted-foreground mt-1">{t.totalTests}</div>
          </div>
          <div className="border border-border rounded-lg p-6 hover:border-foreground/20 transition-colors">
            <div className="text-3xl font-bold">{stats.avgWpm}</div>
            <div className="text-sm text-muted-foreground mt-1">{t.avgWpm}</div>
          </div>
          <div className="border border-border rounded-lg p-6 hover:border-foreground/20 transition-colors">
            <div className="text-3xl font-bold">{stats.bestWpm}</div>
            <div className="text-sm text-muted-foreground mt-1">{t.bestWpm}</div>
          </div>
          <div className="border border-border rounded-lg p-6 hover:border-foreground/20 transition-colors">
            <div className="text-3xl font-bold">{stats.avgAccuracy}%</div>
            <div className="text-sm text-muted-foreground mt-1">{t.avgAccuracy}</div>
          </div>
        </div>

        {/* Test History */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{t.testHistory}</h2>

          {results.length === 0 ? (
            <div className="border border-border rounded-lg p-12 text-center">
              <p className="text-muted-foreground mb-4">{t.noResults}</p>
              <Link
                href="/tests"
                className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity"
              >
                {t.takeFirstTest}
              </Link>
            </div>
          ) : (
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold">{t.testType}</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold">{t.difficulty}</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold">{t.language}</th>
                    <th className="text-right px-4 py-3 text-sm font-semibold">{t.wpm}</th>
                    <th className="text-right px-4 py-3 text-sm font-semibold">{t.accuracy}</th>
                    <th className="text-right px-4 py-3 text-sm font-semibold">{t.stars}</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr
                      key={result.id}
                      className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm font-medium uppercase">
                        {result.testType}
                      </td>
                      <td className="px-4 py-3 text-sm capitalize">
                        {result.difficulty}
                      </td>
                      <td className="px-4 py-3 text-sm uppercase">
                        {result.language}
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-mono font-bold">
                        {result.wpm}
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-mono">
                        {result.accuracy}%
                      </td>
                      <td className="px-4 py-3 text-sm text-right">
                        {'★'.repeat(result.stars)}
                        {'☆'.repeat(5 - result.stars)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
