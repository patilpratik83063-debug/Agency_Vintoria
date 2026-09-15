'use client';

import React from 'react';
import { SiteShell } from '@/components/SiteShell';
import { SectionHero } from '@/components/SectionHero';
import { ScrollChapters } from '@/components/ScrollChapters';

export default function Home() {
  return (
    <SiteShell>
      {(openConsultation) => (
        <>
          {/* Minimal hero over the video */}
          <SectionHero onOpenConsultation={() => openConsultation('Direct inquiry for Founders')} />

          {/* Long cinematic scroll — one whisper-quiet chapter per screen so the
              background video scrubs slowly from start to finish */}
          <ScrollChapters />
        </>
      )}
    </SiteShell>
  );
}
