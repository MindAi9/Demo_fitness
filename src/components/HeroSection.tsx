import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { CLUB_IMAGES } from '../data/clubData';
import { ResilientImage } from './ResilientImage';
import { MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onExploreMembership: () => void;
  onStartJourney: () => void;
}

export function HeroSection({
  onExploreMembership,
  onStartJourney,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgWrapRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Cinematic opening zoom-out + staggered split-line reveal
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        bgWrapRef.current,
        { scale: 1.14, opacity: 0.7 },
        { scale: 1.0, opacity: 1, duration: 1.45, ease: 'power2.out' },
        0
      )
        .fromTo(
          kickerRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65 },
          0.2
        )
        .fromTo(
          [line1Ref.current, line2Ref.current],
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.12 },
          0.32
        )
        .fromTo(
          subRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          0.62
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          0.74
        )
        .fromTo(
          scrollHintRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.95
        );

      // Subtle scroll parallax movement on hero background
      if (bgWrapRef.current && sectionRef.current) {
        gsap.to(bgWrapRef.current, {
          yPercent: 14,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#070708] pt-20"
    >
      {/* Background image with subtle blur & dark cinematic overlay */}
      <div
        ref={bgWrapRef}
        className="pointer-events-none absolute inset-0 z-0 will-change-transform"
      >
        <ResilientImage
          src={CLUB_IMAGES.hero}
          alt="Athlete preparing a heavy barbell squat inside IRONVAULT FITNESS CLUB"
          loading="eager"
          fallbackTitle="IRONVAULT FITNESS CLUB"
          className="h-full w-full object-cover object-center blur-[1.5px] brightness-[0.82]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#070708]/92 via-[#070708]/58 to-[#070708]/40"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#070708] via-transparent to-[#070708]/70"
          aria-hidden="true"
        />
      </div>

      {/* Sharp, high-contrast editorial content */}
      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="max-w-3xl">
          <div
            ref={kickerRef}
            className="mb-5 flex flex-wrap items-center gap-2.5 text-xs font-medium tracking-[0.18em] text-zinc-300 uppercase"
          >
            <span className="text-red-500 font-semibold">IRONVAULT FITNESS CLUB</span>
            <span aria-hidden="true" className="text-zinc-600">
              ·
            </span>
            <span>Strength &amp; Performance Sanctuary</span>
            <span aria-hidden="true" className="text-zinc-600">
              ·
            </span>
            <span className="text-zinc-400">Demo Experience</span>
          </div>

          <h1 className="font-display text-[clamp(3.1rem,7.2vw,6.25rem)] font-extrabold leading-[0.94] tracking-[0.01em] text-white uppercase text-balance">
            <span className="block overflow-hidden">
              <span ref={line1Ref} className="block will-change-transform">
                BUILD YOUR
              </span>
            </span>
            <span className="block overflow-hidden">
              <span ref={line2Ref} className="block will-change-transform">
                STRONGEST <span className="text-red-600">SELF.</span>
              </span>
            </span>
          </h1>

          <p
            ref={subRef}
            className="mt-6 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg"
          >
            Train with purpose. Push beyond limits. Become stronger every day.
          </p>

          <div
            ref={ctaRef}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              onClick={onExploreMembership}
              className="inline-flex items-center gap-2.5 bg-red-600 px-7 py-4 text-sm font-semibold tracking-wider text-white uppercase rounded-sm hover:bg-red-500 shadow-[0_12px_32px_-8px_rgba(220,38,38,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 whitespace-nowrap"
            >
              <span>Explore Membership</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </MagneticButton>

            <button
              type="button"
              onClick={onStartJourney}
              className="inline-flex items-center gap-2.5 border border-white/20 bg-white/[0.04] backdrop-blur-sm px-7 py-4 text-sm font-semibold tracking-wider text-white uppercase rounded-sm hover:border-white/45 hover:bg-white/[0.09] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 whitespace-nowrap"
            >
              <span>Start Your Journey</span>
            </button>
          </div>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group flex flex-col items-center gap-2 text-[11px] font-medium tracking-[0.22em] text-zinc-400 uppercase hover:text-white transition-colors"
        >
          <span>Scroll</span>
          <span className="relative flex h-8 w-5 items-start justify-center rounded-full border border-white/25 p-1">
            <span className="h-1.5 w-1 rounded-full bg-red-500 animate-bounce" />
          </span>
          <ChevronDown className="h-3.5 w-3.5 text-zinc-500 group-hover:text-red-500 transition-colors" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
