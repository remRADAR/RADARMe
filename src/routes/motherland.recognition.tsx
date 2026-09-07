import { createFileRoute } from "@tanstack/react-router";
import { Trophy, Award, Star } from "lucide-react";
import { MotherPage, MotherSection, Avatar } from "@/components/motherland/MotherPage";

export const Route = createFileRoute("/motherland/recognition")({
  head: () => ({
    meta: [
      { title: "Recognition — MOTHERLand" },
      { name: "description", content: "Awards, features and spotlights for women shaping the sound of now." },
    ],
  }),
  component: RecognitionPage,
});

const SPOTLIGHTS = [
  { name: "Amara Okonkwo", role: "Producer of the month", note: "Afro-house pack streamed 240k times in a week" },
  { name: "Isla Moreno", role: "Songwriter feature", note: "Editorial cover · The Softest Season" },
  { name: "Yuki Tanabe", role: "Live artist spotlight", note: "Sold-out Tokyo residency" },
];

const AWARDS = [
  { title: "RADAR Woman of the Year", when: "Nominations open · closes Aug 30" },
  { title: "Producer's Circle", when: "Quarterly · next: Sep 15" },
  { title: "First Release Grant", when: "Rolling · $2,500 for debut projects" },
];

function RecognitionPage() {
  return (
    <MotherPage
      eyebrow="MOTHERLand · Recognition"
      title="Being seen, on your own terms."
      description="Awards, editorial features and quiet spotlights. Nominate yourself. Nominate a friend."
      icon={<Trophy size={22} />}
    >
      <MotherSection title="This month's spotlights">
        <ul className="divide-y divide-[color:var(--hairline)] overflow-hidden rounded-2xl bg-surface hairline elev-1">
          {SPOTLIGHTS.map((s) => (
            <li key={s.name} className="flex items-center gap-3 px-4 py-3.5">
              <Avatar name={s.name} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{s.name}</div>
                <div className="truncate text-[11px] text-rose">{s.role}</div>
                <div className="truncate text-[11px] text-muted-foreground">{s.note}</div>
              </div>
              <Star size={14} className="text-rose" fill="currentColor" />
            </li>
          ))}
        </ul>
      </MotherSection>

      <MotherSection title="Open awards & grants">
        <div className="grid grid-cols-1 gap-2">
          {AWARDS.map((a) => (
            <div key={a.title} className="flex items-center gap-3 rounded-2xl bg-surface p-4 hairline elev-1">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-rose-soft text-rose">
                <Award size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{a.title}</div>
                <div className="truncate text-[11px] text-muted-foreground">{a.when}</div>
              </div>
              <span className="text-[11px] text-rose">Nominate</span>
            </div>
          ))}
        </div>
      </MotherSection>
    </MotherPage>
  );
}