import { Mic, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function VoiceSearchButton({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Search by voice"
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-full bg-secondary/70 text-muted-foreground transition-colors duration-300 hover:bg-primary/15 hover:text-primary",
        className,
      )}
    >
      <Mic className="size-4" />
    </button>
  );
}

/** Listening visualiser — presentation only, no speech engine is wired up. */
function Waveform() {
  const bars = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="flex h-16 items-center justify-center gap-1.5" aria-hidden>
      {bars.map((i) => (
        <span
          key={i}
          className="w-1.5 rounded-full bg-primary"
          style={{
            height: "100%",
            animation: `cast-pulse ${900 + (i % 4) * 220}ms ease-in-out ${i * 90}ms infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function VoiceSearchModal({
  open,
  onClose,
  onPick,
}: {
  open: boolean;
  onClose: () => void;
  onPick: (q: string) => void;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-surface-sunken/80 p-4 backdrop-blur-md sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Voice search"
    >
      <div className="glass rise w-full max-w-md rounded-3xl p-6 lift">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold">Listening…</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Say a show, a creator, or a feeling.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close voice search"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary/70 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="my-6 rounded-2xl bg-surface-sunken/70 p-4">
          <Waveform />
        </div>

        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Try saying</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {["play Orbital Notes", "something relaxing", "audiobooks by Mira Oduya"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onPick(s)}
              className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              “{s}”
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}