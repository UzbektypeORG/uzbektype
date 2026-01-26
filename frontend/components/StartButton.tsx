"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Language = "uz" | "en" | "ru";

interface StartButtonProps {
  href: string;
  lang: Language;
  children: React.ReactNode;
  className?: string;
}

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

export default function StartButton({ href, lang, children, className }: StartButtonProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
      setShowModal(true);
    }
  };

  const handleContinue = () => {
    setShowModal(false);
    router.push(href);
  };

  const t = mobileWarning[lang];

  return (
    <>
      <a href={href} onClick={handleClick} className={className}>
        {children}
      </a>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-background border border-border rounded-lg p-6 mx-4 max-w-sm w-full space-y-4 animate-scale-in">
            <h3 className="text-lg font-semibold text-center">{t.title}</h3>
            <p className="text-muted-foreground text-center">{t.message}</p>
            <button
              onClick={handleContinue}
              className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all duration-200 font-medium"
            >
              {t.ok}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
