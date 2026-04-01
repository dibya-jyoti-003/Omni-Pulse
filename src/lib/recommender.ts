import { MOCK_DATA, ContentItem, ContentType } from './mockData';
import { UserProfile } from './models';

export interface RecommendationReason {
  sourceTitle: string;
  sourceType: ContentType;
  sharedTopics: string[];
}

export interface RecommendedItem extends ContentItem {
  reason?: RecommendationReason;
  score?: number;
}

type RankingWeights = {
  alpha: number; // explicit + implicit similarity
  gamma: number; // popularity
  delta: number; // recency
};

const DEFAULT_WEIGHTS: RankingWeights = {
  alpha: 0.7,
  gamma: 0.2,
  delta: 0.1
};

function clamp01(n: number): number {
  return Math.max(0, Math.min(1, n));
}

function normalizeImplicitTopics(implicitTopics: Record<string, number>): Record<string, number> {
  const entries = Object.entries(implicitTopics);
  if (entries.length === 0) return {};
  const max = Math.max(...entries.map(([, v]) => v));
  if (max <= 0) return {};
  return Object.fromEntries(entries.map(([k, v]) => [k, v / max]));
}

function buildUserTopicWeights(profile: UserProfile): Record<string, number> {
  const weights: Record<string, number> = {};

  for (const t of profile.explicitInterests) {
    weights[t] = (weights[t] ?? 0) + 1;
  }

  const normalizedImplicit = normalizeImplicitTopics(profile.implicitTopics);
  for (const [topic, w] of Object.entries(normalizedImplicit)) {
    weights[topic] = (weights[topic] ?? 0) + w;
  }

  return weights;
}

function scoreItemForUser(item: ContentItem, userTopicWeights: Record<string, number>, weights: RankingWeights): { similarity: number; popularity: number; recency: number; total: number; topSharedTopic?: string } {
  const similarityRaw = item.topics.reduce((acc, t) => acc + (userTopicWeights[t] ?? 0), 0);
  const similarity = clamp01(similarityRaw / 4);

  const popularity = clamp01(item.popularityScore ?? 0.5);

  const releasedAt = item.releasedAt ?? Date.now();
  const daysOld = (Date.now() - releasedAt) / (1000 * 60 * 60 * 24);
  const recency = clamp01(1 - daysOld / 365);

  let topSharedTopic: string | undefined;
  let best = 0;
  for (const t of item.topics) {
    const w = userTopicWeights[t] ?? 0;
    if (w > best) {
      best = w;
      topSharedTopic = t;
    }
  }

  const total = weights.alpha * similarity + weights.gamma * popularity + weights.delta * recency;
  return { similarity, popularity, recency, total, topSharedTopic };
}

export function getCrossDomainRecommendationsForProfile(
  profile: UserProfile,
  limit: number = 8,
  type: 'all' | ContentType = 'all'
): RecommendedItem[] {
  const userTopicWeights = buildUserTopicWeights(profile);
  const candidates = type === 'all' ? MOCK_DATA : MOCK_DATA.filter(i => i.type === type);

  const scored = candidates
    .map((item) => {
      const scoredParts = scoreItemForUser(item, userTopicWeights, DEFAULT_WEIGHTS);
      const reason: RecommendationReason | undefined = scoredParts.topSharedTopic
        ? {
            sourceTitle: 'your interests',
            sourceType: item.type,
            sharedTopics: [scoredParts.topSharedTopic]
          }
        : undefined;
      return { ...item, score: scoredParts.total, reason };
    })
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  return scored.slice(0, limit);
}

export function getBridgedRecommendation(
  sourceItem: ContentItem,
  targetType: ContentType
): RecommendedItem | null {
  // Find an item of targetType that shares most topics with sourceItem
  const candidates = MOCK_DATA.filter(item => item.type === targetType && item.id !== sourceItem.id);
  
  let bestMatch: ContentItem | null = null;
  let maxMatch = 0;
  let sharedTopics: string[] = [];

  for (const candidate of candidates) {
    const common = candidate.topics.filter(t => sourceItem.topics.includes(t));
    if (common.length > maxMatch) {
      maxMatch = common.length;
      bestMatch = candidate;
      sharedTopics = common;
    }
  }

  if (bestMatch && maxMatch > 0) {
    return {
      ...bestMatch,
      reason: {
        sourceTitle: sourceItem.title,
        sourceType: sourceItem.type,
        sharedTopics
      }
    };
  }

  return null;
}

export function getTrendingAcrossDomains(): ContentItem[] {
  // Return a mix of items
  return [...MOCK_DATA].sort(() => 0.5 - Math.random()).slice(0, 6);
}
