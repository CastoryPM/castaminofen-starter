import { Mic2, PlayCircle, BookOpen, Zap, Users, MessagesSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionTitle } from "./primitives";
import { CATEGORIES } from "@/data/search-data";

const ICONS: Record<string, LucideIcon> = {
  podcasts: Mic2,
  videos: PlayCircle,
  audiobooks: BookOpen,
  shorts: Zap,
  creators: Users,
  community: MessagesSquare,
};

export function CategoryExplorer({ onPick }: { onPick: (label: string) => void }) {
  return (
    <section aria-label="Explore categories">
      <SectionTitle title="Explore" caption="Six doors into the Castaminofen universe" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {CATEGORIES.map((c) => {
          const Icon = ICONS[c.id];
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onPick(c.title)}
              className="group relative overflow-hidden rounded-3xl border border-border/70 p-5 text-left transition-all duration-500 hover:-translate-y-1 hover:border-transparent"
              style={{
                backgroundImage: `linear-gradient(150deg, oklch(0.34 0.08 ${c.hue} / 0.65), oklch(0.21 0.024 207))`,
              }}
            >
              <span
                className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-90"
                style={{ backgroundColor: `oklch(0.7 0.14 ${c.hue} / 0.5)` }}
              />
              <span
                className="relative grid size-10 place-items-center rounded-2xl"
                style={{ backgroundColor: `oklch(0.75 0.14 ${c.hue} / 0.18)` }}
              >
                <Icon className="size-5" style={{ color: `oklch(0.82 0.13 ${c.hue})` }} />
              </span>
              <span className="relative mt-8 block text-base font-semibold sm:text-lg">
                {c.title}
              </span>
              <span className="relative mt-1 block text-xs text-muted-foreground">{c.discover}</span>
              <span className="relative mt-3 block text-[11px] uppercase tracking-[0.14em] text-muted-foreground/70">
                {c.count}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}