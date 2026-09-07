import { createFileRoute } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { NetworkPage, EditorialSection } from "@/components/network/NetworkPage";
import { EmptyState, Button } from "@/components/radar";

export const Route = createFileRoute("/network/bookmarks")({
  head: () => ({
    meta: [
      { title: "Bookmarks — RADARNetwork" },
      { name: "description", content: "Everything you've saved from RADARNetwork." },
    ],
  }),
  component: BookmarksPage,
});

function BookmarksPage() {
  return (
    <NetworkPage
      eyebrow="Bookmarks"
      title="Saved for later."
      kicker="Articles, videos and playlists you've stashed while browsing RADARNetwork."
      icon={<Bookmark size={22} />}
    >
      <EditorialSection title="Your library">
        <EmptyState
          icon={<Bookmark size={22} />}
          title="Nothing saved yet"
          description="Tap the bookmark on any article, video or playlist to keep it here."
          action={<Button variant="secondary" size="sm">Browse magazine</Button>}
        />
      </EditorialSection>
    </NetworkPage>
  );
}