import type { Metadata } from "next";

type Language = "uz" | "en" | "ru";

const meta: Record<Language, {
  title: string;
  description: string;
  ogTitle: string;
  keywords: string[];
}> = {
  uz: {
    title: "Programming Typing Test — Kod yozish tezligini tekshiring | Uzbektype",
    description: "JavaScript, Python, TypeScript kodi bilan typing test. Dasturchilar uchun kod yozish tezligini WPM va aniqlik bo'yicha o'lchang. Bepul, ro'yxatdan o'tishsiz.",
    ogTitle: "Programming Typing Test — Dasturchilar uchun",
    keywords: [
      "programming typing test",
      "kod yozish testi",
      "dasturchi typing test",
      "code typing test uz",
      "javascript typing test",
      "python typing test",
      "typescript typing test",
      "kod yozish tezligi",
      "dasturchilar uchun yozish testi",
    ],
  },
  en: {
    title: "Programming Typing Test — Practice Code Typing | Uzbektype",
    description: "Free programming typing test with real code from JavaScript, Python, and TypeScript. Measure your code typing WPM and accuracy. No signup required.",
    ogTitle: "Programming Typing Test — For Developers",
    keywords: [
      "programming typing test",
      "code typing test",
      "code typing practice",
      "javascript typing test",
      "python typing test",
      "typescript typing test",
      "developer typing test",
      "wpm test code",
      "free code typing test",
    ],
  },
  ru: {
    title: "Тест печати кода — Тренировка для программистов | Uzbektype",
    description: "Бесплатный тест скорости набора кода с реальными фрагментами JavaScript, Python и TypeScript. Измерьте свою WPM и точность набора кода.",
    ogTitle: "Тест печати кода — для программистов",
    keywords: [
      "тест печати кода",
      "тренировка набора кода",
      "тест скорости печати кода",
      "javascript тест печати",
      "python тест печати",
      "typescript тест печати",
      "тест для программистов",
      "wpm тест кода",
      "бесплатный тест набора кода",
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Language }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const m = meta[lang];

  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: {
      canonical: `https://uzbektype.uz/${lang}/tests/programming`,
      languages: {
        uz: "/uz/tests/programming",
        en: "/en/tests/programming",
        ru: "/ru/tests/programming",
      },
    },
    openGraph: {
      title: m.ogTitle,
      description: m.description,
      url: `https://uzbektype.uz/${lang}/tests/programming`,
      type: "website",
      locale: lang === "uz" ? "uz_UZ" : lang === "en" ? "en_US" : "ru_RU",
    },
    twitter: {
      card: "summary_large_image",
      title: m.ogTitle,
      description: m.description,
    },
    robots: { index: true, follow: true },
  };
}

export default function ProgrammingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
