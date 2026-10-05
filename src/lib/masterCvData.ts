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
    headline: 'Self-Trained Software Engineer (Open Source & Automations) · Health Technology Innovator · M.Tech Data Science (COLTECH UBa)',
    location: 'Buea / Yaoundé, Cameroon',
    email: 'chifensama0@gmail.com',
    whatsapp: '+237 672 835 132',
    github: 'https://github.com/CHIF3N',
    linkedin: 'https://www.linkedin.com/in/chif3n/',
    website: 'https://chifen.is-a.dev',
    inkwave: 'https://inkwave-cm.vercel.app/',
  },

  summary: `Registered nurse (HND + BSc) and self-trained software engineer currently pursuing an M.Tech in Data Science at the College of Technology (COLTECH), The University of Bamenda. Specializes in open-source technologies, workflow automations, and resilient low-bandwidth health platforms. Built systems impacting 5,000+ lives with an accumulated reach of 8,500+ people across 4 countries with zero margin for error. Software engineering is entirely self-taught through hands-on system building and open-source grit; clinical intuition forged at the hospital bedside. Lead Architect of LifeDrop, Lead Engineer at CoastClear, and Co-Founder & CEO of INKWAVE.`,

  softwareTraining: {
    type: 'Self-Trained / Autodidactic Engineer (Open Source & Automations)',
    story: '100% self-taught software engineer specializing in open-source technologies and workflow automations. Acquired systems programming, distributed backends, mobile development, and API engineering outside of traditional CS classrooms—driven by bedside clinical urgency in Cameroonian hospitals. Engineered production-grade systems using Python, TypeScript, n8n workflow automations, React Native, Redis queues, and Docker, solving 2G disconnects and offline-first health record sync.',
  },

  /**
   * ACTIVE ROLES ONLY
   * Only these roles carry the "Present" / active designation.
   */
  activeRoles: [
    {
      role: 'Co-Founder & Chief Executive Officer',
      org: 'INKWAVE',
      orgUrl: 'https://inkwave-cm.vercel.app/',
      location: 'Buea, Cameroon',
      period: '2023 – Present',
      current: true,
      track: 'community',
      trackLabel: 'Community & Strategic Leadership (Green)',
      focus: 'Digital storytelling agency, developer advocacy, tech journalism (Tech Chantier, The African Wave), and regional ecosystem activations.',
      effort: [
        'Directed developer workshops, hackathons, and community bootcamps across the Silicon Mountain ecosystem.',
        'Authored technical columns for Tech Chantier and The African Wave on low-bandwidth architectures and African developer ecosystems.',
        'Established international ecosystem partnerships (e.g., ATWCE) and open-source documentation mentorship programs.',
      ],
      value: [
        'Built a thriving network of regional developers and mentored dozens of emerging engineers into global open-source ecosystems.',
        'Produced technical documentation guides referenced across regional engineering groups.',
      ],
      skills: ['Brand Architecture', 'Developer Advocacy', 'Technical Journalism', 'Ecosystem Building'],
    },
    {
      role: 'Lead Architect & Systems Developer',
      org: 'LifeDrop',
      orgUrl: 'https://lifedropcam.netlify.app/',
      location: 'Buea / Yaoundé, Cameroon',
      period: '2025 – Present',
      current: true,
      track: 'software',
      trackLabel: 'Software Engineering (Purple)',
      focus: 'WhatsApp Cloud API asynchronous webhook architecture for emergency blood donor matching across Cameroon.',
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
      trackLabel: 'Software Engineering (Purple)',
      focus: 'Multilingual coastal waste coordination platform with computer-vision hotspot analysis.',
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
      role: 'Community Ambassador',
      org: 'LinkedIn Local Buea',
      location: 'Buea, Cameroon',
      period: '2026 – Present',
      current: true,
      track: 'community',
      trackLabel: 'Ecosystem & Community (Green)',
      focus: 'Curating cross-disciplinary networking connecting health practitioners with tech founders.',
      effort: [
        'Organized grassroots ecosystem networking meetups across Buea.',
        'Facilitated panels uniting clinical health researchers with software builders and venture leads.',
      ],
      value: [
        'Bridged clinical healthcare professionals with Silicon Mountain tech startup founders for localized collaboration.',
      ],
      skills: ['Community Leadership', 'Ecosystem Strategy', 'Cross-Disciplinary Convening'],
    },
  ],

  /**
   * CONCLUDED PAST MANDATES
   * Past tense verbs only.
   */
  concludedRoles: [
    {
      role: 'District Data Manager & PMTCT Departmental Head',
      org: 'Kumba South District Health Service',
      location: 'South West Region, Cameroon',
      period: '2025 – 2026',
      current: false,
      track: 'clinical',
      trackLabel: 'Clinical & Health Data Systems (Cyan)',
      impact: 'Automated DHIS2 local-to-cloud facility sync workflows; boosted reporting data completeness to >95%.',
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
      role: 'Founding Board Member & Conference Lead (Volunteer)',
      org: 'Cameroon Innovative Health Network (CAMIHN / HETEFA)',
      location: 'Cameroon',
      period: '2025 – 2026',
      current: false,
      track: 'community',
      trackLabel: 'Volunteer / Community Initiative (Amber)',
      impact: 'Co-founded the health-tech network; organized and moderated panels for the Cameroon Innovative Health Conference.',
      effort: [
        'Formulated youth health-tech programs and organized keynote panels at the Cameroon Innovative Health Conference.',
        'Connected clinical health workers with digital health researchers across regional health boards.',
      ],
      value: [
        'Built a structured community channel for translating health technology research into clinical practice guidelines.',
      ],
      skills: ['Digital Health Advocacy', 'Conference Leadership', 'Health Informatics'],
    },
    {
      role: 'Digital Health Field Volunteer (Community Gig)',
      org: 'Vision in Action Cameroon (VIAC)',
      location: 'South West Region, Cameroon',
      period: '2025 – 2026',
      current: false,
      track: 'clinical',
      trackLabel: 'Volunteer Health Field Operations (Amber)',
      impact: 'Advised youth health teams on offline-first survey and mobile data collection tools.',
      effort: [
        'Advised community outreach teams on mobile data collection tools and offline data capture for youth health interventions.',
        'Deployed mobile survey tools for community health workers operating in low-connectivity rural zones.',
      ],
      value: [
        'Ensured uninterrupted survey data capture during remote field outreach without data loss.',
      ],
      skills: ['Mobile Data Collection', 'Offline-First Workflows', 'Field Operations'],
    },
    {
      role: 'Co-Founder & CTO / Project Manager',
      org: 'Ayodah',
      location: 'Buea, Cameroon',
      period: '2020 – 2023',
      current: false,
      track: 'software',
      trackLabel: 'Software Engineering (Purple)',
      impact: 'Built early blood donor registry database schemas that laid the foundation for LifeDrop.',
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

  /**
   * Combined experience getter for backwards compatibility
   */
  get experience() {
    return [...this.activeRoles, ...this.concludedRoles];
  },

  /**
   * SPEAKING & CIVIC ENGAGEMENTS (Compact section)
   * Pruned one-off workshops and speaking events.
   */
  speakingAndCivic: [
    {
      role: 'Keynote Speaker',
      event: 'PyCon & UbuCon Cameroon 2026 (Yaoundé)',
      date: 'September 2026',
      topic: 'Building WhatsApp-Based Health Tech Networks in Low-Connectivity Environments',
      artifacts: 'Delivered live keynote presentation and automated system demonstration.',
    },
    {
      role: 'Speaker',
      event: 'SIC Conference 2025',
      date: '2025',
      topic: 'Youth & STEM Innovation in Regional Ecosystems',
      artifacts: 'Presented strategies on grassroots tech enablement.',
    },
    {
      role: 'Participant',
      event: 'YALI Anti-Corruption & Civic Leadership Workshop',
      org: 'Mandela Washington Fellows Alumni Association / US Embassy Yaoundé',
      date: '2022',
      topic: 'Grassroots Anti-Corruption, Organizational Integrity & Public Healthcare Ethics',
    },
  ],

  get speaking() {
    return this.speakingAndCivic;
  },

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
        'Multilingual coastal waste monitoring and cleanup logistics platform for conservation teams. Real-time spatial density heatmaps and photographic waste classification.',
    },
    {
      name: 'INKWAVE Platform',
      url: 'https://inkwave-cm.vercel.app/',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Brand Architecture', 'CMS'],
      description:
        'Digital storytelling agency and developer advocacy platform driving technical communication and regional ecosystem activations across Central and West Africa.',
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
    platforms: ['n8n Workflow Automations', 'WhatsApp Cloud API', 'Docker / Linux', 'Redis Queues', 'Event-Driven Webhooks', 'Firebase / Firestore', 'Supabase', 'DHIS2', 'Google Gemini API'],
    clinical: ['SPSS', 'KoboCollect', 'PRISMA', 'Clinical Data Management', 'PMTCT Cohorts', 'Health Informatics'],
    tools: ['Git / GitHub', 'Vercel', 'Figma', 'Offline-First Workflows', 'Low-Bandwidth Optimization'],
  },

  education: [
    {
      degree: 'M.Tech in Data Science (Computer Engineering)',
      institution: 'College of Technology (COLTECH), The University of Bamenda (UBa)',
      period: '2026 – Present',
      highlights: [
        'Advanced computational modeling, machine learning for low-resource healthcare ecosystems, and distributed data systems',
        'Bridging clinical nursing informatics with predictive biomedical algorithms and regional epidemiological surveillance',
      ],
    },
    {
      degree: 'BSc Nursing (Top-up)',
      institution: 'Gracious Higher Institute of Excellence (mentored by University of Bamenda)',
      period: '2025 – 2026',
      highlights: [
        'Dissertation: AI-assisted clinical decision-making readiness among health workers at Buea Regional Hospital (387 respondents, 92.4% response rate)',
        'Third place, MTN YaMo Pitch Competition Season 4 (LifeDrop)',
      ],
    },
    {
      degree: 'HND Nursing',
      institution: 'Gracious Higher Institute of Excellence, Buea',
      period: '2022 – 2025',
      highlights: [
        'Best Overall HND Student',
        'Best Nursing Student, HND',
        'Innovative Excellence Award',
        'Best Creative Thinker',
        'Proactive Student Award',
      ],
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
