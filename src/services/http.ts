/**
 * Tiny helpers used by every mock service to simulate an async backend.
 * Swap these out for real network calls when wiring the real backend.
 */

export const MOCK_LATENCY_MS = 320;

export function delay<T>(value: T, ms: number = MOCK_LATENCY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export class ServiceError extends Error {
  code: string;
  constructor(message: string, code: string = "SERVICE_ERROR") {
    super(message);
    this.name = "ServiceError";
    this.code = code;
  }
}

/** Deterministic short id — good enough for optimistic client rows. */
export function makeId(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export function nowIso(): string {
  return new Date().toISOString();
}
