import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Expand } from 'lucide-react';
import { FACILITIES, type FacilityItem } from '../data/clubData';
import { ResilientImage } from './ResilientImage';

gsap.registerPlugin(ScrollTrigger);

export function FacilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeFacility, setActiveFacility] = useState<FacilityItem | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      if (galleryRef.current) {
        gsap.fromTo(
          galleryRef.current.children,
          { clipPath: 'inset(10% 0% 10% 0%)', opacity: 0.25, y: 24 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: galleryRef.current,
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
      id="facilities"
      ref={sectionRef}
      className="relative border-t border-white/[0.06] bg-[#070708] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-red-500 uppercase">
              Club Facilities
            </p>
            <h2 className="mt-2 font-display text-[clamp(2rem,3.8vw,3.2rem)] font-bold leading-[1.02] tracking-tight text-white uppercase text-balance">
              Purpose-Built Architectural Zones
            </h2>
          </div>
          <p className="max-w-md text-sm text-zinc-400">
            Click any zone to inspect the facility specification and equipment
            layout.
          </p>
        </div>

        <div
          ref={galleryRef}
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-12"
        >
          {FACILITIES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveFacility(item)}
              className={`group relative overflow-hidden rounded-sm border border-white/[0.08] bg-[#111114] text-left aspect-[4/3] md:aspect-auto md:h-[340px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${item.spanClass}`}
            >
              <ResilientImage
                src={item.image}
                alt={`${item.title} inside IRONVAULT FITNESS CLUB`}
                fallbackTitle={item.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#070708]/92 via-[#070708]/35 to-transparent transition-opacity duration-300"
                aria-hidden="true"
              />
              <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-sm border border-white/15 bg-[#070708]/70 text-zinc-300 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <Expand className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs font-medium tracking-wider text-red-500 uppercase">
                  {item.category}
                </p>
                <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white uppercase">
                  {item.title}
                </h3>
                <p className="mt-1.5 max-w-lg text-xs sm:text-sm text-zinc-300 line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Facility Lightbox Detail Modal */}
      {activeFacility && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeFacility.title}
          onClick={() => setActiveFacility(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-5"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden rounded-sm border border-white/15 bg-[#111114]"
          >
            <button
              type="button"
              onClick={() => setActiveFacility(null)}
              aria-label="Close facility view"
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-sm border border-white/20 bg-black/75 text-white hover:border-red-500 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-[16/10] w-full overflow-hidden bg-[#070708]">
              <ResilientImage
                src={activeFacility.image}
                alt={activeFacility.title}
                fallbackTitle={activeFacility.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-wider text-red-500 uppercase">
                {activeFacility.category}
              </p>
              <h3 className="mt-1 font-display text-3xl font-bold text-white uppercase">
                {activeFacility.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                {activeFacility.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
