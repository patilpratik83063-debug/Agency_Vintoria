'use client';

import React from 'react';
import { SiteShell } from '@/components/SiteShell';
import { SectionProcess } from '@/components/SectionProcess';
import { SectionIndustriesFaq } from '@/components/SectionIndustriesFaq';

export default function ProcessPage() {
  return (
    <SiteShell>
      {(openConsultation) => (
        <div className="pt-16 sm:pt-20">
          {/* 6-stage engineering sprint methodology */}
          <SectionProcess />

          {/* Industries served + comprehensive FAQ */}
          <SectionIndustriesFaq onOpenConsultation={(brief) => openConsultation(brief)} />
        </div>
      )}
    </SiteShell>
  );
}
