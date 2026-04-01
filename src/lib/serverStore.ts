import { UserProfile, Interaction } from './models';

type Store = {
  users: Map<string, UserProfile>;
};

function getStore(): Store {
  const g = globalThis as unknown as { __omniPulseStore?: Store };
  if (!g.__omniPulseStore) {
    g.__omniPulseStore = { users: new Map() };
  }
  return g.__omniPulseStore;
}

export function getOrCreateUser(userId: string): UserProfile {
  const store = getStore();
  const existing = store.users.get(userId);
  const now = Date.now();
  if (existing) return existing;

  const created: UserProfile = {
    userId,
    explicitInterests: [],
    implicitTopics: {},
    history: [],
    createdAt: now,
    updatedAt: now
  };
  store.users.set(userId, created);
  return created;
}

export function updateUserInterests(userId: string, interests: string[]): UserProfile {
  const store = getStore();
  const user = getOrCreateUser(userId);
  const now = Date.now();
  const updated: UserProfile = {
    ...user,
    explicitInterests: Array.from(new Set(interests)).filter(Boolean),
    updatedAt: now
  };
  store.users.set(userId, updated);
  return updated;
}

export function addInteraction(userId: string, interaction: Omit<Interaction, 'userId' | 'timestamp'> & { timestamp?: number }): UserProfile {
  const store = getStore();
  const user = getOrCreateUser(userId);
  const ts = interaction.timestamp ?? Date.now();

  const event: Interaction = {
    userId,
    contentId: interaction.contentId,
    event: interaction.event,
    dwellTimeMs: interaction.dwellTimeMs,
    timestamp: ts
  };

  const updated: UserProfile = {
    ...user,
    history: [event, ...user.history].slice(0, 500),
    updatedAt: Date.now()
  };

  store.users.set(userId, updated);
  return updated;
}

export function setImplicitTopics(userId: string, implicitTopics: Record<string, number>): UserProfile {
  const store = getStore();
  const user = getOrCreateUser(userId);
  const updated: UserProfile = {
    ...user,
    implicitTopics,
    updatedAt: Date.now()
  };
  store.users.set(userId, updated);
  return updated;
}
