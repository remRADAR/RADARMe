/**
 * Referrals service — placeholder.
 * Backend swap target: Supabase `referrals` table + edge fn for reward payout.
 */
import { delay } from "./http";
import { SEED_REFERRALS } from "./mocks/seed";
import type { ReferralCode, ReferralEntry, ReferralStats } from "./types";

const entries: ReferralEntry[] = [...SEED_REFERRALS];

export const referralsService = {
  async getCode(): Promise<ReferralCode> {
    return delay({ code: "REM-RADAR", url: "https://radarme.app/i/REM-RADAR" });
  },

  async getStats(): Promise<ReferralStats> {
    const active = entries.filter((e) => e.status === "active");
    return delay({
      totalReferred: entries.length,
      activeReferred: active.length,
      earned: active.reduce((sum, e) => sum + e.reward, 0),
      currency: "USD",
    });
  },

  async list(): Promise<ReferralEntry[]> {
    return delay([...entries]);
  },
};

export type ReferralsService = typeof referralsService;
