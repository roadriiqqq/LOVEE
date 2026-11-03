import { Bloom, type FlowerTone } from '@/components/FlowerGarden/Bloom';

const TONE_TEXT: Record<FlowerTone, string> = {
  burgundy: 'text-burgundy',
  saffron: 'text-saffron-deep',
  violet: 'text-violet-deep',
  terracotta: 'text-terracotta-deep',
  botanical: 'text-botanical-deep',
};

interface FlowerMessageProps {
  title: string;
  message: string;
  tone: FlowerTone;
  closeLabel: string;
  onClose: () => void;
}

export function FlowerMessage({ title, message, tone, closeLabel, onClose }: FlowerMessageProps) {
  return (
    <article className="paper-texture relative overflow-hidden rounded-[1.5rem] bg-paper px-7 pb-8 pt-14 text-center shadow-[0_24px_60px_-24px_rgba(25,24,23,0.35)] ring-1 ring-ink/5 md:px-10 md:pb-10">
      <div className="pointer-events-none absolute inset-3 rounded-[1.1rem] border border-ink/5" aria-hidden="true" />
      <Bloom tone={tone} className="mx-auto h-16 w-16 animate-bloom" />
      <h3 className={`mt-5 text-xl font-semibold leading-snug ${TONE_TEXT[tone]}`}>{title}</h3>
      <p className="mt-5 text-lg leading-[2] text-ink-soft">{message}</p>
      <button
        type="button"
        onClick={onClose}
        className="mt-8 rounded-full border border-ink/15 px-6 py-2 text-sm text-ink transition hover:border-ink/40 hover:bg-ink hover:text-paper"
      >
        {closeLabel}
      </button>
    </article>
  );
}
