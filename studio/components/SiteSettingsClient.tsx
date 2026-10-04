'use client';

import React, { useState } from 'react';
import { SiteConfig } from '@/lib/contentStore';

export function SiteSettingsClient({ initialConfig }: { initialConfig: SiteConfig }) {
  const [config, setConfig] = useState<SiteConfig>(initialConfig);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  function handleChange(field: keyof SiteConfig, val: string) {
    setConfig((prev) => ({ ...prev, [field]: val }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/content/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save settings.');

      setConfig(data.config);
      setMessage({
        text: 'Settings and personal pitch saved successfully to src/data/siteConfig.json!',
        type: 'success',
      });
    } catch (err) {
      setMessage({
        text: err instanceof Error ? err.message : 'Error updating settings.',
        type: 'error',
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1.2fr)', gap: '1.5rem', alignItems: 'start' }}>
      {/* Settings Form */}
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {message && (
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              background: message.type === 'success' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
              border: `1px solid ${message.type === 'success' ? 'rgba(16,185,129,0.35)' : 'rgba(239,68,68,0.35)'}`,
              color: message.type === 'success' ? '#34d399' : '#f87171',
            }}
          >
            {message.text}
          </div>
        )}

        {/* Identity & Role */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>Identity & Primary Role</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="label">Full Name</label>
              <input
                type="text"
                className="input"
                value={config.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">Primary Role / Title</label>
              <input
                type="text"
                className="input"
                value={config.role}
                onChange={(e) => handleChange('role', e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="label">Headline / Tagline</label>
            <input
              type="text"
              className="input"
              value={config.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
              placeholder="Architecting resilient digital health platforms..."
            />
          </div>
        </div>

        {/* Personal Pitch Statement */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>
              Personal Pitch Hook ("Nurse-Turned-Developer")
            </h2>
            <span style={{ fontSize: '0.7rem', color: '#71717a' }}>{config.pitch.length} chars</span>
          </div>

          <p style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>
            The foundational statement for your hero section, bio modals, and recruiter decks. Follows Fanaka principles: concrete regional constraints, clinical domain proof, zero subservient filler.
          </p>

          <textarea
            className="textarea"
            rows={5}
            value={config.pitch}
            onChange={(e) => handleChange('pitch', e.target.value)}
            style={{ fontSize: '0.875rem', lineHeight: '1.6' }}
            required
          />
        </div>

        {/* Contact Information & Channels */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>Contact & Regional Coordinates</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="label">Location</label>
              <input
                type="text"
                className="input"
                value={config.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="Buea / Yaoundé, Cameroon"
              />
            </div>

            <div>
              <label className="label">Primary Email</label>
              <input
                type="email"
                className="input font-mono"
                value={config.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="chifensama0@gmail.com"
                required
              />
            </div>

            <div>
              <label className="label">WhatsApp Number</label>
              <input
                type="text"
                className="input font-mono"
                value={config.whatsapp}
                onChange={(e) => handleChange('whatsapp', e.target.value)}
                placeholder="+237 672 835 132"
              />
            </div>

            <div>
              <label className="label">GitHub URL</label>
              <input
                type="url"
                className="input font-mono"
                value={config.github}
                onChange={(e) => handleChange('github', e.target.value)}
                placeholder="https://github.com/..."
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label className="label">LinkedIn Profile URL</label>
              <input
                type="url"
                className="input font-mono"
                value={config.linkedin}
                onChange={(e) => handleChange('linkedin', e.target.value)}
                placeholder="https://www.linkedin.com/in/..."
              />
            </div>
          </div>
        </div>

        <div>
          <button type="submit" disabled={saving} className="btn btn-primary" style={{ padding: '0.65rem 1.5rem' }}>
            {saving ? 'Saving...' : 'Save Site Settings'}
          </button>
        </div>
      </form>

      {/* Live Preview Card */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'sticky', top: '5rem' }}>
        <div className="card" style={{ background: '#141418', border: '1px solid #27272a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid #222226', paddingBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem' }}>👁️</span>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#a1a1aa' }}>
              Live Portfolio Card Preview
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                {config.name || 'Your Name'}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>
                {config.role || 'Your Role'}
              </p>
              <p style={{ fontSize: '0.75rem', color: '#71717a' }}>
                📍 {config.location || 'Location'}
              </p>
            </div>

            <p style={{ fontSize: '0.825rem', color: '#d4d4d8', lineHeight: 1.5, background: '#09090b', padding: '0.75rem', borderRadius: '6px', border: '1px solid #1f1f23' }}>
              {config.pitch || 'Your pitch statement will render here...'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.75rem', color: '#a1a1aa', borderTop: '1px solid #222226', paddingTop: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Email:</span>
                <span style={{ color: '#fff' }}>{config.email}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>WhatsApp:</span>
                <span style={{ color: '#34d399' }}>{config.whatsapp}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>GitHub:</span>
                <span style={{ color: '#c4b5fd' }}>{config.github ? 'Connected' : 'None'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fanaka Rules Callout */}
        <div className="card" style={{ background: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
          <h4 style={{ fontSize: '0.78rem', fontWeight: 700, color: '#c4b5fd', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Fanaka Profile Principles
          </h4>
          <ul style={{ fontSize: '0.75rem', color: '#a1a1aa', paddingLeft: '1.1rem', lineHeight: 1.6 }}>
            <li>No supplicant language ("eager to learn", "aspiring").</li>
            <li>Frame clinical insight as technical domain advantage.</li>
            <li>Cite specific regional constraints (2G, low power, Buea).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
