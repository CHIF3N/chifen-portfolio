export interface ImpactMetric {
  id: string;
  value: string;
  suffix?: string;
  label: string;
  context: string;
  project?: string;
  category: 'health-tech' | 'education' | 'community' | 'research' | 'experience';
  status: 'verified' | 'documented';
  verifiedSource?: string;
}

export const impactMetrics: ImpactMetric[] = [
  {
    id: 'lifedrop-donors',
    value: '400',
    suffix: '+',
    label: 'Registered blood donors',
    context: 'Voluntary blood donors registered across Buea and regional hospitals via Ayodah & LifeDrop',
    project: 'LifeDrop / Ayodah',
    category: 'health-tech',
    status: 'verified',
    verifiedSource: 'Ayodah / LifeDrop donor registries & hospital partnerships',
  },
  {
    id: 'donations-mediated',
    value: '310',
    suffix: '',
    label: 'Donations mediated',
    context: 'Direct voluntary blood donations coordinated with 3 partner hospitals and 5+ NGOs across Cameroon',
    project: 'LifeDrop / Ayodah',
    category: 'health-tech',
    status: 'verified',
    verifiedSource: 'Partner hospital registries & Silicon Mountain Challenge 2022 dossier',
  },
  {
    id: 'research-respondents',
    value: '387',
    suffix: '',
    label: 'Clinical respondents',
    context: 'Healthcare professionals surveyed across 6 professional cadres at Buea Regional Hospital on AI readiness (92.4% response rate)',
    project: 'AI in Clinical Decision-Making',
    category: 'research',
    status: 'verified',
    verifiedSource: 'BSc Dissertation, Buea Regional Hospital IRB approval (2026)',
  },
  {
    id: 'data-completeness',
    value: '95',
    suffix: '%+',
    label: 'Data completeness',
    context: 'Achieved across remote clinical facility registries as District Data Manager for Kumba South Health District',
    project: 'District Health Information Systems (DHIS2)',
    category: 'health-tech',
    status: 'verified',
    verifiedSource: 'Kumba South Health District / DHIS2 reporting audit',
  },
  {
    id: 'students-connected',
    value: '700',
    suffix: '+',
    label: 'Students connected',
    context: 'Secondary and science students connected across Cameroon through Genius Academy online study groups during COVID-19',
    project: 'Genius Academy',
    category: 'education',
    status: 'documented',
    verifiedSource: 'Genius Academy operational logs (2020)',
  },
  {
    id: 'facebook-community',
    value: '2,000',
    suffix: '+',
    label: 'Community members',
    context: 'Curious youth discussing science, engineering, and quantum physics in the Innovative Engineering Facebook community',
    project: 'Innovative Engineering',
    category: 'community',
    status: 'documented',
    verifiedSource: 'Innovative Engineering group records (2019)',
  },
  {
    id: 'whatsapp-community',
    value: '90',
    suffix: '+',
    label: 'WhatsApp group members',
    context: 'Active youth members sharing physics, equations, and engineering discussions',
    project: 'Innovative Engineering',
    category: 'community',
    status: 'documented',
    verifiedSource: 'Innovative Engineering WhatsApp records (2019)',
  },
  {
    id: 'books-distributed',
    value: '30',
    suffix: '~',
    label: 'Books distributed',
    context: 'Printed Computer Science & ICT educational guides authored and distributed to local secondary students',
    project: 'Educational Publishing',
    category: 'education',
    status: 'documented',
    verifiedSource: 'Self-published curriculum materials (2019)',
  },
  {
    id: 'tech-experience',
    value: '4',
    suffix: '',
    label: 'Years in software',
    context: 'Full-stack software engineering, mobile applications, and low-bandwidth communication protocols',
    category: 'experience',
    status: 'verified',
  },
  {
    id: 'healthtech-experience',
    value: '2',
    suffix: '+',
    label: 'Years in health tech',
    context: 'Clinical informatics, WhatsApp triage bots, DHIS2 pipelines, and hospital emergency dispatch systems',
    category: 'health-tech',
    status: 'verified',
  },
];
