import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { SAMPLE_TESTIMONIALS } from '../data/clubData';
import { StarHighlight } from './StarHighlight';

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const total = SAMPLE_TESTIMONIALS.length;
  const active = SAMPLE_TESTIMONIALS[index];

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + total) % total);
  };

  return (
    <section
      id="testimonials"
      className="relative border-t border-white/[0.06] bg-[#0B0B0D] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-red-500 uppercase">
              Member Stories · Sample Demo Content
            </p>
            <h2 className="mt-2 font-display text-[clamp(2rem,3.8vw,3.1rem)] font-bold leading-[1.02] tracking-tight text-white uppercase text-balance">
              Built on Consistency
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous sample testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-sm border border-white/15 bg-[#111114] text-white hover:border-red-500 hover:text-red-500 transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next sample testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-sm border border-white/15 bg-[#111114] text-white hover:border-red-500 hover:text-red-500 transition-colors cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-sm border border-white/[0.08] bg-[#111114] p-7 sm:p-12">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: direction * 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -28 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) handleNext();
                else if (info.offset.x > 50) handlePrev();
              }}
              className="cursor-grab active:cursor-grabbing"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <StarHighlight
                  count={active.stars}
                  size="md"
                  label="Decorative five-star highlight"
                />
                <span className="text-xs font-medium text-zinc-400">
                  {active.sampleLabel}
                </span>
              </div>

              <div className="mt-7 flex items-start gap-4">
                <Quote
                  className="hidden sm:block h-8 w-8 shrink-0 text-red-600/60"
                  aria-hidden="true"
                />
                <blockquote className="font-display text-2xl sm:text-4xl font-semibold leading-[1.18] tracking-wide text-white">
                  “{active.quote}”
                </blockquote>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-6">
                <div>
                  <p className="text-base font-semibold text-white">
                    {active.name}
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-400">
                    {active.memberFocus}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {SAMPLE_TESTIMONIALS.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setDirection(idx > index ? 1 : -1);
                        setIndex(idx);
                      }}
                      aria-label={`View sample testimonial ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        idx === index ? 'w-7 bg-red-600' : 'w-2 bg-zinc-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
