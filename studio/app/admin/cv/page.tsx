import type { Metadata } from 'next';
import { CvStudioClient } from '@/components/CvStudioClient';

export const metadata: Metadata = {
  title: 'Admin CV Studio — Chifen Studio',
  robots: 'noindex, nofollow',
};

/**
 * Admin CV Studio page.
 * Auth is handled entirely by middleware (studio_session cookie).
 * This page renders unconditionally — unauthenticated requests never reach here.
 */
export default function AdminCvPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header
        style={{
          borderBottom: '1px solid var(--border)',
          padding: '0.875rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
            Chif<span style={{ color: 'var(--accent)' }}>3</span>n Studio
          </span>
          <span
            style={{
              fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'var(--accent)', border: '1px solid color-mix(in srgb, var(--accent) 40%, transparent)',
              borderRadius: '9999px', padding: '0.15rem 0.5rem',
            }}
          >
            Admin
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>
          Fanaka AI CV Studio · Gemini 2.0 Flash
        </span>
      </header>

      {/* Fanaka principle chips */}
      <div
        style={{
          padding: '0.75rem 1.5rem',
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          alignItems: 'center',
        }}
      >
        {['Applicant, Not Supplicant', 'Personal · Specific · Concrete', 'Effort → Value', 'No hallucination'].map(
          (p) => (
            <span
              key={p}
              style={{
                fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.05em',
                color: 'var(--accent)',
                border: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)',
                borderRadius: '9999px', padding: '0.2rem 0.6rem',
              }}
            >
              {p}
            </span>
          )
        )}
      </div>

      {/* Main */}
      <main style={{ flex: 1, padding: '1.5rem', overflow: 'auto' }}>
        <CvStudioClient />
      </main>
    </div>
  );
}
