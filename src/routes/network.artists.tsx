import { createFileRoute } from "@tanstack/react-router";
import { UserRound } from "lucide-react";
import { NetworkPage, EditorialSection } from "@/components/network/NetworkPage";
import { ArtistSpotlightCard } from "@/components/network/ArtistSpotlightCard";

export const Route = createFileRoute("/network/artists")({
  head: () => ({
    meta: [
      { title: "Artist Profiles — RADARNetwork" },
      { name: "description", content: "Editorial artist profiles from RADARNetwork." },
    ],
  }),
  component: ArtistProfiles,
});

const artists = [
  { name: "Amaarae", city: "Accra · Atlanta", followers: "482K", verified: true },
  { name: "Odumodublvck", city: "Abuja", followers: "610K", verified: true },
  { name: "Yuki Tanabe", city: "Tokyo", followers: "39K", verified: false },
  { name: "PinkPantheress", city: "London", followers: "2.4M", verified: true },
  { name: "Mereba", city: "Atlanta", followers: "180K", verified: true },
  { name: "Cruel Santino", city: "Lagos", followers: "410K", verified: true },
];

function ArtistProfiles() {
  return (
    <NetworkPage
      eyebrow="Artist Profiles"
      title="Every artist. Every angle."
      kicker="Editorial pages for the artists on RADAR — bio, discography, press and links."
      icon={<UserRound size={22} />}
    >
      <EditorialSection title="On RADAR">
        <div className="grid grid-cols-2 gap-3">
          {artists.map((a) => (
            <ArtistSpotlightCard
              key={a.name}
              name={a.name}
              city={a.city}
              followers={a.followers}
              verified={a.verified}
            />
          ))}
        </div>
      </EditorialSection>
    </NetworkPage>
  );
}
