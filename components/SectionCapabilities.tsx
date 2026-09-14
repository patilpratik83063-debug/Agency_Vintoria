'use client';

import React, { useState, useMemo } from 'react';
import {
  Compass,
  Globe,
  Layers,
  Smartphone,
  Layout,
  Palette,
  Bot,
  Zap,
  Server,
  ShoppingBag,
  TrendingUp,
  Activity,
  Search,
  CheckCircle2,
  ArrowRight,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';
import { Reveal } from './Reveal';
import { BrandLogo } from './BrandLogo';
import { SERVICE_CATALOG, ServiceCategory, TOTAL_SKILLS_COUNT } from '@/lib/serviceCatalog';

const ICON_MAP: Record<string, React.ElementType> = {
  Compass,
  Globe,
  Layers,
  Smartphone,
  Layout,
  Palette,
  Bot,
  Zap,
  Server,
  ShoppingBag,
  TrendingUp,
  Activity,
};

interface SectionCapabilitiesProps {
  onOpenConsultation: (brief?: string) => void;
}

export function SectionCapabilities({ onOpenConsultation }: SectionCapabilitiesProps) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAllExpanded, setIsAllExpanded] = useState(false);

  const activeCategory = SERVICE_CATALOG[activeCategoryIndex];

  // Filter skills based on search query across all categories
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase().trim();
    const results: { category: ServiceCategory; matchedSkills: string[] }[] = [];

    SERVICE_CATALOG.forEach((cat) => {
      const matched = cat.skills.filter((s) => s.toLowerCase().includes(query));
      if (matched.length > 0 || cat.title.toLowerCase().includes(query)) {
        results.push({
          category: cat,
          matchedSkills: matched.length > 0 ? matched : cat.skills,
        });
      }
    });

    return results;
  }, [searchQuery]);

  const ActiveIcon = ICON_MAP[activeCategory.iconName] || Layers;

  return (
    <section id="capabilities" className="relative z-10 px-5 py-24 sm:px-8 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section Header: THE GATE OF CAPABILITIES */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-black/60 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white backdrop-blur-xl shadow-md">
              <BrandLogo size="xs" bordered={false} />
              <span>Complete Service Catalog · {TOTAL_SKILLS_COUNT} Capabilities</span>
            </div>

            <h2 className="mt-4 text-4xl font-normal tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-md">
              THE GATE OF
              <br />
              <span className="font-semibold bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                CAPABILITIES.
              </span>
            </h2>
          </div>

          <div className="max-w-md md:text-right">
            <p className="text-sm sm:text-base leading-relaxed text-zinc-200 font-normal">
              Behind every Vintoria project is a multidisciplinary system of strategy, design and technology. Explore the capabilities that allow us to take an idea from its earliest stage to a product ready for the real world.
            </p>
            <button
              onClick={() => onOpenConsultation('Inquiry for Complete Digital Architecture')}
              className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
            >
              <span>Explore Capabilities Consultation</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Global Live Search Bar */}
        <div className="mt-10">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all 230+ capabilities (e.g. 'Next.js', 'RAG Systems', 'SaaS MVP', 'Automation', 'Shopify', 'SEO')..."
              className="w-full rounded-2xl border border-white/20 bg-black/60 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-zinc-400 backdrop-blur-xl focus:border-white focus:outline-none shadow-lg transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 text-xs font-mono text-zinc-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* If Search Active: Show Filtered Results */}
        {searchResults !== null ? (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between font-mono text-xs text-zinc-300">
              <span>
                Found matching results across {searchResults.length} discipline{searchResults.length === 1 ? '' : 's'}:
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-emerald-400 hover:underline"
              >
                Reset Search
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {searchResults.map(({ category, matchedSkills }) => {
                const Icon = ICON_MAP[category.iconName] || Layers;
                return (
                  <div
                    key={category.id}
                    className="rounded-2xl border border-white/20 bg-black/55 p-6 backdrop-blur-xl shadow-xl"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg border border-white/15 bg-white/10 p-2 text-white">
                          <Icon size={18} />
                        </div>
                        <div>
                          <div className="font-mono text-[10px] text-emerald-400 font-bold">
                            {category.number} · {category.tagline}
                          </div>
                          <div className="text-lg font-bold text-white">{category.title}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => onOpenConsultation(`Consultation for ${category.title}`)}
                        className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-black hover:bg-white/85"
                      >
                        Select
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {matchedSkills.map((skill) => (
                        <button
                          key={skill}
                          onClick={() => onOpenConsultation(`Inquiry for ${skill} under ${category.title}`)}
                          className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-zinc-200 hover:border-emerald-400/50 hover:bg-emerald-500/10 hover:text-white transition-all text-left flex items-center gap-1.5"
                        >
                          <CheckCircle2 size={11} className="text-emerald-400 shrink-0" />
                          <span>{skill}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Normal State: Interactive 12-Pillar Tabs & Detailed View */
          <div className="mt-10">
            {/* 12 Category Filter Chips */}
            <div className="flex flex-wrap gap-2 border-b border-white/15 pb-4">
              {SERVICE_CATALOG.map((cat, idx) => {
                const isActive = activeCategoryIndex === idx;
                const Icon = ICON_MAP[cat.iconName] || Layers;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategoryIndex(idx)}
                    className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-white text-black shadow-lg scale-[1.02]'
                        : 'border border-white/20 bg-black/55 text-white/80 hover:border-white/40 hover:text-white backdrop-blur-md'
                    }`}
                  >
                    <Icon size={14} className={isActive ? 'text-black' : 'text-zinc-400'} />
                    <span>
                      {cat.number} {cat.title}
                    </span>
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[9px] font-mono ${
                        isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-zinc-300'
                      }`}
                    >
                      {cat.skills.length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Pillar Highlight Card */}
            <div className="mt-6 rounded-3xl border border-white/20 bg-black/60 p-6 backdrop-blur-xl shadow-2xl sm:p-10">
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="rounded-md border border-emerald-400/40 bg-emerald-500/15 px-2.5 py-0.5 font-bold text-emerald-400">
                      DISCIPLINE {activeCategory.number}
                    </span>
                    <span className="text-zinc-400">•</span>
                    <span className="font-semibold text-white uppercase tracking-wider">
                      {activeCategory.tagline}
                    </span>
                  </div>

                  <h3 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {activeCategory.title}
                  </h3>

                  <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-zinc-200">
                    {activeCategory.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onOpenConsultation(`Complete brief for ${activeCategory.title}`)}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-bold text-black transition hover:bg-white/90 shadow-lg active:scale-95"
                  >
                    <span>Request Proposal for {activeCategory.number}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="mt-8 border-t border-white/15 pt-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                    Specialized Competencies ({activeCategory.skills.length} Available)
                  </span>
                  <span className="text-xs text-zinc-400">Click any capability to add to your brief</span>
                </div>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {activeCategory.skills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => onOpenConsultation(`Inquiry for ${skill} (${activeCategory.title})`)}
                      className="group flex items-center justify-between rounded-xl border border-white/15 bg-white/5 p-3 text-left transition-all duration-200 hover:border-emerald-400/50 hover:bg-white/15 hover:shadow-md"
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2
                          size={14}
                          className="text-emerald-400 shrink-0 group-hover:scale-110 transition-transform"
                        />
                        <span className="text-xs font-semibold text-zinc-100 group-hover:text-white">
                          {skill}
                        </span>
                      </div>
                      <ArrowRight
                        size={12}
                        className="text-white/40 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Toggle to View Entire 12-Discipline Matrix */}
            <div className="mt-10 text-center">
              <button
                onClick={() => setIsAllExpanded(!isAllExpanded)}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/60 px-6 py-2.5 font-mono text-xs font-semibold text-white backdrop-blur-xl hover:border-white/50 hover:bg-white/15 transition-all"
              >
                <SlidersHorizontal size={13} />
                <span>
                  {isAllExpanded ? 'Collapse Full Catalog Matrix' : `View All ${TOTAL_SKILLS_COUNT} Skills Matrix`}
                </span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${isAllExpanded ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            {/* Expanded 12-Pillar Matrix */}
            {isAllExpanded && (
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 animate-in fade-in duration-300">
                {SERVICE_CATALOG.map((cat) => {
                  const Icon = ICON_MAP[cat.iconName] || Layers;
                  return (
                    <div
                      key={cat.id}
                      className="flex flex-col justify-between rounded-2xl border border-white/20 bg-black/55 p-5 backdrop-blur-xl shadow-xl"
                    >
                      <div>
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="rounded-lg border border-white/15 bg-white/10 p-1.5 text-white">
                              <Icon size={16} />
                            </div>
                            <div>
                              <span className="font-mono text-[10px] text-emerald-400 font-bold">
                                {cat.number}
                              </span>
                              <h4 className="text-sm font-bold text-white">{cat.title}</h4>
                            </div>
                          </div>
                          <span className="font-mono text-[10px] text-zinc-400">
                            {cat.skills.length} skills
                          </span>
                        </div>

                        <p className="mt-2 text-xs text-zinc-300 leading-snug">
                          {cat.description}
                        </p>

                        <div className="mt-3 space-y-1">
                          {cat.skills.map((skill) => (
                            <div
                              key={skill}
                              onClick={() => onOpenConsultation(`Request for ${skill} (${cat.title})`)}
                              className="cursor-pointer rounded px-2 py-1 text-[11px] text-zinc-200 hover:bg-white/10 hover:text-white flex items-center gap-1.5 transition-colors"
                            >
                              <span className="h-1 w-1 rounded-full bg-emerald-400 shrink-0" />
                              <span className="truncate">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/10">
                        <button
                          onClick={() => onOpenConsultation(`Initiate project for ${cat.title}`)}
                          className="w-full rounded-lg bg-white/10 py-1.5 text-center font-mono text-[11px] font-bold text-white hover:bg-white hover:text-black transition-colors"
                        >
                          Select Discipline {cat.number} →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
