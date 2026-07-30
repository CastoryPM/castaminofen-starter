import { TrendingUp, ArrowUpRight } from "lucide-react";
import { SectionTitle } from "./primitives";
import { TRENDING_SEARCHES } from "@/data/search-data";

export function TrendingSearches({ onPick }: { onPick: (q: string) => void }) {
  return (
    <section aria-label="Trending searches">
      <SectionTitle title="Trending now" caption="What the ecosystem is listening to" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TRENDING_SEARCHES.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onPick(t.label)}
            className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/50 p-4 text-left transition-all duration-500 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card"
          >
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/12 text-sm font-bold text-primary">
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{t.label}</span>
                <span className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  {t.tag}
                  <span className="inline-flex items-center gap-0.5 text-accent">
                    <TrendingUp className="size-3" />
                    {t.delta}
                  </span>
                </span>
              </span>
              <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}