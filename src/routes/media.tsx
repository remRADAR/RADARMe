import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen, Play, Search, Sparkles } from "lucide-react";

export const Route = createFileRoute("/media")({
  head: () => ({
    meta: [
      { title: "Media — RADARMe" },
      { name: "description", content: "The RADAR editorial and media ecosystem." },
    ],
  }),
  component: Media,
});

function Media() {
  return (
    <div className="min-h-[calc(100svh-1rem)] space-y-8 py-6 sm:py-10">
      <section className="glass relative flex min-h-[48svh] flex-col justify-end overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:p-14">
        <Sparkles className="relative mb-auto text-gold" size={40} strokeWidth={1.5} aria-hidden />
        <div className="relative max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            RADAR editorial
          </p>
          <h1 className="max-w-xl text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">
            Stay close to the signal.
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
            Magazine, articles, interviews, playlists, video, and discovery continue through the
            RADARNetwork architecture while the public naming moves to Media.
          </p>
        </div>
      </section>
      <div className="grid gap-3 sm:grid-cols-3">
        <MediaAction
          to="/network/magazine"
          icon={<BookOpen size={18} />}
          title="Magazine"
          detail="Long-form culture and ideas"
        />
        <MediaAction
          to="/network/tv"
          icon={<Play size={18} />}
          title="RADAR TV"
          detail="Video and visual stories"
        />
        <MediaAction
          to="/network/discovery"
          icon={<Search size={18} />}
          title="Discovery"
          detail="Artists, playlists, and more"
        />
      </div>
    </div>
  );
}

function MediaAction({
  to,
  icon,
  title,
  detail,
}: {
  to: "/network/magazine" | "/network/tv" | "/network/discovery";
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
