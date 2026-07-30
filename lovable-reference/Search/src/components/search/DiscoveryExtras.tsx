import { Sparkles, Compass, Waves, Brain, ArrowUpRight } from "lucide-react";
import { SectionTitle } from "./primitives";
import { MOODS, RELATED_SEARCHES } from "@/data/search-data";

const MOOD_ICONS = [Brain, Waves, Compass, Sparkles];

export function MoodDiscovery({ onPick }: { onPick: (q: string) => void }) {
  return (
    <section aria-label="Mood discovery">
      <SectionTitle title="Search by mood" caption="Find content by how you want to feel" />
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-4 sm:px-0">
        {MOODS.map((m, i) => {
          const Icon = MOOD_ICONS[i % MOOD_ICONS.length];
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onPick(m.label)}
              className="group w-44 shrink-0 rounded-2xl border border-border/70 bg-card/40 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 sm:w-auto"
            >
              <Icon className="size-5 text-primary" />
              <p className="mt-4 text-sm font-semibold">{m.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{m.note}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export function RelatedSearches({ onPick }: { onPick: (q: string) => void }) {
  return (
    <section aria-label="Related searches">
      <SectionTitle title="People also explore" />
      <div className="flex flex-wrap gap-2">
        {RELATED_SEARCHES.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => onPick(r)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3.5 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            {r}
            <ArrowUpRight className="size-3" />
          </button>
        ))}
      </div>
    </section>
  );
}

export function SemanticTeaser() {
  return (
    <section
      aria-label="Semantic search preview"
      className="relative overflow-hidden rounded-3xl border border-primary/25 p-6 aurora"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
            Coming soon
          </p>
          <h2 className="mt-2 text-lg font-bold sm:text-xl">Find content by meaning</h2>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            Describe an idea — “conversations that made someone change their mind” — and
            Castaminofen will surface episodes, chapters and threads that match the thought, not
            just the words.
          </p>
        </div>
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/15">
          <Sparkles className="size-5 text-primary" />
        </span>
      </div>
      <button
        type="button"
        disabled
        className="mt-5 w-full cursor-not-allowed rounded-2xl border border-dashed border-primary/35 bg-surface-sunken/50 px-4 py-3 text-left text-sm text-muted-foreground sm:w-auto sm:min-w-sm"
      >
        Describe what you’re looking for…
      </button>
    </section>
  );
}