"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { notFound, useParams, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Timer, RotateCcw, MoveVertical, Blend } from "lucide-react";
import TypingTest from "@/components/typing/TypingTest";
import TestResults from "@/components/typing/TestResults";
import RecordCelebration from "@/components/RecordCelebration";
import FeedbackModal from "@/components/FeedbackModal";
import TelegramJoinModal from "@/components/TelegramJoinModal";
import AuthorChannelModal from "@/components/AuthorChannelModal";
import DonateModal from "@/components/DonateModal";
import LeaderboardWidget from "@/components/LeaderboardWidget";
import { trackPromo } from "@/lib/track-promo";
import LoginCtaBanner from "@/components/LoginCtaBanner";
import { getTestText } from "@/lib/getTestText";
import { calculateStars } from "@/lib/calculateStars";
import { saveTestResult } from "@/lib/localStorage";
import type { KeystrokeTelemetry } from "@/lib/anti-cheat";
import type { TestConfig, TypingStats, Language, TestType, Difficulty, WpmDataPoint } from "@/types";

const testTypes: TestType[] = ["10s", "30s", "60s", "10w", "30w", "60w"];
const difficulties: Difficulty[] = ["easy", "medium", "hard"];

const labels = {
  uz: {
    back: "Orqaga",
    changeFormat: "Formatni o'zgartirish",
    restart: "Qaytadan boshlash",
    time: "Yozish vaqti",
    difficulty: "Qiyinlik darajasi",
    color: "Harflar rangi",
    speed: "Animatsiya tezligi",
    animation: "Animatsiya",
    easy: "OSON",
    medium: "O'RTA",
    hard: "QIYIN"
  },
  en: {
    back: "Back",
    changeFormat: "Change Format",
    restart: "Restart",
    time: "Typing time",
    difficulty: "Difficulty level",
    color: "Letters color",
    speed: "Animation speed",
    animation: "Animation",
    easy: "EASY",
    medium: "MEDIUM",
    hard: "HARD"
  },
  ru: {
    back: "Назад",
    changeFormat: "Изменить формат",
    restart: "Перезапустить",
    time: "Время печати",
    difficulty: "Уровень сложности",
    color: "Цвет букв",
    speed: "Скорость анимации",
    animation: "Анимация",
    easy: "ЛЁГКИЙ",
    medium: "СРЕДНИЙ",
    hard: "СЛОЖНЫЙ"
  }
};

const mobileWarning = {
  uz: {
    title: "Diqqat",
    message: "Kompyuter orqali kirish tavsiya etiladi",
    ok: "Tushunarli"
  },
  en: {
    title: "Notice",
    message: "We recommend using a computer for the best experience",
    ok: "OK"
  },
  ru: {
    title: "Внимание",
    message: "Рекомендуется использовать компьютер",
    ok: "Понятно"
  }
};

const difficultyOptions: Difficulty[] = ["easy", "medium", "hard"];

const timeOptions = ["10s", "30s", "60s"] as const;

export default function TestPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const typeParam = params.type as string;
  const lang = (params.lang as Language) || "uz";
  // Topic flows through ?topic= from programmatic-SEO landing pages (e.g. /tests/programming)
  const topic = searchParams.get("topic") ?? undefined;
  const topicQuery = topic ? `?topic=${topic}` : "";

  const [config, setConfig] = useState<TestConfig | null>(null);
  const [text, setText] = useState("");
  const [result, setResult] = useState<(TypingStats & { timeElapsed: number; wpmHistory: WpmDataPoint[]; rawWpm: number; consistency: number }) | null>(null);
  const [key, setKey] = useState(0);
  // True while a test is actively being typed — fades the settings bar out.
  const [isTyping, setIsTyping] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [correctCharColor, setCorrectCharColor] = useState<'default' | 'blue' | 'yellow' | 'green'>('default');
  const [animationMode, setAnimationMode] = useState<'bounce' | 'fade'>('bounce');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  const [showAuthorModal, setShowAuthorModal] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [recordType, setRecordType] = useState<"personal" | "top" | null>(null);
  // Server-issued anti-cheat token, minted at test start and required by
  // /api/results to save the score. Held in a ref so the latest value is
  // always available inside handleTestComplete without re-binding the callback.
  const testTokenRef = useRef<string | null>(null);
  const { data: session } = useSession();

  // Mint a fresh anti-cheat token for the given config (signed-in users only;
  // anonymous users get 401 and simply have no token — their results aren't
  // saved anyway). Called when a test is set up and on each retry.
  const requestTestToken = useCallback((cfg: TestConfig) => {
    testTokenRef.current = null;
    fetch("/api/test/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: cfg.language,
        testType: cfg.testType,
        difficulty: cfg.difficulty,
      }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { token?: string } | null) => {
        if (data?.token) testTokenRef.current = data.token;
      })
      .catch(() => {});
  }, []);

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

  // Show mobile warning on page load
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const hasSeenWarning = sessionStorage.getItem("uzbektype_mobile_warning_seen");
    if (isMobile && !hasSeenWarning) {
      setShowMobileWarning(true);
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
    const testText = getTestText(lang, difficulty, isWordBased, targetCount, topic);

    setConfig(testConfig);
    setText(testText);
    requestTestToken(testConfig);
  }, [typeParam, lang, topic, requestTestToken]);

  const handleTestComplete = (stats: TypingStats & { timeElapsed: number; wpmHistory: WpmDataPoint[]; rawWpm: number; consistency: number; telemetry: KeystrokeTelemetry }) => {
    if (!config) return;

    const calculatedStars = calculateStars({
      wpm: stats.wpm,
      accuracy: stats.accuracy,
      difficulty: config.difficulty,
      testType: config.testType,
    });

    // Save to localStorage (always — anonymous and signed-in users alike)
    saveTestResult({
      language: config.language,
      testType: config.testType,
      difficulty: config.difficulty,
      wpm: stats.wpm,
      accuracy: stats.accuracy,
      stars: calculatedStars,
      correctChars: stats.correctChars,
      correctedChars: stats.correctedChars,
      incorrectChars: stats.incorrectChars,
      totalChars: stats.totalChars,
    });

    // Best-effort save to DB (only succeeds when signed in; ignored otherwise).
    // Response carries recordType so we can fire the celebration overlay.
    fetch("/api/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: config.language,
        testType: config.testType,
        difficulty: config.difficulty,
        wpm: stats.wpm,
        accuracy: stats.accuracy,
        stars: calculatedStars,
        correctChars: stats.correctChars,
        correctedChars: stats.correctedChars,
        incorrectChars: stats.incorrectChars,
        totalChars: stats.totalChars,
        timeElapsed: stats.timeElapsed,
        token: testTokenRef.current,
        // Keystroke rhythm + synthetic-event count. The server decides from
        // this whether a human typed the run; see lib/anti-cheat.ts.
        telemetry: stats.telemetry,
      }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { recordType?: "personal" | "top" | null } | null) => {
        if (data?.recordType) setRecordType(data.recordType);
      })
      .catch(() => {});

    // Track completed tests count for feedback modal
    const completedTests = parseInt(localStorage.getItem("uzbektype_completed_tests") || "0") + 1;
    localStorage.setItem("uzbektype_completed_tests", completedTests.toString());

    // Show feedback modal after 7 completed tests (if not already submitted)
    const feedbackSubmitted = localStorage.getItem("uzbektype_feedback_submitted");
    if (completedTests === 7 && !feedbackSubmitted) {
      setTimeout(() => {
        setShowFeedbackModal(true);
      }, 1500); // Show after results appear
    }

    // Channel promo modals, keyed off a test-count milestone. Signed-in users
    // count post-login tests separately so someone who signs in after a few
    // anonymous tests still hits the milestone instead of missing the cutoff.
    // Milestones are spaced so the prompts never stack (3 / 7-feedback / 10).
    let loggedInTests = 0;
    if (session) {
      loggedInTests =
        parseInt(localStorage.getItem("uzbektype_logged_in_tests") || "0") + 1;
      localStorage.setItem("uzbektype_logged_in_tests", loggedInTests.toString());
    }
    const testCount = session ? loggedInTests : completedTests;

    // Donate modal — auto-opens once, right after the 15th test.
    if (!localStorage.getItem("uzbektype_donate_auto_shown") && testCount === 15) {
      localStorage.setItem("uzbektype_donate_auto_shown", "true");
      trackPromo("donate_auto", "impression", config.language);
      setTimeout(() => setShowDonateModal(true), 1700);
    }
    // Author channel (@shavkatovio) — recurring prompt on every 3rd test
    // (3, 6, 9, …). Stops once the user actually opens the channel, so it
    // keeps nudging non-subscribers without nagging people who already joined.
    // The 15th test is skipped here — it belongs to the donate prompt above.
    else if (
      !localStorage.getItem("uzbektype_author_joined") &&
      testCount > 0 &&
      testCount % 3 === 0
    ) {
      setTimeout(() => setShowAuthorModal(true), 1700);
    }

    // Site channel (@uzbektype) — once, at the 10th test. 10 isn't a multiple
    // of 3, so it never lands on the same test as the author prompt.
    if (!localStorage.getItem("uzbektype_telegram_invited") && testCount === 10) {
      setTimeout(() => setShowTelegramModal(true), 1700);
    }

    setResult(stats);
  };

  const handleTelegramClose = () => {
    setShowTelegramModal(false);
    localStorage.setItem("uzbektype_telegram_invited", "true");
  };

  const handleAuthorClose = () => {
    // Just dismiss — the every-3rd-test spacing handles re-prompting. The prompt
    // only stops for good once the user opens the channel (flag set in the modal).
    setShowAuthorModal(false);
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
      const newText = getTestText(config.language, config.difficulty, isWordBased, targetCount, topic);
      setText(newText);
      requestTestToken(config);
    }
    setResult(null);
    setRecordType(null);
    setIsTyping(false);
    setKey((prev) => prev + 1);
  };

  // Live ref to the latest handleRetry for the keyboard shortcut below.
  const handleRetryRef = useRef(handleRetry);
  useEffect(() => {
    handleRetryRef.current = handleRetry;
  });

  // Tab-then-Enter restarts the test (MonkeyType-style). Tab arms the shortcut,
  // Enter fires it; any other key cancels the pending Tab.
  useEffect(() => {
    let armed = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const disarm = () => {
      armed = false;
      if (timer) clearTimeout(timer);
    };
    const onKeyDown = (e: KeyboardEvent) => {
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
        disarm();
        handleRetryRef.current();
        return;
      }
      if (armed) disarm();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (timer) clearTimeout(timer);
    };
  }, []);

  // Broadcast typing state so global chrome (the header donate button) can
  // freeze its heart-beat + label crossfade while a test is being typed.
  useEffect(() => {
    document.documentElement.setAttribute("data-typing", isTyping ? "true" : "false");
    window.dispatchEvent(new CustomEvent("uz:typing", { detail: isTyping }));
  }, [isTyping]);
  useEffect(() => () => document.documentElement.removeAttribute("data-typing"), []);

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
  // Faint caption shown above each settings control.
  const captionCls = "text-[9px] uppercase tracking-wider text-muted-foreground opacity-70 leading-none whitespace-nowrap";

  return (
    <main className="h-[calc(100vh-73px)] md:h-[calc(100dvh-73px)] flex flex-col">
      {!result ? (
        <>
          {/* Upper flex-1 space - test header at bottom */}
          <div className="pt-4 md:pt-0 md:flex-1 flex items-start md:items-end justify-center pb-4 md:pb-8 px-2 md:px-0">
            <div className="w-full md:w-[80%] max-w-6xl flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
              {/* Mobile Row 1: Time + Difficulty (side by side) */}
              {/* Desktop: Left section */}
              <div className={`flex items-end gap-3 md:gap-5 w-full md:w-auto justify-center md:justify-start transition-opacity duration-300 ${isTyping ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                {/* Time */}
                <div className="flex flex-col items-center gap-1">
                  <span className={captionCls}>{t.time}</span>
                  <div className="flex items-center gap-1 md:gap-2">
                    {timeOptions.map((time) => (
                      <Link
                        key={time}
                        href={`/${lang}/tests/${time}-${config.difficulty}${topicQuery}`}
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
                </div>

                {/* Difficulty */}
                <div className="flex flex-col items-center gap-1">
                  <span className={captionCls}>{t.difficulty}</span>
                  <div className="flex items-center gap-1 md:gap-2">
                    {difficultyOptions.map((diff) => (
                      <Link
                        key={diff}
                        href={`/${lang}/tests/${config.testType}-${diff}${topicQuery}`}
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
              </div>

              {/* Mobile Row 2: Color picker + Slider + Animation mode */}
              {/* Desktop: Center section */}
              <div className={`flex items-end gap-2 md:gap-3 w-full md:w-auto justify-center transition-opacity duration-300 ${isTyping ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                {/* Color */}
                <div className="flex flex-col items-center gap-1">
                  <span className={captionCls}>{t.color}</span>
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
                </div>

                {/* Speed */}
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
                      onChange={(e) => handleAnimationSpeedChange(parseFloat(e.target.value))}
                      className="animation-speed-slider w-12 md:w-20"
                    />
                    <span className="text-[10px] md:text-xs text-muted-foreground w-8 md:w-10 text-right flex-shrink-0">{animationSpeed.toFixed(2)}s</span>
                  </div>
                </div>

                {/* Animation */}
                <div className="flex flex-col items-center gap-1">
                  <span className={captionCls}>{t.animation}</span>
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
              </div>

              {/* Mobile Row 3: Back + Restart, centered like the other rows.
                  Desktop: Back only, right-aligned. */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end">
                <Link
                  href={`/${lang}`}
                  className={`px-2 py-1 md:px-3 md:py-1.5 text-[10px] md:text-xs text-muted-foreground hover:text-foreground transition-all duration-300 ${isTyping ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                >
                  ← {t.back}
                </Link>
                {/* Restart — mobile only, on the right; dims to 20% while typing */}
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
                onActiveChange={setIsTyping}
              />
            </div>
          </div>

          {/* Restart — desktop: centered below the text (with Tab+Enter hint).
              While typing the whole control just dims to 50% (stays clickable). */}
          <div
            className={`hidden md:flex items-center justify-center gap-2 mt-6 md:mt-8 transition-opacity duration-300 ${isTyping ? "opacity-20" : "opacity-100"}`}
          >
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

          {/* Lower flex-1 space - empty (takes remaining space on mobile for keyboard) */}
          <div className="flex-1 md:flex-1"></div>
        </>
      ) : (
        <div className="flex-1 flex items-start xl:items-center justify-center px-3 md:px-6 py-3 md:py-4 overflow-y-auto">
          <div className="w-full max-w-[95vw] md:max-w-[1200px] space-y-3 md:space-y-4">
            <LoginCtaBanner lang={lang} />
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4 xl:gap-6 items-start">
              {/* Left: Statistics */}
              <div className="min-w-0">
                <TestResults
                  config={config}
                  stats={result}
                  onRetry={handleRetry}
                />
              </div>
              {/* Right (xl) / Bottom (mobile): Leaderboard widget — top 5 in result view */}
              <div className="w-full">
                <LeaderboardWidget lang={lang} limit={5} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Record celebration overlay — fires when API confirms personal/top record */}
      {recordType && (
        <RecordCelebration
          mode={recordType}
          lang={lang}
          onDone={() => setRecordType(null)}
        />
      )}

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={handleFeedbackClose}
        onSubmit={handleFeedbackSubmit}
        lang={lang}
      />

      {/* Site channel modal (@uzbektype) — at the 10th test */}
      <TelegramJoinModal
        isOpen={showTelegramModal}
        onClose={handleTelegramClose}
        lang={lang}
      />

      {/* Author channel modal (@shavkatovio) — at the 3rd test */}
      <AuthorChannelModal
        isOpen={showAuthorModal}
        onClose={handleAuthorClose}
        lang={lang}
      />

      {/* Donate modal — auto-opens after the 15th test */}
      <DonateModal
        isOpen={showDonateModal}
        onClose={() => setShowDonateModal(false)}
        lang={lang}
      />

      {/* Mobile Warning Modal */}
      {showMobileWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-background border border-border rounded-lg p-6 mx-4 max-w-sm w-full space-y-4 animate-scale-in">
            <h3 className="text-lg font-semibold text-center">{mobileWarning[lang].title}</h3>
            <p className="text-muted-foreground text-center">{mobileWarning[lang].message}</p>
            <button
              onClick={() => {
                setShowMobileWarning(false);
                sessionStorage.setItem("uzbektype_mobile_warning_seen", "true");
              }}
              className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all duration-200 font-medium"
            >
              {mobileWarning[lang].ok}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
