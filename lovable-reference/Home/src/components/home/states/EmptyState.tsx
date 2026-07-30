import { Compass, Play } from "lucide-react";

/** Premium empty state — quiet, never a dead end. */
export function EmptyState({
  title,
  body,
  action,
  eyebrow = "Your journey starts here",
}: {
  title: string;
  body: string;
  action: string;
  eyebrow?: string;
}) {
  return (
    <div className="card-elevated relative overflow-hidden rounded-3xl px-6 py-10 text-center sm:px-10 sm:py-14">
      <div className="aurora absolute inset-0 opacity-70" aria-hidden />
      <div className="relative mx-auto max-w-md">
        <span className="mx-auto grid size-12 place-items-center rounded-2xl border border-border bg-surface-raised text-ember">
          <Compass className="size-5" />
        </span>
        <p className="mt-5 text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
          {eyebrow}
        </p>
        <h3 className="mt-2 font-display text-xl font-semibold text-balance sm:text-2xl">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
        <button
          type="button"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-ember)] px-5 py-3 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <Play className="size-4 fill-current" />
          {action}
        </button>
      </div>
    </div>
  );
}
