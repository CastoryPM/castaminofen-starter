import { SearchX, WifiOff, RotateCcw, Compass } from "lucide-react";

export function SearchLoadingState() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading results">
      <div className="h-52 animate-pulse rounded-3xl bg-card/50 sm:h-60" />
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="grid grid-cols-[64px_minmax(0,1fr)] items-center gap-3 rounded-2xl border border-border/50 p-3"
          >
            <div className="size-16 animate-pulse rounded-2xl bg-card/60" />
            <div className="min-w-0 space-y-2">
              <div className="h-3.5 w-2/3 animate-pulse rounded-full bg-card/60" />
              <div className="h-3 w-1/3 animate-pulse rounded-full bg-card/50" />
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-2 rounded-2xl border border-border/50 p-3">
            <div className="aspect-square animate-pulse rounded-2xl bg-card/60" />
            <div className="h-3 w-3/4 animate-pulse rounded-full bg-card/50" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SearchEmptyState({
  query,
  onExplore,
  onSuggestion,
}: {
  query: string;
  onExplore: () => void;
  onSuggestion: (q: string) => void;
}) {
  return (
    <div className="rounded-3xl border border-border/70 bg-card/30 px-6 py-14 text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary/12">
        <SearchX className="size-6 text-primary" />
      </span>
      <h2 className="mt-5 text-lg font-bold sm:text-xl">Nothing found yet.</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
        We couldn’t find anything for “{query}”. Check the spelling, try another format, or explore
        a category.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {["space", "deep conversations", "Ali Example"].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onSuggestion(s)}
            className="rounded-full border border-border bg-secondary/50 px-3.5 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            {s}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onExplore}
        className="mt-6 inline-flex items-center gap-2 rounded-full signal-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground"
      >
        <Compass className="size-4" />
        Explore categories
      </button>
    </div>
  );
}

export function SearchErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-3xl border border-destructive/30 bg-card/30 px-6 py-14 text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-destructive/12">
        <WifiOff className="size-6 text-destructive" />
      </span>
      <h2 className="mt-5 text-lg font-bold sm:text-xl">Search is unavailable</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
        We couldn’t reach the Castaminofen index. Your filters are saved — try again in a moment.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40"
      >
        <RotateCcw className="size-4" />
        Retry search
      </button>
    </div>
  );
}