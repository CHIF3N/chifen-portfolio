/**
 * Network-awareness utilities for adaptive media loading.
 *
 * Runs exclusively in the browser. Safe to import in Astro <script> tags.
 */

/**
 * Returns true when the browser reports a slow or data-saving connection.
 *
 * Heuristic: Data Saver mode OR an effective connection type of 2g/3g.
 * Falls back to false when the Network Information API is unsupported
 * (Safari, Firefox) so fast-path behaviour is always the default.
 *
 * @returns {boolean}
 */
export function isSlowConnection() {
  // navigator.connection is the Network Information API (Chrome / Android WebView)
  const conn = /** @type {any} */ (navigator).connection;
  if (!conn) return false;
  if (conn.saveData === true) return true;
  if (conn.effectiveType === '2g' || conn.effectiveType === '3g') return true;
  return false;
}

/**
 * Wires up IntersectionObserver-based lazy play/pause for every
 * `.adaptive-scene` element in the document.
 *
 * On slow connections the video element is hidden and the SVG fallback is
 * shown instead; the video `src` is never actually fetched.
 *
 * Call this once from a module script after the DOM is ready.
 */
export function setupAdaptiveVideos() {
  const slow = isSlowConnection();

  document.querySelectorAll('.adaptive-scene').forEach((scene) => {
    const video = /** @type {HTMLVideoElement|null} */ (
      scene.querySelector('.adaptive-video')
    );
    const fallback = /** @type {HTMLElement|null} */ (
      scene.querySelector('.adaptive-fallback')
    );

    if (!video) return;

    if (slow) {
      // -- Slow path --------------------------------------------------------
      // Hide the video entirely; do NOT set its src so no bytes are fetched.
      video.style.display = 'none';
      if (fallback) fallback.style.display = '';
      return;
    }

    // -- Fast path -----------------------------------------------------------
    // The video was rendered with preload="none" and no autoplay.
    // Activate it only when it enters the viewport.
    const src = video.dataset.src;
    if (!src) return;

    if (fallback) fallback.style.display = 'none';
    video.style.display = '';

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Load on first intersection
            if (!video.src) {
              video.src = src;
              video.load();
            }
            video.play().catch(() => {
              /* autoplay blocked - video stays paused, that is fine */
            });
          } else {
            if (!video.paused) video.pause();
          }
        });
      },
      { threshold: 0.1 },
    );

    io.observe(video);
  });
}
