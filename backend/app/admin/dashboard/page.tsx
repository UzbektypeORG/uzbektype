"use client";

import { useState, useEffect } from "react";

// Mock data generator
function generateMockStats() {
  return {
    totalUsers: Math.floor(Math.random() * 1000) + 500,
    totalTests: Math.floor(Math.random() * 5000) + 2000,
    testsToday: Math.floor(Math.random() * 100) + 20,
    activeUsers: Math.floor(Math.random() * 50) + 10,
    avgWpm: Math.floor(Math.random() * 30) + 40,
    avgAccuracy: Math.floor(Math.random() * 10) + 85,
  };
}

function generateMockChartData() {
  return Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    tests: Math.floor(Math.random() * 100) + 50,
  }));
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(generateMockStats());
  const [chartData, setChartData] = useState(generateMockChartData());

  useEffect(() => {
    // Refresh stats every 10 seconds
    const interval = setInterval(() => {
      setStats(generateMockStats());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of UzbekType statistics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon="👥"
          trend="+12%"
        />
        <StatCard
          title="Total Tests"
          value={stats.totalTests}
          icon="📝"
          trend="+8%"
        />
        <StatCard
          title="Tests Today"
          value={stats.testsToday}
          icon="🎯"
          trend="+15%"
        />
        <StatCard
          title="Active Users"
          value={stats.activeUsers}
          icon="✨"
          trend="+5%"
        />
        <StatCard
          title="Avg WPM"
          value={stats.avgWpm}
          icon="⚡"
          suffix=" WPM"
        />
        <StatCard
          title="Avg Accuracy"
          value={stats.avgAccuracy}
          icon="🎯"
          suffix="%"
        />
      </div>

      {/* Chart */}
      <div className="border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6">Tests This Week</h2>
        <div className="space-y-4">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-12 text-sm text-muted-foreground">{item.day}</div>
              <div className="flex-1 bg-muted rounded-full h-8 overflow-hidden">
                <div
                  className="bg-primary h-full flex items-center justify-end px-3 text-sm font-medium text-primary-foreground transition-all duration-500"
                  style={{ width: `${(item.tests / 150) * 100}%` }}
                >
                  {item.tests}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <ActivityItem
            user="user123"
            action="completed a 60s test"
            time="2 minutes ago"
            wpm={75}
          />
          <ActivityItem
            user="testuser"
            action="completed a 30w test"
            time="5 minutes ago"
            wpm={82}
          />
          <ActivityItem
            user="speedtyper"
            action="completed a 10s test"
            time="8 minutes ago"
            wpm={91}
          />
          <ActivityItem
            user="newbie"
            action="joined UzbekType"
            time="12 minutes ago"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  trend,
  suffix = '',
}: {
  title: string;
  value: number;
  icon: string;
  trend?: string;
  suffix?: string;
}) {
  return (
    <div className="border border-border rounded-lg p-6 hover:border-foreground/20 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-2">
            {value}
            {suffix}
          </p>
          {trend && (
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">{trend}</p>
          )}
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
}

function ActivityItem({
  user,
  action,
  time,
  wpm,
}: {
  user: string;
  action: string;
  time: string;
  wpm?: number;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
          {user[0].toUpperCase()}
        </div>
        <div>
          <p className="text-sm">
            <span className="font-medium">{user}</span> {action}
          </p>
          <p className="text-xs text-muted-foreground">{time}</p>
        </div>
      </div>
      {wpm && (
        <div className="text-sm font-mono font-bold">{wpm} WPM</div>
      )}
    </div>
  );
}
