import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Start a Project | Vintoria',
  description:
    'Tell Vintoria what you are building. Direct founder review within 4 business hours, NDA on request, and instant WhatsApp dispatch to Abhishek & Pratik.',
  openGraph: {
    title: 'Contact Vintoria — What Will You Build?',
    description: 'Start a project with the Vintoria founders.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
