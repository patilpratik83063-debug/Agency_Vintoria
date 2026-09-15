'use client';

import React from 'react';
import { SiteShell } from '@/components/SiteShell';
import { SectionStats } from '@/components/SectionStats';
import { SectionCapabilities } from '@/components/SectionCapabilities';

export default function CapabilitiesPage() {
  return (
    <SiteShell>
      {(openConsultation) => (
        <div className="pt-16 sm:pt-20">
          {/* Brand intro + core disciplines */}
          <SectionStats />

          {/* All 12 pillars & 230+ skills with search */}
          <SectionCapabilities onOpenConsultation={(brief) => openConsultation(brief)} />
        </div>
      )}
    </SiteShell>
  );
}
