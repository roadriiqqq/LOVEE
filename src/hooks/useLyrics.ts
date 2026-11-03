import { useEffect, useState } from 'react';
import { lyricsTimeline, type LyricPhrase } from '@/content/lyricsTimeline';

const STORAGE_KEY = 'lyrics-calibration';

export function useLyricsTimeline(enabled: boolean) {
  const [phrases, setPhrases] = useState<LyricPhrase[]>(() => {
    if (!enabled) return lyricsTimeline;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as LyricPhrase[]) : lyricsTimeline;
    } catch {
      return lyricsTimeline;
    }
  });

  useEffect(() => {
    if (enabled) localStorage.setItem(STORAGE_KEY, JSON.stringify(phrases));
  }, [enabled, phrases]);

  return [phrases, setPhrases] as const;
}

export function useActivePhrase(getTime: () => number, phrases: LyricPhrase[]) {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    let frame = 0;
    let last = -2;
    const tick = () => {
      const ms = getTime() * 1000;
      const index = phrases.findIndex(
        (p) => p.startMs !== null && p.endMs !== null && ms >= p.startMs && ms < p.endMs,
      );
      if (index !== last) {
        last = index;
        setActive(index);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [getTime, phrases]);

  return active;
}
