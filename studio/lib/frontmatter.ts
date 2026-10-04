/**
 * studio/lib/frontmatter.ts
 *
 * Lightweight, zero-dependency YAML frontmatter parser and serializer
 * tailored for Astro blog Markdown/MDX collections.
 */

export interface BlogFrontmatter {
  title: string;
  description: string;
  pubDate: string;
  updated?: string;
  tags: string[];
  draft: boolean;
  cover?: string | null;
  coverImage?: string | null;
  [key: string]: any;
}

export interface ParsedMarkdown {
  frontmatter: BlogFrontmatter;
  content: string;
}

export function parseFrontmatter(rawContent: string): ParsedMarkdown {
  const normalized = rawContent.replace(/\r\n/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!match) {
    return {
      frontmatter: {
        title: '',
        description: '',
        pubDate: new Date().toISOString().slice(0, 10),
        tags: [],
        draft: false,
        cover: '',
        coverImage: '',
      },
      content: rawContent,
    };
  }

  const [, yamlBlock, markdownBody] = match;
  const frontmatter: BlogFrontmatter = {
    title: '',
    description: '',
    pubDate: new Date().toISOString().slice(0, 10),
    tags: [],
    draft: false,
  };

  const lines = yamlBlock.split('\n');
  let currentKey = '';
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Check if it's a list item
    if (inList && (line.startsWith('  - ') || line.startsWith('- '))) {
      const val = trimmed.replace(/^-\s*/, '').replace(/^['"](.*)['"]$/, '$1').trim();
      if (Array.isArray(frontmatter[currentKey])) {
        frontmatter[currentKey].push(val);
      }
      continue;
    }

    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim();
    const rawVal = line.slice(colonIdx + 1).trim();
    currentKey = key;
    inList = false;

    if (rawVal === '') {
      // Possible multiline list or object starting on next line
      inList = true;
      frontmatter[key] = [];
      continue;
    }

    // Inline array: [a, b, c]
    if (rawVal.startsWith('[') && rawVal.endsWith(']')) {
      const inner = rawVal.slice(1, -1).trim();
      if (!inner) {
        frontmatter[key] = [];
      } else {
        frontmatter[key] = inner
          .split(',')
          .map((item) => item.trim().replace(/^['"](.*)['"]$/, '$1'))
          .filter(Boolean);
      }
      continue;
    }

    // Boolean
    if (rawVal === 'true') {
      frontmatter[key] = true;
      continue;
    }
    if (rawVal === 'false') {
      frontmatter[key] = false;
      continue;
    }

    // Number
    if (/^-?\d+(\.\d+)?$/.test(rawVal)) {
      frontmatter[key] = Number(rawVal);
      continue;
    }

    // String (strip surrounding quotes if present)
    const strVal = rawVal.replace(/^['"](.*)['"]$/, '$1');
    frontmatter[key] = strVal;
  }

  // Normalize tags
  if (!Array.isArray(frontmatter.tags)) {
    frontmatter.tags = frontmatter.tags ? [String(frontmatter.tags)] : [];
  }

  // Normalize cover / coverImage
  const coverUrl = frontmatter.cover || frontmatter.coverImage || '';
  frontmatter.cover = coverUrl;
  frontmatter.coverImage = coverUrl;

  return {
    frontmatter,
    content: markdownBody,
  };
}

export function serializeFrontmatter(frontmatter: Partial<BlogFrontmatter>, content: string): string {
  const title = (frontmatter.title || 'Untitled Post').trim();
  const description = (frontmatter.description || '').trim();
  const pubDate = frontmatter.pubDate || new Date().toISOString().slice(0, 10);
  const draft = Boolean(frontmatter.draft);
  const coverUrl = (frontmatter.cover || frontmatter.coverImage || '').trim();
  const tags = Array.isArray(frontmatter.tags)
    ? frontmatter.tags.map((t) => String(t).trim()).filter(Boolean)
    : [];

  const lines = ['---'];
  // Escape quotes in title & description
  lines.push(`title: "${title.replace(/"/g, '\\"')}"`);
  lines.push(`description: "${description.replace(/"/g, '\\"')}"`);
  lines.push(`pubDate: ${pubDate}`);
  if (frontmatter.updated) {
    lines.push(`updated: ${frontmatter.updated}`);
  }
  lines.push(`draft: ${draft}`);

  // Astro schema expects 'cover' (string optional)
  if (coverUrl) {
    lines.push(`cover: "${coverUrl.replace(/"/g, '\\"')}"`);
  }

  if (tags.length === 0) {
    lines.push('tags: []');
  } else {
    const formattedTags = tags.map((t) => `'${t.replace(/'/g, "\\'")}'`).join(', ');
    lines.push(`tags: [${formattedTags}]`);
  }

  lines.push('---');
  lines.push('');
  lines.push(content.replace(/^\n+/, ''));

  return lines.join('\n');
}
