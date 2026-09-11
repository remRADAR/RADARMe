import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb, ArrowUpRight } from "lucide-react";
import { IntelPage } from "@/components/intelligence/IntelPage";

export const Route = createFileRoute("/intelligence/recommendations")({
  head: () => ({ meta: [{ title: "Recommendations — RADAR Intelligence" }] }),
  component: Recs,
});

const recs = [
  {
    title: "Pitch Afro RADAR this week",
    why: "Your Lagos listeners are up +38% — the curator is refreshing on Friday.",
    cta: "Open Playlist Pitch",
  },
  {
    title: "Drop a stripped acoustic cut",
    why: "TikTok momentum favours a follow-up within 21 days of release.",
    cta: "Plan release",
  },
  {
    title: "Book a marketing tier",
    why: "You have unused budget in Wallet and a strong single to amplify.",
    cta: "See tiers",
  },
  {
    title: "Reach out to 3 producers",
    why: "Your circle overlaps with P2J, Sarz and Kel-P.",
    cta: "Open Network",
  },
];

function Recs() {
  return (
    <IntelPage
      eyebrow="Recommendations"
      title="Four moves for this week."
      kicker="Ranked by expected impact on your career signals."
      icon={<Lightbulb size={22} />}
    >
      <div className="space-y-3">
        {recs.map((r) => (
          <article key={r.title} className="rounded-2xl bg-surface p-4 hairline glass-reflect">
            <p className="text-[10px] uppercase tracking-[0.22em] text-gold">Recommendation</p>
            <h3 className="mt-1 font-display text-[16px] font-semibold leading-tight">{r.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{r.why}</p>
            <button
              type="button"
              className="mt-3 inline-flex items-center gap-1 rounded-full bg-surface-2 px-3 py-1.5 text-[12px] font-medium hairline hover:bg-surface-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {r.cta} <ArrowUpRight size={12} />
            </button>
          </article>
        ))}
      </div>
    </IntelPage>
  );
}
