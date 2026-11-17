import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutAndWhySection } from './components/AboutAndWhySection';
import { StatsHighlightsSection } from './components/StatsHighlightsSection';
import { MembershipShowcase } from './components/MembershipShowcase';
import { ProgramsSection } from './components/ProgramsSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { TrainersSection } from './components/TrainersSection';
import { ScheduleSection } from './components/ScheduleSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqAndContactSection } from './components/FaqAndContactSection';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [selectedInterest, setSelectedInterest] = useState('PRO ($89/mo Demo)');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -64 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const routeToEnquiry = (interestLabel: string) => {
    setSelectedInterest(interestLabel);
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-[#070708] text-[#FAFAFA] font-sans">
      <Navbar
        onNavigate={scrollToSection}
        onStartJourney={() => scrollToSection('contact')}
      />

      <main>
        <HeroSection
          onExploreMembership={() => scrollToSection('membership')}
          onStartJourney={() => scrollToSection('contact')}
        />

        <AboutAndWhySection />

        <StatsHighlightsSection />

        <MembershipShowcase onSelectPlan={routeToEnquiry} />

        <ProgramsSection onEnquireProgram={routeToEnquiry} />

        <FacilitiesSection />

        <TrainersSection
          onBookTrainer={(trainerName) =>
            routeToEnquiry(`Intro Session with ${trainerName}`)
          }
        />

        <ScheduleSection onBookClass={routeToEnquiry} />

        <TestimonialsSection />

        <FaqAndContactSection
          selectedInterest={selectedInterest}
          onInterestChange={setSelectedInterest}
        />
      </main>

      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
