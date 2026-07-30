import { Bookmark, Clock, Heart, ListMusic } from "lucide-react";

const entries = [
  { icon: Heart, label: "Favorites", meta: "128 items" },
  { icon: Bookmark, label: "Saved", meta: "42 items" },
  { icon: ListMusic, label: "Playlists", meta: "9 lists" },
  { icon: Clock, label: "History", meta: "This week" },
];

/** Shortcuts into Library. Deliberately thin — Library owns the real surface. */
export function LibraryShortcut() {
  return (
    <section className="py-6 lg:py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-xl font-semibold sm:text-2xl">Your library</h2>
        <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {entries.map(({ icon: Icon, label, meta }) => (
            <button
              key={label}
              type="button"
              className="card-elevated grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-2xl p-4 text-left transition-colors hover:bg-surface-raised focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface-raised text-ember">
                <Icon className="size-4.5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{label}</span>
                <span className="block truncate text-[11px] text-muted-foreground">{meta}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
