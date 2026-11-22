"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X, MoveVertical, Blend, VolumeX, Timer, ChevronDown } from "lucide-react";
import { SOUND_LABELS, SOUND_PROFILES, type SoundProfile } from "@/lib/keySound";

type CharColor = "default" | "blue" | "yellow" | "green";
type AnimationMode = "bounce" | "fade";

interface TestSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: {
    settings: string;
    done: string;
    time: string;
    difficulty: string;
    color: string;
    speed: string;
    animation: string;
    sound: string;
    soundOff: string;
  };
  // Time and difficulty are links (they change the URL, like on desktop).
  timeOptions: readonly { label: string; href: string; active: boolean }[];
  difficultyOptions: readonly { label: string; href: string; active: boolean }[];
  correctCharColor: CharColor;
  onColorChange: (c: CharColor) => void;
  animationSpeed: number;
  onSpeedChange: (s: number) => void;
  animationMode: AnimationMode;
  onModeChange: (m: AnimationMode) => void;
  soundProfile: SoundProfile;
  onSoundChange: (p: SoundProfile) => void;
}

const COLORS: { value: CharColor; cls: string }[] = [
  { value: "default", cls: "bg-foreground" },
  { value: "blue", cls: "bg-blue-500" },
  { value: "yellow", cls: "bg-yellow-500" },
  { value: "green", cls: "bg-green-500" },
];

const SOUND_KIND: Record<Exclude<SoundProfile, "off">, string> = {
  cream: "Linear",
  holypanda: "Tactile",
  mxblue: "Clicky",
};

function Section({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`border border-border rounded-xl p-3 ${className}`}>
      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">{title}</h3>
      {children}
    </section>
  );
}

const choiceCls = (active: boolean) =>
  `h-10 rounded-lg text-sm font-medium inline-flex items-center justify-center gap-1.5 transition-all ${
    active ? "bg-primary text-primary-foreground" : "border border-border hover:border-foreground"
  }`;

// Mobile home for the test settings, which sit in a bar above the text on
// desktop. Collapsing them behind one button lets the text start near the top.
export default function TestSettingsModal(props: TestSettingsModalProps) {
  const { isOpen, onClose, t } = props;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState(false);

  const updateMore = useCallback(() => {
    const el = scrollRef.current;
    setHasMore(!!el && el.scrollTop + el.clientHeight < el.scrollHeight - 4);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    updateMore();
    window.addEventListener("resize", updateMore);
    return () => window.removeEventListener("resize", updateMore);
  }, [isOpen, updateMore]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* One column on phones; from sm up it widens to two columns so every
          section fits on screen at once. */}
      <div className="relative bg-background border border-border rounded-2xl w-full max-w-md sm:max-w-2xl max-h-[88dvh] flex flex-col shadow-xl animate-fade-in">
        <div className="flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-5 pb-3">
          <h2 className="text-lg font-semibold">{t.settings}</h2>
          <button onClick={onClose} aria-label={t.done} className="p-1 text-muted-foreground hover:text-foreground transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="relative min-h-0 flex flex-col">
        <div ref={scrollRef} onScroll={updateMore} className="overflow-y-auto px-4 sm:px-6 pb-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 content-start">
          <Section title={t.time}>
            <div className="grid grid-cols-3 gap-2">
              {props.timeOptions.map((o) => (
                <Link key={o.href} href={o.href} onClick={onClose} className={choiceCls(o.active)}>
                  {o.label}
                </Link>
              ))}
            </div>
          </Section>

          <Section title={t.difficulty}>
            <div className="grid grid-cols-3 gap-2">
              {props.difficultyOptions.map((o) => (
                <Link key={o.href} href={o.href} onClick={onClose} className={choiceCls(o.active)}>
                  {o.label}
                </Link>
              ))}
            </div>
          </Section>

          <Section title={t.sound}>
            <div className="grid grid-cols-4 gap-2">
              {SOUND_PROFILES.map((p) => (
                <button
                  key={p}
                  onClick={() => props.onSoundChange(p)}
                  title={p === "off" ? t.soundOff : SOUND_LABELS[p].title}
                  className={`h-12 rounded-lg flex flex-col items-center justify-center transition-all ${
                    props.soundProfile === p ? "bg-primary text-primary-foreground" : "border border-border hover:border-foreground"
                  }`}
                >
                  {p === "off" ? (
                    <>
                      <VolumeX size={18} />
                      <span className="text-[10px] mt-0.5 opacity-80">{t.soundOff}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-sm font-medium leading-tight">{SOUND_LABELS[p].short}</span>
                      <span className="text-[10px] opacity-70">{SOUND_KIND[p]}</span>
                    </>
                  )}
                </button>
              ))}
            </div>
          </Section>

          <div className="grid grid-cols-[1fr_auto] gap-3">
            <Section title={t.color}>
              <div className="flex items-center justify-between gap-1">
                {COLORS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => props.onColorChange(c.value)}
                    aria-label={c.value}
                    className={`w-9 h-9 rounded-full ${c.cls} border-4 transition-all ${
                      props.correctCharColor === c.value ? "border-background ring-2 ring-foreground scale-105" : "border-transparent opacity-60"
                    }`}
                  />
                ))}
              </div>
            </Section>

            <Section title={t.animation}>
              <div className="flex gap-1.5">
                <button onClick={() => props.onModeChange("bounce")} title="Bounce" className={`${choiceCls(props.animationMode === "bounce")} w-10`}>
                  <MoveVertical size={18} />
                </button>
                <button onClick={() => props.onModeChange("fade")} title="Fade" className={`${choiceCls(props.animationMode === "fade")} w-10`}>
                  <Blend size={18} />
                </button>
              </div>
            </Section>
          </div>

          <Section title={t.speed} className="sm:col-span-2">
            <div className="flex items-center gap-3">
              <Timer size={18} className="text-muted-foreground flex-shrink-0" />
              <input
                type="range"
                min="0"
                max="2"
                step="0.05"
                value={props.animationSpeed}
                onChange={(e) => props.onSpeedChange(parseFloat(e.target.value))}
                className="animation-speed-slider flex-1"
              />
              <span className="text-sm font-medium tabular-nums w-12 text-right">{props.animationSpeed.toFixed(2)}s</span>
            </div>
          </Section>
        </div>

        {/* Shown only while sections are hidden below — otherwise the cut can
            land between two cards and look like the end of the list. */}
        {hasMore && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-background to-transparent flex items-end justify-center pb-1">
            <ChevronDown size={18} className="text-muted-foreground animate-bounce" />
          </div>
        )}
        </div>

        <div className="p-4 sm:px-6 sm:pb-5 pt-3 sm:flex sm:justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-40 h-11 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {t.done}
          </button>
        </div>
      </div>
    </div>
  );
}
