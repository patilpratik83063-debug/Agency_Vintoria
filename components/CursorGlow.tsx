'use client';

import React, { useEffect, useRef } from 'react';

export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop devices with hover support
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const el = dotRef.current;
    if (!el) return;

    let visible = false;

    const handleMouseMove = (e: MouseEvent) => {
      // Write the transform directly — a React state update per mouse
      // event re-renders the whole shell at pointer rate.
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if (!visible) {
        visible = true;
        el.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      visible = false;
      el.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed left-0 top-0 z-30 opacity-0 transition-opacity duration-300 will-change-transform"
      aria-hidden="true"
    >
      <div className="h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial from-white/[0.04] to-transparent blur-2xl" />
    </div>
  );
}
