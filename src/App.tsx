import { useCallback, useState } from 'react';
import { gift } from '@/content/gift';
import { useAudio } from '@/hooks/useAudio';
import { PetalField } from '@/components/PetalEffects/PetalField';
import { IntroScene } from '@/components/IntroScene/IntroScene';
import { LyricScene } from '@/components/LyricScene/LyricScene';
import { FlowerGarden } from '@/components/FlowerGarden/FlowerGarden';
import { DetailCards } from '@/components/DetailCards/DetailCards';
import { MemoryLetter } from '@/components/MemoryLetter/MemoryLetter';
import { LoveLetter } from '@/components/LoveLetter/LoveLetter';
import { FinalScene } from '@/components/FinalScene/FinalScene';
import { MusicPlayer } from '@/components/MusicPlayer/MusicPlayer';
import { LyricsDebugPanel } from '@/components/LyricsDebug/LyricsDebugPanel';
import { useLyricsTimeline } from '@/hooks/useLyrics';

const lyricsDebug = new URLSearchParams(window.location.search).has('lyrics-debug');

export default function App() {
  const audio = useAudio(gift.audio.src);
  const [lyrics, setLyrics] = useLyricsTimeline(lyricsDebug);
  const [openedIds, setOpenedIds] = useState<string[]>([]);
  const [runKey, setRunKey] = useState(0);

  const flowers = gift.garden.flowers;
  const openedCount = flowers.filter((f) => openedIds.includes(f.id)).length;
  const progress = openedCount / flowers.length;

  const handleOpenFlower = useCallback((id: string) => {
    setOpenedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const handleRestart = () => {
    setOpenedIds([]);
    setRunKey((k) => k + 1);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className={`relative min-h-[100dvh] overflow-x-hidden bg-ivory pe-[env(safe-area-inset-right)] ps-[env(safe-area-inset-left)] ${audio.isPlaying ? 'is-music-playing' : ''}`}>
      <PetalField />
      <main key={runKey} className="relative z-10 pb-24 md:pb-0">
        <IntroScene onOpen={audio.play} />
        <LyricScene audio={audio} phrases={lyrics} />
        <FlowerGarden openedIds={openedIds} onOpen={handleOpenFlower} />
        <DetailCards />
        <MemoryLetter />
        <LoveLetter />
        <FinalScene progress={progress} onRestart={handleRestart} />
      </main>
      <MusicPlayer audio={audio} />
      {lyricsDebug && (
        <LyricsDebugPanel
          phrases={lyrics}
          onChange={setLyrics}
          getTime={audio.getTime}
          isPlaying={audio.isPlaying}
          onToggle={audio.toggle}
          onSeek={audio.seek}
        />
      )}
    </div>
  );
}
