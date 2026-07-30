import { history } from "@/lib/library-data";
import { Section, SectionHeader } from "./primitives";

type Entry = { id: string; title: string; creator: string; when: string; artwork: string };

function Timeline({ label, entries }: { label: string; entries: Entry[] }) {
  return (
    <div className="relative pl-6">
      <span className="absolute left-[7px] top-3 h-[calc(100%-0.5rem)] w-px bg-border" />
      <h3 className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
        <span className="absolute left-0 top-1.5 size-3.5 rounded-full border-2 border-primary bg-background" />
        {label}
      </h3>
      <ul className="space-y-2">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-elevated/60"
          >
            <img src={entry.artwork} alt="" loading="lazy" className="size-11 shrink-0 rounded-lg object-cover" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{entry.title}</p>
              <p className="truncate text-xs text-muted-foreground">{entry.creator}</p>
            </div>
            <span className="shrink-0 text-[11px] text-muted-foreground">{entry.when}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HistorySection() {
  return (
    <Section>
      <SectionHeader eyebrow="Your trail" title="Listening & watching history" action="Full history" />
      <div className="space-y-8 rounded-3xl surface-panel p-5 sm:p-7">
        <Timeline label="Recently played" entries={history.played} />
        <Timeline label="Recently watched" entries={history.watched} />
        <Timeline label="Completed" entries={history.completed} />
      </div>
    </Section>
  );
}
