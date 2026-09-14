'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Reveal } from './Reveal';

const capabilities = [
  {
    index: '01',
    title: 'Real-time vision',
    body: 'Reads context as it happens and surfaces what matters before you ask.',
  },
  {
    index: '02',
    title: 'Layered insight',
    body: 'Moves from rough outline to sharp output without losing the thread.',
  },
  {
    index: '03',
    title: 'Adaptive speed',
    body: 'Learns your cadence and tightens every pass as you work.',
  },
];

export function SectionTwo() {
  return (
    <section
      id="capability-section"
      className="relative flex min-h-screen supports-[height:100svh]:min-h-[100svh] flex-col justify-between px-5 pt-24 pb-12 sm:px-8 sm:pt-28 md:px-12 md:pb-16"
    >
      {/* Top Row: Badge (Left) + Copy (Right) */}
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        {/* Left Badge */}
        <Reveal delay={120}>
          <div
            id="capability-badge"
            className="inline-flex items-center border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md"
          >
            Insight On Demand
          </div>
        </Reveal>

        {/* Right Copy */}
        <div id="capability-intro-text" className="max-w-sm sm:text-right">
          <Reveal delay={220}>
            <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
              Our AI doesn&apos;t just respond — it interprets, sharpens, and delivers the signal you
              need.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Bottom Area: Left Column (H2 + Body + CTAs) + Right Frosted Panel */}
      <div className="flex flex-1 flex-col justify-end gap-12 pt-16 md:flex-row md:items-end md:justify-between md:gap-16">
        {/* Left Column */}
        <div id="capability-left-column" className="max-w-xl">
          {/* H2 */}
          <Reveal delay={180}>
            <h2
              id="capability-heading"
              className="text-5xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl"
            >
              Learn to see
              <br />
              brilliantly.
            </h2>
          </Reveal>

          {/* Body */}
          <Reveal delay={320}>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/80 drop-shadow-md sm:text-base">
              From the first sketch to the final render, Nova turns raw intent into decisions your
              team can act on — quietly, precisely, at speed.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={420}>
            <div id="capability-cta-group" className="mt-8 flex flex-wrap items-center gap-3">
              <button
                id="run-demo-button"
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-black transition-colors duration-300 hover:bg-white/85 sm:text-sm"
              >
                <span>Run the demo</span>
                <ChevronRight size={14} />
              </button>
              <button
                id="free-consultation-button"
                type="button"
                className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-xs font-medium text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:text-sm"
              >
                Free consultation
              </button>
            </div>
          </Reveal>
        </div>

        {/* Right — Frosted Capability Panel */}
        <div
          id="capability-frosted-panel"
          className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 px-5 backdrop-blur-md divide-y divide-white/15 sm:px-6"
        >
          {capabilities.map((item, i) => (
            <Reveal key={item.index} delay={300 + i * 110}>
              <div
                id={`capability-item-${item.index}`}
                className="group flex gap-5 py-5 cursor-default transition-colors duration-300"
              >
                <span className="font-mono text-[11px] tracking-[0.15em] text-white/55 pt-0.5 select-none">
                  {item.index}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium text-white sm:text-lg">
                      {item.title}
                    </h3>
                    <ChevronRight
                      size={16}
                      className="text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white"
                    />
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                    {item.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
