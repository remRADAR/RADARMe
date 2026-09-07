import { createFileRoute } from "@tanstack/react-router";
import { Newspaper } from "lucide-react";
import { NetworkPage, EditorialSection, Cover } from "@/components/network/NetworkPage";

export const Route = createFileRoute("/network/articles")({
  head: () => ({
    meta: [
      { title: "Release Articles — RADARNetwork" },
      { name: "description", content: "Album, EP and single release write-ups from RADARNetwork." },
    ],
  }),
  component: ReleaseArticlesPage,
});

const releases = [
  { artist: "Amaarae", title: "Fountain Baby II", type: "Album", date: "Jul 25" },
  { artist: "Odumodublvck", title: "Machine Gun Funk", type: "EP", date: "Jul 18" },
  { artist: "Rema", title: "Heavyweight", type: "Single", date: "Jul 12" },
  { artist: "Tems", title: "Free Fall", type: "EP", date: "Jul 05" },
  { artist: "Ayra Starr", title: "Sability II", type: "Single", date: "Jun 28" },
  { artist: "Sarz", title: "Solitude", type: "Album", date: "Jun 21" },
];

function ReleaseArticlesPage() {
  return (
    <NetworkPage
      eyebrow="Release RADAR"
      title="Every release, in context."
      kicker="Editorial write-ups on the drops shaping this week."
      icon={<Newspaper size={22} />}
    >
      <EditorialSection title="This week" hint="Six new releases covered">
        <div className="grid grid-cols-2 gap-3">
          {releases.map((r) => (
            <article
              key={r.title}
              className="overflow-hidden rounded-2xl bg-surface hairline glass-reflect"
            >
              <Cover seed={r.title} label={r.type} aspect="1/1" />
              <div className="p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{r.date}</p>
                <p className="mt-0.5 font-display text-[14px] font-semibold leading-tight">{r.title}</p>
                <p className="text-[12px] text-muted-foreground">{r.artist}</p>
              </div>
            </article>
          ))}
        </div>
      </EditorialSection>
    </NetworkPage>
  );
}