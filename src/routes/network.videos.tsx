import { createFileRoute } from "@tanstack/react-router";
import { Film, Play } from "lucide-react";
import { NetworkPage, EditorialSection, Cover } from "@/components/network/NetworkPage";

export const Route = createFileRoute("/network/videos")({
  head: () => ({
    meta: [
      { title: "Video Library — RADARNetwork" },
      { name: "description", content: "The full RADARNetwork video library — visualizers, live cuts and behind-the-scenes." },
    ],
  }),
  component: VideoLibrary,
});

const filters = ["All", "Music Videos", "Live", "Visualizers", "Docs", "Shorts"];
const videos = Array.from({ length: 9 }, (_, i) => ({
  title: [
    "Feather · Official Video",
    "Live at ON THE RADAR",
    "Studio Session · Tems",
    "Visualizer · Sability II",
    "Tour Doc · Accra",
    "Rehearsal Room · Sarz",
    "Behind the Scenes",
    "Interview cut · Amaarae",
    "Short · Producer Notes",
  ][i],
  dur: `${1 + (i % 5)}:${(i * 7) % 60}0`.padEnd(4, "0"),
}));

function VideoLibrary() {
  return (
    <NetworkPage
      eyebrow="Video Library"
      title="Every RADAR video, one grid."
      kicker="Music videos, sessions, documentaries and shorts from the RADARNetwork archive."
      icon={<Film size={22} />}
    >
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {filters.map((f, i) => (
          <button
            key={f}
            type="button"
            aria-pressed={i === 0}
            className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] font-medium hairline ${
              i === 0 ? "bg-gold text-gold-foreground" : "bg-surface text-foreground hover:bg-surface-2"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <EditorialSection title="Latest">
        <div className="grid grid-cols-2 gap-3">
          {videos.map((v) => (
            <article key={v.title} className="overflow-hidden rounded-2xl bg-surface hairline glass-reflect">
              <div className="relative">
                <Cover seed={v.title} aspect="16/10" />
                <span className="absolute bottom-2 right-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur">
                  {v.dur}
                </span>
                <span className="pointer-events-none absolute inset-0 grid place-items-center">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/85 text-black">
                    <Play size={16} fill="currentColor" />
                  </span>
                </span>
              </div>
              <p className="line-clamp-2 p-3 text-[12px] font-medium leading-snug">{v.title}</p>
            </article>
          ))}
        </div>
      </EditorialSection>
    </NetworkPage>
  );
}