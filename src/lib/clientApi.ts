import { ContentType } from './mockData';
import { InteractionEventType, UserProfile } from './models';
import { RecommendedItem } from './recommender';

export async function fetchUser(userId: string): Promise<UserProfile> {
  const res = await fetch(`/api/user?userId=${encodeURIComponent(userId)}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load user');
  const data = (await res.json()) as { user: UserProfile };
  return data.user;
}

export async function saveOnboarding(userId: string, interests: string[]): Promise<UserProfile> {
  const res = await fetch('/api/onboardingPreferences', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ userId, interests })
  });
  if (!res.ok) throw new Error('Failed to save onboarding preferences');
  const data = (await res.json()) as { user: UserProfile };
  return data.user;
}

export async function fetchRecommendations(userId: string, type: 'all' | ContentType, limit: number): Promise<{ user: UserProfile; items: RecommendedItem[] }> {
  const params = new URLSearchParams({ userId, type, limit: String(limit) });
  const res = await fetch(`/api/getRecommendations?${params.toString()}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch recommendations');
  return (await res.json()) as { user: UserProfile; items: RecommendedItem[] };
}

export async function trackInteraction(userId: string, contentId: string, event: InteractionEventType, dwellTimeMs?: number): Promise<UserProfile> {
  const res = await fetch('/api/trackInteraction', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ userId, contentId, event, dwellTimeMs })
  });
  if (!res.ok) throw new Error('Failed to track interaction');
  const data = (await res.json()) as { user: UserProfile };
  return data.user;
}

export async function searchContent(q: string): Promise<RecommendedItem[]> {
  const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Search failed');
  const data = (await res.json()) as { items: RecommendedItem[] };
  return data.items;
}
