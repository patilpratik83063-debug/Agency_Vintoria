'use client';

import React from 'react';
import { SiteShell } from '@/components/SiteShell';
import { SectionAiAutomation } from '@/components/SectionAiAutomation';
import { SectionTechRadar } from '@/components/SectionTechRadar';

export default function AiAutomationPage() {
  return (
    <SiteShell>
      {(openConsultation) => (
        <div className="pt-16 sm:pt-20">
          {/* Dual spotlight: AI development & automation */}
          <SectionAiAutomation onOpenConsultation={(brief) => openConsultation(brief)} />

          {/* The stack behind the experience */}
          <SectionTechRadar />
        </div>
      )}
    </SiteShell>
  );
}
