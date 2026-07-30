import { useRef } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { VoiceSearchButton } from "./VoiceSearch";

export function SearchInput({
  value,
  onChange,
  onSubmit,
  onVoice,
  onFilters,
  activeFilterCount,
  autoFocusOnMount,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onVoice: () => void;
  onFilters: () => void;
  activeFilterCount: number;
  autoFocusOnMount?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
        ref.current?.blur();
      }}
      role="search"
      className="glass group flex items-center gap-2 rounded-2xl px-3 py-2.5 transition-shadow duration-500 focus-within:glow-ring sm:rounded-3xl sm:px-4 sm:py-3"
    >
      <Search className="size-5 shrink-0 text-muted-foreground transition-colors group-focus-within:text-primary" />
      <input
        ref={ref}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={autoFocusOnMount}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search podcasts, videos, books, creators..."
        aria-label="Search Castaminofen"
        className="min-w-0 flex-1 bg-transparent text-base font-medium outline-none placeholder:font-normal placeholder:text-muted-foreground sm:text-lg"
      />
      {value ? (
        <button
          type="button"
          onClick={() => {
            onChange("");
            ref.current?.focus();
          }}
          aria-label="Clear search"
          className="grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      ) : null}
      <VoiceSearchButton onClick={onVoice} />
      <span className="h-6 w-px shrink-0 bg-border" />
      <button
        type="button"
        onClick={onFilters}
        aria-label="Open filters"
        className="relative grid size-9 shrink-0 place-items-center rounded-full bg-secondary/70 text-muted-foreground transition-colors duration-300 hover:bg-accent/15 hover:text-accent"
      >
        <SlidersHorizontal className="size-4" />
        {activeFilterCount > 0 ? (
          <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
            {activeFilterCount}
          </span>
        ) : null}
      </button>
    </form>
  );
}