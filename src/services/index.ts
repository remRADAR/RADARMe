/**
 * RADARMe services barrel.
 * Import from "@/services" — never reach into individual files from features.
 *
 * All services are placeholder implementations backed by in-memory mocks.
 * They mirror the shape the real backend will expose so wiring later is a
 * body-swap, not an API redesign.
 */

export * from "./types";
export { ServiceError } from "./http";

export { authService } from "./auth.service";
export { profileService } from "./profile.service";
export { walletService } from "./wallet.service";
export { ordersService } from "./orders.service";
export { referralsService } from "./referrals.service";
export { articlesService } from "./articles.service";
export { communityService } from "./community.service";
export { notificationsService } from "./notifications.service";
export { settingsService } from "./settings.service";
