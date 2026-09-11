import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * Placeholder authentication.
 *
 * Persists a fake session + profile in localStorage so the UI flow (welcome
 * → auth → verify → onboarding → dashboard) can be exercised end-to-end
 * without a backend. The shape is intentionally close to what a Supabase
 * session + profile row would look like so we can swap the internals
 * later without touching call sites.
 */

const SESSION_KEY = "radarme.session.v1";

export type ArtistProfile = {
  displayName: string;
  username: string;
  role: string;
  city: string;
  genres: string[];
};

export type Session = {
  id: string;
  email: string;
  verified: boolean;
  createdAt: number;
  profile: ArtistProfile | null;
  onboardedAt: number | null;
};

type AuthCtx = {
  session: Session | null;
  hydrated: boolean;
  signIn: (email: string, _password: string) => Promise<Session>;
  signUp: (email: string, _password: string) => Promise<Session>;
  requestPasswordReset: (email: string) => Promise<void>;
  verifyEmail: () => Promise<void>;
  saveProfile: (profile: Partial<ArtistProfile>) => Promise<void>;
  completeOnboarding: () => Promise<void>;
  signOut: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);

function readSession(): Session | null {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

function writeSession(s: Session | null) {
  try {
    if (s) window.localStorage.setItem(SESSION_KEY, JSON.stringify(s));
    else window.localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

function delay(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSession(readSession());
    setHydrated(true);
  }, []);

  const update = useCallback((next: Session | null) => {
    setSession(next);
    writeSession(next);
  }, []);

  const value = useMemo<AuthCtx>(
    () => ({
      session,
      hydrated,
      async signIn(email) {
        await delay(650);
        const next: Session =
          session?.email === email
            ? { ...session }
            : {
                id: crypto.randomUUID(),
                email,
                verified: true,
                createdAt: Date.now(),
                profile: null,
                onboardedAt: null,
              };
        update(next);
        return next;
      },
      async signUp(email) {
        await delay(700);
        const next: Session = {
          id: crypto.randomUUID(),
          email,
          verified: false,
          createdAt: Date.now(),
          profile: null,
          onboardedAt: null,
        };
        update(next);
        return next;
      },
      async requestPasswordReset() {
        await delay(600);
      },
      async verifyEmail() {
        await delay(700);
        if (!session) return;
        update({ ...session, verified: true });
      },
      async saveProfile(profile) {
        await delay(400);
        if (!session) return;
        const merged: ArtistProfile = {
          displayName: profile.displayName ?? session.profile?.displayName ?? "",
          username: profile.username ?? session.profile?.username ?? "",
          role: profile.role ?? session.profile?.role ?? "",
          city: profile.city ?? session.profile?.city ?? "",
          genres: profile.genres ?? session.profile?.genres ?? [],
        };
        update({ ...session, profile: merged });
      },
      async completeOnboarding() {
        await delay(300);
        if (!session) return;
        update({ ...session, onboardedAt: Date.now() });
      },
      signOut() {
        update(null);
      },
    }),
    [session, hydrated, update],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth(): AuthCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used within <AuthProvider>");
  return v;
}

export function isOnboarded(session: Session | null): boolean {
  return !!session && session.verified && !!session.profile && !!session.onboardedAt;
}
