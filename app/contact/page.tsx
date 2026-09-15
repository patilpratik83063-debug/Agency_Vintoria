'use client';

import React from 'react';
import { SiteShell } from '@/components/SiteShell';
import { SectionContact } from '@/components/SectionContact';
import { SectionSocialChannels } from '@/components/SectionSocialChannels';

export default function ContactPage() {
  return (
    <SiteShell>
      {() => (
        <div className="pt-16 sm:pt-20">
          {/* Project brief portal */}
          <SectionContact />

          {/* Official social channels & WhatsApp direct connect */}
          <SectionSocialChannels />
        </div>
      )}
    </SiteShell>
  );
}
