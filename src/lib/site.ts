import siteConfig from '../data/siteConfig.json';

export const site = {
  name: siteConfig.name || 'Chifen Sama Nduma',
  shortName: siteConfig.creativeIdentity || 'CHIF3N',
  brand: 'The Nurse Who Codes',
  /** The two-word public version used in navigation and most contexts. */
  displayName: siteConfig.displayName || 'Chifen Sama',
  role: siteConfig.role || 'The Nurse Who Codes · Software Engineer · Health Technology Researcher',
  location: siteConfig.location || 'Buea / Yaoundé, Cameroon',
  description:
    siteConfig.pitch ||
    'Registered nurse (BSc Nursing Science) and software engineer with four years in technology, two in health technology infrastructure. Building digital health systems for settings with unreliable power, low bandwidth, and no margin for failure.',
  headline:
    siteConfig.tagline ||
    'The Nurse Who Codes: Architecting resilient digital health platforms, clinical AI, and low-bandwidth communication networks across Africa.',
  vision:
    'To build technologies that make quality healthcare more accessible, intelligent, and equitable across Africa.',
  emails: [siteConfig.email || 'chifensama0@gmail.com'],
  whatsapp: [{ label: siteConfig.whatsapp || '+237 672 835 132', href: `https://wa.me/${(siteConfig.whatsapp || '+237672835132').replace(/[^0-9]/g, '')}` }],
  github: siteConfig.github || 'https://github.com/chifensama01-coder',
  linkedin: siteConfig.linkedin || 'https://www.linkedin.com/in/chif3n/',

  /**
   * Share/tracking parameters are stripped.
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

  booking: {
    username: '',
    events: [
      { slug: '30min', label: 'Phone call', duration: '30 min' },
      { slug: 'video', label: 'Video call', duration: '30 min' },
    ],
  },
  nav: [
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Journey', href: '/journey' },
    { label: 'Archive', href: '/archive' },
    { label: 'Research', href: '/research' },
    { label: 'Writing', href: '/blog' },
    { label: 'Experience', href: '/experience' },
    { label: 'Talks', href: '/talks' },
    { label: 'CV', href: '/cv' },
    { label: 'Contact', href: '/contact' },
  ],

  /** Per-page accent */
  accents: {
    home: '#08b9d4',
    work: '#ff083d',
    about: '#08b9d4',
    journey: '#8b5cf6',
    archive: '#f59e0b',
    services: '#2fd643',
    research: '#08b9d4',
    cv: '#8b5cf6',
  },
} as const;
