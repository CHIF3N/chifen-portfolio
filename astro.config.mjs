// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import { remarkVerify } from './src/lib/remark-verify.mjs';

export default defineConfig({
  site: 'https://chifensama01-coder.github.io',
  base: '/chifen-portfolio',
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: unified({ remarkPlugins: [remarkVerify] }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
