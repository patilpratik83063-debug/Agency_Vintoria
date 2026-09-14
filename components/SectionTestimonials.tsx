'use client';

import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { Reveal } from './Reveal';
import { BrandLogo } from './BrandLogo';

const testimonials = [
  {
    quote:
      'Vintoria engineered our multi-agent underwriting platform in 7 weeks flat. The system has processed over 4 million events with sub-40ms latency and zero memory leaks. They operate like an elite in-house staff squad.',
    author: 'Marcus Lin',
    role: 'Chief Technology Officer',
    company: 'Aetheron Capital (Zurich)',
    metric: '8.4x Underwriting Speedup',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    quote:
      'The 3D interactive hardware configurator Vintoria built achieved a flawless 60fps on mobile Safari without burning phone battery. Our conversion rate increased by 312% in the first quarter post-launch.',
    author: 'Kenji Takahashi',
    role: 'Founder & Chief Designer',
    company: 'Kroma Spatial (Tokyo)',
    metric: '+312% Conversion Surge',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    quote:
      'Finding an engineering partner that deeply understands both clinical compliance (HIPAA/SOC2) and cutting-edge Next.js 15 motion is almost impossible. Vintoria delivered our flagship on time and passed enterprise audits on the first pass.',
    author: 'Dr. Samantha Thorne',
    role: 'VP of Digital Medicine',
    company: 'Lumina Health Care',
    metric: 'SOC2 Type II Cleared',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  },
];

export function SectionTestimonials() {
  return (
    <section id="testimonials" className="relative z-10 px-5 py-24 sm:px-8 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-white/30 bg-black/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-white rounded-full backdrop-blur-xl shadow-md">
            <BrandLogo size="xs" bordered={false} />
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span>Client Endorsements & Peer Reviews</span>
          </div>
          <h2 className="mt-4 text-3xl font-normal tracking-tight text-white sm:text-4xl lg:text-5xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Trusted by the founders
            <br />
            <span className="font-semibold text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
              redefining their industries.
            </span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <Reveal key={t.author} delay={150 + idx * 100}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-white/20 bg-black/55 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:bg-black/65 shadow-2xl sm:p-7">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-amber-400" />
                      ))}
                    </div>
                    <span className="font-mono text-[10px] text-emerald-400 border border-emerald-400/40 bg-emerald-500/15 px-2 py-0.5 rounded-full font-bold">
                      {t.metric}
                    </span>
                  </div>

                  <p className="mt-5 text-xs sm:text-sm leading-relaxed text-zinc-100 font-normal">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3 border-t border-white/15 pt-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="h-10 w-10 rounded-full object-cover border border-white/30"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">{t.author}</div>
                    <div className="text-[11px] text-zinc-300 font-medium">{t.role}</div>
                    <div className="font-mono text-[10px] text-zinc-400">{t.company}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
