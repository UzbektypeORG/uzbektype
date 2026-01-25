import type { TestResult } from "@/types";

const STORAGE_KEY = "uzbektype_results";
const MAX_RESULTS = 100; // Store last 100 results

export function saveTestResult(result: TestResult): void {
  if (typeof window === "undefined") return;

  try {
    const existing = getTestResults();
    const newResults = [
      {
        ...result,
        id: crypto.randomUUID(),
        createdAt: new Date(),
      },
      ...existing,
    ].slice(0, MAX_RESULTS);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newResults));
  } catch (error) {
    console.error("Failed to save test result:", error);
  }
}

export function getTestResults(): TestResult[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const results = JSON.parse(stored) as TestResult[];
    return results.map((r) => ({
      ...r,
      createdAt: new Date(r.createdAt!),
    }));
  } catch (error) {
    console.error("Failed to get test results:", error);
    return [];
  }
}

export function getRecentResults(limit: number = 5): TestResult[] {
  return getTestResults().slice(0, limit);
}

export function clearTestResults(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear test results:", error);
  }
}
