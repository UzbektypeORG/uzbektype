"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import ThemeToggle from "@/components/ThemeToggle";

interface UserData {
  id: string;
  email: string;
  name: string | null;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Totals {
  totalTests: number;
  avgWpm: number;
  bestWpm: number;
  avgAccuracy: number;
  totalStars: number;
}

interface DifficultyStat {
  difficulty: string;
  count: number;
  bestWpm: number;
  avgWpm: number;
}

interface Result {
  id: string;
  language: string;
  testType: string;
  difficulty: string;
  wpm: number;
  accuracy: number;
  stars: number;
  correctChars: number;
  correctedChars: number;
  incorrectChars: number;
  totalChars: number;
  timeElapsed: number;
  createdAt: string;
}

interface Data {
  user: UserData;
  totals: Totals;
  byDifficulty: DifficultyStat[];
  results: Result[];
}

const DIFFICULTIES = ["all", "easy", "medium", "hard"] as const;
const LANGUAGES = ["all", "uz", "en", "ru"] as const;

function fullName(u: UserData): string {
  const parts = [u.firstName, u.lastName].filter(Boolean);
  if (parts.length > 0) return parts.join(" ");
  return u.name ?? "—";
}

function avatarFor(u: UserData): string {
  return u.avatarUrl ?? `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(u.email)}`;
}

export default function AdminUserDetail({ userId }: { userId: string }) {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [diffFilter, setDiffFilter] = useState<(typeof DIFFICULTIES)[number]>("all");
  const [langFilter, setLangFilter] = useState<(typeof LANGUAGES)[number]>("all");

  useEffect(() => {
    fetch(`/api/admin/users/${userId}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(setData)
      .catch((e) => setError(`Yuklashda xato: ${e}`));
  }, [userId]);

  const filteredResults = useMemo(() => {
    if (!data) return [];
    return data.results.filter((r) => {
      if (diffFilter !== "all" && r.difficulty !== diffFilter) return false;
      if (langFilter !== "all" && r.language !== langFilter) return false;
      return true;
    });
  }, [data, diffFilter, langFilter]);

  const chartData = useMemo(() => {
    return [...filteredResults]
      .reverse()
      .slice(-30)
      .map((r, i) => ({ index: i + 1, wpm: r.wpm, accuracy: r.accuracy }));
  }, [filteredResults]);

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-3">
          <p className="text-sm text-red-600">{error}</p>
          <Link href="/admode" className="text-sm underline">← Admin paneliga qaytish</Link>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  const { user, totals, byDifficulty } = data;

  return (
    <main className="min-h-screen px-4 sm:px-6 py-6 md:py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-3">
          <Link href="/admode" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Admin paneliga qaytish
          </Link>
          <ThemeToggle />
        </div>

        {/* Profile card */}
        <section className="border border-border rounded-xl p-5 md:p-6 flex items-center gap-4 md:gap-5 flex-wrap">
          <img src={avatarFor(user)} alt={fullName(user)} className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent border border-border" style={{ imageRendering: "pixelated" }} />
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl font-bold truncate">{fullName(user)}</h1>
            <p className="text-sm text-muted-foreground truncate">{user.email}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Qo'shilgan: {new Date(user.createdAt).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground font-mono break-all">ID: {user.id}</p>
          </div>
        </section>

        {/* Totals */}
        <section className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <StatCard label="Jami testlar" value={totals.totalTests} />
          <StatCard label="O'rtacha WPM" value={totals.avgWpm} />
          <StatCard label="Eng yaxshi WPM" value={totals.bestWpm} highlight />
          <StatCard label="O'rtacha aniqlik" value={`${totals.avgAccuracy}%`} />
          <StatCard label="Yulduzlar" value={totals.totalStars} />
        </section>

        {/* Per-difficulty */}
        {byDifficulty.length > 0 && (
          <section className="border border-border rounded-xl p-5 md:p-6">
            <h2 className="text-base font-semibold mb-3">Qiyinchilik bo'yicha</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(["easy", "medium", "hard"] as const).map((d) => {
                const stat = byDifficulty.find((x) => x.difficulty === d);
                return (
                  <div key={d} className="border border-border rounded-lg p-3">
                    <p className="text-xs text-muted-foreground capitalize mb-1">{d === "easy" ? "Oson" : d === "medium" ? "O'rta" : "Qiyin"}</p>
                    {stat ? (
                      <>
                        <p className="text-sm">Testlar: <span className="font-mono font-semibold">{stat.count}</span></p>
                        <p className="text-sm">Eng yaxshi: <span className="font-mono font-semibold">{stat.bestWpm} WPM</span></p>
                        <p className="text-sm">O'rtacha: <span className="font-mono font-semibold">{stat.avgWpm} WPM</span></p>
                      </>
                    ) : (
                      <p className="text-xs text-muted-foreground italic">Test yo'q</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* WPM chart */}
        <section className="border border-border rounded-xl p-5 md:p-6">
          <h2 className="text-base font-semibold mb-4">WPM rivoji (oxirgi 30 ta filter bo'yicha)</h2>
          {chartData.length > 0 ? (
            <div className="w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="index" tick={{ fontSize: 11 }} stroke="currentColor" className="text-muted-foreground" />
                  <YAxis tick={{ fontSize: 11 }} stroke="currentColor" className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Line type="monotone" dataKey="wpm" stroke="currentColor" strokeWidth={2} dot={{ r: 3 }} className="text-primary" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">Filterga mos ma'lumot yo'q</p>
          )}
        </section>

        {/* Filters */}
        <section className="flex flex-wrap items-center gap-3">
          <div className="text-xs text-muted-foreground">Filterlar:</div>
          <FilterPills
            label="Qiyinchilik"
            value={diffFilter}
            options={[
              { value: "all", label: "Hammasi" },
              { value: "easy", label: "Oson" },
              { value: "medium", label: "O'rta" },
              { value: "hard", label: "Qiyin" },
            ]}
            onChange={(v) => setDiffFilter(v as typeof diffFilter)}
          />
          <FilterPills
            label="Til"
            value={langFilter}
            options={[
              { value: "all", label: "Hammasi" },
              { value: "uz", label: "UZ" },
              { value: "en", label: "EN" },
              { value: "ru", label: "RU" },
            ]}
            onChange={(v) => setLangFilter(v as typeof langFilter)}
          />
          <span className="text-xs text-muted-foreground ml-auto">
            {filteredResults.length} natija ko'rsatilmoqda
          </span>
        </section>

        {/* Results table */}
        <section className="border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-accent/30 text-muted-foreground">
                  <th className="text-left py-2 px-3 font-medium">Sana</th>
                  <th className="text-left py-2 px-3 font-medium">Test</th>
                  <th className="text-right py-2 px-3 font-medium">WPM</th>
                  <th className="text-right py-2 px-3 font-medium hidden sm:table-cell">Aniqlik</th>
                  <th className="text-right py-2 px-3 font-medium hidden md:table-cell">Yulduzlar</th>
                  <th className="text-right py-2 px-3 font-medium hidden lg:table-cell">Belgilar</th>
                  <th className="text-right py-2 px-3 font-medium hidden xl:table-cell">Vaqt</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-sm text-muted-foreground">
                      Filterga mos test yo'q
                    </td>
                  </tr>
                )}
                {filteredResults.map((r) => (
                  <tr key={r.id} className="border-b border-border/50 last:border-0 hover:bg-accent/30 transition-colors">
                    <td className="py-2 px-3 text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(r.createdAt).toLocaleString()}
                    </td>
                    <td className="py-2 px-3">
                      <span className="text-xs px-1.5 py-0.5 bg-accent rounded">
                        {r.language} · {r.testType} · {r.difficulty}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-semibold">{r.wpm}</td>
                    <td className="py-2 px-3 text-right font-mono hidden sm:table-cell">{r.accuracy}%</td>
                    <td className="py-2 px-3 text-right hidden md:table-cell">
                      {"★".repeat(r.stars)}<span className="text-muted-foreground/40">{"★".repeat(5 - r.stars)}</span>
                    </td>
                    <td className="py-2 px-3 text-right font-mono text-muted-foreground hidden lg:table-cell text-xs">
                      {r.correctChars}/{r.totalChars}
                    </td>
                    <td className="py-2 px-3 text-right font-mono text-muted-foreground hidden xl:table-cell text-xs">
                      {r.timeElapsed.toFixed(1)}s
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({ label, value, highlight }: { label: string; value: number | string; highlight?: boolean }) {
  return (
    <div className={`border rounded-lg p-3 ${highlight ? "border-primary/40 bg-primary/5" : "border-border"}`}>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-xl md:text-2xl font-bold font-mono">{value}</p>
    </div>
  );
}

function FilterPills<T extends string>({
  label, value, options, onChange,
}: {
  label: string;
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange: (v: T) => void;
}) {
  return (
    <div className="inline-flex items-center gap-2 text-xs">
      <span className="text-muted-foreground">{label}:</span>
      <div className="inline-flex border border-border rounded-lg p-0.5 gap-0.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              value === opt.value ? "bg-primary text-primary-foreground" : "hover:bg-accent"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
