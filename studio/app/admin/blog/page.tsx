import type { Metadata } from 'next';
import { DashboardLayout } from '@/components/DashboardLayout';
import { listBlogPosts } from '@/lib/contentStore';
import { BlogListClient } from '@/components/BlogListClient';

export const metadata: Metadata = {
  title: 'Blog Manager — Chifen Studio',
  robots: 'noindex, nofollow',
};

export const dynamic = 'force-dynamic';

export default async function AdminBlogPage() {
  const posts = await listBlogPosts();

  return (
    <DashboardLayout
      title="Blog Manager"
      subtitle="Create, edit, and organize Markdown articles stored in ../src/content/blog/"
    >
      <BlogListClient initialPosts={posts} />
    </DashboardLayout>
  );
}
