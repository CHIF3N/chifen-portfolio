import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getBlogPost } from '@/lib/contentStore';
import { BlogEditor } from '@/components/BlogEditor';

export const metadata: Metadata = {
  title: 'Edit Blog Post — Chifen Studio',
  robots: 'noindex, nofollow',
};

export const dynamic = 'force-dynamic';

export default async function AdminEditBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <DashboardLayout
      title={`Edit: ${post.title}`}
      subtitle={`File: src/content/blog/${post.filename}`}
    >
      <BlogEditor initialData={post} isNew={false} />
    </DashboardLayout>
  );
}
