"use client";

import { useState } from "react";
import FeedbackModal from "./FeedbackModal";

interface FooterFeedbackProps {
  lang: "uz" | "en" | "ru";
}

const content = {
  uz: "Fikr bildirish",
  en: "Give feedback",
  ru: "Оставить отзыв"
};

export default function FooterFeedback({ lang }: FooterFeedbackProps) {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (feedback: string) => {
    const sheetUrl = localStorage.getItem("uzbektype_feedback_sheet_url");

    if (sheetUrl) {
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
            source: "footer",
          }),
        });
      } catch (error) {
        console.error("Failed to submit feedback:", error);
      }
    }

    localStorage.setItem("uzbektype_feedback_submitted", "true");
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-muted-foreground hover:text-foreground transition-colors text-sm"
      >
        {content[lang]}
      </button>

      <FeedbackModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        lang={lang}
      />
    </>
  );
}
