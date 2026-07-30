import { Bookmark } from "lucide-react";

export function LibraryEmptyState({
  title = "Your Library is waiting.",
  description = "Save podcasts, videos, and stories to create your personal collection.",
  action = "Explore Castaminofen",
}: {
  title?: string;
  description?: string;
  action?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl surface-panel px-6 py-16 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-3xl"
        style={{ backgroundImage: "var(--gradient-ember)" }}
      />
      <div className="relative mx-auto max-w-sm">
        <div className="mx-auto grid size-12 place-items-center rounded-2xl border border-border text-primary">
          <Bookmark className="size-5" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <button className="mt-6 rounded-full ember-fill px-5 py-2.5 text-sm font-medium">{action}</button>
      </div>
    </div>
  );
}
