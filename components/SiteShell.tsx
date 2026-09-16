'use client';

import React, { useState } from 'react';
import { ScrollVideo } from './ScrollVideo';
import { CursorGlow } from './CursorGlow';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ConsultationModal } from './ConsultationModal';

interface SiteShellProps {
  children: (openConsultation: (brief?: string) => void) => React.ReactNode;
}

/**
 * Shared site chrome: fixed scroll-video backdrop, cursor glow, navbar,
 * footer, social dock and the global consultation modal. Pages only supply
 * their content sections (already Reveal-animated) via render-prop so every
 * CTA can open the modal with a prefilled brief.
 */
export function SiteShell({ children }: SiteShellProps) {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationBrief, setConsultationBrief] = useState('');
  // Remount key: increments on every open so the modal re-initializes its
  // form with the freshly prefilled brief (state would otherwise persist).
  const [consultationNonce, setConsultationNonce] = useState(0);

  const handleOpenConsultation = (initialBrief: string = '') => {
    setConsultationBrief(initialBrief);
    setConsultationNonce((n) => n + 1);
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
        <main id="main-content" className="flex flex-1 flex-col">
          {children(handleOpenConsultation)}
        </main>

        {/* Studio Footer with Synchronized Clocks */}
        <Footer />
      </div>

      {/* Global Consultation Booking & RFP Modal (key forces remount so a
          reopened modal shows the new prefilled brief, not stale state) */}
      <ConsultationModal
        key={consultationNonce}
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialMessage={consultationBrief}
      />
    </div>
  );
}
