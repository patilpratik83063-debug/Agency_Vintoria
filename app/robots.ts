import type { MetadataRoute } from 'next';

function siteUrl(): string {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  const raw = process.env.APP_URL;
  if (raw) {
    try {
      return new URL(raw).toString().replace(/\/$/, '');
    } catch {
      /* placeholder value */
    }
  }
  return 'https://vintoria.studio';
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
