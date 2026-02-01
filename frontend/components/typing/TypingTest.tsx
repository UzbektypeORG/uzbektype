"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { TestConfig, TypingStats, WpmDataPoint } from "@/types";

interface TypingTestProps {
  config: TestConfig;
  text: string;
  onComplete: (stats: TypingStats & { timeElapsed: number; wpmHistory: WpmDataPoint[]; rawWpm: number; consistency: number }) => void;
  animationSpeed: number;
  correctCharColor: 'default' | 'blue' | 'yellow' | 'green';
  animationMode: 'bounce' | 'fade';
}

export default function TypingTest({ config, text: initialText, onComplete, animationSpeed, correctCharColor, animationMode }: TypingTestProps) {
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ left: 0, top: 0, height: 0 });
  const [wpmHistory, setWpmHistory] = useState<WpmDataPoint[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [lineOffsets, setLineOffsets] = useState<number[]>([0]);
  const lastRecordedSecond = useRef(0);

  // Track positions where errors occurred (for corrected chars tracking)
  const errorPositions = useRef<Set<number>>(new Set());

  // For time-based tests: extend text when user reaches the end
  const [text, setText] = useState(initialText);
  const baseTextRef = useRef(initialText);

  // Reset text and error tracking when initialText changes (e.g., on retry)
  useEffect(() => {
    setText(initialText);
    baseTextRef.current = initialText;
    errorPositions.current.clear();
  }, [initialText]);

  const currentCharRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const isTimeBased = config.testType.endsWith("s");
  const testValue = parseInt(config.testType);

  // Extend text when user is close to the end (time-based tests only)
  useEffect(() => {
    if (isTimeBased && !isFinished && userInput.length >= text.length - 50) {
      // Append the base text again with a space separator
      setText(prev => prev + " " + baseTextRef.current);
    }
  }, [userInput.length, text.length, isTimeBased, isFinished]);

  const calculateStats = useCallback((): TypingStats => {
    let pureCorrectChars = 0; // Correct on first try (never had error)
    let correctedChars = 0;   // Was wrong, then fixed
    let incorrectChars = 0;   // Still wrong

    userInput.split("").forEach((char, i) => {
      const isCorrectNow = char === text[i];
      const hadError = errorPositions.current.has(i);

      if (isCorrectNow) {
        if (hadError) {
          correctedChars++;
        } else {
          pureCorrectChars++;
        }
      } else {
        incorrectChars++;
      }
    });

    const totalChars = userInput.length;
    // Only pure correct chars count for accuracy (not corrected ones)
    const accuracy = totalChars > 0 ? (pureCorrectChars / totalChars) * 100 : 100;

    const timeElapsed = startTime ? (currentTime - startTime) / 1000 : 0;
    // For WPM, use pure correct + corrected (all currently correct chars)
    const wpm = timeElapsed > 0 ? ((pureCorrectChars + correctedChars) / 5 / timeElapsed) * 60 : 0;

    return {
      wpm: Math.round(wpm),
      accuracy: Math.round(accuracy * 10) / 10,
      correctChars: pureCorrectChars,
      correctedChars,
      incorrectChars,
      totalChars,
    };
  }, [userInput, text, startTime, currentTime]);

  useEffect(() => {
    if (!startTime || isFinished) return;
    const interval = setInterval(() => {
      const now = Date.now();
      setCurrentTime(now);

      // Record WPM every second
      const elapsedSeconds = Math.floor((now - startTime) / 1000);
      if (elapsedSeconds > lastRecordedSecond.current && elapsedSeconds > 0) {
        lastRecordedSecond.current = elapsedSeconds;

        // Count all currently correct chars (pure + corrected)
        const currentlyCorrectChars = userInput
          .split("")
          .filter((char, i) => char === text[i]).length;
        const totalChars = userInput.length;
        const timeInMinutes = elapsedSeconds / 60;

        const wpm = Math.round((currentlyCorrectChars / 5) / timeInMinutes);
        const rawWpm = Math.round((totalChars / 5) / timeInMinutes);

        setWpmHistory(prev => [...prev, { time: elapsedSeconds, wpm, rawWpm }]);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [startTime, isFinished, userInput, text]);

  useEffect(() => {
    if (!startTime || isFinished) return;
    const timeElapsed = (currentTime - startTime) / 1000;

    if (isTimeBased && timeElapsed >= testValue) {
      finishTest();
      return;
    }

    if (!isTimeBased) {
      const typedWords = userInput.trim().split(/\s+/).length;
      const lastCharMatches = userInput[userInput.length - 1] === text[userInput.length - 1];
      if (typedWords >= testValue && userInput.length >= text.length && lastCharMatches) {
        finishTest();
      }
    }
  }, [currentTime, startTime, userInput, text, isTimeBased, testValue, isFinished]);

  const finishTest = () => {
    if (isFinished) return;
    setIsFinished(true);
    const stats = calculateStats();
    const timeElapsed = startTime ? (Date.now() - startTime) / 1000 : 0;

    // Calculate raw WPM (all characters typed / 5 / time)
    const rawWpm = timeElapsed > 0 ? Math.round((stats.totalChars / 5 / timeElapsed) * 60) : 0;

    // Calculate consistency (standard deviation of WPM values)
    let consistency = 100;
    if (wpmHistory.length > 1) {
      const wpmValues = wpmHistory.map(p => p.wpm);
      const avgWpm = wpmValues.reduce((a, b) => a + b, 0) / wpmValues.length;
      const variance = wpmValues.reduce((sum, val) => sum + Math.pow(val - avgWpm, 2), 0) / wpmValues.length;
      const stdDev = Math.sqrt(variance);
      // Consistency = 100 - (coefficient of variation * 100), clamped to 0-100
      consistency = avgWpm > 0 ? Math.max(0, Math.min(100, Math.round(100 - (stdDev / avgWpm) * 100))) : 100;
    }

    onComplete({ ...stats, timeElapsed, wpmHistory, rawWpm, consistency });
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (isFinished) return;

    // Start timer on first keypress
    if (!startTime && e.key.length === 1) {
      setStartTime(Date.now());
      setCurrentTime(Date.now());
    }

    // Handle backspace
    if (e.key === "Backspace") {
      e.preventDefault();
      setUserInput((prev) => prev.slice(0, -1));
      return;
    }

    // Handle regular character input
    if (e.key.length === 1) {
      e.preventDefault();
      if (!isTimeBased && userInput.length >= text.length) return;

      // Track error positions
      const currentPos = userInput.length;
      if (e.key !== text[currentPos]) {
        errorPositions.current.add(currentPos);
      }

      setUserInput((prev) => prev + e.key);
    }
  };

  // Handle mobile input changes
  const handleMobileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFinished) return;

    const newValue = e.target.value;

    // Start timer on first input
    if (!startTime && newValue.length > 0) {
      setStartTime(Date.now());
      setCurrentTime(Date.now());
    }

    // Track error positions for newly typed characters
    for (let i = userInput.length; i < newValue.length; i++) {
      if (newValue[i] !== text[i]) {
        errorPositions.current.add(i);
      }
    }

    // For non-time-based tests, limit input length
    if (!isTimeBased && newValue.length > text.length) {
      setUserInput(newValue.slice(0, text.length));
      return;
    }

    setUserInput(newValue);
  };

  // Focus hidden input when clicking on typing area
  const handleTypingAreaClick = () => {
    if (hiddenInputRef.current && !isFinished) {
      hiddenInputRef.current.focus();
    }
  };

  const stats = calculateStats();
  const timeElapsed = startTime ? (currentTime - startTime) / 1000 : 0;

  // Calculate bounce height based on animation speed
  // Linear interpolation: 0s → 0px (no animation), 0.1s → 2px, 2.0s → 24px
  const minSpeed = 0.1, maxSpeed = 2.0;
  const minHeight = 2, maxHeight = 24;
  const isAnimationDisabled = animationSpeed === 0;
  const bounceHeight = isAnimationDisabled ? 0 : Math.round(
    minHeight + ((animationSpeed - minSpeed) / (maxSpeed - minSpeed)) * (maxHeight - minHeight)
  );

  // Update cursor position and detect line changes
  useEffect(() => {
    if (currentCharRef.current && containerRef.current) {
      const charRect = currentCharRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      const relativeTop = charRect.top - containerRect.top;

      // Position cursor based on context:
      // - When at end of text: use RIGHT edge of last char (cursor after all text)
      // - Otherwise: use LEFT edge of next char to type (follows line wrapping)
      const isAtEnd = userInput.length >= text.length;
      const cursorLeft = isAtEnd
        ? charRect.right - containerRect.left  // RIGHT edge when finished
        : charRect.left - containerRect.left;  // LEFT edge of next char to type

      setCursorPosition({
        left: cursorLeft,
        top: relativeTop,
        height: charRect.height,
      });

      // Detect which line we're on based on character position
      const lineHeight = charRect.height * 1.5; // approximate line height with leading
      const detectedLine = Math.floor(relativeTop / lineHeight);

      // Update line offsets for scrolling
      if (detectedLine >= 0 && !lineOffsets.includes(detectedLine)) {
        setLineOffsets(prev => [...prev, detectedLine].sort((a, b) => a - b));
      }

      // When we reach line 2 (0-indexed: line 1), scroll up
      if (detectedLine >= 1 && currentLine < detectedLine) {
        setCurrentLine(detectedLine);
      }
    }
  }, [userInput, lineOffsets, currentLine]);

  const getTargetColor = () => {
    const colors = {
      default: 'hsl(var(--foreground))',
      blue: '#3B82F6',
      yellow: '#EAB308',
      green: '#22C55E',
    };
    return colors[correctCharColor];
  };

  const renderText = () => {
    const words = text.split(' ');
    let charIndex = 0;
    const targetColor = getTargetColor();
    // Cursor ref target: next char to type (for line wrapping), or last char if at end of text
    const cursorRefIndex = userInput.length >= text.length ? text.length - 1 : userInput.length;

    return words.map((word, wordIdx) => {
      const wordChars = word.split('').map((char) => {
        const currentIndex = charIndex;
        charIndex++;

        let className = "char-pending";
        let animationClass = "";

        if (currentIndex < userInput.length) {
          const isCorrect = userInput[currentIndex] === char;
          className = isCorrect ? `char-correct-${correctCharColor}` : "char-incorrect";
          if (!isAnimationDisabled) {
            if (animationMode === 'bounce') {
              animationClass = isCorrect ? "animate-bounce-up" : "animate-bounce-down";
            } else {
              animationClass = isCorrect ? "animate-fade-correct" : "animate-fade-incorrect";
            }
          }
        } else if (currentIndex === userInput.length) {
          className = "char-current";
          animationClass = "";
        }

        return (
          <span
            key={currentIndex}
            ref={currentIndex === cursorRefIndex ? currentCharRef : null}
            className={`${className} ${animationClass} inline-block transition-all duration-75`}
            style={{ '--fade-target-color': targetColor } as React.CSSProperties}
          >
            {char}
          </span>
        );
      });

      const spaceIndex = charIndex;
      charIndex++; // increment for space

      let spaceClassName = "char-pending";
      let spaceAnimationClass = "";

      if (spaceIndex < userInput.length) {
        const isSpaceCorrect = userInput[spaceIndex] === ' ';
        spaceClassName = isSpaceCorrect ? `char-correct-${correctCharColor}` : "char-incorrect";
        if (!isAnimationDisabled) {
          if (animationMode === 'bounce') {
            spaceAnimationClass = isSpaceCorrect ? "animate-bounce-up" : "animate-bounce-down";
          } else {
            spaceAnimationClass = isSpaceCorrect ? "animate-fade-correct" : "animate-fade-incorrect";
          }
        }
      } else if (spaceIndex === userInput.length) {
        spaceClassName = "char-current";
        spaceAnimationClass = "";
      }

      return (
        <span key={wordIdx} style={{ display: 'inline-block' }}>
          <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {wordChars}
          </span>
          {wordIdx < words.length - 1 && (
            <span
              ref={spaceIndex === cursorRefIndex ? currentCharRef : null}
              className={`${spaceClassName} ${spaceAnimationClass} inline-block`}
              style={{ '--fade-target-color': targetColor } as React.CSSProperties}
            >
              {'\u00A0'}
            </span>
          )}
        </span>
      );
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [userInput, startTime, isFinished, text, isTimeBased]);

  // Auto-focus hidden input on mount (helps mobile)
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (hiddenInputRef.current) {
        hiddenInputRef.current.focus();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const [lineHeight, setLineHeight] = useState(72);

  // Update line height on mount and resize
  useEffect(() => {
    const updateLineHeight = () => {
      if (window.innerWidth >= 768) {
        setLineHeight(72); // md: text-4xl with leading
      } else if (window.innerWidth >= 640) {
        setLineHeight(60); // sm: text-3xl with leading
      } else {
        setLineHeight(48); // default: text-2xl with leading
      }
    };

    updateLineHeight();
    window.addEventListener('resize', updateLineHeight);
    return () => window.removeEventListener('resize', updateLineHeight);
  }, []);

  if (isFinished) return null;

  const visibleLines = 4;
  const scrollOffset = currentLine * lineHeight;

  return (
    <div className="w-full animate-fade-in flex flex-col items-center">
      {/* Hidden input for mobile keyboard */}
      <input
        ref={hiddenInputRef}
        type="text"
        value={userInput}
        onChange={handleMobileInput}
        className="sr-only"
        autoCapitalize="none"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        aria-label="Type here"
      />

      {/* Text Display */}
      <div
        onClick={handleTypingAreaClick}
        className="typing-text-container px-4 sm:px-8 md:px-12 py-6 md:py-10 w-full max-w-[95vw] md:max-w-[80vw] overflow-hidden relative cursor-text"
        style={{
          maxHeight: `${lineHeight * visibleLines + 40}px`, // 4 lines + padding
        }}
      >
        {/* Top fade overlay - appears when scrolling */}
        <div
          className="absolute top-0 left-0 right-0 z-10 pointer-events-none transition-opacity duration-300"
          style={{
            height: `${lineHeight * 1.2}px`,
            background: 'linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background)) 20%, transparent 100%)',
            opacity: currentLine > 0 ? 1 : 0,
          }}
        />
        <div
          ref={containerRef}
          className="relative select-none bg-transparent cursor-text tracking-normal text-center"
          style={{
            fontFamily: 'var(--font-poppins), sans-serif',
            fontWeight: 500,
            letterSpacing: '0.05em',
            '--animation-speed': `${animationSpeed}s`,
            '--bounce-height': `${bounceHeight}px`,
            transform: `translateY(-${scrollOffset}px)`,
            transition: 'transform 0.3s ease-out',
          } as React.CSSProperties}
        >
          <div
            ref={textWrapperRef}
            className="text-2xl sm:text-3xl md:text-4xl leading-relaxed md:leading-loose"
          >
            {renderText()}
          </div>

          {/* Vertical Cursor */}
          <div
            className="absolute w-[2.5px] transition-all duration-150 ease-out pointer-events-none"
            style={{
              left: `${cursorPosition.left}px`,
              top: `${cursorPosition.top}px`,
              height: `${cursorPosition.height}px`,
              transform: 'scaleY(0.65)',
              transformOrigin: 'center',
              backgroundColor: getTargetColor(),
            }}
          />
        </div>
      </div>

      {/* Time Progress Bar - only for time-based tests */}
      {/* On mobile: fixed below navbar, on desktop: normal position below text */}
      {isTimeBased && startTime && (
        <div className="fixed top-[73px] left-0 right-0 px-4 z-40 md:static md:w-full md:max-w-[80vw] md:mt-4 md:px-12">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{
                width: '100%',
                transform: 'scaleX(0)',
                transformOrigin: 'left',
                animation: `progress-fill ${testValue}s linear forwards`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
