/**
 * Articles service — placeholder.
 * Backend swap target: Supabase `articles` table (public read policy) + CMS.
 */
import { delay } from "./http";
import { SEED_ARTICLES } from "./mocks/seed";
import type { Article, ArticleCategory } from "./types";

const articles: Article[] = [...SEED_ARTICLES];

export const articlesService = {
  async list(opts?: { category?: ArticleCategory; limit?: number }): Promise<Article[]> {
    let out = [...articles];
    if (opts?.category) out = out.filter((a) => a.category === opts.category);
    out.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
    if (opts?.limit) out = out.slice(0, opts.limit);
    return delay(out);
  },

  async getBySlug(slug: string): Promise<Article | null> {
    return delay(articles.find((a) => a.slug === slug) ?? null);
  },

  async search(query: string): Promise<Article[]> {
    const q = query.trim().toLowerCase();
    if (!q) return delay([]);
    return delay(
      articles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)),
      ),
    );
  },
};

export type ArticlesService = typeof articlesService;
