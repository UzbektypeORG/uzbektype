"use client";

import { useState } from "react";

// Mock test results data
const mockResults = Array.from({ length: 50 }, (_, i) => ({
  id: `result-${i + 1}`,
  username: `user${Math.floor(Math.random() * 25) + 1}`,
  language: ['uz', 'en', 'ru'][Math.floor(Math.random() * 3)],
  testType: ['10s', '30s', '60s', '10w', '30w', '60w'][Math.floor(Math.random() * 6)],
  difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)],
  wpm: Math.floor(Math.random() * 80) + 20,
  accuracy: Math.floor(Math.random() * 30) + 70,
  stars: Math.floor(Math.random() * 5) + 1,
  createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
}));

export default function AdminResultsPage() {
  const [results] = useState(mockResults);
  const [filterTest, setFilterTest] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterLanguage, setFilterLanguage] = useState('all');

  const filteredResults = results.filter(result => {
    if (filterTest !== 'all' && result.testType !== filterTest) return false;
    if (filterDifficulty !== 'all' && result.difficulty !== filterDifficulty) return false;
    if (filterLanguage !== 'all' && result.language !== filterLanguage) return false;
    return true;
  });

  const avgWpm = Math.round(
    filteredResults.reduce((sum, r) => sum + r.wpm, 0) / filteredResults.length
  );
  const avgAccuracy = Math.round(
    filteredResults.reduce((sum, r) => sum + r.accuracy, 0) / filteredResults.length
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Test Results</h1>
        <p className="text-muted-foreground mt-1">Monitor all typing test results</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Total Results</p>
          <p className="text-2xl font-bold mt-1">{filteredResults.length}</p>
        </div>
        <div className="border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Average WPM</p>
          <p className="text-2xl font-bold mt-1">{avgWpm}</p>
        </div>
        <div className="border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Average Accuracy</p>
          <p className="text-2xl font-bold mt-1">{avgAccuracy}%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <select
          value={filterTest}
          onChange={(e) => setFilterTest(e.target.value)}
          className="px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Tests</option>
          <option value="10s">10 seconds</option>
          <option value="30s">30 seconds</option>
          <option value="60s">60 seconds</option>
          <option value="10w">10 words</option>
          <option value="30w">30 words</option>
          <option value="60w">60 words</option>
        </select>

        <select
          value={filterDifficulty}
          onChange={(e) => setFilterDifficulty(e.target.value)}
          className="px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <select
          value={filterLanguage}
          onChange={(e) => setFilterLanguage(e.target.value)}
          className="px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Languages</option>
          <option value="uz">Uzbek</option>
          <option value="en">English</option>
          <option value="ru">Russian</option>
        </select>

        <button
          onClick={() => {
            setFilterTest('all');
            setFilterDifficulty('all');
            setFilterLanguage('all');
          }}
          className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Clear Filters
        </button>
      </div>

      {/* Results Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold">User</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Test</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Difficulty</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Lang</th>
                <th className="text-right px-4 py-3 text-sm font-semibold">WPM</th>
                <th className="text-right px-4 py-3 text-sm font-semibold">Accuracy</th>
                <th className="text-right px-4 py-3 text-sm font-semibold">Stars</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result) => (
                <tr
                  key={result.id}
                  className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-medium">
                    @{result.username}
                  </td>
                  <td className="px-4 py-3 text-sm uppercase font-mono">
                    {result.testType}
                  </td>
                  <td className="px-4 py-3 text-sm capitalize">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs ${
                      result.difficulty === 'easy' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                      result.difficulty === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                      'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    }`}>
                      {result.difficulty}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm uppercase">
                    {result.language}
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-mono font-bold">
                    {result.wpm}
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-mono">
                    {result.accuracy}%
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    {'★'.repeat(result.stars)}{'☆'.repeat(5 - result.stars)}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {new Date(result.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredResults.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No results found with current filters
        </div>
      )}
    </div>
  );
}
