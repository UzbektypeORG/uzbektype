"use client";

import { useState } from "react";

type Mode = "personal" | "top";
type AnimProps = { trigger: number; mode: Mode };

const PERSONAL_WPM = 72;
const TOP_WPM = 138;

const COLORS = ["#fde047", "#f59e0b", "#ef4444", "#ec4899", "#a855f7", "#3b82f6", "#10b981"];
const GOLD = ["#fde047", "#facc15", "#eab308", "#f59e0b"];

export default function CheckPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-neutral-950 dark:to-black py-10 px-4">
      <style>{KEYFRAMES}</style>
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Salyut animatsiyalari — yangi 10</h1>
          <p className="text-slate-600 dark:text-neutral-400 mt-2 text-sm">
            <b>1-5</b> — pastdan tepaga. <b>6-9</b> — yon tomondan markazga. <b>10</b> — ikkalasi birga. Hammasi oxirida yo&apos;q bo&apos;lib ketadi.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Variant n={1} title="Vertikal favvora" desc="Pastki markazdan ustunli purkash, tepada yo'q bo'ladi." render={(p) => <V1Fountain {...p} />} />
          <Variant n={2} title="5 ustunli salyut" desc="Pastdan 5 ta nuqtadan vertikal raketalar." render={(p) => <V2Columns {...p} />} />
          <Variant n={3} title="Kometa yo'llari" desc="Pastdan tepaga uzun izli kometalar." render={(p) => <V3Comets {...p} />} />
          <Variant n={4} title="Yelpig'ich" desc="Pastki markazdan keng burchakda yoyilish." render={(p) => <V4Fan {...p} />} />
          <Variant n={5} title="Lazerli zalp" desc="Pastdan tepaga to'lqin-to'lqin nurlar." render={(p) => <V5Lasers {...p} />} />
          <Variant n={6} title="Ikki yon → markaz" desc="Chap va o'ng tomondan markazga, markazda yo'q bo'ladi." render={(p) => <V6Sides {...p} />} />
          <Variant n={7} title="Diagonal X" desc="Pastki burchaklardan tepaga, markazdan kesishadi." render={(p) => <V7DiagX {...p} />} />
          <Variant n={8} title="4 burchakdan markazga" desc="To'rtta burchakdan markazga, markazda yo'q bo'ladi." render={(p) => <V8FourCorners {...p} />} />
          <Variant n={9} title="Yon to'lqinlari" desc="Yon tomondan ko'p qatlamli to'lqinlar markazga keladi." render={(p) => <V9Waves {...p} />} />
          <Variant n={10} title="Kombo finale" desc="Pastdan favvora + yon tomondan markazga — birga." render={(p) => <V10Combo {...p} />} />
        </div>
      </div>
    </div>
  );
}

function Variant({
  n,
  title,
  desc,
  render,
}: {
  n: number;
  title: string;
  desc: string;
  render: (p: AnimProps) => React.ReactElement;
}) {
  const [trigger, setTrigger] = useState(0);
  const [mode, setMode] = useState<Mode>("personal");

  const fire = (m: Mode) => {
    setMode(m);
    setTrigger((t) => t + 1);
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-5 shadow-sm">
      <div className="mb-3">
        <div className="text-xs font-mono text-slate-500 dark:text-neutral-500">VARYANT {String(n).padStart(2, "0")}</div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-0.5">{title}</h3>
        <p className="text-xs text-slate-600 dark:text-neutral-400 mt-1">{desc}</p>
      </div>

      <div className="relative h-72 rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 dark:from-black dark:to-neutral-950 border border-slate-700 dark:border-neutral-800 overflow-hidden">
        <div key={trigger} className="absolute inset-0">
          {trigger > 0 ? (
            render({ trigger, mode })
          ) : (
            <div className="h-full w-full grid place-items-center text-slate-500 text-sm">Tugmani bosing</div>
          )}
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => fire("personal")}
          className="flex-1 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black text-sm font-semibold transition"
        >
          Shaxsiy rekord
        </button>
        <button
          onClick={() => fire("top")}
          className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-semibold transition shadow-sm"
        >
          Top rekord
        </button>
      </div>
    </div>
  );
}

function CenterStage({ wpm, mode }: { wpm: number; mode: Mode }) {
  return (
    <div className="absolute inset-0 grid place-items-center pointer-events-none z-20">
      <div className="text-center" style={{ animation: "stageIn .6s ease .15s both" }}>
        <div className={`uppercase tracking-widest text-xs font-bold mb-2 ${mode === "top" ? "text-amber-400" : "text-emerald-400"}`}>
          {mode === "top" ? "Yangi #1 rekord" : "Shaxsiy rekord"}
        </div>
        <div
          className={`font-black tabular-nums ${mode === "top" ? "text-7xl" : "text-6xl"} text-white`}
          style={{ textShadow: mode === "top" ? "0 0 20px rgba(245,158,11,.6)" : "0 0 16px rgba(16,185,129,.5)" }}
        >
          {wpm}
        </div>
        <div className="text-xs font-mono text-slate-300 mt-1">WPM</div>
      </div>
    </div>
  );
}

/* ============ Particle ============ */

type ParticleProps = {
  sx: number;
  sy: number;
  ex: number;
  ey: number;
  color: string;
  delay?: number;
  dur?: number;
  size?: number;
  shape?: "dot" | "streak";
  streakLen?: number;
};

function P({ sx, sy, ex, ey, color, delay = 0, dur = 1.4, size = 3, shape = "dot", streakLen = 24 }: ParticleProps) {
  const isStreak = shape === "streak";
  return (
    <span
      className="absolute"
      style={
        {
          left: `${sx}%`,
          top: `${sy}%`,
          width: isStreak ? 2 : size,
          height: isStreak ? streakLen : size,
          borderRadius: isStreak ? 999 : "50%",
          background: isStreak ? `linear-gradient(to bottom, ${color}, transparent)` : color,
          boxShadow: isStreak ? undefined : `0 0 ${size * 3}px ${color}, 0 0 ${size * 6}px ${color}88`,
          filter: isStreak ? `drop-shadow(0 0 4px ${color})` : undefined,
          transform: isStreak ? "translate(-50%, 0)" : "translate(-50%, -50%)",
          animation: `p2p ${dur}s ease-out ${delay}s both`,
          ["--sx" as string]: `${sx}%`,
          ["--sy" as string]: `${sy}%`,
          ["--ex" as string]: `${ex}%`,
          ["--ey" as string]: `${ey}%`,
        } as React.CSSProperties
      }
    />
  );
}

/* ============ 10 VARIANTS ============ */

/* 1. Vertikal favvora — bottom center fountain */
function V1Fountain({ mode }: AnimProps) {
  const wpm = mode === "top" ? TOP_WPM : PERSONAL_WPM;
  const n = mode === "top" ? 60 : 30;
  const spread = mode === "top" ? 35 : 25;
  const palette = mode === "top" ? COLORS : GOLD;
  const [particles] = useState(() =>
    Array.from({ length: n }, (_, i) => {
      const deg = -90 + (Math.random() - 0.5) * 2 * spread;
      const r = deg * (Math.PI / 180);
      const dist = 60 + Math.random() * 30;
      return {
        i,
        ex: 50 + Math.cos(r) * dist,
        ey: 95 + Math.sin(r) * dist,
        delay: Math.random() * 0.25,
        color: palette[i % palette.length],
      };
    })
  );
  return (
    <>
      <CenterStage wpm={wpm} mode={mode} />
      {particles.map((p) => (
        <P key={p.i} sx={50} sy={95} ex={p.ex} ey={p.ey} color={p.color} delay={p.delay} dur={1.3} size={3} />
      ))}
    </>
  );
}

/* 2. 5 ustunli salyut — 5 evenly-spaced bottom launches */
function V2Columns({ mode }: AnimProps) {
  const wpm = mode === "top" ? TOP_WPM : PERSONAL_WPM;
  const positions = [15, 32.5, 50, 67.5, 85];
  const perCol = mode === "top" ? 8 : 4;
  const palette = mode === "top" ? COLORS : GOLD;
  const [particles] = useState(() => {
    const arr: { i: number; sx: number; ex: number; ey: number; delay: number; color: string }[] = [];
    positions.forEach((x, ci) => {
      for (let i = 0; i < perCol; i++) {
        arr.push({
          i: ci * 100 + i,
          sx: x,
          ex: x + (Math.random() - 0.5) * 6,
          ey: 8 + Math.random() * 18,
          delay: ci * 0.1 + Math.random() * 0.08,
          color: palette[ci % palette.length],
        });
      }
    });
    return arr;
  });
  return (
    <>
      <CenterStage wpm={wpm} mode={mode} />
      {particles.map((p) => (
        <P key={p.i} sx={p.sx} sy={95} ex={p.ex} ey={p.ey} color={p.color} delay={p.delay} dur={1.0} size={3} />
      ))}
    </>
  );
}

/* 3. Kometa yo'llari — random bottom positions, vertical streaks */
function V3Comets({ mode }: AnimProps) {
  const wpm = mode === "top" ? TOP_WPM : PERSONAL_WPM;
  const n = mode === "top" ? 14 : 8;
  const palette = mode === "top" ? COLORS : GOLD;
  const [particles] = useState(() =>
    Array.from({ length: n }, (_, i) => ({
      i,
      x: 5 + Math.random() * 90,
      delay: Math.random() * 0.45,
      color: palette[i % palette.length],
    }))
  );
  return (
    <>
      <CenterStage wpm={wpm} mode={mode} />
      {particles.map((p) => (
        <P key={p.i} sx={p.x} sy={95} ex={p.x} ey={5} color={p.color} delay={p.delay} dur={0.85} size={3} shape="streak" streakLen={50} />
      ))}
    </>
  );
}

/* 4. Yelpig'ich — wide angular spread from bottom-center */
function V4Fan({ mode }: AnimProps) {
  const wpm = mode === "top" ? TOP_WPM : PERSONAL_WPM;
  const n = mode === "top" ? 50 : 28;
  const palette = mode === "top" ? COLORS : GOLD;
  const [particles] = useState(() =>
    Array.from({ length: n }, (_, i) => {
      const deg = -180 + (i / Math.max(1, n - 1)) * 180; // -180° (left) → 0° (right)
      const r = deg * (Math.PI / 180);
      const dist = 65 + Math.random() * 20;
      return {
        i,
        ex: 50 + Math.cos(r) * dist,
        ey: 95 + Math.sin(r) * dist,
        delay: Math.random() * 0.2,
        color: palette[i % palette.length],
      };
    })
  );
  return (
    <>
      <CenterStage wpm={wpm} mode={mode} />
      {particles.map((p) => (
        <P key={p.i} sx={50} sy={95} ex={p.ex} ey={p.ey} color={p.color} delay={p.delay} dur={1.4} size={3} />
      ))}
    </>
  );
}

/* 5. Lazerli zalp — vertical lasers in waves */
function V5Lasers({ mode }: AnimProps) {
  const wpm = mode === "top" ? TOP_WPM : PERSONAL_WPM;
  const waves = mode === "top" ? 4 : 2;
  const perWave = mode === "top" ? 7 : 4;
  const [particles] = useState(() => {
    const arr: { i: number; x: number; delay: number; color: string }[] = [];
    for (let w = 0; w < waves; w++) {
      for (let i = 0; i < perWave; i++) {
        const x = 5 + (i / Math.max(1, perWave - 1)) * 90 + (Math.random() - 0.5) * 4;
        arr.push({
          i: w * 100 + i,
          x,
          delay: w * 0.25 + Math.random() * 0.04,
          color: GOLD[w % GOLD.length],
        });
      }
    }
    return arr;
  });
  return (
    <>
      <CenterStage wpm={wpm} mode={mode} />
      {particles.map((p) => (
        <P key={p.i} sx={p.x} sy={95} ex={p.x} ey={-5} color={p.color} delay={p.delay} dur={0.55} size={2} shape="streak" streakLen={55} />
      ))}
    </>
  );
}

/* 6. Ikki yon → markaz */
function V6Sides({ mode }: AnimProps) {
  const wpm = mode === "top" ? TOP_WPM : PERSONAL_WPM;
  const perSide = mode === "top" ? 18 : 10;
  const [particles] = useState(() => {
    const arr: { i: number; sx: number; sy: number; delay: number; color: string }[] = [];
    for (let i = 0; i < perSide; i++) {
      const y = 15 + (i / Math.max(1, perSide - 1)) * 70 + (Math.random() - 0.5) * 5;
      arr.push({ i, sx: -3, sy: y, delay: Math.random() * 0.4, color: COLORS[i % COLORS.length] });
      arr.push({ i: i + 200, sx: 103, sy: y, delay: Math.random() * 0.4, color: COLORS[(i + 3) % COLORS.length] });
    }
    return arr;
  });
  return (
    <>
      <CenterStage wpm={wpm} mode={mode} />
      {particles.map((p) => (
        <P key={p.i} sx={p.sx} sy={p.sy} ex={50} ey={50} color={p.color} delay={p.delay} dur={1.1} size={3} />
      ))}
    </>
  );
}

/* 7. Diagonal X — corners crossing through center */
function V7DiagX({ mode }: AnimProps) {
  const wpm = mode === "top" ? TOP_WPM : PERSONAL_WPM;
  const perDiag = mode === "top" ? 14 : 7;
  const [particles] = useState(() => {
    const arr: { i: number; sx: number; sy: number; ex: number; ey: number; delay: number; color: string }[] = [];
    for (let i = 0; i < perDiag; i++) {
      const jx = (Math.random() - 0.5) * 8;
      const jy = (Math.random() - 0.5) * 8;
      // BL → TR
      arr.push({
        i,
        sx: -3 + jx,
        sy: 100 + jy,
        ex: 100 - jx,
        ey: -3 - jy,
        delay: i * 0.04,
        color: COLORS[i % COLORS.length],
      });
      // BR → TL
      arr.push({
        i: i + 200,
        sx: 103 + jx,
        sy: 100 + jy,
        ex: -3 - jx,
        ey: -3 - jy,
        delay: i * 0.04 + 0.08,
        color: COLORS[(i + 3) % COLORS.length],
      });
    }
    return arr;
  });
  return (
    <>
      <CenterStage wpm={wpm} mode={mode} />
      {particles.map((p) => (
        <P key={p.i} sx={p.sx} sy={p.sy} ex={p.ex} ey={p.ey} color={p.color} delay={p.delay} dur={1.2} size={3} />
      ))}
    </>
  );
}

/* 8. 4 burchakdan markazga */
function V8FourCorners({ mode }: AnimProps) {
  const wpm = mode === "top" ? TOP_WPM : PERSONAL_WPM;
  const perCorner = mode === "top" ? 10 : 5;
  const corners = [
    { sx: -3, sy: -3 },
    { sx: 103, sy: -3 },
    { sx: -3, sy: 103 },
    { sx: 103, sy: 103 },
  ];
  const [particles] = useState(() => {
    const arr: { i: number; sx: number; sy: number; delay: number; color: string }[] = [];
    corners.forEach((c, ci) => {
      for (let i = 0; i < perCorner; i++) {
        arr.push({
          i: ci * 100 + i,
          sx: c.sx + (Math.random() - 0.5) * 10,
          sy: c.sy + (Math.random() - 0.5) * 10,
          delay: Math.random() * 0.4,
          color: COLORS[(ci * 2 + i) % COLORS.length],
        });
      }
    });
    return arr;
  });
  return (
    <>
      <CenterStage wpm={wpm} mode={mode} />
      {particles.map((p) => (
        <P key={p.i} sx={p.sx} sy={p.sy} ex={50} ey={50} color={p.color} delay={p.delay} dur={1.2} size={3} />
      ))}
    </>
  );
}

/* 9. Yon to'lqinlari — multi-wave horizontal sweep from sides */
function V9Waves({ mode }: AnimProps) {
  const wpm = mode === "top" ? TOP_WPM : PERSONAL_WPM;
  const waves = mode === "top" ? 3 : 2;
  const perWave = mode === "top" ? 14 : 9;
  const [particles] = useState(() => {
    const arr: { i: number; sx: number; sy: number; delay: number; color: string; size: number }[] = [];
    for (let w = 0; w < waves; w++) {
      for (let i = 0; i < perWave; i++) {
        const y = 15 + (i / Math.max(1, perWave - 1)) * 70 + (Math.random() - 0.5) * 4;
        arr.push({
          i: w * 1000 + i,
          sx: -5,
          sy: y,
          delay: w * 0.3 + i * 0.015,
          color: COLORS[(w + i) % COLORS.length],
          size: 2,
        });
        arr.push({
          i: w * 1000 + i + 500,
          sx: 105,
          sy: y,
          delay: w * 0.3 + i * 0.015 + 0.08,
          color: COLORS[(w + i + 3) % COLORS.length],
          size: 2,
        });
      }
    }
    return arr;
  });
  return (
    <>
      <CenterStage wpm={wpm} mode={mode} />
      {particles.map((p) => (
        <P key={p.i} sx={p.sx} sy={p.sy} ex={50} ey={50} color={p.color} delay={p.delay} dur={1.0} size={p.size} />
      ))}
    </>
  );
}

/* 10. Kombo finale — bottom-up + sides-converge */
function V10Combo({ mode }: AnimProps) {
  const wpm = mode === "top" ? TOP_WPM : PERSONAL_WPM;
  const fountainN = mode === "top" ? 36 : 20;
  const sidesN = mode === "top" ? 16 : 10;
  const [fountain] = useState(() =>
    Array.from({ length: fountainN }, (_, i) => {
      const deg = -90 + (Math.random() - 0.5) * 50;
      const r = deg * (Math.PI / 180);
      const dist = 60 + Math.random() * 25;
      return {
        i,
        ex: 50 + Math.cos(r) * dist,
        ey: 95 + Math.sin(r) * dist,
        delay: Math.random() * 0.3,
        color: GOLD[i % GOLD.length],
      };
    })
  );
  const [sides] = useState(() => {
    const arr: { i: number; sx: number; sy: number; delay: number; color: string }[] = [];
    for (let i = 0; i < sidesN; i++) {
      const y = 15 + (i / Math.max(1, sidesN - 1)) * 70;
      arr.push({ i, sx: -3, sy: y, delay: 0.4 + i * 0.04, color: COLORS[i % COLORS.length] });
      arr.push({ i: i + 200, sx: 103, sy: y, delay: 0.4 + i * 0.04 + 0.05, color: COLORS[(i + 3) % COLORS.length] });
    }
    return arr;
  });
  return (
    <>
      <CenterStage wpm={wpm} mode={mode} />
      {fountain.map((p) => (
        <P key={`f${p.i}`} sx={50} sy={95} ex={p.ex} ey={p.ey} color={p.color} delay={p.delay} dur={1.3} size={3} />
      ))}
      {sides.map((p) => (
        <P key={`s${p.i}`} sx={p.sx} sy={p.sy} ex={50} ey={50} color={p.color} delay={p.delay} dur={1.0} size={3} />
      ))}
    </>
  );
}

/* ============ KEYFRAMES ============ */
const KEYFRAMES = `
@keyframes stageIn {
  0% { opacity: 0; transform: scale(.85); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes p2p {
  0%   { left: var(--sx); top: var(--sy); opacity: 0; }
  10%  { opacity: 1; }
  88%  { opacity: 1; }
  100% { left: var(--ex); top: var(--ey); opacity: 0; }
}
`;
