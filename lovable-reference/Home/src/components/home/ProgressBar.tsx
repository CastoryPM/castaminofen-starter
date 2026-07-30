import { cn } from "@/lib/utils";

/** Thin progress rail used by continue / audiobook cards. */
export function ProgressBar({
  value,
  className,
  label,
}: {
  value: number;
  className?: string;
  label?: string;
}) {
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? "Playback progress"}
      className={cn("h-1 w-full overflow-hidden rounded-full bg-white/12", className)}
    >
      <div
        className="h-full rounded-full bg-[image:var(--gradient-ember)]"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
