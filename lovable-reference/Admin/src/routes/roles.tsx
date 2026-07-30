import { createFileRoute } from "@tanstack/react-router";
import { Check, Minus, ShieldCheck } from "lucide-react";
import { PageHeader, Panel } from "@/components/admin/Panel";
import { StatusPill } from "@/components/admin/StatusPill";
import { adminRoles, permissionMatrix } from "@/data/admin-data";

export const Route = createFileRoute("/roles")({
  head: () => ({
    meta: [
      { title: "Admin Roles & Permissions · Castaminofen Admin" },
      {
        name: "description",
        content: "Define admin roles, permission scopes, access levels and security settings.",
      },
      { property: "og:title", content: "Admin Roles & Permissions · Castaminofen Admin" },
      { property: "og:description", content: "Least-privilege access control for the admin team." },
    ],
  }),
  component: RolesPage,
});

const columns = ["superAdmin", "contentLead", "moderator", "analyst"] as const;
const columnLabels = ["Super Admin", "Content Lead", "Moderator", "Analyst"];

function RolesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Platform"
        title="Admin Roles & Permissions"
        description="42 team members across four roles. Least privilege by default."
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">
            <ShieldCheck className="size-4" /> New role
          </button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-4">
        {adminRoles.map((r) => (
          <div key={r.name} className="surface-panel p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="font-display text-base font-semibold">{r.name}</p>
              <StatusPill tone={r.level === "Full access" ? "primary" : "info"}>{r.level}</StatusPill>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{r.members} members</p>
            <ul className="mt-3 space-y-1">
              {r.scope.map((s) => (
                <li key={s} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Check className="size-3 text-success" /> {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Panel title="Permission matrix" description="Capability access by role" bodyClassName="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/70 text-left text-xs text-muted-foreground">
                <th className="px-5 py-3 font-medium">Capability</th>
                {columnLabels.map((c) => (
                  <th key={c} className="px-3 py-3 text-center font-medium">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissionMatrix.map((row) => (
                <tr key={row.capability} className="border-b border-border/40 last:border-0 hover:bg-muted/40">
                  <td className="px-5 py-3 font-medium">{row.capability}</td>
                  {columns.map((c) => (
                    <td key={c} className="px-3 py-3 text-center">
                      {row[c] ? (
                        <Check className="mx-auto size-4 text-success" />
                      ) : (
                        <Minus className="mx-auto size-4 text-muted-foreground/50" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="Security settings" description="Applies to all admin accounts">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Require 2FA", "Enforced for all admin roles", true],
            ["IP allowlist", "Office and VPN ranges only", true],
            ["Session timeout", "30 minutes of inactivity", true],
            ["Sensitive action re-auth", "Password prompt before destructive actions", false],
          ].map(([label, hint, on]) => (
            <div
              key={label as string}
              className="flex items-center justify-between gap-3 rounded-lg border border-border/70 bg-muted/40 px-3 py-3"
            >
              <div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">{hint}</p>
              </div>
              <StatusPill tone={on ? "success" : "neutral"} dot>
                {on ? "On" : "Off"}
              </StatusPill>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
