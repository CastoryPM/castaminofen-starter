import { AlertTriangle, Loader2, RotateCcw, Sparkles } from "lucide-react";
import { Btn, Panel } from "./primitives";

export function CreateEmptyState({
  title = "Your next story starts here.",
  body = "Create your first piece and begin your journey.",
  action,
}: {
  title?: string;
  body?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-surface/60 px-6 py-14 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-border bg-ember/10 text-ember">
        <Sparkles size={22} strokeWidth={1.5} />
      </span>
      <h3 className="mt-5 text-2xl">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">{body}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function CreateLoadingState({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3" aria-busy="true" aria-live="polite">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 rounded-3xl border border-border bg-surface p-5">
          <div className="h-12 w-12 shrink-0 animate-pulse rounded-2xl bg-surface-sunken" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-3.5 w-2/3 animate-pulse rounded-full bg-surface-sunken" />
            <div className="h-3 w-1/3 animate-pulse rounded-full bg-surface-sunken" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function UploadSkeleton({ label = "Preparing preview…" }: { label?: string }) {
  return (
    <Panel className="flex items-center gap-3 border-dashed">
      <Loader2 size={18} className="animate-spin text-ember" />
      <span className="text-sm text-muted-foreground">{label}</span>
    </Panel>
  );
}

export function CreateErrorState({
  title = "That didn't go through.",
  body = "Your work is saved as a draft. Nothing was lost.",
  onRetry,
}: {
  title?: string;
  body?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-3xl border border-destructive/30 bg-destructive/5 p-6">
      <div className="flex items-start gap-3">
        <AlertTriangle size={20} className="mt-0.5 shrink-0 text-destructive" />
        <div className="min-w-0">
          <h3 className="text-lg">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{body}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Btn size="sm" variant="ember" onClick={onRetry}>
              <RotateCcw size={15} /> Try again
            </Btn>
            <Btn size="sm" variant="ghost">
              Save and come back later
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
