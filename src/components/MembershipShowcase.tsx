import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import {
  MEMBERSHIP_PLANS,
  MEMBERSHIP_BENEFITS,
  type MembershipPlan,
} from '../data/clubData';

gsap.registerPlugin(ScrollTrigger);

interface MembershipShowcaseProps {
  onSelectPlan: (planName: string) => void;
}

export function MembershipShowcase({ onSelectPlan }: MembershipShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktopAnimated, setIsDesktopAnimated] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsDesktopAnimated(false);
      return;
    }

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      setIsDesktopAnimated(true);
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length < 3 || !pinContainerRef.current) return;

      // Initial stacked perspective positions: BASIC active, PRO & ELITE queued
      gsap.set(cards[0], {
        xPercent: 0,
        scale: 1.02,
        opacity: 1,
        rotateY: 0,
        zIndex: 30,
      });
      gsap.set(cards[1], {
        xPercent: 74,
        scale: 0.84,
        opacity: 0.45,
        rotateY: -9,
        zIndex: 20,
      });
      gsap.set(cards[2], {
        xPercent: 142,
        scale: 0.72,
        opacity: 0.16,
        rotateY: -15,
        zIndex: 10,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainerRef.current,
          pin: true,
          scrub: 0.75,
          start: 'top top',
          end: '+=1650',
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            scrollTriggerRef.current = self;
            const p = self.progress;
            if (p < 0.34) {
              setActiveIndex(0);
            } else if (p < 0.72) {
              setActiveIndex(1);
            } else {
              setActiveIndex(2);
            }
          },
        },
      });

      scrollTriggerRef.current = tl.scrollTrigger || null;

      // Step 1: BASIC scales back left, PRO zooms forward to center, ELITE moves to right queue
      tl.to(
        cards[0],
        {
          xPercent: -74,
          scale: 0.84,
          opacity: 0.42,
          rotateY: 9,
          zIndex: 15,
          duration: 1,
          ease: 'power2.inOut',
        },
        0
      )
        .to(
          cards[1],
          {
            xPercent: 0,
            scale: 1.03,
            opacity: 1,
            rotateY: 0,
            zIndex: 30,
            duration: 1,
            ease: 'power2.inOut',
          },
          0
        )
        .to(
          cards[2],
          {
            xPercent: 74,
            scale: 0.84,
            opacity: 0.45,
            rotateY: -9,
            zIndex: 20,
            duration: 1,
            ease: 'power2.inOut',
          },
          0
        )
        // Hold briefly on PRO
        .to({}, { duration: 0.2 })
        // Step 2: PRO scales back left, ELITE zooms forward to center
        .to(
          cards[0],
          {
            xPercent: -142,
            scale: 0.72,
            opacity: 0.15,
            rotateY: 15,
            zIndex: 10,
            duration: 1,
            ease: 'power2.inOut',
          },
          1.2
        )
        .to(
          cards[1],
          {
            xPercent: -74,
            scale: 0.84,
            opacity: 0.42,
            rotateY: 9,
            zIndex: 15,
            duration: 1,
            ease: 'power2.inOut',
          },
          1.2
        )
        .to(
          cards[2],
          {
            xPercent: 0,
            scale: 1.03,
            opacity: 1,
            rotateY: 0,
            zIndex: 30,
            duration: 1,
            ease: 'power2.inOut',
          },
          1.2
        );

      return () => {
        scrollTriggerRef.current = null;
      };
    });

    mm.add('(max-width: 1023px)', () => {
      setIsDesktopAnimated(false);
    });

    return () => {
      mm.revert();
    };
  }, []);

  const jumpToPlanDesktop = (index: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;
    const progressTargets = [0.02, 0.5, 0.98];
    const targetY = st.start + (st.end - st.start) * progressTargets[index];
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const scrollMobileCard = (direction: 'prev' | 'next') => {
    const track = mobileTrackRef.current;
    if (!track) return;
    const nextIdx =
      direction === 'next'
        ? Math.min(MEMBERSHIP_PLANS.length - 1, activeIndex + 1)
        : Math.max(0, activeIndex - 1);
    setActiveIndex(nextIdx);
    const child = track.children[nextIdx] as HTMLElement | undefined;
    if (child) {
      child.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  };

  const renderPlanCard = (
    plan: MembershipPlan,
    index: number,
    isMobile: boolean
  ) => {
    const isActive = activeIndex === index;

    return (
      <div
        className={`relative flex h-full flex-col justify-between rounded-sm border p-7 sm:p-9 transition-colors duration-300 ${
          plan.highlighted || isActive
            ? 'border-red-600/60 bg-gradient-to-b from-[#17171C] to-[#0E0E11] shadow-[0_28px_70px_-20px_rgba(0,0,0,0.9),0_0_40px_-15px_rgba(220,38,38,0.22)]'
            : 'border-white/10 bg-gradient-to-b from-[#131317] to-[#0B0B0D] shadow-[0_24px_55px_-20px_rgba(0,0,0,0.85)]'
        }`}
      >
        <div>
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono-tabular text-xs font-medium tracking-widest text-zinc-400 uppercase">
              {plan.tierLabel}
            </span>
            {plan.highlighted && (
              <span className="text-[11px] font-semibold tracking-[0.16em] text-red-500 uppercase">
                Most Popular · Demo
              </span>
            )}
          </div>

          <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-white/[0.08] pb-6">
            <h3 className="font-display text-4xl sm:text-5xl font-extrabold tracking-wide text-white uppercase">
              {plan.name}
            </h3>
            <div className="text-right">
              <span className="font-display text-4xl font-bold text-white tabular-nums">
                {plan.demoPrice}
              </span>
              <p className="text-[11px] text-zinc-400">{plan.billingNote}</p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-zinc-300">
            {plan.summary}
          </p>

          <ul className="mt-6 space-y-3">
            {plan.features.map((feat) => (
              <li
                key={feat}
                className="flex items-start gap-3 text-sm text-zinc-200"
              >
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-red-500"
                  aria-hidden="true"
                />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.08]">
          <button
            type="button"
            onClick={() => onSelectPlan(`${plan.name} (${plan.demoPrice}/mo Demo)`)}
            className={`group flex w-full items-center justify-center gap-2 py-3.5 px-6 text-xs font-semibold tracking-[0.16em] uppercase rounded-sm transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 ${
              plan.highlighted || isActive || isMobile
                ? 'bg-red-600 text-white hover:bg-red-500'
                : 'border border-white/15 bg-white/[0.04] text-white hover:border-red-500/60 hover:bg-red-600'
            }`}
          >
            <span>Choose This Plan</span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    );
  };

  return (
    <section
      id="membership"
      ref={sectionRef}
      className="relative border-t border-white/[0.06] bg-[#070708] overflow-x-clip"
    >
      {/* Desktop Pinned Stage (>= 1024px) */}
      <div
        ref={pinContainerRef}
        className={`relative mx-auto max-w-[1320px] px-5 sm:px-8 ${
          isDesktopAnimated
            ? 'hidden lg:flex lg:min-h-screen lg:flex-col lg:justify-center py-16'
            : 'hidden'
        }`}
      >
        {/* Header & Tier Step Indicator */}
        <div className="flex items-end justify-between gap-8 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-red-500 uppercase">
              Membership Architecture · Demo Pricing
            </p>
            <h2 className="mt-2 font-display text-[clamp(2.25rem,3.8vw,3.3rem)] font-bold leading-[1.02] tracking-tight text-white uppercase">
              Choose Your Training Access
            </h2>
          </div>

          <div className="flex items-center gap-2 rounded-sm border border-white/[0.08] bg-[#111114] p-1">
            {MEMBERSHIP_PLANS.map((plan, idx) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => jumpToPlanDesktop(idx)}
                className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-sm transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                  activeIndex === idx
                    ? 'bg-red-600 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                0{idx + 1} · {plan.name}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Perspective Stage */}
        <div
          className="relative mx-auto w-full h-[500px] flex items-center justify-center"
          style={{ perspective: '1400px' }}
        >
          {MEMBERSHIP_PLANS.map((plan, idx) => (
            <div
              key={plan.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              onClick={() => {
                if (activeIndex !== idx) jumpToPlanDesktop(idx);
              }}
              className={`absolute w-[460px] h-[480px] will-change-transform ${
                activeIndex !== idx ? 'cursor-pointer' : ''
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {renderPlanCard(plan, idx, false)}
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between text-xs text-zinc-500">
          <span>Scroll to advance through membership tiers</span>
          <span className="font-mono-tabular text-zinc-400">
            Active Tier: 0{activeIndex + 1} / 03 ({MEMBERSHIP_PLANS[activeIndex].name})
          </span>
        </div>
      </div>

      {/* Mobile / Tablet / Reduced-Motion Fallback Experience */}
      <div
        className={`mx-auto max-w-[1320px] px-5 py-20 sm:px-8 ${
          isDesktopAnimated ? 'lg:hidden' : 'block'
        }`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-red-500 uppercase">
              Membership Architecture · Demo Pricing
            </p>
            <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.04] tracking-tight text-white uppercase text-balance">
              Choose Your Training Access
            </h2>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => scrollMobileCard('prev')}
              aria-label="Previous membership plan"
              className="flex h-11 w-11 items-center justify-center rounded-sm border border-white/15 bg-[#111114] text-white hover:border-red-500 transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollMobileCard('next')}
              aria-label="Next membership plan"
              className="flex h-11 w-11 items-center justify-center rounded-sm border border-white/15 bg-[#111114] text-white hover:border-red-500 transition-colors cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={mobileTrackRef}
          onScroll={(e) => {
            const target = e.currentTarget;
            const center = target.scrollLeft + target.clientWidth / 2;
            const children = Array.from(target.children) as HTMLElement[];
            let closestIdx = 0;
            let minDist = Infinity;
            children.forEach((child, idx) => {
              const childCenter = child.offsetLeft + child.offsetWidth / 2;
              const dist = Math.abs(center - childCenter);
              if (dist < minDist) {
                minDist = dist;
                closestIdx = idx;
              }
            });
            setActiveIndex(closestIdx);
          }}
          className="mt-10 flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible"
        >
          {MEMBERSHIP_PLANS.map((plan, idx) => (
            <div
              key={plan.id}
              className="w-[86vw] max-w-[400px] shrink-0 snap-center lg:w-auto lg:max-w-none"
            >
              {renderPlanCard(plan, idx, true)}
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-2 lg:hidden">
          {MEMBERSHIP_PLANS.map((plan, idx) => (
            <button
              key={plan.id}
              type="button"
              aria-label={`View ${plan.name} plan`}
              onClick={() => {
                setActiveIndex(idx);
                const child = mobileTrackRef.current?.children[idx] as
                  | HTMLElement
                  | undefined;
                child?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                  inline: 'center',
                });
              }}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeIndex === idx ? 'w-7 bg-red-600' : 'w-2 bg-zinc-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Membership Benefits Strip */}
      <div className="border-t border-white/[0.06] bg-[#0B0B0D] py-16">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="font-display text-2xl font-bold tracking-wide text-white uppercase">
              Included Membership Benefits
            </h3>
            <span className="text-xs text-zinc-400">
              Standard across IRONVAULT demo tiers
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MEMBERSHIP_BENEFITS.map((benefit) => (
              <div
                key={benefit.index}
                className="border-t border-white/10 pt-5"
              >
                <span className="font-mono-tabular text-xs text-red-500">
                  {benefit.index}
                </span>
                <h4 className="mt-2 font-display text-xl font-bold text-white uppercase">
                  {benefit.title}
                </h4>
                <p className="mt-2 text-sm text-zinc-400">{benefit.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
