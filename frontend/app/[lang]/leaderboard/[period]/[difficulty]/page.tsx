import LeaderboardClient from "./LeaderboardClient";

type Language = "uz" | "en" | "ru";
type Period = "weekly" | "monthly" | "alltime";
type Difficulty = "easy" | "medium" | "hard";

export const metadata = {
  title: "Leaderboard | UzbekType",
  description: "Top typing speed test results — filtered by period and difficulty.",
};

export function generateStaticParams() {
  const langs: Language[] = ["uz", "en", "ru"];
  const periods: Period[] = ["weekly", "monthly", "alltime"];
  const difficulties: Difficulty[] = ["easy", "medium", "hard"];
  return langs.flatMap((lang) =>
    periods.flatMap((period) =>
      difficulties.map((difficulty) => ({ lang, period, difficulty }))
    )
  );
}

export default async function LeaderboardPage({ params }: { params: Promise<{ lang: Language; period: Period; difficulty: Difficulty }> }) {
  const { lang, period, difficulty } = await params;
  const validPeriods: Period[] = ["weekly", "monthly", "alltime"];
  const validDifficulties: Difficulty[] = ["easy", "medium", "hard"];
  const safePeriod = validPeriods.includes(period) ? period : "monthly";
  const safeDifficulty = validDifficulties.includes(difficulty) ? difficulty : "easy";
  return <LeaderboardClient lang={lang || "uz"} period={safePeriod} difficulty={safeDifficulty} />;
}
