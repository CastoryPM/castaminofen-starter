import { Compass, Library, PlusCircle, Search, Users, User } from "lucide-react";

const items = [
  { label: "Home", icon: Compass },
  { label: "Library", icon: Library },
  { label: "Create", icon: PlusCircle },
  { label: "Search", icon: Search },
  { label: "Community", icon: Users },
  { label: "Profile", icon: User, active: true },
];

export function MobileNav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
    >
      <ul className="grid grid-cols-6">
        {items.map(({ label, icon: Icon, active }) => (
          <li key={label}>
            <button
              type="button"
              aria-current={active ? "page" : undefined}
              className={`silk flex h-16 w-full flex-col items-center justify-center gap-1 text-[10px] font-medium ${
                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2.2 : 1.6} />
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}