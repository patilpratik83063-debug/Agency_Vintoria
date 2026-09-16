import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Estimator — Scope & Tech Blueprint | Vintoria',
  description:
    'Configure your project archetype, capabilities, timeline and budget — get an instant technical blueprint with sprint roadmap, squad composition and stack recommendation.',
  openGraph: {
    title: 'Vintoria Project Estimator',
    description: 'Scope your build in minutes — instant technical blueprint.',
  },
};

export default function EstimatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
