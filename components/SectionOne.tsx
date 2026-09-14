'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Reveal } from './Reveal';

const services = [
  '/ AI AUTOMATION',
  '/ AI INTEGRATION',
  '/ AI AGENT DEVELOPMENT',
];

const PORTRAIT_URL =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260728_050334_5b076e26-0ce7-4898-b432-d764190e448f.png&w=1280&q=85';

export function SectionOne() {
  return (
    <section
      id="hero-section"
      className="relative flex min-h-screen supports-[height:100svh]:min-h-[100svh] flex-col justify-between px-5 pt-24 pb-12 sm:px-8 sm:pt-28 md:px-12 md:pb-16"
    >
      {/* Top Row: Service List (Left) + Intro (Right) */}
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        {/* Left — Service List */}
        <div id="hero-service-list" className="flex flex-col gap-2">
          {services.map((service, i) => (
            <Reveal key={service} delay={150 + i * 120}>
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/90 drop-shadow-md">
                {service}
              </span>
            </Reveal>
          ))}
        </div>

        {/* Right — Intro */}
        <div id="hero-intro-text" className="max-w-xs sm:text-right">
          <Reveal delay={300}>
            <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
              We design automation that brings clarity, precision, and efficiency to the way your
              company operates.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Bottom Row: Badge + H1 (Left) + Glass Contact Card (Right) */}
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        {/* Left Column */}
        <div id="hero-headline-block" className="max-w-2xl">
          {/* Badge */}
          <Reveal delay={150}>
            <div
              id="hero-business-badge"
              className="mb-5 inline-flex items-center border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md"
            >
              We Automate 100+ Businesses
            </div>
          </Reveal>

          {/* H1 */}
          <Reveal delay={280}>
            <h1
              id="hero-heading"
              className="text-5xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl"
            >
              Clear. Precise.
              <br />
              Automated.
            </h1>
          </Reveal>
        </div>

        {/* Right — Glass Contact Card */}
        <Reveal delay={420} className="self-start md:self-end">
          <div
            id="contact-mitha-card"
            className="flex items-center gap-4 rounded-xl border border-white/15 bg-white/15 p-3 backdrop-blur-md transition-transform duration-300 hover:border-white/25"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PORTRAIT_URL}
              alt="Mitha, co-founder of NovaAI"
              className="h-24 w-20 rounded-lg object-cover"
              loading="eager"
            />
            <div className="flex flex-col gap-1.5 pr-2">
              <span className="text-sm font-medium text-white">Talk with Mitha</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">
                Co-founder of NovaAI
              </span>
              <button
                id="book-call-button"
                type="button"
                className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-medium text-black transition-colors duration-300 hover:bg-white/85"
              >
                <span>Book 15-mins call</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
