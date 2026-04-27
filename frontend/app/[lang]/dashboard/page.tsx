import DashboardClient from "./DashboardClient";

type Language = "uz" | "en" | "ru";

export const metadata = {
  title: "Dashboard | UzbekType",
  robots: "noindex, nofollow",
};

export default async function DashboardPage({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  return <DashboardClient lang={lang || "uz"} />;
}
