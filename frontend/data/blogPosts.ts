// Single source of truth for blog posts.
// Each post has localised slug, title, excerpt, and full content per language.
// Adding a new post: import the content files, add a new entry to the array.

import { uzContent as tezYozishOrganishUz } from "./blog/tez-yozish-organish/uz";
import { enContent as tezYozishOrganishEn } from "./blog/tez-yozish-organish/en";
import { ruContent as tezYozishOrganishRu } from "./blog/tez-yozish-organish/ru";
import { uzContent as wpmNimaUz } from "./blog/wpm-nima-va-qanday-olchash/uz";
import { enContent as wpmNimaEn } from "./blog/wpm-nima-va-qanday-olchash/en";
import { ruContent as wpmNimaRu } from "./blog/wpm-nima-va-qanday-olchash/ru";
import { uzContent as klaviaturaMashqlariUz } from "./blog/klaviatura-mashqlari/uz";
import { enContent as klaviaturaMashqlariEn } from "./blog/klaviatura-mashqlari/en";
import { ruContent as klaviaturaMashqlariRu } from "./blog/klaviatura-mashqlari/ru";
import { uzContent as ortachaTezlikUz } from "./blog/ortacha-yozish-tezligi/uz";
import { enContent as ortachaTezlikEn } from "./blog/ortacha-yozish-tezligi/en";
import { ruContent as ortachaTezlikRu } from "./blog/ortacha-yozish-tezligi/ru";
import { uzContent as touchTypingUz } from "./blog/touch-typing-nima/uz";
import { enContent as touchTypingEn } from "./blog/touch-typing-nima/en";
import { ruContent as touchTypingRu } from "./blog/touch-typing-nima/ru";
import { uzContent as engYaxshiSaytlarUz } from "./blog/eng-yaxshi-typing-test-saytlar/uz";
import { enContent as engYaxshiSaytlarEn } from "./blog/eng-yaxshi-typing-test-saytlar/en";
import { ruContent as engYaxshiSaytlarRu } from "./blog/eng-yaxshi-typing-test-saytlar/ru";
import { uzContent as bolalarMashqiUz } from "./blog/bolalar-uchun-klaviatura-mashqi/uz";
import { enContent as bolalarMashqiEn } from "./blog/bolalar-uchun-klaviatura-mashqi/en";
import { ruContent as bolalarMashqiRu } from "./blog/bolalar-uchun-klaviatura-mashqi/ru";
import { uzContent as kompyuterTezYozishUz } from "./blog/kompyuterda-tez-yozish/uz";
import { enContent as kompyuterTezYozishEn } from "./blog/kompyuterda-tez-yozish/en";
import { ruContent as kompyuterTezYozishRu } from "./blog/kompyuterda-tez-yozish/ru";
import { uzContent as cpmWpmFarqiUz } from "./blog/cpm-va-wpm-farqi/uz";
import { enContent as cpmWpmFarqiEn } from "./blog/cpm-va-wpm-farqi/en";
import { ruContent as cpmWpmFarqiRu } from "./blog/cpm-va-wpm-farqi/ru";
import { uzContent as yozishTestiOnlaynUz } from "./blog/yozish-testi-onlayn/uz";
import { enContent as yozishTestiOnlaynEn } from "./blog/yozish-testi-onlayn/en";
import { ruContent as yozishTestiOnlaynRu } from "./blog/yozish-testi-onlayn/ru";

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
    publishedAt: "2026-04-30",
    updatedAt: "2026-04-30",
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
  {
    id: "klaviatura-mashqlari",
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    slugs: {
      uz: "klaviatura-mashqlari",
      en: "keyboard-typing-drills",
      ru: "uprazhneniya-dlya-klaviatury",
    },
    titles: {
      uz: "Klaviatura mashqlari — bepul va eng samarali yo'llar",
      en: "Keyboard Typing Drills — Free and Effective Practice Routines",
      ru: "Упражнения для клавиатуры — бесплатные и самые эффективные способы",
    },
    excerpts: {
      uz: "WPM oshirish uchun maqsadli mashqlar to'plami: home row dan tezlik portlashigacha, 30 kunlik jadval va qaerda bepul mashq qilish.",
      en: "A complete set of targeted drills to grow your WPM — from home row to speed bursts, plus a 30-day schedule and free places to practice.",
      ru: "Полный набор целевых упражнений для роста WPM — от основного ряда до скоростных взрывов, плюс 30-дневный план и где практиковаться бесплатно.",
    },
    content: {
      uz: klaviaturaMashqlariUz,
      en: klaviaturaMashqlariEn,
      ru: klaviaturaMashqlariRu,
    },
    readTime: {
      uz: "10 daqiqa",
      en: "10 min read",
      ru: "10 мин чтения",
    },
    primaryKeyword: {
      uz: "klaviatura mashqi",
      en: "keyboard drills",
      ru: "упражнения для клавиатуры",
    },
    articleType: "HowTo",
  },
  {
    id: "ortacha-yozish-tezligi",
    publishedAt: "2026-05-03",
    updatedAt: "2026-05-03",
    slugs: {
      uz: "ortacha-yozish-tezligi",
      en: "average-typing-speed",
      ru: "srednyaya-skorost-pechati",
    },
    titles: {
      uz: "O'rtacha yozish tezligi qancha — yosh, kasb va davlatlar bo'yicha",
      en: "Average Typing Speed — Benchmarks by Age, Profession, and Country",
      ru: "Средняя скорость печати — бенчмарки по возрасту, профессии и странам",
    },
    excerpts: {
      uz: "Global o'rtacha 45-50 WPM, lekin yosh, kasb va til bo'yicha aniq raqamlar farq qiladi. Konkret jadvallar va o'zingizni qaerga joylashtirish bo'yicha qo'llanma.",
      en: "Global average sits around 45-50 WPM, but the real number depends on age, profession, and language. Concrete tables and a guide to placing yourself in context.",
      ru: "Глобальное среднее — 45-50 WPM, но реальная цифра зависит от возраста, профессии и языка. Конкретные таблицы и гид по тому, как себя позиционировать.",
    },
    content: {
      uz: ortachaTezlikUz,
      en: ortachaTezlikEn,
      ru: ortachaTezlikRu,
    },
    readTime: {
      uz: "9 daqiqa",
      en: "8 min read",
      ru: "9 мин чтения",
    },
    primaryKeyword: {
      uz: "o'rtacha yozish tezligi",
      en: "average typing speed",
      ru: "средняя скорость печати",
    },
    articleType: "Article",
  },
  {
    id: "touch-typing-nima",
    publishedAt: "2026-05-03",
    updatedAt: "2026-05-03",
    slugs: {
      uz: "touch-typing-nima",
      en: "what-is-touch-typing",
      ru: "chto-takoe-slepaya-pechat",
    },
    titles: {
      uz: "Touch typing nima — ko'r-ko'rona yozish ko'nikmasi",
      en: "What Is Touch Typing — The Skill of Typing Without Looking",
      ru: "Что такое touch typing — слепая печать без взгляда на клавиатуру",
    },
    excerpts: {
      uz: "Touch typing — klaviaturaga qaramasdan yozish ko'nikmasi: barmoqlar joyi, mashq bosqichlari, eng katta xatolar va 6-8 haftada o'rganish rejasi.",
      en: "Touch typing is the skill of typing without looking at the keyboard — finger placement, learning stages, common mistakes, and a 6-8 week plan to master it.",
      ru: "Touch typing — слепая печать без взгляда на клавиатуру: расположение пальцев, этапы обучения, главные ошибки и план освоения за 6-8 недель.",
    },
    content: {
      uz: touchTypingUz,
      en: touchTypingEn,
      ru: touchTypingRu,
    },
    readTime: {
      uz: "9 daqiqa",
      en: "9 min read",
      ru: "9 мин чтения",
    },
    primaryKeyword: {
      uz: "touch typing",
      en: "touch typing",
      ru: "слепая печать",
    },
    articleType: "HowTo",
  },
  {
    id: "eng-yaxshi-typing-test-saytlar",
    publishedAt: "2026-05-03",
    updatedAt: "2026-05-03",
    slugs: {
      uz: "eng-yaxshi-typing-test-saytlar",
      en: "best-typing-test-websites",
      ru: "luchshie-sayty-dlya-testa-skorosti-pechati",
    },
    titles: {
      uz: "Eng yaxshi typing test saytlar — 2026 reyting",
      en: "Best Typing Test Websites — 2026 Ranking",
      ru: "Лучшие сайты для теста скорости печати — рейтинг 2026",
    },
    excerpts: {
      uz: "10 ta eng yaxshi typing test saytning to'liq solishtirmasi: UzbekType, Monkeytype, Keybr va boshqalar — har biri uchun aniq foydalanuvchi profili.",
      en: "A complete comparison of the 10 best typing test websites — UzbekType, Monkeytype, Keybr, and more — with the right user profile for each.",
      ru: "Полное сравнение 10 лучших сайтов для теста скорости печати — UzbekType, Monkeytype, Keybr и другие — с подходящим профилем пользователя для каждого.",
    },
    content: {
      uz: engYaxshiSaytlarUz,
      en: engYaxshiSaytlarEn,
      ru: engYaxshiSaytlarRu,
    },
    readTime: {
      uz: "10 daqiqa",
      en: "10 min read",
      ru: "10 мин чтения",
    },
    primaryKeyword: {
      uz: "typing test sayt",
      en: "best typing test websites",
      ru: "тест скорости печати онлайн",
    },
    articleType: "Article",
  },
  {
    id: "bolalar-uchun-klaviatura-mashqi",
    publishedAt: "2026-05-03",
    updatedAt: "2026-05-03",
    slugs: {
      uz: "bolalar-uchun-klaviatura-mashqi",
      en: "keyboard-practice-for-kids",
      ru: "uprazhneniya-dlya-klaviatury-dlya-detey",
    },
    titles: {
      uz: "Bolalar uchun klaviatura mashqi — yoshga qarab bosqichma-bosqich reja",
      en: "Keyboard Practice for Kids — Age-by-Age Plan",
      ru: "Клавиатурная практика для детей — план по возрастам",
    },
    excerpts: {
      uz: "6 yoshdan boshlab to'g'ri klaviatura mashqi: yoshga qarab WPM me'yorlar, eng yaxshi bepul saytlar va ota-ona uchun 5 ta amaliy maslahat.",
      en: "Right keyboard practice from age 6: age-by-age WPM benchmarks, best free sites, and 5 practical tips for parents.",
      ru: "Правильная клавиатурная практика с 6 лет: нормы WPM по возрастам, лучшие бесплатные сайты и 5 практических советов родителям.",
    },
    content: {
      uz: bolalarMashqiUz,
      en: bolalarMashqiEn,
      ru: bolalarMashqiRu,
    },
    readTime: {
      uz: "9 daqiqa",
      en: "9 min read",
      ru: "9 мин чтения",
    },
    primaryKeyword: {
      uz: "bolalar uchun klaviatura mashqi",
      en: "keyboard practice for kids",
      ru: "упражнения для клавиатуры для детей",
    },
    articleType: "HowTo",
  },
  {
    id: "kompyuterda-tez-yozish",
    publishedAt: "2026-05-03",
    updatedAt: "2026-05-03",
    slugs: {
      uz: "kompyuterda-tez-yozish",
      en: "fast-typing-on-computer",
      ru: "bystraya-pechat-na-kompyutere",
    },
    titles: {
      uz: "Kompyuterda tez yozish — 7 ta amaliy maslahat",
      en: "Fast Typing on a Computer — 7 Practical Tips",
      ru: "Быстрая печать на компьютере — 7 практических советов",
    },
    excerpts: {
      uz: "Bugundan qo'llasangiz natija beradigan 7 ta amaliy maslahat: touch typing, klaviatura yorliqlari, burst typing, ergonomika va kunlik 15 daqiqa qoidasi.",
      en: "7 practical tips you can apply today — touch typing, keyboard shortcuts, burst typing, ergonomics, and the 15-minutes-a-day rule.",
      ru: "7 практических советов, которые можно применить сегодня — touch typing, горячие клавиши, burst typing, эргономика и правило 15 минут в день.",
    },
    content: {
      uz: kompyuterTezYozishUz,
      en: kompyuterTezYozishEn,
      ru: kompyuterTezYozishRu,
    },
    readTime: {
      uz: "8 daqiqa",
      en: "8 min read",
      ru: "8 мин чтения",
    },
    primaryKeyword: {
      uz: "kompyuterda tez yozish",
      en: "fast typing on computer",
      ru: "быстрая печать на компьютере",
    },
    articleType: "Article",
  },
  {
    id: "cpm-va-wpm-farqi",
    publishedAt: "2026-05-03",
    updatedAt: "2026-05-03",
    slugs: {
      uz: "cpm-va-wpm-farqi",
      en: "cpm-vs-wpm-difference",
      ru: "cpm-vs-wpm-raznitsa",
    },
    titles: {
      uz: "CPM va WPM farqi — qaysi birini ishlatish kerak",
      en: "CPM vs WPM — Which One Should You Use",
      ru: "CPM vs WPM — какую метрику использовать",
    },
    excerpts: {
      uz: "WPM × 5 = CPM. Lekin formulada nuanslar bor: Net vs Gross, til bo'yicha farqlar, qaysi sayt qaysini ishlatadi va ish uchun qaysi metrika kerak.",
      en: "WPM × 5 = CPM. But the formula has nuances: Net vs Gross, language differences, which sites use which, and which metric your job needs.",
      ru: "WPM × 5 = CPM. Но в формуле есть нюансы: Net vs Gross, различия по языкам, какой сайт что использует и какая метрика нужна для вашей работы.",
    },
    content: {
      uz: cpmWpmFarqiUz,
      en: cpmWpmFarqiEn,
      ru: cpmWpmFarqiRu,
    },
    readTime: {
      uz: "7 daqiqa",
      en: "7 min read",
      ru: "7 мин чтения",
    },
    primaryKeyword: {
      uz: "cpm va wpm farqi",
      en: "cpm vs wpm difference",
      ru: "cpm vs wpm разница",
    },
    articleType: "Article",
  },
  {
    id: "yozish-testi-onlayn",
    publishedAt: "2026-05-03",
    updatedAt: "2026-05-03",
    slugs: {
      uz: "yozish-testi-onlayn",
      en: "online-typing-test",
      ru: "test-skorosti-pechati-onlayn",
    },
    titles: {
      uz: "Yozish testi onlayn — qanday o'tish va natijani izohlash",
      en: "Online Typing Test — How to Take One and Read the Result",
      ru: "Тест скорости печати онлайн — как пройти и понять результат",
    },
    excerpts: {
      uz: "30 sekundda bepul testdan o'tish: qaysi vaqt va daraja sizga mos, natijani 4 ta raqam bo'yicha qanday o'qish, vaqt o'tishi bilan o'sishni kuzatish.",
      en: "Take a free test in 30 seconds: which duration and difficulty fit you, how to read the 4-number result, and how to track growth over time.",
      ru: "Пройдите бесплатный тест за 30 секунд: какая длительность и сложность подходят вам, как расшифровать результат и как отслеживать рост.",
    },
    content: {
      uz: yozishTestiOnlaynUz,
      en: yozishTestiOnlaynEn,
      ru: yozishTestiOnlaynRu,
    },
    readTime: {
      uz: "8 daqiqa",
      en: "8 min read",
      ru: "8 мин чтения",
    },
    primaryKeyword: {
      uz: "yozish testi onlayn",
      en: "typing test online",
      ru: "тест скорости печати онлайн",
    },
    articleType: "HowTo",
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
