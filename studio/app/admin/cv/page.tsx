import type { Metadata } from 'next';
import { DashboardLayout } from '@/components/DashboardLayout';
import { CvStudioClient } from '@/components/CvStudioClient';

export const metadata: Metadata = {
  title: 'AI CV Studio — Chifen Studio',
  robots: 'noindex, nofollow',
};

export default function AdminCvPage() {
  return (
    <DashboardLayout
      title="AI CV Studio"
      subtitle="Fanaka-grade tailored bullet points, cover letters, and summaries with Gemini 2.5 Flash"
      actions={
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="badge-green" style={{ fontSize: '0.72rem' }}>
            Gemini 2.5 Flash Active
          </span>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Fanaka principle chips */}
        <div
          style={{
            padding: '0.75rem 1rem',
            background: '#111113',
            border: '1px solid #27272a',
            borderRadius: '10px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '0.7rem', color: '#71717a', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginRight: '0.25rem' }}>
            Fanaka Engineering Rules:
          </span>
          {['Applicant, Not Supplicant', 'Personal · Specific · Concrete', 'Effort → Value', 'Zero Hallucination'].map(
            (p) => (
              <span key={p} className="chip">
                {p}
              </span>
            )
          )}
        </div>

        {/* Client Tailor Component */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <CvStudioClient />
        </div>
      </div>
    </DashboardLayout>
  );
}
