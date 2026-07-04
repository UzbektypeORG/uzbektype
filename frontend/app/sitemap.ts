import { MetadataRoute } from "next";
import { blogPosts } from "@/data/blogPosts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.uzbektype.uz";
  const languages = ["uz", "en", "ru"] as const;

  const testTypes = ["10s", "30s", "60s", "10w", "30w", "60w"];
  const difficulties = ["easy", "medium", "hard"];
  // all-time is admin-only, so it's intentionally excluded from the sitemap.
  const periods = ["weekly", "monthly"];
  // Programmatic-SEO topic landing pages — extended as the queue advances
  const topicTests = ["programming", "numbers", "punctuation", "quotes", "uzbek-latin"];

  const now = new Date();

  // hreflang alternates per route — Google reads these for international targeting
  const hreflangs = (path: string) =>
    Object.fromEntries(
      languages.map((l) => [l, `${baseUrl}/${l}${path}`])
    );

  const entries: MetadataRoute.Sitemap = [];

  for (const lang of languages) {
    // Landing page (highest priority — daily fresh leaderboard data)
    entries.push({
      url: `${baseUrl}/${lang}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: { languages: hreflangs("") },
    });

    // Blog index
    entries.push({
      url: `${baseUrl}/${lang}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: { languages: hreflangs("/blog") },
    });

    // Test combinations (the main feature pages)
    for (const type of testTypes) {
      for (const difficulty of difficulties) {
        const path = `/tests/${type}-${difficulty}`;
        entries.push({
          url: `${baseUrl}/${lang}${path}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.8,
          alternates: { languages: hreflangs(path) },
        });
      }
    }

    // Topic-specific test landing pages (programmatic SEO)
    for (const topic of topicTests) {
      const path = `/tests/${topic}`;
      entries.push({
        url: `${baseUrl}/${lang}${path}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: { languages: hreflangs(path) },
      });
    }

    // Leaderboard variants (period × difficulty) — content updates every test
    for (const period of periods) {
      for (const difficulty of difficulties) {
        const path = `/leaderboard/${period}/${difficulty}`;
        entries.push({
          url: `${baseUrl}/${lang}${path}`,
          lastModified: now,
          changeFrequency: "daily",
          priority: 0.6,
          alternates: { languages: hreflangs(path) },
        });
      }
    }

    // Blog post pages — each post has language-specific slugs
    for (const post of blogPosts) {
      const slug = post.slugs[lang];
      entries.push({
        url: `${baseUrl}/${lang}/blog/${slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            languages.map((l) => [l, `${baseUrl}/${l}/blog/${post.slugs[l]}`])
          ),
        },
      });
    }
  }

  return entries;
}
