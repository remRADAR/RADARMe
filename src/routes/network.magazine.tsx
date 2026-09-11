import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { NetworkPage, EditorialSection, Cover } from "@/components/network/NetworkPage";

export const Route = createFileRoute("/network/magazine")({
  head: () => ({
    meta: [
      { title: "Magazine — RADARNetwork" },
      {
        name: "description",
        content: "The RADARNetwork magazine — long-form journalism from the music world.",
      },
    ],
  }),
  component: MagazinePage,
});

const features = [
  {
    title: "The artists rewriting the sound of the diaspora",
    author: "Amara Okafor",
    read: "14 min",
    tag: "Cover Story",
  },
  { title: "Inside the studios of Lagos", author: "Tunde Bello", read: "9 min", tag: "Portfolio" },
  { title: "How TikTok changed A&R forever", author: "Sam Reyes", read: "7 min", tag: "Essay" },
  {
    title: "The economics of an independent tour",
    author: "Nadia Hart",
    read: "11 min",
    tag: "Business",
  },
  { title: "Producer notebooks · Vol. 3", author: "REM Editorial", read: "6 min", tag: "Craft" },
  { title: "A field guide to sync deals", author: "Priya Mehta", read: "8 min", tag: "Explainer" },
];

function MagazinePage() {
  return (
    <NetworkPage
      eyebrow="RADAR Magazine · Issue 12"
      title="Long reads for a longer career."
      kicker="Deep reporting, essays and portfolios by the RADARNetwork editorial desk."
      icon={<BookOpen size={22} />}
    >
      <EditorialSection title="Cover story">
        <article className="overflow-hidden rounded-3xl hairline glass-reflect">
          <Cover seed="cover-issue-12" aspect="4/3" label="Feature" />
          <div className="p-5">
            <p className="text-[10px] uppercase tracking-[0.24em] text-gold">14 min read</p>
            <h2 className="mt-1 font-display text-xl font-semibold leading-tight">
              The artists rewriting the sound of the diaspora
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              From Lagos to São Paulo, a long-form portrait of 14 artists shaping global music from
              the outside in.
            </p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              By Amara Okafor · Photography by Ade Adekola
            </p>
          </div>
        </article>
      </EditorialSection>

      <EditorialSection title="In this issue" hint="Six new pieces">
        <ul className="divide-y divide-[color:var(--hairline)] rounded-2xl bg-surface hairline glass-reflect">
          {features.map((f) => (
            <li key={f.title} className="flex items-center gap-3 p-4">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold">{f.tag}</p>
                <p className="mt-0.5 line-clamp-2 font-display text-[15px] font-semibold leading-snug">
                  {f.title}
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {f.author} · {f.read}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </EditorialSection>
    </NetworkPage>
  );
}
