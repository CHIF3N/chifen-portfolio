/**
 * POST /api/ask: the site assistant behind the "Byte" mascot.
 *
 * Runs as a Vercel Function. API keys live only in Vercel environment
 * variables and never reach the browser:
 *   GROQ_API_KEY     primary  (https://console.groq.com)
 *   NVIDIA_API_KEY   fallback (https://build.nvidia.com)
 *   GROQ_MODEL / NVIDIA_MODEL  optional model overrides
 *
 * Answers are grounded in api/_knowledge.json, generated from the site's own
 * content by scripts/build-knowledge.mjs. When something is not in there, the
 * assistant says so and points to email instead of guessing.
 */
import { readFileSync } from 'node:fs';

const knowledge = JSON.parse(readFileSync(new URL('./_knowledge.json', import.meta.url), 'utf8'));

const ALLOWED_ORIGINS = [/^https:\/\/chifen\.is-a\.dev$/, /^https:\/\/chifen-portfolio[a-z0-9-]*\.vercel\.app$/, /^http:\/\/localhost(:\d+)?$/];
const MAX_TURNS = 8;
const MAX_CHARS = 600;

// Best-effort per-instance rate limit: 12 questions per IP per 10 minutes.
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 12;
}

const words = (s) => (s ?? '').toLowerCase().match(/[a-z0-9]{3,}/g) ?? [];

/** Always send the bio and project list; send full details only for what the question is about. */
function context(question) {
  const q = new Set(words(question));
  const score = (text) => words(text).reduce((n, w) => n + (q.has(w) ? 1 : 0), 0);
  const ranked = knowledge.projects
    .map((p) => ({ p, s: score(`${p.title} ${p.summary} ${p.role} ${p.metrics.join(' ')}`) }))
    .sort((a, b) => b.s - a.s);
  const detailed = new Set(ranked.filter((r) => r.s > 0).slice(0, 3).map((r) => r.p.url));
  const researchHit = knowledge.research.some((r) => score(`${r.title} ${r.summary} research study dissertation thesis survey`) > 0);

  const lines = [
    `PERSON: ${JSON.stringify(knowledge.person)}`,
    'PROJECTS:',
    ...knowledge.projects.map((p) => {
      const base = `- ${p.title} (${p.year}, ${p.status}, role: ${p.role}) ${p.summary} Metrics: ${p.metrics.join('; ') || 'none listed'}.${p.note ? ` Note: ${p.note}` : ''} Page: ${p.url}${p.liveUrl ? ` Live: ${p.liveUrl}` : ''}`;
      return detailed.has(p.url) ? `${base}\n  Details: ${p.details}` : base;
    }),
    'RESEARCH:',
    ...knowledge.research.map((r) => `- ${r.kind}: ${r.title} (${r.year}, ${r.institution}, site: ${r.site}). ${r.summary} Page: ${r.url}${researchHit ? `\n  Details: ${r.details}` : ''}`),
    'WRITING:',
    ...knowledge.posts.map((p) => `- ${p.title}: ${p.description} (${p.url})`),
  ];
  return lines.join('\n');
}

function systemPrompt(question) {
  return `You are Byte, the small chibi nurse-coder mascot on Chifen Sama Nduma's portfolio (CHIF3N, "The Nurse Who Codes").
You answer visitors' questions about Chifen, his work, research, writing and how to contact him.

Rules:
- Use ONLY the facts in the KNOWLEDGE below. Never invent numbers, dates, employers, awards, clients or outcomes.
- If the answer is not in the knowledge, say you don't know and suggest emailing ${knowledge.person.contact.email}.
- Keep prototypes labelled as prototypes (for example, the LifeDrop WhatsApp bot is a working prototype; the abortion georegistry uses synthetic data only).
- Do not give medical advice. For health questions, suggest a qualified health professional.
- Be warm, brief and a little playful: 2 to 5 short sentences, plain language, no em dashes. Link to relevant site pages by path, like /work/lifedrop.
- You are an AI assistant, not Chifen. Never pretend to be him or to speak for him beyond the facts.

KNOWLEDGE (generated ${knowledge.generated}):
${context(question)}`;
}

async function callModel({ url, key, model }, messages) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model, messages, temperature: 0.3, max_tokens: 380 }),
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) {
    const detail = (await res.text().catch(() => '')).slice(0, 160).replace(/\s+/g, ' ');
    throw new Error(`${res.status} ${detail}`);
  }
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error(`${model} empty`);
  return text;
}

export default async function handler(req, res) {
  const origin = req.headers.origin ?? '';
  if (origin && ALLOWED_ORIGINS.some((r) => r.test(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST.' });
  if (origin && !ALLOWED_ORIGINS.some((r) => r.test(origin))) return res.status(403).json({ error: 'Not allowed.' });

  const ip = (req.headers['x-forwarded-for'] ?? '').split(',')[0].trim() || 'unknown';
  if (limited(ip)) return res.status(429).json({ error: 'Byte needs a breather. Try again in a few minutes.' });

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  const history = Array.isArray(body?.messages) ? body.messages : [];
  const clean = history
    .filter((m) => (m?.role === 'user' || m?.role === 'assistant') && typeof m.content === 'string')
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
  const question = [...clean].reverse().find((m) => m.role === 'user')?.content;
  if (!question) return res.status(400).json({ error: 'Ask me something!' });

  const providers = [
    process.env.GROQ_API_KEY && {
      name: 'groq',
      url: 'https://api.groq.com/openai/v1/chat/completions',
      key: process.env.GROQ_API_KEY,
      model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
    },
    process.env.NVIDIA_API_KEY && {
      name: 'nvidia',
      url: 'https://integrate.api.nvidia.com/v1/chat/completions',
      key: process.env.NVIDIA_API_KEY,
      model: process.env.NVIDIA_MODEL || 'meta/llama-3.3-70b-instruct',
    },
  ].filter(Boolean);

  if (!providers.length) {
    return res.status(503).json({ error: `Byte isn't plugged in yet. Email ${knowledge.person.contact.email} instead.` });
  }

  const messages = [{ role: 'system', content: systemPrompt(question) }, ...clean];
  const failures = [];
  for (const provider of providers) {
    try {
      const answer = await callModel(provider, messages);
      return res.status(200).json({ answer });
    } catch (err) {
      console.error('ask:', provider.name, err.message);
      // Provider name and HTTP status only. Never the key.
      failures.push(`${provider.name} ${String(err.message).split(' ')[0]}`);
    }
  }
  return res.status(502).json({
    error: `Byte's brain is offline for a moment. Try again, or email ${knowledge.person.contact.email}.`,
    providers: failures,
  });
}
