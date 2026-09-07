/**
 * User profile service — placeholder.
 * Backend swap target: Supabase `profiles` table gated by RLS on auth.uid().
 */
import { delay } from "./http";
import { SEED_USER } from "./mocks/seed";
import type { ID, UserProfile } from "./types";

let profile: UserProfile = { ...SEED_USER };

export const profileService = {
  async getMe(): Promise<UserProfile> {
    return delay({ ...profile });
  },

  async getById(id: ID): Promise<UserProfile | null> {
    if (id === profile.id) return delay({ ...profile });
    return delay(null);
  },

  async updateMe(patch: Partial<UserProfile>): Promise<UserProfile> {
    profile = { ...profile, ...patch };
    return delay({ ...profile });
  },

  async setAvatar(avatarUrl: string): Promise<UserProfile> {
    profile = { ...profile, avatarUrl };
    return delay({ ...profile });
  },
};

export type ProfileService = typeof profileService;
