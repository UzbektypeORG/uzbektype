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
import { trackPromo } from "@/lib/track-promo";

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
    tgTitle: "@shavkatovio kanaliga qo'shiling",
    tgSubtitle: "AI yangiliklari va raqamli ko'nikmalar bo'yicha foydali kontent",
    tgCta: "Qo'shilish",
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
    tgTitle: "Join the @shavkatovio channel",
    tgSubtitle: "Practical content on AI news and digital skills",
    tgCta: "Join",
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
    tgTitle: "Канал @shavkatovio",
    tgSubtitle: "Полезный контент об AI и цифровых навыках",
    tgCta: "Вступить",
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

  // One banner impression per results screen.
  useEffect(() => {
    trackPromo("author_banner", "impression", config.language);
  }, [config.language]);

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

      {/* Telegram CTA Banner */}
      <a
        href="https://t.me/shavkatovio"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackPromo("author_banner", "click", config.language)}
        className="group relative block w-full overflow-hidden rounded-xl min-h-[90px] md:min-h-[110px] bg-gradient-to-r from-[#229ED9]/10 via-[#229ED9]/5 to-transparent border border-[#229ED9]/30 hover:border-[#229ED9]/60 hover:shadow-lg hover:shadow-[#229ED9]/10 transition-all duration-300"
      >
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -right-12 -top-12 w-40 h-40 rounded-full bg-[#229ED9]/15 blur-2xl group-hover:bg-[#229ED9]/25 transition-colors duration-300" />

        <div className="relative flex items-center justify-between gap-3 px-4 md:px-6 py-3 md:py-4 h-full">
          <div className="flex items-center gap-3 md:gap-4 min-w-0">
            {/* Telegram icon */}
            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#229ED9] flex items-center justify-center shadow-md shadow-[#229ED9]/30 group-hover:scale-105 transition-transform duration-300">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
              </svg>
            </div>

            <div className="min-w-0">
              <div className="text-sm md:text-base font-semibold text-foreground truncate">
                {t.tgTitle}
              </div>
              <div className="text-[11px] md:text-xs text-muted-foreground truncate">
                {t.tgSubtitle}
              </div>
            </div>
          </div>

          {/* CTA pill */}
          <div className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[#229ED9] text-white text-xs md:text-sm font-medium shadow-md shadow-[#229ED9]/20 group-hover:shadow-lg group-hover:shadow-[#229ED9]/40 group-hover:translate-x-0.5 transition-all duration-300">
            {t.tgCta}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </a>

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
