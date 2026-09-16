import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Capabilities — 12 Pillars, 230+ Skills | Vintoria',
  description:
    'The complete Vintoria service catalog: strategy, web, SaaS, mobile, UI/UX, branding, AI, automation, backend, e-commerce, growth and support — 12 pillars, 230+ production skills.',
  openGraph: {
    title: 'Vintoria Capabilities — The Gate of Capabilities',
    description: '12 pillars. 230+ production skills. One accountable team.',
  },
};

export default function CapabilitiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
