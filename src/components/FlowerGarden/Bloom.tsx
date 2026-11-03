import { toneColors } from '@/components/FlowerGarden/flowerTones';

export type FlowerTone = 'burgundy' | 'saffron' | 'violet' | 'terracotta' | 'botanical';

interface BloomGlyphProps {
  tone: FlowerTone;
  petals?: number;
}

export function BloomGlyph({ tone, petals = 5 }: BloomGlyphProps) {
  const colors = toneColors[tone];
  const step = 360 / petals;

  return (
    <g>
      {Array.from({ length: petals }, (_, i) => (
        <ellipse
          key={i}
          cx={0}
          cy={-22}
          rx={13}
          ry={22}
          fill={colors.petal}
          stroke="#191817"
          strokeOpacity={0.35}
          strokeWidth={1}
          transform={`rotate(${i * step})`}
        />
      ))}
      <circle r={8} fill={colors.center} stroke="#191817" strokeOpacity={0.35} strokeWidth={1} />
      <circle r={2.5} cx={-2} cy={-2} fill="#FCFBF8" opacity={0.5} />
    </g>
  );
}

interface BloomProps {
  tone: FlowerTone;
  petals?: number;
  className?: string;
}

export function Bloom({ tone, petals, className }: BloomProps) {
  return (
    <svg viewBox="-50 -50 100 100" className={className} aria-hidden="true">
      <BloomGlyph tone={tone} petals={petals} />
    </svg>
  );
}
