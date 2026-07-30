import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { PageHeader, Panel } from "@/components/admin/Panel";
import { StatusPill, toneForStatus } from "@/components/admin/StatusPill";
import { AnalyticsLineChart } from "@/components/admin/Charts";
import { latencySeries, logLines, services } from "@/data/admin-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/system")({
  head: () => ({
    meta: [
      { title: "System Monitoring · Castaminofen Admin" },
      {
        name: "description",
        content: "API health, database status, error rates, logs and performance for Castaminofen.",
      },
      { property: "og:title", content: "System Monitoring · Castaminofen Admin" },
      { property: "og:description", content: "Service health and live log stream." },
    ],
  }),
  component: SystemPage,
});

const levelTone: Record<string, string> = {
  INFO: "text-info",
  WARN: "text-warning",
  ERROR: "text-destructive",
  DEBUG: "text-muted-foreground",
};

function SystemPage() {
  return (
    <>
      <PageHeader
        eyebrow="Platform"
        title="System Monitoring"
        description="Six core services. One degraded, one down — notification gateway needs attention."
        actions={
          <StatusPill tone="warning" dot>
            Partial outage
          </StatusPill>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div key={s.name} className="surface-panel p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium">{s.name}</p>
              <StatusPill tone={toneForStatus(s.status)} dot>
                {s.status}
              </StatusPill>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-[11px] text-muted-foreground">Latency</p>
                <p className="font-display text-lg font-semibold">{s.latency}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-muted-foreground">Uptime 30d</p>
                <p className="font-display text-lg font-semibold">{s.uptime}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel
          title="Performance"
          description="API and database latency over 24 hours"
          action={<Activity className="size-4 text-muted-foreground" />}
        >
          <AnalyticsLineChart
            data={latencySeries}
            xKey="t"
            series={[
              { key: "api", label: "API (ms)", color: "var(--color-chart-1)" },
              { key: "db", label: "DB (ms)", color: "var(--color-chart-3)" },
            ]}
            height={260}
          />
        </Panel>

        <Panel title="Logs" description="Live tail · all services" bodyClassName="p-0">
          <div className="scroll-thin max-h-[320px] overflow-y-auto">
            {logLines.map((l, i) => (
              <div
                key={i}
                className="flex gap-3 border-b border-border/40 px-4 py-2.5 font-mono text-xs last:border-0 hover:bg-muted/50"
              >
                <span className="text-muted-foreground">{l.time}</span>
                <span className={cn("w-12 shrink-0 font-semibold", levelTone[l.level])}>
                  {l.level}
                </span>
                <span className="min-w-0 flex-1 break-words">{l.msg}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
