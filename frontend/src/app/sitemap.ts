import { MetadataRoute } from 'next';
import { getPostSlugs } from '@/lib/api';

const URL = 'https://auto-recipe.example.com'; // TODO: Replace with actual production URL

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getPostSlugs();

    // 動的に生成されるレシピ記事のURLリスト
    const postUrls = posts.map((slug) => ({
        url: `${URL}/recipe/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // 静的なガイドページなどのURLリスト
    const staticUrls = [
        {
            url: `${URL}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1.0,
        },
        {
            url: `${URL}/guide/ai-agents`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${URL}/guide/security`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.9,
        },
        {
            url: `${URL}/guide/glossary`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }
    ];

    return [...staticUrls, ...postUrls];
}
