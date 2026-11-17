import { DEMO_CONTACT } from '../data/clubData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const footerLinks = [
    { id: 'about', label: 'About' },
    { id: 'membership', label: 'Membership' },
    { id: 'programs', label: 'Programs' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'trainers', label: 'Trainers' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <footer className="border-t border-white/[0.08] bg-[#070708] py-14">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('hero');
              }}
              className="font-display text-2xl font-extrabold tracking-[0.08em] text-white"
            >
              IRON<span className="text-red-600">VAULT</span>{' '}
              <span className="text-zinc-400 font-semibold text-lg tracking-wider">
                FITNESS CLUB
              </span>
            </a>
            <p className="mt-2 text-xs text-zinc-500">
              {DEMO_CONTACT.addressLine1} · {DEMO_CONTACT.addressLine2}
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-zinc-400"
          >
            {footerLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(link.id);
                }}
                className="hover:text-white transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/[0.06] pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} IRONVAULT FITNESS CLUB. Fictional demo
            concept for showcase purposes.
          </p>
          <p>
            All pricing, schedules, testimonials, and contact details are sample
            placeholder data.
          </p>
        </div>
      </div>
    </footer>
  );
}
