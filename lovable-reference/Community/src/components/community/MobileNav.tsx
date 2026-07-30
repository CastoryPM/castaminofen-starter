import { cn } from "@/lib/utils";

const items = [
  { id: "home", label: "Home", glyph: "◉" },
  { id: "library", label: "Library", glyph: "▤" },
  { id: "create", label: "Create", glyph: "+" },
  { id: "search", label: "Search", glyph: "⌕" },
  { id: "community", label: "Community", glyph: "◍" },
  { id: "profile", label: "Profile", glyph: "◐" },
];

export function MobileNav({ onCreate }: { onCreate: () => void }) {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
    >
      <ul className="grid grid-cols-6">
        {items.map((it) => {
          const active = it.id === "community";
          const isCreate = it.id === "create";
          return (
            <li key={it.id}>
              <button
                type="button"
                onClick={isCreate ? onCreate : undefined}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "focus-ring flex w-full flex-col items-center gap-1 py-2.5 text-[10px] transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "grid h-7 w-7 place-items-center rounded-full text-sm",
                    isCreate && "bg-primary text-primary-foreground",
                    active && !isCreate && "bg-primary/12",
                  )}
                  aria-hidden
                >
                  {it.glyph}
                </span>
                {it.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
