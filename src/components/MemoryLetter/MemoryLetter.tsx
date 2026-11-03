import { useState } from 'react';
import { gift } from '@/content/gift';
import { useInView } from '@/hooks/useInView';
import { Bloom } from '@/components/FlowerGarden/Bloom';

export function MemoryLetter() {
  const { title, subtitle, lines, revealLabel, revealMessage } = gift.memories;
  const { ref, inView } = useInView<HTMLElement>(0.3);
  const [revealed, setRevealed] = useState(false);

  return (
    <section ref={ref} id="memories" className="paper-texture relative flex flex-col items-center overflow-hidden px-5 py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold text-ink md:text-5xl">{title}</h2>
        <p className="mt-4 text-base text-ink-muted md:text-lg">{subtitle}</p>
      </div>

      <article
        className={`relative mt-14 w-full max-w-xl bg-paper px-7 pb-12 pt-14 text-center shadow-[0_30px_70px_-34px_rgba(25,24,23,0.45)] ring-1 ring-ink/5 md:px-14 md:pb-16 md:pt-16 ${inView ? 'animate-fade-up' : 'opacity-0'}`}
      >
        <div className="pointer-events-none absolute inset-4 rounded-[1.25rem] border border-botanical/15" aria-hidden="true" />
        <Bloom tone="botanical" className="absolute -start-5 -top-5 h-16 w-16 animate-sway md:h-20 md:w-20" />
        <Bloom tone="terracotta" className="absolute -bottom-5 -end-5 h-16 w-16 animate-sway-wide md:h-20 md:w-20" />

        <svg viewBox="0 0 80 24" className="relative mx-auto h-6 w-20 text-botanical" aria-hidden="true">
          <path d="M4 14 C24 14 56 14 76 10" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
          <path d="M30 14 C30 6 36 2 44 4 C40 10 36 13 30 14 Z" fill="currentColor" opacity={0.7} />
          <path d="M50 12 C50 18 56 21 63 19 C60 14 56 12 50 12 Z" fill="currentColor" opacity={0.5} />
        </svg>

        <div className="relative mt-8 space-y-4 font-letter text-xl leading-[2.1] text-ink md:text-2xl">
          {lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        <div className="relative mt-12">
          <button
            type="button"
            onClick={() => setRevealed((r) => !r)}
            aria-expanded={revealed}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-burgundy transition hover:bg-burgundy-wash"
          >
            {revealLabel}
          </button>
          <div className={`grid transition-[grid-template-rows,opacity] duration-700 ease-out ${revealed ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="min-h-0 overflow-hidden">
              <p className="pt-3 font-letter text-lg text-burgundy md:text-xl">{revealMessage}</p>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
