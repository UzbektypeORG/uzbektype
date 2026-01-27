import type { Metadata } from "next";

type Language = "uz" | "en" | "ru";

const testMetadata = {
  uz: {
    title: "Typing Test",
    difficulty: {
      easy: "Oson",
      medium: "O'rta",
      hard: "Qiyin",
    },
    description: "Interaktiv typing test. Yozish tezligingizni aniqlang.",
  },
  en: {
    title: "Typing Test",
    difficulty: {
      easy: "Easy",
      medium: "Medium",
      hard: "Hard",
    },
    description: "Interactive typing test. Check your typing speed.",
  },
  ru: {
    title: "Тест печати",
    difficulty: {
      easy: "Лёгкий",
      medium: "Средний",
      hard: "Сложный",
    },
    description: "Интерактивный тест печати. Проверьте скорость печати.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Language; type: string }>;
}): Promise<Metadata> {
  const { lang, type } = await params;
  const currentLang = lang || "uz";
  const t = testMetadata[currentLang];

  // Parse type like "30s-easy" or "60w-hard"
  const [duration, difficulty] = type.split("-") as [string, "easy" | "medium" | "hard"];
  const difficultyLabel = t.difficulty[difficulty] || difficulty;
  const durationLabel = duration.toUpperCase();

  const title = `${durationLabel} ${difficultyLabel} - ${t.title} | Uzbektype`;

  return {
    title,
    description: t.description,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function TestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
