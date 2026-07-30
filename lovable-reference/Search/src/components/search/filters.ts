import {
  CONTENT_TYPES,
  DURATIONS,
  CREATOR_FILTERS,
  LANGUAGES,
  DATES,
  SORTS,
} from "@/data/search-data";

export type Filters = {
  type: (typeof CONTENT_TYPES)[number];
  duration: (typeof DURATIONS)[number];
  creator: (typeof CREATOR_FILTERS)[number];
  language: (typeof LANGUAGES)[number];
  date: (typeof DATES)[number];
  sort: (typeof SORTS)[number];
};

export const DEFAULT_FILTERS: Filters = {
  type: "All",
  duration: "Any",
  creator: "Anyone",
  language: "Any",
  date: "Anytime",
  sort: "Relevance",
};

export function countActiveFilters(f: Filters) {
  return (Object.keys(DEFAULT_FILTERS) as (keyof Filters)[]).filter(
    (k) => f[k] !== DEFAULT_FILTERS[k],
  ).length;
}