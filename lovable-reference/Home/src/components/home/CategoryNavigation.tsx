import { useState } from "react";
import { categories } from "@/data/home";
import { cn } from "@/lib/utils";

/**
 * Content universe navigation. A sticky scrollable pill rail rather than
 * generic tabs — it stays reachable while the page scrolls.
 */
export function CategoryNavigation({
  onChange,
}: {
  onChange?: (id: string) => void;
}) {
  const [active, setActive] = useState<string>("all");

  return (
    <nav
      aria-label="Content categories"
      className="sticky top-[57px] z-30 border-y border-hairline bg-background/85 backdrop-blur-xl lg:top-[69px]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rail edge-fade -mx-1 gap-2 py-3">
          {categories.map((c) => {
            const isActive = c.id === active;
            return (
              <button
                key={c.id}
                type="button"
                aria-current={isActive ? "true" : undefined}
                onClick={() => {
                  setActive(c.id);
                  onChange?.(c.id);
                }}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  isActive
                    ? "bg-[image:var(--gradient-ember)] text-primary-foreground"
                    : "border border-border bg-surface text-muted-foreground hover:text-foreground",
                )}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
