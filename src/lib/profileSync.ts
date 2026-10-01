import { supabase } from './supabase';

export type LearnerProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
};

const profileCache = new Map<string, { profile: LearnerProfile; savedAt: number }>();
const cacheLifetimeMs = 10 * 60 * 1000;

export function getCachedLmsProfile(userId: string): LearnerProfile | null {
  const cached = profileCache.get(userId);
  if (!cached || Date.now() - cached.savedAt >= cacheLifetimeMs) return null;
  return cached.profile;
}

export async function syncLmsProfile(options: { forceRefresh?: boolean } = {}): Promise<LearnerProfile> {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session?.access_token) throw sessionError || new Error('Your sign-in session has expired.');

  if (!options.forceRefresh) {
    const cached = getCachedLmsProfile(session.user.id);
    if (cached) return cached;
  }

  const response = await fetch('/api/profile/sync', {
    method: 'POST',
    headers: { Authorization: `Bearer ${session.access_token}` },
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Could not sync your profile.');
  const profile = result.profile as LearnerProfile;
  profileCache.set(session.user.id, { profile, savedAt: Date.now() });
  return profile;
}
