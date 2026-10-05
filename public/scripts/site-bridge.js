/**
 * site-bridge.js
 * Bridges live customizations made in /admin to the frontend display in real-time
 * and tracks privacy-friendly client-side visitor analytics and pageview intelligence.
 */
(() => {
  const STORAGE_KEY = 'chifen_site_overrides';
  const ANALYTICS_KEY = 'chifen_visitor_analytics';
  const SESSION_FLAG_KEY = 'chifen_session_active';

  // ── SEED ANALYTICS BASELINE ───────────────────────────────────────────────
  function getSeedAnalytics() {
    return {
      totalVisitors: 1482,
      totalPageviews: 5894,
      avgDuration: '3m 42s',
      recruiterSessions: 219,
      pageViews: {
        '/': { title: 'Home · Chifen Sama Nduma', count: 1842, domain: 'general' },
        '/cv': { title: 'Curriculum Vitae (ATS Record)', count: 1290, domain: 'clinical' },
        '/work/lifedrop': { title: 'LifeDrop: WhatsApp Emergency Blood Triage', count: 894, domain: 'health-tech' },
        '/work/ai-clinical-decision-research': { title: 'AI Clinical Readiness Study (387 Clinicians)', count: 612, domain: 'clinical' },
        '/work/maternal-health-risk': { title: 'Maternal Health Risk Predictor Endpoint', count: 420, domain: 'health-tech' },
        '/talks': { title: 'Speaking & Decks · PyCon Cameroon & YaMo', count: 348, domain: 'tech' },
        '/work/inkwave': { title: 'INKWAVE Brand & Engineering Platform', count: 280, domain: 'tech' },
        '/archive': { title: 'Field Archive & Artifacts', count: 208, domain: 'clinical' }
      },
      domainBreakdown: {
        clinical: 34,
        healthTech: 42,
        tech: 24
      },
      recentVisitors: [
        {
          id: 'vis-101',
          time: '3 mins ago',
          path: '/work/lifedrop',
          title: 'LifeDrop: WhatsApp Emergency Blood Triage',
          domain: '🏥 Health Tech',
          referrer: 'LinkedIn / Health Innovation Lead',
          device: 'Desktop (Chrome)',
          location: 'Douala, CM 🇨🇲'
        },
        {
          id: 'vis-102',
          time: '18 mins ago',
          path: '/cv',
          title: 'Curriculum Vitae (ATS Record)',
          domain: '🩺 Clinical Systems',
          referrer: 'Direct / Regional Hospital Buea',
          device: 'Tablet (iPad)',
          location: 'Buea, CM 🇨🇲'
        },
        {
          id: 'vis-103',
          time: '42 mins ago',
          path: '/work/ai-clinical-decision-research',
          title: 'AI Clinician Decision-Making Research',
          domain: '🩺 Clinical AI',
          referrer: 'Google Scholar / PRISMA Citation',
          device: 'Desktop (Firefox)',
          location: 'Geneva, CH 🇨🇭'
        },
        {
          id: 'vis-104',
          time: '1 hr ago',
          path: '/talks',
          title: 'PyCon Cameroon 2026 Keynote Architecture',
          domain: '💻 Platform Engineering',
          referrer: 'github.com/CHIF3N',
          device: 'Desktop (macOS)',
          location: 'Nairobi, KE 🇰🇪'
        },
        {
          id: 'vis-105',
          time: '2 hrs ago',
          path: '/work/maternal-health-risk',
          title: 'Maternal Health Risk Predictor',
          domain: '🏥 Health Tech',
          referrer: 'Direct / Midwifery Tech Review',
          device: 'Mobile (Android)',
          location: 'Yaoundé, CM 🇨🇲'
        }
      ]
    };
  }

  // ── ANALYTICS TRACKING ────────────────────────────────────────────────────
  function trackVisitorPageView() {
    const path = window.location.pathname;
    // Do not log visits on the admin editor itself
    if (path === '/admin' || path.startsWith('/admin/')) return;

    try {
      let data;
      const raw = localStorage.getItem(ANALYTICS_KEY);
      if (raw) {
        try { data = JSON.parse(raw); } catch (e) { data = getSeedAnalytics(); }
      } else {
        data = getSeedAnalytics();
      }

      // Check if session is new
      let isNewSession = false;
      try {
        if (!sessionStorage.getItem(SESSION_FLAG_KEY)) {
          sessionStorage.setItem(SESSION_FLAG_KEY, '1');
          isNewSession = true;
          data.totalVisitors = (data.totalVisitors || 0) + 1;
        }
      } catch (e) {}

      // Increment total page views
      data.totalPageviews = (data.totalPageviews || 0) + 1;

      // Determine domain category
      let domain = 'general';
      let domainBadge = '🌐 General';
      if (path.includes('lifedrop') || path.includes('maternal') || path.includes('viac')) {
        domain = 'health-tech';
        domainBadge = '🏥 Health Tech';
      } else if (path.includes('clinical') || path.includes('nurse') || path === '/cv') {
        domain = 'clinical';
        domainBadge = '🩺 Clinical Systems';
      } else if (path.includes('inkwave') || path.includes('coastclear') || path.includes('talks')) {
        domain = 'tech';
        domainBadge = '💻 Platform Tech';
      }

      // Record page views
      if (!data.pageViews) data.pageViews = {};
      const currentTitle = document.title ? document.title.split('—')[0].trim() : path;
      if (!data.pageViews[path]) {
        data.pageViews[path] = { title: currentTitle, count: 1, domain };
      } else {
        data.pageViews[path].count += 1;
        if (currentTitle && currentTitle !== path) {
          data.pageViews[path].title = currentTitle;
        }
      }

      // Add to recent visitors stream
      if (!data.recentVisitors) data.recentVisitors = [];
      const userAgent = navigator.userAgent || '';
      const isMobile = /mobile|android|iphone/i.test(userAgent);
      const isTablet = /tablet|ipad/i.test(userAgent);
      const deviceStr = isTablet ? 'Tablet' : isMobile ? 'Mobile Device' : 'Desktop Browser';
      const ref = document.referrer ? new URL(document.referrer, window.location.origin).hostname : 'Direct / Public Link';

      data.recentVisitors.unshift({
        id: 'vis-' + Date.now(),
        time: 'Just now',
        path,
        title: currentTitle || path,
        domain: domainBadge,
        referrer: ref,
        device: deviceStr,
        location: 'Active Visitor 🟢'
      });

      // Keep only latest 40 entries
      if (data.recentVisitors.length > 40) {
        data.recentVisitors = data.recentVisitors.slice(0, 40);
      }

      localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Analytics tracking error:', e);
    }
  }

  // ── GET OVERRIDES ─────────────────────────────────────────────────────────
  function getOverrides() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  // ── APPLY OVERRIDES (PICTURES, TEXT, METRICS) ─────────────────────────────
  function applyOverrides() {
    const overrides = getOverrides();
    if (!overrides) return;

    // 1. PICTURES & MEDIA OVERRIDES
    if (overrides.siteConfig) {
      const cfg = overrides.siteConfig;

      // Hero portrait picture override
      if (cfg.heroImage) {
        document.querySelectorAll('img[src*="chifen-portrait"], [data-bind="site.heroImage"]').forEach(img => {
          img.src = cfg.heroImage;
        });
      }

      // Story photo override (Section 4 "The Nurse Who Codes")
      if (cfg.storyImage) {
        document.querySelectorAll('img[src*="chifen-outdoor-1"], [data-bind="site.storyImage"]').forEach(img => {
          img.src = cfg.storyImage;
        });
      }

      // 2. TEXT & IDENTITY OVERRIDES
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
      if (cfg.email) {
        document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
          a.href = `mailto:${cfg.email}`;
          if (a.textContent.includes('@')) a.textContent = cfg.email;
        });
      }
      if (cfg.location) {
        document.querySelectorAll('[data-bind="site.location"]').forEach(el => el.textContent = cfg.location);
      }
      if (cfg.github) {
        document.querySelectorAll('a[href*="github.com"]').forEach(a => {
          if (!a.href.includes('/commit/') && !a.href.includes('/pull/')) {
            a.href = cfg.github;
          }
        });
      }
      if (cfg.linkedin) {
        document.querySelectorAll('a[href*="linkedin.com"]').forEach(a => {
          a.href = cfg.linkedin;
        });
      }
    }

    // 3. ACTIVE USAGE MEDIA OVERRIDES
    if (overrides.mediaAssets && Array.isArray(overrides.mediaAssets)) {
      const heroAsset = overrides.mediaAssets.find(a => a.activeUsage === 'hero');
      if (heroAsset && heroAsset.url) {
        document.querySelectorAll('img[src*="chifen-portrait"]').forEach(img => img.src = heroAsset.url);
      }
      const storyAsset = overrides.mediaAssets.find(a => a.activeUsage === 'story');
      if (storyAsset && storyAsset.url) {
        document.querySelectorAll('img[src*="chifen-outdoor-1"]').forEach(img => img.src = storyAsset.url);
      }
    }

    // 4. SHOW STATUS INDICATOR IF OVERRIDES ACTIVE AND NOT ON /ADMIN
    if (window.location.pathname !== '/admin' && !window.location.pathname.startsWith('/admin/')) {
      if (!document.getElementById('admin-bridge-pill')) {
        const pill = document.createElement('aside');
        pill.id = 'admin-bridge-pill';
        pill.className = 'fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-purple-500/40 bg-zinc-900/90 px-3.5 py-1.5 text-xs font-medium text-purple-300 shadow-xl backdrop-blur-md transition-all hover:bg-zinc-800';
        pill.innerHTML = `
          <span class="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Live Studio Active</span>
          <a href="/admin" class="ml-1 underline font-semibold text-purple-200 hover:text-white">Admin</a>
        `;
        document.body.appendChild(pill);
      }
    }
  }

  // ── INITIALIZATION ────────────────────────────────────────────────────────
  function init() {
    trackVisitorPageView();
    applyOverrides();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.ChifenBridge = {
    getOverrides,
    applyOverrides,
    getAnalytics: () => {
      try {
        const raw = localStorage.getItem(ANALYTICS_KEY);
        return raw ? JSON.parse(raw) : getSeedAnalytics();
      } catch {
        return getSeedAnalytics();
      }
    },
    clearOverrides: () => {
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  };
})();
