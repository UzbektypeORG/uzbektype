import type { Difficulty } from "@/types";
import { programmingTexts } from "./programming";
import { numbersTexts } from "./numbers";
import { punctuationTexts } from "./punctuation";

// Central registry of topic word packs — extended as the programmatic SEO
// queue advances. The slug used here MUST match the URL slug under
// /tests/[slug] and the `?topic=` value passed to getTestText.
export const topicTexts: Record<string, Record<Difficulty, string[]>> = {
  programming: programmingTexts,
  numbers: numbersTexts,
  punctuation: punctuationTexts,
};
