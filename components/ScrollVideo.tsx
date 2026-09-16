'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useMediaQuery, useIsClient } from '@/lib/useMediaQuery';

// Cloudinary hero video. The poster is the video's own first frame, so the
// poster -> video handoff is seamless (no "old image" flash). Desktop gets
// full-HD; mobile (<768px) gets a ~4x lighter 960p eco variant.
const CLOUDINARY_VIDEO_ID = 'b4107681-7a83-4a4b-a876-4231b80f84bd';
const CLOUDINARY_BASE = 'https://res.cloudinary.com/urtnhoyc';
export const HERO_POSTER_URL = `${CLOUDINARY_BASE}/video/upload/w_1280,q_auto:good,so_0/f_jpg/${CLOUDINARY_VIDEO_ID}.jpg`;
const LOCAL_POSTER_FALLBACK = '/hero-poster.jpg';
const DESKTOP_SOURCES = [
  `${CLOUDINARY_BASE}/video/upload/f_auto,q_auto:good,w_1920/${CLOUDINARY_VIDEO_ID}.mp4`,
  `${CLOUDINARY_BASE}/video/upload/${CLOUDINARY_VIDEO_ID}.mp4`,
];
const MOBILE_SOURCES = [
  `${CLOUDINARY_BASE}/video/upload/f_auto,q_auto:eco,w_960/${CLOUDINARY_VIDEO_ID}.mp4`,
  `${CLOUDINARY_BASE}/video/upload/f_auto,q_auto:good,w_1920/${CLOUDINARY_VIDEO_ID}.mp4`,
];
const MOBILE_BREAKPOINT = 768;

type LoadStatus = 'loading' | 'ready' | 'error';

const MIN_SEEK_INTERVAL_MS = 90;
const STALL_FRAME_BUDGET = 90;
const LERP_FACTOR = 0.08;

export function ScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [sourceIndex, setSourceIndex] = useState(0);
  const [posterUrl, setPosterUrl] = useState(HERO_POSTER_URL);
  const [loadStatus, setLoadStatus] = useState<LoadStatus>('loading');

  // SSR-safe client detection (the <video> mounts only after hydration so
  // the server never fetches the wrong variant).
  const isMounted = useIsClient();
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
  // Reduced motion: skip the video entirely and show the static poster.
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const targetTimeRef = useRef(0);
  const smoothedTimeRef = useRef(0);
  const primedRef = useRef(false);
  const lastSeekAtRef = useRef(0);
  const lastSeekTargetRef = useRef<number | null>(null);
  const stallFramesRef = useRef(0);
  const cinemaRef = useRef(false);
  const durationRef = useRef(10.04);
  const statusRef = useRef<LoadStatus>('loading');

  // Keep the status ref in sync so the rAF loop never goes stale.
  useEffect(() => {
    statusRef.current = loadStatus;
  }, [loadStatus]);

  const SOURCES = isMobile ? MOBILE_SOURCES : DESKTOP_SOURCES;
  const videoSource = SOURCES[Math.min(sourceIndex, SOURCES.length - 1)];

  // Advance to next source on error; mark terminal error when exhausted.
  const handleVideoError = () => {
    if (sourceIndex < SOURCES.length - 1) {
      console.warn(
        `Background video failed to load (${SOURCES[sourceIndex]}), failing over to next source...`
      );
      primedRef.current = false;
      stallFramesRef.current = 0;
      lastSeekTargetRef.current = null;
      setLoadStatus('loading');
      setSourceIndex((i) => i + 1);
    } else {
      console.error('All background video sources failed. Falling back to animated poster.');
      setLoadStatus('error');
    }
  };

  // Metadata gives us the true duration before any seeking happens.
  const handleMetadata = () => {
    const video = videoRef.current;
    if (video && video.duration && !isNaN(video.duration) && isFinite(video.duration)) {
      durationRef.current = video.duration;
    }
  };

  // Prime the decoder exactly once per source, then hand control to the scrub loop.
  const handleVideoReady = () => {
    const video = videoRef.current;
    if (!video) return;
    handleMetadata();
    if (!primedRef.current) {
      primedRef.current = true;
      try {
        video.pause();
        if (video.currentTime === 0) {
          video.currentTime = 0.01;
        }
      } catch {
        /* seeking not allowed yet — scrub loop will recover once data arrives */
      }
    }
    if (statusRef.current !== 'ready') {
      setLoadStatus('ready');
    }
  };

  // Map page scroll (0..1) linearly onto the video timeline (no modulo wrap jumps).
  const updateTargetFromScroll = () => {
    const currentScrollY = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const innerHeight = window.innerHeight;
    const maxScroll = Math.max(1, scrollHeight - innerHeight);

    const progress = Math.min(1, Math.max(0, currentScrollY / maxScroll));
    const videoDuration = durationRef.current || 10.04;
    targetTimeRef.current = progress * Math.max(0.01, videoDuration - 0.05);
  };

  // Scroll + resize listeners: recompute target strictly from user scroll position.
  useEffect(() => {
    window.addEventListener('scroll', updateTargetFromScroll, { passive: true });
    window.addEventListener('resize', updateTargetFromScroll);
    // Initial position (top of page -> first frame).
    updateTargetFromScroll();

    return () => {
      window.removeEventListener('scroll', updateTargetFromScroll);
      window.removeEventListener('resize', updateTargetFromScroll);
    };
  }, []);

  const seekTo = (video: HTMLVideoElement, t: number) => {
    try {
      const fastSeek = (video as HTMLVideoElement & { fastSeek?: (t: number) => void }).fastSeek;
      if (typeof fastSeek === 'function') {
        fastSeek.call(video, t);
      } else {
        video.currentTime = t;
      }
    } catch {
      try {
        video.currentTime = t;
      } catch {
        /* browser refused seek — retry on next frame */
      }
    }
  };

  // Animation loop: ease the video toward the scroll target. Self-healing:
  // if issued seeks never move currentTime (browser blocks scrubbing), fall
  // back to cinema autoplay so the background ALWAYS has motion. Stops the
  // loop entirely once the terminal poster fallback is in charge.
  useEffect(() => {
    let animId: number;

    const tick = () => {
      const video = videoRef.current;
      if (video && statusRef.current === 'ready') {
        // Stall detection: did the last issued seek actually move the frame?
        if (!cinemaRef.current && lastSeekTargetRef.current !== null && !video.seeking) {
          const drift = Math.abs(video.currentTime - lastSeekTargetRef.current);
          if (drift > 0.25) {
            stallFramesRef.current += 1;
            if (stallFramesRef.current >= STALL_FRAME_BUDGET) {
              console.warn('Scroll-scrub seeks are not moving the video; falling back to autoplay.');
              cinemaRef.current = true;
            }
          } else if (drift <= 0.08) {
            stallFramesRef.current = 0;
            lastSeekTargetRef.current = null;
          }
        }

        if (!cinemaRef.current) {
          if (!video.paused) {
            video.pause();
          }

          const diff = targetTimeRef.current - smoothedTimeRef.current;
          smoothedTimeRef.current += diff * LERP_FACTOR;

          const maxDur = video.duration && isFinite(video.duration) ? video.duration : durationRef.current;
          const clamped = Math.max(0, Math.min(maxDur - 0.02, smoothedTimeRef.current));
          const now = performance.now();

          // Seek at most ~11x/sec: rapid-fire seeks stall Safari/Chrome
          // (seeking flag never clears) which was freezing the background.
          if (
            !video.seeking &&
            video.readyState >= 1 &&
            Math.abs(video.currentTime - clamped) > 0.03 &&
            now - lastSeekAtRef.current > MIN_SEEK_INTERVAL_MS
          ) {
            lastSeekAtRef.current = now;
            lastSeekTargetRef.current = clamped;
            seekTo(video, clamped);
          }
        } else if (video.paused) {
          // Cinema fallback: continuous ambient playback.
          video.play().catch(() => {});
        }
      }

      animId = requestAnimationFrame(tick);
    };

    if (loadStatus !== 'error') {
      animId = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(animId);
  }, [loadStatus]);

  const isVideoLoaded = loadStatus === 'ready';
  const showPosterFallback = loadStatus !== 'ready';

  const renderVideo = isMounted && loadStatus !== 'error' && !prefersReducedMotion;

  return (
    <div
      id="scroll-video-container"
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-base"
      aria-hidden="true"
    >
      {/* Layer 1: Poster is the video's own first frame — instant paint, then a
          seamless crossfade when the video is ready. Falls back to the local
          poster if Cloudinary is unreachable. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        id="scroll-video-poster"
        src={posterUrl}
        onError={() => {
          if (posterUrl !== LOCAL_POSTER_FALLBACK) setPosterUrl(LOCAL_POSTER_FALLBACK);
        }}
        alt=""
        fetchPriority="high"
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          showPosterFallback && !prefersReducedMotion
            ? 'opacity-100 animate-scroll-poster-drift'
            : 'opacity-100'
        }`}
      />

      {/* Layer 2: Main Hardware-Accelerated Video Element (scrubs on scroll, autoplays if scrub is blocked). */}
      {renderVideo && (
        <video
          ref={videoRef}
          key={videoSource}
          id="scroll-video-element"
          src={videoSource}
          poster={posterUrl}
          muted
          loop
          playsInline
          preload="auto"
          // @ts-expect-error fetchPriority is valid on video in React 19
          fetchPriority="high"
          disablePictureInPicture
          controlsList="nodownload"
          tabIndex={-1}
          onLoadedMetadata={handleMetadata}
          onLoadedData={handleVideoReady}
          onCanPlay={handleVideoReady}
          onError={handleVideoError}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Layer 3: Ultra-Fine Sci-Fi Scanline Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px]"
        aria-hidden="true"
      />

      {/* Layer 4: Atmosphere Scrim — dark enough that text sits on the
          video without per-element drop-shadow band-aids. */}
      <div className="absolute inset-0 pointer-events-none bg-black/45" />

      {/* Layer 5: Radial Vignette — keeps video bright in center, soft shadow at edges */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.65)_100%)]"
        aria-hidden="true"
      />

      {/* Layer 6: Subtle Vertical Header/Footer Gradient to protect navigation legibility */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/65"
        aria-hidden="true"
      />
    </div>
  );
}
