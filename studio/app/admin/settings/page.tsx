import type { Metadata } from 'next';
import { DashboardLayout } from '@/components/DashboardLayout';
import { readSiteConfig } from '@/lib/contentStore';
import { SiteSettingsClient } from '@/components/SiteSettingsClient';

export const metadata: Metadata = {
  title: 'Site & Pitch Settings — Chifen Studio',
  robots: 'noindex, nofollow',
};

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const config = await readSiteConfig();

  return (
    <DashboardLayout
      title="Site & Pitch Settings"
      subtitle="Update personal pitch, bio statement, location, and contact coordinates in src/data/siteConfig.json"
    >
      <SiteSettingsClient initialConfig={config} />
    </DashboardLayout>
  );
}
