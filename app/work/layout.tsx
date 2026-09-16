import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work — Capability Builds & Architecture Specs | Vintoria',
  description:
    'Full-stack reference builds from the Vintoria studio: AI agent systems, spatial web, SaaS platforms and enterprise storefronts — with metrics, stacks and architectural blueprints.',
  openGraph: {
    title: 'Vintoria Work — Proof, Not Promises',
    description: 'Architecture specs and capability builds from the studio.',
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
