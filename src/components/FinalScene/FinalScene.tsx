import { gift } from '@/content/gift';
import { useInView } from '@/hooks/useInView';
import { IllustratedGirl } from '@/components/IllustratedGirl/IllustratedGirl';
import { Bloom, type FlowerTone } from '@/components/FlowerGarden/Bloom';

const FLOWER_SPOTS: { x: number; y: number; size: number; tone: FlowerTone }[] = [
  { x: 12, y: 18, size: 18, tone: 'terracotta' },
  { x: 86, y: 14, size: 20, tone: 'saffron' },
  { x: 6, y: 52, size: 15, tone: 'violet' },
  { x: 92, y: 50, size: 17, tone: 'burgundy' },
  { x: 22, y: 84, size: 18, tone: 'botanical' },
  { x: 78, y: 84, size: 16, tone: 'saffron' },
  { x: 50, y: 6, size: 13, tone: 'violet' },
  { x: 28, y: 36, size: 11, tone: 'botanical' },
  { x: 72, y: 36, size: 12, tone: 'terracotta' },
  { x: 50, y: 94, size: 14, tone: 'burgundy' },
];

interface FinalSceneProps {
  progress: number;
  onRestart: () => void;
}

export function FinalScene({ progress, onRestart }: FinalSceneProps) {
  const { lines, restart } = gift.finale;
  const { recipientName } = gift;
  const { ref, inView } = useInView<HTMLElement>(0.3);
  const visibleFlowers = FLOWER_SPOTS.slice(0, 3 + Math.round(progress * (FLOWER_SPOTS.length - 3)));
  const saturation = 0.6 + progress * 0.4;

  return (
    <section ref={ref} id="finale" className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <div className="relative flex w-full max-w-xl flex-col items-center">
        <div className="relative aspect-[4/5] w-full md:aspect-[5/4]" style={{ filter: `saturate(${saturation})` }}>
          {visibleFlowers.map((spot, i) => (
            <span
              key={`${spot.x}-${spot.y}`}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${spot.x}%`, top: `${spot.y}%`, width: `${spot.size}%` }}
            >
              <span className="block animate-bloom" style={{ animationDelay: `${i * 0.25}s` }}>
                <span className="block aspect-square w-full animate-sway-wide">
                  <Bloom tone={spot.tone} className="h-full w-full" />
                </span>
              </span>
            </span>
          ))}
          <IllustratedGirl className="music-reactive-soft absolute left-1/2 top-[8%] h-[84%] w-[56%] -translate-x-1/2" />
        </div>

        <div className="mt-10 min-h-[12rem] space-y-3">
          {inView &&
            lines.map((line, i) => (
              <p
                key={line}
                className="animate-fade-up text-[clamp(1.35rem,6vw,1.9rem)] font-semibold leading-[1.8] text-ink"
                style={{ animationDelay: `${0.6 + i * 1.6}s` }}
              >
                {line}
              </p>
            ))}
        </div>

        {inView && (
          <p
            className="mt-6 animate-fade-up font-display text-[clamp(2.75rem,12vw,3.75rem)] font-bold text-burgundy"
            style={{ animationDelay: `${0.6 + lines.length * 1.6}s` }}
          >
            {recipientName}
          </p>
        )}

        <button
          type="button"
          onClick={onRestart}
          className="mt-14 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-ink/20 bg-paper px-7 py-3 text-sm font-semibold text-ink transition hover:border-ink hover:bg-ink hover:text-paper"
        >
          {restart}
        </button>
      </div>
    </section>
  );
}
