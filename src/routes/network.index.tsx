import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  Newspaper,
  Star,
  Compass,
  ListMusic,
  Tv,
  Film,
  Mic2,
  Bookmark,
  Search,
  UserRound,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { Cover, EditorialSection } from "@/components/network/NetworkPage";

export const Route = createFileRoute("/network/")({
  head: () => ({
    meta: [
      { title: "RADARNetwork — Media" },
      {
        name: "description",
        content:
          "The editorial home of RADARMe — magazine, spotlights, playlists, RADAR TV, interviews and artist profiles.",
      },
    ],
  }),
  component: NetworkHome,
});

type Sect = {
  to:
    | "/network/magazine"
    | "/network/articles"
    | "/network/spotlight"
    | "/network/discovery"
    | "/network/playlists"
    | "/network/tv"
    | "/network/videos"
    | "/network/interviews"
    | "/network/bookmarks"
    | "/network/search"
    | "/network/artists";
  label: string;
  icon: React.ReactNode;
};

const sections: Sect[] = [
  { to: "/network/magazine", label: "Magazine", icon: <BookOpen size={16} /> },
  { to: "/network/articles", label: "Release Articles", icon: <Newspaper size={16} /> },
  { to: "/network/spotlight", label: "Artist Spotlight", icon: <Star size={16} /> },
  { to: "/network/discovery", label: "Discovery", icon: <Compass size={16} /> },
  { to: "/network/playlists", label: "Playlists", icon: <ListMusic size={16} /> },
  { to: "/network/tv", label: "RADAR TV", icon: <Tv size={16} /> },
  { to: "/network/videos", label: "Video Library", icon: <Film size={16} /> },
  { to: "/network/interviews", label: "Interviews", icon: <Mic2 size={16} /> },
  { to: "/network/artists", label: "Artist Profiles", icon: <UserRound size={16} /> },
  { to: "/network/bookmarks", label: "Bookmarks", icon: <Bookmark size={16} /> },
  { to: "/network/search", label: "Search", icon: <Search size={16} /> },
];

function NetworkHome() {
  return (
    <div className="-mx-4 pb-6">
      <div className="relative overflow-hidden px-4 pb-6 pt-6">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-16 h-64 w-64 rounded-full opacity-60"
          style={{ background: "var(--gradient-radial-gold)" }}
        />
        <p className="relative text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          RADARNetwork · Issue 12
        </p>
        <h1 className="relative mt-2 font-display text-[34px] font-semibold leading-[1.02] tracking-tight sm:text-5xl">
          The stories
          <br />
          shaping the sound.
        </h1>
        <p className="relative mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Long-form journalism, artist spotlights, curated playlists and RADAR TV — the editorial
          ecosystem behind the artists on RADARMe.
        </p>
      </div>

      <div className="space-y-8 px-4">
        {/* Feature cover */}
        <Link
          to="/network/magazine"
          className="group relative block overflow-hidden rounded-3xl hairline glass-reflect"
        >
          <Cover seed="feature-issue-12" label="Cover Story" aspect="4/3" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
              Feature · 14 min read
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold leading-tight text-white">
              The artists rewriting the sound of the diaspora
            </h2>
            <p className="mt-1 line-clamp-2 text-[13px] text-white/80">
              From Lagos to São Paulo — a long-form portrait of 14 artists reshaping global music.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
              Read the issue <ArrowUpRight size={12} />
            </span>
          </div>
        </Link>

        <EditorialSection title="Sections" hint="The full RADARNetwork newsroom">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {sections.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="group flex items-center gap-2.5 rounded-2xl bg-surface p-3 hairline elev-1 glass-reflect transition-colors hover:bg-surface-2"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface-2 text-gold transition-colors group-hover:bg-gold group-hover:text-gold-foreground">
                  {s.icon}
                </span>
                <span className="min-w-0 flex-1 truncate text-xs font-medium">{s.label}</span>
                <ChevronRight size={14} className="text-muted-foreground" />
              </Link>
            ))}
          </div>
        </EditorialSection>

        <EditorialSection title="This week on RADAR TV">
          <div className="grid grid-cols-2 gap-3">
            {[
              "Live at ON THE RADAR",
              "In studio · Amaarae",
              "Tour diary · Kigali",
              "The Producer Room",
            ].map((t, i) => (
              <Link
                key={t}
                to="/network/tv"
                className="group block overflow-hidden rounded-2xl hairline glass-reflect"
              >
                <Cover seed={t} label={i === 0 ? "Live" : "Ep."} aspect="16/10" />
                <div className="p-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Episode {i + 1}
                  </p>
                  <p className="mt-0.5 line-clamp-2 font-display text-[13px] font-semibold leading-snug">
                    {t}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </EditorialSection>
      </div>
    </div>
  );
}
