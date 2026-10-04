import type { Metadata } from 'next';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { listBlogPosts, readTalks, readSiteConfig } from '@/lib/contentStore';
import { masterCvData } from '@/lib/masterCvData';

export const metadata: Metadata = {
  title: 'Overview — Chifen Studio',
  robots: 'noindex, nofollow',
};

export const dynamic = 'force-dynamic';

export default async function AdminOverviewPage() {
  const posts = await listBlogPosts();
  const talks = await readTalks();
  const config = await readSiteConfig();

  const publishedPostsCount = posts.filter((p) => !p.draft).length;
  const draftPostsCount = posts.filter((p) => p.draft).length;
  const activeTalksCount = talks.length;

  return (
    <DashboardLayout
      title="Overview"
      subtitle="Chifen Portfolio Content Management & AI Command Center"
      actions={
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link href="/admin/blog/new" className="btn btn-primary" style={{ fontSize: '0.8rem' }}>
            + New Blog Post
          </Link>
          <a
            href="http://localhost:4321"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem' }}
          >
            Live Site ↗
          </a>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {/* Card 1: Blog Posts */}
          <div className="card card-interactive" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="label" style={{ margin: 0 }}>Blog Posts</span>
              <span style={{ fontSize: '1.25rem' }}>✍️</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
              <span style={{ fontSize: '2.25rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>
                {publishedPostsCount}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>
                published {draftPostsCount > 0 && `(${draftPostsCount} draft${draftPostsCount > 1 ? 's' : ''})`}
              </span>
            </div>
            <div style={{ marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid #222226' }}>
              <Link href="/admin/blog" style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 600 }}>
                Manage all articles →
              </Link>
            </div>
          </div>

          {/* Card 2: Talks & Media */}
          <div className="card card-interactive" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="label" style={{ margin: 0 }}>Active Talks & Media</span>
              <span style={{ fontSize: '1.25rem' }}>🎤</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
              <span style={{ fontSize: '2.25rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>
                {activeTalksCount}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>
                presentations & decks
              </span>
            </div>
            <div style={{ marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid #222226' }}>
              <Link href="/admin/talks" style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 600 }}>
                Manage talks & slides →
              </Link>
            </div>
          </div>

          {/* Card 3: Master CV & AI Model */}
          <div className="card card-interactive" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="label" style={{ margin: 0 }}>Master CV & AI</span>
              <span style={{ fontSize: '1.25rem' }}>🎯</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>
                  Fanaka v2.0
                </span>
                <span className="badge-green">Verified</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>
                Active model: <strong style={{ color: '#c4b5fd' }}>gemini-2.5-flash</strong>
              </span>
            </div>
            <div style={{ marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid #222226' }}>
              <Link href="/admin/cv" style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 600 }}>
                Open AI CV Studio →
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Hub: Bio Snapshot & Navigation shortcuts */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }}>
          {/* Recent Posts / Summary Table */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>Recent Blog Posts</h2>
              <Link href="/admin/blog" style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>
                View all ({posts.length})
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {posts.slice(0, 5).map((post) => (
                <div
                  key={post.slug}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.85rem',
                    background: '#18181b',
                    borderRadius: '8px',
                    border: '1px solid #222226',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', minWidth: 0, paddingRight: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Link
                        href={`/admin/blog/${post.slug}`}
                        style={{
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          color: '#fff',
                          textDecoration: 'none',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {post.title}
                      </Link>
                      {post.draft && <span className="badge-yellow">Draft</span>}
                    </div>
                    <span style={{ fontSize: '0.7rem', color: '#71717a' }}>
                      {post.pubDate} · {post.tags.slice(0, 3).join(', ') || 'No tags'}
                    </span>
                  </div>

                  <Link
                    href={`/admin/blog/${post.slug}`}
                    className="btn btn-ghost"
                    style={{ fontSize: '0.72rem', padding: '0.35rem 0.65rem' }}
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Site Pitch & Meta Overview */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>Profile & Pitch</h2>
              <Link href="/admin/settings" style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>
                Edit Settings
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.825rem' }}>
              <div>
                <span className="label" style={{ marginBottom: '0.2rem' }}>Identity</span>
                <p style={{ fontWeight: 600, color: '#fff' }}>{config.name}</p>
                <p style={{ color: '#a1a1aa', fontSize: '0.75rem' }}>{config.role}</p>
              </div>

              <div>
                <span className="label" style={{ marginBottom: '0.2rem' }}>Location & Contact</span>
                <p style={{ color: '#d4d4d8' }}>📍 {config.location}</p>
                <p style={{ color: '#d4d4d8' }}>✉️ {config.email}</p>
                <p style={{ color: '#d4d4d8' }}>💬 {config.whatsapp}</p>
              </div>

              <div style={{ borderTop: '1px solid #222226', paddingTop: '0.75rem' }}>
                <span className="label" style={{ marginBottom: '0.3rem' }}>Pitch Hook</span>
                <p style={{ color: '#a1a1aa', fontSize: '0.75rem', lineHeight: 1.5, fontStyle: 'italic' }}>
                  "{config.pitch.slice(0, 160)}..."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
