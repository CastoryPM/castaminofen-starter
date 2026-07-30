import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/admin/Panel";
import { StatusPill } from "@/components/admin/StatusPill";
import { auditLogs } from "@/data/admin-data";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: "Audit Logs · Castaminofen Admin" },
      {
        name: "description",
        content: "Immutable trail of admin actions, changes and timestamps across Castaminofen.",
      },
      { property: "og:title", content: "Audit Logs · Castaminofen Admin" },
      { property: "og:description", content: "Who changed what, and when." },
    ],
  }),
  component: AuditPage,
});

function AuditPage() {
  return (
    <>
      <PageHeader
        eyebrow="Platform"
        title="Audit Logs"
        description="412,088 recorded admin events. Retained for 24 months, write-once."
        actions={
          <>
            <input
              placeholder="Filter by actor or action"
              className="h-9 w-56 rounded-lg border border-input bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
            />
            <StatusPill tone="neutral">immutable</StatusPill>
          </>
        }
      />

      <Panel bodyClassName="p-0">
        <ol className="relative">
          {auditLogs.map((l) => (
            <li
              key={l.id}
              className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-border/40 px-5 py-4 last:border-0 hover:bg-muted/40"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-secondary text-[11px] font-semibold">
                {l.actor.slice(0, 2).toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm">
                  <span className="font-medium">{l.actor}</span>{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-primary">
                    {l.action}
                  </code>{" "}
                  <span className="text-muted-foreground">{l.target}</span>
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {l.time} · IP {l.ip}
                </p>
              </div>
              <button className="text-xs font-medium text-muted-foreground hover:text-foreground">
                View diff
              </button>
            </li>
          ))}
        </ol>
      </Panel>
    </>
  );
}
