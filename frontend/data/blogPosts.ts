// Single source of truth for blog posts.
// Each post has localised slug, title, excerpt, and full content per language.
// Adding a new post: import the content files, add a new entry to the array.

import { uzContent as tezYozishOrganishUz } from "./blog/tez-yozish-organish/uz";
import { enContent as tezYozishOrganishEn } from "./blog/tez-yozish-organish/en";
import { ruContent as tezYozishOrganishRu } from "./blog/tez-yozish-organish/ru";
import { uzContent as wpmNimaUz } from "./blog/wpm-nima-va-qanday-olchash/uz";
import { enContent as wpmNimaEn } from "./blog/wpm-nima-va-qanday-olchash/en";
import { ruContent as wpmNimaRu } from "./blog/wpm-nima-va-qanday-olchash/ru";

export type Language = "uz" | "en" | "ru";

export interface BlogPost {
  // Canonical id used internally (matches the UZ slug for simplicity)
  id: string;
  publishedAt: string;
  updatedAt: string;
  // Localised URL slugs — keyword-rich per language for better SEO
  slugs: Record<Language, string>;
  titles: Record<Language, string>;
  excerpts: Record<Language, string>;
  content: Record<Language, string>;
  readTime: Record<Language, string>;
  // Primary keyword for the post (for analytics + structured data)
  primaryKeyword: Record<Language, string>;
  // schema.org type for the article
  articleType: "Article" | "HowTo";
}

export const blogPosts: BlogPost[] = [
  {
    id: "tez-yozish-organish",
    publishedAt: "2026-04-28",
    updatedAt: "2026-04-28",
    slugs: {
      uz: "tez-yozish-organish",
      en: "learn-to-type-fast",
      ru: "nauchitsya-bystro-pechatat",
    },
    titles: {
      uz: "Tez yozishni o'rganish — boshidan oxirigacha to'liq yo'l xaritasi",
      en: "How to Learn Fast Typing — A Complete Beginner-to-Advanced Roadmap",
      ru: "Как научиться быстро печатать — полный путь от новичка до профи",
    },
    excerpts: {
      uz: "30 kun ichida 25 WPM dan 60 WPM ga chiqishning sinalgan rejasi: barmoq pozitsiyasi, aniqlik mashqlari, tezlik dasturi va keng tarqalgan xatolar.",
      en: "A proven plan to go from 25 WPM to 60 WPM in 30 days: finger placement, accuracy drills, speed-building routines, and the mistakes that kill progress.",
      ru: "Рабочий план: с 25 WPM до 60 WPM за 30 дней. Положение пальцев, тренировка точности, режим скорости и ошибки, которые тормозят прогресс.",
    },
    content: {
      uz: tezYozishOrganishUz,
      en: tezYozishOrganishEn,
      ru: tezYozishOrganishRu,
    },
    readTime: {
      uz: "9 daqiqa",
      en: "8 min read",
      ru: "9 мин чтения",
    },
    primaryKeyword: {
      uz: "tez yozishni o'rganish",
      en: "learn to type fast",
      ru: "научиться быстро печатать",
    },
    articleType: "HowTo",
  },
  {
    id: "wpm-nima-va-qanday-olchash",
    publishedAt: "2026-04-28",
    updatedAt: "2026-04-28",
    slugs: {
      uz: "wpm-nima-va-qanday-olchash",
      en: "what-is-wpm-typing-speed",
      ru: "chto-takoe-wpm",
    },
    titles: {
      uz: "WPM nima va qanday o'lchash kerak — yozish tezligini oshirish qo'llanmasi",
      en: "What Is WPM and How to Measure Typing Speed — A Complete Guide",
      ru: "Что такое WPM и как измерить скорость печати — полное руководство",
    },
    excerpts: {
      uz: "WPM nima, formulasi qanday hisoblanadi, yaxshi WPM qancha va uni 5 amaliy yo'l bilan oshirish — pillar qo'llanma misol va me'yorlar bilan.",
      en: "What WPM means, how it's calculated, what counts as a good number, and 5 practical ways to raise it — a pillar guide with examples and benchmarks.",
      ru: "Что такое WPM, как считается формула, какой результат считается хорошим, и 5 практических способов его поднять — пилларная статья с примерами и бенчмарками.",
    },
    content: {
      uz: wpmNimaUz,
      en: wpmNimaEn,
      ru: wpmNimaRu,
    },
    readTime: {
      uz: "10 daqiqa",
      en: "9 min read",
      ru: "10 мин чтения",
    },
    primaryKeyword: {
      uz: "wpm nima",
      en: "what is wpm",
      ru: "что такое wpm",
    },
    articleType: "Article",
  },
];

// Helpers
export function getPostBySlug(lang: Language, slug: string): BlogPost | null {
  return blogPosts.find((p) => p.slugs[lang] === slug) ?? null;
}

export function getAllSlugParams(): Array<{ lang: Language; slug: string }> {
  const params: Array<{ lang: Language; slug: string }> = [];
  for (const post of blogPosts) {
    for (const lang of ["uz", "en", "ru"] as const) {
      params.push({ lang, slug: post.slugs[lang] });
    }
  }
  return params;
}
