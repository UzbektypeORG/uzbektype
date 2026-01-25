import type { StarParams, TestType, Difficulty } from "@/types";

/**
 * Calculate stars (1-5) based on WPM, accuracy, difficulty, and test type
 */
export function calculateStars(params: StarParams): number {
  const { wpm, accuracy, difficulty, testType } = params;

  // WPM score (0-100)
  const wpmScore = getWpmScore(wpm);

  // Accuracy score (0-100)
  const accuracyScore = getAccuracyScore(accuracy);

  // Difficulty multiplier
  const difficultyMultiplier = getDifficultyMultiplier(difficulty);

  // Test type multiplier
  const testTypeMultiplier = getTestTypeMultiplier(testType);

  // Calculate final score
  const finalScore =
    wpmScore * accuracyScore * difficultyMultiplier * testTypeMultiplier;

  // Convert to stars (1-5)
  return scoreToStars(finalScore);
}

function getWpmScore(wpm: number): number {
  if (wpm >= 80) return 100;
  if (wpm >= 60) return 80;
  if (wpm >= 45) return 60;
  if (wpm >= 30) return 40;
  return 20;
}

function getAccuracyScore(accuracy: number): number {
  if (accuracy >= 98) return 100;
  if (accuracy >= 95) return 80;
  if (accuracy >= 90) return 60;
  if (accuracy >= 85) return 40;
  return 20;
}

function getDifficultyMultiplier(difficulty: Difficulty): number {
  switch (difficulty) {
    case "easy":
      return 0.8;
    case "medium":
      return 1.0;
    case "hard":
      return 1.2;
    default:
      return 1.0;
  }
}

function getTestTypeMultiplier(testType: TestType): number {
  if (testType === "10s" || testType === "10w") return 0.8;
  if (testType === "30s" || testType === "30w") return 1.0;
  if (testType === "60s" || testType === "60w") return 1.1;
  return 1.0;
}

function scoreToStars(score: number): number {
  // Score range: 20*20*0.8*0.8 = 256 (minimum)
  //              100*100*1.2*1.1 = 13200 (maximum)

  // Normalize to 1-5 stars
  if (score >= 8000) return 5;
  if (score >= 5000) return 4;
  if (score >= 2500) return 3;
  if (score >= 1000) return 2;
  return 1;
}
