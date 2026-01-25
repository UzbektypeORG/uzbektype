"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { Timer } from "lucide-react";
import TypingTest from "@/components/typing/TypingTest";
import TestResults from "@/components/typing/TestResults";
import { getTestText } from "@/lib/getTestText";
import { calculateStars } from "@/lib/calculateStars";
import { saveTestResult } from "@/lib/localStorage";
import type { TestConfig, TypingStats, Language, TestType, Difficulty } from "@/types";

const languages: Language[] = ["uz", "en", "ru"];
const testTypes: TestType[] = ["10s", "30s", "60s", "10w", "30w", "60w"];
const difficulties: Difficulty[] = ["easy", "medium", "hard"];

const labels = {
  uz: {
    back: "Orqaga",
    changeFormat: "Formatni o'zgartirish",
    restart: "Qaytadan boshlash"
  },
  en: {
    back: "Back",
    changeFormat: "Change Format",
    restart: "Restart"
  },
  ru: {
    back: "Назад",
    changeFormat: "Изменить формат",
    restart: "Перезапустить"
  }
};

export default function TestPage() {
  const params = useParams();
  const typeParam = params.type as string;
  const lang = (params.lang as Language) || "uz";

  const [config, setConfig] = useState<TestConfig | null>(null);
  const [text, setText] = useState("");
  const [result, setResult] = useState<(TypingStats & { timeElapsed: number }) | null>(null);
  const [stars, setStars] = useState(0);
  const [key, setKey] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(0.5);
  const [correctCharColor, setCorrectCharColor] = useState<'default' | 'blue' | 'yellow' | 'green'>('default');

  useEffect(() => {
    // Load animation speed and color from localStorage
    const savedSpeed = localStorage.getItem("uzbektype_animation_speed");
    if (savedSpeed) {
      const speed = parseFloat(savedSpeed);
      if (speed >= 0.1 && speed <= 2.0) {
        setAnimationSpeed(speed);
      }
    }

    const savedColor = localStorage.getItem("uzbektype_correct_color") as 'default' | 'blue' | 'yellow' | 'green';
    if (savedColor && ['default', 'blue', 'yellow', 'green'].includes(savedColor)) {
      setCorrectCharColor(savedColor);
    }

    // Parse test type and difficulty from URL
    const parts = typeParam.split("-");
    if (parts.length !== 2) {
      notFound();
      return;
    }

    const [testType, difficulty] = parts as [TestType, Difficulty];

    if (
      !testTypes.includes(testType) ||
      !difficulties.includes(difficulty)
    ) {
      notFound();
      return;
    }

    const testConfig: TestConfig = {
      language: lang,
      testType,
      difficulty,
    };

    const isWordBased = testType.endsWith("w");
    const targetCount = parseInt(testType);
    const testText = getTestText(lang, difficulty, isWordBased, targetCount);

    setConfig(testConfig);
    setText(testText);
  }, [typeParam, lang]);

  const handleTestComplete = (stats: TypingStats & { timeElapsed: number }) => {
    if (!config) return;

    const calculatedStars = calculateStars({
      wpm: stats.wpm,
      accuracy: stats.accuracy,
      difficulty: config.difficulty,
      testType: config.testType,
    });

    // Save to localStorage
    saveTestResult({
      language: config.language,
      testType: config.testType,
      difficulty: config.difficulty,
      wpm: stats.wpm,
      accuracy: stats.accuracy,
      stars: calculatedStars,
      correctChars: stats.correctChars,
      incorrectChars: stats.incorrectChars,
      totalChars: stats.totalChars,
    });

    setStars(calculatedStars);
    setResult(stats);
  };

  const handleRetry = () => {
    setResult(null);
    setStars(0);
    setKey((prev) => prev + 1);
  };

  const handleAnimationSpeedChange = (speed: number) => {
    setAnimationSpeed(speed);
    localStorage.setItem("uzbektype_animation_speed", speed.toString());
  };

  const handleCorrectCharColorChange = (color: 'default' | 'blue' | 'yellow' | 'green') => {
    setCorrectCharColor(color);
    localStorage.setItem("uzbektype_correct_color", color);
  };

  if (!config || !text) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const t = labels[config.language];

  return (
    <main className="h-[calc(100vh-73px)] flex flex-col">
      {!result ? (
        <>
          {/* Upper flex-1 space - test header at bottom */}
          <div className="flex-1 flex items-end justify-center pb-4 md:pb-8 px-4 md:px-0">
            <div className="w-full md:w-[80%] max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
              {/* Left: Test Format */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-start">
                <span className="text-sm font-semibold">{config.testType.toUpperCase()}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm capitalize text-muted-foreground">{config.difficulty}</span>
              </div>

              {/* Center: Controls */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-center">
                {/* Color Picker */}
                <div className="flex items-center gap-1 border border-border rounded-lg p-1">
                  <button
                    onClick={() => handleCorrectCharColorChange('default')}
                    className={`w-7 h-7 md:w-6 md:h-6 rounded-full bg-foreground border-2 transition-all ${
                      correctCharColor === 'default'
                        ? 'border-foreground scale-110 ring-2 ring-muted'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    title="Default"
                  />
                  <button
                    onClick={() => handleCorrectCharColorChange('blue')}
                    className={`w-7 h-7 md:w-6 md:h-6 rounded-full bg-blue-500 border-2 transition-all ${
                      correctCharColor === 'blue'
                        ? 'border-foreground scale-110'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    title="Ko'k"
                  />
                  <button
                    onClick={() => handleCorrectCharColorChange('yellow')}
                    className={`w-7 h-7 md:w-6 md:h-6 rounded-full bg-yellow-500 border-2 transition-all ${
                      correctCharColor === 'yellow'
                        ? 'border-foreground scale-110'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    title="Sariq"
                  />
                  <button
                    onClick={() => handleCorrectCharColorChange('green')}
                    className={`w-7 h-7 md:w-6 md:h-6 rounded-full bg-green-500 border-2 transition-all ${
                      correctCharColor === 'green'
                        ? 'border-foreground scale-110'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    title="Yashil"
                  />
                </div>

                {/* Animation Speed Slider */}
                <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-1.5">
                  <Timer size={16} className="text-muted-foreground flex-shrink-0" />
                  <input
                    type="range"
                    min="0.1"
                    max="2"
                    step="0.05"
                    value={animationSpeed}
                    onChange={(e) => handleAnimationSpeedChange(parseFloat(e.target.value))}
                    className="animation-speed-slider w-20 md:w-auto"
                  />
                  <span className="text-xs text-muted-foreground w-10 text-right flex-shrink-0">{animationSpeed.toFixed(2)}s</span>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-end">
                <Link
                  href={`/${lang}/tests`}
                  className="px-3 py-1.5 text-xs border border-border rounded hover:border-foreground dark:hover:border-white transition-colors"
                >
                  {t.changeFormat}
                </Link>
                <button
                  onClick={handleRetry}
                  className="px-3 py-1.5 text-xs border border-border rounded hover:border-foreground dark:hover:border-white transition-colors"
                >
                  {t.restart}
                </button>
                <Link
                  href={`/${lang}/tests`}
                  className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← {t.back}
                </Link>
              </div>
            </div>
          </div>

          {/* Typing text - center */}
          <div className="flex justify-center px-4 md:px-0">
            <div className="w-full md:w-[80%] max-w-6xl">
              <TypingTest
                key={key}
                config={config}
                text={text}
                onComplete={handleTestComplete}
                animationSpeed={animationSpeed}
                correctCharColor={correctCharColor}
              />
            </div>
          </div>

          {/* Lower flex-1 space - empty */}
          <div className="flex-1"></div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center px-4 md:px-0">
          <div className="max-w-[95vw] md:max-w-[80vw] w-full">
            <TestResults
              config={config}
              stats={result}
              stars={stars}
              onRetry={handleRetry}
            />
          </div>
        </div>
      )}
    </main>
  );
}
