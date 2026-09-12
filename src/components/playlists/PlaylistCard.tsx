import { ListMusic, Play } from "lucide-react";

export function PlaylistCard({
  name,
  tracks,
  curator,
}: {
  name: string;
  tracks: number;
  curator: string;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-surface glass-reflect">
      <div className="relative aspect-[16/10]">
        <img
          src="/media/radar-assets/playlist-lagos-live.jpg"
          alt={`${name} playlist cover`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] text-white/80">
          <ListMusic size={12} /> Curated route
        </span>
        <button
          type="button"
          className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white text-black shadow-lg"
          aria-label={`Play ${name}`}
        >
          <Play size={15} fill="currentColor" />
        </button>
      </div>
      <div className="p-3">
        <h3 className="font-display text-[14px] font-semibold leading-tight">{name}</h3>
        <p className="text-[11px] text-muted-foreground">
          {tracks} tracks · Curated by {curator}
        </p>
      </div>
    </article>
  );
}
