"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { X, Copy, Check } from "lucide-react";
import { trackPromo } from "@/lib/track-promo";

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "uz" | "en" | "ru";
}

// Uzcard — manual transfer. Display formatted, copy the raw digits so it pastes
// cleanly into any banking app.
const CARD_DISPLAY = "5614 6887 0424 9142";
const CARD_RAW = "5614688704249142";
const CARD_HOLDER = "S. F";

const content = {
  uz: {
    title: "Loyihani qo'llab-quvvatlang",
    holder: "Karta egasi",
    copy: "Nusxa olish",
    copied: "Nusxalandi!",
    thanks: "Har bir yordam uchun rahmat",
    close: "Yopish",
  },
  en: {
    title: "Support the project",
    holder: "Cardholder",
    copy: "Copy",
    copied: "Copied!",
    thanks: "Thank you for your support",
    close: "Close",
  },
  ru: {
    title: "Поддержите проект",
    holder: "Держатель карты",
    copy: "Копировать",
    copied: "Скопировано!",
    thanks: "Спасибо за поддержку",
    close: "Закрыть",
  },
};

export default function DonateModal({ isOpen, onClose, lang }: DonateModalProps) {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;
  const t = content[lang];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CARD_RAW);
    } catch {
      // Fallback for older browsers / insecure contexts.
      const ta = document.createElement("textarea");
      ta.value = CARD_RAW;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    trackPromo("donate_copy", "click", lang);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const modal = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-background border border-border rounded-2xl p-6 w-full max-w-md shadow-xl animate-fade-in">
        <button
          onClick={onClose}
          aria-label={t.close}
          className="absolute top-3 right-3 text-muted-foreground/60 hover:text-foreground transition-colors"
        >
          <X size={18} />
        </button>

        <div className="text-center mb-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon-rounded.png" alt="Uzbektype" className="mx-auto mb-3 w-14 h-14" />
          <h2 className="text-lg font-semibold">{t.title}</h2>
        </div>

        {/* Bank-card visual */}
        <div className="rounded-xl p-5 bg-gradient-to-br from-[#1e3a5f] via-[#274c77] to-[#1e3a5f] text-white shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs uppercase tracking-widest text-white/70">Uzcard</span>
            <div className="w-9 h-6 rounded bg-gradient-to-br from-yellow-300 to-yellow-500 opacity-90" />
          </div>
          <div className="font-mono text-lg md:text-xl tracking-wider mb-4 select-all">
            {CARD_DISPLAY}
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wide text-white/60 mb-0.5">{t.holder}</p>
              <p className="text-sm font-medium">{CARD_HOLDER}</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className={`mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            copied
              ? "bg-green-600 text-white"
              : "bg-primary text-primary-foreground hover:opacity-90"
          }`}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? t.copied : t.copy}
        </button>

        <p className="text-center text-xs text-muted-foreground mt-4">{t.thanks}</p>
      </div>
    </div>
  );

  // Render at document.body so an ancestor's backdrop-filter (the header's
  // blur) can't trap this fixed overlay — it must center on the viewport.
  return createPortal(modal, document.body);
}
