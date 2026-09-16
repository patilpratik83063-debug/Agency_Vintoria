'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  Linkedin,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Award,
  Lightbulb,
} from 'lucide-react';
import { SiteShell } from '@/components/SiteShell';
import { Reveal } from '@/components/Reveal';
import { BrandLogo } from '@/components/BrandLogo';
import { FounderAvatars } from '@/components/Founders';
import { SectionSocialChannels } from '@/components/SectionSocialChannels';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GlassCard } from '@/components/ui/GlassCard';
import { XIcon } from '@/components/icons/XIcon';
import { BRAND, FOUNDER_PROFILES } from '@/lib/brandContent';
import { cn } from '@/lib/utils';

export default function AboutPage() {
  const [selectedFounder, setSelectedFounder] = useState<string>(FOUNDER_PROFILES[0].id);
  const currentFounder = FOUNDER_PROFILES.find((f) => f.id === selectedFounder) || FOUNDER_PROFILES[0];

  return (
    <SiteShell>
      {(handleOpenConsultation) => (
        <div id="about-main-content" className="flex-1 px-5 pt-32 pb-24 sm:px-8 sm:pt-36 md:px-12">
          <div className="mx-auto max-w-7xl">
            {/* Top Breadcrumb & Logo */}
            <Reveal delay={0}>
              <div className="mb-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border border-hairline-raised bg-overlay px-3.5 py-1.5 text-sm font-medium text-white/90 backdrop-blur-xl transition-colors hover:border-hairline-bright hover:text-white"
                >
                  <ArrowLeft size={14} />
                  <span>Back to Main Studio</span>
                </Link>
                <span className="text-white/40" aria-hidden="true">•</span>
                <div className="flex items-center gap-2 text-sm font-mono text-white/90">
                  <BrandLogo size="xs" bordered={false} />
                  <span>VINTORIA&reg; — DIGITAL PRODUCT STUDIO · EST. 2020</span>
                </div>
              </div>
            </Reveal>

            {/* About Us Headline & Story */}
            <div className="border-b border-hairline-raised pb-14">
              <Reveal delay={100}>
                <div className="inline-flex items-center gap-2 rounded-lg border border-hairline-raised bg-white/10 px-3.5 py-1 font-mono text-xs uppercase tracking-[0.16em] text-emerald-300 backdrop-blur-xl">
                  <Sparkles size={12} />
                  <span>About Vintoria · Our Origin &amp; Purpose</span>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08] max-w-5xl">
                  WE BELIEVE THE BEST DIGITAL PRODUCTS ARE BUILT AT THE INTERSECTION OF{' '}
                  <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                    STRATEGY, DESIGN AND ENGINEERING.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={300}>
                <div className="mt-8 max-w-4xl space-y-4 text-base sm:text-lg leading-relaxed text-zinc-200 font-normal">
                  <p>
                    Vintoria was founded with a clear intention: to build a digital product studio that approaches technology not just as an implementation task, but as a system for business growth.
                  </p>
                  <p>
                    Too often, digital projects fail because strategy is separated from design, or design is separated from engineering.
                  </p>
                  <div className="grid grid-cols-1 gap-3 py-3 sm:grid-cols-3">
                    {[
                      ['01 / STRATEGY', 'Strategy without execution is just talk.'],
                      ['02 / DESIGN', 'Design without engineering is just decoration.'],
                      ['03 / ENGINEERING', 'Engineering without strategy is just code.'],
                    ].map(([label, text]) => (
                      <GlassCard key={label} surface="standard" className="p-4 font-mono text-sm">
                        <span className="text-zinc-400 block mb-1">{label}</span>
                        <span className="text-white font-bold">{text}</span>
                      </GlassCard>
                    ))}
                  </div>
                  <p className="font-medium text-white">
                    Vintoria exists to connect these layers — helping ambitious businesses design, build and scale digital products that actually make an impact.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Founders Section: BUILT BY BUILDERS. */}
            <section id="founders" className="mt-16 scroll-mt-28">
              <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-emerald-300 font-semibold">
                    <Award size={14} />
                    <span>Studio Leadership</span>
                  </div>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    BUILT BY BUILDERS.
                  </h2>
                  <p className="mt-3 max-w-xl text-base sm:text-lg text-zinc-200">
                    Vintoria was founded by Abhishek Kogle and Pratik Patil — digital product builders with a shared belief that technology should be practical, well-engineered and designed to create real business value.
                  </p>
                </div>

                {/* Profile Toggle Switcher */}
                <div className="inline-flex rounded-full border border-hairline-raised bg-overlay-strong p-1.5 backdrop-blur-xl shadow-glass" role="tablist" aria-label="Founder profiles">
                  {FOUNDER_PROFILES.map((founder) => (
                    <button
                      key={founder.id}
                      role="tab"
                      aria-selected={selectedFounder === founder.id}
                      onClick={() => setSelectedFounder(founder.id)}
                      className={cn(
                        'flex items-center gap-2.5 rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300',
                        selectedFounder === founder.id
                          ? 'bg-white text-black shadow-glass'
                          : 'text-white/80 hover:text-white'
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={founder.thumb}
                        alt={founder.name}
                        className="h-6 w-6 rounded-full object-cover border border-black/20"
                      />
                      <span>{founder.shortName}</span>
                      <span
                        className={cn(
                          'text-xs font-mono',
                          selectedFounder === founder.id ? 'text-black/70' : 'text-white/60'
                        )}
                      >
                        {founder.role}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Founder Dossier Card */}
              <GlassCard surface="strong" className="grid grid-cols-1 gap-10 p-6 sm:p-10 lg:grid-cols-12">
                {/* Left Column: Portrait & Key Metadata */}
                <div className="flex flex-col items-center text-center lg:col-span-5 lg:items-start lg:text-left">
                  <div className="relative group">
                    <div className="relative h-80 w-64 sm:h-96 sm:w-80 overflow-hidden rounded-2xl border border-hairline-raised bg-zinc-900 shadow-glass-lg">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={currentFounder.image}
                        alt={currentFounder.name}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-black/85 px-3 py-1 font-mono text-xs text-emerald-300 border border-emerald-400/30 backdrop-blur-xl">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                          <span>{currentFounder.role} · Vintoria</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Button
                      size="md"
                      onClick={() => handleOpenConsultation(`Direct project brief with ${currentFounder.name}`)}
                    >
                      <Calendar size={13} />
                      <span>Talk with {currentFounder.shortName}</span>
                    </Button>
                    <a
                      href={currentFounder.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline-raised bg-white/10 text-white transition-colors hover:bg-white/20"
                      aria-label={`${currentFounder.name} on LinkedIn`}
                    >
                      <Linkedin size={15} />
                    </a>
                    <a
                      href={currentFounder.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline-raised bg-white/10 text-white transition-colors hover:bg-white/20"
                      aria-label={`${currentFounder.name} on X`}
                    >
                      <XIcon className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={currentFounder.socials.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/15 text-emerald-300 transition-colors hover:bg-emerald-400/25 hover:text-white"
                      aria-label="WhatsApp Direct"
                      title="Direct WhatsApp with Founder"
                    >
                      <MessageCircle size={15} />
                    </a>
                  </div>
                </div>

                {/* Right Column: Bio, Philosophy Quote, Focus Areas */}
                <div className="flex flex-col justify-between lg:col-span-7">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge tone="accent">{currentFounder.role.toUpperCase()}</Badge>
                      <span className="text-sm text-zinc-300 font-medium">EST. 2020</span>
                    </div>

                    <h3 className="mt-2 text-3xl font-bold text-white tracking-tight sm:text-4xl">
                      {currentFounder.name}
                    </h3>

                    <p className="mt-1 font-mono text-sm text-zinc-400 font-semibold">
                      {currentFounder.tagline}
                    </p>

                    {/* Philosophy Quote */}
                    <div className="my-6 rounded-2xl border-l-2 border-emerald-400/50 bg-white/5 p-5">
                      <p className="text-base sm:text-lg italic text-zinc-100 leading-relaxed font-serif">
                        &ldquo;{currentFounder.quote}&rdquo;
                      </p>
                    </div>

                    {/* Official Biography */}
                    <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-normal">
                      {currentFounder.bio}
                    </p>

                    {/* Focus Areas */}
                    <div className="mt-8">
                      <h4 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-emerald-300 font-semibold mb-3">
                        <CheckCircle2 size={14} />
                        <span>Core Strategic &amp; Operational Focus</span>
                      </h4>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {currentFounder.focusAreas.map((area, idx) => (
                          <div key={idx} className="flex items-center gap-2 rounded-xl border border-hairline bg-white/5 p-3 text-sm text-zinc-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" aria-hidden="true" />
                            <span>{area}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Core Disciplines */}
                  <div className="mt-8 border-t border-hairline-raised pt-5">
                    <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-semibold block mb-2.5">
                      Technical Disciplines
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentFounder.techDisciplines.map((item) => (
                        <span
                          key={item}
                          className="rounded-lg border border-hairline-raised bg-white/10 px-3 py-1 font-mono text-sm text-white"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </section>

            {/* Side-by-Side Dual Founder Cards */}
            <section className="mt-16">
              <div className="mb-6">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-300 font-semibold">
                  Leadership Matrix
                </span>
                <h3 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                  Meet Both Founders
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {FOUNDER_PROFILES.map((f) => (
                  <GlassCard
                    key={f.id}
                    surface="standard"
                    interactive="hover"
                    className={cn('p-6', selectedFounder === f.id && 'border-hairline-bright ring-1 ring-white/20')}
                  >
                    <div className="flex items-start gap-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={f.thumb}
                        alt={f.name}
                        className="h-20 w-20 rounded-xl object-cover border border-hairline-raised shrink-0"
                      />
                      <div className="flex-1">
                        <span className="font-mono text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                          {f.role}
                        </span>
                        <h4 className="text-xl font-bold text-white">{f.name}</h4>
                        <p className="mt-1 text-sm text-zinc-300 line-clamp-2">{f.tagline}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-zinc-300 leading-relaxed line-clamp-3">
                      {f.bio}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-hairline pt-4">
                      <button
                        onClick={() => {
                          setSelectedFounder(f.id);
                          document.getElementById('founders')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className="text-sm font-semibold text-white underline underline-offset-4 hover:text-white/80"
                      >
                        Inspect Dossier
                      </button>
                      <button
                        onClick={() => handleOpenConsultation(`Brief with ${f.name}`)}
                        className="inline-flex items-center gap-1 text-sm font-mono text-emerald-300 hover:text-emerald-200"
                      >
                        <span>Talk with {f.shortName}</span>
                        <ArrowUpRight size={12} />
                      </button>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </section>

            {/* Philosophy: TECHNOLOGY SHOULD CREATE LEVERAGE. */}
            <section id="philosophy" className="mt-24 scroll-mt-28">
              <GlassCard surface="strong" className="p-8 sm:p-14">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 rounded-lg border border-hairline-raised bg-white/10 px-3.5 py-1 font-mono text-xs uppercase tracking-[0.16em] text-emerald-300 font-semibold">
                    <Lightbulb size={13} />
                    <span>Studio Philosophy</span>
                  </div>
                  <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                    {BRAND.philosophy.title}
                  </h2>
                  <p className="mt-6 text-lg sm:text-xl leading-relaxed text-zinc-200 font-serif italic">
                    {BRAND.philosophy.body}
                  </p>
                </div>
              </GlassCard>
            </section>

            {/* How We Think (5 Points) */}
            <section id="how-we-think" className="mt-20 scroll-mt-28">
              <div className="mb-8">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-300 font-semibold">
                  Principles &amp; Method
                </span>
                <h3 className="mt-1 text-3xl font-bold text-white sm:text-4xl">
                  HOW WE THINK.
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {BRAND.howWeThink.map((item, idx) => (
                  <Reveal key={item.title} delay={100 + idx * 60}>
                    <GlassCard surface="standard" className="flex h-full flex-col justify-between p-6">
                      <div>
                        <span className="font-mono text-2xl font-bold text-emerald-300">
                          0{idx + 1}
                        </span>
                        <h4 className="mt-3 text-lg font-bold text-white tracking-tight">
                          {item.title}
                        </h4>
                        <p className="mt-2 text-sm sm:text-base text-zinc-200 leading-relaxed font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </GlassCard>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Why Vintoria (6 Points) */}
            <section id="why-vintoria" className="mt-20 border-t border-hairline-raised pt-16 scroll-mt-28">
              <div className="mb-8">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-300 font-semibold">
                  Differentiating Factor
                </span>
                <h3 className="mt-1 text-3xl font-bold text-white sm:text-4xl">
                  WHY VINTORIA.
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {BRAND.whyVintoria.map((item, idx) => (
                  <Reveal key={item.title} delay={100 + idx * 60}>
                    <GlassCard surface="standard" interactive="hover" className="flex h-full flex-col justify-between p-6">
                      <div>
                        <div className="flex items-center justify-between text-zinc-400 font-mono text-xs">
                          <span>PILLAR 0{idx + 1}</span>
                          <CheckCircle2 size={16} className="text-emerald-400" />
                        </div>
                        <h4 className="mt-3 text-lg font-bold text-white tracking-tight">
                          {item.title}
                        </h4>
                        <p className="mt-2 text-sm sm:text-base text-zinc-200 leading-relaxed font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </GlassCard>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Official Social Channels & WhatsApp Direct Connect */}
            <SectionSocialChannels />

            {/* CTA to Connect with Founders */}
            <section className="mt-24">
              <GlassCard surface="strong" className="p-8 sm:p-14 text-center">
                <div className="mx-auto max-w-2xl">
                  <div className="mx-auto mb-6 w-fit">
                    <BrandLogo size="lg" />
                  </div>
                  <div className="mx-auto mb-6 flex items-center justify-center">
                    <FounderAvatars size="lg" />
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1 text-sm font-mono text-emerald-300 mb-6">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                    <span>Direct Access to Abhishek Kogle &amp; Pratik Patil</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                    WHAT WILL YOU BUILD?
                  </h2>
                  <p className="mt-4 text-base sm:text-lg text-zinc-200 leading-relaxed">
                    The next great digital product starts with an idea. Bring us the idea. We&rsquo;ll help build what comes next.
                  </p>
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <Button
                      size="lg"
                      onClick={() => handleOpenConsultation('Direct Leadership Consultation with Abhishek & Pratik')}
                    >
                      <span>Start a Project</span>
                      <ArrowUpRight size={16} />
                    </Button>
                    <Button href="/capabilities" variant="outline" size="lg">
                      <span>Explore 230+ Capabilities</span>
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </section>
          </div>
        </div>
      )}
    </SiteShell>
  );
}
