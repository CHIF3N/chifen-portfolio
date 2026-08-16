// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import unified from '@astrojs/markdown-remark';
import { remarkVerify } from './src/lib/remark-verify.mjs';

export default defineConfig({
  site: 'https://chifen.is-a.dev',
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: unified({ remarkPlugins: [remarkVerify] }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
