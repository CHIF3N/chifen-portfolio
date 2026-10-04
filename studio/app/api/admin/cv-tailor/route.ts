/**
 * POST /api/admin/cv-tailor
 *
 * Auth: protected by middleware (studio_session cookie).
 * Model progression: gemini-2.5-flash -> gemini-3.8-flash -> gemini-1.5-flash.
 *
 * Body: { jobDescription: string; outputType: 'bullets'|'cover-letter'|'summary'; tone?: string }
 * Response: { result: string }
 */
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { masterCvData } from '@/lib/masterCvData';

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
8. Output only the requested section. No preamble, no explanation, no metadata.`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'GEMINI_API_KEY is missing in server environment. Please check studio/.env.local.' },
      { status: 500 }
    );
  }

  const { jobDescription, outputType, tone = 'balanced' } = await req.json().catch(() => ({}));

  if (!jobDescription || typeof jobDescription !== 'string') {
    return NextResponse.json({ error: 'jobDescription is required.' }, { status: 400 });
  }

  const toneInstructions: Record<string, string> = {
    technical: 'Use engineering-specific vocabulary. Emphasise architecture decisions, performance numbers, and protocol details.',
    strategic: 'Emphasise leadership, organisational impact, and cross-functional coordination. Still concrete, not generic.',
    balanced: 'Balance technical credibility with clear human impact. The reader may not be an engineer.',
  };

  const outputInstructions: Record<string, string> = {
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
  };

  if (!outputInstructions[outputType]) {
    return NextResponse.json({ error: 'Invalid outputType specified.' }, { status: 400 });
  }

  const prompt = `${SYSTEM_CONTEXT}

JOB DESCRIPTION:
${jobDescription}

TONE: ${toneInstructions[tone] ?? toneInstructions.balanced}

TASK: ${outputInstructions[outputType]}`;

  const genai = new GoogleGenAI({ apiKey });

  // Priority order: gemini-2.5-flash -> gemini-3.8-flash -> gemini-1.5-flash
  const candidateModels = ['gemini-2.5-flash', 'gemini-3.8-flash', 'gemini-1.5-flash'];
  let result = '';
  let successfulModel = '';
  const errors: string[] = [];

  for (const model of candidateModels) {
    try {
      const response = await genai.models.generateContent({
        model,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });
      const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text && text.trim()) {
        result = text;
        successfulModel = model;
        break;
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`[cv-tailor] Model ${model} failed: ${msg}`);
      errors.push(`${model}: ${msg}`);
    }
  }

  if (!result.trim()) {
    return NextResponse.json(
      {
        error: `Gemini generation failed across models (${errors.join('; ')}). Please verify API key permissions.`,
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ result, modelUsed: successfulModel });
}
