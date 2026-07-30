import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Chip } from "./primitives";
import { CONTENT_TYPES, SORTS } from "@/data/search-data";
import type { Filters } from "./filters";

export function SearchFilterBar({
  filters,
  onChange,
  onOpenDrawer,
  activeCount,
  resultCount,
}: {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  onOpenDrawer: () => void;
  activeCount: number;
  resultCount: number;
}) {
  return (
    <div className="sticky top-[126px] z-20 -mx-4 border-b border-border/60 bg-background/85 px-4 py-3 backdrop-blur-xl sm:top-[136px] sm:mx-0 sm:rounded-2xl sm:border sm:border-border/60 sm:px-4">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={onOpenDrawer}
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-secondary/60 px-3.5 py-2 text-xs font-medium transition-colors hover:border-accent/40 lg:hidden"
        >
          <SlidersHorizontal className="size-3.5 text-accent" />
          Filters
          {activeCount > 0 ? (
            <span className="grid size-4 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
              {activeCount}
            </span>
          ) : null}
        </button>
        {CONTENT_TYPES.map((t) => (
          <Chip key={t} active={filters.type === t} onClick={() => onChange({ type: t })}>
            {t}
          </Chip>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <p className="truncate text-xs text-muted-foreground">
          {resultCount.toLocaleString()} results
        </p>
        <label className="inline-flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
          <ArrowUpDown className="size-3.5" />
          <span className="sr-only sm:not-sr-only">Sort</span>
          <select
            value={filters.sort}
            onChange={(e) => onChange({ sort: e.target.value as Filters["sort"] })}
            className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs font-medium text-foreground outline-none focus:border-primary/50"
          >
            {SORTS.map((s) => (
              <option key={s} value={s} className="bg-popover">
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}