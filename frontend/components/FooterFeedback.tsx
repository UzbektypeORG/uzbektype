"use client";

import { useState } from "react";
import FeedbackModal from "./FeedbackModal";
import { submitFeedback } from "@/lib/submit-feedback";

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

  const handleSubmit = (feedback: string) => submitFeedback(feedback, "footer", lang);

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
