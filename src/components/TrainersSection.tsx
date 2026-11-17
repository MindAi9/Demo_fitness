import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { TRAINERS } from '../data/clubData';
import { ResilientImage } from './ResilientImage';
import { StarHighlight } from './StarHighlight';

gsap.registerPlugin(ScrollTrigger);

interface TrainersSectionProps {
  onBookTrainer: (trainerName: string) => void;
}

export function TrainersSection({ onBookTrainer }: TrainersSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 84%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="trainers"
      ref={sectionRef}
      className="relative border-t border-white/[0.06] bg-[#0B0B0D] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-red-500 uppercase">
              Coaching Team · Demo Profiles
            </p>
            <h2 className="mt-2 font-display text-[clamp(2rem,3.8vw,3.2rem)] font-bold leading-[1.02] tracking-tight text-white uppercase text-balance">
              Precision Guidance on Every Rep
            </h2>
          </div>
          <p className="max-w-md text-sm text-zinc-400">
            Fictional sample coaching profiles illustrating specialized roles
            across strength, conditioning, and mobility.
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {TRAINERS.map((trainer) => (
            <article
              key={trainer.id}
              className="group flex flex-col overflow-hidden rounded-sm border border-white/[0.08] bg-[#111114] transition-all duration-300 hover:-translate-y-1 hover:border-red-600/45"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#070708]">
                <ResilientImage
                  src={trainer.image}
                  alt={`${trainer.name} — ${trainer.specialty}`}
                  fallbackTitle={trainer.name}
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111114] via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-7">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-zinc-400">
                      {trainer.focusTag}
                    </span>
                    <StarHighlight
                      count={trainer.stars}
                      label={`Visual highlight for ${trainer.name}`}
                    />
                  </div>

                  <h3 className="mt-3 font-display text-3xl font-bold tracking-wide text-white uppercase">
                    {trainer.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold tracking-wider text-red-500 uppercase">
                    {trainer.specialty}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {trainer.intro}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => onBookTrainer(trainer.name)}
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-white uppercase hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <span>Request Intro Session</span>
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
