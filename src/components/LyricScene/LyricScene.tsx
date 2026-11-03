import { useEffect, useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { gift } from '@/content/gift';
import type { LyricPhrase } from '@/content/lyricsTimeline';
import type { AudioControls } from '@/hooks/useAudio';
import { useLyricScene } from '@/hooks/useLyricScene';
import { IllustratedGirl } from '@/components/IllustratedGirl/IllustratedGirl';
import { Bloom } from '@/components/FlowerGarden/Bloom';
import { SyncedLyrics } from '@/components/PoemSequence/SyncedLyrics';
import { PetalBurst } from '@/components/PetalEffects/PetalField';

type SceneFlower = (typeof gift.lyricScene.flowers)[number];

interface LyricSceneProps {
  audio: AudioControls;
  phrases: LyricPhrase[];
}

export function LyricScene({ audio, phrases }: LyricSceneProps) {
  const content = gift.lyricScene;
  const { sceneRef, phase, active, progress, start, resume } = useLyricScene({ audio, phrases });
  const [selectedFlower, setSelectedFlower] = useState<string | null>(null);
  const [phraseBurst, setPhraseBurst] = useState(0);
  const finalPhrase = phrases[phrases.length - 1];
  const activePhrase = active >= 0 ? phrases[active] : undefined;
  const finalVisible = activePhrase === finalPhrase;

  useEffect(() => {
    setPhraseBurst((value) => value + 1);
  }, [active]);

  const showIntro = phase === 'idle' || phase === 'awaiting-playback';
  const paused = phase === 'paused';
  const error = audio.hasError;

  return (
    <section
      ref={sceneRef}
      id="poem"
      className={`relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-20 text-center transition-colors duration-1000 ${finalVisible ? 'bg-burgundy-wash/30' : ''}`}
    >
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center">
        <div className="relative flex h-[min(38svh,330px)] w-[min(52vw,330px)] min-w-[190px] items-center justify-center md:h-[370px] md:w-[300px]">
          <IllustratedGirl className={`music-reactive-soft h-full w-full transition-transform duration-1000 ${finalVisible ? 'scale-[1.04]' : ''}`} />
          {gift.lyricScene.flowers.map((flower, index) => (
            <SceneFlowerButton
              key={flower.id}
              flower={flower}
              index={index}
              progress={progress}
              selected={selectedFlower === flower.id}
              onSelect={() => setSelectedFlower((current) => (current === flower.id ? null : flower.id))}
            />
          ))}
        </div>

        <div className="relative mt-5 w-full max-w-2xl px-2">
          <SyncedLyrics getTime={audio.getTime} phrases={phrases} />
          {phraseBurst > 0 && phase === 'playing' && <PetalBurst key={phraseBurst} tone="terracotta" onDone={() => undefined} />}
        </div>

        <div className="mt-7 flex items-center gap-2" role="list" aria-label="تقدم الكلمات">
          {phrases.map((phrase, index) => {
            const done = progress >= 1 || (phrase.endMs !== null && audio.getTime() * 1000 >= phrase.endMs);
            return (
              <span
                key={`${phrase.text}-${index}`}
                role="listitem"
                aria-label={phrase.text}
                className={`h-2 rounded-full transition-all duration-700 ${index === active ? 'w-7 bg-terracotta' : done ? 'w-2 bg-burgundy/70' : 'w-2 bg-ink/15'}`}
              />
            );
          })}
        </div>

        {showIntro && !error && (
          <div className="mt-8 animate-fade-up">
            <p className="text-sm text-ink-muted">{content.awaitingPrompt}</p>
            <button
              type="button"
              onClick={start}
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-burgundy px-6 py-3 text-sm font-semibold text-paper transition hover:bg-burgundy-deep"
            >
              <Play className="h-4 w-4" />
              {content.playButton}
            </button>
          </div>
        )}

        {paused && !error && (
          <div className="mt-7 animate-fade-up rounded-2xl bg-paper/80 px-6 py-4 shadow-sm ring-1 ring-ink/5">
            <p className="font-semibold text-burgundy">{content.pausedLabel}</p>
            <p className="mt-1 text-sm text-ink-muted">{content.pausedPrompt}</p>
            <button
              type="button"
              onClick={resume}
              className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-full border border-burgundy/25 px-5 py-2 text-sm font-semibold text-burgundy transition hover:bg-burgundy hover:text-paper"
            >
              <Play className="h-4 w-4" />
              {content.resumeButton}
            </button>
          </div>
        )}

        {error && (
          <div className="mt-7 animate-fade-up rounded-2xl bg-paper px-6 py-4 shadow-sm ring-1 ring-terracotta/20">
            <p className="font-semibold text-terracotta-deep">{content.errorTitle}</p>
            <p className="mt-1 text-sm text-ink-muted">{content.errorPrompt}</p>
            <a href="#garden" className="mt-3 inline-flex min-h-10 items-center rounded-full bg-ink px-5 py-2 text-sm font-semibold text-paper">
              {content.errorButton}
            </a>
          </div>
        )}

        {phase === 'completed' && (
          <div className="mt-8 animate-fade-up">
            <p className="font-display text-xl font-semibold text-burgundy">{content.completedLine}</p>
            <a href="#garden" className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2 text-sm text-ink transition hover:bg-ink hover:text-paper">
              <RotateCcw className="h-4 w-4 rotate-180" />
              {gift.poem.gardenButton}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

interface SceneFlowerButtonProps {
  flower: SceneFlower;
  index: number;
  progress: number;
  selected: boolean;
  onSelect: () => void;
}

function SceneFlowerButton({ flower, index, progress, selected, onSelect }: SceneFlowerButtonProps) {
  const open = progress >= (index + 1) / 6 || selected;

  return (
    <button
      type="button"
      aria-label={flower.label}
      aria-pressed={selected}
      onClick={onSelect}
      className="absolute z-20 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full touch-manipulation transition-transform duration-700 hover:scale-110 focus-visible:ring-2 focus-visible:ring-terracotta"
      style={{ left: `${flower.position.x}%`, top: `${flower.position.y}%` }}
    >
      <Bloom tone={flower.tone} className={`mx-auto h-full w-full transition-transform duration-1000 ${open ? 'scale-100 animate-sway' : 'scale-75 opacity-80'} ${selected ? 'rotate-12' : ''}`} />
      {selected && (
        <span className="absolute left-1/2 top-full mt-1 w-max max-w-28 -translate-x-1/2 rounded-full bg-paper/95 px-2 py-1 text-[11px] text-burgundy shadow-sm ring-1 ring-ink/5">
          {flower.label}
        </span>
      )}
    </button>
  );
}
