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

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const now = new Date();
  const routes = [
    '',
    '/about',
    '/capabilities',
    '/work',
    '/ai-automation',
    '/estimator',
    '/process',
    '/contact',
    '/legal',
  ];
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));
}
