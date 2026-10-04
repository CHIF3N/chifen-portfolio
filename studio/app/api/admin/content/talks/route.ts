/**
 * GET / POST /api/admin/content/talks
 * Reads and updates ../src/data/talks.json
 */
import { NextRequest, NextResponse } from 'next/server';
import { readTalks, writeTalks, formatGoogleSlidesEmbed, TalkItem } from '@/lib/contentStore';

export async function GET() {
  try {
    const talks = await readTalks();
    return NextResponse.json(talks);
  } catch (err) {
    console.error('[talks] GET error:', err);
    return NextResponse.json({ error: 'Failed to read talks data.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 });
    }

    const currentTalks = await readTalks();

    // If an entire array was sent, replace/update the list
    if (Array.isArray(body)) {
      const sanitized = body.map((t) => ({
        ...t,
        embedUrl: formatGoogleSlidesEmbed(t.embedUrl || ''),
      }));
      const saved = await writeTalks(sanitized);
      return NextResponse.json({ success: true, talks: saved });
    }

    if (Array.isArray(body.talks)) {
      const sanitized = body.talks.map((t: TalkItem) => ({
        ...t,
        embedUrl: formatGoogleSlidesEmbed(t.embedUrl || ''),
      }));
      const saved = await writeTalks(sanitized);
      return NextResponse.json({ success: true, talks: saved });
    }

    // Single talk upsert
    const talkData: TalkItem = body.talk || body;
    if (!talkData.title) {
      return NextResponse.json({ error: 'Talk title is required.' }, { status: 400 });
    }

    const id = talkData.id || `talk-${Date.now()}`;
    const embedUrl = formatGoogleSlidesEmbed(talkData.embedUrl || '');

    const newTalk: TalkItem = {
      id,
      title: talkData.title.trim(),
      event: (talkData.event || '').trim(),
      location: (talkData.location || '').trim(),
      date: (talkData.date || '').trim(),
      abstract: (talkData.abstract || '').trim(),
      embedUrl,
      deckUrl: (talkData.deckUrl || '').trim(),
      videoUrl: (talkData.videoUrl || '').trim(),
      tags: Array.isArray(talkData.tags) ? talkData.tags : [],
    };

    const existingIndex = currentTalks.findIndex((t) => t.id === id);
    let updatedList: TalkItem[];

    if (existingIndex >= 0) {
      updatedList = [...currentTalks];
      updatedList[existingIndex] = newTalk;
    } else {
      updatedList = [newTalk, ...currentTalks];
    }

    const saved = await writeTalks(updatedList);
    return NextResponse.json({ success: true, talk: newTalk, talks: saved });
  } catch (err) {
    console.error('[talks] POST error:', err);
    return NextResponse.json({ error: 'Failed to update talks.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const queryId = url.searchParams.get('id');
    const body = await req.json().catch(() => ({}));
    const targetId = queryId || body?.id;

    if (!targetId) {
      return NextResponse.json({ error: 'Talk ID is required for deletion.' }, { status: 400 });
    }

    const currentTalks = await readTalks();
    const filtered = currentTalks.filter((t) => t.id !== targetId);
    const saved = await writeTalks(filtered);

    return NextResponse.json({ success: true, talks: saved });
  } catch (err) {
    console.error('[talks] DELETE error:', err);
    return NextResponse.json({ error: 'Failed to delete talk.' }, { status: 500 });
  }
}
