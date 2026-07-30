import { Bell, Search, Sparkles } from "lucide-react";

/**
 * Compact, app-like top bar. Sticky with a blurred ink backdrop so artwork
 * scrolls beneath it. Not a marketing site header: no nav links.
 */
export function HomeHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-background/80 backdrop-blur-xl">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:py-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-ember)] text-primary-foreground shadow-[var(--shadow-card)]">
            <Sparkles className="size-4.5" strokeWidth={2.2} />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-lg leading-none font-semibold tracking-tight">
              Castaminofen
            </span>
            <span className="mt-1 hidden text-[11px] tracking-[0.18em] text-muted-foreground uppercase sm:block">
              Your media universe
            </span>
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            aria-label="Search Castaminofen"
            className="grid size-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <Search className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Notifications and community activity"
            className="relative grid size-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <Bell className="size-5" />
            <span className="absolute top-2 right-2.5 size-2 rounded-full bg-ember ring-2 ring-background" />
          </button>
          <button
            type="button"
            aria-label="Open your profile"
            className="ml-0.5 grid size-9 shrink-0 place-items-center rounded-full border border-border bg-surface-raised text-xs font-semibold tracking-wide focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            EL
          </button>
        </div>
      </div>
    </header>
  );
}
