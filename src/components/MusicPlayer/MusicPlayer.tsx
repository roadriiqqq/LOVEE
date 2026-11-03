import { useEffect, useState } from 'react';
import { ChevronUp, Pause, Play, Repeat, Volume2, VolumeX } from 'lucide-react';
import { gift } from '@/content/gift';
import type { AudioControls } from '@/hooks/useAudio';

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const total = Math.floor(seconds);
  const mins = Math.floor(total / 60);
  const secs = String(total % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}

function useLiveTime(getTime: () => number, isPlaying: boolean) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    let frame = 0;
    const tick = () => {
      setTime(getTime());
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [getTime, isPlaying]);

  return [time, setTime] as const;
}

export function MusicPlayer({ audio }: { audio: AudioControls }) {
  const [expanded, setExpanded] = useState(false);
  const { title, missingMessage } = gift.audio;
  const { getTime, isPlaying, duration, volume, muted, repeat, hasError, toggle, seek, changeVolume, toggleMute, toggleRepeat } = audio;
  const [time, setTime] = useLiveTime(getTime, isPlaying);
  const progress = duration > 0 ? Math.min(time / duration, 1) : 0;
  const showExpanded = expanded && !hasError;

  const handleSeek = (value: number) => {
    seek(value);
    setTime(value);
  };

  return (
    <div className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] end-[max(0.75rem,env(safe-area-inset-right))] z-40 w-[min(22rem,calc(100vw-1.5rem))] md:bottom-6 md:end-6">
      <div className="overflow-hidden rounded-2xl bg-paper shadow-[0_12px_32px_-20px_rgba(25,24,23,0.45)] ring-1 ring-ink/10">
        <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${showExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
          <div className={`min-h-0 overflow-hidden transition-[visibility] duration-300 ${showExpanded ? 'visible' : 'invisible'}`}>
            <div className="space-y-2 px-4 pb-2 pt-3">
              <div className="flex items-center gap-2" dir="ltr">
                <span className="w-10 shrink-0 text-xs tabular-nums text-ink-muted">{formatTime(time)}</span>
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.1}
                  value={Math.min(time, duration || 0)}
                  onChange={(e) => handleSeek(Number(e.target.value))}
                  disabled={duration === 0}
                  aria-label="تقدم الأغنية"
                  className="h-11 min-w-0 flex-1 accent-burgundy disabled:opacity-40"
                />
                <span className="w-10 shrink-0 text-end text-xs tabular-nums text-ink-muted">{formatTime(duration)}</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted ? 'إلغاء الكتم' : 'كتم الصوت'}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink-soft transition hover:bg-ivory hover:text-ink active:scale-95"
                >
                  {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={muted ? 0 : volume}
                  onChange={(e) => changeVolume(Number(e.target.value))}
                  aria-label="مستوى الصوت"
                  className="h-11 min-w-0 flex-1 accent-botanical"
                />
                <button
                  type="button"
                  onClick={toggleRepeat}
                  aria-label="تكرار الأغنية"
                  aria-pressed={repeat}
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition active:scale-95 ${repeat ? 'bg-burgundy-wash text-burgundy' : 'text-ink-soft hover:bg-ivory hover:text-ink'}`}
                >
                  <Repeat className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2">
          <button
            type="button"
            onClick={toggle}
            disabled={hasError}
            aria-label={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-burgundy text-paper shadow-sm transition-colors hover:bg-burgundy-deep active:scale-95 disabled:opacity-40"
          >
            <Play className={`absolute h-4 w-4 translate-x-px transition duration-200 ${isPlaying ? 'scale-50 opacity-0' : 'scale-100 opacity-100'}`} />
            <Pause className={`absolute h-4 w-4 transition duration-200 ${isPlaying ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
          </button>

          <div className="min-w-0 flex-1 px-1">
            <div className="flex items-baseline justify-between gap-2">
              <p className="truncate text-sm font-semibold text-ink">{title}</p>
              {!hasError && (
                <p dir="ltr" className="hidden shrink-0 text-xs tabular-nums text-ink-muted min-[420px]:block">
                  {formatTime(time)} / {formatTime(duration)}
                </p>
              )}
            </div>
            {hasError ? (
              <p className="text-xs leading-relaxed text-ink-muted">{missingMessage}</p>
            ) : (
              <div className="mt-1.5 h-[3px] overflow-hidden rounded-full bg-ink/10">
                <div className="h-full rounded-full bg-burgundy transition-[width] duration-200 ease-linear" style={{ width: `${progress * 100}%` }} />
              </div>
            )}
          </div>

          {!hasError && (
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              aria-label={expanded ? 'تصغير مشغل الأغنية' : 'توسيع مشغل الأغنية'}
              aria-expanded={expanded}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink-soft transition hover:bg-ivory hover:text-ink active:scale-95"
            >
              <ChevronUp className={`h-5 w-5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
