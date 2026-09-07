/**
 * Shared domain types for the RADARMe services layer.
 * Every service consumes/returns these — do not redeclare in service files.
 */

export type ID = string;
export type ISODate = string;

// ---------- Auth ----------
export type AuthProviderId = "email" | "google" | "apple";

export interface AuthSession {
  userId: ID;
  email: string;
  createdAt: ISODate;
  provider: AuthProviderId;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

// ---------- Profile ----------
export interface UserProfile {
  id: ID;
  username: string;
  displayName: string;
  handle: string;
  avatarUrl?: string;
  bio?: string;
  city?: string;
  role: "artist" | "producer" | "manager" | "label" | "fan";
  genres: string[];
  createdAt: ISODate;
  verified: boolean;
}

// ---------- Wallet ----------
export type Currency = "USD";

export interface WalletBalance {
  available: number;
  pending: number;
  currency: Currency;
}

export type WalletTxnType = "credit" | "debit" | "payout" | "refund";

export interface WalletTransaction {
  id: ID;
  type: WalletTxnType;
  amount: number;
  currency: Currency;
  description: string;
  createdAt: ISODate;
}

// ---------- Orders ----------
export type OrderStatus =
  | "draft"
  | "pending"
  | "in_review"
  | "active"
  | "completed"
  | "cancelled";

export interface Order {
  id: ID;
  service: string;
  tier: string;
  status: OrderStatus;
  amount: number;
  currency: Currency;
  createdAt: ISODate;
  updatedAt: ISODate;
}

// ---------- Referrals ----------
export interface ReferralCode {
  code: string;
  url: string;
}

export interface ReferralStats {
  totalReferred: number;
  activeReferred: number;
  earned: number;
  currency: Currency;
}

export interface ReferralEntry {
  id: ID;
  username: string;
  joinedAt: ISODate;
  status: "pending" | "active";
  reward: number;
}

// ---------- Articles ----------
export type ArticleCategory =
  | "magazine"
  | "release"
  | "spotlight"
  | "interview"
  | "opportunity";

export interface Article {
  id: ID;
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  author: string;
  readMinutes: number;
  publishedAt: ISODate;
  coverSeed: string;
  tags: string[];
}

// ---------- Community (MOTHERLand) ----------
export interface CommunityPost {
  id: ID;
  authorId: ID;
  authorName: string;
  body: string;
  createdAt: ISODate;
  likes: number;
  comments: number;
}

export interface CommunityEvent {
  id: ID;
  title: string;
  city: string;
  startsAt: ISODate;
  hostName: string;
}

// ---------- Notifications ----------
export type NotificationKind =
  | "system"
  | "release"
  | "order"
  | "community"
  | "opportunity"
  | "wallet";

export interface AppNotification {
  id: ID;
  kind: NotificationKind;
  title: string;
  body: string;
  read: boolean;
  createdAt: ISODate;
  href?: string;
}

// ---------- Settings ----------
export type ThemePreference = "system" | "light" | "dark";

export interface UserSettings {
  theme: ThemePreference;
  reducedMotion: boolean;
  notifications: {
    email: boolean;
    push: boolean;
    releases: boolean;
    opportunities: boolean;
    community: boolean;
  };
  privacy: {
    profileVisible: boolean;
    showListeningActivity: boolean;
  };
  language: string;
}
