"use client";

import { useState, useEffect } from "react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: string) => Promise<void>;
  lang: "uz" | "en" | "ru";
}

const content = {
  uz: {
    title: "Platforma haqida fikrlaringiz bilan bo'lisha olasizmi?",
    placeholder: "Fikringizni yozing...",
    later: "Keyinroq",
    submit: "Yuborish",
    thanks: "Fikringiz uchun rahmat!"
  },
  en: {
    title: "Would you like to share your thoughts about the platform?",
    placeholder: "Write your feedback...",
    later: "Later",
    submit: "Submit",
    thanks: "Thank you for your feedback!"
  },
  ru: {
    title: "Хотите поделиться своими мыслями о платформе?",
    placeholder: "Напишите свой отзыв...",
    later: "Позже",
    submit: "Отправить",
    thanks: "Спасибо за ваш отзыв!"
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
      setTimeout(() => {
        onClose();
      }, 1500);
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
          <div className="text-center py-8">
            <div className="mb-4 flex justify-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <p className="text-lg font-medium">{t.thanks}</p>
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
