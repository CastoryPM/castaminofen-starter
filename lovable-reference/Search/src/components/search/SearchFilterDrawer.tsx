import { X, RotateCcw } from "lucide-react";
import { Chip } from "./primitives";
import {
  CONTENT_TYPES,
  DURATIONS,
  CREATOR_FILTERS,
  LANGUAGES,
  DATES,
  SORTS,
} from "@/data/search-data";
import { DEFAULT_FILTERS, type Filters } from "./filters";

function Group<T extends string>({
  label,
  options,
  value,
  onSelect,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onSelect: (v: T) => void;
}) {
  return (
    <div>
      <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <Chip key={o} active={value === o} onClick={() => onSelect(o)}>
            {o}
          </Chip>
        ))}
      </div>
    </div>
  );
}

export function FilterPanelBody({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
}) {
  return (
    <div className="space-y-6">
      <Group
        label="Content type"
        options={CONTENT_TYPES}
        value={filters.type}
        onSelect={(v) => onChange({ type: v })}
      />
      <Group
        label="Duration"
        options={DURATIONS}
        value={filters.duration}
        onSelect={(v) => onChange({ duration: v })}
      />
      <Group
        label="Creator"
        options={CREATOR_FILTERS}
        value={filters.creator}
        onSelect={(v) => onChange({ creator: v })}
      />
      <Group
        label="Language"
        options={LANGUAGES}
        value={filters.language}
        onSelect={(v) => onChange({ language: v })}
      />
      <Group
        label="Date"
        options={DATES}
        value={filters.date}
        onSelect={(v) => onChange({ date: v })}
      />
      <Group
        label="Sort by"
        options={SORTS}
        value={filters.sort}
        onSelect={(v) => onChange({ sort: v })}
      />
    </div>
  );
}

/** Desktop side panel. */
export function SearchFilterSidebar({
  filters,
  onChange,
  onReset,
}: {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  onReset: () => void;
}) {
  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="sticky top-[150px] rounded-3xl border border-border/70 bg-card/40 p-5">
        <div className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
          <h2 className="truncate text-sm font-semibold">Refine</h2>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <RotateCcw className="size-3" />
            Reset
          </button>
        </div>
        <FilterPanelBody filters={filters} onChange={onChange} />
      </div>
    </aside>
  );
}

/** Mobile bottom sheet. */
export function SearchFilterDrawer({
  open,
  onClose,
  filters,
  onChange,
  onReset,
}: {
  open: boolean;
  onClose: () => void;
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  onReset: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end lg:hidden" role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 bg-surface-sunken/75 backdrop-blur-sm"
      />
      <div className="rise relative max-h-[85vh] w-full overflow-y-auto rounded-t-3xl border-t border-border bg-popover p-5 pb-10 lift">
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-border" />
        <div className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <h2 className="truncate text-lg font-semibold">Filters</h2>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={onReset}
              className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="grid size-8 place-items-center rounded-full bg-secondary/70 text-muted-foreground"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        <FilterPanelBody filters={filters} onChange={onChange} />

        <button
          type="button"
          onClick={onClose}
          className="mt-7 w-full rounded-2xl signal-gradient px-4 py-3.5 text-sm font-semibold text-primary-foreground"
        >
          Show results
        </button>
      </div>
    </div>
  );
}

export { DEFAULT_FILTERS };