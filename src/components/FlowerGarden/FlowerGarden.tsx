import { useCallback, useState } from 'react';
import { gift } from '@/content/gift';
import { GardenFlower } from '@/components/FlowerGarden/GardenFlower';
import { FlowerMessage } from '@/components/FlowerMessage/FlowerMessage';
import { Modal } from '@/components/common/Modal';

interface FlowerGardenProps {
  openedIds: string[];
  onOpen: (id: string) => void;
}

export function FlowerGarden({ openedIds, onOpen }: FlowerGardenProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { flowers, hiddenFlower, hint, closeLabel, finalTitle, finalMessage, title, subtitle, hiddenFlowerLabel } =
    gift.garden;

  const allFlowers = [...flowers, hiddenFlower];
  const active = allFlowers.find((f) => f.id === activeId);
  const openedCount = flowers.filter((f) => openedIds.includes(f.id)).length;
  const completed = openedCount === flowers.length;

  const handleSelect = (id: string) => {
    onOpen(id);
    setActiveId(id);
  };
  const close = useCallback(() => setActiveId(null), []);

  return (
    <section id="garden" className="relative px-5 py-24 md:py-32">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm tracking-wide text-botanical-deep">
          {openedCount} / {flowers.length}
        </p>
        <h2 className="mt-3 text-4xl font-bold text-ink md:text-5xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink-muted">{subtitle}</p>
        <p className="mt-4 inline-flex items-center gap-2 text-sm text-ink-muted">
          <span className="inline-block h-2 w-2 rounded-full bg-saffron" aria-hidden="true" />
          {hint}
        </p>
      </div>

      <div className="relative mx-auto mt-10 aspect-[4/5] w-full max-w-3xl overflow-hidden rounded-[2rem] bg-paper ring-1 ring-ink/5 md:aspect-[16/10]">
        <div className="paper-texture absolute inset-0" aria-hidden="true" />
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full"
          viewBox="0 0 400 80"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 42 C90 14 230 66 400 28 L400 80 L0 80 Z" fill="#E6ECE0" />
        </svg>
        {allFlowers.map((flower, i) => {
          const isHidden = flower.id === hiddenFlower.id;
          const opened = openedIds.includes(flower.id);
          return (
            <GardenFlower
              key={flower.id}
              label={isHidden ? hiddenFlowerLabel : opened ? flower.title : hint}
              tone={flower.color}
              opened={opened}
              hidden={isHidden}
              position={flower.position}
              swayDelay={-i * 1.3}
              onSelect={() => handleSelect(flower.id)}
            />
          );
        })}
      </div>

      {completed && (
        <div className="mx-auto mt-12 max-w-md animate-fade-up text-center">
          <h3 className="text-2xl font-semibold text-burgundy">{finalTitle}</h3>
          <p className="mt-3 text-lg leading-[2] text-ink-soft">{finalMessage}</p>
        </div>
      )}

      <Modal open={active !== undefined} label={active?.title ?? title} closeLabel={closeLabel} onClose={close}>
        {active && (
          <FlowerMessage
            title={active.title}
            message={active.message}
            tone={active.color}
            closeLabel={closeLabel}
            onClose={close}
          />
        )}
      </Modal>
    </section>
  );
}
