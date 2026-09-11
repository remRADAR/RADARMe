import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BookOpen,
  Disc3,
  ListMusic,
  Mic2,
  MapPin,
  CalendarHeart,
  Star,
  MessageSquareQuote,
  FolderKanban,
  Megaphone,
  Briefcase,
  Sparkles,
  Radio,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

/**
 * AnnouncementRibbon — a glass "digital display" that surfaces live signals
 * from across the RADARCharts ecosystem. Cross-fade + slide transitions,
 * auto-rotates, and supports manual swipe / arrow navigation.
 */

type Category =
  | "magazine"
  | "release"
  | "playlist"
  | "concert"
  | "tours"
  | "events"
  | "spotlight"
  | "interview"
  | "projects"
  | "community"
  | "opportunity"
  | "campaign";

type Announcement = {
  id: string;
  category: Category;
  label: string;
  title: string;
  description: string;
  thumbnail?: string;
  to: string;
  cta?: string;
};

const CATEGORY_META: Record<
  Category,
  { label: string; icon: React.ComponentType<{ size?: number }>; accent: string; tint: string }
> = {
  magazine: {
    label: "RADAR Magazine",
    icon: BookOpen,
    accent: "oklch(0.78 0.13 85)",
    tint: "oklch(0.78 0.13 85 / 0.16)",
  },
  release: {
    label: "Release RADAR",
    icon: Disc3,
    accent: "oklch(0.82 0.10 150)",
    tint: "oklch(0.82 0.10 150 / 0.14)",
  },
  playlist: {
    label: "Official Playlists",
    icon: ListMusic,
    accent: "oklch(0.80 0.12 200)",
    tint: "oklch(0.80 0.12 200 / 0.14)",
  },
  concert: {
    label: "ON THE RADAR",
    icon: Mic2,
    accent: "oklch(0.78 0.16 20)",
    tint: "oklch(0.78 0.16 20 / 0.14)",
  },
  tours: {
    label: "Tours",
    icon: MapPin,
    accent: "oklch(0.78 0.12 60)",
    tint: "oklch(0.78 0.12 60 / 0.14)",
  },
  events: {
    label: "Events",
    icon: CalendarHeart,
    accent: "oklch(0.80 0.11 320)",
    tint: "oklch(0.80 0.11 320 / 0.14)",
  },
  spotlight: {
    label: "Artist Spotlight",
    icon: Star,
    accent: "oklch(0.86 0.10 90)",
    tint: "oklch(0.86 0.10 90 / 0.16)",
  },
  interview: {
    label: "TALK TO US",
    icon: MessageSquareQuote,
    accent: "oklch(0.78 0.10 260)",
    tint: "oklch(0.78 0.10 260 / 0.14)",
  },
  projects: {
    label: "RADARProjects",
    icon: FolderKanban,
    accent: "oklch(0.78 0.10 170)",
    tint: "oklch(0.78 0.10 170 / 0.14)",
  },
  community: {
    label: "Community",
    icon: Megaphone,
    accent: "oklch(0.82 0.09 25)",
    tint: "oklch(0.82 0.09 25 / 0.14)",
  },
  opportunity: {
    label: "Opportunity",
    icon: Briefcase,
    accent: "oklch(0.80 0.11 130)",
    tint: "oklch(0.80 0.11 130 / 0.14)",
  },
  campaign: {
    label: "Featured Campaign",
    icon: Sparkles,
    accent: "oklch(0.78 0.13 85)",
    tint: "oklch(0.78 0.13 85 / 0.16)",
  },
};

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "a1",
    category: "magazine",
    label: "Issue 12 · The Global South",
    title: "The artists rewriting the sound of the diaspora",
    description: "A long-form feature on 14 artists shaping culture from Lagos to São Paulo.",
    to: "/motherland/feed",
    cta: "Read",
  },
  {
    id: "a2",
    category: "release",
    label: "New this Friday",
    title: "Release RADAR · Week 29",
    description: "17 fresh drops from independent artists on RADARCharts. Curated by REM.",
    to: "/hub/distribution",
  },
  {
    id: "a3",
    category: "playlist",
    label: "Editorial",
    title: "Afro RADAR — refreshed today",
    description: "New adds from Amaarae, Odumodublvck, and 6 rising names to watch.",
    to: "/hub/playlist-pitch",
  },
  {
    id: "a4",
    category: "concert",
    label: "Live Show · Lagos",
    title: "ON THE RADAR Concert — Aug 24",
    description: "Eight artists. One night. Early access opens for RADARMe members.",
    to: "/motherland/events",
    cta: "Get access",
  },
  {
    id: "a5",
    category: "tours",
    label: "World Tour",
    title: "REM presents · 6-city African tour",
    description: "Accra, Lagos, Nairobi, Kigali, Johannesburg, Cape Town. Autumn 2026.",
    to: "/motherland/events",
  },
  {
    id: "a6",
    category: "events",
    label: "Listening Room",
    title: "MOTHERLand Live · Songwriter Circle",
    description: "Thursday, 19:00 GMT. Bring one verse. Leave with three collaborators.",
    to: "/motherland/events",
  },
  {
    id: "a7",
    category: "spotlight",
    label: "This week",
    title: "Spotlight · Yuki Tanabe",
    description: "The Tokyo-based DJ reshaping club music with West African rhythm.",
    to: "/motherland/recognition",
  },
  {
    id: "a8",
    category: "interview",
    label: "TALK TO US",
    title: "In conversation with Amaarae",
    description: "On writing across three languages, and building a sound with no border.",
    to: "/hub/editorial",
    cta: "Watch",
  },
  {
    id: "a9",
    category: "projects",
    label: "Open call",
    title: "RADARProjects · Producer residency",
    description: "12 producers. 4 weeks. Full studio, mentorship and a release plan.",
    to: "/hub/career-planner",
    cta: "Apply",
  },
  {
    id: "a10",
    category: "community",
    label: "Community",
    title: "1,204 new members joined RADARNetwork this week",
    description: "Introduce yourself in the lounge and find collaborators near you.",
    to: "/network",
  },
  {
    id: "a11",
    category: "opportunity",
    label: "Industry",
    title: "Sync opportunity · Feature film soundtrack",
    description: "A24-adjacent studio is scouting 3 songs for a Q1 2027 release.",
    to: "/hub/marketing",
    cta: "Submit",
  },
  {
    id: "a12",
    category: "campaign",
    label: "Featured",
    title: "Momentum Q3 · double reach on your next single",
    description: "For a limited window, RADARHub Marketing tiers include bonus placements.",
    to: "/hub/marketing",
  },
];

const ROTATE_MS = 6000;

export function AnnouncementRibbon({ items = ANNOUNCEMENTS }: { items?: Announcement[] }) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStart = useRef<number | null>(null);

  const count = items.length;

  const go = useCallback(
    (next: number, direction: 1 | -1) => {
      if (count === 0) return;
      setDir(direction);
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const next = useCallback(() => go(index + 1, 1), [go, index]);
  const prev = useCallback(() => go(index - 1, -1), [go, index]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (count > 0 && index >= count) setIndex(0);
  }, [count, index]);

  useEffect(() => {
    if (paused || reducedMotion || count <= 1) return;
    const t = setTimeout(next, ROTATE_MS);
    return () => clearTimeout(t);
  }, [index, paused, reducedMotion, count, next]);

  if (count === 0) {
    return (
      <section aria-label="RADAR announcements" className="relative">
        <div
          className="relative overflow-hidden rounded-[28px] p-5"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--surface) 55%, transparent), color-mix(in oklab, var(--surface) 15%, transparent))",
            backdropFilter: "blur(24px) saturate(140%)",
            border: "1px solid oklch(1 0 0 / 0.05)",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-surface-2 text-gold">
              <Radio size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-semibold">The radar is quiet.</p>
              <p className="text-[12px] text-muted-foreground">
                Explore RADARNetwork to see what your circle is doing.
              </p>
            </div>
            <Link
              to="/network"
              className="inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1.5 text-[12px] font-medium text-gold-foreground"
            >
              Open <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const current = items[index];
  const meta = CATEGORY_META[current.category];
  const Icon = meta.icon;

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) next();
    else prev();
  };

  const activate = () => {
    navigate({ to: current.to as never });
  };

  return (
    <section
      aria-label="RADAR ecosystem announcements"
      aria-roledescription="carousel"
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div
        className="relative overflow-hidden rounded-[28px]"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--surface) 55%, transparent), color-mix(in oklab, var(--surface) 15%, transparent))",
          backdropFilter: "blur(24px) saturate(140%)",
          border: "1px solid oklch(1 0 0 / 0.05)",
          boxShadow: "0 20px 40px -24px oklch(0 0 0 / 0.55)",
        }}
      >
        {/* Category accent wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full blur-3xl transition-colors duration-700"
          style={{
            background: `radial-gradient(60% 60% at 50% 50%, ${meta.tint}, transparent 70%)`,
          }}
          key={current.category + "-wash"}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${meta.accent}55, transparent)`,
          }}
        />

        {/* Header */}
        <div className="relative flex items-center justify-between px-4 pt-3">
          <div className="flex items-center gap-1.5">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: meta.accent, boxShadow: `0 0 8px ${meta.accent}` }}
            />
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Live on RADAR
            </span>
          </div>
          <div className="flex items-center gap-1">
            {items.map((it, i) => (
              <button
                key={it.id}
                type="button"
                aria-label={`Show announcement ${i + 1} of ${count}`}
                aria-current={i === index}
                onClick={() => go(i, i > index ? 1 : -1)}
                className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span
                  aria-hidden
                  className="block h-1.5 rounded-full transition-[width,background-color]"
                  style={{
                    width: i === index ? 14 : 5,
                    background:
                      i === index
                        ? meta.accent
                        : "color-mix(in oklab, var(--foreground) 20%, transparent)",
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Slide */}
        <div
          className="relative"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="group"
          aria-roledescription="slide"
          aria-label={`${meta.label}: ${current.title}`}
        >
          <button
            type="button"
            onClick={activate}
            className="group block w-full px-4 pb-4 pt-3 text-left"
          >
            <div
              key={current.id}
              className="flex items-center gap-3 animate-ribbon-in"
              style={{ ["--ribbon-dir" as never]: dir === 1 ? "16px" : "-16px" }}
            >
              {/* Thumbnail */}
              <div
                aria-hidden
                className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl"
                style={{
                  background: `linear-gradient(140deg, ${meta.tint}, color-mix(in oklab, var(--surface-2) 60%, transparent))`,
                  border: `1px solid ${meta.accent}22`,
                }}
              >
                <span
                  className="absolute inset-0 opacity-40"
                  style={{
                    background: `radial-gradient(80% 80% at 30% 20%, ${meta.tint}, transparent 70%)`,
                  }}
                />
                <span
                  className="relative grid h-8 w-8 place-items-center rounded-xl"
                  style={{ background: `${meta.accent}22`, color: meta.accent }}
                >
                  <Icon size={16} />
                </span>
              </div>

              {/* Body */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]"
                    style={{ background: meta.tint, color: meta.accent }}
                  >
                    {meta.label}
                  </span>
                  <span className="truncate text-[10px] text-muted-foreground">
                    · {current.label}
                  </span>
                </div>
                <p className="mt-1 line-clamp-1 font-display text-[14px] font-semibold leading-tight">
                  {current.title}
                </p>
                <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-muted-foreground">
                  {current.description}
                </p>
              </div>

              {/* CTA */}
              <span
                className="inline-flex shrink-0 items-center gap-1 self-center rounded-full px-2.5 py-1.5 text-[11px] font-medium transition-transform group-active:scale-95"
                style={{
                  background: `${meta.accent}18`,
                  color: meta.accent,
                  border: `1px solid ${meta.accent}33`,
                }}
              >
                {current.cta ?? "Open"} <ArrowUpRight size={12} />
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
