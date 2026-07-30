import { cn } from "@/lib/utils";
import type { CreationTypeId } from "./data";
import { creationTypeMap } from "./data";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function SectionHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 pb-5">
      <div className="min-w-0">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-1 truncate text-2xl sm:text-3xl">{title}</h2>
      </div>
      {action}
    </header>
  );
}

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "ember" | "ghost" | "outline" | "quiet";
  size?: "sm" | "md" | "lg";
};

export function Btn({ variant = "outline", size = "md", className, ...props }: BtnProps) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40",
        size === "sm" && "h-9 px-4 text-[13px]",
        size === "md" && "h-11 px-5 text-sm",
        size === "lg" && "h-13 px-7 text-[15px]",
        variant === "ember" &&
          "bg-ember-gradient text-primary-foreground shadow-ember hover:brightness-110 active:scale-[0.98]",
        variant === "outline" &&
          "border border-border bg-surface-raised text-foreground hover:border-ember/50 hover:text-ember",
        variant === "ghost" && "text-muted-foreground hover:bg-secondary hover:text-foreground",
        variant === "quiet" && "bg-secondary text-secondary-foreground hover:bg-accent",
        className,
      )}
    />
  );
}

export function TypeGlyph({
  type,
  size = "md",
  className,
}: {
  type: CreationTypeId;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const t = creationTypeMap[type];
  const Icon = t.icon;
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-2xl border border-border",
        size === "sm" && "h-9 w-9",
        size === "md" && "h-12 w-12",
        size === "lg" && "h-16 w-16 rounded-3xl",
        className,
      )}
      style={{
        backgroundColor: `color-mix(in oklab, ${t.accent} 14%, transparent)`,
        color: t.accent,
      }}
    >
      <Icon size={size === "lg" ? 26 : size === "md" ? 20 : 16} strokeWidth={1.6} />
    </span>
  );
}

export function Meter({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken", className)}>
      <div
        className="h-full rounded-full bg-ember-gradient transition-[width] duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export function Pill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "ember" | "verdant" | "signal";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium",
        tone === "neutral" && "border-border bg-surface-sunken text-muted-foreground",
        tone === "ember" && "border-ember/30 bg-ember/10 text-ember",
        tone === "verdant" && "border-verdant/30 bg-verdant/10 text-verdant",
        tone === "signal" && "border-signal/30 bg-signal/10 text-signal",
      )}
    >
      {children}
    </span>
  );
}

export function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-3xl border border-border bg-surface p-5 sm:p-6", className)}>
      {children}
    </div>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium">{label}</span>
        {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      </span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded-2xl border border-input bg-surface-raised px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ember/60 focus:ring-2 focus:ring-ember/20 focus:outline-none transition";
