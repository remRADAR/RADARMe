import { Disc3, UploadCloud } from "lucide-react";

export function ReleaseCard({
  title = "New release",
  artist = "Untitled artist",
  status = "Draft",
}: {
  title?: string;
  artist?: string;
  status?: string;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40 shadow-xl backdrop-blur-sm">
      <div className="relative aspect-square">
        <img
          src="/media/radar-assets/release-vinyl.jpg"
          alt="Vinyl sleeve artwork placeholder"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <span className="absolute right-3 top-3 rounded-full border border-amber-300/30 bg-black/50 px-2 py-1 text-[10px] font-mono text-amber-200">
          {status}
        </span>
      </div>
      <div className="flex items-center gap-3 p-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-gold-foreground">
          <Disc3 size={16} />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold">{title}</h3>
          <p className="truncate text-[11px] text-muted-foreground">
            {artist} · artwork ready to replace
          </p>
        </div>
        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-muted-foreground hover:bg-white/20"
          aria-label="Upload release artwork"
        >
          <UploadCloud size={15} />
        </button>
      </div>
    </article>
  );
}
