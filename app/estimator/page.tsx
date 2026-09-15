'use client';

import React from 'react';
import { SiteShell } from '@/components/SiteShell';
import { SectionEstimator } from '@/components/SectionEstimator';

export default function EstimatorPage() {
  return (
    <SiteShell>
      {(openConsultation) => (
        <div className="pt-16 sm:pt-20">
          {/* Interactive project scope & technical estimator */}
          <SectionEstimator onOpenConsultationWithBrief={(brief) => openConsultation(brief)} />
        </div>
      )}
    </SiteShell>
  );
}
