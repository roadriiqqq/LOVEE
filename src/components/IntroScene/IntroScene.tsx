import { gift } from '@/content/gift';
import { IllustratedGirl } from '@/components/IllustratedGirl/IllustratedGirl';
import { Bloom } from '@/components/FlowerGarden/Bloom';

interface IntroSceneProps {
  onOpen: () => void;
}

export function IntroScene({ onOpen }: IntroSceneProps) {
  const { question, answer, openButton } = gift.intro;

  return (
    <section id="intro" className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="animate-fade-up text-3xl font-bold leading-[1.5] text-ink md:text-5xl" style={{ animationDelay: '0.3s' }}>
          {question}
        </h1>
        <p className="mt-4 animate-fade-up text-lg text-ink-muted md:text-xl" style={{ animationDelay: '1.8s' }}>
          {answer}
        </p>

        <div className="relative mt-8 h-[min(46svh,360px)] w-[calc(min(46svh,360px)*2/3)] animate-fade-in md:h-[380px] md:w-[320px]" style={{ animationDelay: '3s' }}>
          <IllustratedGirl className="h-full w-full music-reactive-soft" />
        </div>

        <a
          href="#poem"
          onClick={onOpen}
          className="group mt-8 inline-flex animate-fade-up items-center gap-3 rounded-full bg-ink px-8 py-3.5 text-paper shadow-[0_18px_40px_-18px_rgba(25,24,23,0.6)] transition duration-500 hover:bg-burgundy"
          style={{ animationDelay: '4.2s' }}
        >
          <span className="text-base font-semibold">{openButton}</span>
          <span className="block h-px w-6 bg-paper/70 transition-all duration-500 group-hover:w-10" aria-hidden="true" />
        </a>
      </div>

      <Bloom tone="terracotta" className="music-reactive pointer-events-none absolute -bottom-6 start-[8%] hidden h-40 w-40 animate-sway opacity-90 md:block" />
      <Bloom tone="saffron" className="music-reactive pointer-events-none absolute bottom-8 end-[10%] hidden h-24 w-24 animate-sway-wide opacity-90 md:block md:h-32 md:w-32" />
      <Bloom tone="violet" className="music-reactive pointer-events-none absolute top-[14%] end-[12%] hidden h-20 w-20 animate-sway md:block" />
      <Bloom tone="burgundy" className="music-reactive pointer-events-none absolute bottom-16 start-[6%] hidden h-16 w-16 animate-sway-wide opacity-80 md:block" />
    </section>
  );
}
