import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { NetworkPage, EditorialSection, Cover } from "@/components/network/NetworkPage";

export const Route = createFileRoute("/network/spotlight")({
  head: () => ({
    meta: [
      { title: "Artist Spotlight — RADARNetwork" },
      { name: "description", content: "Weekly artist spotlights from RADARNetwork." },
    ],
  }),
  component: SpotlightPage,
});

const spotlights = [
  { name: "Yuki Tanabe", city: "Tokyo", tag: "This week" },
  { name: "Mereba", city: "Atlanta", tag: "Last week" },
  { name: "Cruel Santino", city: "Lagos", tag: "Featured" },
  { name: "PinkPantheress", city: "London", tag: "Featured" },
];

function SpotlightPage() {
  return (
    <NetworkPage
      eyebrow="Artist Spotlight"
      title="One artist. One story. Every week."
      kicker="A rotating focus on the artists shaping culture right now."
      icon={<Star size={22} />}
    >
      <EditorialSection title="Featured artists">
        <div className="space-y-4">
          {spotlights.map((s) => (
            <article
              key={s.name}
              className="overflow-hidden rounded-2xl bg-surface hairline glass-reflect"
            >
              <Cover seed={s.name} label={s.tag} aspect="16/10" />
              <div className="p-4">
                <h3 className="font-display text-lg font-semibold">{s.name}</h3>
                <p className="text-[12px] text-muted-foreground">Based in {s.city}</p>
                <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-muted-foreground">
                  The producer reshaping club music with West African rhythm, one 128 BPM loop at a time.
                </p>
              </div>
            </article>
          ))}
        </div>
      </EditorialSection>
    </NetworkPage>
  );
}