import type { LyricPhrase } from '@/content/lyricsTimeline';
import { useActivePhrase } from '@/hooks/useLyrics';

interface SyncedLyricsProps {
  getTime: () => number;
  phrases: LyricPhrase[];
}

export function SyncedLyrics({ getTime, phrases }: SyncedLyricsProps) {
  const active = useActivePhrase(getTime, phrases);

  return (
    <div className="grid min-h-[5.5rem] place-items-center text-center md:min-h-[6.5rem]" aria-live="polite">
      {phrases.map((phrase, i) => {
        const isActive = i === active;
        return (
          <p
            key={i}
            aria-hidden={!isActive}
            className={`font-display text-[clamp(1.35rem,6vw,1.875rem)] font-semibold leading-[1.6] text-burgundy transition-opacity ease-in-out md:text-3xl [grid-area:1/1] ${isActive ? 'opacity-100 duration-700 delay-500' : 'opacity-0 duration-500 delay-0'}`}
          >
            {phrase.text}
          </p>
        );
      })}
    </div>
  );
}
