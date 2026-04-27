"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Stats {
  totals: { users: number; results: number; last24h: number; last7d: number; last30d: number };
  daily: Array<{ day: string; count: number }>;
  topUsers: Array<{
    userId: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    name: string | null;
    avatarUrl: string | null;
    bestWpm: number;
    testCount: number;
  }>;
  recent: Array<{
    id: string;
    userId: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    name: string | null;
    avatarUrl: string | null;
    language: string;
    testType: string;
    difficulty: string;
    wpm: number;
    accuracy: number;
    stars: number;
    createdAt: string;
  }>;
  users: Array<{
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    name: string | null;
    avatarUrl: string | null;
    createdAt: string;
    testCount: number;
    bestWpm: number;
  }>;
}

function fullName(u: { firstName: string | null; lastName: string | null; name: string | null }): string {
  const parts = [u.firstName, u.lastName].filter(Boolean);
  if (parts.length > 0) return parts.join(" ");
  return u.name ?? "—";
}

function avatarFor(u: { avatarUrl: string | null; email: string }): string {
  return u.avatarUrl ?? `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(u.email)}`;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/admin/stats", { cache: "no-store" })
      .then((r) => r.ok ? r.json() : Promise.reject(r.status))
      .then(setStats)
      .catch((e) => setError(`Yuklashda xato: ${e}`));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  };

  const filteredUsers = useMemo(() => {
    if (!stats?.users) return [];
    const q = search.trim().toLowerCase();
    if (!q) return stats.users;
    return stats.users.filter((u) => {
      const name = fullName(u).toLowerCase();
      return u.email.toLowerCase().includes(q) || name.includes(q);
    });
  }, [stats, search]);

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <p className="text-sm text-red-600">{error}</p>
      </main>
    );
  }

  if (!stats) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 sm:px-6 py-8 md:py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Admin panel</h1>
            <p className="text-xs text-muted-foreground">Uzbektype boshqaruv paneli</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm rounded-lg border border-border hover:border-foreground transition-colors"
          >
            Chiqish
          </button>
        </div>

        {/* Totals */}
        <section className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <StatCard label="Foydalanuvchilar" value={stats.totals.users} />
          <StatCard label="Jami testlar" value={stats.totals.results} />
          <StatCard label="So'nggi 24 soat" value={stats.totals.last24h} />
          <StatCard label="So'nggi 7 kun" value={stats.totals.last7d} />
          <StatCard label="So'nggi 30 kun" value={stats.totals.last30d} />
        </section>

        {/* Daily chart */}
        <section className="border border-border rounded-xl p-5 md:p-6">
          <h2 className="text-base font-semibold mb-4">Kunlik testlar (oxirgi 14 kun)</h2>
          {stats.daily.length > 0 ? (
            <div className="w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.daily} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="currentColor" className="text-muted-foreground" />
                  <YAxis tick={{ fontSize: 11 }} stroke="currentColor" className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="count" fill="currentColor" className="text-primary" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">Hali ma'lumot yo'q</p>
          )}
        </section>

        {/* Top users */}
        <section className="border border-border rounded-xl p-5 md:p-6">
          <h2 className="text-base font-semibold mb-4">Top 10 foydalanuvchi</h2>
          {stats.topUsers.length > 0 ? (
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left py-2 px-3 font-medium w-10">#</th>
                    <th className="text-left py-2 px-3 font-medium">Foydalanuvchi</th>
                    <th className="text-left py-2 px-3 font-medium hidden md:table-cell">Email</th>
                    <th className="text-right py-2 px-3 font-medium">Eng yaxshi WPM</th>
                    <th className="text-right py-2 px-3 font-medium">Testlar</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topUsers.map((u, i) => (
                    <tr key={u.userId} className="border-b border-border/50 last:border-0">
                      <td className="py-2 px-3 font-mono text-muted-foreground">{i + 1}</td>
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-2">
                          <img src={avatarFor(u)} alt={fullName(u)} className="w-7 h-7 rounded-full bg-accent" style={{ imageRendering: "pixelated" }} />
                          <span className="font-medium">{fullName(u)}</span>
                        </div>
                      </td>
                      <td className="py-2 px-3 text-muted-foreground hidden md:table-cell">{u.email}</td>
                      <td className="py-2 px-3 text-right font-mono font-semibold">{u.bestWpm}</td>
                      <td className="py-2 px-3 text-right font-mono text-muted-foreground">{u.testCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">Hali natija yo'q</p>
          )}
        </section>

        {/* Recent tests */}
        <section className="border border-border rounded-xl p-5 md:p-6">
          <h2 className="text-base font-semibold mb-4">Oxirgi 20 ta test</h2>
          {stats.recent.length > 0 ? (
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left py-2 px-3 font-medium">Foydalanuvchi</th>
                    <th className="text-left py-2 px-3 font-medium">Test</th>
                    <th className="text-right py-2 px-3 font-medium">WPM</th>
                    <th className="text-right py-2 px-3 font-medium hidden sm:table-cell">Aniqlik</th>
                    <th className="text-right py-2 px-3 font-medium hidden md:table-cell">Sana</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recent.map((r) => (
                    <tr key={r.id} className="border-b border-border/50 last:border-0">
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-2">
                          <img src={avatarFor(r)} alt={fullName(r)} className="w-6 h-6 rounded-full bg-accent" style={{ imageRendering: "pixelated" }} />
                          <span className="truncate">{fullName(r)}</span>
                        </div>
                      </td>
                      <td className="py-2 px-3">
                        <span className="text-xs px-1.5 py-0.5 bg-accent rounded">
                          {r.language} · {r.testType} · {r.difficulty}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right font-mono font-semibold">{r.wpm}</td>
                      <td className="py-2 px-3 text-right font-mono hidden sm:table-cell">{r.accuracy}%</td>
                      <td className="py-2 px-3 text-right text-xs text-muted-foreground hidden md:table-cell whitespace-nowrap">
                        {new Date(r.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">Hali test yo'q</p>
          )}
        </section>

        {/* All users */}
        <section className="border border-border rounded-xl p-5 md:p-6">
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <h2 className="text-base font-semibold">Foydalanuvchilar ({stats.users.length})</h2>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Email yoki ism qidirish…"
              className="px-3 py-1.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 w-full sm:w-64"
            />
          </div>
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-2 px-3 font-medium">Foydalanuvchi</th>
                  <th className="text-left py-2 px-3 font-medium hidden md:table-cell">Email</th>
                  <th className="text-right py-2 px-3 font-medium">Testlar</th>
                  <th className="text-right py-2 px-3 font-medium hidden sm:table-cell">Eng yaxshi WPM</th>
                  <th className="text-right py-2 px-3 font-medium hidden md:table-cell">Qo'shilgan</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="border-b border-border/50 last:border-0">
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <img src={avatarFor(u)} alt={fullName(u)} className="w-6 h-6 rounded-full bg-accent" style={{ imageRendering: "pixelated" }} />
                        <span className="truncate">{fullName(u)}</span>
                      </div>
                    </td>
                    <td className="py-2 px-3 text-muted-foreground hidden md:table-cell">{u.email}</td>
                    <td className="py-2 px-3 text-right font-mono">{u.testCount}</td>
                    <td className="py-2 px-3 text-right font-mono hidden sm:table-cell">{u.bestWpm || "—"}</td>
                    <td className="py-2 px-3 text-right text-xs text-muted-foreground hidden md:table-cell whitespace-nowrap">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-sm text-muted-foreground">
                      Topilmadi
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-border rounded-lg p-3 md:p-4">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-2xl md:text-3xl font-bold font-mono">{value}</p>
    </div>
  );
}
