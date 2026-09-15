'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Sun, Moon, Gauge, Minimize2, Maximize2, Film } from 'lucide-react';

// Cloudinary CDN first (fast edge delivery + byte-range seeks for smooth
// scroll-scrubbing), plain delivery as last-resort failover. Local
// /hero_scrub.mp4 removed from the repo to keep deploys lean.
const CLOUDINARY_VIDEO_ID = 'b4107681-7a83-4a4b-a876-4231b80f84bd';
const VIDEO_SOURCES = [
  `https://res.cloudinary.com/urtnhoyc/video/upload/f_auto,q_auto:good,w_1920/${CLOUDINARY_VIDEO_ID}.mp4`,
  `https://res.cloudinary.com/urtnhoyc/video/upload/${CLOUDINARY_VIDEO_ID}.mp4`,
];
const LOCAL_POSTER_URL = '/hero-poster.jpg';

export type AtmosphereLevel = 'vivid' | 'studio' | 'stealth';
export type VideoPlaybackMode = 'scroll-sync' | 'cinema';
type LoadStatus = 'loading' | 'ready' | 'error';

const MIN_SEEK_INTERVAL_MS = 90;
const STALL_FRAME_BUDGET = 90;

export function ScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isScrolling, setIsScrolling] = useState(false);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [loadStatus, setLoadStatus] = useState<LoadStatus>('loading');
  const [atmosphere, setAtmosphere] = useState<AtmosphereLevel>('vivid');
  const [playbackMode, setPlaybackMode] = useState<VideoPlaybackMode>('scroll-sync');
  const [scrubStalled, setScrubStalled] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(10.04);
  const [isHudCollapsed, setIsHudCollapsed] = useState(false);
  const [scrollSpeedMode, setScrollSpeedMode] = useState<'slow' | 'standard'>('slow');

  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const targetTimeRef = useRef(0);
  const smoothedTimeRef = useRef(0);
  const primedRef = useRef(false);
  const lastHudUpdateRef = useRef(0);
  const lastSeekAtRef = useRef(0);
  const lastSeekTargetRef = useRef<number | null>(null);
  const stallFramesRef = useRef(0);
  const userOverrideRef = useRef(false);
  const durationRef = useRef(10.04);
  const speedRef = useRef<'slow' | 'standard'>('slow');
  const modeRef = useRef<VideoPlaybackMode>('scroll-sync');
  const statusRef = useRef<LoadStatus>('loading');

  // Keep refs in sync so the rAF loop never goes stale (no re-subscriptions).
  useEffect(() => {
    speedRef.current = scrollSpeedMode;
  }, [scrollSpeedMode]);
  useEffect(() => {
    modeRef.current = playbackMode;
  }, [playbackMode]);
  useEffect(() => {
    statusRef.current = loadStatus;
  }, [loadStatus]);

  const videoSource = VIDEO_SOURCES[sourceIndex];
  // If scrubbing proved unworkable in this browser, cinema autoplay keeps the bg alive.
  const effectiveMode: VideoPlaybackMode = scrubStalled && !userOverrideRef.current ? 'cinema' : playbackMode;

  // Advance to next source on error; mark terminal error when exhausted.
  const handleVideoError = () => {
    if (sourceIndex < VIDEO_SOURCES.length - 1) {
      console.warn(
        `Background video failed to load (${VIDEO_SOURCES[sourceIndex]}), failing over to next source...`
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
      setDuration(video.duration);
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
    const onScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 180);

      updateTargetFromScroll();
    };

    const onResize = () => {
      updateTargetFromScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    // Initial position (top of page -> first frame).
    updateTargetFromScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Animation loop: ease the video toward the scroll target ("dheere dheere").
  // Self-healing: if issued seeks never move currentTime (browser blocks scrubbing),
  // fall back to cinema autoplay so the background ALWAYS has motion.
  useEffect(() => {
    let animId: number;

    const tick = () => {
      const video = videoRef.current;
      if (video && statusRef.current === 'ready') {
        const stalled = stallFramesRef.current >= STALL_FRAME_BUDGET;
        const mode = stalled && !userOverrideRef.current ? 'cinema' : modeRef.current;

        if (mode === 'scroll-sync') {
          if (!video.paused) {
            video.pause();
          }

          const lerpFactor = speedRef.current === 'slow' ? 0.08 : 0.14;
          const target = targetTimeRef.current;
          const diff = target - smoothedTimeRef.current;
          smoothedTimeRef.current += diff * lerpFactor;

          const maxDur = video.duration && isFinite(video.duration) ? video.duration : durationRef.current;
          const clamped = Math.max(0, Math.min(maxDur - 0.02, smoothedTimeRef.current));
          const now = performance.now();

          // Seek at most ~11x/sec: rapid-fire seeks stall Safari/Chrome (seeking
          // flag never clears) which was freezing the background.
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

          // Stall detection: did the last issued seek actually move the frame?
          if (lastSeekTargetRef.current !== null && !video.seeking) {
            const drift = Math.abs(video.currentTime - lastSeekTargetRef.current);
            if (drift > 0.25) {
              stallFramesRef.current += 1;
              if (stallFramesRef.current === STALL_FRAME_BUDGET) {
                console.warn('Scroll-scrub seeks are not moving the video; falling back to autoplay.');
                setScrubStalled(true);
              }
            } else if (drift <= 0.08) {
              stallFramesRef.current = 0;
              lastSeekTargetRef.current = null;
            }
          }

          // Throttled HUD clock (~5Hz, not 60fps).
          if (now - lastHudUpdateRef.current > 200) {
            lastHudUpdateRef.current = now;
            setCurrentTime(video.currentTime || 0);
          }
        } else {
          // Cinema mode: continuous ambient playback (user choice or auto-fallback).
          if (video.paused) {
            video.play().catch(() => {});
          }
          const now = performance.now();
          if (now - lastHudUpdateRef.current > 200) {
            lastHudUpdateRef.current = now;
            setCurrentTime(video.currentTime || 0);
          }
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  const toggleScrollSpeed = () => {
    setScrollSpeedMode((prev) => (prev === 'slow' ? 'standard' : 'slow'));
  };

  const cycleAtmosphere = () => {
    if (atmosphere === 'vivid') setAtmosphere('studio');
    else if (atmosphere === 'studio') setAtmosphere('stealth');
    else setAtmosphere('vivid');
  };

  const togglePlaybackMode = () => {
    userOverrideRef.current = true;
    const nextMode = effectiveMode === 'scroll-sync' ? 'cinema' : 'scroll-sync';
    if (nextMode === 'scroll-sync') {
      // Re-enter scrub mode: reset stall tracking from the live position.
      stallFramesRef.current = 0;
      lastSeekTargetRef.current = null;
      smoothedTimeRef.current = videoRef.current?.currentTime || 0;
      setScrubStalled(false);
    }
    setPlaybackMode(nextMode);
    if (nextMode === 'cinema' && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // Format seconds into MM:SS.S
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(1);
    return `${mins.toString().padStart(2, '0')}:${secs.padStart(4, '0')}`;
  };

  const isVideoLoaded = loadStatus === 'ready';
  const showPosterFallback = loadStatus !== 'ready';
  const statusLabel =
    loadStatus === 'error'
      ? 'Poster Mode'
      : loadStatus === 'loading'
      ? 'Loading Video…'
      : effectiveMode === 'cinema' && scrubStalled
      ? 'Auto Play (scroll-blocked)'
      : isScrolling
      ? 'Scroll Motion Active'
      : effectiveMode === 'cinema'
      ? 'Auto Play'
      : 'Idle · Scroll to Animate';

  return (
    <div
      id="scroll-video-container"
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#0a0a0a]"
      aria-hidden="true"
    >
      {/* Layer 1: Poster image — crossfades out once video is ready; slow Ken Burns
          drift keeps the bg alive even if every video source fails. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        id="scroll-video-poster"
        src={LOCAL_POSTER_URL}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          showPosterFallback ? 'opacity-100 animate-scroll-poster-drift' : 'opacity-0'
        }`}
      />

      {/* Layer 2: Main Hardware-Accelerated Video Element (scrubs on scroll, autoplays if scrub is blocked) */}
      {loadStatus !== 'error' && (
        <video
          ref={videoRef}
          key={videoSource}
          id="scroll-video-element"
          src={videoSource}
          poster={LOCAL_POSTER_URL}
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

      {/* Layer 4: Dynamic Atmosphere Scrim (Configurable darkness so the video is vividly visible!) */}
      <div
        className={`absolute inset-0 pointer-events-none transition-colors duration-700 ${
          atmosphere === 'vivid'
            ? 'bg-black/25' // Vivid Cinema: Super clear, crisp, beautiful video visibility!
            : atmosphere === 'studio'
            ? 'bg-black/45' // Studio Balanced: Balanced contrast with dark atmosphere
            : 'bg-black/68' // Stealth: Deep moody dark mode
        }`}
      />

      {/* Layer 5: Radial Vignette — keeps video bright in center, soft shadow at edges */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.6)_100%)]"
        aria-hidden="true"
      />

      {/* Layer 6: Subtle Vertical Header/Footer Gradient to protect navigation legibility */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/65"
        aria-hidden="true"
      />

      {/* Interactive Video Atmosphere HUD (Positioned bottom-right, pointer-events-auto) */}
      <div className="absolute bottom-5 right-5 z-40 pointer-events-auto hidden sm:block">
        <div className="rounded-2xl border border-white/20 bg-black/75 p-2.5 backdrop-blur-2xl shadow-2xl transition-all duration-300">
          {isHudCollapsed ? (
            <button
              onClick={() => setIsHudCollapsed(false)}
              className="flex items-center gap-2 px-2.5 py-1 text-[11px] font-mono text-white/90 hover:text-white transition"
              title="Expand Video Scroll HUD"
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  isScrolling || effectiveMode === 'cinema' ? 'bg-emerald-400 animate-ping' : 'bg-zinc-400'
                }`}
              />
              <span>
                {isScrolling ? 'SCROLLING' : effectiveMode === 'cinema' ? 'AUTO PLAY' : 'SCROLL TO ANIMATE'} ·{' '}
                {atmosphere.toUpperCase()} · {loadStatus.toUpperCase()}
              </span>
              <Maximize2 size={12} className="text-white/60" />
            </button>
          ) : (
            <div className="flex flex-col gap-2 min-w-[260px]">
              {/* Top HUD Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5 px-1">
                <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      loadStatus === 'error'
                        ? 'bg-red-400'
                        : loadStatus === 'loading'
                        ? 'bg-amber-400 animate-pulse'
                        : isScrolling || effectiveMode === 'cinema'
                        ? 'bg-emerald-400 animate-pulse ring-2 ring-emerald-400/40'
                        : 'bg-zinc-400'
                    }`}
                  />
                  <span
                    className={`font-semibold ${
                      loadStatus === 'error'
                        ? 'text-red-300'
                        : loadStatus === 'loading'
                        ? 'text-amber-300'
                        : isScrolling || effectiveMode === 'cinema'
                        ? 'text-emerald-300'
                        : 'text-zinc-300'
                    }`}
                  >
                    {statusLabel}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-mono text-[10px] text-white/70">
                    {formatTime(currentTime)}
                  </span>
                  <button
                    onClick={() => setIsHudCollapsed(true)}
                    className="text-white/40 hover:text-white p-0.5 rounded transition"
                    title="Minimize HUD"
                  >
                    <Minimize2 size={12} />
                  </button>
                </div>
              </div>

              {/* Control Buttons Row */}
              <div className="flex items-center justify-between gap-1.5 pt-0.5">
                {/* Scroll Speed Rate: Dheere Dheere vs Standard */}
                <button
                  type="button"
                  onClick={toggleScrollSpeed}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-[10px] font-mono transition active:scale-95 ${
                    scrollSpeedMode === 'slow'
                      ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                      : 'border-white/15 bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                  title="Toggle Scroll Animation Speed (Slow / Standard)"
                >
                  <Gauge size={11} className="text-emerald-400" />
                  <span>{scrollSpeedMode === 'slow' ? 'Dheere (Slow)' : 'Standard'}</span>
                </button>

                {/* Atmosphere Darkness Toggle */}
                <button
                  type="button"
                  onClick={cycleAtmosphere}
                  className="flex items-center justify-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 py-1.5 text-[10px] font-mono text-white hover:bg-white/20 transition active:scale-95"
                  title="Cycle Atmosphere Tone (Vivid / Studio / Stealth)"
                >
                  {atmosphere === 'vivid' ? (
                    <>
                      <Sun size={11} className="text-amber-300" />
                      <span className="text-amber-300 font-bold">Vivid</span>
                    </>
                  ) : atmosphere === 'studio' ? (
                    <>
                      <Film size={11} className="text-emerald-300" />
                      <span className="text-emerald-300 font-semibold">Studio</span>
                    </>
                  ) : (
                    <>
                      <Moon size={11} className="text-indigo-300" />
                      <span className="text-indigo-300 font-semibold">Stealth</span>
                    </>
                  )}
                </button>

                {/* Mode Toggle: Scroll Sync vs Auto Play */}
                <button
                  type="button"
                  onClick={togglePlaybackMode}
                  className={`flex items-center justify-center px-2 py-1.5 rounded-lg border text-[10px] font-mono transition active:scale-95 ${
                    effectiveMode === 'scroll-sync'
                      ? 'border-emerald-400/40 bg-emerald-500/20 text-emerald-300'
                      : 'border-amber-400/40 bg-amber-500/20 text-amber-300'
                  }`}
                  title={
                    effectiveMode === 'scroll-sync'
                      ? 'Currently in Scroll-Sync Mode (only moves when you scroll)'
                      : 'Currently in Continuous Auto-Play Mode'
                  }
                >
                  {effectiveMode === 'scroll-sync' ? 'Scroll Sync' : 'Auto Play'}
                </button>
              </div>

              {/* Progress Indicator Bar */}
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-0.5">
                <div
                  className="bg-emerald-400 h-full transition-all duration-150"
                  style={{
                    width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
