import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Moon, PanelLeft, Search, Sun, X } from "lucide-react";
import { AdminSidebar, navGroups } from "./AdminSidebar";
import { cn } from "@/lib/utils";

function useTheme() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
  }, [dark]);
  return { dark, toggle: () => setDark((d) => !d) };
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { dark, toggle } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const current =
    navGroups.flatMap((g) => g.items).find((i) => i.to === pathname)?.label ?? "Dashboard";

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AdminSidebar collapsed={collapsed} />

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="scroll-thin absolute inset-y-0 left-0 w-[264px] overflow-y-auto border-r border-sidebar-border bg-sidebar p-3">
            <div className="mb-2 flex items-center justify-between px-2 py-2">
              <span className="font-display text-sm font-semibold">Castaminofen</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-md p-1 text-muted-foreground hover:bg-muted"
                aria-label="Close navigation"
              >
                <X className="size-4" />
              </button>
            </div>
            {navGroups.map((group) => (
              <div key={group.label} className="mb-4">
                <p className="px-3 pb-1.5 text-[10px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                  {group.label}
                </p>
                {group.items.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to as never}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                      pathname === item.to
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    <item.icon className="size-4" />
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-border/70 bg-background/80 px-4 backdrop-blur-xl md:px-8">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted md:hidden"
            aria-label="Open navigation"
          >
            <Menu className="size-4" />
          </button>
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="hidden rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:block"
            aria-label="Toggle sidebar"
          >
            <PanelLeft className="size-4" />
          </button>

          <div className="hidden items-center gap-2 text-sm text-muted-foreground lg:flex">
            <span>Admin</span>
            <span className="text-border">/</span>
            <span className="font-medium text-foreground">{current}</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search platform…"
                className="h-9 w-52 rounded-lg border border-input bg-card pl-9 text-sm outline-none transition-[width,box-shadow] focus:w-72 focus:ring-2 focus:ring-ring/40 lg:w-64"
              />
            </div>
            <button
              onClick={toggle}
              className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <div className="flex items-center gap-2 rounded-lg border border-border py-1 pr-3 pl-1">
              <span className="grid size-7 place-items-center rounded-md bg-[image:var(--gradient-primary)] text-xs font-bold text-primary-foreground">
                TL
              </span>
              <div className="hidden leading-tight sm:block">
                <p className="text-xs font-semibold">Tobias Lund</p>
                <p className="text-[10px] text-muted-foreground">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
          <div className="mx-auto max-w-[1500px] space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
