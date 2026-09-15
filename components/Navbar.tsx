'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Hexagon, Menu, X, ArrowUpRight, Sparkles, MessageCircle, Youtube, Instagram, Linkedin } from 'lucide-react';
import { Reveal } from './Reveal';
import { BrandLogo } from './BrandLogo';
import { FounderCard } from './Founders';
import { SOCIAL_LINKS } from '@/lib/brandContent';

interface NavbarProps {
  onOpenConsultation: () => void;
}

const navLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Capabilities', href: '/capabilities' },
  { name: 'Selected Work', href: '/work' },
  { name: 'AI Architecture', href: '/ai-automation' },
  { name: 'Project Estimator', href: '/estimator', highlight: true },
  { name: 'Methodology', href: '/process' },
  { name: 'Channels', href: '/contact#channels' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar({ onOpenConsultation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'border-b border-white/20 bg-black/90 backdrop-blur-2xl py-3.5 shadow-2xl'
          : 'border-b border-white/15 bg-black/60 backdrop-blur-xl py-4 sm:py-5'
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 sm:px-8 md:px-12">
        {/* Logo left */}
        <Reveal delay={0}>
          <div className="flex items-center gap-3">
            <Link
              id="brand-logo"
              href="/"
              className="group flex items-center gap-2.5 text-white transition-opacity hover:opacity-90"
              aria-label="Vintoria Agency Home"
            >
              <div className="relative flex h-9 w-9 items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <BrandLogo size="md" className="transition group-hover:border-white/60" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-mono drop-shadow-sm">
                vintoria<span className="text-white/70">.studio</span>
              </span>
            </Link>

            {/* Live Availability Pill */}
            <div className="hidden items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-mono text-emerald-300 backdrop-blur-md lg:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span>Accepting Q4/Q1 Briefs</span>
            </div>
          </div>
        </Reveal>

        {/* Center nav links (hidden below md) */}
        <nav
          id="center-nav-menu"
          className="hidden items-center gap-6 md:flex lg:gap-8"
          aria-label="Main navigation"
        >
          {navLinks.map((link, i) => (
            <Reveal key={link.name} delay={100 + i * 80}>
              <Link
                id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                href={link.href}
                className={`relative inline-flex items-center text-xs font-medium transition-colors duration-300 ${
                  link.highlight
                    ? 'text-white flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3 py-1 hover:bg-white/25 shadow-sm'
                    : 'text-white/90 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                }`}
              >
                {link.highlight && <Sparkles size={12} className="text-white" />}
                <span>{link.name}</span>
              </Link>
            </Reveal>
          ))}
        </nav>

        {/* Actions Right */}
        <div className="flex items-center gap-3">
          {/* Direct WhatsApp Button in Navbar */}
          <a
            href={SOCIAL_LINKS.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-500/25"
            title="Chat directly on WhatsApp: +91 8766033979"
          >
            <MessageCircle size={14} className="text-emerald-400" />
            <span>WhatsApp</span>
          </a>

          <Reveal delay={450}>
            <button
              id="nav-consultation-button"
              type="button"
              onClick={onOpenConsultation}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white px-4 py-2 text-xs font-semibold text-black transition-all duration-300 hover:bg-white/90 shadow-lg shadow-white/10 active:scale-95"
            >
              <span>Book Discovery</span>
              <ArrowUpRight size={14} />
            </button>
          </Reveal>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center rounded-lg border border-white/20 bg-white/10 p-2 text-white md:hidden"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="border-b border-white/20 bg-black/98 backdrop-blur-3xl px-6 py-6 md:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
              <BrandLogo size="sm" />
              <span className="font-mono text-sm font-bold tracking-tight text-white">
                VINTORIA<span className="text-emerald-400">®</span>
              </span>
              <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                Menu
              </span>
            </div>
            <div className="flex items-center gap-2 pb-2 text-[11px] font-mono text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              <span>Available for high-impact agency engagements</span>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-3">
              <FounderCard compact />
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between text-base font-semibold text-white hover:text-white/80 py-1.5 border-b border-white/10"
              >
                <span>{link.name}</span>
                <ArrowUpRight size={16} className="text-white/60" />
              </Link>
            ))}

            {/* Direct WhatsApp Callout in Mobile Drawer */}
            <a
              href={SOCIAL_LINKS.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/20 py-3 text-center text-sm font-bold text-emerald-300 hover:bg-emerald-500/30"
            >
              <MessageCircle size={16} />
              <span>WhatsApp Us ({SOCIAL_LINKS.whatsapp.number})</span>
            </a>

            {/* Social channels row in mobile menu */}
            <div className="mt-2 flex items-center justify-around border-t border-white/10 pt-3">
              <a href={SOCIAL_LINKS.youtube.url} target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-red-400 transition" aria-label="YouTube">
                <Youtube size={20} />
              </a>
              <a href={SOCIAL_LINKS.instagram.url} target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-pink-400 transition" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href={SOCIAL_LINKS.x.url} target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-sky-400 transition" aria-label="X">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href={SOCIAL_LINKS.linkedin.url} target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-blue-400 transition" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="mt-2 w-full rounded-full bg-white py-3 text-center text-sm font-semibold text-black hover:bg-white/90"
            >
              Book 15-Min Discovery Call
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
