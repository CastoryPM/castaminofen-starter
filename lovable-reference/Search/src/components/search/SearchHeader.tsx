import { Sparkles } from "lucide-react";
import { SearchInput } from "./SearchInput";

export function SearchHeader({
  query,
  onQueryChange,
  onSubmit,
  onVoice,
  onFilters,
  activeFilterCount,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  onSubmit: () => void;
  onVoice: () => void;
  onFilters: () => void;
  activeFilterCount: number;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-6xl px-4 pb-4 pt-5 sm:px-6 lg:px-8">
        <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-primary">
              Castaminofen
            </p>
            <h1 className="mt-1 truncate text-xl font-bold sm:text-2xl">
              Search the whole universe
            </h1>
          </div>
          <span className="hidden shrink-0 items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground sm:inline-flex">
            <Sparkles className="size-3.5 text-accent" />
            Semantic search — soon
          </span>
        </div>

        <SearchInput
          value={query}
          onChange={onQueryChange}
          onSubmit={onSubmit}
          onVoice={onVoice}
          onFilters={onFilters}
          activeFilterCount={activeFilterCount}
        />
      </div>
    </header>
  );
}