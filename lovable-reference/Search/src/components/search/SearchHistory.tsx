import { Clock3, X, Bookmark } from "lucide-react";
import { SectionTitle } from "./primitives";
import { SAVED_SEARCHES } from "@/data/search-data";

export function SearchHistory({
  items,
  onPick,
  onRemove,
  onClear,
}: {
  items: string[];
  onPick: (q: string) => void;
  onRemove: (q: string) => void;
  onClear: () => void;
}) {
  if (items.length === 0) return null;
  return (
    <section aria-label="Recent searches">
      <SectionTitle
        title="Recent"
        caption="Pick up where you left off"
        action={
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-medium text-muted-foreground transition-colors hover:text-destructive"
          >
            Clear history
          </button>
        }
      />
      <ul className="divide-y divide-border/70 overflow-hidden rounded-2xl border border-border/70 bg-card/40">
        {items.map((item) => (
          <li key={item} className="grid grid-cols-[minmax(0,1fr)_auto] items-center">
            <button
              type="button"
              onClick={() => onPick(item)}
              className="flex min-w-0 items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary/40"
            >
              <Clock3 className="size-4 shrink-0 text-muted-foreground" />
              <span className="truncate text-sm">{item}</span>
            </button>
            <button
              type="button"
              onClick={() => onRemove(item)}
              aria-label={`Remove ${item} from recent searches`}
              className="mr-2 grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SavedSearches({ onPick }: { onPick: (q: string) => void }) {
  return (
    <section aria-label="Saved searches">
      <SectionTitle title="Saved searches" caption="Your standing questions" />
      <div className="grid gap-3 sm:grid-cols-3">
        {SAVED_SEARCHES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onPick(s.label)}
            className="group rounded-2xl border border-border/70 bg-card/40 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40"
          >
            <Bookmark className="size-4 text-accent" />
            <p className="mt-3 truncate text-sm font-medium">{s.label}</p>
            <p className="mt-1 truncate text-xs text-muted-foreground">{s.filters}</p>
          </button>
        ))}
      </div>
    </section>
  );
}