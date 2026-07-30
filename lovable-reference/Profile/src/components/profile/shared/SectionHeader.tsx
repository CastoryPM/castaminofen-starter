import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
      <div className="min-w-0">
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
        ) : null}
        <h2 className="mt-1 truncate text-xl font-semibold sm:text-2xl">{title}</h2>
      </div>
      {action ? <div className="shrink-0 text-sm text-muted-foreground">{action}</div> : null}
    </div>
  );
}