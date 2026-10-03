'use client';

import { useState, useRef } from 'react';
import { auth } from '@/lib/firebase';

type OutputType = 'bullets' | 'cover-letter' | 'summary';
type Tone = 'technical' | 'strategic' | 'balanced';

const OUTPUT_TYPES: { value: OutputType; label: string; desc: string }[] = [
  { value: 'bullets', label: 'CV Bullets', desc: '6–8 tailored bullet points in Effort → Value format' },
  { value: 'cover-letter', label: 'Cover Letter', desc: '3-paragraph letter, no generic opener' },
  { value: 'summary', label: 'Summary', desc: '4-sentence professional summary' },
];

const TONES: { value: Tone; label: string }[] = [
  { value: 'balanced', label: 'Balanced' },
  { value: 'technical', label: 'Technical' },
  { value: 'strategic', label: 'Strategic' },
];

export function CvStudioClient() {
  const [jd, setJd] = useState('');
  const [outputType, setOutputType] = useState<OutputType>('bullets');
  const [tone, setTone] = useState<Tone>('balanced');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLTextAreaElement>(null);

  async function generate() {
    if (!jd.trim()) {
      setError('Paste the job description first.');
      return;
    }
    setError('');
    setResult('');
    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated.');
      const token = await user.getIdToken();

      const res = await fetch('/api/admin/cv-tailor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ jobDescription: jd, outputType, tone }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'API error');
      setResult(data.result ?? '');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function clear() {
    setJd('');
    setResult('');
    setError('');
  }

  return (
    <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr 1fr', height: '100%' }}>
      {/* ── Left panel: Input ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Output type selector */}
        <div>
          <label className="label">Output type</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {OUTPUT_TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => setOutputType(t.value)}
                className={`btn ${outputType === t.value ? 'btn-primary' : 'btn-ghost'}`}
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', flex: 1 }}
                title={t.desc}
              >
                {t.label}
              </button>
            ))}
          </div>
          <p style={{ color: 'var(--text-faint)', fontSize: '0.7rem', marginTop: '0.35rem' }}>
            {OUTPUT_TYPES.find((t) => t.value === outputType)?.desc}
          </p>
        </div>

        {/* Tone selector */}
        <div>
          <label className="label">Tone</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {TONES.map((t) => (
              <button
                key={t.value}
                onClick={() => setTone(t.value)}
                className={`btn ${tone === t.value ? 'btn-primary' : 'btn-ghost'}`}
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', flex: 1 }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* JD textarea */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <label className="label" htmlFor="jd-input">
            Job description
          </label>
          <textarea
            id="jd-input"
            className="textarea"
            placeholder="Paste the full job description here…"
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            style={{ flex: 1, minHeight: '280px' }}
          />
          <p style={{ color: 'var(--text-faint)', fontSize: '0.7rem', marginTop: '0.3rem' }}>
            {jd.length.toLocaleString()} characters
          </p>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className="btn btn-primary"
            onClick={generate}
            disabled={loading || !jd.trim()}
            style={{ flex: 1 }}
          >
            {loading ? (
              <>
                <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>
                  ⟳
                </span>
                Generating…
              </>
            ) : (
              <>✦ Generate</>
            )}
          </button>
          <button className="btn btn-ghost" onClick={clear} disabled={loading}>
            Clear
          </button>
        </div>

        {error && (
          <p
            style={{
              color: 'var(--error)',
              fontSize: '0.8rem',
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: '8px',
              padding: '0.6rem 0.75rem',
            }}
          >
            {error}
          </p>
        )}
      </div>

      {/* ── Right panel: Output ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <label className="label" style={{ margin: 0 }}>
            Generated output
          </label>
          {result && (
            <button className="btn btn-ghost" onClick={copy} style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem' }}>
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          )}
        </div>

        {!result && !loading && (
          <div
            style={{
              flex: 1,
              border: '1px dashed var(--border)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-faint)',
              fontSize: '0.875rem',
              minHeight: '400px',
            }}
          >
            Output will appear here
          </div>
        )}

        {loading && (
          <div
            style={{
              flex: 1,
              border: '1px solid var(--border)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.875rem',
              minHeight: '400px',
              background: 'var(--surface)',
            }}
          >
            <span style={{ animation: 'pulse 1.5s ease-in-out infinite' }}>
              Gemini is writing…
            </span>
          </div>
        )}

        {result && (
          <textarea
            ref={resultRef}
            className="textarea"
            value={result}
            onChange={(e) => setResult(e.target.value)}
            style={{ flex: 1, minHeight: '400px', lineHeight: 1.7 }}
          />
        )}

        {result && (
          <p style={{ color: 'var(--text-faint)', fontSize: '0.7rem' }}>
            Edit directly in the box above before copying.
          </p>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
