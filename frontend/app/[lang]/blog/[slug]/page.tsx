import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugParams, getPostBySlug, type Language } from "@/data/blogPosts";
import BlogArticleView from "./BlogArticleView";

type Params = { lang: Language; slug: string };

export function generateStaticParams() {
  return getAllSlugParams();
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getPostBySlug(lang, slug);
  if (!post) return { title: "Not found" };

  const localeMap: Record<Language, string> = { uz: "uz_UZ", en: "en_US", ru: "ru_RU" };
  const baseUrl = "https://uzbektype.uz";
  const canonical = `${baseUrl}/${lang}/blog/${slug}`;
  const alternateLanguages = Object.fromEntries(
    (Object.keys(post.slugs) as Language[]).map((l) => [l, `${baseUrl}/${l}/blog/${post.slugs[l]}`])
  );

  return {
    title: `${post.titles[lang]} | UzbekType`,
    description: post.excerpts[lang],
    keywords: [post.primaryKeyword[lang]],
    authors: [{ name: "Uzbektype" }],
    alternates: {
      canonical,
      languages: alternateLanguages,
    },
    openGraph: {
      type: "article",
      locale: localeMap[lang],
      url: canonical,
      title: post.titles[lang],
      description: post.excerpts[lang],
      siteName: "Uzbektype",
      publishedTime: `${post.publishedAt}T00:00:00.000Z`,
      modifiedTime: `${post.updatedAt}T00:00:00.000Z`,
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: post.titles[lang],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.titles[lang],
      description: post.excerpts[lang],
      images: [`${baseUrl}/og-image.png`],
    },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<Params> }) {
  const { lang, slug } = await params;
  const post = getPostBySlug(lang, slug);
  if (!post) notFound();
  return <BlogArticleView post={post} lang={lang} />;
}
