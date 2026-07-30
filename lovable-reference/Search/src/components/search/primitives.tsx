import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Generated artwork tile — stands in for real media artwork in this UI-only build. */
export function Artwork({
  hue,
  label,
  className,
  rounded = "rounded-2xl",
}: {
  hue: number;
  label: string;
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Artwork for ${label}`}
      className={cn("relative overflow-hidden", rounded, className)}
      style={{
        backgroundImage: `linear-gradient(140deg, oklch(0.52 0.13 ${hue}), oklch(0.24 0.05 ${hue + 30}))`,
      }}
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `radial-gradient(60% 55% at 22% 18%, oklch(0.86 0.13 ${hue} / 0.55), transparent 70%)`,
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/60 to-transparent" />
    </div>
  );
}

export function SectionTitle({
  title,
  caption,
  action,
}: {
  title: string;
  caption?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
      <div className="min-w-0">
        <h2 className="truncate text-base font-semibold sm:text-lg">{title}</h2>
        {caption ? (
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{caption}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function Chip({
  active,
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-300",
        active
          ? "border-transparent bg-primary text-primary-foreground shadow-[0_10px_30px_-16px_var(--primary)]"
          : "border-border bg-secondary/60 text-muted-foreground hover:border-primary/40 hover:text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function MetaDot() {
  return <span className="text-muted-foreground/50">·</span>;
}