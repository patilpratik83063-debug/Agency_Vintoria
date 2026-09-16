'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Mail, Youtube, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/brandContent';
import { BrandLockup, BrandLogo } from './BrandLogo';
import { FounderCard } from './Founders';
import { XIcon } from './icons/XIcon';

export function Footer() {
  const [times, setTimes] = useState({
    sf: '',
    zurich: '',
    tokyo: '',
  });

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setTimes({
        sf: now.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        zurich: now.toLocaleTimeString('en-US', { timeZone: 'Europe/Zurich', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        tokyo: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      });
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer id="agency-footer" className="relative z-10 border-t border-hairline-raised bg-overlay-strong px-5 pt-16 pb-12 sm:px-8 md:px-12 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand Col */}
          <div className="md:col-span-5">
            <BrandLockup size="md" />
            <p className="mt-4 max-w-sm text-sm sm:text-base text-zinc-300 leading-relaxed">
              Vintoria is a digital product studio combining strategy, design, engineering, AI, automation and growth to build digital products and technology systems for ambitious businesses.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              <span>EST. 2020 &middot; Abhishek Kogle &amp; Pratik Patil</span>
            </div>

            <div className="mt-5 rounded-2xl border border-hairline-raised bg-overlay-soft p-4 backdrop-blur-xl">
              <FounderCard compact />
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-2 gap-6 md:col-span-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-400 block mb-3 font-semibold">
                Studio
              </span>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li><Link href="/about" className="text-white font-medium hover:text-emerald-400 transition-colors flex items-center gap-1">About &amp; Story <ArrowUpRight size={12} /></Link></li>
                <li><Link href="/about#founders" className="text-white font-medium hover:text-emerald-400 transition-colors flex items-center gap-1">Founders <ArrowUpRight size={12} /></Link></li>
                <li><Link href="/about#philosophy" className="hover:text-white transition-colors">Philosophy</Link></li>
                <li><Link href="/about#how-we-think" className="hover:text-white transition-colors">How We Think</Link></li>
                <li><Link href="/process" className="hover:text-white transition-colors">6-Phase Process</Link></li>
                <li><Link href="/work" className="hover:text-white transition-colors">Selected Works</Link></li>
                <li><Link href="/ai-automation" className="hover:text-white transition-colors">Tech Stack</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Start a Project</Link></li>
              </ul>
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-400 block mb-3 font-semibold">
                Core Disciplines
              </span>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li><Link href="/capabilities" className="hover:text-white transition-colors">01 Strategy &amp; Consulting</Link></li>
                <li><Link href="/capabilities" className="hover:text-white transition-colors">02 Web Development</Link></li>
                <li><Link href="/capabilities" className="hover:text-white transition-colors">03 SaaS Products</Link></li>
                <li><Link href="/capabilities" className="hover:text-white transition-colors">04 Mobile Development</Link></li>
                <li><Link href="/capabilities" className="hover:text-white transition-colors">05 UI/UX Design</Link></li>
                <li><Link href="/capabilities" className="hover:text-white transition-colors">07 AI Development</Link></li>
                <li><Link href="/capabilities" className="hover:text-white transition-colors">08 Automation</Link></li>
                <li><Link href="/capabilities" className="hover:text-white transition-colors">View All 12 Pillars &rarr;</Link></li>
              </ul>
            </div>
          </div>

          {/* Studio Clocks */}
          <div className="md:col-span-3">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-400 block mb-3 font-semibold">
              Where We Work
            </span>
            <div className="space-y-2 rounded-xl border border-hairline-raised bg-overlay-soft p-4 font-mono text-sm backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">San Francisco</span>
                <span className="text-white font-semibold">{times.sf || '--:--:--'}</span>
              </div>
              <div className="flex items-center justify-between border-t border-hairline pt-2">
                <span className="text-zinc-400">Zurich</span>
                <span className="text-white font-semibold">{times.zurich || '--:--:--'}</span>
              </div>
              <div className="flex items-center justify-between border-t border-hairline pt-2">
                <span className="text-zinc-400">Tokyo</span>
                <span className="text-white font-semibold">{times.tokyo || '--:--:--'}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-zinc-300">
              <Mail size={15} className="text-emerald-400 shrink-0" />
              <a href="mailto:studio@vintoria.engineering" className="font-mono text-white hover:text-emerald-300 transition-colors">studio@vintoria.engineering</a>
            </div>
          </div>
        </div>

        {/* Social Links & WhatsApp Direct Connect Strip */}
        <div className="mt-12 rounded-2xl border border-hairline-raised bg-overlay p-5 backdrop-blur-xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2.5">
              <BrandLogo size="sm" />
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-400 block mb-1 font-semibold">
                  Official Studio Channels
                </span>
                <p className="text-sm text-zinc-300">
                  Follow our engineering drops, video breakdowns and reach leadership directly.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* YouTube */}
              <a
                href={SOCIAL_LINKS.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-hairline-raised bg-white/5 px-3 py-1.5 text-sm text-zinc-200 transition-colors duration-300 hover:border-red-500/50 hover:bg-red-500/10 hover:text-white"
                aria-label="YouTube Channel"
              >
                <Youtube size={14} className="text-red-400" />
                <span>YouTube</span>
              </a>

              {/* Instagram */}
              <a
                href={SOCIAL_LINKS.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-hairline-raised bg-white/5 px-3 py-1.5 text-sm text-zinc-200 transition-colors duration-300 hover:border-pink-500/50 hover:bg-pink-500/10 hover:text-white"
                aria-label="Instagram Profile"
              >
                <Instagram size={14} className="text-pink-400" />
                <span>Instagram</span>
              </a>

              {/* X (Twitter) */}
              <a
                href={SOCIAL_LINKS.x.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-hairline-raised bg-white/5 px-3 py-1.5 text-sm text-zinc-200 transition-colors duration-300 hover:border-sky-400/50 hover:bg-sky-500/10 hover:text-white"
                aria-label="X Profile"
              >
                <XIcon className="h-3.5 w-3.5 text-sky-400" />
                <span>X / Twitter</span>
              </a>

              {/* LinkedIn */}
              <a
                href={SOCIAL_LINKS.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-hairline-raised bg-white/5 px-3 py-1.5 text-sm text-zinc-200 transition-colors duration-300 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-white"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={14} className="text-blue-400" />
                <span>LinkedIn</span>
              </a>

              {/* WhatsApp */}
              <a
                href={SOCIAL_LINKS.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/15 px-3.5 py-1.5 text-sm font-semibold text-emerald-300 transition-colors duration-300 hover:bg-emerald-400/25 hover:text-white"
                aria-label="WhatsApp Direct"
              >
                <MessageCircle size={14} className="text-emerald-400" />
                <span>WhatsApp: {SOCIAL_LINKS.whatsapp.number}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & tagline */}
        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-hairline-raised pt-8 sm:flex-row sm:items-center text-sm text-zinc-400">
          <div>
            &copy; {new Date().getFullYear()} VINTORIA&reg;. All rights reserved. &middot; Digital products, engineered for growth.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/legal#privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span aria-hidden="true">&middot;</span>
            <Link href="/legal#nda" className="hover:text-white transition-colors">Security NDA</Link>
            <span aria-hidden="true">&middot;</span>
            <Link href="/legal#terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
