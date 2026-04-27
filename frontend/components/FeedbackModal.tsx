"use client";

import { useState, useEffect } from "react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: string) => Promise<void>;
  lang: "uz" | "en" | "ru";
}

const TELEGRAM_URL = "https://t.me/uzbektype";

const content = {
  uz: {
    title: "Platforma haqida fikrlaringiz bilan bo'lisha olasizmi?",
    placeholder: "Fikringizni yozing...",
    later: "Keyinroq",
    submit: "Yuborish",
    thanks: "Fikringiz uchun rahmat!",
    telegramTitle: "Telegram kanalimizga qo'shiling",
    telegramSub: "Yangiliklar va maslahatlar uchun",
    telegramCta: "Kanalga o'tish",
    close: "Yopish"
  },
  en: {
    title: "Would you like to share your thoughts about the platform?",
    placeholder: "Write your feedback...",
    later: "Later",
    submit: "Submit",
    thanks: "Thank you for your feedback!",
    telegramTitle: "Join our Telegram channel",
    telegramSub: "For updates and tips",
    telegramCta: "Open channel",
    close: "Close"
  },
  ru: {
    title: "Хотите поделиться своими мыслями о платформе?",
    placeholder: "Напишите свой отзыв...",
    later: "Позже",
    submit: "Отправить",
    thanks: "Спасибо за ваш отзыв!",
    telegramTitle: "Подпишитесь на наш Telegram-канал",
    telegramSub: "Новости и советы",
    telegramCta: "Открыть канал",
    close: "Закрыть"
  }
};

export default function FeedbackModal({ isOpen, onClose, onSubmit, lang }: FeedbackModalProps) {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const t = content[lang];

  useEffect(() => {
    if (isOpen) {
      setFeedback("");
      setIsSubmitted(false);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(feedback);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-background border border-border rounded-lg p-6 w-full max-w-md shadow-xl animate-fade-in">
        {isSubmitted ? (
          <div className="text-center py-4">
            <div className="mb-3 flex justify-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <p className="text-lg font-medium mb-6">{t.thanks}</p>

            <div className="border border-border rounded-lg p-4 bg-accent/30 text-left">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#229ED9]/10 flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#229ED9">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{t.telegramTitle}</p>
                  <p className="text-xs text-muted-foreground mb-3">{t.telegramSub}</p>
                  <div className="flex gap-2">
                    <a
                      href={TELEGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setTimeout(onClose, 200)}
                      className="px-4 py-2 text-xs rounded-lg bg-[#229ED9] text-white hover:opacity-90 transition-all font-medium"
                    >
                      {t.telegramCta}
                    </a>
                    <button
                      onClick={onClose}
                      className="px-4 py-2 text-xs rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t.close}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-4 leading-relaxed">
              {t.title}
            </h2>

            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={t.placeholder}
              className="w-full h-32 p-3 border border-border rounded-lg bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              autoFocus
            />

            <div className="mt-4 flex justify-end">
              <button
                onClick={feedback.trim() ? handleSubmit : onClose}
                disabled={isSubmitting}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                  feedback.trim()
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                } disabled:opacity-50`}
              >
                {isSubmitting ? "..." : feedback.trim() ? t.submit : t.later}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
