import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, MapPin } from "lucide-react";
import { IntelPage } from "@/components/intelligence/IntelPage";

export const Route = createFileRoute("/intelligence/opportunities")({
  head: () => ({ meta: [{ title: "Opportunity Centre — RADAR Intelligence" }] }),
  component: Opportunities,
});

const opps = [
  { title: "Sync brief · A24-adjacent studio", loc: "Remote", deadline: "Aug 3", fit: "92%" },
  { title: "Support slot · ON THE RADAR Concert", loc: "Lagos, NG", deadline: "Aug 8", fit: "88%" },
  { title: "Producer residency · RADARProjects", loc: "Accra, GH", deadline: "Sep 1", fit: "84%" },
  { title: "Brand partnership · Global sportswear", loc: "Remote", deadline: "Aug 20", fit: "78%" },
];

function Opportunities() {
  return (
    <IntelPage
      eyebrow="Opportunity Centre"
      title="Curated for where you are now."
      kicker="Open matches from the RADARCharts network — ranked by fit."
      icon={<Briefcase size={22} />}
    >
      <div className="space-y-3">
        {opps.map((o) => (
          <article key={o.title} className="rounded-2xl bg-surface p-4 hairline glass-reflect">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.22em] text-gold">Fit {o.fit}</p>
                <p className="mt-1 line-clamp-2 font-display text-[15px] font-semibold leading-tight">
                  {o.title}
                </p>
                <p className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={11} /> {o.loc}
                  </span>
                  <span>· by {o.deadline}</span>
                </p>
              </div>
              <button
                type="button"
                className="shrink-0 rounded-full bg-gold px-3 py-1.5 text-[12px] font-semibold text-gold-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Apply
              </button>
            </div>
          </article>
        ))}
      </div>
    </IntelPage>
  );
}
