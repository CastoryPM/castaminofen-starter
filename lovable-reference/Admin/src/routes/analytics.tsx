import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/admin/Panel";
import {
  AnalyticsBarChart,
  AnalyticsLineChart,
  ChartLegend,
  GrowthChart,
} from "@/components/admin/Charts";
import { StatusPill } from "@/components/admin/StatusPill";
import {
  contentPerformance,
  growthSeries,
  playerStats,
  retentionCohorts,
} from "@/data/admin-data";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics Center · Castaminofen Admin" },
      {
        name: "description",
        content: "DAU, WAU, MAU, retention, churn, content performance, player behaviour and community metrics.",
      },
      { property: "og:title", content: "Analytics Center · Castaminofen Admin" },
      { property: "og:description", content: "Advanced analytics across the Castaminofen platform." },
    ],
  }),
  component: AnalyticsPage,
});

const retentionSeries = [
  { key: "d1", label: "D1", color: "var(--color-chart-1)" },
  { key: "d7", label: "D7", color: "var(--color-chart-2)" },
  { key: "d30", label: "D30", color: "var(--color-chart-3)" },
];

function AnalyticsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Intelligence"
        title="Analytics Center"
        description="Audience, content, player and community signals in one decision surface."
        actions={
          <select className="h-9 rounded-lg border border-input bg-card px-3 text-sm outline-none">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Year to date</option>
          </select>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          ["DAU", "182,410", "+3.1%"],
          ["WAU", "612,880", "+4.4%"],
          ["MAU", "1,102,340", "+5.9%"],
          ["Retention D30", "41%", "+3 pts"],
          ["Churn", "3.8%", "-0.4 pts"],
        ].map(([label, value, delta]) => (
          <div key={label} className="surface-panel p-4">
            <p className="text-xs text-muted-foreground uppercase">{label}</p>
            <p className="mt-2 font-display text-2xl font-semibold tabular-nums">{value}</p>
            <StatusPill tone={delta.startsWith("-") ? "success" : "success"} className="mt-2">
              {delta}
            </StatusPill>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel
          title="Users"
          description="Growth and engagement trajectory"
          action={
            <ChartLegend
              series={[
                { label: "Users", color: "var(--color-chart-1)" },
                { label: "Engagement", color: "var(--color-chart-3)" },
              ]}
            />
          }
        >
          <GrowthChart
            data={growthSeries}
            xKey="month"
            series={[
              { key: "users", label: "Users", color: "var(--color-chart-1)" },
              { key: "engagement", label: "Engagement", color: "var(--color-chart-3)" },
            ]}
          />
        </Panel>

        <Panel title="Retention cohorts" description="Percent still active by cohort week">
          <AnalyticsBarChart data={retentionCohorts} xKey="cohort" series={retentionSeries} height={260} />
        </Panel>

        <Panel title="Content" description="Plays (k) and completion rate by format">
          <AnalyticsLineChart
            data={contentPerformance}
            xKey="format"
            series={[
              { key: "plays", label: "Plays (k)", color: "var(--color-chart-1)" },
              { key: "completion", label: "Completion %", color: "var(--color-chart-4)" },
            ]}
            height={260}
          />
        </Panel>

        <div className="space-y-4">
          <Panel title="Player" description="Playback behaviour, last 7 days">
            <div className="grid grid-cols-2 gap-3">
              {playerStats.map((p) => (
                <div key={p.label} className="rounded-lg border border-border/70 bg-muted/40 p-3">
                  <p className="text-xs text-muted-foreground">{p.label}</p>
                  <p className="mt-1 font-display text-xl font-semibold tabular-nums">{p.value}</p>
                  <p className="mt-0.5 text-[11px] text-success">{p.sub}</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Community" description="Contribution volume">
            <dl className="space-y-3">
              {[
                ["Posts", "62,410"],
                ["Replies", "122,092"],
                ["Contributors", "48,110"],
                ["Reply rate", "68%"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between text-sm">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-medium tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>
          </Panel>
        </div>
      </div>
    </>
  );
}
