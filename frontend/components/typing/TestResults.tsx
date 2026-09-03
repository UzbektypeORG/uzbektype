"use client";

import { useState, useEffect } from "react";
import { Share2 } from "lucide-react";
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
    share: "Ulashish",
    copied: "Nusxalandi!",
    easy: "Oson",
    medium: "O'rta",
    hard: "Qiyin",
  },
  en: {
    wpm: "WPM",
    accuracy: "Accuracy",
    rawWpm: "Raw WPM",
    characters: "Characters",
    consistency: "Consistency",
    time: "Time",
    tryAgain: "Try Again",
    share: "Share",
    copied: "Copied!",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
  },
  ru: {
    wpm: "WPM",
    accuracy: "Точность",
    rawWpm: "Raw WPM",
    characters: "Символы",
    consistency: "Стабильность",
    time: "Время",
    tryAgain: "Ещё раз",
    share: "Поделиться",
    copied: "Скопировано!",
    easy: "Лёгкий",
    medium: "Средний",
    hard: "Сложный",
  },
};

export default function TestResults({
  config,
  stats,
  onRetry,
}: TestResultsProps) {
  const t = labels[config.language];
  const [showCopied, setShowCopied] = useState(false);

  const handleShare = async () => {
    const shareText = `Uzbektype - ${stats.wpm} WPM | ${stats.accuracy}% ${t.accuracy} | ${config.testType.toUpperCase()} ${t[config.difficulty]}\n\nhttps://www.uzbektype.uz`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Uzbektype",
          text: shareText,
        });
      } catch {
        // User cancelled or share failed, fallback to copy
        copyToClipboard(shareText);
      }
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  const [retryEnabled, setRetryEnabled] = useState(false);

  // Enable retry button after 1.5s delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setRetryEnabled(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Animated values
  const animatedWpm = useCountUp(stats.wpm, 1500);
  const animatedAccuracy = useCountUp(stats.accuracy, 1500, 1);
  const animatedRawWpm = useCountUp(stats.rawWpm, 1200);
  const animatedCorrect = useCountUp(stats.correctChars, 1200);
  const animatedCorrected = useCountUp(stats.correctedChars ?? 0, 1200);
  const animatedIncorrect = useCountUp(stats.incorrectChars, 1200);
  const animatedConsistency = useCountUp(stats.consistency, 1200);
  const animatedTime = useCountUp(Math.round(stats.timeElapsed), 1200);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-3 md:space-y-4 lg:space-y-5 animate-fade-in">
      {/* Main content: Stats + Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-3 lg:gap-6">
        {/* Left: Main Statistics */}
        <div className="flex flex-row lg:flex-col justify-around lg:justify-start items-center lg:items-start p-4 md:p-5 lg:p-0 border border-border lg:border-0 rounded-lg lg:rounded-none gap-3 md:gap-4 lg:gap-6">
          {/* WPM */}
          <div className="space-y-1 md:space-y-1.5 text-center lg:text-left">
            <div className="text-5xl md:text-6xl lg:text-8xl font-bold tabular-nums text-primary leading-none">
              {animatedWpm}
            </div>
            <div className="text-xs md:text-base lg:text-lg text-muted-foreground uppercase tracking-wider">
              {t.wpm}
              <span className="mx-1 md:mx-2">·</span>
              <span className="normal-case">{config.testType.toUpperCase()}</span>
              <span className="mx-1 md:mx-2">·</span>
              <span className="normal-case">{t[config.difficulty]}</span>
            </div>
          </div>

          {/* Accuracy */}
          <div className="space-y-1 md:space-y-1.5 text-center lg:text-left">
            <div className="text-4xl md:text-5xl lg:text-7xl font-bold tabular-nums text-primary leading-none">
              {animatedAccuracy}%
            </div>
            <div className="text-xs md:text-base lg:text-lg text-muted-foreground uppercase tracking-wider">
              {t.accuracy}
            </div>
          </div>
        </div>

        {/* Right: WPM Graph — hidden on mobile to save vertical space */}
        <div className="hidden md:block border border-border rounded-lg p-2 md:p-3 lg:p-4 bg-card/50">
          <div className="h-24 md:h-32 lg:h-44">
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
          <div className="flex items-center justify-center gap-3 mt-1 text-[10px] md:text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-primary" />
              <span>WPM</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 border-t border-dashed border-muted-foreground" />
              <span>Raw WPM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Statistics — hidden on mobile to save vertical space */}
      <div className="hidden md:grid grid-cols-4 gap-1.5 md:gap-3">
        <div className="text-center p-1.5 md:p-2 lg:p-3 border border-border rounded-lg">
          <div className="text-sm md:text-lg lg:text-xl font-semibold tabular-nums text-muted-foreground leading-tight">
            {animatedRawWpm}
          </div>
          <div className="text-[9px] md:text-xs text-muted-foreground mt-0.5">{t.rawWpm}</div>
        </div>
        <div className="text-center p-1.5 md:p-2 lg:p-3 border border-border rounded-lg">
          <div className="text-sm md:text-lg lg:text-xl font-semibold tabular-nums text-muted-foreground leading-tight">
            <span className="text-green-500">{animatedCorrect}</span>
            <span className="mx-0.5">/</span>
            <span className="text-orange-500">{animatedCorrected}</span>
            <span className="mx-0.5">/</span>
            <span className="text-red-500">{animatedIncorrect}</span>
          </div>
          <div className="text-[9px] md:text-xs text-muted-foreground mt-0.5">{t.characters}</div>
        </div>
        <div className="text-center p-1.5 md:p-2 lg:p-3 border border-border rounded-lg">
          <div className="text-sm md:text-lg lg:text-xl font-semibold tabular-nums text-muted-foreground leading-tight">
            {animatedConsistency}%
          </div>
          <div className="text-[9px] md:text-xs text-muted-foreground mt-0.5">{t.consistency}</div>
        </div>
        <div className="text-center p-1.5 md:p-2 lg:p-3 border border-border rounded-lg">
          <div className="text-sm md:text-lg lg:text-xl font-semibold tabular-nums text-muted-foreground leading-tight">
            {animatedTime}s
          </div>
          <div className="text-[9px] md:text-xs text-muted-foreground mt-0.5">{t.time}</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-2 md:gap-3">
        <button
          onClick={handleShare}
          className="px-4 py-2 md:px-6 md:py-2.5 border border-border rounded-lg hover:border-foreground transition-all duration-200 font-medium flex items-center gap-2 text-sm md:text-base"
        >
          <Share2 size={16} />
          {showCopied ? t.copied : t.share}
        </button>
        <button
          onClick={onRetry}
          disabled={!retryEnabled}
          className={`px-6 py-2 md:px-8 md:py-2.5 bg-primary text-primary-foreground rounded-lg transition-all duration-200 font-medium text-sm md:text-base ${
            retryEnabled ? 'hover:opacity-90' : 'opacity-50 cursor-not-allowed'
          }`}
        >
          {t.tryAgain}
        </button>
      </div>
    </div>
  );
}
