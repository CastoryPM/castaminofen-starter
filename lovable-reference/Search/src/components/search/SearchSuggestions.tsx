import { Search, User, Layers, MessagesSquare, ArrowUpLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SUGGESTIONS, type Suggestion } from "@/data/search-data";

const KIND_ICON: Record<Suggestion["kind"], LucideIcon> = {
  content: Search,
  creator: User,
  category: Layers,
  community: MessagesSquare,
};

export function SearchSuggestions({
  query,
  onPick,
  onFill,
}: {
  query: string;
  onPick: (q: string) => void;
  onFill: (q: string) => void;
}) {
  const q = query.trim().toLowerCase();
  const items = SUGGESTIONS.filter((s) => s.label.toLowerCase().includes(q)).slice(0, 6);
  const list = items.length ? items : SUGGESTIONS.slice(0, 4);

  return (
    <section aria-label="Search suggestions" className="rise">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
        {items.length ? "Suggestions" : "Try searching for"}
      </p>
      <ul className="divide-y divide-border/70 overflow-hidden rounded-2xl border border-border/70 bg-card/50">
        {list.map((s) => {
          const Icon = KIND_ICON[s.kind];
          return (
            <li key={s.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center">
              <button
                type="button"
                onClick={() => onPick(s.label)}
                className="flex min-w-0 items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary/40"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/12">
                  <Icon className="size-4 text-primary" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{s.label}</span>
                  {s.meta ? (
                    <span className="block truncate text-xs text-muted-foreground">{s.meta}</span>
                  ) : null}
                </span>
              </button>
              <button
                type="button"
                onClick={() => onFill(s.label)}
                aria-label={`Use ${s.label} in the search field`}
                className="mr-2 grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground"
              >
                <ArrowUpLeft className="size-4" />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}