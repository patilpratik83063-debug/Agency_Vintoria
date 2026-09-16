import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Process — From Idea to Impact | Vintoria',
  description:
    'The six-phase Vintoria engineering sprint: discover, define, design, build, launch, evolve — with weekly demos, staging links and direct founder access.',
  openGraph: {
    title: 'The Vintoria Process',
    description: 'Six phases from idea to impact, with direct founder involvement.',
  },
};

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
