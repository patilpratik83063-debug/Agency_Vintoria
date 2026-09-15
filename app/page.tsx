'use client';

import React from 'react';
import { SiteShell } from '@/components/SiteShell';
import { SectionHero } from '@/components/SectionHero';

export default function Home() {
  return (
    <SiteShell>
      {(openConsultation) => (
        /* Minimal hero only — the scroll-video is the experience, everything
           else lives on dedicated animated pages (see Navbar). */
        <SectionHero onOpenConsultation={() => openConsultation('Direct inquiry for Founders')} />
      )}
    </SiteShell>
  );
}
