/**
 * masterCvData.ts
 * ───────────────────────────────────────────────────────────────────────────
 * Single source of truth for career records and CV data in Astro frontend.
 * Every claim here is verified against source documents.
 *
 * Fanaka principles applied:
 * - Be Personal, Specific, and Concrete: no vague buzzwords
 * - Show the Parts: internal mechanics documented, not just high-level claims
 * - Effort vs. Value: each entry separates what was done from what it achieved
 * - Proof bar: every credential is verifiable
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
not from user research interviews. Speaker at PyCon and UbuCon Cameroon 2026. Lead Architect of LifeDrop,
an asynchronous WhatsApp-native emergency blood donor dispatch system in Cameroon.`,

  experience: [
    {
      role: 'Lead Architect & Systems Developer',
      org: 'LifeDrop',
      location: 'Buea / Yaoundé, Cameroon',
      period: '2025 – Present',
      current: true,
      track: 'software',
      trackLabel: 'Software Engineering (Purple Track)',
      context:
        'Emergency blood donor dispatch system operating under extreme cellular data constraints across Cameroonian urban centers.',
      effort: [
        'Architected asynchronous webhooks integrating the WhatsApp Cloud API with Python/Node.js backends and Redis queues, enabling zero-install donor triage.',
        'Implemented idempotent request queues and retry policies to prevent duplicate donor alerts during 2G packet loss and network reconnects.',
        'Engineered compatibility heuristic scoring blood type, geolocation proximity, and recency of last donation to match nearest eligible donors.',
      ],
      value: [
        'Reduced emergency donor matching turnaround time to under 3 minutes per automated dispatch.',
        'Eliminated app-store installation friction by routing triage entirely inside WhatsApp.',
        'Third place, MTN YaMo Pitch Competition Season 4.',
      ],
      skills: ['Python', 'WhatsApp Cloud API', 'Node.js', 'Docker', 'Webhooks', 'Asynchronous Queues'],
    },
    {
      role: 'Lead Engineer',
      org: 'CoastClear',
      location: 'Limbe / Coastal Cameroon',
      period: '2025 – Present',
      current: true,
      track: 'software',
      trackLabel: 'Software Engineering (Purple Track)',
      context:
        'Multilingual coastal waste monitoring and cleanup logistics platform for conservation teams.',
      effort: [
        'Engineered responsive web dashboards with full localization (English, French, Cameroonian Pidgin) integrated with lightweight computer-vision models for photographic waste tagging.',
        'Implemented offline-first sync pipelines allowing field cleanup volunteers to log waste coordinates without cellular reception.',
      ],
      value: [
        'Delivered live spatial density heatmaps enabling volunteer cleanup operations to deploy resources with 40% higher efficiency.',
        'Standardized waste audit data pipeline for municipal and environmental agency reporting.',
      ],
      skills: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Computer Vision APIs', 'i18n'],
    },
    {
      role: 'Co-Founder & Chief Executive Officer',
      org: 'INKWAVE',
      location: 'Buea, Cameroon',
      period: '2023 – Present',
      current: true,
      track: 'community',
      trackLabel: 'Community & Strategic Leadership (Green Track)',
      context:
        'Creative technology studio and developer storytelling agency driving technical communication across Central and West Africa.',
      effort: [
        'Directed developer workshops, hackathons, and community bootcamps across the Silicon Mountain ecosystem.',
        'Authored technical columns for Tech Chantier and The African Wave on low-bandwidth architectures and African developer ecosystems.',
        'Established international ecosystem partnerships (e.g., ATWCE) and open-source documentation mentorship programs.',
      ],
      value: [
        'Built a thriving network of regional developers and mentored dozens of emerging engineers into global open-source ecosystems.',
        'Produced technical documentation guides referenced across Cameroonian tech communities.',
      ],
      skills: ['Brand Architecture', 'Developer Advocacy', 'Technical Journalism', 'Ecosystem Building'],
    },
    {
      role: 'District Data Manager & PMTCT Departmental Head',
      org: 'Kumba South District Health Service',
      location: 'South West Region, Cameroon',
      period: '2025 – 2026',
      current: false,
      track: 'clinical',
      trackLabel: 'Clinical & Health Data Systems (Cyan Track)',
      context:
        'Supervised regional health information systems across district clinical facilities facing intermittent power and network degradation.',
      effort: [
        'Restructured weekly facility reporting pipelines and audited electronic PMTCT registries across peripheral health facilities.',
        'Implemented automated local-to-cloud sync workflows for DHIS2 reporting, replacing paper-to-spreadsheet bottlenecks.',
        'Supervised patient cohort tracking from antenatal enrollment through 18-month infant HIV outcome validation.',
      ],
      value: [
        'Eliminated paper reporting backlogs across remote facilities and improved district data completeness from ~70% to >95%.',
        'Cut district reporting submission lag from 5 days to same-day, eliminating national DHIS2 reporting penalties.',
      ],
      skills: ['DHIS2', 'Health Informatics', 'SQL Data Auditing', 'PMTCT Cohorts', 'Offline-First Workflows'],
    },
    {
      role: 'Co-Founder & CTO / Project Manager',
      org: 'Ayodah',
      location: 'Buea, Cameroon',
      period: '2020 – 2023',
      current: false,
      track: 'software',
      trackLabel: 'Software Engineering (Purple Track)',
      context:
        'Early digital health initiative addressing critical blood shortages in Cameroon via volunteer database registries.',
      effort: [
        'Designed relational database schemas, managed early web application prototyping, and coordinated hospital blood bank outreach.',
        'Conducted user research across clinical wards and emergency units to identify donor communication failure modes.',
      ],
      value: [
        'Validated donor response behaviors across clinical wards, establishing the architectural and operational foundation that directly inspired LifeDrop.',
        'Built a 400+ donor registry with 310 mediated donations across 3 partner hospitals and 5+ NGOs.',
        'Winner, Silicon Mountain Challenge 2022 (Cameroon’s premier startup competition).',
      ],
      skills: ['Relational Databases', 'System Prototyping', 'Health Tech Strategy', 'Product Discovery'],
    },
  ],

  volunteer: [
    {
      role: 'Community Ambassador',
      org: 'LinkedIn Local Buea',
      period: '2026 – Present',
      current: true,
      description:
        'Organizing grassroots networking initiatives, bridging clinical health professionals with Silicon Mountain tech founders.',
    },
    {
      role: 'Co-Founder & Executive Organizer',
      org: 'Cameroon Innovative Health Network (CAMIHN / HETEFA)',
      period: '2025 – Present',
      current: true,
      description:
        'Formulated youth health-tech programs and moderated keynote panels at the Cameroon Innovative Health Conference.',
    },
    {
      role: 'Digital Health Technical Volunteer',
      org: 'Vision in Action Cameroon (VIAC)',
      period: '2025 – 2026',
      current: false,
      description:
        'Advised community outreach teams on mobile data collection tools and offline data capture for youth health interventions.',
    },
    {
      role: 'Invited Conference Speaker',
      org: 'PyCon & UbuCon Cameroon 2026 (Yaoundé)',
      period: 'September 2026',
      current: false,
      topic: 'Building WhatsApp-Based Health Tech Networks in Low-Connectivity Environments',
      artifacts: 'Delivered live keynote presentation and automated system demonstration.',
    },
    {
      role: 'Civic Leadership & Governance Fellow',
      org: 'Mandela Washington Fellows Alumni Association / US Embassy Yaoundé',
      period: '2022',
      current: false,
      topic: 'Grassroots anti-corruption, organizational integrity, and public healthcare ethics.',
    },
  ],

  projects: [
    {
      name: 'LifeDrop',
      url: 'https://lifedropcam.netlify.app/',
      tags: ['WhatsApp Cloud API', 'Python', 'Node.js', 'Docker', 'Redis'],
      description:
        'Emergency blood donor dispatch system operating under extreme cellular data constraints. Asynchronous WhatsApp Cloud API webhooks with idempotent queues, donor-proximity heuristics, and zero-install triage.',
    },
    {
      name: 'CoastClear',
      url: null,
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Computer Vision APIs', 'i18n'],
      description:
        'Multilingual coastal waste monitoring and cleanup logistics platform. Real-time spatial density heatmaps and photographic waste classification.',
    },
    {
      name: 'AI Clinical Decision-Making Research',
      url: null,
      tags: ['KoboCollect', 'SPSS', 'Clinical research', 'PRISMA'],
      description:
        '387-respondent cross-sectional study at Buea Regional Hospital on clinician AI readiness. KoboCollect pipeline → SPSS analysis → PRISMA-compliant report (92.4% response rate).',
    },
    {
      name: 'Maternal Health Risk Predictor',
      url: null,
      tags: ['Python', 'scikit-learn', 'REST API', 'Clinical ML'],
      description:
        'Logistic regression model on anonymised clinical records. Risk stratification across 5 maternal outcome variables deployed as a lightweight REST endpoint for midwife tablets.',
    },
    {
      name: 'MORIA Nurse Intern Assistant',
      url: null,
      tags: ['React Native', 'Expo', 'SQLite', 'Offline-first'],
      description:
        'Offline-first mobile reference tool for nurse interns: drug dosage calculation, emergency resuscitation protocols, and patient handover checklists.',
    },
    {
      name: 'VIAC Chatbots',
      url: null,
      tags: ['n8n', 'WhatsApp Cloud API', 'Health-tech'],
      description:
        'Bilingual health information chatbots for an NGO cervical cancer awareness campaign. 200+ patient queries handled in the pilot month.',
    },
  ],

  skills: {
    languages: ['TypeScript', 'JavaScript', 'Python', 'HTML5 / CSS3', 'SQL'],
    frameworks: ['Astro', 'Next.js (App Router)', 'React Native / Expo', 'Tailwind CSS', 'scikit-learn'],
    platforms: ['WhatsApp Cloud API', 'Docker', 'Redis', 'Firebase / Firestore', 'Supabase', 'DHIS2', 'n8n', 'Google Gemini API'],
    clinical: ['SPSS', 'KoboCollect', 'PRISMA', 'Clinical Data Management', 'PMTCT Cohorts', 'Health Informatics'],
    tools: ['Git / GitHub', 'Vercel', 'Figma', 'Offline-First Workflows', 'Low-Bandwidth Optimization'],
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
      event: 'PyCon & UbuCon Cameroon 2026 (Yaoundé)',
      topic: 'Building WhatsApp-Based Health Tech Networks in Low-Connectivity Environments',
      year: 'September 2026',
      artifacts: 'Delivered live keynote presentation and automated system demonstration.',
    },
    {
      event: 'Cameroon Innovative Health Conference (CAMIHN / HETEFA)',
      topic: 'Youth-Led Health Technology and Offline Clinical Information Systems',
      year: '2025',
      artifacts: 'Keynote panel moderator and workshop leader.',
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
