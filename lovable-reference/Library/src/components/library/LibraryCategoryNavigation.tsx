import { cn } from "@/lib/utils";

export const libraryCategories = [
  "All",
  "Podcasts",
  "Videos",
  "Audiobooks",
  "Shorts",
  "Favorites",
  "Collections",
  "History",
] as const;

export type LibraryCategory = (typeof libraryCategories)[number];

export function LibraryCategoryNavigation({
  active,
  onChange,
}: {
  active: LibraryCategory;
  onChange: (value: LibraryCategory) => void;
}) {
  return (
    <nav
      aria-label="Library categories"
      className="sticky top-0 z-30 -mx-5 border-b border-border bg-background/85 px-5 py-3 backdrop-blur-xl"
    >
      <div className="rail edge-fade">
        {libraryCategories.map((category) => {
          const isActive = category === active;
          return (
            <button
              key={category}
              onClick={() => onChange(category)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition-colors duration-300",
                isActive
                  ? "ember-fill font-medium"
                  : "border border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {category}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
