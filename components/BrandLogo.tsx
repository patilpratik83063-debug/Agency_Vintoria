'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const LOGO_SRC = '/logo.jpg';

const SIZE_MAP = {
  xs: 'h-4 w-4 rounded-[4px]',
  sm: 'h-7 w-7 rounded-lg',
  md: 'h-9 w-9 rounded-xl',
  lg: 'h-14 w-14 rounded-2xl',
  xl: 'h-20 w-20 rounded-2xl',
} as const;

export type BrandLogoSize = keyof typeof SIZE_MAP;

interface BrandLogoProps {
  size?: BrandLogoSize;
  className?: string;
  bordered?: boolean;
}

/** Standalone Vintoria logo mark (logo.jpg) used consistently across the whole site. */
export function BrandLogo({ size = 'md', className, bordered = true }: BrandLogoProps) {
  return (
    <span
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-black/80 shadow-lg',
        bordered && 'border border-white/30',
        SIZE_MAP[size],
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={LOGO_SRC} alt="Vintoria" className="h-full w-full object-cover" loading="eager" decoding="async" />
    </span>
  );
}

interface BrandLockupProps {
  size?: BrandLogoSize;
  wordmark?: string;
  wordmarkSuffix?: string;
  href?: string;
  className?: string;
}

/** Logo + wordmark lockup linking home. Drop-in for navbars, footers, drawers, banners. */
export function BrandLockup({
  size = 'md',
  wordmark = 'VINTORIA',
  wordmarkSuffix = '®',
  href = '/',
  className,
}: BrandLockupProps) {
  return (
    <Link
      href={href}
      className={cn('group flex items-center gap-2.5 text-white transition-opacity hover:opacity-90', className)}
      aria-label="Vintoria Home"
    >
      <span className="transition-transform duration-300 group-hover:scale-105">
        <BrandLogo size={size} />
      </span>
      <span className="font-mono text-xl font-bold tracking-tight text-white">
        {wordmark}
        {wordmarkSuffix && <span className="text-emerald-400">{wordmarkSuffix}</span>}
      </span>
    </Link>
  );
}
