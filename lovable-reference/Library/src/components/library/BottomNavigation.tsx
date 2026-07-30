import { Home, Library, PlusCircle, Search, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Home", icon: Home },
  { label: "Library", icon: Library, active: true },
  { label: "Create", icon: PlusCircle },
  { label: "Search", icon: Search },
  { label: "Community", icon: Users },
  { label: "Profile", icon: User },
];

export function BottomNavigation() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-between px-2">
        {items.map((item) => (
          <li key={item.label} className="flex-1">
            <button
              aria-current={item.active ? "page" : undefined}
              className={cn(
                "flex w-full flex-col items-center gap-1 py-2.5 text-[10px] transition-colors",
                item.active ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon className="size-5" />
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
