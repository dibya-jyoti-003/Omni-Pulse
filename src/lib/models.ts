export type ContentType = 'video' | 'music' | 'podcast' | 'movie' | 'news';

export type InteractionEventType = 'click' | 'like' | 'skip' | 'view';

export interface Interaction {
  userId: string;
  contentId: string;
  event: InteractionEventType;
  dwellTimeMs?: number;
  timestamp: number;
}

export interface UserProfile {
  userId: string;
  explicitInterests: string[];
  implicitTopics: Record<string, number>;
  history: Interaction[];
  createdAt: number;
  updatedAt: number;
}
