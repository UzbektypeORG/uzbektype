import ProfileClient from "./ProfileClient";

type Language = "uz" | "en" | "ru";

export const metadata = {
  title: "Profil | UzbekType",
  robots: "noindex, nofollow",
};

export default async function ProfilePage({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  return <ProfileClient lang={lang || "uz"} />;
}
