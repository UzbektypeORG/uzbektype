import type { Metadata } from "next";

type Language = "uz" | "en" | "ru";

const meta: Record<Language, {
  title: string;
  description: string;
  ogTitle: string;
  keywords: string[];
}> = {
  uz: {
    title: "Tinish belgilari typing test — Punktuatsiya mashqi | Uzbektype",
    description: "Tinish belgilari bilan typing test — vergul, nuqta, qo'shtirnoq, qavslar va boshqalar. Punktuatsiya tezligini va aniqligini oshiring. Bepul.",
    ogTitle: "Tinish belgilari typing test",
    keywords: [
      "tinish belgilari typing test",
      "punktuatsiya mashqi",
      "tinish belgilarini tez yozish",
      "vergul nuqta typing test",
      "punctuation typing test uz",
      "shift tugmasi mashqi",
      "tinish belgilari yozish testi",
    ],
  },
  en: {
    title: "Punctuation Typing Test — Practice Punctuation Marks | Uzbektype",
    description: "Free typing test focused on punctuation: commas, periods, quotes, brackets, dashes. Train accurate use of punctuation marks at speed. No signup.",
    ogTitle: "Punctuation Typing Test",
    keywords: [
      "punctuation typing test",
      "typing test with punctuation",
      "punctuation typing practice",
      "comma period typing",
      "shift key typing test",
      "symbol typing test",
      "free punctuation test",
    ],
  },
  ru: {
    title: "Тест печати знаков препинания — Пунктуация | Uzbektype",
    description: "Бесплатный тест печати знаков препинания: запятые, точки, кавычки, скобки, тире. Тренируйте точное использование пунктуации на скорости.",
    ogTitle: "Тест печати знаков препинания",
    keywords: [
      "тест печати знаков препинания",
      "тренировка пунктуации",
      "тест печати с пунктуацией",
      "запятая точка набор",
      "shift клавиша тренировка",
      "тест символов набор",
      "бесплатный тест пунктуации",
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
      canonical: `https://www.uzbektype.uz/${lang}/tests/punctuation`,
      languages: {
        uz: "/uz/tests/punctuation",
        en: "/en/tests/punctuation",
        ru: "/ru/tests/punctuation",
      },
    },
    openGraph: {
      title: m.ogTitle,
      description: m.description,
      url: `https://www.uzbektype.uz/${lang}/tests/punctuation`,
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

export default function PunctuationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
