import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MediaType } from "@/lib/library-data";

export function SectionHeader({
  eyebrow,
  title,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  action?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4", className)}>
      <div className="min-w-0">
        {eyebrow ? (
          <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="truncate text-xl font-semibold sm:text-2xl">{title}</h2>
      </div>
      {action ? (
        <button className="group inline-flex shrink-0 items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
          {action}
          <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      ) : null}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-7 sm:py-9", className)}>
      {children}
    </section>
  );
}

export function ProgressLine({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-1 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div className="h-full rounded-full ember-fill" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

const typeLabel: Record<MediaType, string> = {
  podcast: "Podcast",
  video: "Video",
  audiobook: "Audiobook",
  short: "Short",
};

export function TypeBadge({ type, className }: { type: MediaType; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-elevated/80 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground backdrop-blur",
        className,
      )}
    >
      {typeLabel[type]}
    </span>
  );
}

export function Rail({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rail -mx-5 px-5 sm:mx-0 sm:px-0", className)}>{children}</div>;
}
