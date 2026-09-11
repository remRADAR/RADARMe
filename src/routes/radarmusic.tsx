import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Disc3, FileUp, ListMusic } from "lucide-react";

export const Route = createFileRoute("/radarmusic")({
  head: () => ({
    meta: [
      { title: "RADARMusic — RADARMe" },
      { name: "description", content: "The artist and release workspace inside RADARMe." },
    ],
  }),
  component: RADARMusicEntry,
});

function RADARMusicEntry() {
  return (
    <div className="min-h-[calc(100svh-1rem)] space-y-8 py-6 sm:py-10">
      <section className="glass relative flex min-h-[58svh] flex-col justify-end overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:p-14">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,color-mix(in_oklab,var(--gold)_22%,transparent),transparent_42%)]"
          aria-hidden
        />
        <Disc3 className="relative mb-auto text-gold" size={40} strokeWidth={1.5} aria-hidden />
        <div className="relative max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            Artist operating system
          </p>
          <h1 className="max-w-xl text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">
            Make the next move audible.
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
            Manage releases, submissions, and music intelligence from one focused workspace.
            External distribution remains in review until verified.
          </p>
        </div>
      </section>
      <section className="grid gap-3 sm:grid-cols-3">
        <MusicAction
          to="/hub/distribution"
          icon={<FileUp size={18} />}
          title="Submit a release"
          detail="Metadata, artwork, and tracks"
        />
        <MusicAction
          to="/network/artists"
          icon={<Disc3 size={18} />}
          title="Explore artists"
          detail="Discovery across the network"
        />
        <MusicAction
          to="/network/playlists"
          icon={<ListMusic size={18} />}
          title="Find playlists"
          detail="Curated listening routes"
        />
      </section>
    </div>
  );
}

function MusicAction({
  to,
  icon,
  title,
  detail,
}: {
  to: "/hub/distribution" | "/network/artists" | "/network/playlists";
  icon: React.ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <Link
      to={to}
      className="glass group flex items-center gap-3 rounded-2xl p-4 transition-colors hover:bg-white/10"
    >
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold text-gold-foreground">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold">{title}</span>
        <span className="block truncate text-xs text-muted-foreground">{detail}</span>
      </span>
      <ArrowUpRight
        size={16}
        className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </Link>
  );
}
