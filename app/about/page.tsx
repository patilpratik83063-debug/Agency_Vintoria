'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Code2,
  Cpu,
  Layers,
  Terminal,
  Linkedin,
  Twitter,
  Calendar,
  CheckCircle2,
  Award,
  Compass,
  TrendingUp,
  Bot,
  Lightbulb,
  Workflow,
  HelpCircle,
  MessageCircle,
  Youtube,
  Instagram,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ConsultationModal } from '@/components/ConsultationModal';
import { CursorGlow } from '@/components/CursorGlow';
import { Reveal } from '@/components/Reveal';
import { BrandLogo } from '@/components/BrandLogo';
import { FounderAvatars } from '@/components/Founders';
import { BRAND, SOCIAL_LINKS } from '@/lib/brandContent';
import { SectionSocialChannels } from '@/components/SectionSocialChannels';
import { FloatingSocialDock } from '@/components/FloatingSocialDock';

interface FounderProfile {
  id: string;
  name: string;
  role: string;
  tagline: string;
  image: string;
  thumb: string;
  bio: string;
  quote: string;
  focusAreas: string[];
  techDisciplines: string[];
  socials: {
    linkedin: string;
    twitter: string;
    whatsapp: string;
  };
}

const founders: FounderProfile[] = [
  {
    id: 'abhishek-kogle',
    name: 'Abhishek Kogle',
    role: 'Founder',
    tagline: 'Product Direction, Technology Vision & Digital Experience Strategy',
    image: '/founder.png',
    thumb: '/founder-thumb.jpg',
    bio: 'Abhishek Kogle founded Vintoria in 2020 with the ambition of building a technology studio focused on creating meaningful digital products rather than simply delivering development projects. His role centers on the broader direction of Vintoria — shaping its product philosophy, technology vision and approach to building digital experiences.',
    quote:
      '“Strategy without execution is just talk. Design without engineering is just decoration. Engineering without strategy is just code. Vintoria exists to connect these layers — helping ambitious businesses design, build and scale digital products that actually make an impact.”',
    focusAreas: [
      'Studio Direction & Product Philosophy',
      'Technology Stack Evaluation & Feasibility',
      'Enterprise Architecture & Scalability',
      'High-Impact Digital Growth Systems',
    ],
    techDisciplines: ['Product Strategy', 'Full-Stack Architecture', 'AI & Automation Systems', 'Next.js', 'Cloud Run'],
    socials: {
      linkedin: 'https://www.linkedin.com/in/pratik-kshirsagar-9a344739b/',
      twitter: 'https://x.com/VintoriaAI',
      whatsapp: 'https://wa.me/918766033979?text=Hi%20Abhishek,%20I%20would%20like%20to%20discuss%20a%20project%20at%20Vintoria',
    },
  },
  {
    id: 'pratik-patil',
    name: 'Pratik Patil (Kshirsagar)',
    role: 'Co-Founder',
    tagline: 'Technical Solutions Architecture & Multidisciplinary Operations',
    image: '/co-founder.png',
    thumb: '/co-founder-thumb.jpg',
    bio: "Pratik Patil is Co-Founder of Vintoria, contributing to the company's direction and its approach to building digital products and technology solutions. Together with Abhishek, he helps shape Vintoria's evolution as a multidisciplinary digital product studio.",
    quote:
      '“Software shouldn’t add complexity simply because complexity is possible. It should make something faster, clearer, more useful, more scalable or more valuable. That’s the standard we bring to every Vintoria project.”',
    focusAreas: [
      'Digital Product & Technology Solutions',
      'Multidisciplinary Studio Operations',
      'Client Implementation & Systems Quality',
      'AI Automation Workflows & Scalable Infrastructure',
    ],
    techDisciplines: ['Solutions Architecture', 'Systems Engineering', 'Distributed Workflows', 'TypeScript', 'PostgreSQL'],
    socials: {
      linkedin: 'https://www.linkedin.com/in/pratik-kshirsagar-9a344739b/',
      twitter: 'https://x.com/VintoriaAI',
      whatsapp: 'https://wa.me/918766033979?text=Hi%20Pratik,%20I%20would%20like%20to%20discuss%20a%20project%20at%20Vintoria',
    },
  },
];

export default function AboutPage() {
  const [selectedFounder, setSelectedFounder] = useState<string>(founders[0].id);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationBrief, setConsultationBrief] = useState('');

  const currentFounder = founders.find((f) => f.id === selectedFounder) || founders[0];

  const handleOpenConsultation = (brief: string = '') => {
    setConsultationBrief(brief);
    setIsConsultationOpen(true);
  };

  return (
    <div id="about-page-root" className="relative min-h-screen w-full bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
      {/* Ambient Cursor Glow */}
      <CursorGlow />

      {/* Atmospheric Background Scrim & Subtle Grid */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.12),rgba(255,255,255,0))]" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-15 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px]" />

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Navigation */}
        <Navbar onOpenConsultation={() => handleOpenConsultation('Direct inquiry for Founders (Abhishek & Pratik)')} />

        <main id="about-main-content" className="flex-1 px-5 pt-32 pb-24 sm:px-8 sm:pt-36 md:px-12">
          <div className="mx-auto max-w-7xl">
            {/* Top Breadcrumb & Logo */}
            <Reveal delay={0}>
              <div className="mb-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-xl transition hover:border-white/40 hover:text-white"
                >
                  <ArrowLeft size={14} />
                  <span>Back to Main Studio</span>
                </Link>
                <span className="text-white/40">•</span>
                <div className="flex items-center gap-2 text-xs font-mono text-white/90">
                  <BrandLogo size="xs" bordered={false} />
                  <span>VINTORIA® — DIGITAL PRODUCT STUDIO · EST. 2020</span>
                </div>
              </div>
            </Reveal>

            {/* 11. About Us Headline & Story */}
            <div className="border-b border-white/15 pb-14">
              <Reveal delay={100}>
                <div className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-400 backdrop-blur-md">
                  <Sparkles size={12} />
                  <span>About Vintoria · Our Origin &amp; Purpose</span>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <h1 className="mt-5 text-3xl font-normal tracking-tight text-white drop-shadow-md sm:text-5xl lg:text-6xl leading-[1.08]">
                  WE BELIEVE THE BEST DIGITAL PRODUCTS ARE BUILT AT THE INTERSECTION OF{' '}
                  <span className="font-semibold bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                    STRATEGY, DESIGN AND ENGINEERING.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={300}>
                <div className="mt-8 max-w-4xl space-y-4 text-base sm:text-lg leading-relaxed text-zinc-200 font-normal">
                  <p>
                    Vintoria was founded with a clear intention: to build a digital product studio that approaches technology not just as an implementation task, but as a system for business growth.
                  </p>
                  <p>
                    Too often, digital projects fail because strategy is separated from design, or design is separated from engineering.
                  </p>
                  <div className="grid grid-cols-1 gap-3 py-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-white/20 bg-black/60 p-4 font-mono text-xs backdrop-blur-md">
                      <span className="text-zinc-400 block mb-1">01 / STRATEGY</span>
                      <span className="text-white font-bold">Strategy without execution is just talk.</span>
                    </div>
                    <div className="rounded-xl border border-white/20 bg-black/60 p-4 font-mono text-xs backdrop-blur-md">
                      <span className="text-zinc-400 block mb-1">02 / DESIGN</span>
                      <span className="text-white font-bold">Design without engineering is just decoration.</span>
                    </div>
                    <div className="rounded-xl border border-white/20 bg-black/60 p-4 font-mono text-xs backdrop-blur-md">
                      <span className="text-zinc-400 block mb-1">03 / ENGINEERING</span>
                      <span className="text-white font-bold">Engineering without strategy is just code.</span>
                    </div>
                  </div>
                  <p className="font-medium text-white">
                    Vintoria exists to connect these layers — helping ambitious businesses design, build and scale digital products that actually make an impact.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* 12. Founders Section: BUILT BY BUILDERS. */}
            <section id="founders" className="mt-16">
              <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-emerald-400 font-semibold">
                    <Award size={14} />
                    <span>Studio Leadership</span>
                  </div>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    BUILT BY BUILDERS.
                  </h2>
                  <p className="mt-3 max-w-xl text-sm sm:text-base text-zinc-200">
                    Vintoria was founded by Abhishek Kogle and Pratik Patil — digital product builders with a shared belief that technology should be practical, well-engineered and designed to create real business value.
                  </p>
                </div>

                {/* Profile Toggle Switcher */}
                <div className="inline-flex rounded-full border border-white/25 bg-black/70 p-1.5 backdrop-blur-xl shadow-lg">
                  {founders.map((founder) => (
                    <button
                      key={founder.id}
                      onClick={() => setSelectedFounder(founder.id)}
                      className={`flex items-center gap-2.5 rounded-full px-5 py-2 text-xs font-semibold transition-all duration-300 ${
                        selectedFounder === founder.id
                          ? 'bg-white text-black shadow-md'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={founder.thumb}
                        alt={founder.name}
                        className="h-5 w-5 rounded-full object-cover border border-black/20"
                      />
                      <span>{founder.name}</span>
                      <span className={`text-[10px] ${selectedFounder === founder.id ? 'text-black/70 font-mono' : 'text-white/60 font-mono'}`}>
                        {founder.role}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Founder Dossier Card */}
              <div className="grid grid-cols-1 gap-10 rounded-3xl border border-white/25 bg-black/80 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl lg:grid-cols-12">
                {/* Left Column: Portrait & Key Metadata */}
                <div className="flex flex-col items-center text-center lg:col-span-5 lg:items-start lg:text-left">
                  <div className="relative group">
                    <div className="relative h-80 w-64 sm:h-96 sm:w-80 overflow-hidden rounded-2xl border-2 border-white/30 bg-zinc-900 shadow-2xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={currentFounder.image}
                        alt={currentFounder.name}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                      
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-black/85 px-3 py-1 font-mono text-[10px] text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{currentFounder.role} · Vintoria</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => handleOpenConsultation(`Direct project brief with ${currentFounder.name}`)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-xs font-bold text-black transition hover:bg-white/90 shadow-lg active:scale-95"
                    >
                      <Calendar size={13} />
                      <span>Talk with {currentFounder.name.split(' ')[0]}</span>
                    </button>
                    <a
                      href={currentFounder.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={15} />
                    </a>
                    <a
                      href={currentFounder.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
                      aria-label="X / Twitter"
                    >
                      <Twitter size={15} />
                    </a>
                    <a
                      href={currentFounder.socials.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/20 text-emerald-300 transition hover:bg-emerald-500/30 hover:text-white"
                      aria-label="WhatsApp Direct"
                      title="Direct WhatsApp with Founder"
                    >
                      <MessageCircle size={15} />
                    </a>
                  </div>
                </div>

                {/* Right Column: Bio, Philosophy Quote, Focus Areas */}
                <div className="flex flex-col justify-between lg:col-span-7">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-md border border-emerald-400/40 bg-emerald-500/15 px-2.5 py-0.5 font-mono text-xs font-bold text-emerald-400">
                        {currentFounder.role.toUpperCase()}
                      </span>
                      <span className="text-xs text-zinc-300 font-medium">EST. 2020</span>
                    </div>

                    <h3 className="mt-2 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                      {currentFounder.name}
                    </h3>

                    <p className="mt-1 font-mono text-xs text-zinc-400 font-semibold">
                      {currentFounder.tagline}
                    </p>

                    {/* Philosophy Quote */}
                    <div className="my-6 rounded-2xl border border-white/20 bg-white/5 p-5 backdrop-blur-md">
                      <p className="text-sm sm:text-base italic text-zinc-100 leading-relaxed font-serif">
                        {currentFounder.quote}
                      </p>
                    </div>

                    {/* Official Biography */}
                    <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-normal">
                      {currentFounder.bio}
                    </p>

                    {/* Focus Areas */}
                    <div className="mt-8">
                      <h4 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-emerald-400 font-semibold mb-3">
                        <CheckCircle2 size={14} />
                        <span>Core Strategic &amp; Operational Focus</span>
                      </h4>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {currentFounder.focusAreas.map((area, idx) => (
                          <div key={idx} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-zinc-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                            <span>{area}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Core Disciplines */}
                  <div className="mt-8 border-t border-white/15 pt-5">
                    <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-semibold block mb-2.5">
                      Technical Disciplines
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentFounder.techDisciplines.map((item) => (
                        <span
                          key={item}
                          className="rounded-lg border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs text-white"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Side-by-Side Dual Founder Cards */}
            <section className="mt-16">
              <div className="mb-6">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400 font-semibold">
                  Leadership Matrix
                </span>
                <h3 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                  Meet Both Founders
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {founders.map((f) => (
                  <div
                    key={f.id}
                    className={`rounded-2xl border p-6 transition-all duration-300 ${
                      selectedFounder === f.id
                        ? 'border-white/50 bg-black/90 shadow-2xl'
                        : 'border-white/20 bg-black/60 hover:border-white/35'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={f.thumb}
                        alt={f.name}
                        className="h-20 w-20 rounded-xl object-cover border border-white/20 shrink-0"
                      />
                      <div className="flex-1">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-semibold">
                          {f.role}
                        </span>
                        <h4 className="text-xl font-bold text-white">{f.name}</h4>
                        <p className="mt-1 text-xs text-zinc-300 line-clamp-2">{f.tagline}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-xs text-zinc-300 leading-relaxed line-clamp-3">
                      {f.bio}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                      <button
                        onClick={() => setSelectedFounder(f.id)}
                        className="text-xs font-semibold text-white underline underline-offset-4 hover:text-white/80"
                      >
                        Inspect Dossier
                      </button>
                      <button
                        onClick={() => handleOpenConsultation(`Brief with ${f.name}`)}
                        className="inline-flex items-center gap-1 text-xs font-mono text-emerald-300 hover:text-emerald-200"
                      >
                        <span>Talk with {f.name.split(' ')[0]}</span>
                        <ArrowUpRight size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 13. Philosophy: TECHNOLOGY SHOULD CREATE LEVERAGE. */}
            <section id="philosophy" className="mt-24 rounded-3xl border border-white/25 bg-black/70 p-8 sm:p-14 backdrop-blur-2xl shadow-2xl">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-400 font-semibold">
                  <Lightbulb size={13} />
                  <span>Studio Philosophy</span>
                </div>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                  {BRAND.philosophy.title}
                </h2>
                <p className="mt-6 text-base sm:text-lg leading-relaxed text-zinc-200 font-normal">
                  {BRAND.philosophy.body}
                </p>
              </div>
            </section>

            {/* 14. How We Think (5 Points) */}
            <section id="how-we-think" className="mt-20">
              <div className="mb-8">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400 font-semibold">
                  Principles &amp; Method
                </span>
                <h3 className="mt-1 text-3xl font-bold text-white sm:text-4xl">
                  HOW WE THINK.
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {BRAND.howWeThink.map((item, idx) => (
                  <Reveal key={item.title} delay={100 + idx * 60}>
                    <div className="flex h-full flex-col justify-between rounded-2xl border border-white/20 bg-black/60 p-6 backdrop-blur-xl shadow-lg">
                      <div>
                        <span className="font-mono text-2xl font-bold text-emerald-400">
                          0{idx + 1}
                        </span>
                        <h4 className="mt-3 text-lg font-bold text-white tracking-tight">
                          {item.title}
                        </h4>
                        <p className="mt-2 text-xs sm:text-sm text-zinc-200 leading-relaxed font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* 15. Why Vintoria (6 Points) */}
            <section id="why-vintoria" className="mt-20 border-t border-white/15 pt-16">
              <div className="mb-8">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400 font-semibold">
                  Differentiating Factor
                </span>
                <h3 className="mt-1 text-3xl font-bold text-white sm:text-4xl">
                  WHY VINTORIA.
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {BRAND.whyVintoria.map((item, idx) => (
                  <Reveal key={item.title} delay={100 + idx * 60}>
                    <div className="flex h-full flex-col justify-between rounded-2xl border border-white/20 bg-black/60 p-6 backdrop-blur-xl shadow-lg hover:border-white/40 transition-all">
                      <div>
                        <div className="flex items-center justify-between text-zinc-400 font-mono text-xs">
                          <span>PILLAR 0{idx + 1}</span>
                          <CheckCircle2 size={16} className="text-emerald-400" />
                        </div>
                        <h4 className="mt-3 text-lg font-bold text-white tracking-tight">
                          {item.title}
                        </h4>
                        <p className="mt-2 text-xs sm:text-sm text-zinc-200 leading-relaxed font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Official Social Channels & WhatsApp Direct Connect */}
            <SectionSocialChannels />

            {/* CTA to Connect with Founders */}
            <section className="mt-24 rounded-3xl border border-white/30 bg-gradient-to-b from-black/90 to-black/70 p-8 sm:p-14 text-center backdrop-blur-2xl shadow-2xl">
              <div className="mx-auto max-w-2xl">
                <div className="mx-auto mb-6 w-fit">
                  <BrandLogo size="lg" />
                </div>
                <div className="mx-auto mb-6 flex items-center justify-center">
                  <FounderAvatars size="lg" />
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono text-emerald-300 mb-6">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Direct Access to Abhishek Kogle &amp; Pratik Patil</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                  WHAT WILL YOU BUILD?
                </h2>
                <p className="mt-4 text-sm sm:text-base text-zinc-200 leading-relaxed">
                  The next great digital product starts with an idea. Bring us the idea. We’ll help build what comes next.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => handleOpenConsultation('Direct Leadership Consultation with Abhishek & Pratik')}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black transition-all hover:bg-white/90 shadow-xl active:scale-95"
                  >
                    <span>START A PROJECT →</span>
                    <ArrowUpRight size={16} />
                  </button>
                  <Link
                    href="/#capabilities"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/60 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/15"
                  >
                    <span>Explore 230+ Capabilities</span>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>

      {/* Floating Scroll Reactive Social Dock */}
      <FloatingSocialDock />

      {/* Global Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialMessage={consultationBrief}
      />
    </div>
  );
}
