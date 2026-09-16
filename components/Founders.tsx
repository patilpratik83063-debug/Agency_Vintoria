'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { FOUNDER_PROFILES } from '@/lib/brandContent';

export const FOUNDERS = FOUNDER_PROFILES;

const AVATAR_SIZES = {
  xs: 'h-6 w-6',
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
} as const;

export type FounderAvatarSize = keyof typeof AVATAR_SIZES;

interface FounderAvatarsProps {
  size?: FounderAvatarSize;
  className?: string;
  ringClassName?: string;
}

/** Overlapping stacked face-crop avatars of both founders. */
export function FounderAvatars({ size = 'md', className, ringClassName = 'ring-black' }: FounderAvatarsProps) {
  return (
    <span className={cn('inline-flex -space-x-3 overflow-visible', className)}>
      {FOUNDERS.map((f) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={f.id}
          src={f.thumb}
          alt={f.name}
          title={`${f.name} · ${f.role}`}
          loading="lazy"
          className={cn(
            AVATAR_SIZES[size],
            'rounded-full border border-white/25 object-cover shadow-md ring-2',
            ringClassName
          )}
        />
      ))}
    </span>
  );
}

interface FounderCardProps {
  className?: string;
  compact?: boolean;
}

/** Mini leadership card: avatars + names + roles. Drop into any section. */
export function FounderCard({ className, compact = false }: FounderCardProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <FounderAvatars size={compact ? 'sm' : 'md'} />
      <div>
        <div className="text-sm font-bold text-white">Abhishek Kogle &amp; Pratik Patil</div>
        <div className="font-mono text-xs uppercase tracking-wider text-emerald-300">
          Founder &amp; Co-Founder · Vintoria
        </div>
      </div>
      <span className="ml-1 h-2 w-2 shrink-0 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
    </div>
  );
}
