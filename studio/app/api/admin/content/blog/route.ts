/**
 * GET / POST / DELETE /api/admin/content/blog
 * Manages Markdown files in ../src/content/blog/
 */
import { NextRequest, NextResponse } from 'next/server';
import {
  listBlogPosts,
  getBlogPost,
  saveBlogPost,
  deleteBlogPost,
} from '@/lib/contentStore';

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get('slug');

    if (slug) {
      const post = await getBlogPost(slug);
      if (!post) {
        return NextResponse.json({ error: `Post with slug "${slug}" not found.` }, { status: 404 });
      }
      return NextResponse.json(post);
    }

    const posts = await listBlogPosts();
    return NextResponse.json(posts);
  } catch (err) {
    console.error('[blog] GET error:', err);
    return NextResponse.json({ error: 'Failed to retrieve blog posts.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 });
    }

    const { slug, originalSlug, title, description, pubDate, coverImage, tags, draft, content } = body;

    if (!title || typeof title !== 'string') {
      return NextResponse.json({ error: 'Post title is required.' }, { status: 400 });
    }

    // Auto-generate slug from title if not provided
    const effectiveSlug = (slug || title)
      .toLowerCase()
      .trim()
      .replace(/['’]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    if (!effectiveSlug) {
      return NextResponse.json({ error: 'Unable to derive a valid slug from the title.' }, { status: 400 });
    }

    const saved = await saveBlogPost({
      slug: effectiveSlug,
      originalSlug,
      title: title.trim(),
      description: (description || '').trim(),
      pubDate: pubDate || new Date().toISOString().slice(0, 10),
      coverImage: (coverImage || '').trim(),
      tags: Array.isArray(tags) ? tags : [],
      draft: Boolean(draft),
      content: content || '',
    });

    return NextResponse.json({ success: true, post: saved });
  } catch (err) {
    console.error('[blog] POST error:', err);
    const message = err instanceof Error ? err.message : 'Failed to save blog post.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const querySlug = req.nextUrl.searchParams.get('slug');
    const body = await req.json().catch(() => ({}));
    const targetSlug = querySlug || body?.slug;

    if (!targetSlug || typeof targetSlug !== 'string') {
      return NextResponse.json({ error: 'Target slug is required for deletion.' }, { status: 400 });
    }

    const deleted = await deleteBlogPost(targetSlug);
    if (!deleted) {
      return NextResponse.json({ error: `Post "${targetSlug}" was not found or already deleted.` }, { status: 404 });
    }

    return NextResponse.json({ success: true, slug: targetSlug });
  } catch (err) {
    console.error('[blog] DELETE error:', err);
    return NextResponse.json({ error: 'Failed to delete blog post.' }, { status: 500 });
  }
}
