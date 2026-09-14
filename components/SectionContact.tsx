'use client';

import React, { useState } from 'react';
import {
  Mail,
  Clock,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  MessageCircle,
  Send,
  Youtube,
  Instagram,
  Linkedin,
  ArrowUpRight,
} from 'lucide-react';
import { Reveal } from './Reveal';
import { BrandLogo } from './BrandLogo';
import { FounderAvatars, FounderCard } from './Founders';
import { SOCIAL_LINKS } from '@/lib/brandContent';

const PROJECT_TYPES = [
  'Website',
  'Web Application',
  'SaaS',
  'Mobile App',
  'AI Product',
  'Automation',
  'E-Commerce',
  'Branding',
  'Marketing',
  'Other',
];

const STAGES = [
  'Idea',
  'Planning',
  'Existing Product',
  'Redesign',
  'Scaling',
  'Migration',
];

export function SectionContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'Web Application',
    stage: 'Idea',
    budget: '$15k - $30k',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationId, setConfirmationId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmissionStatus('idle');
    setErrorMessage('');

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          timeline: `Stage: ${formData.stage}`,
          notes: `Project Type: ${formData.projectType}`,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit engagement brief');
      }

      setSubmissionStatus('success');
      setConfirmationId(data.inquiry?.id || 'VIN-RECEIVED');
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: 'Web Application',
        stage: 'Idea',
        budget: '$15k - $30k',
        message: '',
      });
    } catch (err: unknown) {
      setSubmissionStatus('error');
      const msg = err instanceof Error ? err.message : 'Error submitting brief. Please try again.';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="relative z-10 px-5 py-24 sm:px-8 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Top Header Banner: WHAT WILL YOU BUILD? */}
        <div className="mb-20 rounded-3xl border border-white/25 bg-black/60 p-8 sm:p-12 backdrop-blur-2xl text-center shadow-2xl">
          <Reveal delay={100}>
            <div className="mx-auto mb-5 w-fit">
              <BrandLogo size="lg" />
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400 font-bold">
              Initiate Project
            </span>
            <h2 className="mt-3 text-4xl font-normal tracking-tight text-white sm:text-6xl lg:text-7xl">
              WHAT WILL
              <br />
              <span className="font-semibold bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                YOU BUILD?
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-zinc-200 leading-relaxed font-normal">
              The next great digital product starts with an idea. Bring us the idea. We’ll help build what comes next.
            </p>
          </Reveal>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Studio Context */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-black/60 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white backdrop-blur-xl shadow-md">
                <BrandLogo size="xs" bordered={false} />
                <span>Contact Vintoria Studio</span>
              </div>

              <h3 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                HAVE SOMETHING
                <br />
                <span className="font-semibold text-white/80">AMBITIOUS IN MIND?</span>
              </h3>

              <p className="mt-6 text-sm leading-relaxed text-zinc-200 sm:text-base font-normal">
                Tell us what you’re building, where you’re trying to go and what stands in the way. Tell us about your project. We’ll take it from there.
              </p>

              {/* Direct Details */}
              <div className="mt-8 space-y-4 text-xs text-zinc-200">
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-emerald-400 shrink-0" />
                  <span className="font-medium">Direct Founder Review: Under 4 Business Hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                  <span className="font-medium">Strict NDA executed prior to deep architectural disclosure</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-zinc-300 shrink-0" />
                  <span className="font-mono text-white font-semibold">studio@vintoria.engineering</span>
                </div>
              </div>

              {/* Direct WhatsApp Callout Card */}
              <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 to-black/60 p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Instant WhatsApp Dispatch
                  </span>
                  <span className="text-[10px] text-zinc-300 font-mono">15m Avg. Response</span>
                </div>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold text-white font-mono">{SOCIAL_LINKS.whatsapp.number}</div>
                    <div className="text-[11px] text-zinc-300">Direct message with Abhishek &amp; Pratik</div>
                  </div>
                  <a
                    href={SOCIAL_LINKS.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3.5 py-1.5 text-xs font-bold text-black hover:bg-emerald-400 transition active:scale-95 shadow-md shrink-0"
                  >
                    <MessageCircle size={13} />
                    <span>Open WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Official Social Links Bar */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <a
                  href={SOCIAL_LINKS.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-zinc-300 hover:border-red-500/40 hover:bg-red-500/10 hover:text-white transition"
                  title="YouTube"
                >
                  <Youtube size={13} className="text-red-400" />
                  <span>YouTube</span>
                </a>
                <a
                  href={SOCIAL_LINKS.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-zinc-300 hover:border-pink-500/40 hover:bg-pink-500/10 hover:text-white transition"
                  title="Instagram"
                >
                  <Instagram size={13} className="text-pink-400" />
                  <span>Instagram</span>
                </a>
                <a
                  href={SOCIAL_LINKS.x.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-zinc-300 hover:border-sky-400/40 hover:bg-sky-500/10 hover:text-white transition"
                  title="X / Twitter"
                >
                  <svg className="h-2.5 w-2.5 fill-current text-sky-400" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>X / Twitter</span>
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-zinc-300 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white transition"
                  title="LinkedIn"
                >
                  <Linkedin size={13} className="text-blue-400" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Founder Direct Card */}
            <div className="mt-12 rounded-2xl border border-white/20 bg-black/55 p-5 backdrop-blur-xl">
              <FounderCard />
              <p className="mt-2 text-xs text-zinc-300">
                Every project proposal is reviewed personally by Vintoria leadership before scoping.
              </p>
            </div>
          </div>

          {/* Right Column: Complete Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/20 bg-black/60 p-6 backdrop-blur-xl sm:p-10 shadow-2xl">
              {submissionStatus === 'success' ? (
                <div className="py-12 text-center animate-in fade-in duration-300">
                  <div className="mx-auto mb-4 flex items-center justify-center">
                    <FounderAvatars size="lg" />
                  </div>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">MESSAGE RECEIVED.</h3>
                  <p className="mt-2 text-sm text-zinc-200 max-w-md mx-auto">
                    Your project details are on their way to the Vintoria team. Reference:{' '}
                    <span className="font-mono font-bold text-emerald-400">{confirmationId}</span>.
                    We’ll review what you’re building and get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmissionStatus('idle')}
                    className="mt-6 rounded-full bg-white px-6 py-2.5 text-xs font-bold text-black transition hover:bg-white/90 shadow-lg active:scale-95"
                  >
                    Submit Another Project →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 font-semibold">
                      Step 01
                    </span>
                    <label className="block text-sm font-bold text-white mt-1 mb-2">
                      What are you looking to build? *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PROJECT_TYPES.map((type) => {
                        const isSelected = formData.projectType === type;
                        return (
                          <button
                            type="button"
                            key={type}
                            onClick={() => setFormData({ ...formData, projectType: type })}
                            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                              isSelected
                                ? 'bg-white text-black shadow-md scale-[1.02]'
                                : 'border border-white/20 bg-black/50 text-white/80 hover:border-white/40 hover:text-white'
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 font-semibold">
                      Step 02
                    </span>
                    <label className="block text-sm font-bold text-white mt-1 mb-2">
                      What stage are you at? *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {STAGES.map((stg) => {
                        const isSelected = formData.stage === stg;
                        return (
                          <button
                            type="button"
                            key={stg}
                            onClick={() => setFormData({ ...formData, stage: stg })}
                            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                              isSelected
                                ? 'bg-emerald-400 text-black shadow-md font-bold'
                                : 'border border-white/20 bg-black/50 text-white/80 hover:border-white/40 hover:text-white'
                            }`}
                          >
                            {stg}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 font-semibold">
                      Step 03
                    </span>
                    <label className="block text-sm font-bold text-white mt-1 mb-1">
                      What&apos;s your approximate budget?
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full rounded-xl border border-white/25 bg-black/80 px-3.5 py-2.5 text-xs text-white focus:border-white focus:outline-none"
                    >
                      <option value="$10k - $25k" className="bg-zinc-900 text-white">$10k - $25k</option>
                      <option value="$25k - $50k" className="bg-zinc-900 text-white">$25k - $50k</option>
                      <option value="$50k - $100k+" className="bg-zinc-900 text-white">$50k - $100k+</option>
                      <option value="Flexible / Exploring Scope" className="bg-zinc-900 text-white">Flexible / Exploring Scope</option>
                    </select>
                  </div>

                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 font-semibold">
                      Step 04
                    </span>
                    <label className="block text-sm font-bold text-white mt-1 mb-1">
                      Tell us about the project *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Share what you're building, key goals, timeline and any specific challenges..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-white/25 bg-black/70 p-3 text-xs text-white placeholder-zinc-400 focus:border-white focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 font-semibold">
                      Step 05
                    </span>
                    <label className="block text-sm font-bold text-white mt-1 mb-2">
                      How can we reach you?
                    </label>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <input
                        required
                        type="text"
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="rounded-xl border border-white/25 bg-black/70 px-3.5 py-2 text-xs text-white placeholder-zinc-400 focus:border-white focus:outline-none"
                      />
                      <input
                        required
                        type="email"
                        placeholder="Work Email *"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="rounded-xl border border-white/25 bg-black/70 px-3.5 py-2 text-xs text-white placeholder-zinc-400 focus:border-white focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Company / Project Name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="rounded-xl border border-white/25 bg-black/70 px-3.5 py-2 text-xs text-white placeholder-zinc-400 focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {submissionStatus === 'error' && (
                    <div className="rounded-xl border border-red-500/40 bg-red-500/15 p-3 text-xs text-red-200 font-medium">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3.5 text-sm font-bold text-black transition-all hover:bg-white/90 active:scale-[0.99] disabled:opacity-50 shadow-2xl"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending Project Details to Vintoria...</span>
                      </>
                    ) : (
                      <>
                        <span>START A PROJECT →</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 pt-1 text-[11px] font-mono text-zinc-300">
                    <ShieldCheck size={13} className="text-emerald-400" />
                    <span>Protected by confidentiality &amp; direct founder review</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
