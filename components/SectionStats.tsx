'use client';

import React from 'react';
import { Reveal } from './Reveal';
import { BrandLogo } from './BrandLogo';
import { GlassCard } from './ui/GlassCard';
import { Badge } from './ui/Badge';
import { Compass, Palette, Code2, Bot, Zap, TrendingUp } from 'lucide-react';

const disciplines = [
  {
    name: 'STRATEGY',
    verb: 'Direction',
    tagline: 'Strategy gives an idea direction.',
    icon: Compass,
    color: 'text-amber-400',
  },
  {
    name: 'DESIGN',
    verb: 'Form',
    tagline: 'Design gives it form.',
    icon: Palette,
    color: 'text-pink-400',
  },
  {
    name: 'ENGINEERING',
    verb: 'Life',
    tagline: 'Engineering gives it life.',
    icon: Code2,
    color: 'text-blue-400',
  },
  {
    name: 'AI',
    verb: 'Intelligence',
    tagline: 'AI gives it intelligence.',
    icon: Bot,
    color: 'text-emerald-400',
  },
  {
    name: 'AUTOMATION',
    verb: 'Leverage',
    tagline: 'Automation gives it leverage.',
    icon: Zap,
    color: 'text-yellow-400',
  },
  {
    name: 'GROWTH',
    verb: 'Momentum',
    tagline: 'Growth gives it momentum.',
    icon: TrendingUp,
    color: 'text-purple-400',
  },
];

export function SectionStats() {
  return (
    <section id="studio-intro" className="relative z-10 px-5 py-24 sm:px-8 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Intro Block: ONE STUDIO. EVERY DIGITAL LAYER. */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <div className="inline-flex items-center gap-2 rounded-lg border border-hairline-raised bg-overlay px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-white backdrop-blur-xl">
                <BrandLogo size="xs" bordered={false} />
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                <span>The Multidisciplinary Framework</span>
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.06]">
                ONE STUDIO.
                <br />
                <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                  EVERY DIGITAL LAYER.
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={200}>
              <p className="text-base sm:text-lg leading-relaxed text-zinc-200 font-normal">
                Strategy gives an idea direction. Design gives it form. Engineering gives it life. AI gives it intelligence. Automation gives it leverage. Growth gives it momentum.
              </p>
              <p className="mt-3 text-sm sm:text-base text-zinc-300 font-medium">
                Vintoria brings these disciplines together to build digital systems that move businesses forward.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 6 Disciplines Interactive Cards */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {disciplines.map((d, i) => {
            const Icon = d.icon;
            return (
              <Reveal key={d.name} delay={150 + i * 60}>
                <GlassCard interactive="hover" className="group relative flex h-full flex-col justify-between p-4 hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between">
                      <Icon size={18} className={d.color} />
                      <span className="font-mono text-xs text-white/50">0{i + 1}</span>
                    </div>
                    <div className="mt-3 font-mono text-sm font-bold tracking-wider text-white">
                      {d.name}
                    </div>
                  </div>
                  <div className="mt-4 pt-2 border-t border-hairline">
                    <span className="text-xs text-zinc-300 font-medium group-hover:text-white transition-colors">
                      {d.tagline}
                    </span>
                  </div>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>

        {/* What Vintoria Does & Capability Statement Banner */}
        <GlassCard surface="standard" className="mt-12 p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <Reveal delay={150}>
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-emerald-300 font-semibold">
                  What Vintoria Does
                </span>
                <h3 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  WE BUILD DIGITAL SYSTEMS.
                </h3>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-zinc-200">
                  From the first product idea to a fully scaled digital platform, Vintoria works across the entire product lifecycle. We create websites, SaaS platforms, mobile applications, AI products, automation systems, e-commerce experiences and growth infrastructure — combining creative thinking with serious engineering.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:border-l lg:border-hairline-raised lg:pl-10">
              <Reveal delay={250}>
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-emerald-300 font-semibold">
                  Capability Statement
                </span>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  MORE THAN DEVELOPMENT.
                </h3>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-zinc-200">
                  Great digital products aren&apos;t created by writing code alone. They require strategy, experience design, technology, infrastructure and an understanding of how people and businesses actually work.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['STRATEGY', 'DESIGN', 'ENGINEERING', 'AI', 'AUTOMATION', 'GROWTH'].map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
