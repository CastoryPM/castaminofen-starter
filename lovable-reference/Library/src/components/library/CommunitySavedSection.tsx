import { MessagesSquare, ArrowUpRight } from "lucide-react";
import { communitySaved } from "@/lib/library-data";
import { Section, SectionHeader } from "./primitives";

export function CommunitySavedSection() {
  return (
    <Section>
      <SectionHeader eyebrow="From the community" title="Saved from community" action="Open community" />
      <ul className="grid gap-3 sm:grid-cols-3">
        {communitySaved.map((entry) => (
          <li
            key={entry.id}
            className="group flex flex-col justify-between rounded-2xl surface-panel p-4 lift"
          >
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <MessagesSquare className="size-3.5 text-accent" />
              {entry.kind}
            </div>
            <p className="mt-3 line-clamp-2 text-sm font-medium leading-snug">{entry.title}</p>
            <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
              <span className="truncate text-[11px] text-muted-foreground">{entry.meta}</span>
              <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5" />
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
