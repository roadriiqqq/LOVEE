import { useState } from 'react';
import { BloomGlyph, type FlowerTone } from '@/components/FlowerGarden/Bloom';
import { PetalBurst } from '@/components/PetalEffects/PetalField';

interface GardenFlowerProps {
  label: string;
  tone: FlowerTone;
  opened: boolean;
  hidden?: boolean;
  position: { x: number; y: number };
  swayDelay: number;
  onSelect: () => void;
}

export function GardenFlower({ label, tone, opened, hidden = false, position, swayDelay, onSelect }: GardenFlowerProps) {
  const [bursting, setBursting] = useState(false);

  const handleClick = () => {
    setBursting(true);
    onSelect();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className="group absolute h-28 w-20 -translate-x-1/2 -translate-y-1/2 touch-manipulation select-none md:h-36 md:w-28"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
    >
      {bursting && <PetalBurst tone={tone} onDone={() => setBursting(false)} />}
      <svg viewBox="-60 -62 120 170" className="h-full w-full overflow-visible" aria-hidden="true">
        <g
          className="animate-sway"
          style={{ transformOrigin: '0px 100px', transformBox: 'view-box', animationDelay: `${swayDelay}s` }}
        >
          <path d="M0 104 C-5 74 6 46 0 6" fill="none" stroke="#637A57" strokeWidth={2.2} strokeLinecap="round" />
          <path d="M-1 80 C-18 72 -24 58 -22 50 C-10 56 -2 66 -1 80 Z" fill="#637A57" opacity={0.85} />
          <path d="M3 64 C18 56 24 42 22 34 C12 40 4 50 3 64 Z" fill="#637A57" opacity={0.85} />
          <g
            style={{
              transformOrigin: '0px 0px',
              transformBox: 'view-box',
              transform: opened ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-18deg)',
              transition: 'transform 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <g className={opened ? '' : 'animate-breathe'}>
              <g className={hidden ? 'animate-shimmer' : ''}>
                <BloomGlyph tone={tone} />
              </g>
            </g>
          </g>
        </g>
      </svg>
      {!opened && !hidden && (
        <span
          className="absolute right-2 top-2 block h-2.5 w-2.5 animate-shimmer rounded-full bg-saffron ring-4 ring-saffron/20"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
