import { useEffect, useState } from 'react';
import type { LyricPhrase } from '@/content/lyricsTimeline';
import { lyricsTimeline } from '@/content/lyricsTimeline';
import { useActivePhrase } from '@/hooks/useLyrics';

interface LyricsDebugPanelProps {
  phrases: LyricPhrase[];
  onChange: (phrases: LyricPhrase[]) => void;
  getTime: () => number;
  isPlaying: boolean;
  onToggle: () => void;
  onSeek: (seconds: number) => void;
}

function formatTimelineFile(phrases: LyricPhrase[]) {
  const rows = phrases
    .map((p) => `  { text: ${JSON.stringify(p.text)}, startMs: ${p.startMs ?? 'null'}, endMs: ${p.endMs ?? 'null'} },`)
    .join('\n');
  return `export const lyricsTimeline: LyricPhrase[] = [\n${rows}\n];`;
}

function parseMs(value: string): number | null {
  if (value.trim() === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? Math.max(0, Math.round(n)) : null;
}

export function LyricsDebugPanel({ phrases, onChange, getTime, isPlaying, onToggle, onSeek }: LyricsDebugPanelProps) {
  const [nowMs, setNowMs] = useState(0);
  const active = useActivePhrase(getTime, phrases);

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      setNowMs(Math.round(getTime() * 1000));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [getTime]);

  const update = (index: number, patch: Partial<LyricPhrase>) =>
    onChange(phrases.map((p, i) => (i === index ? { ...p, ...patch } : p)));

  const timelineText = formatTimelineFile(phrases);

  return (
    <aside className="fixed start-3 top-3 z-50 max-h-[90vh] w-[min(21rem,calc(100vw-1.5rem))] overflow-y-auto rounded-xl bg-ink p-3 text-xs text-paper shadow-2xl">
      <p className="mb-2 font-semibold tracking-wide text-saffron">معايرة الكلمات (مؤقت)</p>

      <div className="mb-3 rounded-lg bg-paper/10 p-2 font-mono">
        <p>الوقت: {nowMs} ms</p>
        <p>النشطة: {active >= 0 ? phrases[active].text : 'لا شيء'}</p>
      </div>

      <div className="mb-3 flex gap-2">
        <button type="button" onClick={onToggle} className="rounded-md bg-paper px-3 py-1.5 text-ink">
          {isPlaying ? 'إيقاف' : 'تشغيل'}
        </button>
        <button type="button" onClick={() => onSeek(0)} className="rounded-md bg-paper/20 px-3 py-1.5">
          من البداية
        </button>
        <button type="button" onClick={() => onChange(lyricsTimeline)} className="rounded-md bg-paper/20 px-3 py-1.5">
          إعادة الضبط
        </button>
      </div>

      <ol className="space-y-3">
        {phrases.map((p, i) => (
          <li key={i} className={`rounded-lg p-2 ${i === active ? 'bg-saffron/20' : 'bg-paper/5'}`}>
            <p className="mb-1.5 font-semibold">
              {i + 1}. {p.text}
            </p>
            <div className="grid grid-cols-2 gap-2 font-mono">
              <label className="flex flex-col gap-1">
                بداية (ms)
                <input
                  type="number"
                  value={p.startMs ?? ''}
                  onChange={(e) => update(i, { startMs: parseMs(e.target.value) })}
                  className="rounded bg-paper/10 px-2 py-1 text-paper"
                />
              </label>
              <label className="flex flex-col gap-1">
                نهاية (ms)
                <input
                  type="number"
                  value={p.endMs ?? ''}
                  onChange={(e) => update(i, { endMs: parseMs(e.target.value) })}
                  className="rounded bg-paper/10 px-2 py-1 text-paper"
                />
              </label>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <button type="button" onClick={() => update(i, { startMs: nowMs })} className="rounded bg-paper/20 px-2 py-1">
                بداية = الآن
              </button>
              <button type="button" onClick={() => update(i, { endMs: nowMs })} className="rounded bg-paper/20 px-2 py-1">
                نهاية = الآن
              </button>
              <button
                type="button"
                disabled={p.startMs === null}
                onClick={() => p.startMs !== null && onSeek(Math.max(0, p.startMs - 1000) / 1000)}
                className="rounded bg-paper/20 px-2 py-1 disabled:opacity-40"
              >
                اذهب للبداية
              </button>
            </div>
          </li>
        ))}
      </ol>

      <details className="mt-3">
        <summary className="cursor-pointer text-saffron">الجدول الناتج للنسخ</summary>
        <textarea
          readOnly
          value={timelineText}
          onFocus={(e) => e.currentTarget.select()}
          rows={12}
          className="mt-2 w-full rounded bg-paper/10 p-2 font-mono text-[11px] text-paper"
        />
      </details>
    </aside>
  );
}
