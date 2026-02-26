import { MetadataRoute } from 'next';

const URL = 'https://auto-recipe.example.com'; // TODO: 本番環境のURLに変更

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/admin/'], // クローラーに読み込ませないパス
        },
        sitemap: `${URL}/sitemap.xml`,
    };
}
