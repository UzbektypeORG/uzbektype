import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/admode",
          "/admode/",
          // User-specific pages aren't useful in search results
          "/uz/profile",
          "/en/profile",
          "/ru/profile",
          "/uz/dashboard",
          "/en/dashboard",
          "/ru/dashboard",
        ],
      },
    ],
    sitemap: "https://uzbektype.uz/sitemap.xml",
    host: "https://uzbektype.uz",
  };
}
