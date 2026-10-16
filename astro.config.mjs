// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import { paperLight, paperDark, titleTransformer } from './src/lib/shiki-paper.mjs';

export default defineConfig({
  site: 'https://chifen.is-a.dev',
  markdown: {
    shikiConfig: {
      themes: { light: paperLight, dark: paperDark },
      defaultColor: false,
      transformers: [titleTransformer],
    },
  },
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/admin') && !page.includes('/explore') })],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
