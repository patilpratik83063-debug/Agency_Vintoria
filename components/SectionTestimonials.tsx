'use client';

import React from 'react';
import { Reveal } from './Reveal';
import { Badge } from './ui/Badge';
import { GlassCard } from './ui/GlassCard';
import { Button } from './ui/Button';
import { ArrowUpRight } from 'lucide-react';

/**
 * Studio commitments, stated by the founders. Replaces a fabricated
 * testimonial wall — real client endorsements get added here as soon
 * as we have permission to publish them.
 */
const commitments = [
  {
    statement:
      'You get one senior team that owns the outcome end to end — no vendor hand-offs, no juniors disguised behind a founder logo. The people who scope your build are the people who ship it.',
    author: 'Abhishek Kogle',
    role: 'Founder · Engineering & Architecture',
  },
  {
    statement:
      'Every system we deliver is measured against a business metric before a line of code is written. If we cannot name how it gets used and how it gets paid for, we are not ready to build it.',
    author: 'Pratik Patil',
    role: 'Co-Founder · Product & Growth',
  },
  {
    statement:
      'Transparency is part of the craft: weekly demos, staging links from day one, and a written spec you keep whether we build together or not. No black-box sprints, no surprise invoices.',
    author: 'The Vintoria Studio',
    role: 'How we work with every client',
  },
];

export function SectionTestimonials() {
  return (
    <section id="testimonials" className="relative z-10 px-5 py-24 sm:px-8 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto">
          <Badge className="mx-auto">Studio Commitments</Badge>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl leading-[1.1]">
            The promises we make
            <br />
            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              before the first sprint.
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-300">
            Client-branded case studies and references are walkable live on a discovery call —
            most of our work sits under NDA until our partners go public.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {commitments.map((c, idx) => (
            <Reveal key={c.author} delay={150 + idx * 100}>
              <GlassCard surface="standard" interactive="hover" className="flex h-full flex-col justify-between p-6 sm:p-7">
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-300">
                    {String(idx + 1).padStart(2, '0')} / {c.role.split('·')[0].trim().toUpperCase()}
                  </span>
                  <p className="mt-5 text-sm sm:text-base leading-relaxed text-zinc-100 font-serif">
                    &ldquo;{c.statement}&rdquo;
                  </p>
                </div>

                <div className="mt-6 border-t border-hairline pt-4">
                  <div className="text-sm font-bold text-white">{c.author}</div>
                  <div className="text-xs text-zinc-300 font-medium">{c.role}</div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/contact" variant="secondary" size="md">
            <span>Talk to a founder directly</span>
            <ArrowUpRight size={14} />
          </Button>
        </div>
      </div>
    </section>
  );
}
