import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      role: z.string(),
      tags: z.array(z.string()),
      status: z.enum(['live', 'shipped', 'in-progress', 'concept']),
      year: z.number(),
      liveUrl: z.string().url().optional(),
      repoUrl: z.string().url().optional(),
      cover: image().optional(),
      featured: z.boolean().default(false),
      metrics: z.array(z.string()).default([]),
      order: z.number().default(100),
      note: z.string().optional(),
      researchSlug: z.string().optional(),
    }),
});

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updated: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(true),
      cover: image().optional(),
    }),
});

const research = defineCollection({
  loader: glob({ base: './src/content/research', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    institution: z.string(),
    year: z.number(),
    tags: z.array(z.string()),
    link: z.string().url().optional(),
    status: z.enum(['complete', 'in-progress']),
    kind: z.string().default('Study'),
    supervisor: z.string().optional(),
    site: z.string().optional(),
  }),
});

export const collections = { work, blog, research };
