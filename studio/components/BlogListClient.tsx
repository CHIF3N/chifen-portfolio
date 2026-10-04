'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BlogPostSummary } from '@/lib/contentStore';

export function BlogListClient({ initialPosts }: { initialPosts: BlogPostSummary[] }) {
  const [posts, setPosts] = useState<BlogPostSummary[]>(initialPosts);
  const [search, setSearch] = useState('');
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [error, setError] = useState('');

  const filtered = posts.filter((p) => {
    const term = search.toLowerCase();
    return (
      p.title.toLowerCase().includes(term) ||
      p.slug.toLowerCase().includes(term) ||
      p.tags.some((t) => t.toLowerCase().includes(term))
    );
  });

  async function handleDelete(slug: string, title: string) {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    setDeletingSlug(slug);
    setError('');

    try {
      const res = await fetch(`/api/admin/content/blog?slug=${encodeURIComponent(slug)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete post.');

      setPosts((prev) => prev.filter((p) => p.slug !== slug));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setDeletingSlug(null);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Search & Actions Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ flex: '1', maxWidth: '380px' }}>
          <input
            type="text"
            className="input"
            placeholder="Search posts by title, slug, or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#71717a' }}>
            {filtered.length} of {posts.length} post{posts.length === 1 ? '' : 's'}
          </span>
          <Link href="/admin/blog/new" className="btn btn-primary" style={{ fontSize: '0.8rem' }}>
            + Create New Post
          </Link>
        </div>
      </div>

      {error && (
        <div
          style={{
            padding: '0.65rem 0.85rem',
            borderRadius: '8px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            color: '#f87171',
            fontSize: '0.85rem',
          }}
        >
          {error}
        </div>
      )}

      {/* Posts Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#18181b', borderBottom: '1px solid #27272a', color: '#a1a1aa' }}>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Title</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Date</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Tags</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '2.5rem', textAlign: 'center', color: '#71717a' }}>
                    No blog posts match your search.
                  </td>
                </tr>
              ) : (
                filtered.map((post) => (
                  <tr
                    key={post.slug}
                    style={{
                      borderBottom: '1px solid #1f1f23',
                      transition: 'background 0.15s ease',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#141417')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
                  >
                    <td style={{ padding: '0.85rem 1rem', maxWidth: '340px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        <Link
                          href={`/admin/blog/${post.slug}`}
                          style={{
                            fontWeight: 600,
                            color: '#fff',
                            textDecoration: 'none',
                          }}
                        >
                          {post.title}
                        </Link>
                        <span style={{ fontSize: '0.72rem', color: '#71717a', fontFamily: "'JetBrains Mono', monospace" }}>
                          {post.slug}
                        </span>
                      </div>
                    </td>

                    <td style={{ padding: '0.85rem 1rem', color: '#a1a1aa', whiteSpace: 'nowrap' }}>
                      {post.pubDate || '—'}
                    </td>

                    <td style={{ padding: '0.85rem 1rem', whiteSpace: 'nowrap' }}>
                      {post.draft ? (
                        <span className="badge-yellow">Draft</span>
                      ) : (
                        <span className="badge-green">Published</span>
                      )}
                    </td>

                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="chip" style={{ fontSize: '0.65rem' }}>
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span style={{ fontSize: '0.65rem', color: '#71717a' }}>
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    <td style={{ padding: '0.85rem 1rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Link
                          href={`/admin/blog/${post.slug}`}
                          className="btn btn-ghost"
                          style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(post.slug, post.title)}
                          disabled={deletingSlug === post.slug}
                          className="btn btn-danger"
                          style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
                        >
                          {deletingSlug === post.slug ? '...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
