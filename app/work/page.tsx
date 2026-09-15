'use client';

import React from 'react';
import { SiteShell } from '@/components/SiteShell';
import { SectionProjects } from '@/components/SectionProjects';
import { SectionTestimonials } from '@/components/SectionTestimonials';

export default function WorkPage() {
  return (
    <SiteShell>
      {() => (
        <div className="pt-16 sm:pt-20">
          {/* Selected works & flagship case studies */}
          <SectionProjects />

          {/* Client testimonials & endorsements */}
          <SectionTestimonials />
        </div>
      )}
    </SiteShell>
  );
}
