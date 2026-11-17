import { useEffect, useState, type FormEvent } from 'react';
import {
  Plus,
  Minus,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { FAQ_ITEMS, DEMO_CONTACT } from '../data/clubData';

interface FaqAndContactSectionProps {
  selectedInterest: string;
  onInterestChange: (val: string) => void;
}

const INTEREST_OPTIONS = [
  'BASIC ($49/mo Demo)',
  'PRO ($89/mo Demo)',
  'ELITE ($149/mo Demo)',
  'Strength Training',
  'Weight Training',
  'Cardio Fitness',
  'Functional Training',
  'Personal Training',
  'Group Classes',
  'General Club Tour',
];

export function FaqAndContactSection({
  selectedInterest,
  onInterestChange,
}: FaqAndContactSectionProps) {
  const [openFaqId, setOpenFaqId] = useState<string>(FAQ_ITEMS[0].id);
  const [mapTab, setMapTab] = useState<'map' | 'access'>('map');

  // Enquiry Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSubmitted(false);
  }, [selectedInterest]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim()) {
      setFormError('Please enter your name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }

    if (phone.trim() && phone.trim().length < 7) {
      setFormError('Please enter a valid phone number or leave it blank.');
      return;
    }

    setSubmitted(true);
  };

  const whatsappText = encodeURIComponent(
    `Hello IRONVAULT FITNESS CLUB (Demo), I would like to enquire about: ${selectedInterest || 'Membership Options'}.`
  );
  const whatsappUrl = `https://wa.me/${DEMO_CONTACT.whatsappDigits}?text=${whatsappText}`;

  const effectiveOptions = INTEREST_OPTIONS.includes(selectedInterest)
    ? INTEREST_OPTIONS
    : [selectedInterest, ...INTEREST_OPTIONS];

  return (
    <>
      {/* FAQ Section */}
      <section
        id="faq"
        className="relative border-t border-white/[0.06] bg-[#070708] py-24 sm:py-28"
      >
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-[0.2em] text-red-500 uppercase">
                Questions &amp; Answers
              </p>
              <h2 className="mt-2 font-display text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.04] tracking-tight text-white uppercase text-balance">
                Club Information &amp; Demo Details
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400">
                Clear answers about our fictional demo plans, training tracks,
                and enquiry workflow.
              </p>
            </div>

            <div className="lg:col-span-7 divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {FAQ_ITEMS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div key={faq.id}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-red-400 cursor-pointer"
                    >
                      <span className="font-display text-xl sm:text-2xl font-bold tracking-wide text-white uppercase">
                        {faq.question}
                      </span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-white/10 text-zinc-300">
                        {isOpen ? (
                          <Minus className="h-4 w-4 text-red-500" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="pb-6 pr-8 text-sm leading-relaxed text-zinc-400">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact, Enquiry, Map Placeholder & WhatsApp Section */}
      <section
        id="contact"
        className="relative border-t border-white/[0.06] bg-[#0B0B0D] py-24 sm:py-32"
      >
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-red-500 uppercase">
                Start Your Journey · Demo Contact
              </p>
              <h2 className="mt-2 font-display text-[clamp(2rem,3.8vw,3.2rem)] font-bold leading-[1.02] tracking-tight text-white uppercase text-balance">
                Membership &amp; Session Enquiry
              </h2>
            </div>
            <p className="text-xs text-zinc-400">
              All contact numbers and locations below are placeholder demo data.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Enquiry Form */}
            <div className="lg:col-span-7 rounded-sm border border-white/[0.08] bg-[#111114] p-7 sm:p-10">
              {submitted ? (
                <div className="flex flex-col items-start py-8">
                  <CheckCircle2
                    className="h-10 w-10 text-red-500"
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 font-display text-3xl font-bold text-white uppercase">
                    Demo Enquiry Recorded
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-300">
                    Thank you, <span className="text-white font-medium">{fullName}</span>. Your sample enquiry for{' '}
                    <span className="text-red-400 font-medium">{selectedInterest}</span> has been validated in this interactive demo.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFullName('');
                      setEmail('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="mt-6 border border-white/15 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold tracking-wider text-white uppercase rounded-sm hover:border-red-500 transition-colors cursor-pointer"
                  >
                    Submit Another Demo Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="enquiry-name"
                        className="block text-xs font-semibold tracking-wider text-zinc-300 uppercase"
                      >
                        Full Name *
                      </label>
                      <input
                        id="enquiry-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="mt-2 w-full rounded-sm border border-white/10 bg-[#070708] px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-red-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="enquiry-email"
                        className="block text-xs font-semibold tracking-wider text-zinc-300 uppercase"
                      >
                        Email Address *
                      </label>
                      <input
                        id="enquiry-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@example.com"
                        className="mt-2 w-full rounded-sm border border-white/10 bg-[#070708] px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-red-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="enquiry-phone"
                        className="block text-xs font-semibold tracking-wider text-zinc-300 uppercase"
                      >
                        Phone (Optional)
                      </label>
                      <input
                        id="enquiry-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="mt-2 w-full rounded-sm border border-white/10 bg-[#070708] px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-red-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="enquiry-interest"
                        className="block text-xs font-semibold tracking-wider text-zinc-300 uppercase"
                      >
                        Plan or Program Focus
                      </label>
                      <select
                        id="enquiry-interest"
                        value={selectedInterest}
                        onChange={(e) => onInterestChange(e.target.value)}
                        className="mt-2 w-full rounded-sm border border-white/10 bg-[#070708] px-4 py-3 text-sm text-white focus:border-red-500 focus:outline-none"
                      >
                        {effectiveOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-message"
                      className="block text-xs font-semibold tracking-wider text-zinc-300 uppercase"
                    >
                      Training Goals (Optional)
                    </label>
                    <textarea
                      id="enquiry-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share your preferred schedule or training focus..."
                      className="mt-2 w-full rounded-sm border border-white/10 bg-[#070708] px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  {formError && (
                    <p
                      role="alert"
                      className="text-xs font-medium text-red-400"
                    >
                      {formError}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      type="submit"
                      className="bg-red-600 px-7 py-3.5 text-xs font-semibold tracking-wider text-white uppercase rounded-sm hover:bg-red-500 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Submit Demo Enquiry
                    </button>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-white/15 bg-white/[0.04] px-6 py-3.5 text-xs font-semibold tracking-wider text-white uppercase rounded-sm hover:border-emerald-500/60 hover:text-emerald-400 transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      <span>WhatsApp Enquiry (Demo)</span>
                    </a>
                  </div>
                </form>
              )}
            </div>

            {/* Club Info & Map Placeholder */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div className="rounded-sm border border-white/[0.08] bg-[#111114] p-7">
                <h3 className="font-display text-2xl font-bold text-white uppercase">
                  Demo Club Concierge
                </h3>
                <div className="mt-5 space-y-4 text-sm text-zinc-300">
                  <div className="flex items-start gap-3">
                    <MapPin
                      className="mt-0.5 h-4 w-4 shrink-0 text-red-500"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-white">{DEMO_CONTACT.addressLine1}</p>
                      <p className="text-xs text-zinc-400">
                        {DEMO_CONTACT.addressLine2}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone
                      className="h-4 w-4 shrink-0 text-red-500"
                      aria-hidden="true"
                    />
                    <span>{DEMO_CONTACT.phoneDisplay}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail
                      className="h-4 w-4 shrink-0 text-red-500"
                      aria-hidden="true"
                    />
                    <span>{DEMO_CONTACT.email}</span>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/[0.08] pt-5">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                    <Clock className="h-3.5 w-3.5 text-red-500" aria-hidden="true" />
                    <span>Demo Operating Hours</span>
                  </div>
                  <div className="mt-3 space-y-1.5 text-xs">
                    {DEMO_CONTACT.hours.map((h) => (
                      <div
                        key={h.label}
                        className="flex items-center justify-between text-zinc-300"
                      >
                        <span>{h.label}</span>
                        <span className="font-mono-tabular text-zinc-400">
                          {h.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Architectural Location / Map Placeholder */}
              <div className="overflow-hidden rounded-sm border border-white/[0.08] bg-[#111114]">
                <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-3">
                  <span className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">
                    Location Map Placeholder
                  </span>
                  <div className="flex items-center gap-1 rounded-sm bg-[#070708] p-0.5">
                    <button
                      type="button"
                      onClick={() => setMapTab('map')}
                      className={`px-2.5 py-1 text-[11px] font-medium rounded-sm cursor-pointer transition-colors ${
                        mapTab === 'map'
                          ? 'bg-red-600 text-white'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Grid View
                    </button>
                    <button
                      type="button"
                      onClick={() => setMapTab('access')}
                      className={`px-2.5 py-1 text-[11px] font-medium rounded-sm cursor-pointer transition-colors ${
                        mapTab === 'access'
                          ? 'bg-red-600 text-white'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Access Info
                    </button>
                  </div>
                </div>

                {mapTab === 'map' ? (
                  <div className="relative h-48 w-full bg-[#09090B] overflow-hidden">
                    <svg
                      viewBox="0 0 400 180"
                      className="h-full w-full opacity-55"
                      aria-label="Demo street grid map schematic"
                    >
                      <defs>
                        <pattern
                          id="demo-grid"
                          width="32"
                          height="32"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M 32 0 L 0 0 0 32"
                            fill="none"
                            stroke="rgba(255,255,255,0.08)"
                            strokeWidth="1"
                          />
                        </pattern>
                      </defs>
                      <rect width="400" height="180" fill="url(#demo-grid)" />
                      <path
                        d="M 0 92 L 400 78 M 145 0 L 165 180 M 270 0 L 250 180"
                        stroke="rgba(255,255,255,0.18)"
                        strokeWidth="2.5"
                        fill="none"
                      />
                      <circle
                        cx="205"
                        cy="86"
                        r="18"
                        fill="rgba(220,38,38,0.18)"
                        stroke="#dc2626"
                        strokeWidth="1.5"
                      />
                      <circle cx="205" cy="86" r="5" fill="#dc2626" />
                    </svg>
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-zinc-400">
                      <span>Foundry District Demo Pin</span>
                      <span className="font-mono-tabular">37.7749° N · Demo</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-48 flex-col justify-center px-6 text-xs leading-relaxed text-zinc-300 space-y-2">
                    <p className="font-semibold text-white uppercase tracking-wider">
                      Demo Transit &amp; Parking Notes
                    </p>
                    <p>
                      Sample underground member parking entrance on 7th Street
                      with bike racks and ground-floor ADA step-free entry.
                    </p>
                    <p className="text-zinc-400">
                      Replace this placeholder module with an embedded map when
                      deploying to a live facility address.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
