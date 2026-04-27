import { redirect } from "next/navigation";

type Language = "uz" | "en" | "ru";
type Period = "weekly" | "monthly" | "alltime";

// Old route — redirect to default difficulty (medium).
export default async function PeriodOnlyRedirect({ params }: { params: Promise<{ lang: Language; period: Period }> }) {
  const { lang, period } = await params;
  redirect(`/${lang || "uz"}/leaderboard/${period || "monthly"}/medium`);
}
