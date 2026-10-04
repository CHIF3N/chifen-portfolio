import type { Metadata } from 'next';
import { DashboardLayout } from '@/components/DashboardLayout';
import { readTalks } from '@/lib/contentStore';
import { TalksManagerClient } from '@/components/TalksManagerClient';

export const metadata: Metadata = {
  title: 'Talks & Media — Chifen Studio',
  robots: 'noindex, nofollow',
};

export const dynamic = 'force-dynamic';

export default async function AdminTalksPage() {
  const talks = await readTalks();

  return (
    <DashboardLayout
      title="Talks & Media Manager"
      subtitle="Manage conference presentation slide decks, recorded demos, and architecture walkthroughs"
    >
      <TalksManagerClient initialTalks={talks} />
    </DashboardLayout>
  );
}
