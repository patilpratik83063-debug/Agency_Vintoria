'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Sparkles, MessageCircle, Youtube, Instagram, Linkedin } from 'lucide-react';
import { Reveal } from './Reveal';
import { BrandLogo } from './BrandLogo';
import { FounderCard } from './Founders';
import { Button } from './ui/Button';
import { SOCIAL_LINKS } from '@/lib/brandContent';
import { XIcon } from './icons/XIcon';
import { cn } from '@/lib/utils';

interface NavbarProps {
  onOpenConsultation: () => void;
}

/**
 * Primary IA: five destinations + the Estimator as its own highlight.
 * Secondary routes (AI Architecture, Channels) stay reachable via the
 * footer and the mobile drawer.
 */
const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Capabilities', href: '/capabilities' },
  { name: 'Work', href: '/work' },
  { name: 'Process', href: '/process' },
  { name: 'Contact', href: '/contact' },
];

const secondaryLinks = [
  { name: 'AI Architecture', href: '/ai-automation' },
  { name: 'Channels', href: '/contact#channels' },
];

export function Navbar({ onOpenConsultation }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // The drawer closes itself via each link's onClick; no route-sync effect needed.

  return (
    <header
      id="main-navbar"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full border-b backdrop-blur-2xl transition-[background-color,border-color,padding] duration-300 ease-smooth',
        isScrolled
          ? 'border-hairline-raised bg-overlay-strong py-3 shadow-glass-lg'
          : 'border-hairline bg-overlay py-4 sm:py-5'
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 sm:px-8 md:px-12">
        {/* Logo left */}
        <Reveal delay={0}>
          <div className="flex items-center gap-3">
            <Link
              id="brand-logo"
              href="/"
              className="group flex items-center gap-2.5 text-white"
              aria-label="Vintoria Agency Home"
            >
              <BrandLogo size="md" className="transition-transform duration-300 group-hover:scale-105" />
              <span className="text-xl font-bold tracking-tight text-white font-mono">
                Vintoria
              </span>
            </Link>

            {/* Live Availability Pill */}
            <div className="hidden items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-xs font-mono text-emerald-300 lg:flex">
              <span className="relative flex h-2 w-2" aria-hidden="true">
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
          className="hidden items-center gap-8 lg:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link, i) => {
            const active = pathname === link.href;
            return (
              <Reveal key={link.name} delay={100 + i * 80}>
                <Link
                  id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative inline-flex items-center text-sm font-medium transition-colors duration-300',
                    active ? 'text-white' : 'text-white/70 hover:text-white'
                  )}
                >
                  {link.name}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute -bottom-1.5 left-0 h-px w-full bg-white origin-left transition-transform duration-300 ease-smooth',
                      active ? 'scale-x-100' : 'scale-x-0'
                    )}
                  />
                </Link>
              </Reveal>
            );
          })}
          <Reveal delay={100 + navLinks.length * 80}>
            <Link
              href="/estimator"
              aria-current={pathname === '/estimator' ? 'page' : undefined}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors duration-300',
                pathname === '/estimator'
                  ? 'border-white/60 bg-white text-black'
                  : 'border-hairline-raised bg-white/10 text-white hover:bg-white/20'
              )}
            >
              <Sparkles size={13} aria-hidden="true" />
              <span>Estimator</span>
            </Link>
          </Reveal>
        </nav>

        {/* Actions Right */}
        <div className="flex items-center gap-3">
          {/* Direct WhatsApp Button in Navbar */}
          <a
            href={SOCIAL_LINKS.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 transition-colors duration-300 hover:bg-emerald-400/20 hover:text-white"
            title={`Chat directly on WhatsApp: ${SOCIAL_LINKS.whatsapp.number}`}
          >
            <MessageCircle size={14} aria-hidden="true" />
            <span>WhatsApp</span>
          </a>

          <Reveal delay={450}>
            <Button
              id="nav-consultation-button"
              type="button"
              size="sm"
              onClick={onOpenConsultation}
              className="hidden sm:inline-flex"
            >
              <span>Book Discovery</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </Button>
          </Reveal>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center rounded-lg border border-hairline-raised bg-overlay p-2 text-white lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="border-b border-hairline-raised bg-overlay-strong backdrop-blur-3xl px-6 py-6 max-h-[calc(100dvh-5rem)] overflow-y-auto lg:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5 border-b border-hairline pb-3">
              <BrandLogo size="sm" />
              <span className="font-mono text-sm font-bold tracking-tight text-white">
                VINTORIA<span className="text-emerald-400">&reg;</span>
              </span>
              <span className="ml-auto font-mono text-xs uppercase tracking-wider text-zinc-500">
                Menu
              </span>
            </div>
            <div className="flex items-center gap-2 pb-2 text-xs font-mono text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true"></span>
              <span>Available for high-impact agency engagements</span>
            </div>
            <div className="rounded-2xl border border-hairline bg-overlay-soft p-3">
              <FounderCard compact />
            </div>
            {[...navLinks, { name: 'Project Estimator', href: '/estimator' }, ...secondaryLinks].map(
              (link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between text-base font-semibold text-white hover:text-white/80 py-1.5 border-b border-hairline"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight size={16} className="text-white/60" aria-hidden="true" />
                </Link>
              )
            )}

            {/* Direct WhatsApp Callout in Mobile Drawer */}
            <a
              href={SOCIAL_LINKS.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/15 py-3 text-center text-sm font-bold text-emerald-300 hover:bg-emerald-400/25"
            >
              <MessageCircle size={16} aria-hidden="true" />
              <span>WhatsApp Us ({SOCIAL_LINKS.whatsapp.number})</span>
            </a>

            {/* Social channels row in mobile menu */}
            <div className="mt-2 flex items-center justify-around border-t border-hairline pt-3">
              <a href={SOCIAL_LINKS.youtube.url} target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-red-400 transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
              <a href={SOCIAL_LINKS.instagram.url} target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-pink-400 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href={SOCIAL_LINKS.x.url} target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-sky-400 transition-colors" aria-label="X">
                <XIcon className="h-5 w-5" />
              </a>
              <a href={SOCIAL_LINKS.linkedin.url} target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>

            <Button
              size="lg"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="mt-2 w-full"
            >
              Book 15-Min Discovery Call
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
