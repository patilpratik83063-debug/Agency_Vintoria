'use client';

import React, { useState } from 'react';
import {
  Youtube,
  Instagram,
  Linkedin,
  MessageCircle,
  ExternalLink,
  Copy,
  Check,
  ArrowUpRight,
  Send,
  PhoneCall,
} from 'lucide-react';
import { Reveal } from './Reveal';
import { BrandLogo } from './BrandLogo';
import { FounderCard } from './Founders';
import { SOCIAL_LINKS } from '@/lib/brandContent';

export function SectionSocialChannels() {
  const [copied, setCopied] = useState(false);

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(SOCIAL_LINKS.whatsapp.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="channels" className="relative z-10 px-5 py-24 sm:px-8 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section Header with Scroll Reveal */}
        <div className="mb-14 text-center">
          <Reveal delay={100}>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-emerald-400 backdrop-blur-md">
              <BrandLogo size="xs" bordered={false} />
              <span>Official Studio Frequency · Direct Links</span>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              CONNECT ACROSS{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-white to-zinc-300 bg-clip-text text-transparent">
                EVERY CHANNEL.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={300}>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-300 sm:text-base leading-relaxed">
              Engage with Vintoria across our verified social channels, watch our engineering breakdowns, or message our founders directly on WhatsApp for expedited project scoping.
            </p>
          </Reveal>
        </div>

        {/* Featured WhatsApp Direct Banner (High Priority Channel) */}
        <Reveal delay={350} direction="scale">
          <div className="relative mb-8 overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-black/80 to-black p-6 sm:p-10 backdrop-blur-2xl shadow-2xl transition-all duration-300 hover:border-emerald-500/50">
            {/* Ambient emerald backlight */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl" />

            <div className="relative z-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/40 bg-emerald-500/20 text-emerald-300 shadow-lg shadow-emerald-500/10">
                  <MessageCircle size={32} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md border border-emerald-400/40 bg-emerald-500/20 px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                      Instant WhatsApp Channel
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Online &amp; Active</span>
                    </span>
                  </div>
                  <h3 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    Direct Founder Dispatch on WhatsApp
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-zinc-300 max-w-xl">
                    Skip formal queues. Chat directly with leadership at{' '}
                    <span className="font-mono font-bold text-white">{SOCIAL_LINKS.whatsapp.number}</span>{' '}
                    to discuss timelines, budget feasibility, or architecture scope.
                  </p>
                  <div className="mt-3 rounded-2xl border border-white/15 bg-black/50 p-3 w-fit backdrop-blur-md">
                    <FounderCard compact />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                <a
                  href={SOCIAL_LINKS.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 lg:flex-none items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3.5 text-xs sm:text-sm font-bold text-black transition-all duration-200 hover:bg-emerald-400 shadow-lg shadow-emerald-500/25 active:scale-95"
                >
                  <Send size={15} />
                  <span>Chat on WhatsApp →</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyNumber}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-3.5 text-xs sm:text-sm font-semibold text-white transition-all hover:bg-white/20 active:scale-95"
                  title="Copy Phone Number"
                >
                  {copied ? (
                    <>
                      <Check size={15} className="text-emerald-400" />
                      <span className="text-emerald-300">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={15} />
                      <span className="hidden sm:inline">Copy Number</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 4-Grid Social Media Showcase with Scroll Animation */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* 1. YouTube */}
          <Reveal delay={200} direction="up">
            <div className="group flex h-full flex-col justify-between rounded-2xl border border-white/20 bg-black/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-red-500/50 hover:bg-black/80 hover:shadow-xl hover:shadow-red-500/10">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/15 text-red-400 transition-transform duration-300 group-hover:scale-110">
                    <Youtube size={22} />
                  </div>
                  <span className="font-mono text-[11px] text-zinc-300">Video Content</span>
                </div>
                <h4 className="mt-4 text-lg font-bold text-white group-hover:text-red-300 transition-colors">
                  {SOCIAL_LINKS.youtube.name}
                </h4>
                <div className="font-mono text-xs text-red-400 font-semibold mt-0.5">
                  {SOCIAL_LINKS.youtube.handle}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-zinc-300">
                  {SOCIAL_LINKS.youtube.description}
                </p>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4">
                <a
                  href={SOCIAL_LINKS.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-between text-xs font-semibold text-white transition group-hover:text-red-300"
                >
                  <span>Subscribe &amp; Watch</span>
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* 2. Instagram */}
          <Reveal delay={300} direction="up">
            <div className="group flex h-full flex-col justify-between rounded-2xl border border-white/20 bg-black/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-pink-500/50 hover:bg-black/80 hover:shadow-xl hover:shadow-pink-500/10">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-pink-500/30 bg-pink-500/15 text-pink-400 transition-transform duration-300 group-hover:scale-110">
                    <Instagram size={22} />
                  </div>
                  <span className="font-mono text-[11px] text-zinc-300">Visual Feed</span>
                </div>
                <h4 className="mt-4 text-lg font-bold text-white group-hover:text-pink-300 transition-colors">
                  {SOCIAL_LINKS.instagram.name}
                </h4>
                <div className="font-mono text-xs text-pink-400 font-semibold mt-0.5">
                  {SOCIAL_LINKS.instagram.handle}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-zinc-300">
                  {SOCIAL_LINKS.instagram.description}
                </p>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4">
                <a
                  href={SOCIAL_LINKS.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-between text-xs font-semibold text-white transition group-hover:text-pink-300"
                >
                  <span>Follow on Instagram</span>
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* 3. X (Twitter) */}
          <Reveal delay={400} direction="up">
            <div className="group flex h-full flex-col justify-between rounded-2xl border border-white/20 bg-black/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-sky-400/50 hover:bg-black/80 hover:shadow-xl hover:shadow-sky-400/10">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-500/15 text-sky-400 transition-transform duration-300 group-hover:scale-110">
                    {/* SVG for X */}
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <span className="font-mono text-[11px] text-zinc-300">Live Drops</span>
                </div>
                <h4 className="mt-4 text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                  {SOCIAL_LINKS.x.name}
                </h4>
                <div className="font-mono text-xs text-sky-400 font-semibold mt-0.5">
                  {SOCIAL_LINKS.x.handle}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-zinc-300">
                  {SOCIAL_LINKS.x.description}
                </p>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4">
                <a
                  href={SOCIAL_LINKS.x.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-between text-xs font-semibold text-white transition group-hover:text-sky-300"
                >
                  <span>Follow @VintoriaAI</span>
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* 4. LinkedIn */}
          <Reveal delay={500} direction="up">
            <div className="group flex h-full flex-col justify-between rounded-2xl border border-white/20 bg-black/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/50 hover:bg-black/80 hover:shadow-xl hover:shadow-blue-500/10">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/15 text-blue-400 transition-transform duration-300 group-hover:scale-110">
                    <Linkedin size={22} />
                  </div>
                  <span className="font-mono text-[11px] text-zinc-300">Leadership</span>
                </div>
                <h4 className="mt-4 text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                  {SOCIAL_LINKS.linkedin.name}
                </h4>
                <div className="font-mono text-xs text-blue-400 font-semibold mt-0.5">
                  {SOCIAL_LINKS.linkedin.handle}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-zinc-300">
                  {SOCIAL_LINKS.linkedin.description}
                </p>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4">
                <a
                  href={SOCIAL_LINKS.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-between text-xs font-semibold text-white transition group-hover:text-blue-300"
                >
                  <span>Connect with Pratik</span>
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
