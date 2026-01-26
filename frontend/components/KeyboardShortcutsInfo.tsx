"use client";

import { useState, useEffect, useRef } from "react";

type Language = "uz" | "en" | "ru";

const shortcuts = {
  uz: {
    title: "Klaviatura qisqartmalari",
    items: [
      { keys: "Ctrl + Shift + F", action: "Fullscreen rejimi" },
    ]
  },
  en: {
    title: "Keyboard Shortcuts",
    items: [
      { keys: "Ctrl + Shift + F", action: "Fullscreen mode" },
    ]
  },
  ru: {
    title: "Горячие клавиши",
    items: [
      { keys: "Ctrl + Shift + F", action: "Полноэкранный режим" },
    ]
  }
};

export default function KeyboardShortcutsInfo() {
  const [lang, setLang] = useState<Language>("uz");
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const savedLang = localStorage.getItem("uzbektype_language") as Language | null;
    if (savedLang && ["uz", "en", "ru"].includes(savedLang)) {
      setLang(savedLang);
    }

    const handleLanguageChange = () => {
      const newLang = localStorage.getItem("uzbektype_language") as Language | null;
      if (newLang && ["uz", "en", "ru"].includes(newLang)) {
        setLang(newLang);
      }
    };

    window.addEventListener("languagechange", handleLanguageChange);
    return () => window.removeEventListener("languagechange", handleLanguageChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => {
      setShowTooltip(true);
    }, 1000);
    tooltipTimeoutRef.current = timeout;
  };

  const handleMouseLeave = () => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    setShowTooltip(false);
  };

  const tooltipText = lang === "uz" ? "Full Screen" : lang === "ru" ? "Полный экран" : "Full Screen";

  const t = shortcuts[lang];

  return (
    <div className="fixed bottom-4 right-4 z-50 opacity-35 hidden md:block">
      {!isVisible ? (
        <div className="relative">
          <button
            onClick={toggleFullscreen}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="p-3 border border-border rounded-lg bg-background/80 backdrop-blur-sm hover:bg-accent transition-colors"
            aria-label="Toggle fullscreen"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10"/>
            </svg>
          </button>
          {showTooltip && (
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-foreground text-background text-xs rounded whitespace-nowrap animate-fade-in">
              {tooltipText}
            </div>
          )}
        </div>
      ) : (
        <div className="border border-border rounded-lg bg-background/95 backdrop-blur-sm p-4 space-y-3 min-w-[280px] animate-scale-in">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">{t.title}</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="space-y-2">
            {t.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <kbd className="px-2 py-1 border border-border rounded bg-muted font-mono">
                  {item.keys}
                </kbd>
                <span className="text-muted-foreground ml-3">{item.action}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
