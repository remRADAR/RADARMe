/**
 * Auth service — placeholder.
 * When wiring the real backend, replace bodies with `supabase.auth.*` calls
 * or `createServerFn` handlers. Signatures must remain stable.
 */
import { delay, makeId, nowIso, ServiceError } from "./http";
import type { AuthCredentials, AuthProviderId, AuthSession } from "./types";

let currentSession: AuthSession | null = null;

export const authService = {
  async getSession(): Promise<AuthSession | null> {
    return delay(currentSession);
  },

  async signInWithPassword({ email, password }: AuthCredentials): Promise<AuthSession> {
    if (!email || !password) throw new ServiceError("Missing credentials", "AUTH_INVALID");
    currentSession = {
      userId: makeId("user"),
      email,
      createdAt: nowIso(),
      provider: "email",
    };
    return delay(currentSession);
  },

  async signInWithProvider(provider: Exclude<AuthProviderId, "email">): Promise<AuthSession> {
    currentSession = {
      userId: makeId("user"),
      email: `${provider}@placeholder.dev`,
      createdAt: nowIso(),
      provider,
    };
    return delay(currentSession);
  },

  async signUp({ email, password }: AuthCredentials): Promise<AuthSession> {
    if (password.length < 8) throw new ServiceError("Password too short", "AUTH_WEAK_PASSWORD");
    currentSession = {
      userId: makeId("user"),
      email,
      createdAt: nowIso(),
      provider: "email",
    };
    return delay(currentSession);
  },

  async requestPasswordReset(_email: string): Promise<{ ok: true }> {
    return delay({ ok: true } as const);
  },

  async verifyOtp(_code: string): Promise<{ ok: true }> {
    return delay({ ok: true } as const);
  },

  async signOut(): Promise<void> {
    currentSession = null;
    return delay(undefined);
  },
};

export type AuthService = typeof authService;
