'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export const FOUNDERS = [
  {
    id: 'abhishek-kogle',
    name: 'Abhishek Kogle',
    shortName: 'Abhishek',
    role: 'Founder',
    image: '/founder.jpg',
    thumb: '/founder-thumb.jpg',
    whatsapp:
      'https://wa.me/918766033979?text=Hi%20Abhishek,%20I%20would%20like%20to%20discuss%20a%20project%20at%20Vintoria',
  },
  {
    id: 'pratik-patil',
    name: 'Pratik Patil',
    shortName: 'Pratik',
    role: 'Co-Founder',
    image: '/co-founder.jpg',
    thumb: '/co-founder-thumb.jpg',
    whatsapp:
      'https://wa.me/918766033979?text=Hi%20Pratik,%20I%20would%20like%20to%20discuss%20a%20project%20at%20Vintoria',
  },
] as const;

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
        <div className="text-xs font-bold text-white">Abhishek Kogle &amp; Pratik Patil</div>
        <div className="font-mono text-[10px] uppercase tracking-wider text-emerald-400">
          Founder &amp; Co-Founder · Vintoria
        </div>
      </div>
      <span className="ml-1 h-2 w-2 shrink-0 rounded-full bg-emerald-400 animate-pulse" />
    </div>
  );
}
