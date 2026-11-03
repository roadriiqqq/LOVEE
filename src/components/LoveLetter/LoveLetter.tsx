import { useEffect, useState } from 'react';
import { MailOpen, RotateCcw } from 'lucide-react';
import { gift } from '@/content/gift';
import { Bloom } from '@/components/FlowerGarden/Bloom';

type Phase = 'closed' | 'opening' | 'open';

const OPEN_DURATION_MS = 1000;

export function LoveLetter() {
  const { envelopeLabel, openLabel, closeLabel, body } = gift.letter;
  const { recipientName, senderName } = gift;
  const [phase, setPhase] = useState<Phase>('closed');
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  useEffect(() => {
    if (phase !== 'opening') return;
    const timer = setTimeout(() => setPhase('open'), OPEN_DURATION_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  const isClosed = phase === 'closed';

  return (
    <section id="letter" className="paper-texture relative flex flex-col items-center px-5 py-24 md:py-32">
      {phase !== 'open' ? (
        <div className="flex w-full flex-col items-center">
          <button
            type="button"
            onClick={() => setPhase('opening')}
            disabled={!isClosed}
            aria-label={openLabel}
            className="group relative aspect-[7/5] w-[min(86vw,440px)] cursor-pointer rounded-md transition duration-500 hover:-translate-y-1 disabled:cursor-default disabled:hover:translate-y-0"
          >
            <span
              className="absolute inset-x-[7%] top-[14%] bottom-[6%] z-10 rounded-sm bg-paper shadow-[0_12px_30px_-14px_rgba(25,24,23,0.4)] ring-1 ring-ink/5 transition-transform duration-[1100ms] ease-out"
              style={{ transform: isClosed ? 'translateY(0)' : 'translateY(-44%)' }}
              aria-hidden="true"
            />

            <span className="absolute inset-0 z-20 overflow-hidden rounded-md bg-terracotta-wash shadow-[0_24px_50px_-26px_rgba(25,24,23,0.55)] ring-1 ring-terracotta/20" aria-hidden="true">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                <path d="M0 0 L50 50 L100 0" fill="none" stroke="#D8754F" strokeOpacity={0.35} strokeWidth={1} vectorEffect="non-scaling-stroke" />
                <path d="M0 100 L40 58 M100 100 L60 58" fill="none" stroke="#D8754F" strokeOpacity={0.25} strokeWidth={1} vectorEffect="non-scaling-stroke" />
              </svg>
            </span>

            <span className="absolute inset-x-0 top-[52%] z-30 flex flex-col items-center gap-1" aria-hidden="true">
              <span className="font-letter text-lg text-burgundy-deep">{envelopeLabel}</span>
              <span className="font-letter text-2xl text-ink">{recipientName}</span>
            </span>

            <span
              className="absolute inset-x-0 top-0 z-30 h-1/2 origin-top bg-terracotta-wash transition-transform duration-[900ms] ease-in-out"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                transform: isClosed ? 'rotateX(0deg)' : 'rotateX(180deg)',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
              aria-hidden="true"
            />

            <span className="absolute -end-5 -top-5 z-40 hidden md:block" aria-hidden="true">
              <Bloom tone="botanical" className="h-16 w-16 animate-sway" />
            </span>
            <span className="absolute -start-4 -bottom-4 z-40 hidden md:block" aria-hidden="true">
              <Bloom tone="burgundy" className="h-14 w-14 animate-sway-wide" />
            </span>

            <span className="absolute inset-x-0 bottom-[12%] z-40 flex items-center justify-center gap-2 text-sm font-semibold text-burgundy-deep transition-opacity duration-500" aria-hidden="true" style={{ opacity: isClosed ? 1 : 0 }}>
              <MailOpen className="h-4 w-4" />
              {openLabel}
            </span>
          </button>
        </div>
      ) : (
        <article className="paper-texture relative w-full max-w-2xl animate-fade-up overflow-hidden rounded-[1.75rem] bg-paper px-7 pb-12 pt-14 shadow-[0_30px_70px_-34px_rgba(25,24,23,0.5)] ring-1 ring-ink/5 md:px-14 md:pb-16 md:pt-20">
          <div className="pointer-events-none absolute inset-4 rounded-[1.25rem] border border-botanical/15" aria-hidden="true" />
          <Bloom tone="botanical" className="absolute -start-6 -top-6 h-28 w-28 opacity-90" />
          <Bloom tone="terracotta" className="absolute -bottom-7 -end-7 h-32 w-32 opacity-90" />

          <p className="relative font-letter text-2xl text-burgundy md:text-3xl">
            {envelopeLabel} {recipientName}
          </p>

          <div className="relative mt-8 space-y-7">
            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="animate-fade-up font-letter text-xl leading-[2.1] text-ink md:text-2xl"
                style={{ animationDelay: `${0.4 + i * 0.7}s` }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {senderName && (
            <p
              className="relative mt-10 animate-fade-up text-end font-letter text-xl text-burgundy md:text-2xl"
              style={{ animationDelay: `${0.5 + paragraphs.length * 0.7}s` }}
            >
              {senderName}
            </p>
          )}

          <div className="relative mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setPhase('closed')}
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2 text-sm text-ink-soft transition hover:border-ink/40 hover:text-ink"
            >
              <RotateCcw className="h-4 w-4" />
              {closeLabel}
            </button>
          </div>
        </article>
      )}
    </section>
  );
}
