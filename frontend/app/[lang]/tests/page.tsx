"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import RecentResults from "@/components/RecentResults";

type Language = "uz" | "en" | "ru";

const translations = {
  uz: {
    title: "Typing Test",
    subtitle: "Testni tanlang",
    timeBased: "Vaqt bo'yicha",
    wordBased: "So'z bo'yicha",
    easy: "Oson",
    medium: "O'rta",
    hard: "Qiyin",
    seconds: "sekund",
    words: "so'z",
    back: "← Orqaga",
  },
  en: {
    title: "Typing Test",
    subtitle: "Choose a test",
    timeBased: "Time-based",
    wordBased: "Word-based",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    seconds: "seconds",
    words: "words",
    back: "← Back",
  },
  ru: {
    title: "Тест скорости",
    subtitle: "Выберите тест",
    timeBased: "По времени",
    wordBased: "По словам",
    easy: "Легкий",
    medium: "Средний",
    hard: "Сложный",
    seconds: "секунд",
    words: "слов",
    back: "← Назад",
  },
};

const testTypes = [
  { time: "10s", label: "10", type: "seconds" as const },
  { time: "30s", label: "30", type: "seconds" as const },
  { time: "60s", label: "60", type: "seconds" as const },
];

const wordTests = [
  { time: "10w", label: "10", type: "words" as const },
  { time: "30w", label: "30", type: "words" as const },
  { time: "60w", label: "60", type: "words" as const },
];

const difficulties = ["easy", "medium", "hard"] as const;

export default function TestsPage() {
  const params = useParams();
  const lang = (params.lang as Language) || "uz";
  const [selectedCategory, setSelectedCategory] = useState<"time" | "word" | null>(null);

  const t = translations[lang];

  return (
    <main className="h-screen flex flex-col p-4 md:p-6 max-w-4xl mx-auto overflow-hidden">
      <div className="flex-1 flex flex-col space-y-6 md:space-y-8 animate-fade-in overflow-auto">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t.title}</h1>
              <p className="text-sm md:text-base text-muted-foreground mt-1">{t.subtitle}</p>
            </div>
            {selectedCategory ? (
              <button
                onClick={() => setSelectedCategory(null)}
                className="inline-block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← {t.back}
              </button>
            ) : (
              <Link
                href={`/${lang}`}
                className="inline-block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.back}
              </Link>
            )}
          </div>
        </div>

        {/* Category Selection or Tests */}
        {!selectedCategory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Time-based category */}
            <button
              onClick={() => setSelectedCategory("time")}
              className="border border-gray-300 hover:border-gray-900 dark:border-gray-700 dark:hover:border-white rounded-lg p-8 space-y-3 transition-colors duration-200 hover:bg-accent/30 text-left"
            >
              <h2 className="text-2xl font-bold">{t.timeBased}</h2>
              <p className="text-muted-foreground text-sm">
                {lang === "uz" ? "Vaqt bo'yicha testlar (10s, 30s, 60s)" :
                 lang === "ru" ? "Тесты по времени (10s, 30s, 60s)" :
                 "Time-based tests (10s, 30s, 60s)"}
              </p>
            </button>

            {/* Word-based category */}
            <button
              onClick={() => setSelectedCategory("word")}
              className="border border-gray-300 hover:border-gray-900 dark:border-gray-700 dark:hover:border-white rounded-lg p-8 space-y-3 transition-colors duration-200 hover:bg-accent/30 text-left"
            >
              <h2 className="text-2xl font-bold">{t.wordBased}</h2>
              <p className="text-muted-foreground text-sm">
                {lang === "uz" ? "So'z bo'yicha testlar (10w, 30w, 60w)" :
                 lang === "ru" ? "Тесты по словам (10w, 30w, 60w)" :
                 "Word-based tests (10w, 30w, 60w)"}
              </p>
            </button>
          </div>
        ) : (
          <>
            {/* Time-based tests */}
            {selectedCategory === "time" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">{t.timeBased}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {testTypes.map((test, index) => (
                    <div
                      key={test.time}
                      className="border border-gray-300 hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-500 rounded-lg p-4 space-y-3 transition-colors duration-200 hover:shadow-sm"
                      style={{
                        animation: `fade-in 0.3s ease-out ${index * 100}ms forwards`,
                        opacity: 0
                      }}
                    >
                      <h3 className="font-medium">
                        {test.label} {t[test.type]}
                      </h3>
                      <div className="space-y-2">
                        {difficulties.map((difficulty) => (
                          <Link
                            key={difficulty}
                            href={`/${lang}/tests/${test.time}-${difficulty}`}
                            className="block px-3 py-2 text-sm border border-gray-300 hover:border-gray-900 dark:border-gray-600 dark:hover:border-white rounded hover:bg-accent/50 transition-colors duration-200"
                          >
                            {t[difficulty]}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Word-based tests */}
            {selectedCategory === "word" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">{t.wordBased}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {wordTests.map((test, index) => (
                    <div
                      key={test.time}
                      className="border border-gray-300 hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-500 rounded-lg p-4 space-y-3 transition-colors duration-200 hover:shadow-sm"
                      style={{
                        animation: `fade-in 0.3s ease-out ${index * 100}ms forwards`,
                        opacity: 0
                      }}
                    >
                      <h3 className="font-medium">
                        {test.label} {t[test.type]}
                      </h3>
                      <div className="space-y-2">
                        {difficulties.map((difficulty) => (
                          <Link
                            key={difficulty}
                            href={`/${lang}/tests/${test.time}-${difficulty}`}
                            className="block px-3 py-2 text-sm border border-gray-300 hover:border-gray-900 dark:border-gray-600 dark:hover:border-white rounded hover:bg-accent/50 transition-colors duration-200"
                          >
                            {t[difficulty]}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Recent Results - only show on main category page */}
        {!selectedCategory && <RecentResults />}
      </div>
    </main>
  );
}
