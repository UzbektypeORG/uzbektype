"use client";

import Link from "next/link";
import type { TestConfig, TypingStats } from "@/types";

interface TestResultsProps {
  config: TestConfig;
  stats: TypingStats & { timeElapsed: number };
  stars: number;
  onRetry: () => void;
}

export default function TestResults({
  config,
  stats,
  stars,
  onRetry,
}: TestResultsProps) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 md:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-xl md:text-2xl font-bold">Test Complete</h2>
        <div className="flex justify-center gap-1 text-2xl md:text-3xl">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`transition-all duration-300 ${
                star <= stars ? "text-foreground scale-110" : "text-muted scale-100"
              }`}
              style={{
                animationDelay: `${star * 100}ms`,
                animation: star <= stars ? "fade-in 0.4s ease-out forwards" : "none"
              }}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <div
          className="border border-border rounded-lg p-4 md:p-6 text-center transition-all duration-300 hover:border-foreground dark:hover:border-white hover:bg-accent/30"
          style={{ animationDelay: "100ms" }}
        >
          <div className="text-3xl md:text-4xl font-bold tabular-nums">{stats.wpm}</div>
          <div className="text-xs md:text-sm text-muted-foreground mt-1">Words/Min</div>
        </div>
        <div
          className="border border-border rounded-lg p-4 md:p-6 text-center transition-all duration-300 hover:border-foreground dark:hover:border-white hover:bg-accent/30"
          style={{ animationDelay: "200ms" }}
        >
          <div className="text-3xl md:text-4xl font-bold tabular-nums">{stats.accuracy}%</div>
          <div className="text-xs md:text-sm text-muted-foreground mt-1">Accuracy</div>
        </div>
        <div
          className="border border-border rounded-lg p-4 md:p-6 text-center transition-all duration-300 hover:border-foreground dark:hover:border-white hover:bg-accent/30"
          style={{ animationDelay: "300ms" }}
        >
          <div className="text-3xl md:text-4xl font-bold tabular-nums">{stats.correctChars}</div>
          <div className="text-xs md:text-sm text-muted-foreground mt-1">Correct</div>
        </div>
        <div
          className="border border-border rounded-lg p-4 md:p-6 text-center transition-all duration-300 hover:border-foreground dark:hover:border-white hover:bg-accent/30"
          style={{ animationDelay: "400ms" }}
        >
          <div className="text-3xl md:text-4xl font-bold tabular-nums">{Math.round(stats.timeElapsed)}s</div>
          <div className="text-xs md:text-sm text-muted-foreground mt-1">Time</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onRetry}
          className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all duration-200 font-medium"
        >
          Try Again
        </button>
        <Link
          href={`/${config.language}/tests`}
          className="flex-1 px-4 py-3 border border-border rounded-lg hover:border-foreground dark:hover:border-white hover:bg-accent/50 transition-all duration-200 text-center font-medium"
        >
          All Tests
        </Link>
      </div>

      {/* Info */}
      <div className="pt-4 border-t border-border text-center text-xs md:text-sm text-muted-foreground space-x-2">
        <span>{config.testType.toUpperCase()}</span>
        <span>•</span>
        <span className="capitalize">{config.difficulty}</span>
        <span>•</span>
        <span>{config.language.toUpperCase()}</span>
      </div>
    </div>
  );
}
