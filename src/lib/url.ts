/**
 * GitHub Pages serves this project at /chifen-portfolio/, not at the domain
 * root, so every hand-written root-relative link needs that prefix. Astro's
 * own routing and the Image component pick up `base` automatically; this
 * covers everything we write as a raw string instead (favicons, fonts,
 * pagefind, feeds, nav data).
 */
export const base = import.meta.env.BASE_URL;

export function withBase(path: string): string {
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}
