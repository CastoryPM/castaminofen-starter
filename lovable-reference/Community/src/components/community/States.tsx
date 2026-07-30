import { GhostButton, PrimaryButton } from "./Primitives";

export function EmptyCommunityState({ onCreate }: { onCreate?: () => void }) {
  return (
    <div className="surface-panel flex flex-col items-center px-6 py-14 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-full border border-border-strong text-lg text-muted-foreground" aria-hidden>
        ◎
      </span>
      <h3 className="text-display mt-5 text-2xl">Nothing here yet — that's an opening</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
        This space is waiting for its first real question. Ask one and the room will find you.
      </p>
      <PrimaryButton className="mt-6" onClick={onCreate}>
        Start the first discussion
      </PrimaryButton>
    </div>
  );
}

export function LoadingState({ rows = 3 }: { rows?: number }) {
  return (
    <div className="grid gap-3" aria-busy="true" aria-label="Loading conversations">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="surface-panel animate-pulse p-5">
          <div className="flex items-center gap-3">
            <span className="h-9 w-9 rounded-full bg-foreground/10" />
            <span className="h-3 w-32 rounded-full bg-foreground/10" />
          </div>
          <div className="mt-4 space-y-2">
            <span className="block h-4 w-3/4 rounded-full bg-foreground/10" />
            <span className="block h-3 w-full rounded-full bg-foreground/[0.07]" />
            <span className="block h-3 w-2/3 rounded-full bg-foreground/[0.07]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="surface-panel flex flex-col items-center px-6 py-12 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full border border-signal/40 bg-signal/10 text-signal" aria-hidden>
        !
      </span>
      <h3 className="text-display mt-4 text-xl">This conversation didn't load</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        The thread is fine — the connection isn't. Try again in a moment.
      </p>
      <GhostButton className="mt-5" onClick={onRetry}>
        Try again
      </GhostButton>
    </div>
  );
}
