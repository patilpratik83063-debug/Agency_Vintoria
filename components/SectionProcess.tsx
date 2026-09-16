'use client';

import React, { useState } from 'react';
import { Search, Compass, Palette, Code2, Rocket, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Reveal } from './Reveal';
import { BrandLogo } from './BrandLogo';

const steps = [
  {
    step: '01',
    title: 'DISCOVER',
    headline: 'Understand the core landscape',
    description: 'Understand the business, users, opportunity and constraints.',
    icon: Search,
    deliverables: [
      'Business & user problem framing',
      'Market opportunity & competitor audit',
      'Technical constraint mapping',
    ],
  },
  {
    step: '02',
    title: 'DEFINE',
    headline: 'Deconstruct complexity into direction',
    description: 'Turn complexity into a clear product direction and technical roadmap.',
    icon: Compass,
    deliverables: [
      'Comprehensive product specification',
      'Technical architecture roadmap',
      'Sprint milestones & velocity projections',
    ],
  },
  {
    step: '03',
    title: 'DESIGN',
    headline: 'Shape friction-free interfaces',
    description: 'Shape the experience, interface and interaction before engineering begins.',
    icon: Palette,
    deliverables: [
      'Figma design systems & token libraries',
      'Responsive wireframing & IA mapping',
      'Interactive micro-interaction prototypes',
    ],
  },
  {
    step: '04',
    title: 'BUILD',
    headline: 'Engineer reliable, scalable systems',
    description: 'Turn the approved product vision into reliable, scalable technology.',
    icon: Code2,
    deliverables: [
      'Next.js & TypeScript full-stack platform',
      'AI & workflow automation orchestration',
      'End-to-end type safety & automated CI/CD',
    ],
  },
  {
    step: '05',
    title: 'LAUNCH',
    headline: 'Deploy to the real world',
    description: 'Test, refine and introduce the product to the real world.',
    icon: Rocket,
    deliverables: [
      'Production chaos testing & security audit',
      'Edge CDN zero-latency deployment',
      'Telemetry & error monitoring setup',
    ],
  },
  {
    step: '06',
    title: 'EVOLVE',
    headline: 'Continuous optimization & growth',
    description: 'Learn from real usage, optimize what matters and build what comes next.',
    icon: TrendingUp,
    deliverables: [
      'A/B experimentation & funnel analytics',
      'Core Web Vitals & performance tuning',
      'Feature iteration & scaling infrastructure',
    ],
  },
];

export function SectionProcess() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="relative z-10 px-5 py-24 sm:px-8 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg border border-hairline-raised bg-overlay px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-white backdrop-blur-xl">
              <BrandLogo size="xs" bordered={false} />
              <Rocket size={13} className="text-emerald-400" />
              <span>Production Sprint Methodology</span>
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.06]">
              FROM IDEA
              <br />
              <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                TO IMPACT.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-base text-zinc-200 leading-relaxed md:text-right font-normal">
            Every product journey progresses through our deterministic 6-phase engineering framework, turning initial vision into scaled, measurable outcomes.
          </p>
        </div>

        {/* Process Steps Grid — 6 Steps */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCurrent = activeStep === idx;
            return (
              <Reveal key={step.step} delay={100 + idx * 70}>
                <button
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  aria-pressed={isCurrent}
                  className={`group relative flex h-full w-full flex-col justify-between rounded-2xl border p-6 text-left backdrop-blur-xl transition-[border-color,background-color,transform,box-shadow] duration-300 ease-smooth shadow-glass ${
                    isCurrent
                      ? 'border-hairline-bright bg-black/80 ring-1 ring-white/30 scale-[1.02]'
                      : 'border-hairline-raised bg-overlay hover:border-hairline-bright hover:bg-black/80'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-bold text-white/50 group-hover:text-emerald-400 transition-colors">
                        {step.step}
                      </span>
                      <div className="rounded-lg border border-hairline-raised bg-white/10 p-2 text-white">
                        <Icon size={18} />
                      </div>
                    </div>

                    <h3 className="mt-4 text-xl font-bold text-white tracking-tight">
                      {step.step} — {step.title}
                    </h3>

                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-zinc-200 font-normal">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-hairline pt-4">
                    <span className="font-mono text-xs uppercase tracking-wider text-emerald-300 font-semibold block mb-2">
                      Key Deliverables
                    </span>
                    <ul className="space-y-1.5 text-sm text-zinc-100">
                      {step.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-1.5">
                          <CheckCircle2 size={13} className="mt-1 text-emerald-400 shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
