import type { Metadata } from 'next';
import { DashboardLayout } from '@/components/DashboardLayout';
import { listMediaAssets } from '@/lib/contentStore';
import { MediaLibraryClient } from '@/components/MediaLibraryClient';

export const metadata: Metadata = {
  title: 'Media Library — Chifen Studio',
  robots: 'noindex, nofollow',
};

export const dynamic = 'force-dynamic';

export default async function AdminMediaPage() {
  const assets = await listMediaAssets();

  return (
    <DashboardLayout
      title="Visual Media Library"
      subtitle="Manage project screenshots, hero persona portraits, research figures, and video scenes across your portfolio."
    >
      <MediaLibraryClient initialAssets={assets} />
    </DashboardLayout>
  );
}
