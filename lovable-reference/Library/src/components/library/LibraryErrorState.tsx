import { RotateCcw, CloudOff } from "lucide-react";

export function LibraryErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="rounded-3xl surface-panel px-6 py-16 text-center">
      <div className="mx-auto max-w-sm">
        <div className="mx-auto grid size-12 place-items-center rounded-2xl border border-border text-muted-foreground">
          <CloudOff className="size-5" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold">We lost the thread.</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Your library is safe — we just couldn't reach it. Give it another moment.
        </p>
        <button
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-elevated"
        >
          <RotateCcw className="size-4" />
          Try again
        </button>
      </div>
    </div>
  );
}
