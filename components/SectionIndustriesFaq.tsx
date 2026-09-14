'use client';

import React, { useState } from 'react';
import { Building2, HelpCircle, ChevronDown, Sparkles, ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { BrandLogo } from './BrandLogo';
import { FounderAvatars } from './Founders';
import { BRAND } from '@/lib/brandContent';

interface SectionIndustriesFaqProps {
  onOpenConsultation: (brief?: string) => void;
}

export function SectionIndustriesFaq({ onOpenConsultation }: SectionIndustriesFaqProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section id="industries-faq" className="relative z-10 px-5 py-24 sm:px-8 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* 21. Industries Section */}
        <div>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-black/60 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white backdrop-blur-xl shadow-md">
                <BrandLogo size="xs" bordered={false} />
                <Building2 size={13} className="text-emerald-400" />
                <span>Cross-Sector Architecture · 15 Key Verticals</span>
              </div>

              <h2 className="mt-4 text-4xl font-normal tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-md">
                BUILT ACROSS
                <br />
                <span className="font-semibold bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                  INDUSTRIES.
                </span>
              </h2>
            </div>

            <p className="max-w-md text-sm sm:text-base leading-relaxed text-zinc-200 md:text-right font-normal">
              Different industries have different problems. Our approach remains the same: understand the system, identify the opportunity and build the right digital solution.
            </p>
          </div>

          {/* 15 Industry Badges */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {BRAND.industries.map((ind, i) => (
              <Reveal key={ind} delay={50 + i * 30}>
                <button
                  type="button"
                  onClick={() => onOpenConsultation(`Inquiry for ${ind} platform architecture`)}
                  className="group flex w-full items-center justify-between rounded-2xl border border-white/15 bg-black/55 p-4 text-left backdrop-blur-xl transition-all duration-300 hover:border-emerald-400/50 hover:bg-white/15 hover:-translate-y-0.5 shadow-md"
                >
                  <span className="text-xs font-bold text-white group-hover:text-emerald-300">
                    {ind}
                  </span>
                  <ArrowRight
                    size={13}
                    className="text-white/40 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all"
                  />
                </button>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 24. FAQ Section */}
        <div id="faq" className="mt-24 pt-16 border-t border-white/15">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left Column: FAQ Header */}
            <div className="lg:col-span-5">
              <Reveal delay={100}>
                <div className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-black/60 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white backdrop-blur-xl shadow-md">
                  <BrandLogo size="xs" bordered={false} />
                  <HelpCircle size={13} className="text-emerald-400" />
                  <span>Frequently Answered Inquiries</span>
                </div>

                <h3 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  EVERY QUESTION
                  <br />
                  <span className="font-semibold text-white/80">ANSWERED CLEARLY.</span>
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-zinc-200 font-normal">
                  Transparent perspectives on our engagement models, technical stack, AI integrations, and ongoing engineering support.
                </p>

                <div className="mt-6 rounded-2xl border border-white/15 bg-black/55 p-5 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <FounderAvatars size="sm" />
                    <div className="text-xs font-semibold text-white">Have a custom question?</div>
                  </div>
                  <p className="mt-2 text-xs text-zinc-300">
                    Our principal founders Abhishek Kogle &amp; Pratik Patil personally review project inquiries.
                  </p>
                  <button
                    onClick={() => onOpenConsultation('Direct inquiry for Founders')}
                    className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs font-bold text-emerald-400 hover:text-emerald-300"
                  >
                    <span>Connect with Founders →</span>
                  </button>
                </div>
              </Reveal>
            </div>

            {/* Right Column: FAQ Accordion */}
            <div className="lg:col-span-7 space-y-3">
              {BRAND.faq.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <Reveal key={item.q} delay={100 + idx * 50}>
                    <div
                      className={`overflow-hidden rounded-2xl border transition-all duration-300 shadow-md ${
                        isOpen
                          ? 'border-white/40 bg-black/75 backdrop-blur-2xl'
                          : 'border-white/15 bg-black/50 backdrop-blur-xl hover:border-white/30'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="flex w-full items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-white transition-colors"
                      >
                        <span className="pr-4">{item.q}</span>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-emerald-400 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed text-zinc-200 border-t border-white/10 animate-in fade-in duration-200">
                          {item.a}
                        </div>
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
