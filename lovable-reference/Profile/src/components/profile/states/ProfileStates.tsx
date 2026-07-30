import { Compass, TriangleAlert } from "lucide-react";
import { ActionButton } from "../shared/ActionButton";

export function ProfileLoadingState() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6" aria-busy="true" aria-live="polite">
      <div className="h-48 w-full animate-pulse rounded-3xl bg-surface-2 sm:h-64" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="h-28 w-28 shrink-0 animate-pulse rounded-[26px] bg-surface-2" />
        <div className="w-full space-y-3">
          <div className="h-7 w-1/2 animate-pulse rounded-full bg-surface-2" />
          <div className="h-4 w-1/3 animate-pulse rounded-full bg-surface-2" />
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-surface-2" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 animate-pulse rounded-2xl bg-surface-2" />
        ))}
      </div>
    </div>
  );
}

export function ProfileEmptyState({
  title = "Your story hasn't started yet",
  description = "Play something, save a moment, join one discussion — your profile fills itself as you go.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="surface-panel mx-auto max-w-lg p-10 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-ember-gradient text-ember-foreground">
        <Compass className="h-6 w-6" />
      </span>
      <h2 className="mt-5 text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <div className="mt-6 flex justify-center">
        <ActionButton variant="ember">Start exploring</ActionButton>
      </div>
    </div>
  );
}

export function ProfileErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="surface-panel mx-auto max-w-lg p-10 text-center" role="alert">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-destructive/15 text-destructive">
        <TriangleAlert className="h-6 w-6" />
      </span>
      <h2 className="mt-5 text-xl font-semibold">This profile didn't load</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        The identity layer couldn't be reached. Nothing was lost — try again.
      </p>
      <div className="mt-6 flex justify-center">
        <ActionButton variant="ember" onClick={onRetry}>
          Try again
        </ActionButton>
      </div>
    </div>
  );
}