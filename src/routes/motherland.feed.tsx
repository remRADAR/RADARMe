import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Heart, MessageCircle, Bookmark, Play } from "lucide-react";
import { MotherPage, MotherSection, Avatar } from "@/components/motherland/MotherPage";
import { Button } from "@/components/radar";

export const Route = createFileRoute("/motherland/feed")({
  head: () => ({
    meta: [
      { title: "Creative Feed — MOTHERLand" },
      { name: "description", content: "Work, thoughts and moments from women creating across RADARMe." },
    ],
  }),
  component: FeedPage,
});

const FILTERS = ["For you", "Music", "Visual", "Writing", "Behind the scenes"];

const POSTS = [
  {
    name: "Amara Okonkwo",
    role: "Producer · Lagos",
    time: "2h",
    body: "Finished a new afro-house beat pack this morning. First time producing while my daughter napped on my chest. Softest tracks I've ever made.",
    kind: "audio",
    tag: "New release · 8 tracks",
    likes: 214,
    comments: 38,
  },
  {
    name: "Isla Moreno",
    role: "Songwriter · Madrid",
    time: "5h",
    body: "Sharing a page from the notebook. Writing about the version of myself I abandoned at 22 and am finally coming back to.",
    kind: "text",
    likes: 512,
    comments: 71,
  },
  {
    name: "Priya Nair",
    role: "Vocalist · Bangalore",
    time: "Yesterday",
    body: "Voice memo → verse. This is the raw take before we tracked it clean.",
    kind: "audio",
    tag: "Voice memo · 0:47",
    likes: 129,
    comments: 22,
  },
];

function FeedPage() {
  return (
    <MotherPage
      eyebrow="MOTHERLand · Feed"
      title="Creative feed."
      description="A calm scroll. No metrics obsession, no follower race — just work being made by women you trust."
      icon={<Sparkles size={22} />}
      actions={<Button variant="secondary" size="sm">Share something</Button>}
    >
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {FILTERS.map((f, i) => (
          <button
            key={f}
            type="button"
            aria-pressed={i === 0}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs hairline ${
              i === 0 ? "bg-rose-soft text-rose" : "bg-surface text-muted-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <MotherSection title="Today">
        <div className="space-y-3">
          {POSTS.map((p, i) => (
            <article
              key={i}
              className="animate-bloom-in rounded-2xl bg-surface p-4 hairline elev-1"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <header className="flex items-center gap-3">
                <Avatar name={p.name} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{p.name}</div>
                  <div className="truncate text-[11px] text-muted-foreground">
                    {p.role} · {p.time}
                  </div>
                </div>
              </header>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">{p.body}</p>
              {p.kind === "audio" && (
                <div className="mt-3 flex items-center gap-3 rounded-xl bg-surface-2 p-3 hairline">
                  <button
                    type="button"
                    aria-label={`Play ${p.tag ?? "audio clip"}`}
                    className="grid h-9 w-9 place-items-center rounded-full bg-rose-soft text-rose focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Play size={14} />
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-xs font-semibold">{p.tag}</div>
                    <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-surface-3">
                      <div
                        className="h-full rounded-full"
                        style={{ width: "34%", background: "var(--rose)" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <footer className="mt-3 flex items-center gap-4 text-[11px] text-muted-foreground">
                <button type="button" aria-label={`Like — ${p.likes} likes`} className="inline-flex items-center gap-1 hover:text-rose">
                  <Heart size={13} /> {p.likes}
                </button>
                <button type="button" aria-label={`Comment — ${p.comments} comments`} className="inline-flex items-center gap-1 hover:text-foreground">
                  <MessageCircle size={13} /> {p.comments}
                </button>
                <button type="button" aria-label="Save post" className="ml-auto inline-flex items-center gap-1 hover:text-foreground">
                  <Bookmark size={13} /> Save
                </button>
              </footer>
            </article>
          ))}
        </div>
      </MotherSection>
    </MotherPage>
  );
}