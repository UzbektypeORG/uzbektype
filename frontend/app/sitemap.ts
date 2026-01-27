import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://uzbektype.uz'
  const languages = ['uz', 'en', 'ru']

  // Test types
  const testTypes = ['10s', '30s', '60s', '10w', '30w', '60w']
  const difficulties = ['easy', 'medium', 'hard']

  // Generate language-specific URLs
  const languageUrls = languages.flatMap(lang => [
    // Home page for each language
    {
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    // Tests page for each language
    {
      url: `${baseUrl}/${lang}/tests`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // All test combinations for each language
    ...testTypes.flatMap(type =>
      difficulties.map(difficulty => ({
        url: `${baseUrl}/${lang}/tests/${type}-${difficulty}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
    ),
  ])

  return languageUrls
}
