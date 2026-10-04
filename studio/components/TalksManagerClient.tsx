'use client';

import React, { useState } from 'react';
import { TalkItem } from '@/lib/contentStore';

export function TalksManagerClient({ initialTalks }: { initialTalks: TalkItem[] }) {
  const [talks, setTalks] = useState<TalkItem[]>(initialTalks);
  const [editingTalk, setEditingTalk] = useState<TalkItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formEvent, setFormEvent] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formAbstract, setFormAbstract] = useState('');
  const [formEmbedUrl, setFormEmbedUrl] = useState('');
  const [formDeckUrl, setFormDeckUrl] = useState('');
  const [formVideoUrl, setFormVideoUrl] = useState('');
  const [formTags, setFormTags] = useState('');

  function openCreate() {
    setEditingTalk(null);
    setIsNew(true);
    setFormTitle('');
    setFormEvent('');
    setFormLocation('Cameroon');
    setFormDate(new Date().getFullYear().toString());
    setFormAbstract('');
    setFormEmbedUrl('');
    setFormDeckUrl('');
    setFormVideoUrl('');
    setFormTags('Python, Healthcare');
    setMessage(null);
    setModalOpen(true);
  }

  function openEdit(talk: TalkItem) {
    setEditingTalk(talk);
    setIsNew(false);
    setFormTitle(talk.title);
    setFormEvent(talk.event || '');
    setFormLocation(talk.location || '');
    setFormDate(talk.date || '');
    setFormAbstract(talk.abstract || '');
    setFormEmbedUrl(talk.embedUrl || '');
    setFormDeckUrl(talk.deckUrl || '');
    setFormVideoUrl(talk.videoUrl || '');
    setFormTags((talk.tags || []).join(', '));
    setMessage(null);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingTalk(null);
  }

  // Google Slides URL helper function for preview
  function deriveEmbedUrl(url: string): string {
    if (!url) return '';
    let clean = url.trim();
    const iframeMatch = clean.match(/src=["']([^"']+)["']/i);
    if (iframeMatch) clean = iframeMatch[1];

    const directMatch = clean.match(/docs\.google\.com\/presentation\/d\/([a-zA-Z0-9_-]+)/);
    if (directMatch && !clean.includes('/presentation/d/e/')) {
      return `https://docs.google.com/presentation/d/${directMatch[1]}/embed?start=false&loop=false&delayms=3000`;
    }
    const pubMatch = clean.match(/docs\.google\.com\/presentation\/d\/e\/([a-zA-Z0-9_-]+)/);
    if (pubMatch) {
      return `https://docs.google.com/presentation/d/e/${pubMatch[1]}/embed?start=false&loop=false&delayms=3000`;
    }
    return clean;
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!formTitle.trim()) {
      setMessage({ text: 'Title is required.', type: 'error' });
      return;
    }

    setSaving(true);
    setMessage(null);

    const tagsArray = formTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: TalkItem = {
      id: editingTalk?.id || `talk-${Date.now()}`,
      title: formTitle.trim(),
      event: formEvent.trim(),
      location: formLocation.trim(),
      date: formDate.trim(),
      abstract: formAbstract.trim(),
      embedUrl: formEmbedUrl.trim(),
      deckUrl: formDeckUrl.trim(),
      videoUrl: formVideoUrl.trim(),
      tags: tagsArray,
    };

    try {
      const res = await fetch('/api/admin/content/talks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ talk: payload }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save talk.');

      setTalks(data.talks);
      setMessage({ text: 'Talk saved successfully to src/data/talks.json!', type: 'success' });
      setTimeout(() => {
        closeModal();
      }, 700);
    } catch (err) {
      setMessage({
        text: err instanceof Error ? err.message : 'Error saving talk.',
        type: 'error',
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete talk "${title}"?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/content/talks?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete talk.');

      setTalks(data.talks);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete talk.');
    } finally {
      setDeletingId(null);
    }
  }

  const livePreviewEmbed = deriveEmbedUrl(formEmbedUrl);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Action Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>
            {talks.length} presentation{talks.length === 1 ? '' : 's'} & slide deck{talks.length === 1 ? '' : 's'} configured
          </span>
        </div>

        <button onClick={openCreate} className="btn btn-primary" style={{ fontSize: '0.825rem' }}>
          + Add New Talk or Demo
        </button>
      </div>

      {/* Talks Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.25rem' }}>
        {talks.map((talk) => (
          <div
            key={talk.id}
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              border: '1px solid #27272a',
              background: '#111113',
            }}
          >
            {/* Top metadata */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <span className="chip" style={{ width: 'fit-content', fontSize: '0.65rem' }}>
                  {talk.event || 'Conference / Event'}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#71717a' }}>
                  {talk.location} {talk.date ? `· ${talk.date}` : ''}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <button
                  onClick={() => openEdit(talk)}
                  className="btn btn-ghost"
                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(talk.id, talk.title)}
                  disabled={deletingId === talk.id}
                  className="btn btn-danger"
                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                >
                  {deletingId === talk.id ? '...' : '×'}
                </button>
              </div>
            </div>

            {/* Title */}
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>
              {talk.title}
            </h3>

            {/* Abstract */}
            {talk.abstract && (
              <p
                style={{
                  fontSize: '0.8rem',
                  color: '#a1a1aa',
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {talk.abstract}
              </p>
            )}

            {/* Embedded Slides Preview Thumbnail */}
            {talk.embedUrl ? (
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  background: '#09090b',
                  border: '1px solid #222226',
                  position: 'relative',
                }}
              >
                <iframe
                  src={talk.embedUrl}
                  title={talk.title}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            ) : (
              <div
                style={{
                  padding: '1.5rem',
                  textAlign: 'center',
                  background: '#18181b',
                  borderRadius: '8px',
                  border: '1px dashed #27272a',
                  color: '#71717a',
                  fontSize: '0.75rem',
                }}
              >
                No embedded slide deck URL provided
              </div>
            )}

            {/* Links and Tags */}
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid #1f1f23' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {talk.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: '0.65rem',
                      padding: '0.15rem 0.45rem',
                      borderRadius: '4px',
                      background: '#1f1f23',
                      color: '#d4d4d8',
                    }}
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem' }}>
                {talk.deckUrl && (
                  <a
                    href={talk.deckUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--accent)', textDecoration: 'none' }}
                  >
                    Direct Slides Link ↗
                  </a>
                )}
                {talk.videoUrl && (
                  <a
                    href={talk.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#34d399', textDecoration: 'none' }}
                  >
                    Watch Demo Video ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Talk Modal */}
      {modalOpen && (
        <div className="modal-backdrop">
          <div
            className="card"
            style={{
              width: '100%',
              maxWidth: '680px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: '#141417',
              border: '1px solid #3f3f46',
              boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>
                {isNew ? 'Add Presentation or Demo' : 'Edit Presentation'}
              </h2>
              <button
                onClick={closeModal}
                style={{ background: 'transparent', border: 'none', color: '#a1a1aa', fontSize: '1.25rem' }}
              >
                ×
              </button>
            </div>

            {message && (
              <div
                style={{
                  marginBottom: '1rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '6px',
                  fontSize: '0.825rem',
                  background: message.type === 'success' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                  border: `1px solid ${message.type === 'success' ? '#10b981' : '#ef4444'}`,
                  color: message.type === 'success' ? '#34d399' : '#f87171',
                }}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="label">Talk / Demo Title *</label>
                <input
                  type="text"
                  className="input"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Building WhatsApp-Based Health Tech Networks"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="label">Conference / Event</label>
                  <input
                    type="text"
                    className="input"
                    value={formEvent}
                    onChange={(e) => setFormEvent(e.target.value)}
                    placeholder="e.g. PyCon Cameroon 2026"
                  />
                </div>
                <div>
                  <label className="label">Location & Year</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      className="input"
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      placeholder="e.g. Yaoundé"
                      style={{ flex: 2 }}
                    />
                    <input
                      type="text"
                      className="input"
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      placeholder="2026"
                      style={{ flex: 1 }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="label">
                  Google Slides URL (Paste /edit or /pub link — auto-converted to embed)
                </label>
                <input
                  type="text"
                  className="input font-mono"
                  value={formEmbedUrl}
                  onChange={(e) => setFormEmbedUrl(e.target.value)}
                  placeholder="https://docs.google.com/presentation/d/.../edit"
                />
                <span style={{ fontSize: '0.72rem', color: '#71717a', display: 'block', marginTop: '0.25rem' }}>
                  Helper: Automatically rewritten to Google Slides /embed format with live preview below.
                </span>
              </div>

              {livePreviewEmbed && (
                <div style={{ background: '#09090b', padding: '0.75rem', borderRadius: '8px', border: '1px solid #27272a' }}>
                  <span style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                    ✓ SLIDES EMBED PREVIEW
                  </span>
                  <div style={{ aspectRatio: '16/9', width: '100%', borderRadius: '6px', overflow: 'hidden' }}>
                    <iframe
                      src={livePreviewEmbed}
                      title="Slides Live Preview"
                      style={{ width: '100%', height: '100%', border: 'none' }}
                    />
                  </div>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="label">Direct Deck Link (Optional)</label>
                  <input
                    type="text"
                    className="input font-mono"
                    value={formDeckUrl}
                    onChange={(e) => setFormDeckUrl(e.target.value)}
                    placeholder="https://docs.google.com/.../edit?usp=sharing"
                  />
                </div>
                <div>
                  <label className="label">Video Demo URL (Loom / YouTube)</label>
                  <input
                    type="text"
                    className="input font-mono"
                    value={formVideoUrl}
                    onChange={(e) => setFormVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
              </div>

              <div>
                <label className="label">Abstract & Architecture Notes</label>
                <textarea
                  className="textarea"
                  rows={3}
                  value={formAbstract}
                  onChange={(e) => setFormAbstract(e.target.value)}
                  placeholder="Technical summary of what was presented, key heuristics, and systems discussed..."
                />
              </div>

              <div>
                <label className="label">Tags (comma-separated)</label>
                <input
                  type="text"
                  className="input"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="Python, WhatsApp Cloud API, Docker"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem', borderTop: '1px solid #27272a', paddingTop: '1rem' }}>
                <button type="button" onClick={closeModal} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn btn-primary">
                  {saving ? 'Saving...' : isNew ? 'Add Presentation' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
