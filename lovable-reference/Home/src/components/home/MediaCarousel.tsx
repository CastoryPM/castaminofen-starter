import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Shared section frame + horizontal rail. Every shelf on Home uses this so
 * spacing, heading rhythm and scroll behaviour stay identical.
 */
export function SectionHeader({
  title,
  subtitle,
  action = "See all",
}: {
  title: string;
  subtitle?: string;
  action?: string | null;
}) {
  return (
    <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 px-4 sm:px-6">
      <div className="min-w-0">
        <h2 className="truncate font-display text-xl font-semibold sm:text-2xl">{title}</h2>
        {subtitle ? (
          <p className="mt-1 truncate text-xs text-muted-foreground sm:text-sm">{subtitle}</p>
        ) : null}
      </div>
      {action ? (
        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          {action}
          <ChevronRight className="size-3.5" />
        </button>
      ) : null}
    </div>
  );
}

export function MediaCarousel({
  title,
  subtitle,
  action,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  action?: string | null;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("py-6 lg:py-8", className)}>
      <div className="mx-auto max-w-6xl">
        <SectionHeader title={title} subtitle={subtitle} action={action} />
        <div className="rail edge-fade px-4 pb-1 sm:px-6">{children}</div>
      </div>
    </section>
  );
}
