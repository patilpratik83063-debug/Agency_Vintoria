'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from './Reveal';

interface ChapterHighlight {
  value: string;
  label: string;
}

interface Chapter {
  index: string;
  eyebrow: string;
  line: string;
  body: string;
  highlights: ChapterHighlight[];
  href: string;
  cta: string;
}

// Cinematic chapters over the scroll-video: a headline, a substantive setup
// line and proof-point highlights per screen. Tall sections keep the page
// long so the background video scrubs slowly from start to finish.
const CHAPTERS: Chapter[] = [
  {
    index: '01',
    eyebrow: 'Capabilities',
    line: 'Twelve pillars. One studio.',
    body: 'Strategy, design, engineering, AI, automation and growth — every digital layer your product needs, handled by one senior team that owns outcomes end to end instead of handing work across vendors.',
    highlights: [
      { value: '12', label: 'Core pillars' },
      { value: '230+', label: 'Production skills' },
      { value: '1', label: 'Accountable team' },
    ],
    href: '/capabilities',
    cta: 'Explore capabilities',
  },
  {
    index: '02',
    eyebrow: 'Selected Work',
    line: 'Proof, not promises.',
    body: 'Flagship builds across SaaS, AI products, automation systems and brand platforms — each one shipped to production, measured against real business metrics and documented as a case study you can inspect.',
    highlights: [
      { value: 'Live', label: 'Production systems' },
      { value: 'SaaS · AI', label: 'Product categories' },
      { value: 'Metric-led', label: 'Case studies' },
    ],
    href: '/work',
    cta: 'See the work',
  },
  {
    index: '03',
    eyebrow: 'AI & Automation',
    line: 'Systems that think.',
    body: 'Custom AI features, intelligent agents and workflow automations engineered into your stack — from architecture and evaluation to deployment, monitoring and iteration in production.',
    highlights: [
      { value: 'Agents', label: 'AI systems' },
      { value: 'Auto', label: 'Workflow pipelines' },
      { value: 'Prod-grade', label: 'Eval & monitoring' },
    ],
    href: '/ai-automation',
    cta: 'Enter the lab',
  },
  {
    index: '04',
    eyebrow: 'Project Estimator',
    line: 'Scope it in minutes.',
    body: 'Answer a few questions about your goals, features and timeline — get an instant, transparent scope and technical estimate generated from real delivery data, then refine it with a founder on a call.',
    highlights: [
      { value: 'Instant', label: 'Scope estimate' },
      { value: 'Transparent', label: 'Pricing logic' },
      { value: 'Founder', label: 'Review included' },
    ],
    href: '/estimator',
    cta: 'Run the estimator',
  },
  {
    index: '05',
    eyebrow: 'Methodology',
    line: 'Idea to impact.',
    body: 'A six-phase engineering sprint — discover, architect, design, build, harden, scale — with weekly demos, staging links and direct founder access, so you always know exactly where your project stands.',
    highlights: [
      { value: '6', label: 'Delivery phases' },
      { value: 'Weekly', label: 'Live demos' },
      { value: 'Direct', label: 'Founder access' },
    ],
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
          <Reveal delay={280}>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-zinc-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-base">
              {chapter.body}
            </p>
          </Reveal>
          <Reveal delay={340}>
            <div className="mt-7 flex items-stretch justify-center gap-3 sm:gap-4">
              {chapter.highlights.map((highlight) => (
                <div
                  key={highlight.label}
                  className="min-w-[92px] rounded-2xl border border-white/20 bg-black/55 px-4 py-3 backdrop-blur-xl sm:min-w-[120px]"
                >
                  <div className="text-lg font-bold text-white sm:text-xl">{highlight.value}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-emerald-300">
                    {highlight.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={400}>
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
        <Reveal delay={280}>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-zinc-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-base">
            Tell us where you want to go — a founder replies personally within 24 hours with
            first thoughts on architecture, scope and timeline. No sales layers, no waiting queues.
          </p>
        </Reveal>
        <Reveal delay={360}>
          <div className="mt-6 flex items-center justify-center gap-5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">
            <span>24h founder reply</span>
            <span className="h-1 w-1 rounded-full bg-emerald-400" />
            <span>Free discovery call</span>
            <span className="h-1 w-1 rounded-full bg-emerald-400" />
            <span>NDA on request</span>
          </div>
        </Reveal>
        <Reveal delay={420}>
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
