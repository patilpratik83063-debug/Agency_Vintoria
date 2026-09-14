'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Sparkles,
  Mail,
  ShieldCheck,
  Youtube,
  Instagram,
  Linkedin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/brandContent';
import { BrandLockup, BrandLogo } from './BrandLogo';
import { FounderCard } from './Founders';

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
    <footer id="agency-footer" className="relative z-10 border-t border-white/15 bg-black/85 px-5 pt-16 pb-12 sm:px-8 md:px-12 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand Col */}
          <div className="md:col-span-5">
            <BrandLockup size="md" />
            <p className="mt-4 max-w-sm text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Vintoria is a digital product studio combining strategy, design, engineering, AI, automation and growth to build digital products and technology systems for ambitious businesses.
            </p>

            <div className="mt-6 flex items-center gap-2 text-[11px] font-mono text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>EST. 2020 · Abhishek Kogle &amp; Pratik Patil</span>
            </div>

            <div className="mt-5 rounded-2xl border border-white/15 bg-black/60 p-4 backdrop-blur-md">
              <FounderCard compact />
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-2 gap-6 md:col-span-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-400 block mb-3 font-semibold">
                Studio
              </span>
              <ul className="space-y-2 text-xs text-zinc-300">
                <li><Link href="/about" className="text-white font-medium hover:text-emerald-400 transition flex items-center gap-1">About &amp; Story <ArrowUpRight size={11} /></Link></li>
                <li><Link href="/about#founders" className="text-white font-medium hover:text-emerald-400 transition flex items-center gap-1">Founders <ArrowUpRight size={11} /></Link></li>
                <li><Link href="/about#philosophy" className="hover:text-white transition">Philosophy</Link></li>
                <li><Link href="/about#how-we-think" className="hover:text-white transition">How We Think</Link></li>
                <li><Link href="/#process" className="hover:text-white transition">6-Phase Process</Link></li>
                <li><Link href="/#projects" className="hover:text-white transition">Selected Works</Link></li>
                <li><Link href="/#technology" className="hover:text-white transition">Tech Stack</Link></li>
                <li><Link href="/#contact" className="hover:text-white transition">Start a Project</Link></li>
              </ul>
            </div>

            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-400 block mb-3 font-semibold">
                Core Disciplines
              </span>
              <ul className="space-y-2 text-xs text-zinc-300">
                <li><Link href="/#capabilities" className="hover:text-white transition">01 Strategy &amp; Consulting</Link></li>
                <li><Link href="/#capabilities" className="hover:text-white transition">02 Web Development</Link></li>
                <li><Link href="/#capabilities" className="hover:text-white transition">03 SaaS Products</Link></li>
                <li><Link href="/#capabilities" className="hover:text-white transition">04 Mobile Development</Link></li>
                <li><Link href="/#capabilities" className="hover:text-white transition">05 UI/UX Design</Link></li>
                <li><Link href="/#capabilities" className="hover:text-white transition">07 AI Development</Link></li>
                <li><Link href="/#capabilities" className="hover:text-white transition">08 Automation</Link></li>
                <li><Link href="/#capabilities" className="hover:text-white transition">View All 12 Pillars →</Link></li>
              </ul>
            </div>
          </div>

          {/* Synchronized Clocks */}
          <div className="md:col-span-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-400 block mb-3 font-semibold">
              Global Nodes &amp; Studio Clocks
            </span>
            <div className="space-y-2 rounded-xl border border-white/20 bg-black/60 p-4 font-mono text-xs backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">San Francisco</span>
                <span className="text-white font-semibold">{times.sf || '14:28:00'}</span>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-2">
                <span className="text-zinc-400">Zurich</span>
                <span className="text-white font-semibold">{times.zurich || '23:28:00'}</span>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-2">
                <span className="text-zinc-400">Tokyo</span>
                <span className="text-white font-semibold">{times.tokyo || '06:28:00'}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-zinc-300">
              <Mail size={14} className="text-emerald-400 shrink-0" />
              <span className="font-mono text-white">studio@vintoria.engineering</span>
            </div>
          </div>
        </div>

        {/* Social Links & WhatsApp Direct Connect Strip */}
        <div className="mt-12 rounded-2xl border border-white/20 bg-black/60 p-5 backdrop-blur-xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2.5">
              <BrandLogo size="sm" />
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-400 block mb-1 font-semibold">
                  Official Studio Channels
                </span>
              <p className="text-xs text-zinc-300">
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
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-zinc-200 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-white"
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
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-zinc-200 transition hover:border-pink-500/50 hover:bg-pink-500/10 hover:text-white"
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
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-zinc-200 transition hover:border-sky-400/50 hover:bg-sky-500/10 hover:text-white"
                aria-label="X Profile"
              >
                <svg className="h-3 w-3 fill-current text-sky-400" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>X / Twitter</span>
              </a>

              {/* LinkedIn */}
              <a
                href={SOCIAL_LINKS.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-zinc-200 transition hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-white"
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
                className="flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-500/30 hover:text-white"
                aria-label="WhatsApp Direct"
              >
                <MessageCircle size={14} className="text-emerald-400" />
                <span>WhatsApp: {SOCIAL_LINKS.whatsapp.number}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & tagline */}
        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/15 pt-8 sm:flex-row sm:items-center text-xs text-zinc-400">
          <div>
            &copy; {new Date().getFullYear()} VINTORIA®. All rights reserved. · Digital products, engineered for growth.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer transition">Privacy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition">Security NDA</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
