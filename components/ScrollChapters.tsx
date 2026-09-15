'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from './Reveal';

interface Chapter {
  index: string;
  eyebrow: string;
  line: string;
  href: string;
  cta: string;
}

// Minimal one-line chapters — the scroll-video is the story, text only whispers.
// Tall sections stretch the page so the video scrubs slowly and cinematically.
const CHAPTERS: Chapter[] = [
  {
    index: '01',
    eyebrow: 'Capabilities',
    line: 'Twelve pillars. One studio.',
    href: '/capabilities',
    cta: 'Explore capabilities',
  },
  {
    index: '02',
    eyebrow: 'Selected Work',
    line: 'Proof, not promises.',
    href: '/work',
    cta: 'See the work',
  },
  {
    index: '03',
    eyebrow: 'AI & Automation',
    line: 'Systems that think.',
    href: '/ai-automation',
    cta: 'Enter the lab',
  },
  {
    index: '04',
    eyebrow: 'Project Estimator',
    line: 'Scope it in minutes.',
    href: '/estimator',
    cta: 'Run the estimator',
  },
  {
    index: '05',
    eyebrow: 'Methodology',
    line: 'Idea to impact.',
    href: '/process',
    cta: 'How we work',
  },
];

export function ScrollChapters() {
  return (
    <div id="scroll-chapters" className="relative">
      {CHAPTERS.map((chapter, i) => (
        <section
          key={chapter.index}
          className="pointer-events-none relative flex min-h-[130vh] flex-col items-center justify-center px-6 text-center"
        >
          <Reveal delay={80} direction={i % 2 === 0 ? 'up' : 'scale'}>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              {chapter.index} · {chapter.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <h2 className="mt-5 max-w-4xl text-4xl font-light leading-tight tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] sm:text-6xl">
              {chapter.line}
            </h2>
          </Reveal>
          <Reveal delay={320}>
            <Link
              href={chapter.href}
              className="pointer-events-auto mt-7 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/55 px-5 py-2.5 text-xs font-semibold text-white backdrop-blur-xl transition hover:border-white/60 hover:bg-white/15 active:scale-95"
            >
              <span>{chapter.cta}</span>
              <ArrowUpRight size={14} />
            </Link>
          </Reveal>
        </section>
      ))}

      {/* Finale — hands off to the contact page */}
      <section className="pointer-events-none relative flex min-h-[110vh] flex-col items-center justify-center px-6 text-center">
        <Reveal direction="scale">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            06 · Begin
          </div>
        </Reveal>
        <Reveal delay={200}>
          <h2 className="mt-5 max-w-4xl text-5xl font-normal leading-tight tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.98)] sm:text-7xl">
            BUILD WHAT&apos;S NEXT.
          </h2>
        </Reveal>
        <Reveal delay={320}>
          <Link
            href="/contact"
            className="pointer-events-auto mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black shadow-xl transition hover:bg-white/90 active:scale-95"
          >
            <span>Start a Project</span>
            <ArrowUpRight size={15} />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
