'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
  Youtube,
  Instagram,
  Linkedin,
  X,
  ChevronUp,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/brandContent';
import { BrandLogo } from './BrandLogo';
import { FounderAvatars } from './Founders';

export function FloatingSocialDock() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal dock once user has scrolled past 180px
      if (window.scrollY > 180) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      id="floating-social-dock"
      className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-2.5 transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-6"
    >
      {/* Expanded Quick Social Bar */}
      {isExpanded && (
        <div className="flex flex-col items-end gap-2 rounded-2xl border border-white/20 bg-black/90 p-3 shadow-2xl backdrop-blur-2xl animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between w-full pb-1.5 mb-1 border-b border-white/10 px-1 gap-2">
            <span className="flex items-center gap-1.5">
              <BrandLogo size="xs" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-bold">
                Vintoria Network
              </span>
            </span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-zinc-400 hover:text-white transition"
              aria-label="Close social dock"
            >
              <X size={13} />
            </button>
          </div>

          {/* Founder Quick-Chat Row */}
          <a
            href={SOCIAL_LINKS.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-44 items-center gap-2.5 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-3 py-2 text-xs text-white transition hover:bg-emerald-500/25 group"
          >
            <FounderAvatars size="xs" />
            <span className="flex-1">
              <span className="block font-bold leading-tight">Abhishek & Pratik</span>
              <span className="block font-mono text-[9px] uppercase tracking-wider text-emerald-300 leading-tight">
                Chat with founders
              </span>
            </span>
            <ArrowUpRight size={13} className="text-emerald-300 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* YouTube Link */}
          <a
            href={SOCIAL_LINKS.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-44 items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white transition hover:border-red-500/50 hover:bg-red-500/10 group"
          >
            <div className="flex items-center gap-2">
              <Youtube size={15} className="text-red-400" />
              <span className="font-medium">YouTube</span>
            </div>
            <ArrowUpRight size={13} className="text-zinc-400 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Instagram Link */}
          <a
            href={SOCIAL_LINKS.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-44 items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white transition hover:border-pink-500/50 hover:bg-pink-500/10 group"
          >
            <div className="flex items-center gap-2">
              <Instagram size={15} className="text-pink-400" />
              <span className="font-medium">Instagram</span>
            </div>
            <ArrowUpRight size={13} className="text-zinc-400 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* X (Twitter) Link */}
          <a
            href={SOCIAL_LINKS.x.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-44 items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white transition hover:border-sky-400/50 hover:bg-sky-500/10 group"
          >
            <div className="flex items-center gap-2">
              <svg className="h-3.5 w-3.5 fill-current text-sky-400" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="font-medium">X / Twitter</span>
            </div>
            <ArrowUpRight size={13} className="text-zinc-400 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* LinkedIn Link */}
          <a
            href={SOCIAL_LINKS.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-44 items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white transition hover:border-blue-500/50 hover:bg-blue-500/10 group"
          >
            <div className="flex items-center gap-2">
              <Linkedin size={15} className="text-blue-400" />
              <span className="font-medium">LinkedIn</span>
            </div>
            <ArrowUpRight size={13} className="text-zinc-400 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      )}

      {/* Main Trigger Bar: Brand + Social Dock Toggle + WhatsApp Direct */}
      <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/85 p-1.5 shadow-2xl backdrop-blur-xl">
        {/* Brand logo shortcut (scrolls to top) */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="transition-transform hover:scale-105 active:scale-95"
          aria-label="Back to top — Vintoria"
          title="Back to top"
        >
          <BrandLogo size="sm" className="h-10 w-10 rounded-full" />
        </button>
        {/* Toggle other socials */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
            isExpanded
              ? 'border-white/40 bg-white/20 text-white'
              : 'border-white/10 bg-white/5 text-zinc-300 hover:bg-white/15 hover:text-white'
          }`}
          aria-label="Toggle all social channels"
          title="Explore YouTube, Instagram, X, LinkedIn"
        >
          {isExpanded ? <X size={16} /> : <Sparkles size={16} />}
        </button>

        {/* Primary Direct WhatsApp Button */}
        <a
          href={SOCIAL_LINKS.whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold text-black transition-all hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 active:scale-95"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-black"></span>
          </span>
          <MessageCircle size={15} className="shrink-0" />
          <span className="hidden sm:inline">WhatsApp Us</span>
          <span className="font-mono text-[11px] opacity-80 sm:hidden">Chat</span>
        </a>
      </div>
    </div>
  );
}
