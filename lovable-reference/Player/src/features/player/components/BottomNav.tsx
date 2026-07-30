import { Compass, Home, Library, PlusCircle, Search, User } from "lucide-react";

const items = [
  { label: "Home", icon: Home },
  { label: "Library", icon: Library },
  { label: "Create", icon: PlusCircle },
  { label: "Search", icon: Search },
  { label: "Community", icon: Compass },
  { label: "Profile", icon: User },
];

export function BottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface-sunken/90 backdrop-blur-xl md:hidden"
    >
      <ul className="grid grid-cols-6">
        {items.map(({ label, icon: Icon }, i) => (
          <li key={label}>
            <button
              className={`flex w-full flex-col items-center gap-1 py-2.5 text-[10px] ${
                i === 4 ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-[18px] w-[18px]" />
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
