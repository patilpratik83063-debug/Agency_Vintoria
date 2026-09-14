'use client';

import React, { useState } from 'react';
import { ExternalLink, X, ArrowUpRight, Cpu, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { Reveal } from './Reveal';
import { BrandLogo } from './BrandLogo';

interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  headline: string;
  description: string;
  metrics: { label: string; value: string }[];
  stack: string[];
  architectureDetails: string[];
  accentColor: string;
}

const projects: Project[] = [
  {
    id: 'aetheron',
    title: 'Aetheron AI',
    category: 'AI & Autonomous Agents',
    client: 'Aetheron Capital (Zurich / NYC)',
    year: '2026',
    headline: 'Autonomous Multi-Agent FinTech Orchestration Engine',
    description:
      'Architected an enterprise multi-agent swarm utilizing Gemini 2.5 and vector indexing to conduct real-time compliance audits, risk forecasting, and portfolio sensitivity simulations.',
    metrics: [
      { label: 'Underwriting Velocity', value: '8.4x Faster' },
      { label: 'Daily Events Streamed', value: '4.2M+' },
      { label: 'Median Inference Latency', value: '38ms' },
    ],
    stack: ['Next.js 15', 'Gemini 2.5 Flash', 'pgvector', 'Redis', 'Docker on Cloud Run'],
    architectureDetails: [
      'Sub-50ms vector similarity lookups using HNSW indexing in PostgreSQL',
      'Dual-pass sanitization guaranteeing zero data leakage to model training pools',
      'Fault-tolerant agent fallback chain with deterministic human-in-the-loop triggers',
    ],
    accentColor: 'from-amber-500/20 to-orange-500/10',
  },
  {
    id: 'kroma',
    title: 'Kroma Spatial',
    category: '3D & Spatial Web',
    client: 'Kroma Acoustics (Tokyo / SF)',
    year: '2026',
    headline: 'Real-time 60fps Photorealistic Audio Hardware Configurator',
    description:
      'Engineered a scroll-scrubbed interactive 3D flagship with dynamic procedural lighting, acoustic simulation preview, and seamless headless checkout.',
    metrics: [
      { label: 'Customer Conversion', value: '+312%' },
      { label: 'Mobile Frame Rate', value: 'Solid 60fps' },
      { label: '3D Asset Footprint', value: '-68% Optimized' },
    ],
    stack: ['WebGL / Canvas', 'React 19', 'Motion', 'Tailwind CSS', 'AWS CloudFront'],
    architectureDetails: [
      'Progressive texture mesh LOD streaming for instant mobile initial render',
      'Offscreen canvas frame-cache worker preventing main-thread input stutter',
      'Micro-interaction physics tuned for touch gestures and desktop cursors',
    ],
    accentColor: 'from-blue-500/20 to-indigo-500/10',
  },
  {
    id: 'lumina',
    title: 'Lumina Health',
    category: 'Full-Stack SaaS',
    client: 'Lumina Care Systems',
    year: '2025',
    headline: 'HIPAA-Compliant Real-Time Diagnostic & Telehealth Platform',
    description:
      'Built a zero-latency clinical platform coordinating asynchronous doctor-patient teleconsultations, intelligent triage routing, and encrypted medical records.',
    metrics: [
      { label: 'Verified Uptime SLA', value: '99.999%' },
      { label: 'Patients Coordinated', value: '1.2M+' },
      { label: 'Compliance Audit', value: 'SOC2 Type II' },
    ],
    stack: ['TypeScript', 'Next.js App Router', 'WebRTC', 'PostgreSQL', 'GCP Healthcare API'],
    architectureDetails: [
      'End-to-end envelope encryption for all sensitive health metadata',
      'Automated disaster failover with active-active regional replication',
      'Multi-tenant role-based permissions with immutable tamper-proof audit trail',
    ],
    accentColor: 'from-emerald-500/20 to-teal-500/10',
  },
  {
    id: 'synthetix',
    title: 'Synthetix Commerce',
    category: 'Enterprise Modernization',
    client: 'Synthetix Brand Group',
    year: '2025',
    headline: 'Global Headless Flagship Handling 80k Requests/Sec',
    description:
      'Engineered a global enterprise storefront handling multi-currency transactions, instant inventory sync, and sub-300ms localized page delivery worldwide.',
    metrics: [
      { label: 'Peak Load Handled', value: '82,000 rps' },
      { label: 'Global LCP', value: '0.28s' },
      { label: 'Cart Abandonment', value: '-24.6%' },
    ],
    stack: ['Next.js 15', 'Edge Middleware', 'Stripe Custom', 'Redis Cloud', 'Cloud Run'],
    architectureDetails: [
      'Stale-while-revalidate edge cache with instantaneous tag-based invalidation',
      'Custom transactional Stripe integration with zero cart dropouts during flash spikes',
      'Algorithmic predictive pre-fetching for instant catalog browsing',
    ],
    accentColor: 'from-purple-500/20 to-pink-500/10',
  },
];

const categories = ['All', 'AI & Autonomous Agents', 'Full-Stack SaaS', '3D & Spatial Web', 'Enterprise Modernization'];

export function SectionProjects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="relative z-10 px-5 py-24 sm:px-8 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md">
              <BrandLogo size="xs" bordered={false} />
              <Layers size={13} />
              <span>Selected Works & Flagship Case Studies</span>
            </div>
            <h2 className="mt-4 text-4xl font-normal tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-md">
              Proven impact at
              <br />
              <span className="font-medium bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                uncompromising scale.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-zinc-200 leading-relaxed md:text-right font-normal">
            Every product engineered by Vintoria is crafted to benchmark standards in speed,
            security, and design distinction.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="mt-10 flex flex-wrap gap-2 border-b border-white/15 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-black shadow-md'
                  : 'bg-black/60 text-white/85 hover:bg-white/20 hover:text-white border border-white/20 backdrop-blur-md'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <Reveal key={project.id} delay={150 + index * 100}>
              <div
                onClick={() => setActiveModalProject(project)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/20 bg-black/55 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/40 hover:bg-black/65 shadow-2xl sm:p-8"
              >
                {/* Ambient Top Glow */}
                <div
                  className={`absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br ${project.accentColor} blur-3xl opacity-50 transition-opacity group-hover:opacity-90`}
                />

                {/* Top Row: Client & Category */}
                <div className="flex items-center justify-between text-xs text-white/80">
                  <span className="font-mono uppercase tracking-wider text-emerald-400 font-semibold">{project.category}</span>
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    <span>{project.year}</span>
                    <span>•</span>
                    <span className="text-white font-medium">{project.client}</span>
                  </div>
                </div>

                {/* Headline & Title */}
                <h3 className="mt-4 text-2xl font-bold tracking-tight text-white group-hover:text-white sm:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-200 font-normal">
                  {project.headline}
                </p>

                {/* Metrics Badges */}
                <div className="mt-6 grid grid-cols-3 gap-2 border-y border-white/15 py-4">
                  {project.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="text-lg font-bold text-white tracking-tight sm:text-xl font-mono">
                        {m.value}
                      </div>
                      <div className="mt-0.5 text-[10px] text-zinc-300 font-mono truncate">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Chips & Action Link */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/20 bg-white/10 px-2.5 py-1 font-mono text-[10px] text-white font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span className="rounded-md border border-white/15 bg-white/5 px-2 py-1 font-mono text-[10px] text-white/70">
                        +{project.stack.length - 3}
                      </span>
                    )}
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:translate-x-0.5 transition-transform group-hover:text-emerald-400">
                    <span>Examine Spec</span>
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Deep-Dive Architecture Modal */}
      {activeModalProject && (
        <div
          id="project-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModalProject(null);
          }}
        >
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/20 bg-[#111114] p-6 text-white shadow-2xl sm:p-8">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 right-5 rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/60">
              <span>{activeModalProject.category}</span>
              <span>/</span>
              <span>{activeModalProject.year}</span>
            </div>

            <h3 className="mt-2 text-3xl font-semibold tracking-tight">{activeModalProject.title}</h3>
            <p className="mt-1 text-sm font-medium text-white/70">{activeModalProject.headline}</p>

            <p className="mt-4 text-sm leading-relaxed text-white/80">
              {activeModalProject.description}
            </p>

            {/* Impact Metrics */}
            <div className="mt-6 rounded-xl border border-white/15 bg-white/5 p-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">
                Demonstrated Production Metrics
              </span>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {activeModalProject.metrics.map((m) => (
                  <div key={m.label} className="border-l border-white/20 pl-3">
                    <div className="text-xl font-bold text-white">{m.value}</div>
                    <div className="text-[11px] text-white/60 font-mono">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Highlights */}
            <div className="mt-6">
              <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white">
                <Cpu size={15} />
                <span>Architectural Blueprint</span>
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-white/80">
                {activeModalProject.architectureDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 rounded-lg border border-white/10 bg-white/5 p-3">
                    <CheckCircle2 size={15} className="mt-0.5 text-emerald-400 shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Full Tech Stack */}
            <div className="mt-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">
                Complete Production Stack
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {activeModalProject.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-xs text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3 border-t border-white/10 pt-4">
              <button
                onClick={() => setActiveModalProject(null)}
                className="rounded-full border border-white/20 px-5 py-2 text-xs font-medium text-white hover:bg-white/10"
              >
                Close Spec
              </button>
              <a
                href="#estimator"
                onClick={() => setActiveModalProject(null)}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-xs font-semibold text-black hover:bg-white/85"
              >
                <span>Request Similar Architecture</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
