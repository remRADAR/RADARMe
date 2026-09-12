import { createFileRoute } from "@tanstack/react-router";
import { ListMusic } from "lucide-react";
import { NetworkPage, EditorialSection } from "@/components/network/NetworkPage";
import { PlaylistCard } from "@/components/playlists/PlaylistCard";

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
  { name: "Afro RADAR", tracks: 42, curator: "REM" },
  { name: "Alté Universe", tracks: 60, curator: "Amara" },
  { name: "Late Night Studio", tracks: 33, curator: "Editorial" },
  { name: "Amapiano Weekly", tracks: 50, curator: "Bongi" },
  { name: "Diaspora Baseline", tracks: 48, curator: "Editorial" },
  { name: "Rising Voices", tracks: 27, curator: "REM" },
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
            <PlaylistCard key={l.name} name={l.name} tracks={l.tracks} curator={l.curator} />
          ))}
        </div>
      </EditorialSection>
    </NetworkPage>
  );
}
