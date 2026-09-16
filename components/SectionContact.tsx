'use client';

import React, { useState } from 'react';
import {
  Mail,
  Clock,
  ArrowRight,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  MessageCircle,
  Youtube,
  Instagram,
  Linkedin,
} from 'lucide-react';
import { Reveal } from './Reveal';
import { BrandLogo } from './BrandLogo';
import { FounderAvatars, FounderCard } from './Founders';
import { SOCIAL_LINKS } from '@/lib/brandContent';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Input, Select, Textarea, FieldLabel } from './ui/Field';
import { GlassCard } from './ui/GlassCard';
import { XIcon } from './icons/XIcon';
import { cn } from '@/lib/utils';

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

const BUDGET_OPTIONS = ['$10k - $25k', '$25k - $50k', '$50k - $100k+', 'Flexible / Exploring Scope'];

const EMPTY_FORM = {
  name: '',
  email: '',
  company: '',
  projectType: 'Web Application',
  stage: 'Idea',
  budget: BUDGET_OPTIONS[0],
  message: '',
};

export function SectionContact() {
  const [formData, setFormData] = useState(EMPTY_FORM);

  const [isLoading, setIsLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationId, setConfirmationId] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');

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
      setWhatsappUrl(data.whatsappFallbackUrl || '');
      setFormData(EMPTY_FORM);
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
        <div className="mb-20 rounded-3xl border border-hairline-raised bg-overlay p-8 sm:p-12 backdrop-blur-2xl text-center shadow-glass-lg">
          <Reveal delay={100}>
            <div className="mx-auto mb-5 w-fit">
              <BrandLogo size="lg" />
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-300 font-bold">
              Initiate Project
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.04]">
              WHAT WILL
              <br />
              <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                YOU BUILD?
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-zinc-200 leading-relaxed font-normal">
              The next great digital product starts with an idea. Bring us the idea. We&rsquo;ll help build what comes next.
            </p>
          </Reveal>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Studio Context */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-hairline-raised bg-overlay px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-white backdrop-blur-xl">
                <BrandLogo size="xs" bordered={false} />
                <span>Contact Vintoria Studio</span>
              </div>

              <h3 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                HAVE SOMETHING
                <br />
                <span className="font-semibold text-white/80">AMBITIOUS IN MIND?</span>
              </h3>

              <p className="mt-6 text-base leading-relaxed text-zinc-200 sm:text-lg font-normal">
                Tell us what you&rsquo;re building, where you&rsquo;re trying to go and what stands in the way. Tell us about your project. We&rsquo;ll take it from there.
              </p>

              {/* Direct Details */}
              <div className="mt-8 space-y-4 text-sm text-zinc-200">
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
                  <a href="mailto:studio@vintoria.engineering" className="font-mono text-white font-semibold hover:text-emerald-300 transition-colors">studio@vintoria.engineering</a>
                </div>
              </div>

              {/* Direct WhatsApp Callout Card */}
              <div className="mt-8 rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-950/30 to-black/60 p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-emerald-300 font-bold flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                    Instant WhatsApp Dispatch
                  </span>
                  <span className="text-xs text-zinc-300 font-mono">15m Avg. Response</span>
                </div>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold text-white font-mono">{SOCIAL_LINKS.whatsapp.number}</div>
                    <div className="text-xs text-zinc-300">Direct message with Abhishek &amp; Pratik</div>
                  </div>
                  <a
                    href={SOCIAL_LINKS.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-xs font-bold text-black hover:bg-emerald-300 transition-colors shadow-glass shrink-0"
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
                  className="flex items-center gap-1.5 rounded-xl border border-hairline bg-white/5 px-2.5 py-1 text-xs text-zinc-300 hover:border-red-500/40 hover:bg-red-500/10 hover:text-white transition-colors"
                  title="YouTube"
                >
                  <Youtube size={13} className="text-red-400" />
                  <span>YouTube</span>
                </a>
                <a
                  href={SOCIAL_LINKS.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-xl border border-hairline bg-white/5 px-2.5 py-1 text-xs text-zinc-300 hover:border-pink-500/40 hover:bg-pink-500/10 hover:text-white transition-colors"
                  title="Instagram"
                >
                  <Instagram size={13} className="text-pink-400" />
                  <span>Instagram</span>
                </a>
                <a
                  href={SOCIAL_LINKS.x.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-xl border border-hairline bg-white/5 px-2.5 py-1 text-xs text-zinc-300 hover:border-sky-400/40 hover:bg-sky-500/10 hover:text-white transition-colors"
                  title="X / Twitter"
                >
                  <XIcon className="h-2.5 w-2.5 text-sky-400" />
                  <span>X / Twitter</span>
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-xl border border-hairline bg-white/5 px-2.5 py-1 text-xs text-zinc-300 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin size={13} className="text-blue-400" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Founder Direct Card */}
            <div className="mt-12 rounded-2xl border border-hairline-raised bg-overlay p-5 backdrop-blur-xl">
              <FounderCard />
              <p className="mt-2 text-xs text-zinc-300">
                Every project proposal is reviewed personally by Vintoria leadership before scoping.
              </p>
            </div>
          </div>

          {/* Right Column: Complete Form */}
          <div className="lg:col-span-7">
            <GlassCard surface="standard" className="p-6 sm:p-10">
              {submissionStatus === 'success' ? (
                <div className="py-12 text-center animate-in fade-in duration-300">
                  <div className="mx-auto mb-4 flex items-center justify-center">
                    <FounderAvatars size="lg" />
                  </div>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">MESSAGE RECEIVED.</h3>
                  <p className="mt-2 text-sm text-zinc-200 max-w-md mx-auto">
                    Your project details are on their way to the Vintoria team. Reference:{' '}
                    <span className="font-mono font-bold text-emerald-300">{confirmationId}</span>.
                    We&rsquo;ll review what you&rsquo;re building and get back to you shortly.
                  </p>
                  <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    {whatsappUrl && (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/15 px-6 py-2.5 text-sm font-semibold text-emerald-300 transition-colors hover:bg-emerald-400/25 hover:text-white"
                      >
                        <MessageCircle size={15} />
                        <span>Fast-track on WhatsApp</span>
                      </a>
                    )}
                    <Button
                      size="md"
                      variant={whatsappUrl ? 'outline' : 'primary'}
                      onClick={() => setSubmissionStatus('idle')}
                    >
                      Submit Another Project &rarr;
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <fieldset>
                    <legend className="font-mono text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                      Step 01
                    </legend>
                    <p className="text-base font-bold text-white mt-1 mb-3">
                      What are you looking to build? *
                    </p>
                    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Project type">
                      {PROJECT_TYPES.map((type) => {
                        const isSelected = formData.projectType === type;
                        return (
                          <button
                            type="button"
                            key={type}
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => setFormData({ ...formData, projectType: type })}
                            className={cn(
                              'rounded-xl px-3.5 py-1.5 text-sm font-semibold transition-colors duration-300',
                              isSelected
                                ? 'bg-white text-black shadow-glass'
                                : 'border border-hairline-raised bg-overlay text-white/80 hover:border-hairline-bright hover:text-white'
                            )}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="font-mono text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                      Step 02
                    </legend>
                    <p className="text-base font-bold text-white mt-1 mb-3">
                      What stage are you at? *
                    </p>
                    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Project stage">
                      {STAGES.map((stg) => {
                        const isSelected = formData.stage === stg;
                        return (
                          <button
                            type="button"
                            key={stg}
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => setFormData({ ...formData, stage: stg })}
                            className={cn(
                              'rounded-xl px-3.5 py-1.5 text-sm font-semibold transition-colors duration-300',
                              isSelected
                                ? 'bg-accent text-black font-bold shadow-glass'
                                : 'border border-hairline-raised bg-overlay text-white/80 hover:border-hairline-bright hover:text-white'
                            )}
                          >
                            {stg}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                      Step 03
                    </span>
                    <FieldLabel htmlFor="contact-budget" className="text-white normal-case tracking-normal text-base font-bold mt-1 mb-2">
                      What&apos;s your approximate budget?
                    </FieldLabel>
                    <Select
                      id="contact-budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    >
                      {BUDGET_OPTIONS.map((b) => (
                        <option key={b} value={b} className="bg-zinc-900 text-white">
                          {b}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                      Step 04
                    </span>
                    <FieldLabel htmlFor="contact-message" className="text-white normal-case tracking-normal text-base font-bold mt-1 mb-2">
                      Tell us about the project *
                    </FieldLabel>
                    <Textarea
                      id="contact-message"
                      required
                      rows={4}
                      placeholder="Share what you're building, key goals, timeline and any specific challenges..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                      Step 05
                    </span>
                    <p className="text-base font-bold text-white mt-1 mb-3">
                      How can we reach you?
                    </p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <div>
                        <label className="sr-only" htmlFor="contact-name">Your Name</label>
                        <Input
                          id="contact-name"
                          required
                          type="text"
                          placeholder="Your Name *"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="sr-only" htmlFor="contact-email">Work Email</label>
                        <Input
                          id="contact-email"
                          required
                          type="email"
                          placeholder="Work Email *"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="sr-only" htmlFor="contact-company">Company / Project Name</label>
                        <Input
                          id="contact-company"
                          type="text"
                          placeholder="Company / Project Name"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {submissionStatus === 'error' && (
                    <div className="rounded-xl border border-red-500/40 bg-red-500/15 p-3 text-sm text-red-200 font-medium">
                      {errorMessage}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    size="lg"
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending Project Details to Vintoria...</span>
                      </>
                    ) : (
                      <>
                        <span>Start a Project</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-2 pt-1 text-xs font-mono text-zinc-300">
                    <ShieldCheck size={13} className="text-emerald-400" />
                    <span>Protected by confidentiality &amp; direct founder review</span>
                  </div>
                </form>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
