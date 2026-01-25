"use client";

import { useEffect, useState } from "react";
import { getRecentResults } from "@/lib/localStorage";
import type { TestResult } from "@/types";

export default function RecentResults() {
  const [results, setResults] = useState<TestResult[]>([]);

  useEffect(() => {
    setResults(getRecentResults(5));
  }, []);

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 animate-fade-in opacity-70">
      <h2 className="text-base md:text-lg font-semibold">Recent Results</h2>
      <div className="space-y-2">
        {results.map((result, index) => (
          <div
            key={result.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border border-gray-300 dark:border-gray-700 rounded-lg text-sm transition-colors duration-200 hover:bg-accent/50 gap-2 sm:gap-0"
            style={{
              animation: `fade-in 0.3s ease-out ${index * 50}ms forwards`,
              opacity: 0
            }}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="font-medium capitalize text-xs sm:text-sm">
                {result.testType} • {result.difficulty}
              </span>
              <span className="text-muted-foreground text-xs sm:text-sm">{result.language.toUpperCase()}</span>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
              <div className="text-left sm:text-right tabular-nums">
                <div className="font-bold text-sm">{result.wpm} WPM</div>
                <div className="text-xs text-muted-foreground">{result.accuracy}% acc</div>
              </div>
              <div className="flex gap-0.5 text-sm">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`transition-colors ${star <= result.stars ? "text-foreground" : "text-muted"}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
