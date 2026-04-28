"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ThemeToggle from "@/components/ThemeToggle";

interface Stats {
  totals: { users: number; results: number; last24h: number; last7d: number; last30d: number };
  daily: Array<{ day: string; count: number }>;
  dailyVisitors: Array<{ day: string; total: number; signedIn: number; guests: number }>;
  visitorTotals: {
    today: number;
    last7d: number;
    last30d: number;
    todayGuests: number;
    last7dGuests: number;
    last30dGuests: number;
  };
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

type Tab = "overview" | "top" | "recent" | "users";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "overview", label: "Umumiy", icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" },
  { id: "top", label: "Top 10", icon: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" },
  { id: "recent", label: "Oxirgi testlar", icon: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" },
  { id: "users", label: "Foydalanuvchilar", icon: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" },
];

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
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const activeLabel = TABS.find((t) => t.id === activeTab)?.label ?? "";

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 border-r border-border bg-background z-40 transition-transform md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="px-2 pb-4 mb-2 border-b border-border">
            <h1 className="text-lg font-bold">Admin panel</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Uzbektype boshqaruvi</p>
          </div>

          <nav className="flex-1 space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === tab.id
                    ? "bg-accent text-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                  <path d={tab.icon} />
                </svg>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="pt-3 mt-3 border-t border-border space-y-2">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs text-muted-foreground">Tema</span>
              <ThemeToggle />
            </div>
            <button
              onClick={handleLogout}
              className="w-full px-3 py-2 text-sm rounded-lg border border-border hover:border-foreground transition-colors"
            >
              Chiqish
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Mobile top bar */}
        <header className="md:hidden sticky top-0 z-20 flex items-center justify-between px-4 py-3 border-b border-border bg-background">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 -ml-2 rounded-lg hover:bg-accent"
            aria-label="Menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
          <h2 className="text-sm font-semibold">{activeLabel}</h2>
          <div className="w-6" />
        </header>

        <main className="px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="max-w-7xl mx-auto">
            <div className="hidden md:block mb-6">
              <h2 className="text-2xl font-bold">{activeLabel}</h2>
            </div>

            {activeTab === "overview" && <OverviewSection stats={stats} />}
            {activeTab === "top" && <TopUsersSection stats={stats} onUserClick={(id) => router.push(`/admode/users/${id}`)} />}
            {activeTab === "recent" && <RecentSection stats={stats} onUserClick={(id) => router.push(`/admode/users/${id}`)} />}
            {activeTab === "users" && (
              <UsersSection
                users={filteredUsers}
                total={stats.users.length}
                search={search}
                onSearchChange={setSearch}
                onUserClick={(id) => router.push(`/admode/users/${id}`)}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function OverviewSection({ stats }: { stats: Stats }) {
  const v = stats.visitorTotals;
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <StatCard label="Foydalanuvchilar" value={stats.totals.users} />
        <StatCard label="Jami testlar" value={stats.totals.results} />
        <StatCard label="So'nggi 24 soat" value={stats.totals.last24h} />
        <StatCard label="So'nggi 7 kun" value={stats.totals.last7d} />
        <StatCard label="So'nggi 30 kun" value={stats.totals.last30d} />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <VisitorCard label="Bugun" total={v.today} guests={v.todayGuests} />
        <VisitorCard label="So'nggi 7 kun" total={v.last7d} guests={v.last7dGuests} />
        <VisitorCard label="So'nggi 30 kun" total={v.last30d} guests={v.last30dGuests} />
      </section>

      <section className="border border-border rounded-xl p-5 md:p-6">
        <h3 className="text-base font-semibold mb-4">Kunlik tashriflar (oxirgi 14 kun)</h3>
        {stats.dailyVisitors.length > 0 ? (
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.dailyVisitors} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
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
                <Bar dataKey="signedIn" stackId="visits" fill="currentColor" className="text-primary" name="Ro'yxatdan o'tgan" />
                <Bar dataKey="guests" stackId="visits" fill="currentColor" className="text-muted-foreground" name="Mehmon" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8">Hali ma&apos;lumot yo&apos;q</p>
        )}
      </section>

      <section className="border border-border rounded-xl p-5 md:p-6">
        <h3 className="text-base font-semibold mb-4">Kunlik testlar (oxirgi 14 kun)</h3>
        {stats.daily.length > 0 ? (
          <div className="w-full h-64">
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
    </div>
  );
}

function TopUsersSection({ stats, onUserClick }: { stats: Stats; onUserClick: (id: string) => void }) {
  return (
    <section className="border border-border rounded-xl p-5 md:p-6">
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
                <tr
                  key={u.userId}
                  onClick={() => onUserClick(u.userId)}
                  className="border-b border-border/50 last:border-0 cursor-pointer hover:bg-accent/40 transition-colors"
                >
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
  );
}

function RecentSection({ stats, onUserClick }: { stats: Stats; onUserClick: (id: string) => void }) {
  return (
    <section className="border border-border rounded-xl p-5 md:p-6">
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
                <tr
                  key={r.id}
                  onClick={() => onUserClick(r.userId)}
                  className="border-b border-border/50 last:border-0 cursor-pointer hover:bg-accent/40 transition-colors"
                >
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
  );
}

function UsersSection({
  users,
  total,
  search,
  onSearchChange,
  onUserClick,
}: {
  users: Stats["users"];
  total: number;
  search: string;
  onSearchChange: (v: string) => void;
  onUserClick: (id: string) => void;
}) {
  return (
    <section className="border border-border rounded-xl p-5 md:p-6">
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <p className="text-sm text-muted-foreground">Jami: {total}</p>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
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
            {users.map((u) => (
              <tr
                key={u.id}
                onClick={() => onUserClick(u.id)}
                className="border-b border-border/50 last:border-0 cursor-pointer hover:bg-accent/40 transition-colors"
              >
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
            {users.length === 0 && (
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

function VisitorCard({ label, total, guests }: { label: string; total: number; guests: number }) {
  const signedIn = Math.max(0, total - guests);
  return (
    <div className="border border-border rounded-lg p-4">
      <p className="text-xs text-muted-foreground mb-1">{label} — tashriflar</p>
      <p className="text-2xl md:text-3xl font-bold font-mono">{total}</p>
      <p className="text-xs text-muted-foreground mt-2">
        <span className="font-mono text-foreground">{signedIn}</span> ro&apos;yxatdan o&apos;tgan ·{" "}
        <span className="font-mono text-foreground">{guests}</span> mehmon
      </p>
    </div>
  );
}
