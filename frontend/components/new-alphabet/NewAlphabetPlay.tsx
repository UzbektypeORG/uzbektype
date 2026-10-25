"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Timer, RotateCcw, MoveVertical, Blend } from "lucide-react";
import TypingTest from "@/components/typing/TypingTest";
import TestResults from "@/components/typing/TestResults";
import { NEW_ALPHABET_TEXTS } from "@/data/new-alphabet-texts";
import type { Language, TestConfig, TypingStats, WpmDataPoint } from "@/types";

// The /yangi-alifbo play area: same layout, controls and TypingTest /
// TestResults as the main test page (app/[lang]/tests/[type]/page.tsx), but
// self-contained — no test token, nothing posted to /api/results, so practice
// in the new alphabet never touches the leaderboard. TypingTest runs with
// foldCombos so o' g' sh ch type as ö ğ ş ç.

type Result = TypingStats & { timeElapsed: number; wpmHistory: WpmDataPoint[]; rawWpm: number; consistency: number };
type CharColor = "default" | "blue" | "yellow" | "green";
type TimeOption = "10s" | "30s" | "60s";

const timeOptions: TimeOption[] = ["10s", "30s", "60s"];

const labels = {
  uz: {
    back: "Orqaga",
    restart: "Qaytadan boshlash",
    time: "Yozish vaqti",
    color: "Harflar rangi",
    speed: "Animatsiya tezligi",
    animation: "Animatsiya",
    hint: "Klaviaturada yangi harflar yo'qmi? Eski usulda yozing:",
  },
  en: {
    back: "Back",
    restart: "Restart",
    time: "Typing time",
    color: "Letters color",
    speed: "Animation speed",
    animation: "Animation",
    hint: "No keys for the new letters? Type the old way:",
  },
  ru: {
    back: "Назад",
    restart: "Перезапустить",
    time: "Время печати",
    color: "Цвет букв",
    speed: "Скорость анимации",
    animation: "Анимация",
    hint: "Нет клавиш для новых букв? Пишите по-старому:",
  },
};

const COMBO_HINTS = ["o' → ö", "g' → ğ", "sh → ş", "ch → ç"];

function buildText(): string {
  return [...NEW_ALPHABET_TEXTS].sort(() => Math.random() - 0.5).join(" ");
}

export default function NewAlphabetPlay({ lang }: { lang: Language }) {
  const t = labels[lang];
  const [testType, setTestType] = useState<TimeOption>("30s");
  // Fixed order for the server render; shuffled after mount.
  const [text, setText] = useState(() => NEW_ALPHABET_TEXTS.join(" "));
  const [result, setResult] = useState<Result | null>(null);
  const [key, setKey] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [correctCharColor, setCorrectCharColor] = useState<CharColor>("default");
  const [animationMode, setAnimationMode] = useState<"bounce" | "fade">("bounce");

  // Difficulty is only used by TestResults' labels and share text.
  const config: TestConfig = { language: lang, testType, difficulty: "medium" };

  // Same saved preferences as the main test page.
  useEffect(() => {
    try {
      const speed = localStorage.getItem("uzbektype_animation_speed");
      if (speed) setAnimationSpeed(parseFloat(speed));
      const color = localStorage.getItem("uzbektype_correct_color") as CharColor | null;
      if (color) setCorrectCharColor(color);
      const mode = localStorage.getItem("uzbektype_animation_mode") as "bounce" | "fade" | null;
      if (mode) setAnimationMode(mode);
    } catch {
      // Storage blocked — defaults are fine.
    }
    setText(buildText());
  }, []);

  const persist = (k: string, v: string) => {
    try {
      localStorage.setItem(k, v);
    } catch {
      // ignore
    }
  };

  const handleRetry = () => {
    setText(buildText());
    setResult(null);
    setIsTyping(false);
    setKey((prev) => prev + 1);
  };

  const handleTimeChange = (time: TimeOption) => {
    setTestType(time);
    handleRetry();
  };

  // Tab-then-Enter restarts, as on the main test page.
  const handleRetryRef = useRef(handleRetry);
  useEffect(() => {
    handleRetryRef.current = handleRetry;
  });
  useEffect(() => {
    let armed = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const onKeyDown = (e: KeyboardEvent) => {
      // Tab in the converter's textarea below is just Tab.
      if ((e.target as HTMLElement | null)?.tagName === "TEXTAREA") return;
      if (e.key === "Tab") {
        e.preventDefault();
        armed = true;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          armed = false;
        }, 1500);
        return;
      }
      if (armed && e.key === "Enter") {
        e.preventDefault();
        armed = false;
        handleRetryRef.current();
        return;
      }
      armed = false;
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const captionCls = "text-[9px] uppercase tracking-wider text-muted-foreground opacity-70 leading-none whitespace-nowrap";
  const colorBtn = (c: CharColor, bg: string, title: string) => (
    <button
      onClick={() => {
        setCorrectCharColor(c);
        persist("uzbektype_correct_color", c);
      }}
      className={`w-5 h-5 md:w-6 md:h-6 rounded-full ${bg} border-2 transition-all ${
        correctCharColor === c
          ? `border-foreground scale-110 ${c === "default" ? "ring-2 ring-muted" : ""}`
          : "border-transparent opacity-60 hover:opacity-100"
      }`}
      title={title}
    />
  );

  return (
    <section className="h-[calc(100vh-73px)] md:h-[calc(100dvh-73px)] flex flex-col">
      {!result ? (
        <>
          <div className="pt-4 md:pt-0 md:flex-1 flex items-start md:items-end justify-center pb-4 md:pb-8 px-2 md:px-0">
            <div className="w-full md:w-[80%] max-w-6xl flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
              <div className={`flex items-end gap-3 md:gap-5 w-full md:w-auto justify-center md:justify-start transition-opacity duration-300 ${isTyping ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                <div className="flex flex-col items-center gap-1">
                  <span className={captionCls}>{t.time}</span>
                  <div className="flex items-center gap-1 md:gap-2">
                    {timeOptions.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeChange(time)}
                        className={`px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium rounded-lg transition-all ${
                          testType === time ? "bg-primary text-primary-foreground" : "border border-border hover:border-foreground"
                        }`}
                      >
                        {time.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className={`flex items-end gap-2 md:gap-3 w-full md:w-auto justify-center transition-opacity duration-300 ${isTyping ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                <div className="flex flex-col items-center gap-1">
                  <span className={captionCls}>{t.color}</span>
                  <div className="flex items-center gap-0.5 md:gap-1 border border-border rounded-lg p-0.5 md:p-1">
                    {colorBtn("default", "bg-foreground", "Default")}
                    {colorBtn("blue", "bg-blue-500", "Ko'k")}
                    {colorBtn("yellow", "bg-yellow-500", "Sariq")}
                    {colorBtn("green", "bg-green-500", "Yashil")}
                  </div>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <span className={captionCls}>{t.speed}</span>
                  <div className="flex items-center gap-1 md:gap-2 border border-border rounded-lg px-2 py-1 md:px-3 md:py-1.5">
                    <Timer size={14} className="text-muted-foreground flex-shrink-0 md:hidden" />
                    <Timer size={16} className="text-muted-foreground flex-shrink-0 hidden md:block" />
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.05"
                      value={animationSpeed}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value);
                        setAnimationSpeed(v);
                        persist("uzbektype_animation_speed", v.toString());
                      }}
                      className="animation-speed-slider w-12 md:w-20"
                    />
                    <span className="text-[10px] md:text-xs text-muted-foreground w-8 md:w-10 text-right flex-shrink-0">{animationSpeed.toFixed(2)}s</span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <span className={captionCls}>{t.animation}</span>
                  <div className="flex items-center gap-0.5 md:gap-1 border border-border rounded-lg p-0.5 md:p-1">
                    {(["bounce", "fade"] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => {
                          setAnimationMode(mode);
                          persist("uzbektype_animation_mode", mode);
                        }}
                        className={`p-1 md:p-1.5 rounded transition-all ${
                          animationMode === mode ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                        }`}
                        title={mode === "bounce" ? "Bounce" : "Fade"}
                      >
                        {mode === "bounce" ? (
                          <>
                            <MoveVertical size={14} className="md:hidden" />
                            <MoveVertical size={16} className="hidden md:block" />
                          </>
                        ) : (
                          <>
                            <Blend size={14} className="md:hidden" />
                            <Blend size={16} className="hidden md:block" />
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end">
                <Link
                  href={`/${lang}`}
                  className={`px-2 py-1 md:px-3 md:py-1.5 text-[10px] md:text-xs text-muted-foreground hover:text-foreground transition-all duration-300 ${isTyping ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                >
                  ← {t.back}
                </Link>
                <button
                  onClick={handleRetry}
                  className={`md:hidden p-1.5 border border-border rounded hover:border-foreground transition-all duration-300 ${isTyping ? "opacity-20" : "opacity-100"}`}
                  title={t.restart}
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center px-4 md:px-0">
            <div className="w-full md:w-[80%] max-w-6xl">
              <TypingTest
                key={key}
                config={config}
                text={text}
                onComplete={(stats) => setResult(stats)}
                animationSpeed={animationSpeed}
                correctCharColor={correctCharColor}
                animationMode={animationMode}
                onActiveChange={setIsTyping}
                foldCombos
              />
            </div>
          </div>

          <div className={`hidden md:flex items-center justify-center gap-2 mt-6 md:mt-8 transition-opacity duration-300 ${isTyping ? "opacity-20" : "opacity-100"}`}>
            <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
              <kbd className="px-1.5 py-0.5 rounded bg-muted/50 font-mono">Tab</kbd>
              <span>+</span>
              <kbd className="px-1.5 py-0.5 rounded bg-muted/50 font-mono">Enter</kbd>
            </span>
            <button
              onClick={handleRetry}
              className="p-2 border border-border rounded hover:border-foreground dark:hover:border-white transition-colors"
              title={t.restart}
            >
              <RotateCcw size={16} />
            </button>
          </div>

          {/* The one addition to the main layout: how to type the new letters. */}
          <div className={`flex flex-wrap items-center justify-center gap-x-2 gap-y-1 mt-4 px-4 text-[11px] md:text-xs text-muted-foreground transition-opacity duration-300 ${isTyping ? "opacity-0" : "opacity-100"}`}>
            <span>{t.hint}</span>
            {COMBO_HINTS.map((h) => (
              <kbd key={h} className="px-1.5 py-0.5 rounded bg-muted/50 font-mono">{h}</kbd>
            ))}
          </div>

          <div className="flex-1 md:flex-1"></div>
        </>
      ) : (
        <div className="flex-1 flex items-start xl:items-center justify-center px-3 md:px-6 py-3 md:py-4 overflow-y-auto">
          <div className="w-full max-w-[95vw] md:max-w-[900px]">
            <TestResults config={config} stats={result} onRetry={handleRetry} />
          </div>
        </div>
      )}
    </section>
  );
}
