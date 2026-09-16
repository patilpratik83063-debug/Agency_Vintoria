import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy, NDA & Terms | Vintoria',
  description:
    'How Vintoria handles project data, confidentiality commitments and engagement terms.',
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
