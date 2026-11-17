export interface MembershipPlan {
  id: 'basic' | 'pro' | 'elite';
  tierLabel: string;
  name: string;
  demoPrice: string;
  billingNote: string;
  summary: string;
  features: string[];
  highlighted?: boolean;
}

export interface StatHighlight {
  id: string;
  label: string;
  stars: number;
  descriptor: string;
}

export interface DemoCounter {
  id: string;
  value: number;
  suffix: string;
  label: string;
  note: string;
}

export interface TrainerProfile {
  id: string;
  name: string;
  specialty: string;
  intro: string;
  image: string;
  stars: number;
  focusTag: string;
}

export interface FacilityItem {
  id: string;
  title: string;
  category: string;
  caption: string;
  image: string;
  spanClass: string;
}

export interface WorkoutProgram {
  id: string;
  index: string;
  title: string;
  focus: string;
  duration: string;
  description: string;
  outcomes: string[];
}

export interface ScheduleEntry {
  id: string;
  className: string;
  trainer: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  time: string;
  zone: string;
  intensity: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  memberFocus: string;
  quote: string;
  stars: number;
  sampleLabel: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const CLUB_IMAGES = {
  hero: '/src/assets/images/hero_gym_athlete_1794927055242.jpg',
  aboutBarbell: '/src/assets/images/about_iron_barbell_1794927057462.jpg',
  facilityStrength: '/src/assets/images/facility_strength_zone_1794927055864.jpg',
  facilityCardio: '/src/assets/images/facility_cardio_zone_1794927055692.jpg',
  facilityFunctional: '/src/assets/images/facility_functional_turf_1794927056930.jpg',
  trainerStrength: '/src/assets/images/trainer_strength_coach_1794927057100.jpg',
  trainerConditioning: '/src/assets/images/trainer_conditioning_coach_1794927058491.jpg',
  trainerFunctional: '/src/assets/images/trainer_functional_coach_1794927058543.jpg',
};

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'basic',
    tierLabel: '01 · Foundation Tier',
    name: 'BASIC',
    demoPrice: '$49',
    billingNote: 'per month · Demo Pricing',
    summary: 'Essential open-floor training access for disciplined self-guided lifters.',
    features: [
      'Gym access',
      'Standard equipment',
      'General workout area',
      'Digital floor orientation (Demo)',
      'Locker & shower access',
    ],
  },
  {
    id: 'pro',
    tierLabel: '02 · Performance Tier',
    name: 'PRO',
    demoPrice: '$89',
    billingNote: 'per month · Demo Pricing',
    summary: 'Structured coaching guidance paired with high-output group conditioning.',
    features: [
      'Full gym access',
      'Trainer guidance',
      'Group workout sessions',
      'Strength & cardio zone priority',
      'Monthly progress check-in (Demo)',
    ],
    highlighted: true,
  },
  {
    id: 'elite',
    tierLabel: '03 · Flagship Tier',
    name: 'ELITE',
    demoPrice: '$149',
    billingNote: 'per month · Demo Pricing',
    summary: 'Complete individualized programming with dedicated 1-on-1 coaching.',
    features: [
      'Premium gym access',
      'Personal training sessions',
      'Priority facilities',
      'Custom training block planning',
      'Dedicated recovery lounge access',
    ],
  },
];

export const MEMBERSHIP_BENEFITS = [
  {
    index: '01',
    title: 'Zero Crowded Floor Chaos',
    detail: 'Capped demo club capacity keeps platforms, racks, and turf lanes accessible.',
  },
  {
    index: '02',
    title: 'Flexible Demo Terms',
    detail: 'Sample month-to-month structures with transparent demo pricing and no hidden fees.',
  },
  {
    index: '03',
    title: 'Integrated Coaching Path',
    detail: 'Seamless transitions between open-gym lifting, group sessions, and 1-on-1 training.',
  },
  {
    index: '04',
    title: 'Recovery & Mobility Access',
    detail: 'Dedicated warm-up bays, mobility stations, and post-session hydration bar.',
  },
];

export const STAR_HIGHLIGHTS: StatHighlight[] = [
  {
    id: 'star-rating',
    label: 'Star Rating',
    stars: 5,
    descriptor: 'Visual Benchmark · Demo Showcase',
  },
  {
    id: 'trainer-experience',
    label: 'Trainer Experience',
    stars: 5,
    descriptor: 'Dedicated Coaching · Demo Highlight',
  },
  {
    id: 'member-experience',
    label: 'Member Experience',
    stars: 5,
    descriptor: 'Focused Environment · Demo Highlight',
  },
  {
    id: 'training-quality',
    label: 'Training Quality',
    stars: 5,
    descriptor: 'Precision Equipment · Demo Highlight',
  },
];

export const DEMO_COUNTERS: DemoCounter[] = [
  {
    id: 'sqft',
    value: 18000,
    suffix: ' sq ft',
    label: 'Training Floor Footprint',
    note: 'Fictional Demo Spec',
  },
  {
    id: 'racks',
    value: 14,
    suffix: ' Racks',
    label: 'Competition Power Stations',
    note: 'Fictional Demo Spec',
  },
  {
    id: 'zones',
    value: 6,
    suffix: ' Zones',
    label: 'Specialized Conditioning Bays',
    note: 'Fictional Demo Spec',
  },
  {
    id: 'sessions',
    value: 42,
    suffix: ' / wk',
    label: 'Scheduled Coach-Led Classes',
    note: 'Fictional Demo Spec',
  },
];

export const TRAINERS: TrainerProfile[] = [
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    specialty: 'Strength & Barbell Mechanics',
    intro:
      'Focuses on progressive overload, squat and deadlift biomechanics, and long-term structural strength for everyday athletes.',
    image: CLUB_IMAGES.trainerStrength,
    stars: 5,
    focusTag: 'Demo Coach · Strength Floor',
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    specialty: 'Conditioning & Metabolic Output',
    intro:
      'Designs structured threshold intervals, sled conditioning blocks, and sustainable engine-building sessions for high stamina.',
    image: CLUB_IMAGES.trainerConditioning,
    stars: 5,
    focusTag: 'Demo Coach · Conditioning Zone',
  },
  {
    id: 'devon-brooks',
    name: 'Devon Brooks',
    specialty: 'Functional Movement & Mobility',
    intro:
      'Combines kettlebell power, rotational core stability, and athletic joint prep to build resilient real-world movement.',
    image: CLUB_IMAGES.trainerFunctional,
    stars: 5,
    focusTag: 'Demo Coach · Functional Turf',
  },
];

export const FACILITIES: FacilityItem[] = [
  {
    id: 'strength-training',
    title: 'Strength Training',
    category: 'Zone 01 · Free Weights & Racks',
    caption: 'Custom matte-black power racks, calibrated competition iron plates, and dedicated deadlift platforms.',
    image: CLUB_IMAGES.facilityStrength,
    spanClass: 'md:col-span-7',
  },
  {
    id: 'modern-equipment',
    title: 'Modern Gym Equipment',
    category: 'Zone 02 · Precision Iron',
    caption: 'Knurled steel Olympic barbells, competition benches, and precision-machined plate-loaded leverage stations.',
    image: CLUB_IMAGES.aboutBarbell,
    spanClass: 'md:col-span-5',
  },
  {
    id: 'cardio-zone',
    title: 'Cardio Zone',
    category: 'Zone 03 · Metabolic Engine',
    caption: 'Non-motorized curved sprint treadmills, Concept-style ergometers, and acoustic-treated endurance lanes.',
    image: CLUB_IMAGES.facilityCardio,
    spanClass: 'md:col-span-5',
  },
  {
    id: 'functional-training',
    title: 'Functional Training',
    category: 'Zone 04 · 30m Turf Track',
    caption: 'Weighted prowler sleds, cast-iron kettlebell racks, plyometric boxes, and sled sprint lanes.',
    image: CLUB_IMAGES.facilityFunctional,
    spanClass: 'md:col-span-7',
  },
  {
    id: 'workout-space',
    title: 'Workout Space',
    category: 'Zone 05 · Architectural Floor',
    caption: 'High-ceiling concrete bay with linear studio lighting, shock-absorbent flooring, and generous spacing.',
    image: CLUB_IMAGES.hero,
    spanClass: 'md:col-span-6',
  },
  {
    id: 'group-training',
    title: 'Group Training Area',
    category: 'Zone 06 · Team Conditioning',
    caption: 'Dedicated multi-station rig and open conditioning floor built for coach-led small-group intensity.',
    image: CLUB_IMAGES.facilityFunctional,
    spanClass: 'md:col-span-6',
  },
];

export const WORKOUT_PROGRAMS: WorkoutProgram[] = [
  {
    id: 'strength-training',
    index: '01',
    title: 'Strength Training',
    focus: 'Barbell & Compound Force',
    duration: '60 min · Demo Track',
    description:
      'Structured linear and wave-loaded barbell cycles centered on squat, press, hinge, and heavy pull mechanics.',
    outcomes: ['Technique coaching', 'Tracked progression', 'Platform priority'],
  },
  {
    id: 'weight-training',
    index: '02',
    title: 'Weight Training',
    focus: 'Hypertrophy & Sculpt',
    duration: '55 min · Demo Track',
    description:
      'Targeted resistance blocks combining free weights and controlled eccentric tension for balanced muscular development.',
    outcomes: ['Full-body split options', 'Tempo precision', 'Joint-friendly mechanics'],
  },
  {
    id: 'cardio-fitness',
    index: '03',
    title: 'Cardio Fitness',
    focus: 'Aerobic & Threshold Work',
    duration: '45 min · Demo Track',
    description:
      'Heart-rate zoned intervals across curved treadmills, rowers, and ski ergs designed to expand work capacity.',
    outcomes: ['Zone 2 endurance', 'VO2 interval pacing', 'Low-impact options'],
  },
  {
    id: 'functional-training',
    index: '04',
    title: 'Functional Training',
    focus: 'Power, Sleds & Carry',
    duration: '50 min · Demo Track',
    description:
      'Multi-planar athletic conditioning built around loaded carries, kettlebell ballistics, and explosive turf work.',
    outcomes: ['Core resilience', 'Rotational power', 'Athletic agility'],
  },
  {
    id: 'personal-training',
    index: '05',
    title: 'Personal Training',
    focus: '1-on-1 Dedicated Coaching',
    duration: '60 min · Demo Track',
    description:
      'Bespoke programming tailored to your movement baseline, schedule, and measurable strength milestones.',
    outcomes: ['Custom block design', 'Direct coach feedback', 'Recovery planning'],
  },
  {
    id: 'group-classes',
    index: '06',
    title: 'Group Classes',
    focus: 'Small-Team Intensity',
    duration: '50 min · Demo Track',
    description:
      'Coach-led small-group sessions capped for individual attention, pairing shared accountability with structured pacing.',
    outcomes: ['Capped class size', 'All levels scalable', 'High-focus energy'],
  },
];

export const SCHEDULE_ITEMS: ScheduleEntry[] = [
  {
    id: 'mon-1',
    className: 'Barbell Foundations',
    trainer: 'Marcus Vance',
    day: 'Monday',
    time: '06:30 – 07:30',
    zone: 'Strength Floor',
    intensity: 'Moderate–High',
  },
  {
    id: 'mon-2',
    className: 'Metabolic Engine 45',
    trainer: 'Elena Rostova',
    day: 'Monday',
    time: '18:00 – 18:45',
    zone: 'Cardio Zone',
    intensity: 'High',
  },
  {
    id: 'tue-1',
    className: 'Turf Sled & Kettlebell',
    trainer: 'Devon Brooks',
    day: 'Tuesday',
    time: '07:00 – 07:50',
    zone: 'Functional Turf',
    intensity: 'High',
  },
  {
    id: 'wed-1',
    className: 'Lower Body Force',
    trainer: 'Marcus Vance',
    day: 'Wednesday',
    time: '17:30 – 18:30',
    zone: 'Strength Floor',
    intensity: 'Heavy',
  },
  {
    id: 'thu-1',
    className: 'Threshold Conditioning',
    trainer: 'Elena Rostova',
    day: 'Thursday',
    time: '06:30 – 07:20',
    zone: 'Cardio Zone',
    intensity: 'High',
  },
  {
    id: 'fri-1',
    className: 'Athletic Mobility & Carry',
    trainer: 'Devon Brooks',
    day: 'Friday',
    time: '18:00 – 18:50',
    zone: 'Functional Turf',
    intensity: 'Balanced',
  },
  {
    id: 'sat-1',
    className: 'Ironvault Team Gauntlet',
    trainer: 'Full Coaching Team',
    day: 'Saturday',
    time: '09:00 – 10:00',
    zone: 'Group Training Area',
    intensity: 'All Levels',
  },
];

export const SAMPLE_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'demo-t1',
    name: 'Jordan Mercer',
    memberFocus: 'Strength Track · Sample Member Profile',
    quote:
      'Having calibrated racks without fighting for bench space completely changed my morning routine. Six months in, my consistency is effortless.',
    stars: 5,
    sampleLabel: 'Sample Testimonial (Demo)',
  },
  {
    id: 'demo-t2',
    name: 'Camille Laurent',
    memberFocus: 'Conditioning & Group Track · Sample Member Profile',
    quote:
      'The coaches cue every movement clearly without gimmicks. Sessions feel purposeful, intense, and respectful of recovery.',
    stars: 5,
    sampleLabel: 'Sample Testimonial (Demo)',
  },
  {
    id: 'demo-t3',
    name: 'Tariq Haddad',
    memberFocus: 'Elite Personal Coaching · Sample Member Profile',
    quote:
      'Moving from unstructured workouts to a structured barbell and turf plan gave me measurable strength gains while fixing nagging shoulder stiffness.',
    stars: 5,
    sampleLabel: 'Sample Testimonial (Demo)',
  },
];

export const WHY_CHOOSE_ITEMS = [
  {
    index: '01',
    title: 'Architectural Training Environment',
    body: 'Designed with acoustic treatment, matte-black steel rigs, and focused lighting—zero fluorescent clutter or overcrowding.',
  },
  {
    index: '02',
    title: 'Coaches Who Actually Coach',
    body: 'Small-group ratios and attentive floor guidance ensure clean mechanics on every lift and interval.',
  },
  {
    index: '03',
    title: 'Purpose-Built Zones',
    body: 'Separate competition strength racks, curved cardio lanes, and 30-meter sled turf eliminate bottlenecks during peak hours.',
  },
  {
    index: '04',
    title: 'Consistent Programming',
    body: 'Every block follows progressive training principles rather than random daily workouts.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Is IRONVAULT FITNESS CLUB a real active gym location?',
    answer:
      'No — IRONVAULT FITNESS CLUB is a fictional demo fitness brand built to showcase a commercial-grade gym web experience. All pricing, schedules, trainer profiles, and contact details shown here are clearly marked sample content.',
  },
  {
    id: 'faq-2',
    question: 'What is included in the BASIC, PRO, and ELITE demo plans?',
    answer:
      'BASIC covers core open-floor gym access and standard equipment. PRO adds full facility access, trainer floor guidance, and group workout sessions. ELITE includes priority facility privileges and dedicated personal training sessions.',
  },
  {
    id: 'faq-3',
    question: 'Can beginners join Strength or Functional Training classes?',
    answer:
      'Yes. In this club concept, every group session and barbell track scales load and complexity to match your current movement baseline.',
  },
  {
    id: 'faq-4',
    question: 'How do membership enquiries and WhatsApp bookings work?',
    answer:
      'Clicking any "Choose This Plan", "Reserve", or "Start Your Journey" button pre-selects your interest in the enquiry form below. The WhatsApp button links to a clearly labeled demo number ready to be replaced with your live business line.',
  },
];

export const DEMO_CONTACT = {
  brandFull: 'IRONVAULT FITNESS CLUB',
  addressLine1: '740 Foundry District Ave, Suite 100',
  addressLine2: 'Metro Demo City, 94107 (Demo Address)',
  phoneDisplay: '+1 (555) 019-2834 (Demo Line)',
  whatsappDigits: '15550192834',
  email: 'concierge@ironvault-demo.example',
  hours: [
    { label: 'Mon – Fri', value: '05:00 – 22:30' },
    { label: 'Saturday', value: '06:30 – 20:00' },
    { label: 'Sunday', value: '07:30 – 18:00' },
  ],
};
