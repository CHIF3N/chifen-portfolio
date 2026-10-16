/**
 * Builds api/_knowledge.json, the only facts the site assistant ("Byte") is
 * allowed to use. It is generated from the content collections so it never
 * drifts from what the site says, plus a short hand-checked bio.
 *
 * Runs on every `npm run build`. Commit the output: the Vercel function reads
 * the committed file.
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const root = fileURLToPath(new URL('..', import.meta.url));
const read = (p) => readFileSync(join(root, p), 'utf8');

function parse(file) {
  const raw = read(file);
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  return { data: yaml.load(m[1]) ?? {}, body: m[2] };
}

/** Strip MDX/markdown down to readable prose, dropping code and components. */
function prose(body, limit) {
  const text = body
    .replace(/^import .*$/gm, '')
    .replace(/<CodeWorkbench[\s\S]*?\/>/g, '')
    .replace(/<[A-Z][\s\S]*?\/>/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\{\{VERIFY:[^}]*\}\}/g, '(not confirmed yet)')
    .replace(/[*_`>#]/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return text.length > limit ? `${text.slice(0, limit)}…` : text;
}

const dir = (d) => readdirSync(join(root, d)).filter((f) => /\.mdx?$/.test(f));

const projects = dir('src/content/work').map((f) => {
  const { data, body } = parse(`src/content/work/${f}`);
  return {
    url: `/work/${f.replace(/\.mdx?$/, '')}`,
    title: data.title,
    summary: data.summary,
    role: data.role,
    year: data.year,
    status: data.status,
    liveUrl: data.liveUrl,
    metrics: data.metrics ?? [],
    note: data.note,
    details: prose(body, 900),
  };
});

const research = dir('src/content/research').map((f) => {
  const { data, body } = parse(`src/content/research/${f}`);
  return {
    url: `/research/${f.replace(/\.mdx?$/, '')}`,
    title: data.title,
    kind: data.kind,
    institution: data.institution,
    site: data.site,
    supervisor: data.supervisor,
    year: data.year,
    summary: data.summary,
    details: prose(body, 1800),
  };
});

const posts = dir('src/content/blog')
  .map((f) => ({ f, ...parse(`src/content/blog/${f}`) }))
  .filter((p) => !p.data.draft)
  .map((p) => ({ url: `/blog/${p.f.replace(/\.mdx?$/, '')}`, title: p.data.title, description: p.data.description }));

const site = JSON.parse(read('src/data/siteConfig.json'));

const knowledge = {
  generated: new Date().toISOString().slice(0, 10),
  person: {
    name: 'Chifen Sama Nduma',
    alsoKnownAs: ['CHIF3N', 'Chifen Sama', 'Sama Chifen', 'The Nurse Who Codes'],
    location: site.location,
    contact: { email: site.email, whatsapp: site.whatsapp, linkedin: site.linkedin, github: site.github },
    resume: '/cv (printable, save as PDF from the print dialog)',
    bio: [
      'Registered nurse (HND Nursing 2022 to 2025, then a top-up BSc in Nursing Science, 2025 to 2026, at Gracious Higher Institute of Excellence, Buea, mentored by the University of Bamenda).',
      'Self-taught software engineer. Builds health technology for low-bandwidth, low-resource settings in Cameroon, often on WhatsApp because that is where people already are.',
      'Currently studying for an M.Tech in Data Science at the College of Technology (COLTECH), University of Bamenda.',
      'Was District Data Manager and PMTCT Head for Kumba South Health District at the same time (2025 to 2026).',
      'Co-founded Ayodah (blood donor platform, 2020). Ayodah won the Silicon Mountain Challenge in 2022, with 400+ registered donors and 310 donations, 3 partner hospitals and 5+ NGO partners.',
      'Founded LifeDrop, a blood donor network on WhatsApp. LifeDrop placed third at MTN YaMo Pitch Season 4. The LifeDrop website is live; the WhatsApp bot is a working prototype, not a deployed service. Donors are never paid for blood.',
      'Defended a BSc dissertation on 25 July 2026: a 387-respondent study (419 distributed, 92.4% response rate) at Buea Regional Hospital on knowledge, attitudes and factors influencing AI in clinical decision-making.',
      'Spoke at PyCon & UbuCon Cameroon 2026.',
      'HND awards: Best Overall Student, Best Nursing Student, Innovative Excellence Award, Best Creative Thinker, Proactive Student Award.',
      'Off duty: chess, anime, picking up new languages, music, travel.',
    ],
  },
  projects,
  research,
  posts,
};

mkdirSync(join(root, 'api'), { recursive: true });
writeFileSync(join(root, 'api/_knowledge.json'), JSON.stringify(knowledge, null, 1) + '\n');
console.log(`api/_knowledge.json: ${projects.length} projects, ${research.length} research, ${posts.length} posts`);
