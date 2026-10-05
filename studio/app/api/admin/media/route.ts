import { NextResponse } from 'next/server';
import { listMediaAssets } from '@/lib/contentStore';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const auth = await requireAuth();
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const assets = await listMediaAssets();
    return NextResponse.json({ assets, count: assets.length });
  } catch (err: any) {
    console.error('Error fetching media assets:', err);
    return NextResponse.json({ error: err.message || 'Failed to list media' }, { status: 500 });
  }
}
