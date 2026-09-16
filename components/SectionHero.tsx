'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';
import { Reveal } from './Reveal';
import { BrandLogo } from './BrandLogo';
import { Button } from './ui/Button';
import { GlassCard } from './ui/GlassCard';

interface SectionHeroProps {
  onOpenConsultation: () => void;
}

export function SectionHero({ onOpenConsultation }: SectionHeroProps) {
  return (
    <section
      id="hero-section"
      className="relative flex min-h-screen supports-[height:100svh]:min-h-[100svh] flex-col justify-between px-5 pt-28 pb-12 sm:px-8 sm:pt-32 md:px-12 md:pb-16"
    >
      {/* Top Row: Service Taxonomy (Left) + Studio Mission (Right) */}
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        {/* Left — Brand Taxonomy */}
        <div id="hero-service-list" className="flex flex-col gap-2">
          {['STRATEGY', 'DESIGN', 'ENGINEERING', 'AI', 'AUTOMATION', 'GROWTH'].map((discipline, i) => (
            <Reveal key={discipline} delay={120 + i * 80}>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/90 flex items-center gap-2 font-medium">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                / {discipline}
              </span>
            </Reveal>
          ))}
        </div>

        {/* Right — Intro Statement */}
        <div id="hero-intro-text" className="max-w-md sm:text-right">
          <Reveal delay={250}>
            <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-emerald-300 font-bold mb-2">
              <span>EST. 2020 · DIGITAL PRODUCT STUDIO</span>
            </div>
            <p className="text-base sm:text-lg leading-relaxed text-white font-normal">
              Digital products, engineered for growth. We combine strategy, design, engineering, AI, automation and growth to build experiences for ambitious businesses.
            </p>
            <div className="mt-3 flex items-center justify-start sm:justify-end gap-3 text-xs font-mono text-white/80">
              <span className="flex items-center gap-1">
                <Zap size={13} className="text-amber-400" />
                <span className="text-white">AI &amp; Automation</span>
              </span>
              <span aria-hidden="true">•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck size={13} className="text-emerald-400" />
                <span className="text-white">Scale With Intent</span>
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom Area: Main Headline + Action Row & Founders Glass Card */}
      <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        {/* Left Column: Eyebrow + H1 + Subtitle + Action CTA Buttons */}
        <div id="hero-headline-block" className="max-w-3xl">
          {/* Eyebrow Badge */}
          <Reveal delay={150}>
            <div
              id="hero-business-badge"
              className="mb-6 inline-flex items-center gap-2 rounded-lg border border-hairline-raised bg-overlay px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-white backdrop-blur-xl"
            >
              <BrandLogo size="xs" bordered={false} />
              <span>VINTORIA&reg; — DIGITAL PRODUCT STUDIO · EST. 2020</span>
            </div>
          </Reveal>

          {/* H1 Headline — Option A: BUILD WHAT'S NEXT. */}
          <Reveal delay={280}>
            <h1
              id="hero-heading"
              className="text-5xl font-normal leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              BUILD WHAT&apos;S
              <br />
              <span className="font-semibold text-white">
                NEXT.
              </span>
            </h1>
          </Reveal>

          {/* Subtitle */}
          <Reveal delay={350}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-100 sm:text-lg font-normal">
              We design and engineer digital products, AI systems and growth experiences that turn ambitious ideas into something real.
            </p>
          </Reveal>

          {/* Action CTAs */}
          <Reveal delay={420}>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Button
                type="button"
                onClick={onOpenConsultation}
                id="hero-start-project-cta"
                size="lg"
              >
                <span>Start a Project</span>
                <ChevronRight size={15} />
              </Button>

              <Button
                href="/capabilities"
                id="hero-explore-work-cta"
                variant="secondary"
                size="lg"
              >
                <span>Explore Capabilities</span>
                <ArrowUpRight size={14} />
              </Button>

              <Button
                href="/about"
                id="hero-about-link"
                variant="outline"
                size="lg"
              >
                <span>Founders &amp; Story</span>
                <ChevronRight size={14} />
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Right — Glass Card Featuring Founders Abhishek Kogle & Pratik Patil */}
        <Reveal delay={420} className="self-start lg:self-end">
          <GlassCard surface="standard" interactive="hover" id="contact-founders-card" className="flex items-center gap-4 p-4">
            {/* Dual Founder Portraits */}
            <div className="flex -space-x-4 overflow-hidden py-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/founder.jpg"
                alt="Abhishek Kogle — Founder of Vintoria"
                className="inline-block h-20 w-16 rounded-xl object-cover object-top ring-2 ring-black border border-hairline-raised"
                loading="eager"
                decoding="async"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/co-founder.jpg"
                alt="Pratik Patil — Co-Founder of Vintoria"
                className="inline-block h-20 w-16 rounded-xl object-cover object-top ring-2 ring-black border border-hairline-raised"
                loading="eager"
                decoding="async"
              />
            </div>

            <div className="flex flex-col gap-1 pr-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">Abhishek &amp; Pratik</span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-emerald-300 font-semibold">
                Founders · Vintoria Studio
              </span>
              <p className="text-xs text-zinc-300 max-w-[220px] leading-snug">
                Direct access to principal founders for strategic architecture.
              </p>
              <Button
                id="book-call-button"
                type="button"
                onClick={onOpenConsultation}
                size="sm"
                className="mt-2 w-fit"
              >
                <span>Talk with Founders</span>
                <ChevronRight size={13} />
              </Button>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
