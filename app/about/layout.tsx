import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Abhishek Kogle & Pratik Patil | Vintoria',
  description:
    'The origin, philosophy and founders of Vintoria — a digital product studio connecting strategy, design and engineering to build products that make an impact.',
  openGraph: {
    title: 'About Vintoria — Built by Builders',
    description:
      'Meet Abhishek Kogle & Pratik Patil and the studio philosophy behind Vintoria.',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
