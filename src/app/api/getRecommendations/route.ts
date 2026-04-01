import { NextResponse } from 'next/server';
import { getOrCreateUser } from '@/lib/serverStore';
import { getCrossDomainRecommendationsForProfile } from '@/lib/recommender';
import { ContentType } from '@/lib/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') ?? 'demo-user';
  const type = (searchParams.get('type') as 'all' | ContentType | null) ?? 'all';
  const limit = Number(searchParams.get('limit') ?? '8');

  const user = getOrCreateUser(userId);
  const items = getCrossDomainRecommendationsForProfile(user, Number.isFinite(limit) ? limit : 8, type);

  return NextResponse.json({ user, items });
}
