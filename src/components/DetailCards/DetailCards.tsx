import { useState } from 'react';
import { gift } from '@/content/gift';
import { Bloom, type FlowerTone } from '@/components/FlowerGarden/Bloom';

const CARD_TONES: FlowerTone[] = ['burgundy', 'saffron', 'terracotta', 'violet', 'botanical'];

interface DetailCardProps {
  title: string;
  text: string;
  tone: FlowerTone;
}

function DetailCard({ title, text, tone }: DetailCardProps) {
  const [revealed, setRevealed] = useState(false);
  const words = text.split(' ');

  return (
    <button
      type="button"
      onMouseEnter={() => setRevealed(true)}
      onFocus={() => setRevealed(true)}
      onClick={() => setRevealed(true)}
      aria-expanded={revealed}
      className="group relative flex min-h-[11rem] flex-col overflow-hidden rounded-[1.5rem] bg-paper p-6 text-start shadow-[0_18px_40px_-28px_rgba(25,24,23,0.5)] ring-1 ring-ink/5 transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-26px_rgba(25,24,23,0.55)] md:min-h-[15rem] md:p-7"
    >
      <Bloom
        tone={tone}
        className="absolute -end-6 -top-6 h-24 w-24 opacity-90 transition duration-700 group-hover:rotate-45"
      />
      <span className="relative block max-w-[80%] text-lg font-semibold leading-snug text-ink">{title}</span>
      <span className="relative mt-4 block text-base leading-[2] text-ink-soft">
        {words.map((word, i) => (
          <span key={i}>
            <span
              className={`inline-block transition-all duration-700 ease-out ${revealed ? 'translate-y-0 opacity-100 blur-none' : 'translate-y-1 opacity-0 blur-[2px]'}`}
              style={{ transitionDelay: revealed ? `${i * 70}ms` : '0ms' }}
            >
              {word}
            </span>
            {i < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </span>
      {!revealed && (
        <span className="mt-auto block h-px w-10 bg-ink/15 transition-all duration-500 group-hover:w-16" aria-hidden="true" />
      )}
    </button>
  );
}

export function DetailCards() {
  const { title, subtitle, cards, secretLabel, secretMessage } = gift.details;
  const [secretOpen, setSecretOpen] = useState(false);

  return (
    <section id="details" className="relative px-5 py-24 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold text-ink md:text-5xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink-muted">{subtitle}</p>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2 md:gap-6">
        {cards.map((card, i) => (
          <DetailCard key={card.title} title={card.title} text={card.text} tone={CARD_TONES[i % CARD_TONES.length]} />
        ))}
      </div>

      <div className="mt-20 flex flex-col items-center gap-5">
        <button
          type="button"
          onClick={() => setSecretOpen((o) => !o)}
          aria-label={secretLabel}
          aria-expanded={secretOpen}
          className="group flex h-12 w-12 items-center justify-center rounded-full transition hover:bg-burgundy-wash"
        >
          <Bloom
            tone="burgundy"
            className={`h-9 w-9 transition duration-700 group-hover:rotate-90 ${secretOpen ? 'opacity-100' : 'animate-shimmer'}`}
          />
        </button>
        {secretOpen && (
          <p className="max-w-md animate-fade-up px-6 text-center text-lg leading-[2] text-burgundy">{secretMessage}</p>
        )}
      </div>
    </section>
  );
}
