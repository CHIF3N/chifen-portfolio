/**
 * site-bridge.js
 * Bridges live customizations made in /admin to the frontend display in real-time.
 */
(() => {
  const STORAGE_KEY = 'chifen_site_overrides';

  function getOverrides() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  function applyOverrides() {
    const overrides = getOverrides();
    if (!overrides) return;

    // Apply Site Config overrides
    if (overrides.siteConfig) {
      const cfg = overrides.siteConfig;
      if (cfg.displayName) {
        document.querySelectorAll('[data-bind="site.displayName"]').forEach(el => el.textContent = cfg.displayName);
      }
      if (cfg.role) {
        document.querySelectorAll('[data-bind="site.role"]').forEach(el => el.textContent = cfg.role);
      }
      if (cfg.tagline) {
        document.querySelectorAll('[data-bind="site.tagline"]').forEach(el => el.textContent = cfg.tagline);
      }
      if (cfg.pitch) {
        document.querySelectorAll('[data-bind="site.pitch"]').forEach(el => el.textContent = cfg.pitch);
      }
      if (cfg.github) {
        document.querySelectorAll('a[href*="github.com"]').forEach(a => {
          if (!a.href.includes('/commit/') && !a.href.includes('/pull/')) {
            a.href = cfg.github;
          }
        });
      }
    }

    // Show indicator if overrides active and not on /admin
    if (window.location.pathname !== '/admin' && !window.location.pathname.startsWith('/admin/')) {
      if (!document.getElementById('admin-bridge-pill')) {
        const pill = document.createElement('aside');
        pill.id = 'admin-bridge-pill';
        pill.className = 'fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-purple-500/40 bg-zinc-900/90 px-3.5 py-1.5 text-xs font-medium text-purple-300 shadow-xl backdrop-blur-md transition-all hover:bg-zinc-800';
        pill.innerHTML = `
          <span class="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Studio Overrides Active</span>
          <a href="/admin" class="ml-1 underline font-semibold text-purple-200 hover:text-white">Admin</a>
        `;
        document.body.appendChild(pill);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyOverrides);
  } else {
    applyOverrides();
  }

  window.ChifenBridge = {
    getOverrides,
    applyOverrides,
    clearOverrides: () => {
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  };
})();
