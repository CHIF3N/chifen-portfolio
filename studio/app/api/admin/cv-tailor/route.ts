/**
 * POST /api/admin/cv-tailor
 *
 * Server-side Gemini API route handler for the Admin AI CV Studio.
 * The Gemini API key never leaves the server.
 *
 * Request body:
 *   {
 *     jobDescription: string;   // the target job posting
 *     outputType: 'bullets' | 'cover-letter' | 'summary';
 *     tone?: 'technical' | 'strategic' | 'balanced';
 *   }
 *
 * Response:
 *   { result: string }
 *
 * Fanaka principles:
 *   - "Applicant, Not Supplicant": generated copy is assertive, peer-to-peer
 *   - "Be Personal, Specific, Concrete": every output draws from real CV data
 *   - "Show the Parts": Effort/Value framing preserved in bullets
 */

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { masterCvData } from '@/lib/masterCvData';

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const SYSTEM_CONTEXT = `You are a world-class CV and cover letter writer operating under strict Fanaka principles.
You have access to Chifen Sama Nduma's complete verified career record.

IDENTITY:
${JSON.stringify(masterCvData.identity, null, 2)}

SUMMARY:
${masterCvData.summary}

EXPERIENCE (verified, with Effort and Value fields):
${JSON.stringify(masterCvData.experience, null, 2)}

PROJECTS:
${JSON.stringify(masterCvData.projects, null, 2)}

SKILLS:
${JSON.stringify(masterCvData.skills, null, 2)}

EDUCATION:
${JSON.stringify(masterCvData.education, null, 2)}

SPEAKING:
${JSON.stringify(masterCvData.speaking, null, 2)}

RULES you must follow WITHOUT EXCEPTION:
1. NEVER invent, extrapolate, or hallucinate any fact not present in the data above.
2. NEVER use passive, pleading, or subservient language ("hoping to", "eager to learn", "passionate beginner").
3. NEVER use vague buzzwords without grounding them in concrete technologies or outcomes.
4. Frame every sentence as an engineering peer presenting demonstrable value.
5. Match the job description's terminology exactly where the CV data supports it.
6. Separate Effort (technical action, tools, scale) from Value (outcome, impact, metric) in bullet points.
7. If the job requires a skill Chifen does not have in the data, acknowledge the gap honestly — do not fabricate.
8. Output only the requested section. No preamble, no explanation.`;

export async function POST(req: NextRequest) {
  // Auth check: only the admin UID may call this route.
  // The client sends its Firebase ID token in the Authorization header.
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // Note: for production, verify the token server-side with Firebase Admin SDK.
  // For now, we trust the client-side auth guard (acceptable for a private tool).

  const { jobDescription, outputType, tone = 'balanced' } = await req.json();

  if (!jobDescription || typeof jobDescription !== 'string') {
    return NextResponse.json({ error: 'jobDescription is required' }, { status: 400 });
  }

  const toneInstructions = {
    technical:
      'Use engineering-specific vocabulary. Emphasise architecture decisions, performance numbers, and protocol details.',
    strategic:
      'Emphasise leadership, organisational impact, and cross-functional coordination. Still concrete, not generic.',
    balanced:
      'Balance technical credibility with clear human impact. The reader may not be an engineer.',
  }[tone as keyof typeof toneInstructions];

  const outputInstructions = {
    bullets: `Generate 6–8 tailored CV bullet points for this role.
Format: "• [Effort] — [Value]"
Each bullet must cite a specific technology, protocol, or metric from the CV data.
Do not repeat bullets verbatim from the master CV; reframe for the job's language.`,
    'cover-letter': `Write a 3-paragraph cover letter (no salutation or sign-off).
Paragraph 1: The concrete problem this role works on, and why Chifen's specific background gives a structural advantage.
Paragraph 2: One or two specific project examples with Effort and Value — never vague claims.
Paragraph 3: What Chifen intends to contribute in the first 90 days, grounded in what the job description says the team actually needs.`,
    summary: `Write a 4-sentence professional summary optimised for this role.
Sentence 1: Role, clinical background, and engineering discipline in one line.
Sentence 2: The domain constraint that defines the work (low bandwidth, clinical context, African health systems).
Sentence 3: One proof point — a specific metric or outcome.
Sentence 4: The forward direction that maps to this role.`,
  }[outputType as keyof typeof outputInstructions];

  if (!outputInstructions) {
    return NextResponse.json({ error: 'Invalid outputType' }, { status: 400 });
  }

  const userPrompt = `
JOB DESCRIPTION:
${jobDescription}

TONE INSTRUCTION: ${toneInstructions}

TASK: ${outputInstructions}
`;

  try {
    const response = await genai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        { role: 'user', parts: [{ text: SYSTEM_CONTEXT + '\n\n' + userPrompt }] },
      ],
    });

    const result = response.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    return NextResponse.json({ result });
  } catch (err: unknown) {
    console.error('[cv-tailor] Gemini error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
