'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface NavItem {
  name: string;
  href: string;
  icon: string;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Overview', href: '/admin', icon: '📊' },
  { name: 'Media Library', href: '/admin/media', icon: '🖼️' },
  { name: 'Blog Manager', href: '/admin/blog', icon: '✍️' },
  { name: 'Talks & Media', href: '/admin/talks', icon: '🎤' },
  { name: 'Site & Pitch Settings', href: '/admin/settings', icon: '⚙️' },
  { name: 'AI CV Studio', href: '/admin/cv', icon: '🎯', badge: 'Gemini 2.5' },
];

export function DashboardLayout({
  children,
  title,
  subtitle,
  actions,
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      router.push('/login');
    }
  }

  const isNavActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#09090b', color: '#f4f4f5' }}>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 40,
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: collapsed ? '76px' : '260px',
          transition: 'width 0.2s ease, transform 0.2s ease',
          background: '#111113',
          borderRight: '1px solid #27272a',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 45,
          flexShrink: 0,
        }}
        className={mobileOpen ? 'mobile-sidebar-open' : ''}
      >
        {/* Sidebar Header */}
        <div
          style={{
            padding: collapsed ? '1.25rem 0.75rem' : '1.25rem 1.25rem',
            borderBottom: '1px solid #27272a',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link
              href="/admin"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  color: '#fff',
                  flexShrink: 0,
                }}
              >
                C3
              </div>
              {!collapsed && (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '-0.02em', color: '#fff' }}>
                    CHIFEN <span style={{ color: 'var(--accent)' }}>STUDIO</span>
                  </span>
                  <span style={{ fontSize: '0.62rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Content CMS & AI
                  </span>
                </div>
              )}
            </Link>

            <button
              onClick={() => setCollapsed(!collapsed)}
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#71717a',
                fontSize: '0.85rem',
                padding: '0.25rem',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {collapsed ? '→' : '←'}
            </button>
          </div>

          {!collapsed && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: '9999px',
                padding: '0.2rem 0.6rem',
                width: 'fit-content',
              }}
            >
              <span className="pulse-dot" />
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#34d399', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Edge Secured
              </span>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', overflowY: 'auto' }}>
          {NAV_ITEMS.map((item) => {
            const active = isNavActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.name : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: collapsed ? '0.7rem 0' : '0.65rem 0.85rem',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: active ? 600 : 500,
                  color: active ? '#fff' : '#a1a1aa',
                  background: active ? 'rgba(139, 92, 246, 0.16)' : 'transparent',
                  border: active ? '1px solid rgba(139, 92, 246, 0.35)' : '1px solid transparent',
                  transition: 'all 0.15s ease',
                  textDecoration: 'none',
                }}
              >
                <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{item.icon}</span>
                {!collapsed && (
                  <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.name}
                  </span>
                )}
                {!collapsed && item.badge && (
                  <span
                    style={{
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      padding: '0.1rem 0.4rem',
                      borderRadius: '9999px',
                      background: 'rgba(139, 92, 246, 0.25)',
                      color: '#c4b5fd',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div style={{ padding: '0.75rem', borderTop: '1px solid #27272a', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {!collapsed && (
            <a
              href="http://localhost:4321"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.5rem 0.75rem',
                fontSize: '0.75rem',
                color: '#71717a',
                borderRadius: '6px',
                border: '1px solid #222226',
                background: '#18181b',
                textDecoration: 'none',
              }}
            >
              <span>Live Portfolio ↗</span>
              <span style={{ fontSize: '0.65rem', color: '#52525b' }}>:4321</span>
            </a>
          )}

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            title={collapsed ? 'Sign Out' : undefined}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              gap: '0.65rem',
              padding: '0.6rem 0.75rem',
              borderRadius: '8px',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              background: 'rgba(239, 68, 68, 0.08)',
              color: '#f87171',
              fontSize: '0.8rem',
              fontWeight: 600,
            }}
          >
            <span>🚪</span>
            {!collapsed && <span>{loggingOut ? 'Signing out...' : 'Sign Out'}</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowX: 'hidden' }}>
        {/* Top Navbar */}
        <header
          style={{
            borderBottom: '1px solid #27272a',
            background: '#111113',
            padding: '0.85rem 1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 30,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: 'none',
                background: 'transparent',
                border: '1px solid #27272a',
                color: '#fff',
                padding: '0.35rem 0.5rem',
                borderRadius: '6px',
              }}
              className="mobile-nav-toggle"
            >
              ☰
            </button>

            <div>
              {title && <h1 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{title}</h1>}
              {subtitle && <p style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>{subtitle}</p>}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {actions}
          </div>
        </header>

        {/* Content Body */}
        <main style={{ flex: 1, padding: '1.75rem', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
