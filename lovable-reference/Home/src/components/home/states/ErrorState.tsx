import { CloudOff, RotateCw } from "lucide-react";

/** Friendly, recoverable error surface for a failed shelf or the whole page. */
export function ErrorState({
  title = "We couldn't load this shelf",
  body = "Your connection dropped for a moment. Nothing is lost — try again and we'll rebuild your feed.",
  onRetry,
}: {
  title?: string;
  body?: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="card-elevated flex flex-col items-center gap-4 rounded-3xl px-6 py-10 text-center sm:flex-row sm:gap-6 sm:px-8 sm:text-left"
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-border bg-surface-raised text-muted-foreground">
        <CloudOff className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface-raised px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <RotateCw className="size-4" />
        Try again
      </button>
    </div>
  );
}
