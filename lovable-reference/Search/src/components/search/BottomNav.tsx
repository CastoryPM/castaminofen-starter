import { Home, Library, PlusCircle, Search, MessagesSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { id: "home", label: "Home", icon: Home },
  { id: "library", label: "Library", icon: Library },
  { id: "create", label: "Create", icon: PlusCircle },
  { id: "search", label: "Search", icon: Search },
  { id: "community", label: "Community", icon: MessagesSquare },
  { id: "profile", label: "Profile", icon: User },
];

export function BottomNav({ active = "search" }: { active?: string }) {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/90 backdrop-blur-xl lg:hidden"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-6 px-1 pb-[env(safe-area-inset-bottom)]">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <button
                type="button"
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex h-16 w-full flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className={cn("size-5", isActive && "drop-shadow-[0_0_10px_var(--primary)]")} />
                <span className="truncate">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}