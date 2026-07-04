import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts, type Language } from "@/data/blogPosts";

const pageContent = {
  uz: {
    title: "Foydali Maqolalar",
    subtitle: "Yozish tezligi va ko'nikmalarini oshirish bo'yicha amaliy qo'llanmalar",
    backHome: "Bosh sahifaga qaytish",
    read: "O'qish",
    empty: "Tez orada yangi maqolalar paydo bo'ladi",
  },
  en: {
    title: "Helpful Articles",
    subtitle: "Practical guides on improving your typing speed and skills",
    backHome: "Back to home",
    read: "Read",
    empty: "More articles coming soon",
  },
  ru: {
    title: "Полезные Статьи",
    subtitle: "Практические руководства по улучшению скорости и навыков печати",
    backHome: "На главную",
    read: "Читать",
    empty: "Скоро появятся новые статьи",
  },
} as const;

const baseUrl = "https://www.uzbektype.uz";

export async function generateMetadata({ params }: { params: Promise<{ lang: Language }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = pageContent[lang] ?? pageContent.uz;
  return {
    title: `${t.title} | UzbekType`,
    description: t.subtitle,
    alternates: {
      canonical: `${baseUrl}/${lang}/blog`,
      languages: {
        uz: `${baseUrl}/uz/blog`,
        en: `${baseUrl}/en/blog`,
        ru: `${baseUrl}/ru/blog`,
      },
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const t = pageContent[lang] ?? pageContent.uz;

  return (
    <main className="min-h-[calc(100vh-73px)]">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-12 md:mb-16 space-y-4 animate-fade-in">
          <Link
            href={`/${lang}`}
            className="inline-block text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            ← {t.backHome}
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{t.title}</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {blogPosts.length === 0 ? (
          <p className="text-center text-muted-foreground">{t.empty}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post, index) => (
              <Link
                key={post.id}
                href={`/${lang}/blog/${post.slugs[lang]}`}
                className="group p-6 md:p-8 rounded-xl border border-border hover:border-foreground/40 hover:bg-accent/30 transition-all duration-300 space-y-3"
                style={{
                  animation: `fade-in 0.4s ease-out ${index * 100}ms forwards`,
                  opacity: 0,
                }}
              >
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <time>{post.publishedAt}</time>
                  <span>{post.readTime[lang]}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-semibold leading-snug group-hover:text-primary transition-colors">
                  {post.titles[lang]}
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-3">
                  {post.excerpts[lang]}
                </p>
                <div className="text-sm font-medium text-primary group-hover:translate-x-1 transition-transform inline-block pt-2">
                  {t.read} →
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
