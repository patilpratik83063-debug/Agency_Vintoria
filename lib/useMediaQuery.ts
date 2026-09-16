'use client';

import { useCallback, useSyncExternalStore } from 'react';

const noopSubscribe = () => () => {};

/** True only after client hydration — the standard mounted idiom. */
export function useIsClient(): boolean {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

/**
 * SSR-safe media-query subscription via useSyncExternalStore — no
 * setState-in-effect, and the value is correct on first client render.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}
