import type { Metadata } from "next";

type Language = "uz" | "en" | "ru";

const meta: Record<Language, {
  title: string;
  description: string;
  ogTitle: string;
  keywords: string[];
}> = {
  uz: {
    title: "Mashhur iqtiboslar typing test — Tarixiy gaplar bilan mashq | Uzbektype",
    description: "Shakespeare, Einstein, Lincoln, Steve Jobs va boshqa mashhur shaxslar iqtiboslari bilan typing test. Tasdiqlangan birlamchi manbalar. Bepul.",
    ogTitle: "Mashhur iqtiboslar typing test",
    keywords: [
      "iqtiboslar typing test",
      "mashhur iqtiboslar yozish",
      "mashhur gaplar typing",
      "tarixiy iqtiboslar mashqi",
      "shakespeare typing test",
      "einstein iqtibos",
      "famous quotes typing test uz",
    ],
  },
  en: {
    title: "Famous Quotes Typing Test — Practice with Timeless Lines | Uzbektype",
    description: "Free typing test built from verified quotes by Shakespeare, Einstein, Lincoln, Steve Jobs, and others. Practice on real prose with primary-source attribution.",
    ogTitle: "Famous Quotes Typing Test",
    keywords: [
      "famous quotes typing test",
      "quotes typing practice",
      "inspirational quotes typing",
      "shakespeare typing test",
      "literature typing test",
      "historical quotes typing",
      "free quotes typing test",
    ],
  },
  ru: {
    title: "Тест печати известных цитат — Тренировка на классике | Uzbektype",
    description: "Бесплатный тест печати на проверенных цитатах Шекспира, Эйнштейна, Линкольна, Стива Джобса и других. Реальная проза с первоисточниками.",
    ogTitle: "Тест печати известных цитат",
    keywords: [
      "тест печати цитат",
      "тренировка печати на цитатах",
      "известные цитаты тест печати",
      "шекспир тест печати",
      "цитаты классиков набор",
      "тест печати литература",
      "бесплатный тест цитат",
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
      canonical: `https://uzbektype.uz/${lang}/tests/quotes`,
      languages: {
        uz: "/uz/tests/quotes",
        en: "/en/tests/quotes",
        ru: "/ru/tests/quotes",
      },
    },
    openGraph: {
      title: m.ogTitle,
      description: m.description,
      url: `https://uzbektype.uz/${lang}/tests/quotes`,
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

export default function QuotesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
