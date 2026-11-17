import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onStartJourney: () => void;
}

const NAV_LINKS = [
  { id: 'programs', label: 'Programs' },
  { id: 'membership', label: 'Membership' },
  { id: 'facilities', label: 'Facilities' },
  { id: 'trainers', label: 'Trainers' },
  { id: 'schedule', label: 'Schedule' },
];

export function Navbar({ onNavigate, onStartJourney }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#070708]/88 backdrop-blur-md border-b border-white/[0.08]'
          : 'bg-gradient-to-b from-[#070708]/80 to-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-8 px-5 py-4 sm:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('hero');
          }}
          className="font-display text-2xl font-extrabold tracking-[0.08em] text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-sm"
        >
          IRON<span className="text-red-600">VAULT</span>
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.id);
              }}
              className="nav-link-underline py-1 hover:text-white transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + mobile menu trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onStartJourney();
            }}
            className="hidden md:inline-flex items-center justify-center bg-red-600 px-5 py-2.5 text-xs font-semibold tracking-wider text-white uppercase rounded-sm hover:bg-red-500 active:scale-[0.98] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          >
            Start Journey
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex md:hidden items-center justify-center h-11 w-11 rounded-sm border border-white/10 bg-[#111114]/80 text-white hover:border-white/25 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.08] bg-[#0B0B0D]/95 backdrop-blur-lg px-5 py-6">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
                className="flex items-center justify-between py-3 px-2 text-base font-medium text-zinc-200 hover:text-white border-b border-white/[0.06] transition-colors"
              >
                <span>{link.label}</span>
                <span className="text-xs text-red-500 font-mono-tabular">→</span>
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onStartJourney();
              }}
              className="mt-4 w-full bg-red-600 py-3.5 px-6 text-sm font-semibold tracking-wider text-white uppercase rounded-sm hover:bg-red-500 transition-colors cursor-pointer"
            >
              Start Your Journey
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
