'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowUpRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { Reveal } from './Reveal';
import { BrandLogo } from './BrandLogo';

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
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex items-center gap-2 font-medium">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                / {discipline}
              </span>
            </Reveal>
          ))}
        </div>

        {/* Right — Intro Statement */}
        <div id="hero-intro-text" className="max-w-md sm:text-right">
          <Reveal delay={250}>
            <div className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-400 font-bold mb-2">
              <span>EST. 2020 · DIGITAL PRODUCT STUDIO</span>
            </div>
            <p className="text-base sm:text-lg leading-relaxed text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] font-normal">
              Digital products, engineered for growth. We combine strategy, design, engineering, AI, automation and growth to build experiences for ambitious businesses.
            </p>
            <div className="mt-3 flex items-center justify-start sm:justify-end gap-3 text-xs font-mono text-white/80">
              <span className="flex items-center gap-1">
                <Zap size={13} className="text-amber-400" />
                <span className="text-white">AI & Automation</span>
              </span>
              <span>•</span>
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
              className="mb-5 inline-flex items-center gap-2 rounded-lg border border-white/30 bg-black/60 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white backdrop-blur-xl shadow-lg"
            >
              <BrandLogo size="xs" bordered={false} />
              <span>VINTORIA® — DIGITAL PRODUCT STUDIO · EST. 2020</span>
            </div>
          </Reveal>

          {/* H1 Headline — Option A: BUILD WHAT'S NEXT. */}
          <Reveal delay={280}>
            <h1
              id="hero-heading"
              className="text-5xl font-normal leading-[1.02] tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              BUILD WHAT&apos;S
              <br />
              <span className="font-semibold text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.98)]">
                NEXT.
              </span>
            </h1>
          </Reveal>

          {/* Subtitle */}
          <Reveal delay={350}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-lg font-normal">
              We design and engineer digital products, AI systems and growth experiences that turn ambitious ideas into something real.
            </p>
          </Reveal>

          {/* Action CTAs */}
          <Reveal delay={420}>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={onOpenConsultation}
                id="hero-start-project-cta"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-xs sm:text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90 shadow-xl hover:shadow-white/20 active:scale-95"
              >
                <span>Start a Project</span>
                <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </button>

              <a
                href="#capabilities"
                id="hero-explore-work-cta"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/60 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/20 hover:border-white/50 active:scale-95 shadow-lg"
              >
                <span>Explore Capabilities</span>
                <ArrowUpRight size={14} />
              </a>

              <Link
                href="/about"
                id="hero-about-link"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-xs sm:text-sm font-medium text-white/90 backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:text-white"
              >
                <span>Founders & Story</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Right — Glass Card Featuring Founders Abhishek Kogle & Pratik Patil */}
        <Reveal delay={420} className="self-start lg:self-end">
          <div
            id="contact-founders-card"
            className="flex items-center gap-4 rounded-2xl border border-white/20 bg-black/55 p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:bg-black/65 shadow-2xl"
          >
            {/* Dual Founder Portraits */}
            <div className="flex -space-x-4 overflow-hidden py-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/founder.png"
                alt="Abhishek Kogle — Founder of Vintoria"
                className="inline-block h-20 w-16 rounded-xl object-cover object-top ring-2 ring-black shadow-md border border-white/25"
                loading="eager"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/co-founder.png"
                alt="Pratik Patil — Co-Founder of Vintoria"
                className="inline-block h-20 w-16 rounded-xl object-cover object-top ring-2 ring-black shadow-md border border-white/25"
                loading="eager"
              />
            </div>

            <div className="flex flex-col gap-1 pr-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">Abhishek &amp; Pratik</span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-emerald-400 font-semibold">
                Founders · Vintoria Studio
              </span>
              <p className="text-[11px] text-zinc-300 max-w-[210px] leading-tight">
                Direct access to principal founders for strategic architecture.
              </p>
              <button
                id="book-call-button"
                type="button"
                onClick={onOpenConsultation}
                className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black transition-all duration-300 hover:bg-white/85 shadow-sm active:scale-95 w-fit"
              >
                <span>Talk with Founders</span>
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
