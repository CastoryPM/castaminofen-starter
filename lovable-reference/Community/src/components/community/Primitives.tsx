import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Person } from "@/lib/community-data";

export function Avatar({
  person,
  size = "md",
}: {
  person: Person;
  size?: "sm" | "md" | "lg";
}) {
  const dims = { sm: "h-7 w-7 text-[10px]", md: "h-9 w-9 text-xs", lg: "h-14 w-14 text-base" }[size];
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full border border-border-strong bg-surface-raised font-medium tracking-wide text-foreground/80",
        dims,
        person.role === "creator" && "border-primary/50 text-primary",
      )}
      aria-hidden
    >
      {person.initials}
    </span>
  );
}

export function AvatarStack({ people: list, extra }: { people: Person[]; extra?: number }) {
  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {list.map((p) => (
          <span
            key={p.id}
            className="grid h-6 w-6 place-items-center rounded-full border border-background bg-surface-raised text-[9px] text-muted-foreground"
          >
            {p.initials}
          </span>
        ))}
      </div>
      {extra ? <span className="ml-2 text-xs text-muted-foreground">+{extra}</span> : null}
    </div>
  );
}

export function Tag({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "primary" | "insight" | "signal";
  className?: string;
}) {
  const tones = {
    neutral: "border-border text-muted-foreground",
    primary: "border-primary/35 text-primary bg-primary/10",
    insight: "border-insight/35 text-insight bg-insight/10",
    signal: "border-signal/35 text-signal bg-signal/10",
  }[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide",
        tones,
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 pb-5 sm:flex sm:justify-between">
      <div className="min-w-0">
        <p className="label-eyebrow">{eyebrow}</p>
        <h2 className="text-display mt-2 text-2xl sm:text-3xl">{title}</h2>
        {description ? (
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action}
    </header>
  );
}

export function GhostButton({
  children,
  onClick,
  className,
  active,
  type = "button",
  ariaLabel,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  active?: boolean;
  type?: "button" | "submit";
  ariaLabel?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "focus-ring inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:border-border-strong hover:bg-surface-raised hover:text-foreground",
        active && "border-primary/45 bg-primary/10 text-primary",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function PrimaryButton({
  children,
  onClick,
  className,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:brightness-110 active:scale-[0.98]",
        className,
      )}
      style={{ boxShadow: "var(--shadow-glow)" }}
    >
      {children}
    </button>
  );
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("surface-panel p-5 sm:p-6", className)}>{children}</section>;
}

export function Divider() {
  return <div className="h-px w-full bg-border" />;
}
