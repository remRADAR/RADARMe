# RADARMe Services Layer

Placeholder service modules that mirror the shape of the future Supabase-backed
backend. Every service:

- Exports typed functions returning `Promise<T>` (async by design).
- Uses in-memory mock data under `./mocks/` — no network, no side effects.
- Is modular: one file per domain, no cross-imports between services.
- Is swappable: replace the mock body with a real client call
  (`supabase.from(...)`, `createServerFn`, `fetch`) without changing the
  public signature.

## Layout

```
services/
  types.ts            Shared domain types
  http.ts             Latency + failure simulation helpers
  index.ts            Barrel export (import from "@/services")
  auth.service.ts
  profile.service.ts
  wallet.service.ts
  orders.service.ts
  referrals.service.ts
  articles.service.ts
  community.service.ts
  notifications.service.ts
  settings.service.ts
  mocks/              Deterministic seed data per service
```

## Usage

```ts
import { walletService } from "@/services";
const balance = await walletService.getBalance();
```

## Backend swap checklist

1. Replace the mock body inside each `*.service.ts` with a Supabase or
   server-fn call. Keep the exported function signature unchanged.
2. Move server-secret calls behind `createServerFn` — services stay browser-safe.
3. Delete the corresponding `mocks/*.ts` file.
4. Wire error handling to the app's toast/error surface.
