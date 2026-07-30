import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Filter, Play, Table2 } from "lucide-react";
import { PageHeader, Panel } from "@/components/admin/Panel";
import { StatusPill } from "@/components/admin/StatusPill";
import { dbRecords, dbTables } from "@/data/admin-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/database")({
  head: () => ({
    meta: [
      { title: "Database Explorer · Castaminofen Admin" },
      {
        name: "description",
        content: "Browse tables, records, relations and filters in the Castaminofen data model.",
      },
      { property: "og:title", content: "Database Explorer · Castaminofen Admin" },
      { property: "og:description", content: "Developer-friendly data exploration interface." },
    ],
  }),
  component: DatabasePage,
});

function DatabasePage() {
  const [table, setTable] = useState(dbTables[0]);

  return (
    <>
      <PageHeader
        eyebrow="Intelligence"
        title="Database Explorer"
        description="Read-only structural view of the platform data model. No writes from this surface."
        actions={<StatusPill tone="info">read-only</StatusPill>}
      />

      <div className="grid gap-4 xl:grid-cols-[280px_1fr]">
        <Panel title="Tables" description={`${dbTables.length} tables`} bodyClassName="p-2">
          <ul className="space-y-0.5">
            {dbTables.map((t) => (
              <li key={t.name}>
                <button
                  onClick={() => setTable(t)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                    t.name === table.name
                      ? "bg-primary/12 text-primary"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  <Table2 className="size-3.5 shrink-0" />
                  <span className="flex-1 truncate font-mono text-xs">{t.name}</span>
                  <span className="text-[10px] tabular-nums">{t.rows}</span>
                </button>
              </li>
            ))}
          </ul>
        </Panel>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Rows", table.rows],
              ["Size on disk", table.size],
              ["Relations", String(table.relations.length)],
            ].map(([k, v]) => (
              <div key={k} className="surface-panel p-4">
                <p className="text-xs text-muted-foreground uppercase">{k}</p>
                <p className="mt-1.5 font-display text-xl font-semibold">{v}</p>
              </div>
            ))}
          </div>

          <Panel
            title={`public.${table.name}`}
            description="Sample records"
            bodyClassName="p-0"
            action={
              <div className="flex items-center gap-2">
                <input
                  placeholder="where …"
                  className="h-8 w-40 rounded-lg border border-input bg-background px-2.5 font-mono text-xs outline-none focus:ring-2 focus:ring-ring/40"
                />
                <button className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium">
                  <Filter className="size-3.5" /> Filter
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-2.5 py-1.5 text-xs font-semibold text-primary-foreground">
                  <Play className="size-3.5" /> Run
                </button>
              </div>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-xs">
                <thead>
                  <tr className="border-b border-border/70 text-left text-muted-foreground">
                    {Object.keys(dbRecords[0]).map((k) => (
                      <th key={k} className="px-4 py-3 font-medium">
                        {k}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dbRecords.map((r) => (
                    <tr key={r.id} className="border-b border-border/40 last:border-0 hover:bg-muted/50">
                      {Object.values(r).map((v, i) => (
                        <td key={i} className="px-4 py-2.5 whitespace-nowrap">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel title="Relations preview" description="Foreign key graph for this table">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 font-mono text-xs text-primary">
                {table.name}
              </span>
              <span className="text-muted-foreground">→</span>
              {table.relations.map((r) => (
                <span
                  key={r}
                  className="rounded-lg border border-border bg-muted/50 px-3 py-2 font-mono text-xs"
                >
                  {r}
                </span>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}
