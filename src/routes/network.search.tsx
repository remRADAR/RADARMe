import { createFileRoute } from "@tanstack/react-router";
import { Search as SearchIcon } from "lucide-react";
import { NetworkPage, EditorialSection } from "@/components/network/NetworkPage";
import { Input } from "@/components/radar";

export const Route = createFileRoute("/network/search")({
  head: () => ({
    meta: [
      { title: "Search — RADARNetwork" },
      { name: "description", content: "Search articles, videos, playlists and artist profiles across RADARNetwork." },
    ],
  }),
  component: NetworkSearchPage,
});

const trending = ["Amaarae", "Amapiano", "Sync deals", "Tour diary", "Odumodublvck", "Producer picks"];
const categories = ["Articles", "Videos", "Playlists", "Artists", "Interviews"];

function NetworkSearchPage() {
  return (
    <NetworkPage
      eyebrow="Search"
      title="Find anything on RADAR."
      kicker="Search across articles, videos, playlists and artist profiles."
      icon={<SearchIcon size={22} />}
    >
      <Input
        leading={<SearchIcon size={16} className="text-muted-foreground" />}
        placeholder="Search RADARNetwork…"
      />

      <EditorialSection title="Trending">
        <div className="flex flex-wrap gap-2">
          {trending.map((t) => (
            <span key={t} className="rounded-full bg-surface px-3 py-1.5 text-[12px] hairline">
              {t}
            </span>
          ))}
        </div>
      </EditorialSection>

      <EditorialSection title="Browse by">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {categories.map((c) => (
            <div
              key={c}
              className="rounded-2xl bg-surface p-4 text-sm font-medium hairline glass-reflect"
            >
              {c}
            </div>
          ))}
        </div>
      </EditorialSection>
    </NetworkPage>
  );
}