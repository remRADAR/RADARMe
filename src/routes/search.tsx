import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Search as SearchIcon,
  UserRound,
  Music2,
  Newspaper,
  Briefcase,
  Users,
  ListMusic,
  Film,
  CalendarHeart,
  Compass,
} from "lucide-react";
import { Input } from "@/components/radar";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search — RADARMe" },
      {
        name: "description",
        content: "Search across your RADARMe universe — artists, insights, actions.",
      },
    ],
  }),
  component: SearchPage,
});

type Cat = {
  to:
    | "/network/artists"
    | "/network/discovery"
    | "/network/magazine"
    | "/hub"
    | "/motherland"
    | "/network/playlists"
    | "/network/videos"
    | "/motherland/events"
    | "/intelligence/opportunities";
  label: string;
  hint: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const CATEGORIES: Cat[] = [
  { to: "/network/artists",             label: "Artists",       hint: "Profiles & rosters",   icon: UserRound },
  { to: "/network/discovery",           label: "Songs",         hint: "New music",            icon: Music2 },
  { to: "/network/magazine",            label: "Articles",      hint: "Editorial & press",    icon: Newspaper },
  { to: "/hub",                          label: "Services",      hint: "RADARHub",             icon: Briefcase },
  { to: "/motherland",                  label: "Communities",   hint: "MOTHERLand",           icon: Users },
  { to: "/network/playlists",           label: "Playlists",     hint: "Official & curator",   icon: ListMusic },
  { to: "/network/videos",              label: "Videos",        hint: "RADAR TV & library",   icon: Film },
  { to: "/motherland/events",           label: "Events",        hint: "Live & meetups",       icon: CalendarHeart },
  { to: "/intelligence/opportunities",  label: "Opportunities", hint: "Briefs & sync",        icon: Compass },
];

function SearchPage() {
  const [q, setQ] = useState("");
  return (
    <div className="animate-page-in space-y-6 pt-2">
      <section className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
        <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Search</p>
        <h1 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">
          Find anything on RADARMe.
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Artists, songs, articles, services, communities, playlists, videos, events, opportunities.
        </p>
      </section>

      <Input
        leading={<SearchIcon size={16} className="text-muted-foreground" />}
        placeholder="Search across your RADARMe universe…"
        className="h-12 rounded-full"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search RADARMe"
      />

      <section className="space-y-3">
        <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Browse by category
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {CATEGORIES.map(({ to, label, hint, icon: Icon }) => (
            <Link
              key={label}
              to={to}
              className="group flex flex-col items-start gap-2 rounded-2xl bg-surface p-3 hairline elev-1 glass-reflect transition-transform active:scale-[0.97]"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-surface-2 text-gold transition-colors group-hover:bg-gold group-hover:text-gold-foreground">
                <Icon size={16} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[12px] font-semibold leading-tight">{label}</span>
                <span className="block truncate text-[10px] text-muted-foreground">{hint}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <p className="pt-4 text-center text-xs text-muted-foreground">
        {q ? `No live index yet — “${q}” will resolve when backend search lands.` : "Universal search index arrives with backend integration."}
      </p>
    </div>
  );
}