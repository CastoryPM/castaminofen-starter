import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { SearchHeader } from "./SearchHeader";
import { SearchHistory, SavedSearches } from "./SearchHistory";
import { TrendingSearches } from "./TrendingSearches";
import { CategoryExplorer } from "./CategoryExplorer";
import { MoodDiscovery, RelatedSearches, SemanticTeaser } from "./DiscoveryExtras";
import { SearchSuggestions } from "./SearchSuggestions";
import { SearchFilterBar } from "./SearchFilterBar";
import { SearchFilterDrawer, SearchFilterSidebar } from "./SearchFilterDrawer";
import { SearchResults } from "./SearchResults";
import { SearchEmptyState, SearchErrorState, SearchLoadingState } from "./SearchStates";
import { VoiceSearchModal } from "./VoiceSearch";
import { BottomNav } from "./BottomNav";
import { DEFAULT_FILTERS, countActiveFilters, type Filters } from "./filters";
import { RECENT_SEARCHES } from "@/data/search-data";

type Phase = "landing" | "typing" | "loading" | "results" | "empty" | "error";

/** Queries used to demo the empty and error presentation states. */
const EMPTY_TRIGGER = "zzz";
const ERROR_TRIGGER = "offline";

export function SearchPage() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [phase, setPhase] = useState<Phase>("landing");
  const [recents, setRecents] = useState<string[]>(RECENT_SEARCHES);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);

  const activeFilterCount = useMemo(() => countActiveFilters(filters), [filters]);

  function runSearch(q: string) {
    const value = q.trim();
    if (!value) {
      setPhase("landing");
      return;
    }
    setQuery(value);
    setSubmitted(value);
    setRecents((prev) => [value, ...prev.filter((r) => r !== value)].slice(0, 6));
    setPhase("loading");
    window.setTimeout(() => {
      const lower = value.toLowerCase();
      if (lower.includes(ERROR_TRIGGER)) setPhase("error");
      else if (lower.includes(EMPTY_TRIGGER)) setPhase("empty");
      else setPhase("results");
    }, 900);
  }

  function handleQueryChange(v: string) {
    setQuery(v);
    if (v.trim() === "") setPhase("landing");
    else if (phase === "landing" || phase === "typing") setPhase("typing");
  }

  const showResultsChrome = phase === "results" || phase === "loading" || phase === "empty";

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-12">
      <SearchHeader
        query={query}
        onQueryChange={handleQueryChange}
        onSubmit={() => runSearch(query)}
        onVoice={() => setVoiceOpen(true)}
        onFilters={() => setDrawerOpen(true)}
        activeFilterCount={activeFilterCount}
      />

      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {phase === "landing" ? (
          <div className="space-y-10 rise">
            <SearchHistory
              items={recents}
              onPick={runSearch}
              onRemove={(q) => setRecents((prev) => prev.filter((r) => r !== q))}
              onClear={() => setRecents([])}
            />
            <TrendingSearches onPick={runSearch} />
            <CategoryExplorer onPick={runSearch} />
            <MoodDiscovery onPick={runSearch} />
            <SavedSearches onPick={runSearch} />
            <SemanticTeaser />
            <RelatedSearches onPick={runSearch} />
          </div>
        ) : null}

        {phase === "typing" ? (
          <div className="space-y-8">
            <SearchSuggestions query={query} onPick={runSearch} onFill={setQuery} />
            <RelatedSearches onPick={runSearch} />
          </div>
        ) : null}

        {phase === "error" ? <SearchErrorState onRetry={() => runSearch(submitted)} /> : null}

        {showResultsChrome ? (
          <div className="lg:flex lg:gap-8">
            <SearchFilterSidebar
              filters={filters}
              onChange={(patch) => setFilters((f) => ({ ...f, ...patch }))}
              onReset={() => setFilters(DEFAULT_FILTERS)}
            />

            <div className="min-w-0 flex-1">
              <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    You searched for
                  </p>
                  <h2 className="mt-1 truncate text-xl font-bold sm:text-2xl">“{submitted}”</h2>
                </div>
                {activeFilterCount > 0 ? (
                  <button
                    type="button"
                    onClick={() => setFilters(DEFAULT_FILTERS)}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <RotateCcw className="size-3" />
                    Clear {activeFilterCount}
                  </button>
                ) : null}
              </div>

              <SearchFilterBar
                filters={filters}
                onChange={(patch) => setFilters((f) => ({ ...f, ...patch }))}
                onOpenDrawer={() => setDrawerOpen(true)}
                activeCount={activeFilterCount}
                resultCount={phase === "empty" ? 0 : 1284}
              />

              <div className="mt-6">
                {phase === "loading" ? <SearchLoadingState /> : null}
                {phase === "results" ? <SearchResults filters={filters} /> : null}
                {phase === "empty" ? (
                  <SearchEmptyState
                    query={submitted}
                    onExplore={() => {
                      setQuery("");
                      setPhase("landing");
                    }}
                    onSuggestion={runSearch}
                  />
                ) : null}
              </div>

              {phase === "results" ? (
                <div className="mt-12">
                  <RelatedSearches onPick={runSearch} />
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </main>

      <SearchFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onChange={(patch) => setFilters((f) => ({ ...f, ...patch }))}
        onReset={() => setFilters(DEFAULT_FILTERS)}
      />
      <VoiceSearchModal
        open={voiceOpen}
        onClose={() => setVoiceOpen(false)}
        onPick={(q) => {
          setVoiceOpen(false);
          runSearch(q);
        }}
      />
      <BottomNav active="search" />
    </div>
  );
}