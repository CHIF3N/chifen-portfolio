// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import { remarkVerify } from './src/lib/remark-verify.mjs';

// site is rewritten to the real host once the deploy target is confirmed
export default defineConfig({
  site: 'https://chifen-portfolio.pages.dev',
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: unified({ remarkPlugins: [remarkVerify] }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
