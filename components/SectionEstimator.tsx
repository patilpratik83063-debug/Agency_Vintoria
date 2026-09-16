'use client';

import React, { useState } from 'react';
import {
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  Loader2,
  Calendar,
  Users,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { Reveal } from './Reveal';
import { BrandLogo } from './BrandLogo';
import { FounderAvatars } from './Founders';

interface SectionEstimatorProps {
  onOpenConsultationWithBrief: (briefText: string) => void;
}

interface SpecResponse {
  specId: string;
  projectType: string;
  timeline: string;
  budgetTier: string;
  summary: string;
  customArchitecture: string;
  recommendedStack: string[];
  milestones: {
    phase: string;
    duration: string;
    deliverables: string[];
  }[];
  squad: {
    role: string;
    allocation: string;
  }[];
  estimatedWeeks: number;
  slaGuarantee: string;
}

const projectTypes = [
  { id: 'ai-agents', title: 'Autonomous AI & Agent System', desc: 'Gemini 2.5 tool calling, RAG pipelines, autonomous workflows' },
  { id: 'fullstack-saas', title: 'Next-Gen Full-Stack SaaS', desc: 'Next.js 15, high-concurrency microservices, multi-tenant' },
  { id: '3d-flagship', title: 'Spatial & 3D Interactive Web', desc: '60fps WebGL, scroll-scrubbed cinematics, high conversion' },
  { id: 'enterprise-modernize', title: 'Enterprise Cloud Re-Architecture', desc: 'Zero-downtime migration, SOC2 readiness, sub-50ms latency' },
];

const availableFeatures = [
  'Real-Time WebSocket Sync',
  'Sub-Second Vector Search (pgvector)',
  'Stripe Global Checkout & Metered Billing',
  'Role-Based Access Control (RBAC)',
  'Zero-Cold-Start Cloud Run Hosting',
  'Interactive 3D / WebGL Physics',
  'Automated E2E Testing & Chaos Engineering',
  'Full TypeScript SDK Generation',
];

const timelineOptions = [
  '4-6 Weeks (Rapid Accelerated Sprint)',
  '6-8 Weeks (Standard Production Delivery)',
  '8-12 Weeks (Enterprise Scale & Compliance)',
];

const budgetTiers = [
  'Seed / Growth Tier ($15k - $30k)',
  'Production Scale Tier ($30k - $60k)',
  'Enterprise Flagship Tier ($60k - $120k+)',
];

export function SectionEstimator({ onOpenConsultationWithBrief }: SectionEstimatorProps) {
  const [selectedType, setSelectedType] = useState(projectTypes[0].title);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'Real-Time WebSocket Sync',
    'Sub-Second Vector Search (pgvector)',
    'Role-Based Access Control (RBAC)',
  ]);
  const [selectedTimeline, setSelectedTimeline] = useState(timelineOptions[1]);
  const [selectedBudget, setSelectedBudget] = useState(budgetTiers[1]);
  const [briefText, setBriefText] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [specResult, setSpecResult] = useState<SpecResponse | null>(null);

  const toggleFeature = (feat: string) => {
    if (selectedFeatures.includes(feat)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feat));
    } else {
      setSelectedFeatures([...selectedFeatures, feat]);
    }
  };

  const handleGenerateSpec = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/estimator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectType: selectedType,
          techRequirements: selectedFeatures,
          timeline: selectedTimeline,
          budgetTier: selectedBudget,
          projectDescription: briefText,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setSpecResult(data.data);
      }
    } catch (err) {
      console.error('Estimator error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="estimator" className="relative z-10 px-5 py-24 sm:px-8 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-white backdrop-blur-xl">
            <BrandLogo size="xs" bordered={false} />
            <Terminal size={13} />
            <span>Interactive Engineering Scope & Architecture Calculator</span>
          </div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.06]">
            Configure your technical blueprint.
            <br />
            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              In real time.
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
            Specify your architectural requirements, target velocity, and vision. Our intelligent
            estimator formulates sprint allocations, squad composition, and production stack recommendations.
          </p>
        </div>

        {/* Two-Column Interactive Matrix */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Configurator Controls (7 cols) */}
          <div className="space-y-8 rounded-2xl border border-hairline-raised bg-overlay p-6 backdrop-blur-xl sm:p-8 lg:col-span-7 shadow-glass-lg">
            {/* Step 1: Project Archetype */}
            <div>
              <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-emerald-300 font-semibold">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-xs text-black font-bold">
                  1
                </span>
                <span>Select Project Archetype</span>
              </label>
              <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {projectTypes.map((pt) => {
                  const isSelected = selectedType === pt.title;
                  return (
                    <button
                      key={pt.id}
                      type="button"
                      onClick={() => setSelectedType(pt.title)}
                      className={`rounded-xl border p-4 text-left transition-colors duration-300 ${
                        isSelected
                          ? 'border-white bg-white/20 text-white shadow-glass backdrop-blur-xl'
                          : 'border-hairline-raised bg-overlay text-white/85 hover:border-hairline-bright hover:text-white'
                      }`}
                    >
                      <div className="text-sm font-bold text-white">{pt.title}</div>
                      <div className="mt-1 text-xs text-zinc-300 leading-snug font-normal">{pt.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Technical Capabilities */}
            <div>
              <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-emerald-300 font-semibold">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-xs text-black font-bold">
                  2
                </span>
                <span>Core Capabilities & Infrastructure</span>
              </label>
              <div className="mt-3 flex flex-wrap gap-2">
                {availableFeatures.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat);
                  return (
                    <button
                      key={feat}
                      type="button"
                      onClick={() => toggleFeature(feat)}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors duration-300 ${
                        isChecked
                          ? 'border-hairline-bright bg-white/20 text-white'
                          : 'border-hairline-raised bg-overlay text-white/80 hover:border-hairline-bright hover:text-white'
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isChecked ? 'bg-emerald-400' : 'bg-white/30'
                        }`}
                      />
                      <span>{feat}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Timeline & Budget */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-emerald-300 font-semibold">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-xs text-black font-bold">
                    3
                  </span>
                  <span>Target Velocity</span>
                </label>
                <select
                  value={selectedTimeline}
                  onChange={(e) => setSelectedTimeline(e.target.value)}
                  className="mt-3 w-full rounded-xl border border-hairline-raised bg-overlay-soft p-3 text-sm text-white font-medium backdrop-blur-xl transition-colors duration-300 hover:border-hairline-bright focus:border-white"
                >
                  {timelineOptions.map((t) => (
                    <option key={t} value={t} className="bg-zinc-900 text-white">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-emerald-300 font-semibold">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-xs text-black font-bold">
                    4
                  </span>
                  <span>Capital Allocation</span>
                </label>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="mt-3 w-full rounded-xl border border-hairline-raised bg-overlay-soft p-3 text-sm text-white font-medium backdrop-blur-xl transition-colors duration-300 hover:border-hairline-bright focus:border-white"
                >
                  {budgetTiers.map((b) => (
                    <option key={b} value={b} className="bg-zinc-900 text-white">
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 4: Vision / Brief */}
            <div>
              <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-emerald-300 font-semibold">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-xs text-black font-bold">
                  5
                </span>
                <span>Specific Vision or Edge Cases (Optional)</span>
              </label>
              <textarea
                rows={3}
                placeholder="e.g. We need an AI-driven loan compliance validator with audited audit log, or high-performance WebGL product showcase..."
                value={briefText}
                onChange={(e) => setBriefText(e.target.value)}
                className="mt-3 w-full rounded-xl border border-hairline-raised bg-overlay-soft p-3 text-sm text-white placeholder-zinc-500 backdrop-blur-xl transition-colors duration-300 hover:border-hairline-bright focus:border-white resize-y min-h-28"
              />
            </div>

            {/* Submit Action */}
            <button
              type="button"
              onClick={handleGenerateSpec}
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2.5 rounded-full bg-white py-3.5 text-sm font-bold text-black transition-colors duration-300 hover:bg-white/88 disabled:opacity-50 shadow-glass"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Synthesizing Architectural Blueprint...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Calculate Technical Architecture & Sprint Plan</span>
                </>
              )}
            </button>

            {/* Founder review strip */}
            <div className="flex items-center justify-center gap-3 rounded-xl border border-hairline bg-overlay-soft px-4 py-2.5">
              <FounderAvatars size="xs" />
              <span className="text-xs text-zinc-300">
                Every generated spec is <span className="font-semibold text-white">personally reviewed</span> by{' '}
                <span className="font-semibold text-white">Abhishek & Pratik</span>
              </span>
            </div>
          </div>

          {/* Real-time Spec Output Terminal (5 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-hairline-raised bg-overlay-strong p-6 backdrop-blur-xl sm:p-8 lg:col-span-5 shadow-glass-lg">
            <div>
              {/* Terminal Header */}
              <div className="flex items-center justify-between border-b border-hairline pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 flex items-center gap-1.5 font-mono text-xs text-white/60">
                    <BrandLogo size="xs" bordered={false} />
                    vintoria-spec-engine.ts
                  </span>
                </div>
                {specResult && (
                  <span className="font-mono text-xs text-emerald-300">
                    {specResult.specId}
                  </span>
                )}
              </div>

              {specResult ? (
                <div className="mt-5 space-y-5 animate-in fade-in duration-300">
                  {/* Executive Summary */}
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                      Executive Architectural Summary
                    </span>
                    <p className="mt-1 text-sm text-zinc-100 leading-relaxed font-normal">
                      {specResult.summary}
                    </p>
                  </div>

                  {/* Milestones */}
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                      Sprint Roadmap ({specResult.estimatedWeeks} Weeks Projected)
                    </span>
                    <div className="mt-2 space-y-2">
                      {specResult.milestones.map((m) => (
                        <div key={m.phase} className="rounded-lg border border-hairline-raised bg-overlay-soft p-2.5 text-sm">
                          <div className="flex items-center justify-between font-semibold text-white">
                            <span>{m.phase}</span>
                            <span className="font-mono text-xs text-white/80">{m.duration}</span>
                          </div>
                          <div className="mt-1 text-xs text-zinc-200">{m.deliverables[0]}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dedicated Squad */}
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                      Assigned Engineering Squad
                    </span>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {specResult.squad.map((s) => (
                        <div key={s.role} className="rounded-md border border-hairline bg-white/10 p-2">
                          <div className="text-xs font-semibold text-white truncate">{s.role}</div>
                          <div className="text-xs font-mono text-emerald-300 font-bold">{s.allocation}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SLA */}
                  <div className="flex items-center gap-2 text-sm font-mono text-zinc-200 pt-2 border-t border-hairline-raised">
                    <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                    <span>{specResult.slaGuarantee}</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center text-white/70">
                  <Cpu size={42} className="mb-3 text-emerald-400/60 animate-pulse" />
                  <p className="text-sm font-semibold text-white">
                    Awaiting Configuration Parameters
                  </p>
                  <p className="mt-1 max-w-xs text-xs text-zinc-300">
                    Select your project archetype and requirements on the left, then click Calculate to
                    generate your technical blueprint.
                  </p>
                </div>
              )}
            </div>

            {/* Terminal Footer CTA */}
            {specResult ? (
              <div className="mt-6 border-t border-hairline pt-4">
                <button
                  type="button"
                  onClick={() =>
                    onOpenConsultationWithBrief(
                      `[${specResult.specId}] Project: ${selectedType}\nTimeline: ${selectedTimeline}\nBudget: ${selectedBudget}\nSelected Stack: ${specResult.recommendedStack.slice(0, 3).join(', ')}\nClient Notes: ${briefText}`
                    )
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3 text-sm font-semibold text-black transition-colors duration-300 hover:bg-emerald-300 shadow-glass"
                >
                  <span>Lock in This Spec & Book Brief</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              <div className="mt-6 border-t border-hairline pt-4 text-center">
                <span className="font-mono text-xs text-white/40">
                  Direct Principal Architect Review Included
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
