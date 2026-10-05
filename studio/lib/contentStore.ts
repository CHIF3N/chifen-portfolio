/**
 * studio/lib/contentStore.ts
 *
 * Server-side storage adapter for the Astro portfolio.
 * Safely resolves and synchronizes:
 * - src/data/siteConfig.json
 * - src/data/talks.json
 * - src/content/blog/[slug].md
 */

import fs from 'node:fs';
import path from 'node:path';
import { parseFrontmatter, serializeFrontmatter, BlogFrontmatter } from './frontmatter';

export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  pitch: string;
  email: string;
  github: string;
  linkedin: string;
  whatsapp: string;
  location: string;
}

export interface TalkItem {
  id: string;
  title: string;
  event: string;
  location?: string;
  date?: string;
  abstract?: string;
  embedUrl: string;
  deckUrl: string;
  videoUrl?: string;
  tags: string[];
}

export interface BlogPostSummary {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  coverImage: string;
  tags: string[];
  draft: boolean;
  filename: string;
}

export interface BlogPostDetail extends BlogPostSummary {
  content: string;
}

/**
 * Locate the Astro project root whether running from inside studio/ or from the root repo.
 */
export function getAstroRoot(): string {
  const cwd = process.cwd();
  // Check if we are inside studio/
  if (fs.existsSync(path.resolve(cwd, '..', 'src', 'content'))) {
    return path.resolve(cwd, '..');
  }
  // Check if we are at root
  if (fs.existsSync(path.resolve(cwd, 'src', 'content'))) {
    return cwd;
  }
  // Fallback to parent
  return path.resolve(cwd, '..');
}

export function getDataPaths() {
  const root = getAstroRoot();
  const dataDir = path.join(root, 'src', 'data');
  const blogDir = path.join(root, 'src', 'content', 'blog');
  const siteConfigFile = path.join(dataDir, 'siteConfig.json');
  const talksFile = path.join(dataDir, 'talks.json');

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }

  return { root, dataDir, blogDir, siteConfigFile, talksFile };
}

/**
 * Transforms standard Google Slides /edit, /pub or shared links into embeddable /embed iframes.
 */
export function formatGoogleSlidesEmbed(inputUrl: string): string {
  if (!inputUrl) return '';

  let url = inputUrl.trim();

  // If user pasted an iframe tag, extract src
  const iframeMatch = url.match(/src=["']([^"']+)["']/i);
  if (iframeMatch) {
    url = iframeMatch[1];
  }

  // Handle Google Slides edit/view links: /presentation/d/{id}/edit...
  const directMatch = url.match(/docs\.google\.com\/presentation\/d\/([a-zA-Z0-9_-]+)/);
  if (directMatch && !url.includes('/presentation/d/e/')) {
    const presId = directMatch[1];
    return `https://docs.google.com/presentation/d/${presId}/embed?start=false&loop=false&delayms=3000`;
  }

  // Handle published presentation links: /presentation/d/e/{pubId}/pub...
  const pubMatch = url.match(/docs\.google\.com\/presentation\/d\/e\/([a-zA-Z0-9_-]+)/);
  if (pubMatch) {
    const pubId = pubMatch[1];
    return `https://docs.google.com/presentation/d/e/${pubId}/embed?start=false&loop=false&delayms=3000`;
  }

  return url;
}

// ── Site Config ─────────────────────────────────────────────────────────────

const DEFAULT_CONFIG: SiteConfig = {
  name: 'Chifen Sama Nduma',
  role: 'Software Engineer · Health Technology Innovator · Technical Writer',
  tagline: 'Architecting resilient digital health platforms, low-bandwidth communication networks, and scalable web backends.',
  pitch: 'Registered nurse (HND + BSc) and self-taught software engineer with four years in technology, two in health technology infrastructure. Building digital health systems for settings with unreliable power, low bandwidth, and no margin for failure. Clinical domain knowledge comes from inside the workflow, not user research interviews.',
  email: 'chifensama0@gmail.com',
  github: 'https://github.com/CHIF3N',
  linkedin: 'https://www.linkedin.com/in/chif3n/',
  whatsapp: '+237 672 835 132',
  location: 'Buea / Yaoundé, Cameroon',
};

export async function readSiteConfig(): Promise<SiteConfig> {
  const { siteConfigFile } = getDataPaths();
  try {
    if (fs.existsSync(siteConfigFile)) {
      const raw = fs.readFileSync(siteConfigFile, 'utf-8');
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_CONFIG, ...parsed };
    }
  } catch (err) {
    console.error('Error reading siteConfig.json:', err);
  }
  return DEFAULT_CONFIG;
}

export async function writeSiteConfig(data: Partial<SiteConfig>): Promise<SiteConfig> {
  const { siteConfigFile } = getDataPaths();
  const current = await readSiteConfig();
  const updated: SiteConfig = {
    ...current,
    name: String(data.name ?? current.name).trim(),
    role: String(data.role ?? current.role).trim(),
    tagline: String(data.tagline ?? current.tagline).trim(),
    pitch: String(data.pitch ?? current.pitch).trim(),
    email: String(data.email ?? current.email).trim(),
    github: String(data.github ?? current.github).trim(),
    linkedin: String(data.linkedin ?? current.linkedin).trim(),
    whatsapp: String(data.whatsapp ?? current.whatsapp).trim(),
    location: String(data.location ?? current.location).trim(),
  };

  fs.writeFileSync(siteConfigFile, JSON.stringify(updated, null, 2), 'utf-8');
  return updated;
}

// ── Talks & Media ───────────────────────────────────────────────────────────

export async function readTalks(): Promise<TalkItem[]> {
  const { talksFile } = getDataPaths();
  try {
    if (fs.existsSync(talksFile)) {
      const raw = fs.readFileSync(talksFile, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.error('Error reading talks.json:', err);
  }
  return [];
}

export async function writeTalks(talks: TalkItem[]): Promise<TalkItem[]> {
  const { talksFile } = getDataPaths();
  const sanitized = talks.map((t) => ({
    id: t.id || `talk-${Date.now()}`,
    title: String(t.title || '').trim(),
    event: String(t.event || '').trim(),
    location: String(t.location || '').trim(),
    date: String(t.date || '').trim(),
    abstract: String(t.abstract || '').trim(),
    embedUrl: formatGoogleSlidesEmbed(t.embedUrl || ''),
    deckUrl: String(t.deckUrl || '').trim(),
    videoUrl: String(t.videoUrl || '').trim(),
    tags: Array.isArray(t.tags) ? t.tags.map((s) => String(s).trim()).filter(Boolean) : [],
  }));

  fs.writeFileSync(talksFile, JSON.stringify(sanitized, null, 2), 'utf-8');
  return sanitized;
}

// ── Blog Posts ──────────────────────────────────────────────────────────────

export async function listBlogPosts(): Promise<BlogPostSummary[]> {
  const { blogDir } = getDataPaths();
  const files = fs.readdirSync(blogDir);
  const posts: BlogPostSummary[] = [];

  for (const file of files) {
    if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
    const slug = file.replace(/\.(md|mdx)$/, '');
    const fullPath = path.join(blogDir, file);
    try {
      const raw = fs.readFileSync(fullPath, 'utf-8');
      const { frontmatter } = parseFrontmatter(raw);
      posts.push({
        slug,
        title: frontmatter.title || slug,
        description: frontmatter.description || '',
        pubDate: frontmatter.pubDate || '',
        coverImage: frontmatter.cover || frontmatter.coverImage || '',
        tags: frontmatter.tags || [],
        draft: Boolean(frontmatter.draft),
        filename: file,
      });
    } catch (err) {
      console.error(`Error parsing blog post ${file}:`, err);
    }
  }

  // Sort by pubDate descending
  posts.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  return posts;
}

export async function getBlogPost(slug: string): Promise<BlogPostDetail | null> {
  const { blogDir } = getDataPaths();
  const candidates = [`${slug}.md`, `${slug}.mdx`];

  for (const filename of candidates) {
    const fullPath = path.join(blogDir, filename);
    if (fs.existsSync(fullPath)) {
      const raw = fs.readFileSync(fullPath, 'utf-8');
      const { frontmatter, content } = parseFrontmatter(raw);
      return {
        slug,
        title: frontmatter.title || slug,
        description: frontmatter.description || '',
        pubDate: frontmatter.pubDate || new Date().toISOString().slice(0, 10),
        coverImage: frontmatter.cover || frontmatter.coverImage || '',
        tags: frontmatter.tags || [],
        draft: Boolean(frontmatter.draft),
        filename,
        content,
      };
    }
  }

  return null;
}

export async function saveBlogPost(data: {
  slug: string;
  originalSlug?: string;
  title: string;
  description: string;
  pubDate?: string;
  coverImage?: string;
  tags?: string[];
  draft?: boolean;
  content: string;
}): Promise<BlogPostDetail> {
  const { blogDir } = getDataPaths();

  // Normalize slug
  const cleanSlug = data.slug
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  if (!cleanSlug) {
    throw new Error('Valid slug is required.');
  }

  // If renaming from an existing slug, delete old file if slug changed
  if (data.originalSlug && data.originalSlug !== cleanSlug) {
    const oldCandidates = [`${data.originalSlug}.md`, `${data.originalSlug}.mdx`];
    for (const oldFile of oldCandidates) {
      const oldPath = path.join(blogDir, oldFile);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }
  }

  const filename = `${cleanSlug}.md`;
  const filePath = path.join(blogDir, filename);

  const frontmatter: BlogFrontmatter = {
    title: data.title || cleanSlug,
    description: data.description || '',
    pubDate: data.pubDate || new Date().toISOString().slice(0, 10),
    tags: Array.isArray(data.tags) ? data.tags : [],
    draft: Boolean(data.draft),
    cover: data.coverImage || '',
    coverImage: data.coverImage || '',
  };

  const fileContent = serializeFrontmatter(frontmatter, data.content || '');
  fs.writeFileSync(filePath, fileContent, 'utf-8');

  return {
    slug: cleanSlug,
    title: frontmatter.title,
    description: frontmatter.description,
    pubDate: frontmatter.pubDate,
    coverImage: frontmatter.cover || '',
    tags: frontmatter.tags,
    draft: frontmatter.draft,
    filename,
    content: data.content || '',
  };
}

export async function deleteBlogPost(slug: string): Promise<boolean> {
  const { blogDir } = getDataPaths();
  const candidates = [`${slug}.md`, `${slug}.mdx`];
  let deleted = false;

  for (const filename of candidates) {
    const fullPath = path.join(blogDir, filename);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      deleted = true;
    }
  }

  return deleted;
}

// ── Media Library ──────────────────────────────────────────────────────────

export interface MediaAsset {
  id: string;
  filename: string;
  name: string;
  category: 'hero' | 'covers' | 'screenshots' | 'research' | 'scenes' | 'uploads';
  url: string;
  dimensions?: string;
  sizeBytes?: number;
  sizeFormatted: string;
  format: string;
  usedIn: string;
  activeUsage?: 'hero' | 'story' | 'project' | '';
}

export async function listMediaAssets(): Promise<MediaAsset[]> {
  const root = getAstroRoot();
  const assets: MediaAsset[] = [];

  const targetDirs = [
    { dir: path.join(root, 'public', 'photos'), cat: 'hero' as const, prefix: '/photos/' },
    { dir: path.join(root, 'public', 'covers'), cat: 'covers' as const, prefix: '/covers/' },
    { dir: path.join(root, 'public', 'work'), cat: 'screenshots' as const, prefix: '/work/' },
    { dir: path.join(root, 'public', 'scenes'), cat: 'scenes' as const, prefix: '/scenes/' },
    { dir: path.join(root, 'public', 'uploads'), cat: 'uploads' as const, prefix: '/uploads/' },
  ];

  function formatBytes(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function getFormat(ext: string) {
    const clean = ext.toLowerCase().replace('.', '');
    if (clean === 'jpg' || clean === 'jpeg') return 'JPEG';
    if (clean === 'png') return 'PNG';
    if (clean === 'webp') return 'WEBP';
    if (clean === 'svg') return 'SVG';
    if (clean === 'mp4') return 'MP4 Video';
    return clean.toUpperCase();
  }

  function getUsageLabel(name: string, cat: string) {
    if (name.includes('portrait')) return 'Homepage Hero Persona & Meta';
    if (name.includes('outdoor-1')) return 'Homepage Story Card (2nd Image Down)';
    if (name.includes('outdoor-2')) return 'About Page Clinical Story';
    if (name.includes('signature')) return 'Official Endorsement Signature';
    if (name.includes('lifedrop')) return 'LifeDrop System Cover';
    if (name.includes('coastclear')) return 'CoastClear Project Cover';
    if (name.includes('maternal')) return 'Maternal Health ML Study';
    if (name.includes('ayodah')) return 'Ayodah Blood Donor App';
    if (name.includes('lockedin')) return 'LockedIn Productivity Tool';
    if (name.includes('fig1')) return 'Research Figure: Risk Distribution';
    if (name.includes('fig4')) return 'Research Figure: Blood Sugar Histogram';
    if (name.includes('fig5')) return 'Research Figure: Correlation Heatmap';
    if (cat === 'scenes') return '3D Motion Scene Loop';
    return 'Portfolio Asset';
  }

  function getActiveUsage(name: string): 'hero' | 'story' | 'project' | '' {
    if (name.includes('portrait')) return 'hero';
    if (name.includes('outdoor-1')) return 'story';
    if (name.includes('lifedrop') || name.includes('coastclear') || name.includes('maternal')) return 'project';
    return '';
  }

  for (const { dir, cat, prefix } of targetDirs) {
    if (!fs.existsSync(dir)) continue;

    function walkDir(currentDir: string, currentPrefix: string) {
      try {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(currentDir, entry.name);
          if (entry.isDirectory()) {
            walkDir(fullPath, `${currentPrefix}${entry.name}/`);
          } else if (/\.(jpg|jpeg|png|webp|svg|mp4)$/i.test(entry.name)) {
            const stats = fs.statSync(fullPath);
            const ext = path.extname(entry.name);
            const url = `${currentPrefix}${entry.name}`;
            const itemCat = entry.name.startsWith('fig') ? 'research' : cat;

            assets.push({
              id: `media-${entry.name.replace(/[^a-zA-Z0-9_-]/g, '_')}`,
              filename: entry.name,
              name: entry.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
              category: itemCat,
              url,
              sizeBytes: stats.size,
              sizeFormatted: formatBytes(stats.size),
              format: getFormat(ext),
              usedIn: getUsageLabel(entry.name, itemCat),
              activeUsage: getActiveUsage(entry.name),
            });
          }
        }
      } catch (err) {
        console.error(`Error reading media dir ${currentDir}:`, err);
      }
    }

    walkDir(dir, prefix);
  }

  return assets;
}
