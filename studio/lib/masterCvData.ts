/**
 * masterCvData.ts
 * ───────────────────────────────────────────────────────────────────────────
 * Single source of truth for the AI CV tailoring system.
 * The Gemini route handler reads from this file to construct a structured
 * prompt. Every claim here must be verified against source documents.
 *
 * Fanaka principles applied:
 * - Be Personal, Specific, and Concrete: no vague buzzwords
 * - Show the Parts: internal mechanics documented, not just high-level claims
 * - Effort vs. Value: each entry separates what was done from what it achieved
 */

export const masterCvData = {
  identity: {
    name: 'Chifen Sama Nduma',
    headline: 'Software Engineer · Health Technology Innovator · Technical Writer',
    location: 'Buea / Yaoundé, Cameroon',
    email: 'chifensama0@gmail.com',
    whatsapp: '+237 672 835 132',
    github: 'https://github.com/chifensama01-coder',
    linkedin: 'https://www.linkedin.com/in/chif3n/',
    website: 'https://chifen.is-a.dev',
  },

  summary: `Registered nurse (HND + BSc) and self-taught software engineer with four years in technology,
two in health technology infrastructure. Build digital health systems for settings with unreliable power,
low bandwidth, and no margin for failure. Clinical domain knowledge comes from inside the workflow,
not from user research interviews. Speaker at PyCon and UbuCon Cameroon 2026. Founder of LifeDrop,
a WhatsApp-native blood donor matching network currently in Buea pilot.`,

  experience: [
    {
      role: 'District Data Manager & PMTCT Head',
      org: 'Kumba South Health District',
      location: 'South West Region, Cameroon',
      period: '2025 – Present',
      type: 'Full-time',
      effort: [
        'Manage district-level health data across multiple facilities for the Ministry of Public Health reporting chain.',
        'Head the PMTCT (Prevention of Mother-to-Child HIV Transmission) programme for Kumba South, tracking patient cohorts from antenatal enrolment through 18-month infant outcome.',
        'Digitised and standardised the monthly district reporting pipeline, cutting submission lag from 5 days to same-day.',
      ],
      value: [
        'Improved data completeness and timeliness for national PMTCT targets.',
        'Reduced administrative overhead for facility staff by standardising templates.',
      ],
      skills: ['Health data management', 'PMTCT', 'Clinical workflows', 'Government reporting'],
    },
    {
      role: 'Founder & CEO',
      org: 'LifeDrop',
      location: 'Buea, Cameroon',
      period: '2026 – Present',
      type: 'Venture',
      effort: [
        'Architected an asynchronous WhatsApp Cloud API blood donor matching system: ward confirms blood need → webhook triggers donor filter by blood type and proximity → matched donor receives one message; binary yes/no response.',
        'Implemented idempotent request queues to prevent duplicate donor alerts during network retries.',
        'Integrated MTN Mobile Money (MoMo) payment flow: coordination fee charged on donor confirmation, receipted and traceable. Donors receive no payment for blood (legal and safety compliance).',
        'Built bilingual (English/French) conversation flows for the WhatsApp bot.',
        'Website: hand-coded HTML5, CSS custom properties, and vanilla JS. No framework. Sub-100KB page weight on 2G.',
      ],
      value: [
        'Pilot target: 1,000 registered donors and 200 mediated matches within six months in Buea (MTN YaMo funding ask).',
        'Inherits the 400-donor, 3-hospital Ayodah network as the seed base — no cold start.',
        'Third place, MTN YaMo Pitch Competition Season 4.',
        'Families who cannot afford the coordination fee are not turned away.',
      ],
      skills: ['WhatsApp Cloud API', 'JavaScript', 'MTN MoMo API', 'Product management'],
    },
    {
      role: 'Founder & Technical Lead',
      org: 'CoastClear',
      location: 'Cameroon',
      period: '2024 – Present',
      type: 'Venture',
      effort: [
        'Built a trilingual (English, French, Pidgin) beach-cleanup coordination platform with role-based access for community organisers, NGOs, and municipal partners.',
        'Implemented offline-first data sync for cleanup event reporting in low-connectivity coastal areas.',
      ],
      value: [
        'Enables structured data collection for coastal cleanup impact reporting to government bodies.',
      ],
      skills: ['Next.js', 'Supabase', 'Offline-first', 'Multilingual UX'],
    },
    {
      role: 'Technical Writer',
      org: 'Tech Chantier & The African Wave',
      location: 'Remote',
      period: '2024 – Present',
      type: 'Freelance',
      effort: [
        'Author engineering articles on digital health architecture, WhatsApp Cloud API integration patterns, and AI deployment in African clinical settings.',
        'Write to practitioners — not beginners — covering implementation decisions, trade-offs, and constraints specific to low-resource environments.',
      ],
      value: [
        'Reaching engineers and policy practitioners across Cameroon and West Africa.',
      ],
      skills: ['Technical writing', 'Content strategy', 'SEO'],
    },
    {
      role: 'Co-founder',
      org: 'Ayodah Blood Donor Platform',
      location: 'Buea, Cameroon',
      period: '2020 – 2026',
      type: 'Venture',
      effort: [
        'Co-built a mobile + web blood donor platform with a database-backed blood-type matching engine and manual hospital coordination layer.',
        'Ran donor drives, hospital partnerships, and NGO onboarding.',
      ],
      value: [
        '400+ registered donors, 310 mediated donations.',
        '3 partner hospitals, 5+ NGO partners.',
        'Winner, Silicon Mountain Challenge 2022 (Cameroon\'s premier startup competition).',
      ],
      skills: ['Product', 'Community', 'WordPress', 'Health-tech'],
    },
  ],

  projects: [
    {
      name: 'LifeDrop',
      url: 'https://lifedropcam.netlify.app/',
      tags: ['WhatsApp Cloud API', 'JavaScript', 'MTN MoMo', 'Health-tech'],
      description: 'WhatsApp-native blood donor matching. Asynchronous webhook architecture with idempotent queues. MTN MoMo payment integration. English/French bilingual flows. Sub-100KB page on 2G.',
    },
    {
      name: 'AI Clinical Decision-Making Research',
      url: null,
      tags: ['KoboCollect', 'SPSS', 'Clinical research', 'PRISMA'],
      description: '387-respondent cross-sectional study at Buea Regional Hospital. KoboCollect data pipeline → SPSS analysis → PRISMA-compliant write-up. 92.4% response rate from 419 distributed.',
    },
    {
      name: 'Maternal Health Risk Predictor',
      url: null,
      tags: ['Python', 'scikit-learn', 'REST API', 'Clinical ML'],
      description: 'Logistic regression model on anonymised clinical records. Risk stratification across 5 maternal outcome variables. Deployed as a REST endpoint for midwife tablet use.',
    },
    {
      name: 'MORIA Nurse Intern Assistant',
      url: null,
      tags: ['React Native', 'Expo', 'SQLite', 'Offline-first'],
      description: 'Offline-first React Native reference tool for nurse interns. Three core flows: drug dosage, emergency protocol, patient handover checklist. Works with no internet connection.',
    },
    {
      name: 'CoastClear',
      url: null,
      tags: ['Next.js', 'Supabase', 'Multilingual'],
      description: 'Trilingual beach-cleanup coordination platform. Role-based access for NGOs and municipal partners. Offline-capable event reporting for coastal low-connectivity areas.',
    },
    {
      name: 'VIAC Chatbots',
      url: null,
      tags: ['n8n', 'WhatsApp Cloud API', 'Health-tech'],
      description: 'Bilingual health information chatbots for an NGO cervical cancer awareness campaign. 200+ patient queries handled in the pilot month.',
    },
  ],

  skills: {
    languages: ['JavaScript / TypeScript', 'Python', 'HTML5 / CSS3', 'SQL'],
    frameworks: ['Astro', 'Next.js (App Router)', 'React Native / Expo', 'scikit-learn', 'Tailwind CSS'],
    platforms: ['WhatsApp Cloud API', 'MTN Mobile Money API', 'Firebase / Firestore', 'Supabase', 'n8n', 'Google Gemini API'],
    clinical: ['SPSS', 'KoboCollect', 'PRISMA', 'Clinical data management', 'PMTCT workflows', 'Emergency nursing'],
    tools: ['Git / GitHub', 'Vercel', 'Figma', 'Offline-first architecture', 'Low-bandwidth optimisation'],
  },

  education: [
    {
      degree: 'BSc Nursing (Top-up)',
      institution: 'Gracious Higher Institute of Excellence (mentored by University of Bamenda)',
      period: '2024 – 2026',
      highlights: [
        'Dissertation: AI-assisted clinical decision-making readiness among health workers at Buea Regional Hospital (387 respondents, 92.4% response rate)',
        'Third place, MTN YaMo Pitch Competition Season 4 (LifeDrop)',
      ],
    },
    {
      degree: 'HND Nursing',
      institution: 'Gracious Higher Institute of Excellence, Buea',
      period: '2022 – 2024',
      highlights: [
        'Best Overall HND Student',
        'Best Nursing Student, HND',
        'Innovative Excellence Award',
        'Best Creative Thinker',
        'Proactive Student Award',
      ],
    },
  ],

  speaking: [
    {
      event: 'PyCon Cameroon 2026',
      topic: 'Building Health Technology in Low-Bandwidth Environments',
      year: '2026',
    },
    {
      event: 'UbuCon Cameroon 2026',
      topic: 'Open Source Tools for Clinical Data Management in Africa',
      year: '2026',
    },
  ],

  awards: [
    'Best Overall HND Student',
    'Best Nursing Student, HND',
    'Innovative Excellence Award',
    'Best Creative Thinker',
    'Proactive Student Award',
    '3rd Place, MTN YaMo Pitch Season 4 (LifeDrop, 2026)',
    'Winner, Silicon Mountain Challenge 2022 (Ayodah)',
  ],

  certifications: [
    { name: 'Certificate of Training Completion', issuer: 'The Tony Elumelu Foundation' },
    { name: 'Certificate of Business Management Training', issuer: 'The Tony Elumelu Foundation' },
    { name: 'UNLEASH Hack Talent, Certificate of Participation', issuer: 'UNLEASH' },
    { name: 'Medical Abortion Course for Providers', issuer: 'International Planned Parenthood Federation' },
    { name: 'Teaching English as a Foreign Language (TEFL)', issuer: 'Teacher Record' },
    { name: 'Advancing the Role of Women in Politics', issuer: 'Regional Leadership Center East Africa' },
  ],
};

export type MasterCvData = typeof masterCvData;
