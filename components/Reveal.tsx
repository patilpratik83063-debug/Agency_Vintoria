'use client';

import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  duration?: number;
}

export function Reveal({
  children,
  delay = 0,
  className = '',
  id,
  direction = 'up',
  duration = 700,
}: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getInitialTransform = () => {
    switch (direction) {
      case 'down':
        return '-translate-y-8 opacity-0';
      case 'left':
        return 'translate-x-8 opacity-0';
      case 'right':
        return '-translate-x-8 opacity-0';
      case 'scale':
        return 'scale-95 opacity-0';
      case 'up':
      default:
        return 'translate-y-8 opacity-0';
    }
  };

  const getActiveTransform = () => {
    switch (direction) {
      case 'scale':
        return 'scale-100 opacity-100';
      default:
        return 'translate-y-0 translate-x-0 opacity-100';
    }
  };

  return (
    <div
      ref={ref}
      id={id}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`transform transition-all will-change-[transform,opacity] ${
        isVisible ? getActiveTransform() : getInitialTransform()
      } ${className}`}
    >
      {children}
    </div>
  );
}
