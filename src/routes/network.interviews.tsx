import { createFileRoute } from "@tanstack/react-router";
import { Mic2, Quote } from "lucide-react";
import { NetworkPage, EditorialSection, Cover } from "@/components/network/NetworkPage";

export const Route = createFileRoute("/network/interviews")({
  head: () => ({
    meta: [
      { title: "Interviews — RADARNetwork" },
      { name: "description", content: "In-depth interviews with the artists shaping culture." },
    ],
  }),
  component: InterviewsPage,
});

const talks = [
  { guest: "Amaarae",     quote: "I write in three languages, but I dream in one sound.", dur: "42 min" },
  { guest: "Odumodublvck", quote: "I'm not chasing the wave. I built the wave.",           dur: "38 min" },
  { guest: "Tems",         quote: "Silence is a song too.",                                dur: "51 min" },
  { guest: "Rema",         quote: "I built a genre before I built a fanbase.",             dur: "45 min" },
];

function InterviewsPage() {
  return (
    <NetworkPage
      eyebrow="TALK TO US"
      title="In their own words."
      kicker="Long-form conversations with the artists, producers and executives moving music forward."
      icon={<Mic2 size={22} />}
    >
      <EditorialSection title="Featured conversations">
        <div className="space-y-4">
          {talks.map((t) => (
            <article key={t.guest} className="overflow-hidden rounded-2xl bg-surface hairline glass-reflect">
              <Cover seed={"interview-" + t.guest} aspect="21/9" label={`${t.dur}`} />
              <div className="p-4">
                <p className="text-[10px] uppercase tracking-[0.24em] text-gold">In conversation with</p>
                <h3 className="font-display text-lg font-semibold">{t.guest}</h3>
                <p className="mt-2 flex gap-2 text-[13px] italic leading-relaxed text-muted-foreground">
                  <Quote size={14} className="mt-0.5 shrink-0 text-gold" />
                  "{t.quote}"
                </p>
              </div>
            </article>
          ))}
        </div>
      </EditorialSection>
    </NetworkPage>
  );
}