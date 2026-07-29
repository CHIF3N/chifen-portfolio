#!/usr/bin/env node
import { writeFile, mkdir, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Give it a title:  npm run new:post -- "How the thing broke"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/['’]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const today = new Date().toISOString().slice(0, 10);
const path = join(root, 'src/content/blog', `${slug}.md`);

try {
  await access(path);
  console.error(`Already exists: src/content/blog/${slug}.md`);
  process.exit(1);
} catch {
  // does not exist, which is what we want
}

const body = `---
title: ${title.includes(':') ? `"${title.replace(/"/g, '\\"')}"` : title}
description:
pubDate: ${today}
tags: []
draft: true
---

Write it here. Drafts stay off the site until draft is set to false.

Use {{VERIFY: what the number is for}} for any figure you have not confirmed.
It renders highlighted on the page and lands in VERIFY.md.
`;

await mkdir(dirname(path), { recursive: true });
await writeFile(path, body, 'utf8');

console.log(`Created src/content/blog/${slug}.md`);
console.log('Set draft: false when it is ready to ship.');
