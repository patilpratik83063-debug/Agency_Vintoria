'use client';

import React from 'react';
import { Bot, Zap, ArrowRight, Cpu, Workflow, MessageSquareCode, FileSearch, Sparkles, ShieldCheck } from 'lucide-react';
import { Reveal } from './Reveal';
import { BrandLogo } from './BrandLogo';

interface SectionAiAutomationProps {
  onOpenConsultation: (brief?: string) => void;
}

export function SectionAiAutomation({ onOpenConsultation }: SectionAiAutomationProps) {
  return (
    <section id="ai-automation" className="relative z-10 px-5 py-24 sm:px-8 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* 17. AI Section */}
          <Reveal delay={100}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-white/20 bg-black/55 p-7 backdrop-blur-xl shadow-2xl sm:p-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/40 bg-emerald-500/15 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-400 font-semibold">
                  <BrandLogo size="xs" bordered={false} />
                  <Bot size={13} />
                  <span>07 — AI Development</span>
                </div>

                <h3 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  INTELLIGENCE,
                  <br />
                  <span className="font-semibold bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                    BUILT INTO THE PRODUCT.
                  </span>
                </h3>

                <p className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-200 font-normal">
                  AI is changing how products are built, operated and experienced. Vintoria helps businesses turn that potential into practical systems — from AI-powered products and agents to intelligent search, document processing and automated workflows.
                </p>

                {/* Practical AI Capabilities Pills */}
                <div className="mt-6 grid grid-cols-2 gap-2 text-xs">
                  {[
                    'AI Product & SaaS Development',
                    'Autonomous Agent Swarms',
                    'RAG & Vector Search Systems',
                    'Intelligent Document Processing',
                    'LLM API & Copilot Integrations',
                    'AI Lead Qualification & Search',
                  ].map((feat) => (
                    <div
                      key={feat}
                      className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 p-2.5 text-zinc-200 text-[11px]"
                    >
                      <Sparkles size={12} className="text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/15">
                <button
                  onClick={() => onOpenConsultation('Inquiry for AI Development & RAG Systems')}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-bold text-black hover:bg-white/90 transition-all shadow-lg active:scale-95"
                >
                  <span>Explore AI Development</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </Reveal>

          {/* 18. Automation Section */}
          <Reveal delay={200}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-white/20 bg-black/55 p-7 backdrop-blur-xl shadow-2xl sm:p-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-lg border border-amber-400/40 bg-amber-500/15 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-amber-400 font-semibold">
                  <BrandLogo size="xs" bordered={false} />
                  <Zap size={13} />
                  <span>08 — Business Automation</span>
                </div>

                <h3 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  LESS MANUAL.
                  <br />
                  <span className="font-semibold bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                    MORE MOMENTUM.
                  </span>
                </h3>

                <p className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-200 font-normal">
                  Repetitive processes consume time that should be spent on higher-value work. We design connected workflows that allow businesses to automate the repetitive, orchestrate the complex and focus people where they create the most value.
                </p>

                {/* Practical Automation Pills */}
                <div className="mt-6 grid grid-cols-2 gap-2 text-xs">
                  {[
                    'End-to-End Workflow Automation',
                    'CRM & Lead Pipeline Automation',
                    'WhatsApp & Omnichannel Bots',
                    'Invoice & Billing Orchestration',
                    'Multi-System API Integration',
                    'Approval & Notification Triggers',
                  ].map((feat) => (
                    <div
                      key={feat}
                      className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 p-2.5 text-zinc-200 text-[11px]"
                    >
                      <Workflow size={12} className="text-amber-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/15">
                <button
                  onClick={() => onOpenConsultation('Inquiry for Business Automation & Orchestration')}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/60 px-6 py-3 text-xs font-bold text-white hover:bg-white/20 transition-all shadow-lg active:scale-95 backdrop-blur-md"
                >
                  <span>Explore Automation</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
