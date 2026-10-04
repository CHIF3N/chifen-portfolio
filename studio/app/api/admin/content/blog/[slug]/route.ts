/**
 * GET / DELETE /api/admin/content/blog/[slug]
 */
import { NextRequest, NextResponse } from 'next/server';
import { getBlogPost, deleteBlogPost } from '@/lib/contentStore';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const post = await getBlogPost(slug);
    if (!post) {
      return NextResponse.json({ error: `Post with slug "${slug}" not found.` }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (err) {
    console.error('[blog/:slug] GET error:', err);
    return NextResponse.json({ error: 'Failed to retrieve blog post.' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const deleted = await deleteBlogPost(slug);
    if (!deleted) {
      return NextResponse.json({ error: `Post "${slug}" not found.` }, { status: 404 });
    }
    return NextResponse.json({ success: true, slug });
  } catch (err) {
    console.error('[blog/:slug] DELETE error:', err);
    return NextResponse.json({ error: 'Failed to delete blog post.' }, { status: 500 });
  }
}
