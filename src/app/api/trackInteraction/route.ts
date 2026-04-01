import { NextResponse } from 'next/server';
import { addInteraction, getOrCreateUser, setImplicitTopics } from '@/lib/serverStore';
import { MOCK_DATA } from '@/lib/mockData';
import { InteractionEventType } from '@/lib/models';

function applyImplicitUpdate(current: Record<string, number>, topics: string[], event: InteractionEventType, dwellTimeMs?: number): Record<string, number> {
  const updated = { ...current };

  const base = event === 'like' ? 2 : event === 'click' ? 1 : event === 'skip' ? -1 : 0.25;
  const dwellBoost = dwellTimeMs ? Math.min(1.5, Math.max(0, dwellTimeMs / 60000)) : 0;
  const delta = base + dwellBoost;

  for (const t of topics) {
    updated[t] = (updated[t] ?? 0) + delta;
  }

  return updated;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as null | {
    userId?: string;
    contentId?: string;
    event?: InteractionEventType;
    dwellTimeMs?: number;
  };

  const userId = body?.userId ?? 'demo-user';
  const contentId = body?.contentId;
  const event = body?.event ?? 'click';

  if (!contentId) {
    return NextResponse.json({ error: 'contentId is required' }, { status: 400 });
  }

  const content = MOCK_DATA.find((c) => c.id === contentId);
  if (!content) {
    return NextResponse.json({ error: 'Unknown contentId' }, { status: 404 });
  }

  const user = getOrCreateUser(userId);
  addInteraction(userId, { contentId, event, dwellTimeMs: body?.dwellTimeMs });

  const implicitTopics = applyImplicitUpdate(user.implicitTopics, content.topics, event, body?.dwellTimeMs);
  const updatedUser = setImplicitTopics(userId, implicitTopics);

  return NextResponse.json({ user: updatedUser });
}
