export const site = {
  name: 'Chifen Sama N.',
  shortName: 'CHIF3N',
  role: 'Nurse and developer',
  location: 'Buea, Cameroon',
  description:
    'Nurse and self-taught developer building health technology in Cameroon. Blood donor coordination, WhatsApp health services, and AI in clinical decision-making.',
  vision:
    'To build technologies that make quality healthcare more accessible, intelligent, and equitable across Africa.',
  emails: ['chifensama0@gmail.com'],
  whatsapp: [{ label: '+237 672 835 132', href: 'https://wa.me/237672835132' }],
  github: 'https://github.com/chifensama01-coder',
  linkedin: 'https://www.linkedin.com/in/chif3n/',

  /**
   * Share/tracking parameters are stripped: the `igsh` token on an Instagram
   * share link and the `fbclid` on a Facebook one identify the person who
   * shared it, and neither is needed for the profile to resolve.
   *
   * `compact` marks the ones that ride in the header; the rest appear in the
   * footer and on the contact page.
   */
  socials: [
    { label: 'GitHub', href: 'https://github.com/chifensama01-coder', compact: true },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/chif3n/', compact: true },
    { label: 'WhatsApp', href: 'https://wa.me/237672835132', compact: true },
    { label: 'Instagram', href: 'https://www.instagram.com/chif_3n', compact: false },
    { label: 'X', href: 'https://x.com/sama_chifen', compact: false },
    { label: 'Facebook', href: 'https://www.facebook.com/share/1BD7apvi7X/', compact: false },
    { label: 'Telegram', href: 'https://t.me/CHIF3N', compact: false },
    {
      label: 'Signal',
      href: 'https://signal.me/#eu/ky5TmCrI9HoKD-n_eugecEp0iep2blHhlszE2-qthg3r6THwHY9H55gR0Y8WIflN',
      compact: false,
    },
  ],

  /**
   * Cal.com booking. `username` is the handle from cal.com/<username>, and each
   * event slug is the last part of its public link. Nothing renders until the
   * username is real, so the section cannot ship pointing at a dead calendar.
   */
  booking: {
    username: '',
    events: [
      { slug: '30min', label: 'Phone call', duration: '30 min' },
      { slug: 'video', label: 'Video call', duration: '30 min' },
    ],
  },
  nav: [
    { label: 'Work', href: '/work' },
    { label: 'Services', href: '/services' },
    { label: 'Research', href: '/research' },
    { label: 'Writing', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],

  /** Per-page accent, the way the reference recolours itself section to section. */
  accents: {
    home: '#08b9d4',
    work: '#ff083d',
    services: '#2fd643',
    research: '#08b9d4',
  },
} as const;
