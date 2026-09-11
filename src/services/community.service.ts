/**
 * Community service (MOTHERLand) — placeholder.
 * Backend swap target: Supabase `posts`, `events`, realtime channels.
 */
import { delay, makeId, nowIso, ServiceError } from "./http";
import { SEED_COMMUNITY_POSTS, SEED_EVENTS } from "./mocks/seed";
import type { CommunityEvent, CommunityPost, ID } from "./types";

const posts: CommunityPost[] = [...SEED_COMMUNITY_POSTS];
const events: CommunityEvent[] = [...SEED_EVENTS];

export const communityService = {
  async listPosts(): Promise<CommunityPost[]> {
    return delay([...posts].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)));
  },

  async createPost(input: {
    authorId: ID;
    authorName: string;
    body: string;
  }): Promise<CommunityPost> {
    if (!input.body.trim()) throw new ServiceError("Post body required", "COMMUNITY_EMPTY");
    const post: CommunityPost = {
      id: makeId("post"),
      authorId: input.authorId,
      authorName: input.authorName,
      body: input.body.trim(),
      createdAt: nowIso(),
      likes: 0,
      comments: 0,
    };
    posts.unshift(post);
    return delay(post);
  },

  async likePost(id: ID): Promise<CommunityPost> {
    const idx = posts.findIndex((p) => p.id === id);
    if (idx === -1) throw new ServiceError("Post not found", "COMMUNITY_NOT_FOUND");
    posts[idx] = { ...posts[idx], likes: posts[idx].likes + 1 };
    return delay(posts[idx]);
  },

  async listEvents(): Promise<CommunityEvent[]> {
    return delay([...events].sort((a, b) => (a.startsAt < b.startsAt ? -1 : 1)));
  },
};

export type CommunityService = typeof communityService;
