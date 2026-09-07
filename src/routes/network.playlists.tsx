import { createFileRoute } from "@tanstack/react-router";
import { ListMusic } from "lucide-react";
import { NetworkPage, EditorialSection, Cover } from "@/components/network/NetworkPage";

export const Route = createFileRoute("/network/playlists")({
  head: () => ({
    meta: [
      { title: "Playlists — RADARNetwork" },
      { name: "description", content: "Editorial playlists curated by RADARNetwork." },
    ],
  }),
  component: PlaylistsPage,
});

const lists = [
  { name: "Afro RADAR",         tracks: 42, curator: "REM" },
  { name: "Alté Universe",      tracks: 60, curator: "Amara" },
  { name: "Late Night Studio",  tracks: 33, curator: "Editorial" },
  { name: "Amapiano Weekly",    tracks: 50, curator: "Bongi" },
  { name: "Diaspora Baseline",  tracks: 48, curator: "Editorial" },
  { name: "Rising Voices",      tracks: 27, curator: "REM" },
];

function PlaylistsPage() {
  return (
    <NetworkPage
      eyebrow="Official Playlists"
      title="Curated by RADARNetwork."
      kicker="Editorial playlists refreshed weekly — not algorithm-driven."
      icon={<ListMusic size={22} />}
    >
      <EditorialSection title="Editorial picks">
        <div className="grid grid-cols-2 gap-3">
          {lists.map((l) => (
            <article key={l.name} className="overflow-hidden rounded-2xl bg-surface hairline glass-reflect">
              <Cover seed={l.name} aspect="1/1" />
              <div className="p-3">
                <p className="font-display text-[14px] font-semibold leading-tight">{l.name}</p>
                <p className="text-[11px] text-muted-foreground">
                  {l.tracks} tracks · Curated by {l.curator}
                </p>
              </div>
            </article>
          ))}
        </div>
      </EditorialSection>
    </NetworkPage>
  );
}