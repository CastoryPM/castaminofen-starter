import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  Database,
  FileClock,
  Flag,
  LayoutDashboard,
  Layers,
  MessagesSquare,
  Mic2,
  PlaySquare,
  ScrollText,
  Settings2,
  ShieldCheck,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

export const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: "Overview",
    items: [{ to: "/", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Audience",
    items: [
      { to: "/users", label: "Users", icon: Users },
      { to: "/creators", label: "Creators", icon: Mic2 },
      { to: "/community", label: "Community", icon: MessagesSquare },
    ],
  },
  {
    label: "Catalog",
    items: [
      { to: "/content", label: "Content", icon: PlaySquare },
      { to: "/discovery", label: "Homepage & Discovery", icon: Layers },
      { to: "/notifications", label: "Notifications", icon: Bell },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { to: "/analytics", label: "Analytics", icon: BarChart3 },
      { to: "/database", label: "Database", icon: Database },
    ],
  },
  {
    label: "Platform",
    items: [
      { to: "/system", label: "System", icon: ScrollText },
      { to: "/flags", label: "Feature Flags", icon: Flag },
      { to: "/settings", label: "Settings", icon: Settings2 },
      { to: "/roles", label: "Roles & Access", icon: ShieldCheck },
      { to: "/audit", label: "Audit Logs", icon: FileClock },
    ],
  },
];

export function AdminSidebar({ collapsed }: { collapsed: boolean }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-300 md:flex",
        collapsed ? "w-[76px]" : "w-[264px]",
      )}
    >
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-5">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-primary)] font-display text-sm font-bold text-primary-foreground">
          C
        </span>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-semibold">Castaminofen</p>
            <p className="truncate text-[11px] text-muted-foreground">Command Center</p>
          </div>
        )}
      </div>

      <nav className="scroll-thin flex-1 overflow-y-auto px-3 py-4">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-5">
            {!collapsed && (
              <p className="px-3 pb-2 text-[10px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                {group.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.to;
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to as never}
                      title={item.label}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                      )}
                    >
                      {active && (
                        <span className="absolute top-1/2 left-0 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
                      )}
                      <item.icon
                        className={cn("size-4 shrink-0", active && "text-primary")}
                      />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {!collapsed && (
        <div className="m-3 rounded-xl border border-sidebar-border bg-elevated/60 p-3">
          <p className="text-xs font-semibold">Platform status</p>
          <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-warning" />1 service degraded
          </p>
        </div>
      )}
    </aside>
  );
}
