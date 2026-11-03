import { useMemo } from 'react';
import type { FlowerTone } from '@/components/FlowerGarden/Bloom';
import { toneColors } from '@/components/FlowerGarden/flowerTones';

const PETAL_TONES: FlowerTone[] = ['burgundy', 'saffron', 'terracotta', 'violet', 'botanical'];

function PetalShape({ color, size }: { color: string; size: number }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} aria-hidden="true">
      <path d="M10 0 C17 6 18 14 10 20 C2 14 3 6 10 0 Z" fill={color} opacity={0.8} />
    </svg>
  );
}

export function PetalField({ count = 14 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: -Math.random() * 18,
        duration: 16 + Math.random() * 10,
        drift: (Math.random() - 0.5) * 120,
        size: 9 + Math.random() * 7,
        tone: PETAL_TONES[i % PETAL_TONES.length],
      })),
    [count],
  );

  return (
    <div className="petal-field pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 animate-petal-drift"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            ['--drift' as string]: `${p.drift}px`,
          }}
        >
          <PetalShape color={toneColors[p.tone].petal} size={p.size} />
        </div>
      ))}
    </div>
  );
}

interface PetalBurstProps {
  tone: FlowerTone;
  onDone: () => void;
}

export function PetalBurst({ tone, onDone }: PetalBurstProps) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2 + Math.random() * 0.4;
        const distance = 46 + Math.random() * 30;
        return {
          id: i,
          tx: Math.cos(angle) * distance,
          ty: Math.sin(angle) * distance,
        };
      }),
    [],
  );

  return (
    <div className="pointer-events-none absolute left-1/2 top-1/3" aria-hidden="true" onAnimationEnd={onDone}>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute -left-1.5 -top-1.5 block animate-burst"
          style={{
            ['--tx' as string]: `${p.tx}px`,
            ['--ty' as string]: `${p.ty}px`,
          }}
        >
          <PetalShape color={toneColors[tone].petal} size={12} />
        </span>
      ))}
    </div>
  );
}
