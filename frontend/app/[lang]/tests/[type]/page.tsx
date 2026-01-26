"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { Timer, RotateCcw, MoveVertical, Blend } from "lucide-react";
import TypingTest from "@/components/typing/TypingTest";
import TestResults from "@/components/typing/TestResults";
import FeedbackModal from "@/components/FeedbackModal";
import { getTestText } from "@/lib/getTestText";
import { calculateStars } from "@/lib/calculateStars";
import { saveTestResult } from "@/lib/localStorage";
import type { TestConfig, TypingStats, Language, TestType, Difficulty, WpmDataPoint } from "@/types";

const testTypes: TestType[] = ["10s", "30s", "60s", "10w", "30w", "60w"];
const difficulties: Difficulty[] = ["easy", "medium", "hard"];

const labels = {
  uz: {
    back: "Orqaga",
    changeFormat: "Formatni o'zgartirish",
    restart: "Qaytadan boshlash",
    time: "Vaqt",
    easy: "OSON",
    medium: "O'RTA",
    hard: "QIYIN"
  },
  en: {
    back: "Back",
    changeFormat: "Change Format",
    restart: "Restart",
    time: "Time",
    easy: "EASY",
    medium: "MEDIUM",
    hard: "HARD"
  },
  ru: {
    back: "Назад",
    changeFormat: "Изменить формат",
    restart: "Перезапустить",
    time: "Время",
    easy: "ЛЁГКИЙ",
    medium: "СРЕДНИЙ",
    hard: "СЛОЖНЫЙ"
  }
};

const difficultyOptions: Difficulty[] = ["easy", "medium", "hard"];

const timeOptions = ["10s", "30s", "60s"] as const;

export default function TestPage() {
  const params = useParams();
  const typeParam = params.type as string;
  const lang = (params.lang as Language) || "uz";

  const [config, setConfig] = useState<TestConfig | null>(null);
  const [text, setText] = useState("");
  const [result, setResult] = useState<(TypingStats & { timeElapsed: number; wpmHistory: WpmDataPoint[]; rawWpm: number; consistency: number }) | null>(null);
  const [key, setKey] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [correctCharColor, setCorrectCharColor] = useState<'default' | 'blue' | 'yellow' | 'green'>('default');
  const [animationMode, setAnimationMode] = useState<'bounce' | 'fade'>('bounce');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  // Restore fullscreen if it was active before navigation
  useEffect(() => {
    const wasFullscreen = localStorage.getItem("uzbektype_was_fullscreen");
    if (wasFullscreen === "true") {
      localStorage.removeItem("uzbektype_was_fullscreen");
      // Small delay to ensure page is loaded
      setTimeout(() => {
        document.documentElement.requestFullscreen?.().catch(() => {
          // Fullscreen request failed, ignore
        });
      }, 100);
    }
  }, []);

  useEffect(() => {
    // Load animation speed and color from localStorage
    const savedSpeed = localStorage.getItem("uzbektype_animation_speed");
    if (savedSpeed) {
      const speed = parseFloat(savedSpeed);
      if (speed >= 0 && speed <= 2.0) {
        setAnimationSpeed(speed);
      }
    }

    const savedColor = localStorage.getItem("uzbektype_correct_color") as 'default' | 'blue' | 'yellow' | 'green';
    if (savedColor && ['default', 'blue', 'yellow', 'green'].includes(savedColor)) {
      setCorrectCharColor(savedColor);
    }

    const savedMode = localStorage.getItem("uzbektype_animation_mode") as 'bounce' | 'fade';
    if (savedMode && ['bounce', 'fade'].includes(savedMode)) {
      setAnimationMode(savedMode);
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

  const handleTestComplete = (stats: TypingStats & { timeElapsed: number; wpmHistory: WpmDataPoint[]; rawWpm: number; consistency: number }) => {
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

    // Track completed tests count for feedback modal
    const completedTests = parseInt(localStorage.getItem("uzbektype_completed_tests") || "0") + 1;
    localStorage.setItem("uzbektype_completed_tests", completedTests.toString());

    // Show feedback modal at 5, 15, 30 tests (if not already submitted)
    const feedbackSubmitted = localStorage.getItem("uzbektype_feedback_submitted");
    const feedbackMilestones = [5, 15, 30];
    if (feedbackMilestones.includes(completedTests) && !feedbackSubmitted) {
      setTimeout(() => {
        setShowFeedbackModal(true);
      }, 1500); // Show after results appear
    }

    setResult(stats);
  };

  const handleFeedbackSubmit = async (feedback: string) => {
    const sheetUrl = "https://script.google.com/macros/s/AKfycby-IiWY0K3DKTYsy3G3Rknj_8O-Ux67qkIAV9ChaGrG4jJsGOZyVFgBmaqudiW9e6fi/exec";

    try {
      await fetch(sheetUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feedback,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          source: "modal",
        }),
      });
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    }

    // Mark feedback as submitted (won't show again)
    localStorage.setItem("uzbektype_feedback_submitted", "true");
  };

  const handleFeedbackClose = () => {
    setShowFeedbackModal(false);
    // Don't mark as submitted - will show again at next milestone
  };

  const handleRetry = () => {
    // Close feedback modal if open
    setShowFeedbackModal(false);

    // Regenerate text with a new random topic
    if (config) {
      const isWordBased = config.testType.endsWith("w");
      const targetCount = parseInt(config.testType);
      const newText = getTestText(config.language, config.difficulty, isWordBased, targetCount);
      setText(newText);
    }
    setResult(null);
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

  const handleAnimationModeChange = (mode: 'bounce' | 'fade') => {
    setAnimationMode(mode);
    localStorage.setItem("uzbektype_animation_mode", mode);
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
          <div className="pt-4 md:pt-0 md:flex-1 flex items-start md:items-end justify-center pb-4 md:pb-8 px-2 md:px-0">
            <div className="w-full md:w-[80%] max-w-6xl flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
              {/* Mobile Row 1: Time + Difficulty (side by side) */}
              {/* Desktop: Left section */}
              <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-center md:justify-start">
                {/* Time Options */}
                <div className="flex items-center gap-1 md:gap-2">
                  {timeOptions.map((time) => (
                    <Link
                      key={time}
                      href={`/${lang}/tests/${time}-${config.difficulty}`}
                      className={`px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium rounded-lg transition-all ${
                        config.testType === time
                          ? "bg-primary text-primary-foreground"
                          : "border border-border hover:border-foreground"
                      }`}
                    >
                      {time.toUpperCase()}
                    </Link>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-5 md:h-6 w-px bg-border" />

                {/* Difficulty Options */}
                <div className="flex items-center gap-1 md:gap-2">
                  {difficultyOptions.map((diff) => (
                    <Link
                      key={diff}
                      href={`/${lang}/tests/${config.testType}-${diff}`}
                      className={`px-1.5 py-1.5 md:px-3 md:py-2 text-[10px] md:text-xs font-medium rounded-lg transition-all ${
                        config.difficulty === diff
                          ? "bg-primary text-primary-foreground"
                          : "border border-border hover:border-foreground"
                      }`}
                    >
                      {t[diff]}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Row 2: Color picker + Slider + Animation mode */}
              {/* Desktop: Center section */}
              <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto justify-center">
                {/* Color Picker */}
                <div className="flex items-center gap-0.5 md:gap-1 border border-border rounded-lg p-0.5 md:p-1">
                  <button
                    onClick={() => handleCorrectCharColorChange('default')}
                    className={`w-5 h-5 md:w-6 md:h-6 rounded-full bg-foreground border-2 transition-all ${
                      correctCharColor === 'default'
                        ? 'border-foreground scale-110 ring-2 ring-muted'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    title="Default"
                  />
                  <button
                    onClick={() => handleCorrectCharColorChange('blue')}
                    className={`w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-500 border-2 transition-all ${
                      correctCharColor === 'blue'
                        ? 'border-foreground scale-110'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    title="Ko'k"
                  />
                  <button
                    onClick={() => handleCorrectCharColorChange('yellow')}
                    className={`w-5 h-5 md:w-6 md:h-6 rounded-full bg-yellow-500 border-2 transition-all ${
                      correctCharColor === 'yellow'
                        ? 'border-foreground scale-110'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    title="Sariq"
                  />
                  <button
                    onClick={() => handleCorrectCharColorChange('green')}
                    className={`w-5 h-5 md:w-6 md:h-6 rounded-full bg-green-500 border-2 transition-all ${
                      correctCharColor === 'green'
                        ? 'border-foreground scale-110'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    title="Yashil"
                  />
                </div>

                {/* Animation Speed Slider */}
                <div className="flex items-center gap-1 md:gap-2 border border-border rounded-lg px-2 py-1 md:px-3 md:py-1.5">
                  <Timer size={14} className="text-muted-foreground flex-shrink-0 md:hidden" />
                  <Timer size={16} className="text-muted-foreground flex-shrink-0 hidden md:block" />
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.05"
                    value={animationSpeed}
                    onChange={(e) => handleAnimationSpeedChange(parseFloat(e.target.value))}
                    className="animation-speed-slider w-12 md:w-20"
                  />
                  <span className="text-[10px] md:text-xs text-muted-foreground w-8 md:w-10 text-right flex-shrink-0">{animationSpeed.toFixed(2)}s</span>
                </div>

                {/* Animation Mode Buttons */}
                <div className="flex items-center gap-0.5 md:gap-1 border border-border rounded-lg p-0.5 md:p-1">
                  <button
                    onClick={() => handleAnimationModeChange('bounce')}
                    className={`p-1 md:p-1.5 rounded transition-all ${
                      animationMode === 'bounce'
                        ? 'bg-foreground text-background'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    title="Bounce"
                  >
                    <MoveVertical size={14} className="md:hidden" />
                    <MoveVertical size={16} className="hidden md:block" />
                  </button>
                  <button
                    onClick={() => handleAnimationModeChange('fade')}
                    className={`p-1 md:p-1.5 rounded transition-all ${
                      animationMode === 'fade'
                        ? 'bg-foreground text-background'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    title="Fade"
                  >
                    <Blend size={14} className="md:hidden" />
                    <Blend size={16} className="hidden md:block" />
                  </button>
                </div>
              </div>

              {/* Mobile Row 3: Restart + Back */}
              {/* Desktop: Right section */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-end">
                <button
                  onClick={handleRetry}
                  className="p-1.5 md:p-2 border border-border rounded hover:border-foreground dark:hover:border-white transition-colors"
                  title={t.restart}
                >
                  <RotateCcw size={14} className="md:hidden" />
                  <RotateCcw size={16} className="hidden md:block" />
                </button>
                <Link
                  href={`/${lang}/tests`}
                  className="px-2 py-1 md:px-3 md:py-1.5 text-[10px] md:text-xs text-muted-foreground hover:text-foreground transition-colors"
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
                animationMode={animationMode}
              />
            </div>
          </div>

          {/* Lower flex-1 space - empty (takes remaining space on mobile for keyboard) */}
          <div className="flex-1 md:flex-1"></div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center px-4 md:px-0">
          <div className="max-w-[95vw] md:max-w-[80vw] w-full">
            <TestResults
              config={config}
              stats={result}
              onRetry={handleRetry}
            />
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={handleFeedbackClose}
        onSubmit={handleFeedbackSubmit}
        lang={lang}
      />
    </main>
  );
}
