import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STAR_HIGHLIGHTS, DEMO_COUNTERS } from '../data/clubData';
import { StarHighlight } from './StarHighlight';

gsap.registerPlugin(ScrollTrigger);

export function StatsHighlightsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const starsGridRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      if (starsGridRef.current) {
        gsap.fromTo(
          starsGridRef.current.children,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: starsGridRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // Animated counters for clearly labeled fictional demo club specs
      DEMO_COUNTERS.forEach((item, idx) => {
        const el = counterRefs.current[idx];
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: item.value,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.val).toLocaleString()}${item.suffix}`;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="highlights"
      ref={sectionRef}
      className="relative border-t border-white/[0.06] bg-[#070708] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-red-500 uppercase">
              Club Standards &amp; Highlights
            </p>
            <h2 className="mt-2 font-display text-[clamp(1.85rem,3.4vw,2.9rem)] font-bold tracking-tight text-white uppercase text-balance">
              Defined by Coaching &amp; Environment
            </h2>
          </div>
          <p className="text-xs text-zinc-400">
            Visual Demo Highlights · Non-Verified Sample Specs
          </p>
        </div>

        {/* Star-based visual highlights instead of numeric rating displays */}
        <div
          ref={starsGridRef}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STAR_HIGHLIGHTS.map((highlight) => (
            <div
              key={highlight.id}
              className="rounded-sm border border-white/[0.08] bg-[#111114] p-6 transition-colors duration-200 hover:border-white/20"
            >
              <StarHighlight
                count={highlight.stars}
                size="md"
                label={`${highlight.label} visual highlight`}
              />
              <h3 className="mt-4 font-display text-2xl font-bold tracking-wide text-white uppercase">
                {highlight.label}
              </h3>
              <p className="mt-1.5 text-xs text-zinc-400">
                {highlight.descriptor}
              </p>
            </div>
          ))}
        </div>

        {/* Animated counters for clearly labeled fictional demo facility specs */}
        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/[0.08] pt-8 lg:grid-cols-4">
          {DEMO_COUNTERS.map((counter, idx) => (
            <div key={counter.id} className="px-1">
              <span
                ref={(el) => {
                  counterRefs.current[idx] = el;
                }}
                className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white tabular-nums"
              >
                {counter.value.toLocaleString()}
                {counter.suffix}
              </span>
              <p className="mt-1 text-sm font-medium text-zinc-300">
                {counter.label}
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">{counter.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
