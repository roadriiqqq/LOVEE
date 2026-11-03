import { useCallback, useEffect, useRef, useState } from 'react';
import type { AudioControls } from '@/hooks/useAudio';
import type { LyricPhrase } from '@/content/lyricsTimeline';

export type LyricScenePhase = 'idle' | 'awaiting-playback' | 'playing' | 'paused' | 'completed';

interface UseLyricSceneArgs {
  audio: AudioControls;
  phrases: LyricPhrase[];
  /** Bounding rect threshold (0..1) to consider the scene entered. */
  threshold?: number;
}

function activeIndexAt(ms: number, phrases: LyricPhrase[]): number {
  return phrases.findIndex(
    (p) => p.startMs !== null && p.endMs !== null && ms >= p.startMs && ms < p.endMs,
  );
}

/**
 * Audio-driven lyric scene controller.
 *
 * The only source of time truth is audio.currentTime (via getTime). No timers.
 * Completion is reached when currentTime passes the final phrase's endMs, NOT
 * when the audio file ends. Scroll locking is directional: once locked, down
 * scroll is intercepted while the scene is in view; up scroll always works.
 */
export function useLyricScene({ audio, phrases, threshold = 0.55 }: UseLyricSceneArgs) {
  const { getTime, isPlaying, hasError, ended } = audio;
  const finalEndMs = phrases[phrases.length - 1]?.endMs ?? Infinity;

  const [phase, setPhase] = useState<LyricScenePhase>('idle');
  const [active, setActive] = useState(-1);
  const [progress, setProgress] = useState(0); // 0..1 through the lyric timeline

  const sceneRef = useRef<HTMLElement | null>(null);
  const inViewRef = useRef(false);
  const lockedRef = useRef(false);
  const completedRef = useRef(false);

  // Resolve phase from audio time + playback state. Runs every animation frame.
  useEffect(() => {
    let frame = 0;
    let lastActive = -2;
    let lastPhase: LyricScenePhase | null = null;
    let lastProgress = -1;

    const tick = () => {
      const ms = getTime() * 1000;
      const completed = ms >= finalEndMs || ended;

      if (completed && !completedRef.current) {
        completedRef.current = true;
      }

      // Active phrase + progress
      const idx = activeIndexAt(ms, phrases);
      if (idx !== lastActive) {
        lastActive = idx;
        setActive(idx);
      }
      const prog = finalEndMs > 0 ? Math.min(1, Math.max(0, ms / finalEndMs)) : 0;
      if (Math.abs(prog - lastProgress) > 0.001) {
        lastProgress = prog;
        setProgress(prog);
      }

      // Phase resolution — only while scene is in view or completed
      let next: LyricScenePhase = phase;
      if (completedRef.current) {
        next = 'completed';
      } else if (hasError) {
        next = 'idle'; // never lock; let user scroll past
      } else if (inViewRef.current) {
        if (ms >= finalEndMs) next = 'completed';
        else if (isPlaying) next = 'playing';
        else if (ms > 0) next = 'paused';
        else next = 'awaiting-playback';
      } else if (phase !== 'idle') {
        // left the scene before completing and audio paused or not started: keep last meaningful state
        next = phase === 'completed' ? 'completed' : phase;
      }

      if (next !== lastPhase) {
        lastPhase = next;
        setPhase(next);
      }

      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [getTime, isPlaying, hasError, ended, phrases, finalEndMs, phase]);

  // Observe scene visibility to drive entry/exit.
  useEffect(() => {
    const node = sceneRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  // Safety net: if audio ends before final lyric (bad data), unlock so the
  // visitor is never trapped. The `ended` flag is reset by useAudio on
  // play/seek, so this only fires for a true end-of-file while still locked.
  useEffect(() => {
    if (!audio.ended) return;
    if (completedRef.current) return;
    if (!inViewRef.current) return;
    completedRef.current = true;
    setPhase('completed');
  }, [audio.ended]);

  const unlock = useCallback(() => {
    lockedRef.current = false;
  }, []);

  const lock = useCallback(() => {
    lockedRef.current = true;
  }, []);

  // Apply lock state based on phase + visibility. Re-run whenever phase changes.
  useEffect(() => {
    if (phase === 'completed') {
      unlock();
      return;
    }
    if (hasError) {
      unlock();
      return;
    }
    if (inViewRef.current && (phase === 'awaiting-playback' || phase === 'playing' || phase === 'paused')) {
      lock();
    } else if (!inViewRef.current) {
      unlock();
    }
  }, [phase, hasError, lock, unlock]);

  // Directional wheel/touch guard: block downward scroll while locked, allow up.
  useEffect(() => {
    if (phase === 'completed' || hasError) return;
    const node = sceneRef.current;
    if (!node) return;

    const shouldGuard = () => lockedRef.current && inViewRef.current;

    const onWheel = (e: WheelEvent) => {
      if (!shouldGuard()) return;
      if (e.deltaY <= 0) return; // allow scrolling up to previous sections
      e.preventDefault();
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!shouldGuard()) return;
      const dy = (e.touches[0]?.clientY ?? 0) - touchStartY;
      if (dy >= 0) return; // swiping down-to-up (finger down moves content up => scroll up)
      e.preventDefault();
    };

    const onKey = (e: KeyboardEvent) => {
      if (!shouldGuard()) return;
      if (['PageDown', 'ArrowDown', ' ', 'Spacebar'].includes(e.key)) e.preventDefault();
    };

    node.addEventListener('wheel', onWheel, { passive: false });
    node.addEventListener('touchstart', onTouchStart, { passive: true });
    node.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      node.removeEventListener('wheel', onWheel);
      node.removeEventListener('touchstart', onTouchStart);
      node.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKey);
    };
  }, [phase, hasError]);

  const start = useCallback(() => audio.play(), [audio]);

  const resume = useCallback(() => audio.play(), [audio]);

  return {
    sceneRef,
    phase,
    active,
    progress,
    completed: completedRef.current,
    start,
    resume,
  };
}
