"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { TestConfig, TypingStats, WpmDataPoint } from "@/types";

interface TestResultsProps {
  config: TestConfig;
  stats: TypingStats & { timeElapsed: number; wpmHistory: WpmDataPoint[]; rawWpm: number; consistency: number };
  onRetry: () => void;
}

// Custom hook for count up animation
function useCountUp(end: number, duration: number = 1500, decimals: number = 0) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = easeOutQuart * end;

      setCount(decimals > 0 ? Math.round(currentValue * 10) / 10 : Math.round(currentValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, decimals]);

  return count;
}

const labels = {
  uz: {
    wpm: "WPM",
    accuracy: "Aniqlik",
    rawWpm: "Raw WPM",
    characters: "Belgilar",
    consistency: "Barqarorlik",
    time: "Vaqt",
    tryAgain: "Qaytadan",
  },
  en: {
    wpm: "WPM",
    accuracy: "Accuracy",
    rawWpm: "Raw WPM",
    characters: "Characters",
    consistency: "Consistency",
    time: "Time",
    tryAgain: "Try Again",
  },
  ru: {
    wpm: "WPM",
    accuracy: "Точность",
    rawWpm: "Raw WPM",
    characters: "Символы",
    consistency: "Стабильность",
    time: "Время",
    tryAgain: "Ещё раз",
  },
};

export default function TestResults({
  config,
  stats,
  onRetry,
}: TestResultsProps) {
  const t = labels[config.language];

  // Animated values
  const animatedWpm = useCountUp(stats.wpm, 1500);
  const animatedAccuracy = useCountUp(stats.accuracy, 1500, 1);
  const animatedRawWpm = useCountUp(stats.rawWpm, 1200);
  const animatedCorrect = useCountUp(stats.correctChars, 1200);
  const animatedIncorrect = useCountUp(stats.incorrectChars, 1200);
  const animatedConsistency = useCountUp(stats.consistency, 1200);
  const animatedTime = useCountUp(Math.round(stats.timeElapsed), 1200);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 md:space-y-8 animate-fade-in">
      {/* Main content: Stats + Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        {/* Left: Main Statistics */}
        <div className="flex flex-row lg:flex-col justify-between lg:justify-start items-center lg:items-start p-4 lg:p-0 border border-border lg:border-0 rounded-lg lg:rounded-none gap-4 lg:gap-6">
          {/* WPM */}
          <div className="space-y-1 text-left">
            <div className="text-4xl md:text-7xl lg:text-8xl font-bold tabular-nums text-primary">
              {animatedWpm}
            </div>
            <div className="text-xs md:text-base text-muted-foreground uppercase tracking-wider">
              {t.wpm}
            </div>
          </div>

          {/* Accuracy */}
          <div className="space-y-1 text-right lg:text-left">
            <div className="text-4xl md:text-6xl lg:text-7xl font-bold tabular-nums text-primary">
              {animatedAccuracy}%
            </div>
            <div className="text-xs md:text-base text-muted-foreground uppercase tracking-wider">
              {t.accuracy}
            </div>
          </div>
        </div>

        {/* Right: WPM Graph */}
        <div className="border border-border rounded-lg p-4 md:p-6 bg-card/50">
          <div className="h-48 md:h-64">
            {stats.wpmHistory.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={stats.wpmHistory}
                  margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="time"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}s`}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 'auto']}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                    labelFormatter={(value) => `${value}s`}
                  />
                  <Line
                    type="monotone"
                    dataKey="wpm"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: 'hsl(var(--primary))' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rawWpm"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </div>
          <div className="flex items-center justify-center gap-4 mt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-primary" />
              <span>WPM</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-muted-foreground" style={{ borderTop: '1px dashed' }} />
              <span>Raw WPM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 md:p-4 border border-border rounded-lg">
          <div className="text-xl md:text-2xl font-semibold tabular-nums text-muted-foreground">
            {animatedRawWpm}
          </div>
          <div className="text-xs text-muted-foreground mt-1">{t.rawWpm}</div>
        </div>
        <div className="text-center p-3 md:p-4 border border-border rounded-lg">
          <div className="text-xl md:text-2xl font-semibold tabular-nums text-muted-foreground">
            <span className="text-green-500">{animatedCorrect}</span>
            <span className="mx-1">/</span>
            <span className="text-red-500">{animatedIncorrect}</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">{t.characters}</div>
        </div>
        <div className="text-center p-3 md:p-4 border border-border rounded-lg">
          <div className="text-xl md:text-2xl font-semibold tabular-nums text-muted-foreground">
            {animatedConsistency}%
          </div>
          <div className="text-xs text-muted-foreground mt-1">{t.consistency}</div>
        </div>
        <div className="text-center p-3 md:p-4 border border-border rounded-lg">
          <div className="text-xl md:text-2xl font-semibold tabular-nums text-muted-foreground">
            {animatedTime}s
          </div>
          <div className="text-xs text-muted-foreground mt-1">{t.time}</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center pb-20 md:pb-0">
        <button
          onClick={onRetry}
          className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all duration-200 font-medium"
        >
          {t.tryAgain}
        </button>
      </div>
    </div>
  );
}
