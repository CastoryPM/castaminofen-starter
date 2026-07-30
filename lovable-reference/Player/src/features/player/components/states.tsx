import type { ReactNode } from "react";
import { AlertTriangle, ListPlus, RefreshCw, WifiOff } from "lucide-react";

export function EmptyState({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border px-6 py-10 text-center">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-surface-raised text-primary">{icon}</span>
      <p className="text-sm font-medium">{title}</p>
      <p className="max-w-xs text-xs text-muted-foreground">{body}</p>
    </div>
  );
}

export function EmptyQueueState() {
  return (
    <EmptyState
      icon={<ListPlus className="h-5 w-5" />}
      title="Your queue is empty"
      body="Add content to continue your journey."
    />
  );
}

export function PlayerLoadingState() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading player">
      <div className="mx-auto aspect-square w-full max-w-[min(70vh,520px)] animate-pulse rounded-[2rem] bg-surface-raised" />
      <div className="space-y-2">
        <div className="h-6 w-2/3 animate-pulse rounded-full bg-surface-raised" />
        <div className="h-4 w-1/3 animate-pulse rounded-full bg-surface-raised" />
      </div>
      <div className="h-1.5 w-full animate-pulse rounded-full bg-surface-raised" />
      <div className="flex justify-center gap-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`animate-pulse rounded-full bg-surface-raised ${i === 2 ? "h-16 w-16" : "h-10 w-10"}`}
          />
        ))}
      </div>
    </div>
  );
}

export function PlayerErrorState({
  kind = "playback",
  onRetry,
}: {
  kind?: "playback" | "network";
  onRetry: () => void;
}) {
  const network = kind === "network";
  return (
    <div className="flex flex-col items-center gap-3 rounded-[1.5rem] border border-destructive/40 bg-destructive/10 px-6 py-14 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-destructive/20 text-destructive">
        {network ? <WifiOff className="h-6 w-6" /> : <AlertTriangle className="h-6 w-6" />}
      </span>
      <h3 className="text-lg font-semibold">{network ? "You're offline" : "Playback stopped"}</h3>
      <p className="max-w-sm text-sm text-muted-foreground">
        {network
          ? "We lost the connection. Your position is saved — we'll resume from 22:35 when you're back."
          : "This episode couldn't start. Nothing is lost, your saved moments and notes are intact."}
      </p>
      <button
        onClick={onRetry}
        className="ember-bg mt-1 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-primary-foreground"
      >
        <RefreshCw className="h-4 w-4" /> Try again
      </button>
    </div>
  );
}
