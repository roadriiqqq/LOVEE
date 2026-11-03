import type { ReactNode } from 'react';
import { BloomGlyph, type FlowerTone } from '@/components/FlowerGarden/Bloom';

const INK = '#191817';
const SKIN = '#F0D2B5';
const DRESS = '#743D47';
const LEAF = '#637A57';
const GOLD = '#E7B83F';
const STRAND = '#4A4541';

interface CrownBloom {
  x: number;
  y: number;
  s: number;
  tone: FlowerTone;
  petals: number;
  rot: number;
}

const CROWN_BLOOMS: CrownBloom[] = [
  { x: 154.6, y: 193.8, s: 0.36, tone: 'terracotta', petals: 5, rot: -12 },
  { x: 169.8, y: 172.2, s: 0.46, tone: 'saffron', petals: 6, rot: 8 },
  { x: 184.9, y: 159.3, s: 0.38, tone: 'violet', petals: 5, rot: -6 },
  { x: 200, y: 155, s: 0.62, tone: 'burgundy', petals: 6, rot: 0 },
  { x: 215.1, y: 159.3, s: 0.38, tone: 'saffron', petals: 5, rot: 6 },
  { x: 230.2, y: 172.2, s: 0.46, tone: 'terracotta', petals: 6, rot: -8 },
  { x: 245.4, y: 193.8, s: 0.36, tone: 'violet', petals: 5, rot: 12 },
];

const CROWN_LEAVES = [
  { x: 161.1, y: 183.5, r: -56 },
  { x: 177.3, y: 164.7, r: -40 },
  { x: 222.7, y: 164.7, r: 40 },
  { x: 238.9, y: 183.5, r: 56 },
];

function Mirror({ children }: { children: ReactNode }) {
  return <g transform="matrix(-1 0 0 1 400 0)">{children}</g>;
}

function Arm() {
  return (
    <g>
      <path
        d="M142 352 C128 362 118 382 116 412 C114 446 110 476 108 512 C107 524 110 532 116 534 C122 532 124 524 125 512 C126 486 130 452 140 424 C146 404 150 384 152 364 Z"
        fill={SKIN}
        stroke={INK}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      <path
        d="M108 530 C103 542 103 556 109 566 C113 572 123 572 127 566 C131 556 129 542 126 530 Z"
        fill={SKIN}
        stroke={INK}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      {[111, 115, 119, 123].map((x) => (
        <ellipse key={x} cx={x} cy={571} rx={2.2} ry={5} fill={SKIN} stroke={INK} strokeWidth={1} />
      ))}
      <ellipse cx={106} cy={545} rx={3.6} ry={7} fill={SKIN} stroke={INK} strokeWidth={1.2} transform="rotate(18 106 545)" />
    </g>
  );
}

export function IllustratedGirl({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 600" className={className} role="img" aria-label="رسمة فتاة بتاج من الزهور">
      <g style={{ transformOrigin: '200px 170px', transformBox: 'view-box' }} className="animate-hair">
        <path
          d="M200 158 C132 158 116 226 120 300 C124 380 108 440 92 548 C150 566 250 566 308 548 C292 440 276 380 280 300 C284 226 268 158 200 158 Z"
          fill={INK}
        />
      </g>

      <path
        d="M200 280 L218 280 L226 346 C214 368 186 368 174 346 L182 280 Z"
        fill={SKIN}
        stroke={INK}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />

      <path
        d="M178 340 C158 344 130 346 124 368 C119 388 124 412 146 428 C134 468 112 520 96 590 L304 590 C288 520 266 468 254 428 C276 412 281 388 276 368 C270 346 242 344 222 340 L200 364 Z"
        fill={DRESS}
        stroke={INK}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path d="M178 340 L200 364 L222 340" fill="none" stroke={GOLD} strokeWidth={1.4} strokeLinejoin="round" opacity={0.8} />
      <path d="M146 428 C180 436 220 436 254 428" fill="none" stroke={GOLD} strokeWidth={1.6} strokeLinecap="round" opacity={0.85} />
      <path d="M96 590 C170 596 230 596 304 590" fill="none" stroke={GOLD} strokeWidth={1.4} strokeLinecap="round" opacity={0.6} />
      <path d="M176 448 C170 500 168 546 174 586" fill="none" stroke={INK} strokeWidth={1} opacity={0.22} />
      <path d="M224 448 C230 500 232 546 226 586" fill="none" stroke={INK} strokeWidth={1} opacity={0.22} />
      <path d="M200 446 C200 500 198 546 200 586" fill="none" stroke={INK} strokeWidth={1} opacity={0.14} />

      <Arm />
      <Mirror>
        <Arm />
      </Mirror>

      <g transform="rotate(-2 200 300)">
        <path
          d="M200 174 C232 174 252 196 252 228 C252 260 246 276 232 288 C220 300 210 303 200 303 C190 303 180 300 168 288 C154 276 148 260 148 228 C148 196 168 174 200 174 Z"
          fill={SKIN}
          stroke={INK}
          strokeWidth={1.8}
          strokeLinejoin="round"
        />

        <path
          d="M148 178 C120 236 124 306 142 352 C148 322 152 286 158 250 Z"
          fill={INK}
        />
        <path
          d="M252 178 C280 236 276 306 258 352 C252 322 248 286 242 250 Z"
          fill={INK}
        />
        <path
          d="M150 186 C138 214 136 236 140 260"
          fill="none"
          stroke={STRAND}
          strokeWidth={1}
          strokeLinecap="round"
          opacity={0.7}
        />

        <path d="M174 226 Q183 221 193 224" fill="none" stroke={INK} strokeWidth={1.4} strokeLinecap="round" opacity={0.6} />
        <path d="M207 224 Q217 221 226 226" fill="none" stroke={INK} strokeWidth={1.4} strokeLinecap="round" opacity={0.6} />
        <path d="M177 240 Q185 247 193 240" fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" />
        <path d="M207 240 Q215 247 223 240" fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" />
        <path d="M177 240 L174 237 M223 240 L226 237" fill="none" stroke={INK} strokeWidth={1.4} strokeLinecap="round" />
        <circle cx={172} cy={262} r={6} fill="#D8754F" opacity={0.25} />
        <circle cx={228} cy={262} r={6} fill="#D8754F" opacity={0.25} />
        <path d="M200 248 Q196 257 201 260" fill="none" stroke={INK} strokeWidth={1.2} strokeLinecap="round" opacity={0.6} />
        <path d="M190 272 Q200 268 210 272 Q200 280 190 272 Z" fill={DRESS} />

        <path d="M146 210 Q200 100 254 210" fill="none" stroke={LEAF} strokeWidth={2} strokeLinecap="round" />
        {CROWN_LEAVES.map((leaf, i) => (
          <ellipse
            key={i}
            cx={leaf.x}
            cy={leaf.y}
            rx={10}
            ry={4.2}
            fill={LEAF}
            transform={`rotate(${leaf.r} ${leaf.x} ${leaf.y})`}
          />
        ))}

        <g className="animate-sway" style={{ transformOrigin: '200px 200px', transformBox: 'view-box' }}>
          {CROWN_BLOOMS.map((b, i) => (
            <g key={i} transform={`translate(${b.x} ${b.y}) rotate(${b.rot}) scale(${b.s})`}>
              <BloomGlyph tone={b.tone} petals={b.petals} />
            </g>
          ))}
        </g>
      </g>

      <g transform="translate(150 500) scale(0.22)">
        <BloomGlyph tone="terracotta" petals={5} />
      </g>
      <g transform="translate(168 520) scale(0.16)">
        <BloomGlyph tone="saffron" petals={6} />
      </g>
    </svg>
  );
}
