import { createFileRoute } from "@tanstack/react-router";
import { Search, MapPin } from "lucide-react";
import { MotherPage, MotherSection, Avatar } from "@/components/motherland/MotherPage";
import { Button, Input } from "@/components/radar";

export const Route = createFileRoute("/motherland/discovery")({
  head: () => ({
    meta: [
      { title: "Creative Discovery — MOTHERLand" },
      { name: "description", content: "Find women whose creative practice resonates with yours." },
    ],
  }),
  component: DiscoveryPage,
});

const TAGS = ["Ambient", "Afro-house", "Neo-soul", "Indie folk", "Experimental", "Latin pop", "Jazz"];

const PEOPLE = [
  { name: "Nour Haddad", role: "Cellist & composer", city: "Beirut", note: "Cinematic strings, film scoring" },
  { name: "Ada Bergström", role: "Bedroom pop", city: "Stockholm", note: "Warm lo-fi, hushed vocals" },
  { name: "Kemi Adebayo", role: "DJ & selector", city: "London", note: "Late night broken beat" },
  { name: "Camila Rojas", role: "Guitarist", city: "Mexico City", note: "Nylon strings, bolero revival" },
];

function DiscoveryPage() {
  return (
    <MotherPage
      eyebrow="MOTHERLand · Discovery"
      title="Find your kindred."
      description="Search by sound, city or season of life. Follow at your own pace — no algorithmic pressure."
      icon={<Search size={22} />}
    >
      <Input placeholder="Search by name, sound, city…" leading={<Search size={16} />} />

      <div className="-mx-1 flex gap-2 overflow-x-auto px-1">
        {TAGS.map((t, i) => (
          <button
            key={t}
            type="button"
            aria-pressed={i === 0}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs hairline ${
              i === 0 ? "bg-rose-soft text-rose" : "bg-surface text-muted-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <MotherSection title="You might resonate with">
        <div className="grid grid-cols-1 gap-2">
          {PEOPLE.map((p) => (
            <div key={p.name} className="flex items-center gap-3 rounded-2xl bg-surface p-4 hairline elev-1">
              <Avatar name={p.name} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{p.name}</div>
                <div className="truncate text-[11px] text-muted-foreground">
                  {p.role} · <MapPin size={10} className="inline -mt-0.5" /> {p.city}
                </div>
                <div className="truncate text-[11px] text-foreground/70">{p.note}</div>
              </div>
              <Button size="sm" variant="secondary">Follow</Button>
            </div>
          ))}
        </div>
      </MotherSection>
    </MotherPage>
  );
}