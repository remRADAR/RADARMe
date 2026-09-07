/**
 * Wallet service — placeholder.
 * Backend swap target: Supabase `wallet_transactions` view + RPC for payouts.
 */
import { delay, makeId, nowIso, ServiceError } from "./http";
import { SEED_TRANSACTIONS } from "./mocks/seed";
import type { WalletBalance, WalletTransaction } from "./types";

const txns: WalletTransaction[] = [...SEED_TRANSACTIONS];

function computeBalance(): WalletBalance {
  let available = 0;
  let pending = 0;
  for (const t of txns) {
    const signed = t.type === "credit" ? t.amount : -t.amount;
    if (t.type === "payout") pending += t.amount;
    else available += signed;
  }
  return { available: Math.max(0, available), pending, currency: "USD" };
}

export const walletService = {
  async getBalance(): Promise<WalletBalance> {
    return delay(computeBalance());
  },

  async listTransactions(): Promise<WalletTransaction[]> {
    return delay([...txns].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)));
  },

  async requestPayout(amount: number): Promise<WalletTransaction> {
    const balance = computeBalance();
    if (amount <= 0) throw new ServiceError("Amount must be positive", "WALLET_INVALID_AMOUNT");
    if (amount > balance.available) throw new ServiceError("Insufficient funds", "WALLET_INSUFFICIENT");
    const t: WalletTransaction = {
      id: makeId("tx"),
      type: "payout",
      amount,
      currency: "USD",
      description: "Withdraw to bank",
      createdAt: nowIso(),
    };
    txns.unshift(t);
    return delay(t);
  },
};

export type WalletService = typeof walletService;
