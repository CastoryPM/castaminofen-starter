import { useState } from "react";
import { Home, Library, PlusCircle, Search, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "library", label: "Library", icon: Library },
  { id: "create", label: "Create", icon: PlusCircle },
  { id: "search", label: "Search", icon: Search },
  { id: "community", label: "Community", icon: Users },
  { id: "profile", label: "Profile", icon: User },
];

/** Thumb-reachable bottom navigation, mobile-first; a rail on large screens. */
export function BottomNav() {
  const [active, setActive] = useState("home");

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl"
    >
      <ul className="mx-auto grid max-w-2xl grid-cols-6">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = id === active;
          return (
            <li key={id}>
              <button
                type="button"
                aria-current={isActive ? "page" : undefined}
                onClick={() => setActive(id)}
                className={cn(
                  "flex w-full flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  isActive ? "text-ember" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-5" strokeWidth={isActive ? 2.4 : 1.8} />
                <span className="truncate">{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
