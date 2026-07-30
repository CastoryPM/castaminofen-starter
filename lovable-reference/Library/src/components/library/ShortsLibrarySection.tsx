import { Play } from "lucide-react";
import { shorts } from "@/lib/library-data";
import { Rail, Section, SectionHeader } from "./primitives";

export function ShortsLibrarySection() {
  return (
    <Section>
      <SectionHeader eyebrow="Small moments" title="Shorts you kept" action="See all" />
      <Rail>
        {shorts.map((item) => (
          <article key={item.id} className="group w-[136px] sm:w-[152px]">
            <div className="relative overflow-hidden rounded-2xl surface-panel lift">
              <img src={item.artwork} alt="" loading="lazy" className="aspect-[9/16] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
              <Play className="absolute bottom-3 left-3 size-4 fill-current text-foreground opacity-80" />
              <span className="absolute bottom-3 right-3 text-[11px] tabular-nums text-foreground/80">
                {item.duration}
              </span>
            </div>
            <h3 className="mt-2.5 truncate text-sm font-medium">{item.title}</h3>
            <p className="truncate text-xs text-muted-foreground">{item.creator}</p>
          </article>
        ))}
      </Rail>
    </Section>
  );
}
