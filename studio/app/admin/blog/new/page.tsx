import type { Metadata } from 'next';
import { DashboardLayout } from '@/components/DashboardLayout';
import { BlogEditor } from '@/components/BlogEditor';

export const metadata: Metadata = {
  title: 'New Blog Post — Chifen Studio',
  robots: 'noindex, nofollow',
};

export default function AdminNewBlogPage() {
  return (
    <DashboardLayout
      title="Create New Blog Post"
      subtitle="Write and preview a new article before saving to src/content/blog/"
    >
      <BlogEditor
        isNew={true}
        initialData={{
          title: '',
          slug: '',
          description: '',
          pubDate: new Date().toISOString().slice(0, 10),
          coverImage: '',
          tags: [],
          draft: false,
          content: `Write your article content here in Markdown.

## Section Heading

Detail your technical implementation, metrics, or regional constraints.
`,
        }}
      />
    </DashboardLayout>
  );
}
