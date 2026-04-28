"use client";

import { useEffect, useState } from "react";

type Mode = "personal" | "top";

const COLORS = ["#fde047", "#f59e0b", "#ef4444", "#ec4899", "#a855f7", "#3b82f6", "#10b981"];
const GOLD = ["#fde047", "#facc15", "#eab308", "#f59e0b"];

const LABELS: Record<Mode, { uz: string; en: string; ru: string }> = {
  personal: {
    uz: "Yangi shaxsiy rekord!",
    en: "New personal record!",
    ru: "Новый личный рекорд!",
  },
  top: {
    uz: "Yangi #1 rekord!",
    en: "New #1 record!",
    ru: "Новый рекорд #1!",
  },
};

export default function RecordCelebration({
  mode,
  lang = "uz",
  onDone,
}: {
  mode: Mode;
  lang?: "uz" | "en" | "ru";
  onDone?: () => void;
}) {
  const n = mode === "top" ? 60 : 32;
  const palette = mode === "top" ? COLORS : GOLD;
  const [particles] = useState(() =>
    Array.from({ length: n }, (_, i) => {
      const deg = -180 + (i / Math.max(1, n - 1)) * 180; // -180° (left) → 0° (right), through up
      const r = (deg * Math.PI) / 180;
      const dist = 65 + Math.random() * 25;
      return {
        i,
        ex: 50 + Math.cos(r) * dist,
        ey: 95 + Math.sin(r) * dist,
        delay: Math.random() * 0.2,
        color: palette[i % palette.length],
      };
    })
  );

  useEffect(() => {
    const t = setTimeout(() => onDone?.(), 2600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes recCelebFly {
          0%   { left: 50%; top: 95%; opacity: 0; }
          10%  { opacity: 1; }
          88%  { opacity: 1; }
          100% { left: var(--ex); top: var(--ey); opacity: 0; }
        }
        @keyframes recCelebText {
          0%   { opacity: 0; transform: translate(-50%, -50%) scale(.85); }
          18%  { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
          70%  { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>

      {particles.map((p) => (
        <span
          key={p.i}
          className="absolute"
          style={
            {
              left: "50%",
              top: "95%",
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: p.color,
              boxShadow: `0 0 12px ${p.color}, 0 0 24px ${p.color}88`,
              transform: "translate(-50%, -50%)",
              animation: `recCelebFly 1.6s ease-out ${p.delay}s both`,
              ["--ex" as string]: `${p.ex}%`,
              ["--ey" as string]: `${p.ey}%`,
            } as React.CSSProperties
          }
        />
      ))}

      <div
        className="absolute left-1/2 text-center"
        style={{
          top: "28%",
          transform: "translate(-50%, -50%)",
          animation: "recCelebText 2.4s ease-out forwards",
        }}
      >
        <div
          className={`text-2xl md:text-4xl font-black ${
            mode === "top" ? "text-amber-400" : "text-emerald-400"
          }`}
          style={{
            textShadow:
              mode === "top"
                ? "0 0 24px rgba(245,158,11,.7), 0 0 4px rgba(0,0,0,.4)"
                : "0 0 20px rgba(16,185,129,.6), 0 0 4px rgba(0,0,0,.4)",
          }}
        >
          {LABELS[mode][lang]}
        </div>
      </div>
    </div>
  );
}
