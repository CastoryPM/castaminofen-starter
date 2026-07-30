import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { creationTypes, type CreationType, type CreationTypeId } from "./data";
import { Eyebrow } from "./primitives";

export function CreationCard({
  type,
  selected,
  onSelect,
  compact,
}: {
  type: CreationType;
  selected?: boolean;
  onSelect: (id: CreationTypeId) => void;
  compact?: boolean;
}) {
  const Icon = type.icon;
  return (
    <button
      type="button"
      onClick={() => onSelect(type.id)}
      aria-pressed={selected}
      className={cn(
        "group relative overflow-hidden rounded-3xl border p-5 text-left transition-all duration-300",
        "border-border bg-surface hover:-translate-y-0.5 hover:shadow-cinematic",
        selected && "border-ember/60 shadow-ember",
      )}
      style={
        selected
          ? { backgroundColor: `color-mix(in oklab, ${type.accent} 10%, var(--surface))` }
          : undefined
      }
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ backgroundColor: `color-mix(in oklab, ${type.accent} 45%, transparent)` }}
      />
      <span className="relative flex items-start justify-between gap-3">
        <span
          className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-border"
          style={{
            backgroundColor: `color-mix(in oklab, ${type.accent} 15%, transparent)`,
            color: type.accent,
          }}
        >
          <Icon size={20} strokeWidth={1.6} />
        </span>
        <ArrowUpRight
          size={18}
          className="mt-1 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember"
        />
      </span>
      <span className="relative mt-4 block text-display text-xl">{type.name}</span>
      <span className="relative mt-1 block text-sm text-muted-foreground">{type.tagline}</span>
      {!compact && (
        <>
          <span className="relative mt-3 block text-[13px] leading-relaxed text-foreground/75">
            {type.purpose}
          </span>
          <span className="relative mt-4 flex flex-wrap gap-1.5">
            {type.workflow.slice(0, 4).map((w) => (
              <span
                key={w}
                className="rounded-full border border-border bg-surface-sunken px-2 py-0.5 text-[10px] tracking-wide text-muted-foreground"
              >
                {w}
              </span>
            ))}
          </span>
        </>
      )}
    </button>
  );
}

export function CreationTypeSelector({
  value,
  onSelect,
  compact,
}: {
  value?: CreationTypeId;
  onSelect: (id: CreationTypeId) => void;
  compact?: boolean;
}) {
  return (
    <div>
      <Eyebrow>Step 01 — the first question</Eyebrow>
      <h2 className="mt-2 text-3xl sm:text-4xl">What do you want to create?</h2>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Pick a form. Nothing is final — you can change shape at any point in the flow.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {creationTypes.map((t) => (
          <CreationCard
            key={t.id}
            type={t}
            selected={value === t.id}
            onSelect={onSelect}
            compact={compact}
          />
        ))}
      </div>
    </div>
  );
}
