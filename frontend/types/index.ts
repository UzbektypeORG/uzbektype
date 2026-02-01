// Language types
export type Language = "uz" | "en" | "ru";

// Test types
export type TestType = "10s" | "30s" | "60s" | "10w" | "30w" | "60w";
export type Difficulty = "easy" | "medium" | "hard";

// Test configuration
export interface TestConfig {
  language: Language;
  testType: TestType;
  difficulty: Difficulty;
}

// Test result
export interface TestResult {
  id?: string;
  userId?: string;
  language: Language;
  testType: TestType;
  difficulty: Difficulty;
  wpm: number;
  accuracy: number;
  stars: number;
  correctChars: number;
  correctedChars: number; // Characters that were wrong but then fixed
  incorrectChars: number;
  totalChars: number;
  createdAt?: Date;
}

// Typing stats during test
export interface TypingStats {
  wpm: number;
  accuracy: number;
  correctChars: number;
  correctedChars: number; // Characters that were wrong but then fixed
  incorrectChars: number;
  totalChars: number;
}

// WPM data point for graph
export interface WpmDataPoint {
  time: number; // seconds
  wpm: number;
  rawWpm: number;
}

// User profile
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  currentStreak: number;
  longestStreak: number;
  lastTestDate?: Date;
  isBlocked: boolean;
  hideFromLeaderboard: boolean;
  createdAt: Date;
}

// Leaderboard entry
export interface LeaderboardEntry {
  userId: string;
  userName: string;
  userAvatar?: string;
  totalStars: number;
  highestWpm: number;
  testCount: number;
  rank: number;
}

// Leaderboard period
export type LeaderboardPeriod = "weekly" | "monthly" | "alltime";

// Text for typing test
export interface TypingText {
  id: string;
  language: Language;
  difficulty: Difficulty;
  text: string;
  wordCount: number;
  charCount: number;
  isActive: boolean;
}

// Word for word-based tests
export interface Word {
  id: string;
  language: Language;
  difficulty: Difficulty;
  word: string;
  isActive: boolean;
}

// Star calculation parameters
export interface StarParams {
  wpm: number;
  accuracy: number;
  difficulty: Difficulty;
  testType: TestType;
}
