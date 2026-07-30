import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function MetricCard({
  label,
  value,
  delta,
  trend = "up",
  hint,
  accent = false,
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down";
  hint?: string;
  accent?: boolean;
}) {
  const Icon = trend === "up" ? ArrowUpRight : ArrowDownRight;
  return (
    <div
      className={cn(
        "surface-panel group relative p-5 transition-all duration-300 hover:-translate-y-0.5",
        accent && "glow-ring",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</p>
        {delta && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-semibold",
              trend === "up"
                ? "bg-success/12 text-success"
                : "bg-destructive/12 text-destructive",
            )}
          >
            <Icon className="size-3" />
            {delta}
          </span>
        )}
      </div>
      <p className="mt-3 font-display text-3xl font-semibold tracking-tight tabular-nums">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      <div className="mt-4 h-px w-full bg-gradient-to-r from-primary/50 to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
    </div>
  );
}
