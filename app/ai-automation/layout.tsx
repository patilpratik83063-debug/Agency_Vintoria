import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI & Automation — Systems That Think | Vintoria',
  description:
    'Custom AI products, autonomous agents, RAG systems and end-to-end workflow automation engineered into your stack — architecture, evaluation, deployment and monitoring.',
  openGraph: {
    title: 'Vintoria AI & Automation Lab',
    description: 'AI features, agents and automations engineered into production stacks.',
  },
};

export default function AiAutomationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
