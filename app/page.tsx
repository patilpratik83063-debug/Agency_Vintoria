'use client';

import React, { useState } from 'react';
import { ScrollVideo } from '@/components/ScrollVideo';
import { CursorGlow } from '@/components/CursorGlow';
import { Navbar } from '@/components/Navbar';
import { SectionHero } from '@/components/SectionHero';
import { SectionStats } from '@/components/SectionStats';
import { SectionCapabilities } from '@/components/SectionCapabilities';
import { SectionProjects } from '@/components/SectionProjects';
import { SectionAiAutomation } from '@/components/SectionAiAutomation';
import { SectionEstimator } from '@/components/SectionEstimator';
import { SectionTechRadar } from '@/components/SectionTechRadar';
import { SectionProcess } from '@/components/SectionProcess';
import { SectionIndustriesFaq } from '@/components/SectionIndustriesFaq';
import { SectionTestimonials } from '@/components/SectionTestimonials';
import { SectionSocialChannels } from '@/components/SectionSocialChannels';
import { SectionContact } from '@/components/SectionContact';
import { Footer } from '@/components/Footer';
import { ConsultationModal } from '@/components/ConsultationModal';
import { FloatingSocialDock } from '@/components/FloatingSocialDock';

export default function Home() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationBrief, setConsultationBrief] = useState('');

  const handleOpenConsultation = (initialBrief: string = '') => {
    setConsultationBrief(initialBrief);
    setIsConsultationOpen(true);
  };

  return (
    <div id="page-root" className="relative min-h-screen w-full bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
      {/* Ambient Cursor Glow Spotlight */}
      <CursorGlow />

      {/* Fixed Full-bleed Scroll-scrubbed Video Background */}
      <ScrollVideo />

      {/* Relative Content Layer above Video */}
      <div id="content-wrapper" className="relative z-10 flex min-h-screen flex-col">
        {/* Fixed Navbar with live availability indicator */}
        <Navbar onOpenConsultation={() => handleOpenConsultation()} />

        {/* Main Content Flow */}
        <main id="main-content" className="flex flex-col">
          {/* Section 1 — Hero: BUILD WHAT'S NEXT. with dual founders Abhishek & Pratik */}
          <SectionHero onOpenConsultation={() => handleOpenConsultation('Direct inquiry for Founders')} />

          {/* Section 2 — Brand Intro & 6 Core Disciplines: ONE STUDIO. EVERY DIGITAL LAYER. */}
          <SectionStats />

          {/* Section 3 — The Gate of Capabilities: All 12 Pillars & 230+ Skills with Search */}
          <SectionCapabilities onOpenConsultation={(brief) => handleOpenConsultation(brief)} />

          {/* Section 4 — Selected Works & Flagship Case Studies */}
          <SectionProjects />

          {/* Section 5 — Dual Spotlight: 07 AI Development & 08 Automation */}
          <SectionAiAutomation onOpenConsultation={(brief) => handleOpenConsultation(brief)} />

          {/* Section 6 — Interactive Project Scope & Technical Estimator */}
          <SectionEstimator
            onOpenConsultationWithBrief={(brief) => handleOpenConsultation(brief)}
          />

          {/* Section 7 — The Stack Behind The Experience: Verified Production Technologies */}
          <SectionTechRadar />

          {/* Section 8 — From Idea To Impact: 6-Stage Engineering Sprint Methodology */}
          <SectionProcess />

          {/* Section 9 — Built Across Industries & Comprehensive FAQ */}
          <SectionIndustriesFaq onOpenConsultation={(brief) => handleOpenConsultation(brief)} />

          {/* Section 10 — Client Testimonials & Endorsements */}
          <SectionTestimonials />

          {/* Section 11 — Official Studio Social Channels & WhatsApp Direct Connect with Scroll Animations */}
          <SectionSocialChannels />

          {/* Section 12 — What Will You Build? & Complete Project Brief Portal */}
          <SectionContact />
        </main>

        {/* Studio Footer with Synchronized Clocks */}
        <Footer />
      </div>

      {/* Floating Scroll-Reactive Quick Connect & WhatsApp Dock */}
      <FloatingSocialDock />

      {/* Global Consultation Booking & RFP Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialMessage={consultationBrief}
      />
    </div>
  );
}
