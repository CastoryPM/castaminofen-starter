import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, UserPlus } from "lucide-react";
import { PageHeader, Panel } from "@/components/admin/Panel";
import { StatusPill, toneForStatus } from "@/components/admin/StatusPill";
import { AnalyticsBarChart } from "@/components/admin/Charts";
import { users, userActivity, type Role } from "@/data/admin-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/users")({
  head: () => ({
    meta: [
      { title: "User Management · Castaminofen Admin" },
      {
        name: "description",
        content: "Search, filter and inspect Castaminofen users, roles and activity.",
      },
      { property: "og:title", content: "User Management · Castaminofen Admin" },
      { property: "og:description", content: "Users, roles and activity overview." },
    ],
  }),
  component: UsersPage,
});

const roles: (Role | "All")[] = ["All", "User", "Creator", "Moderator", "Admin"];

function UsersPage() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<Role | "All">("All");
  const [selectedId, setSelectedId] = useState(users[0].id);

  const filtered = useMemo(
    () =>
      users.filter(
        (u) =>
          (role === "All" || u.role === role) &&
          (u.name.toLowerCase().includes(query.toLowerCase()) ||
            u.email.toLowerCase().includes(query.toLowerCase())),
      ),
    [query, role],
  );

  const selected = users.find((u) => u.id === selectedId) ?? users[0];

  return (
    <>
      <PageHeader
        eyebrow="Audience"
        title="User Management"
        description="1,284,930 accounts across four role levels. Search, filter and inspect any profile."
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            <UserPlus className="size-4" /> Invite user
          </button>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1.7fr_1fr]">
        <Panel
          title="All users"
          description={`${filtered.length} results`}
          bodyClassName="p-0"
          action={
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search users"
                  className="h-8 w-44 rounded-lg border border-input bg-background pl-8 text-xs outline-none focus:ring-2 focus:ring-ring/40"
                />
              </div>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role | "All")}
                className="h-8 rounded-lg border border-input bg-background px-2 text-xs outline-none focus:ring-2 focus:ring-ring/40"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/70 text-left text-xs text-muted-foreground">
                  <th className="px-5 py-3 font-medium">User</th>
                  <th className="px-3 py-3 font-medium">Role</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-3 py-3 font-medium">Plan</th>
                  <th className="px-3 py-3 font-medium">Joined</th>
                  <th className="px-5 py-3 text-right font-medium">Hours</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr
                    key={u.id}
                    onClick={() => setSelectedId(u.id)}
                    className={cn(
                      "cursor-pointer border-b border-border/40 transition-colors last:border-0 hover:bg-muted/50",
                      u.id === selectedId && "bg-primary/6",
                    )}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-secondary text-xs font-semibold">
                          {u.name.split(" ").map((p) => p[0]).join("")}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-medium">{u.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <StatusPill tone={u.role === "Admin" ? "primary" : "info"}>{u.role}</StatusPill>
                    </td>
                    <td className="px-3 py-3">
                      <StatusPill tone={toneForStatus(u.status)} dot>
                        {u.status}
                      </StatusPill>
                    </td>
                    <td className="px-3 py-3 text-muted-foreground">{u.plan}</td>
                    <td className="px-3 py-3 text-muted-foreground">{u.joined}</td>
                    <td className="px-5 py-3 text-right tabular-nums">{u.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel title="User detail" description={selected.id}>
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-xl bg-[image:var(--gradient-primary)] font-display text-base font-bold text-primary-foreground">
                {selected.name.split(" ").map((p) => p[0]).join("")}
              </span>
              <div>
                <p className="font-display text-lg font-semibold">{selected.name}</p>
                <p className="text-xs text-muted-foreground">{selected.email}</p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                ["Role", selected.role],
                ["Status", selected.status],
                ["Plan", selected.plan],
                ["Joined", selected.joined],
                ["Sessions", String(selected.sessions)],
                ["Listening hours", String(selected.hours)],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg border border-border/70 bg-muted/40 px-3 py-2">
                  <p className="text-[11px] text-muted-foreground">{k}</p>
                  <p className="mt-0.5 text-sm font-medium">{v}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button className="rounded-lg bg-secondary px-3 py-2 text-xs font-medium">Change role</button>
              <button className="rounded-lg bg-secondary px-3 py-2 text-xs font-medium">Reset password</button>
              <button className="rounded-lg border border-destructive/30 px-3 py-2 text-xs font-medium text-destructive">
                Suspend
              </button>
            </div>
          </Panel>

          <Panel title="Activity overview" description="Listening minutes, last 7 days">
            <AnalyticsBarChart
              data={userActivity}
              xKey="day"
              series={[{ key: "minutes", label: "Minutes", color: "var(--color-chart-1)" }]}
              height={200}
            />
          </Panel>
        </div>
      </div>
    </>
  );
}
