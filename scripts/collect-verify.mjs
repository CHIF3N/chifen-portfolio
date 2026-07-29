#!/usr/bin/env node
/**
 * Scans every content file for {{VERIFY: ...}} tokens and rewrites VERIFY.md.
 * Runs automatically before build, so the list can never drift from the site.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = join(root, 'src/content');
const PATTERN = /\{\{VERIFY:\s*([^}]+?)\s*\}\}/g;

async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (/\.mdx?$/.test(entry.name)) files.push(full);
  }
  return files;
}

const files = (await walk(contentDir)).sort();
const findings = [];

for (const file of files) {
  const text = await readFile(file, 'utf8');
  const lines = text.split(/\r?\n/);
  lines.forEach((line, i) => {
    PATTERN.lastIndex = 0;
    let match;
    while ((match = PATTERN.exec(line)) !== null) {
      findings.push({
        file: relative(root, file).split(sep).join('/'),
        line: i + 1,
        what: match[1],
      });
    }
  });
}

const grouped = new Map();
for (const f of findings) {
  if (!grouped.has(f.file)) grouped.set(f.file, []);
  grouped.get(f.file).push(f);
}

const stamp = new Date().toISOString().slice(0, 10);
let out = `# VERIFY

Every unconfirmed figure on the site, in one place. Each one renders as a
highlighted block on the page, so nothing here can ship unnoticed.

To resolve one: replace the whole \`{{VERIFY: ...}}\` token with the real value,
then run \`npm run build\`. This file regenerates itself.

Last generated: ${stamp}
Outstanding: **${findings.length}**

`;

if (findings.length === 0) {
  out += `---

Nothing outstanding. Every figure on the site is sourced.
`;
} else {
  for (const [file, items] of grouped) {
    out += `---

## \`${file}\`

`;
    for (const item of items) {
      out += `- [ ] **Line ${item.line}** — ${item.what}\n`;
    }
    out += '\n';
  }
}

await writeFile(join(root, 'VERIFY.md'), out, 'utf8');
console.log(`VERIFY.md written: ${findings.length} outstanding across ${grouped.size} file(s).`);
