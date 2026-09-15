import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

function resolveSiteUrl(): string {
  const raw = process.env.APP_URL;
  if (raw) {
    try {
      // Throws on placeholders like "MY_APP_URL" — fall through to safe defaults.
      return new URL(raw).toString();
    } catch {
      /* ignore invalid / placeholder values */
    }
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

const siteUrl = resolveSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "VINTORIA® — Digital Product Studio | Build What's Next",
  description: 'Vintoria is a digital product studio combining strategy, design, engineering, AI, automation and growth to build digital experiences and technology products for ambitious businesses.',
  icons: {
    icon: '/logo.jpg',
    apple: '/logo.jpg',
  },
  openGraph: {
    title: "VINTORIA® — Digital Product Studio | Build What's Next",
    description: 'Vintoria is a digital product studio combining strategy, design, engineering, AI, automation and growth to build digital experiences and technology products for ambitious businesses.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "VINTORIA® — Digital Product Studio | Build What's Next",
    description: 'Vintoria is a digital product studio combining strategy, design, engineering, AI, automation and growth to build digital experiences and technology products for ambitious businesses.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={inter.variable}>
      {/* Early CDN handshake + hero poster preload (must match HERO_POSTER_URL in ScrollVideo) */}
      <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      <link
        rel="preload"
        as="image"
        href="https://res.cloudinary.com/urtnhoyc/video/upload/w_1280,q_auto:good,so_0/f_jpg/b4107681-7a83-4a4b-a876-4231b80f84bd.jpg"
        fetchPriority="high"
      />
      <body className={`${inter.className} bg-[#0a0a0a] text-white antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

