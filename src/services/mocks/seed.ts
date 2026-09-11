/**
 * Deterministic seed data shared by mock services.
 * Kept in one file so a single edit reshapes the whole placeholder universe.
 */
import type {
  AppNotification,
  Article,
  CommunityEvent,
  CommunityPost,
  Order,
  ReferralEntry,
  UserProfile,
  UserSettings,
  WalletTransaction,
} from "../types";

export const SEED_USER: UserProfile = {
  id: "user_local",
  username: "remartist",
  displayName: "REM Artist",
  handle: "@rem",
  bio: "Building the next chapter of my sound.",
  city: "Lagos",
  role: "artist",
  genres: ["Afro", "Alté"],
  createdAt: "2026-01-14T09:20:00.000Z",
  verified: true,
};

export const SEED_TRANSACTIONS: WalletTransaction[] = [
  {
    id: "tx_01",
    type: "credit",
    amount: 420.5,
    currency: "USD",
    description: "Streaming payout · Jun",
    createdAt: "2026-07-01T10:00:00.000Z",
  },
  {
    id: "tx_02",
    type: "debit",
    amount: 39.0,
    currency: "USD",
    description: "Distribution · Feather",
    createdAt: "2026-06-22T13:04:00.000Z",
  },
  {
    id: "tx_03",
    type: "credit",
    amount: 88.2,
    currency: "USD",
    description: "Sync placement · JP ad",
    createdAt: "2026-06-18T08:15:00.000Z",
  },
  {
    id: "tx_04",
    type: "payout",
    amount: 250.0,
    currency: "USD",
    description: "Withdraw to bank",
    createdAt: "2026-06-10T17:42:00.000Z",
  },
];

export const SEED_ORDERS: Order[] = [
  {
    id: "ord_01",
    service: "Distribution",
    tier: "Pro",
    status: "active",
    amount: 39,
    currency: "USD",
    createdAt: "2026-07-05T09:30:00.000Z",
    updatedAt: "2026-07-06T09:30:00.000Z",
  },
  {
    id: "ord_02",
    service: "Playlist Pitch",
    tier: "Boost",
    status: "in_review",
    amount: 99,
    currency: "USD",
    createdAt: "2026-07-02T11:12:00.000Z",
    updatedAt: "2026-07-04T11:12:00.000Z",
  },
  {
    id: "ord_03",
    service: "Editorial",
    tier: "Feature",
    status: "completed",
    amount: 249,
    currency: "USD",
    createdAt: "2026-06-14T18:00:00.000Z",
    updatedAt: "2026-06-20T18:00:00.000Z",
  },
];

export const SEED_REFERRALS: ReferralEntry[] = [
  {
    id: "ref_01",
    username: "amaka.wav",
    joinedAt: "2026-07-08T00:00:00.000Z",
    status: "active",
    reward: 10,
  },
  {
    id: "ref_02",
    username: "tunde.beats",
    joinedAt: "2026-06-30T00:00:00.000Z",
    status: "active",
    reward: 10,
  },
  {
    id: "ref_03",
    username: "sade.songs",
    joinedAt: "2026-06-27T00:00:00.000Z",
    status: "pending",
    reward: 0,
  },
];

export const SEED_ARTICLES: Article[] = [
  {
    id: "art_01",
    slug: "diaspora-sound",
    title: "The artists rewriting the sound of the diaspora",
    excerpt: "From Lagos to São Paulo — a long-form portrait of 14 artists.",
    category: "magazine",
    author: "Amara Okafor",
    readMinutes: 14,
    publishedAt: "2026-07-14T08:00:00.000Z",
    coverSeed: "cover-issue-12",
    tags: ["cover", "feature"],
  },
  {
    id: "art_02",
    slug: "amaarae-fountain",
    title: "Amaarae · Fountain Baby II",
    excerpt: "Album write-up: a second wave, sharper edges.",
    category: "release",
    author: "REM Desk",
    readMinutes: 6,
    publishedAt: "2026-07-25T12:00:00.000Z",
    coverSeed: "Amaarae",
    tags: ["album"],
  },
  {
    id: "art_03",
    slug: "yuki-tanabe-spot",
    title: "Spotlight · Yuki Tanabe",
    excerpt: "The Tokyo producer reshaping club music.",
    category: "spotlight",
    author: "REM Desk",
    readMinutes: 5,
    publishedAt: "2026-07-18T09:00:00.000Z",
    coverSeed: "Yuki Tanabe",
    tags: ["rising"],
  },
];

export const SEED_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "post_01",
    authorId: "u_amaka",
    authorName: "Amaka",
    body: "Rehearsal room energy today — new song incoming.",
    createdAt: "2026-07-20T18:44:00.000Z",
    likes: 42,
    comments: 6,
  },
  {
    id: "post_02",
    authorId: "u_tolu",
    authorName: "Tolu",
    body: "Anyone based in Accra open to a co-write next week?",
    createdAt: "2026-07-20T14:03:00.000Z",
    likes: 18,
    comments: 11,
  },
  {
    id: "post_03",
    authorId: "u_deela",
    authorName: "Deela",
    body: "Mixed my EP on headphones only. Do not recommend.",
    createdAt: "2026-07-19T22:11:00.000Z",
    likes: 91,
    comments: 22,
  },
];

export const SEED_EVENTS: CommunityEvent[] = [
  {
    id: "evt_01",
    title: "MOTHERLand · Open Studio",
    city: "Lagos",
    startsAt: "2026-08-02T18:00:00.000Z",
    hostName: "REM",
  },
  {
    id: "evt_02",
    title: "Songwriter Circle",
    city: "London",
    startsAt: "2026-08-09T19:30:00.000Z",
    hostName: "Ojerime",
  },
];

export const SEED_NOTIFICATIONS: AppNotification[] = [
  {
    id: "ntf_01",
    kind: "release",
    title: "Your release is live",
    body: "'Feather' is now on 42 platforms.",
    read: false,
    createdAt: "2026-07-20T09:14:00.000Z",
    href: "/hub/distribution",
  },
  {
    id: "ntf_02",
    kind: "order",
    title: "Order in review",
    body: "Playlist Pitch · Boost is under review.",
    read: false,
    createdAt: "2026-07-19T12:02:00.000Z",
    href: "/hub/orders",
  },
  {
    id: "ntf_03",
    kind: "wallet",
    title: "Payout received",
    body: "$420.50 credited to your wallet.",
    read: true,
    createdAt: "2026-07-15T08:00:00.000Z",
    href: "/hub/wallet",
  },
  {
    id: "ntf_04",
    kind: "opportunity",
    title: "New sync brief · Nike SS27",
    body: "Uptempo, Afro-electronic, 90s.",
    read: true,
    createdAt: "2026-07-10T10:45:00.000Z",
  },
];

export const SEED_SETTINGS: UserSettings = {
  theme: "dark",
  reducedMotion: false,
  notifications: { email: true, push: true, releases: true, opportunities: true, community: false },
  privacy: { profileVisible: true, showListeningActivity: false },
  language: "en",
};
