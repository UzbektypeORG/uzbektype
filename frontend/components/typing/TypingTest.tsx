"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { TestConfig, TypingStats } from "@/types";

interface TypingTestProps {
  config: TestConfig;
  text: string;
  onComplete: (stats: TypingStats & { timeElapsed: number }) => void;
  animationSpeed: number;
  correctCharColor: 'default' | 'blue' | 'yellow' | 'green';
}

export default function TypingTest({ config, text, onComplete, animationSpeed, correctCharColor }: TypingTestProps) {
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ left: 0, top: 0, height: 0 });

  const currentCharRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isTimeBased = config.testType.endsWith("s");
  const testValue = parseInt(config.testType);

  const calculateStats = useCallback((): TypingStats => {
    const correctChars = userInput
      .split("")
      .filter((char, i) => char === text[i]).length;
    const incorrectChars = userInput.length - correctChars;
    const totalChars = userInput.length;
    const accuracy = totalChars > 0 ? (correctChars / totalChars) * 100 : 100;

    const timeElapsed = startTime ? (currentTime - startTime) / 1000 : 0;
    const wpm = timeElapsed > 0 ? (correctChars / 5 / timeElapsed) * 60 : 0;

    return {
      wpm: Math.round(wpm),
      accuracy: Math.round(accuracy * 10) / 10,
      correctChars,
      incorrectChars,
      totalChars,
    };
  }, [userInput, text, startTime, currentTime]);

  useEffect(() => {
    if (!startTime || isFinished) return;
    const interval = setInterval(() => setCurrentTime(Date.now()), 100);
    return () => clearInterval(interval);
  }, [startTime, isFinished]);

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
    onComplete({ ...stats, timeElapsed });
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
      setUserInput((prev) => prev + e.key);
    }
  };

  const stats = calculateStats();
  const timeElapsed = startTime ? (currentTime - startTime) / 1000 : 0;

  // Calculate bounce height based on animation speed
  // Linear interpolation: 0.1s → 2px, 2.0s → 24px
  const minSpeed = 0.1, maxSpeed = 2.0;
  const minHeight = 2, maxHeight = 24;
  const bounceHeight = Math.round(
    minHeight + ((animationSpeed - minSpeed) / (maxSpeed - minSpeed)) * (maxHeight - minHeight)
  );

  // Update cursor position
  useEffect(() => {
    if (currentCharRef.current && containerRef.current) {
      const charRect = currentCharRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      setCursorPosition({
        left: charRect.left - containerRect.left,
        top: charRect.top - containerRect.top,
        height: charRect.height,
      });
    }
  }, [userInput]);

  const renderText = () => {
    const words = text.split(' ');
    let charIndex = 0;

    return words.map((word, wordIdx) => {
      const wordChars = word.split('').map((char, charIdx) => {
        const currentIndex = charIndex;
        charIndex++;

        let className = "char-pending";
        let animationClass = "";

        if (currentIndex < userInput.length) {
          const isCorrect = userInput[currentIndex] === char;
          className = isCorrect ? `char-correct-${correctCharColor}` : "char-incorrect";
          animationClass = isCorrect ? "animate-bounce-up" : "animate-bounce-down";
        } else if (currentIndex === userInput.length) {
          className = "char-current";
          animationClass = "";
        }

        return (
          <span
            key={currentIndex}
            ref={currentIndex === userInput.length ? currentCharRef : null}
            className={`${className} ${animationClass} inline-block transition-all duration-75`}
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
        spaceAnimationClass = isSpaceCorrect ? "animate-bounce-up" : "animate-bounce-down";
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
              ref={spaceIndex === userInput.length ? currentCharRef : null}
              className={`${spaceClassName} ${spaceAnimationClass} inline-block`}
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

  if (isFinished) return null;

  return (
    <div className="w-full animate-fade-in flex flex-col items-center">
      {/* Text Display */}
      <div className="typing-text-container px-4 sm:px-8 md:px-12 py-6 md:py-10 w-full max-w-[95vw] md:max-w-[80vw]">
        <div
          ref={containerRef}
          className="relative text-lg sm:text-xl md:text-2xl leading-relaxed md:leading-loose select-none bg-transparent transition-all duration-200 cursor-text font-mono tracking-normal text-center"
          style={{
            '--animation-speed': `${animationSpeed}s`,
            '--bounce-height': `${bounceHeight}px`
          } as React.CSSProperties}
        >
          {renderText()}

          {/* Vertical Cursor */}
          <div
            className="absolute w-0.5 bg-yellow-500 transition-all duration-150 ease-out pointer-events-none"
            style={{
              left: `${cursorPosition.left}px`,
              top: `${cursorPosition.top}px`,
              height: `${cursorPosition.height}px`,
              transform: 'scaleY(0.85)',
              transformOrigin: 'center',
            }}
          />
        </div>
      </div>

    </div>
  );
}
