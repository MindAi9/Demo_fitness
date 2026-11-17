import { useEffect, useRef, useState, type MouseEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check } from 'lucide-react';
import { WORKOUT_PROGRAMS, type WorkoutProgram } from '../data/clubData';

gsap.registerPlugin(ScrollTrigger);

interface ProgramsSectionProps {
  onEnquireProgram: (programTitle: string) => void;
}

export function ProgramsSection({ onEnquireProgram }: ProgramsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<string>(WORKOUT_PROGRAMS[0].id);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
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

  const handleTiltMove = (e: MouseEvent<HTMLDivElement>) => {
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg) translateY(-4px)`;
  };

  const handleTiltLeave = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform =
      'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <section
      id="programs"
      ref={sectionRef}
      className="relative border-t border-white/[0.06] bg-[#0B0B0D] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-red-500 uppercase">
              Workout Programs
            </p>
            <h2 className="mt-2 font-display text-[clamp(2rem,3.8vw,3.2rem)] font-bold leading-[1.02] tracking-tight text-white uppercase text-balance">
              Six Disciplines. One Standard.
            </h2>
          </div>
          <p className="max-w-md text-sm text-zinc-400">
            Select any training track to inspect outcomes or route directly to a
            sample program enquiry.
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {WORKOUT_PROGRAMS.map((program: WorkoutProgram) => {
            const isSelected = selectedId === program.id;

            return (
              <div
                key={program.id}
                onMouseMove={handleTiltMove}
                onMouseLeave={handleTiltLeave}
                onClick={() => setSelectedId(program.id)}
                className={`group flex flex-col justify-between rounded-sm border p-7 transition-all duration-200 will-change-transform cursor-pointer ${
                  isSelected
                    ? 'border-red-600/60 bg-[#141418]'
                    : 'border-white/[0.08] bg-[#111114] hover:border-white/25'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span className="font-mono-tabular text-red-500 font-medium">
                      {program.index}
                    </span>
                    <div className="flex items-center gap-2">
                      <span>{program.focus}</span>
                      <span aria-hidden="true">·</span>
                      <span>{program.duration}</span>
                    </div>
                  </div>

                  <h3 className="mt-4 font-display text-3xl font-bold tracking-wide text-white uppercase">
                    {program.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {program.description}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-white/[0.06] pt-4">
                    {program.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="flex items-center gap-2.5 text-xs text-zinc-300"
                      >
                        <Check
                          className="h-3.5 w-3.5 text-red-500 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedId(program.id);
                      onEnquireProgram(program.title);
                    }}
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-white uppercase hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <span>Enquire About Track</span>
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </button>
                  <span className="text-[11px] text-zinc-500">
                    {isSelected ? 'Selected' : 'Select'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
