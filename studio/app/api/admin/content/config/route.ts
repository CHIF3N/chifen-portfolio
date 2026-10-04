/**
 * GET / POST /api/admin/content/config
 * Reads and updates ../src/data/siteConfig.json
 */
import { NextRequest, NextResponse } from 'next/server';
import { readSiteConfig, writeSiteConfig } from '@/lib/contentStore';

export async function GET() {
  try {
    const config = await readSiteConfig();
    return NextResponse.json(config);
  } catch (err) {
    console.error('[config] GET error:', err);
    return NextResponse.json({ error: 'Failed to read site configuration.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 });
    }

    const updated = await writeSiteConfig(body);
    return NextResponse.json({ success: true, config: updated });
  } catch (err) {
    console.error('[config] POST error:', err);
    return NextResponse.json({ error: 'Failed to update site configuration.' }, { status: 500 });
  }
}
