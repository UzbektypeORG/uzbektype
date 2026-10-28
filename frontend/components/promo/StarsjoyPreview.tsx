"use client";

import { useState } from "react";
import TestResults from "@/components/typing/TestResults";
import { STARSJOY_VARIANT, type StarsjoyVariant } from "@/components/promo/StarsjoyBanner";
import type { Language, TestConfig } from "@/types";

// Preview of the results screen with each Starsjoy banner design. Uses the
// real TestResults with sample numbers; analytics are switched off here.

const VARIANTS: { id: StarsjoyVariant; name: string; note: string }[] = [
  { id: "premium", name: "A · Premium", note: "Telegram Premium ranglari: binafsha-pushti gradient, oltin yulduz. Eng ko'zga tashlanadigan." },
  { id: "minimal", name: "B · Minimal", note: "Sayt uslubidagi oq-qora karta. Sokin, natijalardan chalg'itmaydi." },
  { id: "personal", name: "C · Shaxsiy", note: "Foydalanuvchining WPM natijasi bilan: \"72 WPM — zo'r natija!\". Kayfiyat yuqori paytni ushlaydi." },
];

const SAMPLE_STATS = {
  wpm: 72,
  accuracy: 96.4,
  correctChars: 351,
  correctedChars: 6,
  incorrectChars: 7,
  totalChars: 364,
  timeElapsed: 30,
  rawWpm: 75,
  consistency: 84,
  wpmHistory: [58, 63, 66, 70, 68, 71, 74, 73, 75, 72, 70, 73, 76, 74, 72, 71, 73, 75, 74, 72, 70, 72, 74, 73, 71, 72, 74, 73, 72, 72].map(
    (wpm, i) => ({ time: i + 1, wpm, rawWpm: wpm + 3 })
  ),
};

export default function StarsjoyPreview({ lang }: { lang: Language }) {
  const [variant, setVariant] = useState<StarsjoyVariant>(STARSJOY_VARIANT);
  const [key, setKey] = useState(0);
  const config: TestConfig = { language: lang, testType: "30s", difficulty: "medium" };
  const current = VARIANTS.find((v) => v.id === variant)!;

  return (
    <div className="w-full max-w-[95vw] md:max-w-[900px] mx-auto space-y-5">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Starsjoy banner · natija ekrani ko&apos;rinishi</span>
        <div className="inline-flex p-1 rounded-xl border border-border bg-accent/30" role="tablist" aria-label="Banner varianti">
          {VARIANTS.map((v) => (
            <button
              key={v.id}
              role="tab"
              aria-selected={variant === v.id}
              onClick={() => setVariant(v.id)}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                variant === v.id ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v.name}
              {v.id === STARSJOY_VARIANT && <span className="ml-1.5 text-[9px] align-top text-primary">●</span>}
            </button>
          ))}
        </div>
        <p className="text-xs md:text-sm text-muted-foreground max-w-xl">{current.note}</p>
        <p className="text-[11px] text-muted-foreground/80 max-w-xl">
          ● — hozir saytda yoqilgan variant. Bu sahifada statistika o&apos;chirilgan; saytda har bir natija ekrani 1 ta ko&apos;rish, har bir bosish 1 ta bosish bo&apos;lib admin paneldagi &quot;Reklama&quot; tabiga tushadi.
        </p>
      </div>

      <TestResults
        key={key}
        config={config}
        stats={SAMPLE_STATS}
        onRetry={() => setKey((k) => k + 1)}
        promoVariant={variant}
        promoTracking={false}
      />
    </div>
  );
}
