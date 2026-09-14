'use client';

import React, { useState } from 'react';
import { Cpu, Terminal, Shield, Zap, Sparkles, Check, Server, Globe, Database, Bot, Cloud, ShoppingBag } from 'lucide-react';
import { Reveal } from './Reveal';
import { BrandLogo } from './BrandLogo';

interface TechCategory {
  title: string;
  items: string[];
  icon: React.ElementType;
  description: string;
}

const techCategories: TechCategory[] = [
  {
    title: 'Frontend',
    icon: Globe,
    description: 'High-performance interactive client architectures and type-safe component systems.',
    items: ['Next.js', 'React', 'TypeScript'],
  },
  {
    title: 'Backend',
    icon: Server,
    description: 'Resilient event-driven services, microservices, and high-throughput API contracts.',
    items: ['Node.js', 'Python', 'APIs'],
  },
  {
    title: 'Data',
    icon: Database,
    description: 'ACID transactional integrity, distributed document stores, and vector embeddings.',
    items: ['PostgreSQL', 'MongoDB'],
  },
  {
    title: 'AI',
    icon: Bot,
    description: 'Large language models, semantic vector retrieval, and autonomous multi-agent swarms.',
    items: ['LLMs', 'RAG', 'AI Agents', 'Machine Intelligence'],
  },
  {
    title: 'Cloud',
    icon: Cloud,
    description: 'Zero-latency edge computing, serverless deployments, and hermetic containerization.',
    items: ['Vercel', 'AWS', 'Cloudflare', 'Docker'],
  },
  {
    title: 'Commerce',
    icon: ShoppingBag,
    description: 'Global multi-currency checkout, friction-free payment gateways, and headless storefronts.',
    items: ['Stripe', 'Razorpay', 'Shopify'],
  },
];

export function SectionTechRadar() {
  return (
    <section id="technology" className="relative z-10 px-5 py-24 sm:px-8 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-black/60 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white backdrop-blur-xl shadow-md">
              <BrandLogo size="xs" bordered={false} />
              <Zap size={13} className="text-emerald-400" />
              <span>Technology Section · Verified Production Stack</span>
            </div>
            <h2 className="mt-4 text-4xl font-normal tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-md">
              THE STACK BEHIND
              <br />
              <span className="font-semibold bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                THE EXPERIENCE.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base leading-relaxed text-zinc-200 md:text-right font-normal">
            We use modern technologies to build products that are fast, reliable and ready to evolve. Only technologies we actually use and verify in high-traffic production.
          </p>
        </div>

        {/* 6 Technology Categories Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {techCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Reveal key={cat.title} delay={100 + idx * 70}>
                <div className="group flex h-full flex-col justify-between rounded-2xl border border-white/20 bg-black/55 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:bg-black/65 shadow-xl">
                  <div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg border border-white/20 bg-white/10 p-2 text-white">
                          <Icon size={18} />
                        </div>
                        <h3 className="text-xl font-bold text-white">{cat.title}</h3>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-bold">
                        0{idx + 1}
                      </span>
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-zinc-200">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-3 py-1 font-mono text-xs font-semibold text-white group-hover:border-emerald-400/40 transition-colors"
                        >
                          <Check size={12} className="text-emerald-400" />
                          <span>{tech}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
