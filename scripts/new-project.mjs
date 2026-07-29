#!/usr/bin/env node
import { writeFile, mkdir, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Give it a title:  npm run new:project -- "Triage bot"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/['’]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const year = new Date().getFullYear();
const path = join(root, 'src/content/work', `${slug}.md`);

try {
  await access(path);
  console.error(`Already exists: src/content/work/${slug}.md`);
  process.exit(1);
} catch {
  // does not exist, which is what we want
}

const body = `---
title: ${title.includes(':') ? `"${title.replace(/"/g, '\\"')}"` : title}
summary:
role:
tags: []
status: in-progress
year: ${year}
featured: false
order: 100
metrics: []
---

## What it is

Write the case study here.

## Build

What it runs on, and the one decision worth explaining.

## Where it stands

Be honest about what is live versus what is a prototype.
`;

await mkdir(dirname(path), { recursive: true });
await writeFile(path, body, 'utf8');

console.log(`Created src/content/work/${slug}.md`);
console.log('status: live | shipped | in-progress | concept');
console.log('Set featured: true and a low order number to surface it on the home page.');
