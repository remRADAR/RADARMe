export function ArticleHeroBanner({
  eyebrow = "Cover story",
  title,
  byline,
}: {
  eyebrow?: string;
  title: string;
  byline: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] glass-reflect">
      <img
        src="/media/radar-assets/magazine-interview.jpg"
        alt="Artist interview in a recording studio"
        className="aspect-[16/9] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
        <p className="text-[10px] uppercase tracking-[0.24em] text-gold">{eyebrow}</p>
        <h2 className="mt-1 max-w-2xl font-display text-xl font-semibold leading-tight text-white sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-[11px] uppercase tracking-[0.15em] text-white/65">{byline}</p>
      </div>
    </div>
  );
}
