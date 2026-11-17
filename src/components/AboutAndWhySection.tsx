import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CLUB_IMAGES, WHY_CHOOSE_ITEMS } from '../data/clubData';
import { ResilientImage } from './ResilientImage';

gsap.registerPlugin(ScrollTrigger);

export function AboutAndWhySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const maskImgRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Image mask reveal
      if (maskImgRef.current) {
        gsap.fromTo(
          maskImgRef.current,
          { clipPath: 'inset(14% 0% 14% 0%)', opacity: 0.4, scale: 1.05 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            scale: 1,
            duration: 1.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: maskImgRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }

      if (textColRef.current) {
        gsap.fromTo(
          textColRef.current.children,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textColRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
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
      id="about"
      ref={sectionRef}
      className="relative border-t border-white/[0.06] bg-[#0B0B0D] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        {/* About the Gym — Asymmetric 2-column split */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6 flex">
            <div
              ref={maskImgRef}
              className="relative w-full overflow-hidden rounded-sm border border-white/[0.08] bg-[#111114] aspect-[4/3] lg:aspect-auto lg:min-h-[460px]"
            >
              <ResilientImage
                src={CLUB_IMAGES.aboutBarbell}
                alt="Knurled steel Olympic barbell loaded with iron weight plates at IRONVAULT"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070708]/75 via-transparent to-transparent"
                aria-hidden="true"
              />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs text-zinc-300">
                <span className="font-medium tracking-wider uppercase text-white">
                  Calibrated Free-Weight Floor
                </span>
                <span className="text-zinc-400">Club Concept · Demo</span>
              </div>
            </div>
          </div>

          <div
            ref={textColRef}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <p className="text-xs font-semibold tracking-[0.2em] text-red-500 uppercase">
              About IRONVAULT
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.1rem,4vw,3.35rem)] font-bold leading-[1.02] tracking-tight text-white uppercase text-balance">
              Engineered for Disciplined Progression.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-300">
              IRONVAULT FITNESS CLUB is a fictional commercial training club
              concept designed around an uncompromising athletic environment:
              calibrated iron, quiet focus, and structured coaching without
              gimmicks or overcrowded machines.
            </p>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              Every square foot—from 30-meter sled turf lanes to dedicated
              Olympic lifting platforms—is laid out so members move smoothly
              between heavy compound work, metabolic conditioning, and guided
              recovery.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/[0.08] pt-8">
              <div>
                <p className="font-display text-2xl font-bold text-white uppercase">
                  Focused Floor
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  Intentional acoustic design and zero fluorescent clutter.
                </p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-white uppercase">
                  Coach-Led Standard
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  Technical feedback built into both floor and group sessions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-24 pt-16 border-t border-white/[0.06]">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-red-500 uppercase">
                Why Choose Us
              </p>
              <h3 className="mt-2 font-display text-[clamp(1.85rem,3.2vw,2.75rem)] font-bold tracking-tight text-white uppercase text-balance">
                Built Around Real Training Output
              </h3>
            </div>
            <p className="max-w-md text-sm text-zinc-400">
              Four structural standards that define the IRONVAULT demo club
              experience.
            </p>
          </div>

          <div
            ref={cardsRef}
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {WHY_CHOOSE_ITEMS.map((item) => (
              <div
                key={item.index}
                className="group relative rounded-sm border border-white/[0.08] bg-[#111114] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-red-600/45"
              >
                <span className="font-mono-tabular text-xs font-medium tracking-widest text-red-500">
                  {item.index}.
                </span>
                <h4 className="mt-4 font-display text-2xl font-bold tracking-wide text-white uppercase">
                  {item.title}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
