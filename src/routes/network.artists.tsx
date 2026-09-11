import { createFileRoute } from "@tanstack/react-router";
import { UserRound, BadgeCheck } from "lucide-react";
import { NetworkPage, EditorialSection, Cover } from "@/components/network/NetworkPage";

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
            <article
              key={a.name}
              className="overflow-hidden rounded-2xl bg-surface hairline glass-reflect"
            >
              <Cover seed={"artist-" + a.name} aspect="1/1" />
              <div className="p-3">
                <div className="flex items-center gap-1">
                  <p className="truncate font-display text-[14px] font-semibold">{a.name}</p>
                  {a.verified && <BadgeCheck size={12} className="shrink-0 text-gold" />}
                </div>
                <p className="truncate text-[11px] text-muted-foreground">{a.city}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{a.followers} listeners</p>
              </div>
            </article>
          ))}
        </div>
      </EditorialSection>
    </NetworkPage>
  );
}
