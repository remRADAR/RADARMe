/**
 * Orders service — placeholder.
 * Backend swap target: Supabase `orders` table with RLS on user_id.
 */
import { delay, makeId, nowIso, ServiceError } from "./http";
import { SEED_ORDERS } from "./mocks/seed";
import type { ID, Order, OrderStatus } from "./types";

const orders: Order[] = [...SEED_ORDERS];

export const ordersService = {
  async list(): Promise<Order[]> {
    return delay([...orders]);
  },

  async getById(id: ID): Promise<Order | null> {
    return delay(orders.find((o) => o.id === id) ?? null);
  },

  async create(input: { service: string; tier: string; amount: number }): Promise<Order> {
    if (input.amount < 0) throw new ServiceError("Amount must be non-negative", "ORDER_INVALID");
    const now = nowIso();
    const order: Order = {
      id: makeId("ord"),
      service: input.service,
      tier: input.tier,
      status: "pending",
      amount: input.amount,
      currency: "USD",
      createdAt: now,
      updatedAt: now,
    };
    orders.unshift(order);
    return delay(order);
  },

  async updateStatus(id: ID, status: OrderStatus): Promise<Order> {
    const idx = orders.findIndex((o) => o.id === id);
    if (idx === -1) throw new ServiceError("Order not found", "ORDER_NOT_FOUND");
    orders[idx] = { ...orders[idx], status, updatedAt: nowIso() };
    return delay(orders[idx]);
  },

  async cancel(id: ID): Promise<Order> {
    return this.updateStatus(id, "cancelled");
  },
};

export type OrdersService = typeof ordersService;
