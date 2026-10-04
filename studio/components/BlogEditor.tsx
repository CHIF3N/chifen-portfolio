'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { renderMarkdownToHtml } from '@/lib/simpleMarkdown';

export interface BlogPostData {
  slug: string;
  originalSlug?: string;
  title: string;
  description: string;
  pubDate: string;
  coverImage?: string;
  tags: string[];
  draft: boolean;
  content: string;
}

export function BlogEditor({
  initialData,
  isNew = false,
}: {
  initialData?: Partial<BlogPostData>;
  isNew?: boolean;
}) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [originalSlug] = useState(initialData?.slug || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [pubDate, setPubDate] = useState(
    initialData?.pubDate || new Date().toISOString().slice(0, 10)
  );
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
  const [tagsInput, setTagsInput] = useState(
    (initialData?.tags || []).join(', ')
  );
  const [draft, setDraft] = useState(initialData?.draft ?? false);
  const [content, setContent] = useState(initialData?.content || '');

  const [viewMode, setViewMode] = useState<'split' | 'edit' | 'preview'>('split');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Auto-generate slug from title for new posts
  useEffect(() => {
    if (isNew && !slug && title) {
      const generated = title
        .toLowerCase()
        .replace(/['’]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generated);
    }
  }, [title, isNew, slug]);

  function insertFormatting(prefix: string, suffix: string = '') {
    const textarea = document.getElementById('blog-markdown-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const replacement = `${prefix}${selected || 'text'}${suffix}`;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    // Reset selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selected.length || 4));
    }, 0);
  }

  async function handleSave(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!title.trim()) {
      setMessage({ text: 'Title is required.', type: 'error' });
      return;
    }

    setSaving(true);
    setMessage(null);

    const tagsArray = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const res = await fetch('/api/admin/content/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          originalSlug: isNew ? undefined : originalSlug,
          description,
          pubDate,
          coverImage,
          tags: tagsArray,
          draft,
          content,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save post.');
      }

      setMessage({ text: 'Post saved successfully to Astro disk!', type: 'success' });

      if (isNew && data.post?.slug) {
        router.replace(`/admin/blog/${data.post.slug}`);
      }
    } catch (err) {
      setMessage({
        text: err instanceof Error ? err.message : 'Error saving post.',
        type: 'error',
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`Are you sure you want to delete post "${title || slug}"? This will permanently delete the Markdown file from your repository.`)) {
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/content/blog?slug=${encodeURIComponent(slug || originalSlug)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete post.');

      router.push('/admin/blog');
    } catch (err) {
      setMessage({
        text: err instanceof Error ? err.message : 'Error deleting post.',
        type: 'error',
      });
      setDeleting(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top action bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link href="/admin/blog" className="btn btn-ghost" style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}>
            ← Back to Blog
          </Link>
          <span style={{ color: '#52525b' }}>/</span>
          <span style={{ fontSize: '0.85rem', color: '#a1a1aa', fontWeight: 600 }}>
            {isNew ? 'New Post' : slug}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* View mode toggle */}
          <div style={{ display: 'flex', background: '#18181b', border: '1px solid #27272a', borderRadius: '8px', padding: '0.15rem' }}>
            {(['split', 'edit', 'preview'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                style={{
                  background: viewMode === mode ? 'var(--accent)' : 'transparent',
                  color: viewMode === mode ? '#fff' : '#a1a1aa',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.3rem 0.65rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                }}
              >
                {mode}
              </button>
            ))}
          </div>

          {!isNew && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting || saving}
              className="btn btn-danger"
              style={{ fontSize: '0.8rem' }}
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          )}

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving}
            className="btn btn-primary"
            style={{ fontSize: '0.8rem' }}
          >
            {saving ? 'Saving...' : isNew ? 'Publish / Save' : 'Update Post'}
          </button>
        </div>
      </div>

      {message && (
        <div
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            fontSize: '0.85rem',
            background: message.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: `1px solid ${message.type === 'success' ? 'rgba(16, 185, 129, 0.35)' : 'rgba(239, 68, 68, 0.35)'}`,
            color: message.type === 'success' ? '#34d399' : '#f87171',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>{message.text}</span>
          <button
            onClick={() => setMessage(null)}
            style={{ background: 'transparent', border: 'none', color: 'inherit', fontWeight: 'bold' }}
          >
            ×
          </button>
        </div>
      )}

      {/* Metadata Form Section */}
      <div className="card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
        <div>
          <label className="label">Post Title *</label>
          <input
            type="text"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Reverse-proxying Dockerized APIs with Nginx"
            required
          />
        </div>

        <div>
          <label className="label">Slug (File: src/content/blog/[slug].md) *</label>
          <input
            type="text"
            className="input font-mono"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="e.g. reverse-proxying-dockerized-apis"
            required
          />
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label className="label">Description / Excerpt</label>
          <input
            type="text"
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short summary for RSS, social cards, and post headers"
          />
        </div>

        <div>
          <label className="label">Publication Date</label>
          <input
            type="date"
            className="input"
            value={pubDate}
            onChange={(e) => setPubDate(e.target.value)}
          />
        </div>

        <div>
          <label className="label">Tags (comma-separated)</label>
          <input
            type="text"
            className="input"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="docker, nginx, devops, health-tech"
          />
        </div>

        <div>
          <label className="label">Cover Image URL</label>
          <input
            type="text"
            className="input"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="https://... or /assets/covers/post.jpg"
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.25rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.85rem' }}>
            <input
              type="checkbox"
              checked={draft}
              onChange={(e) => setDraft(e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: 'var(--accent)' }}
            />
            <span style={{ fontWeight: 600, color: draft ? '#fbbf24' : '#a1a1aa' }}>
              Save as Draft (hidden from production feeds)
            </span>
          </label>
        </div>
      </div>

      {/* Markdown Editor & Live Preview */}
      <div className="card" style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {/* Formatting Toolbar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.35rem 0.5rem',
            background: '#18181b',
            borderRadius: '6px',
            border: '1px solid #27272a',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontSize: '0.7rem', color: '#71717a', fontWeight: 700, marginRight: '0.25rem' }}>
            FORMAT:
          </span>
          <button type="button" onClick={() => insertFormatting('## ')} className="btn btn-secondary" style={{ padding: '0.2rem 0.45rem', fontSize: '0.75rem' }}>
            H2
          </button>
          <button type="button" onClick={() => insertFormatting('### ')} className="btn btn-secondary" style={{ padding: '0.2rem 0.45rem', fontSize: '0.75rem' }}>
            H3
          </button>
          <button type="button" onClick={() => insertFormatting('**', '**')} className="btn btn-secondary" style={{ padding: '0.2rem 0.45rem', fontSize: '0.75rem' }}>
            Bold
          </button>
          <button type="button" onClick={() => insertFormatting('*', '*')} className="btn btn-secondary" style={{ padding: '0.2rem 0.45rem', fontSize: '0.75rem' }}>
            Italic
          </button>
          <button type="button" onClick={() => insertFormatting('> ')} className="btn btn-secondary" style={{ padding: '0.2rem 0.45rem', fontSize: '0.75rem' }}>
            Quote
          </button>
          <button type="button" onClick={() => insertFormatting('```ts\n', '\n```')} className="btn btn-secondary" style={{ padding: '0.2rem 0.45rem', fontSize: '0.75rem' }}>
            Code Block
          </button>
          <button type="button" onClick={() => insertFormatting('- ')} className="btn btn-secondary" style={{ padding: '0.2rem 0.45rem', fontSize: '0.75rem' }}>
            List
          </button>
          <button type="button" onClick={() => insertFormatting('[Link Text](', ')')} className="btn btn-secondary" style={{ padding: '0.2rem 0.45rem', fontSize: '0.75rem' }}>
            Link
          </button>
          <button type="button" onClick={() => insertFormatting('![Alt Text](', ')')} className="btn btn-secondary" style={{ padding: '0.2rem 0.45rem', fontSize: '0.75rem' }}>
            Image
          </button>
        </div>

        {/* Split/Single Work Area */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              viewMode === 'split' ? '1fr 1fr' : '1fr',
            gap: '1rem',
            minHeight: '520px',
          }}
        >
          {/* Editor Pane */}
          {(viewMode === 'split' || viewMode === 'edit') && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0.5rem', fontSize: '0.7rem', color: '#71717a' }}>
                <span>MARKDOWN CONTENT</span>
                <span>{content.length} characters</span>
              </div>
              <textarea
                id="blog-markdown-textarea"
                className="textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article in Markdown..."
                style={{
                  flex: 1,
                  minHeight: '480px',
                  resize: 'vertical',
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                  fontFamily: "'JetBrains Mono', monospace",
                  background: '#09090b',
                  color: '#e4e4e7',
                }}
              />
            </div>
          )}

          {/* Live Preview Pane */}
          {(viewMode === 'split' || viewMode === 'preview') && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: '#0e0e11',
                borderRadius: '8px',
                border: '1px solid #222226',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  padding: '0.4rem 0.75rem',
                  background: '#141418',
                  borderBottom: '1px solid #222226',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#a1a1aa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>LIVE PREVIEW</span>
                <span style={{ fontSize: '0.65rem', color: '#71717a' }}>HTML Rendered</span>
              </div>

              <div
                style={{
                  flex: 1,
                  padding: '1.25rem',
                  overflowY: 'auto',
                  maxHeight: '600px',
                }}
              >
                {coverImage && (
                  <img
                    src={coverImage}
                    alt={title || 'Cover image'}
                    style={{ width: '100%', maxHeight: '220px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }}
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                )}

                <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
                  {title || 'Untitled Post'}
                </h1>

                {description && (
                  <p style={{ color: '#a1a1aa', fontStyle: 'italic', marginBottom: '1rem', borderBottom: '1px solid #222226', paddingBottom: '0.75rem' }}>
                    {description}
                  </p>
                )}

                <div
                  className="markdown-preview"
                  dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(content) }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
