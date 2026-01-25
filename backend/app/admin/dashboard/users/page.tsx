"use client";

import { useState } from "react";

// Mock users data
const mockUsers = Array.from({ length: 25 }, (_, i) => ({
  id: `user-${i + 1}`,
  username: `user${i + 1}`,
  email: `user${i + 1}@example.com`,
  displayName: `User ${i + 1}`,
  testCount: Math.floor(Math.random() * 50) + 1,
  avgWpm: Math.floor(Math.random() * 40) + 30,
  createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
}));

export default function AdminUsersPage() {
  const [users] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<'username' | 'testCount' | 'createdAt'>('createdAt');

  const filteredUsers = users
    .filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'username') return a.username.localeCompare(b.username);
      if (sortBy === 'testCount') return b.testCount - a.testCount;
      if (sortBy === 'createdAt') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0;
    });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Users Management</h1>
        <p className="text-muted-foreground mt-1">Manage all registered users</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <p className="text-2xl font-bold mt-1">{users.length}</p>
        </div>
        <div className="border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Active This Month</p>
          <p className="text-2xl font-bold mt-1">{Math.floor(users.length * 0.7)}</p>
        </div>
        <div className="border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">New This Week</p>
          <p className="text-2xl font-bold mt-1">{Math.floor(users.length * 0.1)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="createdAt">Newest First</option>
          <option value="username">Username</option>
          <option value="testCount">Most Tests</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-semibold">User</th>
              <th className="text-left px-4 py-3 text-sm font-semibold">Email</th>
              <th className="text-right px-4 py-3 text-sm font-semibold">Tests</th>
              <th className="text-right px-4 py-3 text-sm font-semibold">Avg WPM</th>
              <th className="text-left px-4 py-3 text-sm font-semibold">Joined</th>
              <th className="text-right px-4 py-3 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
                      {user.username[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.displayName}</p>
                      <p className="text-xs text-muted-foreground">@{user.username}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">{user.email}</td>
                <td className="px-4 py-3 text-sm text-right font-mono">{user.testCount}</td>
                <td className="px-4 py-3 text-sm text-right font-mono font-bold">
                  {user.avgWpm}
                </td>
                <td className="px-4 py-3 text-sm">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-sm text-right">
                  <button className="px-3 py-1 text-xs border border-border rounded hover:border-foreground transition-colors">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No users found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
}
