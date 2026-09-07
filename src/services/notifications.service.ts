/**
 * Notifications service — placeholder.
 * Backend swap target: Supabase `notifications` table + realtime subscribe.
 */
import { delay, ServiceError } from "./http";
import { SEED_NOTIFICATIONS } from "./mocks/seed";
import type { AppNotification, ID } from "./types";

let notifications: AppNotification[] = [...SEED_NOTIFICATIONS];

export const notificationsService = {
  async list(): Promise<AppNotification[]> {
    return delay([...notifications].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)));
  },

  async unreadCount(): Promise<number> {
    return delay(notifications.filter((n) => !n.read).length);
  },

  async markRead(id: ID): Promise<AppNotification> {
    const idx = notifications.findIndex((n) => n.id === id);
    if (idx === -1) throw new ServiceError("Notification not found", "NTF_NOT_FOUND");
    notifications[idx] = { ...notifications[idx], read: true };
    return delay(notifications[idx]);
  },

  async markAllRead(): Promise<{ ok: true }> {
    notifications = notifications.map((n) => ({ ...n, read: true }));
    return delay({ ok: true } as const);
  },

  async clear(): Promise<{ ok: true }> {
    notifications = [];
    return delay({ ok: true } as const);
  },
};

export type NotificationsService = typeof notificationsService;
