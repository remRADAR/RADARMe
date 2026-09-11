import { createFileRoute } from "@tanstack/react-router";
import { Compass } from "lucide-react";
import { NetworkPage, EditorialSection, Cover } from "@/components/network/NetworkPage";

export const Route = createFileRoute("/network/discovery")({
  head: () => ({
    meta: [
      { title: "Music Discovery — RADARNetwork" },
      { name: "description", content: "Discover new artists and sounds curated by RADARNetwork." },
    ],
  }),
  component: DiscoveryPage,
});

const rails = [
  { title: "Rising this week", items: ["Amaka", "Kojey Radical", "Ravyn Lenae", "Berwyn"] },
  { title: "From MOTHERLand", items: ["Ojerime", "Tolu Obanro", "Miloe", "Deela"] },
  { title: "Producer picks", items: ["P2J", "Sarz", "Kel-P", "Tay Iwar"] },
];

function DiscoveryPage() {
  return (
    <NetworkPage
      eyebrow="Music Discovery"
      title="Sounds you haven't found yet."
      kicker="A rotating cross-section of the RADARNetwork universe, curated by our editors."
      icon={<Compass size={22} />}
    >
      {rails.map((rail) => (
        <EditorialSection key={rail.title} title={rail.title}>
          <div className="-mx-4 overflow-x-auto px-4 [-webkit-overflow-scrolling:touch]">
            <div className="flex gap-3 pb-2">
              {rail.items.map((name) => (
                <div key={name} className="w-40 shrink-0">
                  <div className="overflow-hidden rounded-2xl hairline glass-reflect">
                    <Cover seed={name} aspect="1/1" />
                  </div>
                  <p className="mt-2 truncate text-[13px] font-medium">{name}</p>
                  <p className="truncate text-[11px] text-muted-foreground">Artist</p>
                </div>
              ))}
            </div>
          </div>
        </EditorialSection>
      ))}
    </NetworkPage>
  );
}
