export const USER_ID_STORAGE_KEY = 'omniPulse:userId';
export const EXPLICIT_INTERESTS_STORAGE_KEY = 'omniPulse:explicitInterests';

export function getOrCreateUserId(): string {
  if (typeof window === 'undefined') return 'demo-user';

  const existing = window.localStorage.getItem(USER_ID_STORAGE_KEY);
  if (existing) return existing;

  const created = crypto.randomUUID();
  window.localStorage.setItem(USER_ID_STORAGE_KEY, created);
  return created;
}

export function getUserId(): string {
  if (typeof window === 'undefined') return 'demo-user';
  return window.localStorage.getItem(USER_ID_STORAGE_KEY) ?? 'demo-user';
}

export function clearUserId(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(USER_ID_STORAGE_KEY);
}

export function getStoredExplicitInterests(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(EXPLICIT_INTERESTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.map((x) => String(x)).map((x) => x.trim()).filter(Boolean);
  } catch {
    return [];
  }
}

export function setStoredExplicitInterests(interests: string[]): void {
  if (typeof window === 'undefined') return;
  const normalized = Array.from(new Set(interests.map((x) => String(x).trim()).filter(Boolean)));
  window.localStorage.setItem(EXPLICIT_INTERESTS_STORAGE_KEY, JSON.stringify(normalized));
}

export function clearStoredExplicitInterests(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(EXPLICIT_INTERESTS_STORAGE_KEY);
}
