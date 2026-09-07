import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, PlayCircle, Clock, BookOpen } from "lucide-react";
import { MotherPage, MotherSection } from "@/components/motherland/MotherPage";
import { Button } from "@/components/radar";

export const Route = createFileRoute("/motherland/learning")({
  head: () => ({
    meta: [
      { title: "Learning Centre — MOTHERLand" },
      { name: "description", content: "Craft, business and voice — courses designed for women building music careers." },
    ],
  }),
  component: LearningPage,
});

const TRACKS = [
  { title: "Owning Your Publishing", author: "Nadia Vasquez", lessons: 8, hours: "2h 40m", tag: "Business" },
  { title: "Songwriting from the Body", author: "Isla Moreno", lessons: 12, hours: "3h 15m", tag: "Craft" },
  { title: "Booking Your First Tour", author: "Leah Osei", lessons: 6, hours: "1h 50m", tag: "Live" },
  { title: "Voice as Instrument", author: "Priya Nair", lessons: 10, hours: "2h 20m", tag: "Craft" },
];

const PATHS = [
  { title: "New artist foundations", steps: 5, color: "rose" },
  { title: "Independent release", steps: 7, color: "bloom" },
  { title: "Building a sustainable career", steps: 9, color: "rose" },
];

function LearningPage() {
  return (
    <MotherPage
      eyebrow="MOTHERLand · Learning"
      title="Learn from women who've made it work."
      description="Short lessons, honest advice. No fluff. Return to the material when you're ready — everything waits for you."
      icon={<GraduationCap size={22} />}
    >
      <MotherSection title="Guided paths">
        <div className="grid grid-cols-1 gap-2">
          {PATHS.map((p) => (
            <div key={p.title} className="relative overflow-hidden rounded-2xl bg-surface p-4 hairline elev-1">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-80"
                style={{ background: "var(--gradient-rose-wash)" }}
              />
              <div className="relative flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-rose-soft text-rose">
                  <BookOpen size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{p.title}</div>
                  <div className="text-[11px] text-muted-foreground">{p.steps} steps · self paced</div>
                </div>
                <Button size="sm" variant="secondary">Start</Button>
              </div>
            </div>
          ))}
        </div>
      </MotherSection>

      <MotherSection title="Featured lessons">
        <div className="grid grid-cols-1 gap-2">
          {TRACKS.map((t) => (
            <div key={t.title} className="flex items-center gap-3 rounded-2xl bg-surface p-4 hairline elev-1">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-surface-2 text-rose">
                <PlayCircle size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{t.title}</div>
                <div className="truncate text-[11px] text-muted-foreground">
                  {t.author} · {t.lessons} lessons
                </div>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Clock size={11} /> {t.hours}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-rose">{t.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </MotherSection>
    </MotherPage>
  );
}