import type { Metadata } from "next";
import StarsjoyPreview from "@/components/promo/StarsjoyPreview";
import type { Language } from "@/types";

// Internal preview of the Starsjoy results banner designs. Not linked
// anywhere and kept out of search results.
export const metadata: Metadata = {
  title: "Starsjoy banner ko'rinishi | UzbekType",
  robots: { index: false, follow: false },
};

export default async function StarsjoyPreviewPage({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  return (
    <main className="min-h-[calc(100vh-73px)] px-3 md:px-6 py-6 md:py-10">
      <StarsjoyPreview lang={lang} />
    </main>
  );
}
