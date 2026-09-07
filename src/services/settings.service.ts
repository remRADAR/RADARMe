/**
 * Settings service — placeholder.
 * Backend swap target: Supabase `user_settings` (1:1 with auth.users) + RLS.
 */
import { delay } from "./http";
import { SEED_SETTINGS } from "./mocks/seed";
import type { UserSettings } from "./types";

let settings: UserSettings = { ...SEED_SETTINGS };

export const settingsService = {
  async get(): Promise<UserSettings> {
    return delay({ ...settings });
  },

  async update(patch: Partial<UserSettings>): Promise<UserSettings> {
    settings = {
      ...settings,
      ...patch,
      notifications: { ...settings.notifications, ...(patch.notifications ?? {}) },
      privacy: { ...settings.privacy, ...(patch.privacy ?? {}) },
    };
    return delay({ ...settings });
  },

  async reset(): Promise<UserSettings> {
    settings = { ...SEED_SETTINGS };
    return delay({ ...settings });
  },
};

export type SettingsService = typeof settingsService;
