import { BadgeCheck, Headphones } from "lucide-react";

export function ArtistSpotlightCard({
  name,
  city,
  followers,
  verified = true,
}: {
  name: string;
  city: string;
  followers: string;
  verified?: boolean;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-sm">
      <div className="relative aspect-[4/5]">
        <img
          src="/media/radar-assets/artist-spotlight.jpg"
          alt={`${name} performing live`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
        <div className="absolute right-3 top-3 rounded-full border border-emerald-300/40 bg-emerald-500/20 px-2 py-1 text-[10px] font-mono text-emerald-200">
          RADAR 92
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-1">
            <h3 className="truncate text-sm font-semibold text-white">{name}</h3>
            {verified && <BadgeCheck size={13} className="shrink-0 text-gold" />}
          </div>
          <p className="text-[11px] text-white/65">
            {city} · {followers} listeners
          </p>
          <button
            type="button"
            className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-full bg-white/90 px-3 text-[11px] font-semibold text-black"
          >
            <Headphones size={13} /> Preview signal
          </button>
        </div>
      </div>
    </article>
  );
}
