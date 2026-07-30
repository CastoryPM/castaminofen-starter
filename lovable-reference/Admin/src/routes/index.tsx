import { createFileRoute } from "@tanstack/react-router";
import { Download, Radio } from "lucide-react";
import { PageHeader, Panel } from "@/components/admin/Panel";
import { MetricCard } from "@/components/admin/MetricCard";
import { ActivityFeed } from "@/components/admin/ActivityFeed";
import { AnalyticsBarChart, ChartLegend, GrowthChart } from "@/components/admin/Charts";
import { StatusPill } from "@/components/admin/StatusPill";
import { contentPerformance, growthSeries, platformMetrics } from "@/data/admin-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Executive Overview · Castaminofen Admin" },
      {
        name: "description",
        content:
          "Platform metrics, growth charts and live activity across the Castaminofen multimedia ecosystem.",
      },
      { property: "og:title", content: "Executive Overview · Castaminofen Admin" },
      {
        property: "og:description",
        content: "Real-time pulse of users, creators, content and community.",
      },
    ],
  }),
  component: Overview,
});

const growthSeriesDef = [
  { key: "users", label: "Users (k)", color: "var(--color-chart-1)" },
  { key: "content", label: "Content (100s)", color: "var(--color-chart-2)" },
  { key: "engagement", label: "Engagement (k)", color: "var(--color-chart-3)" },
];

function Overview() {
  return (
    <>
      <PageHeader
        eyebrow="Executive Overview"
        title="Good morning, Tobias"
        description="Castaminofen is growing steadily. Listening hours are up 7.6% and one service needs attention."
        actions={
          <>
            <StatusPill tone="success" dot>
              Live
            </StatusPill>
            <button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">
              <Download className="size-4" /> Export report
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {platformMetrics.map((m, i) => (
          <MetricCard key={m.label} {...m} accent={i === 0} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Panel
          className="xl:col-span-2"
          title="Growth"
          description="Users, published content and engagement over the last 9 months"
          action={<ChartLegend series={growthSeriesDef} />}
        >
          <GrowthChart data={growthSeries} xKey="month" series={growthSeriesDef} height={300} />
        </Panel>

        <Panel
          title="Live activity"
          description="Platform-wide event stream"
          action={
            <span className="flex items-center gap-1.5 text-xs text-success">
              <Radio className="size-3.5" /> streaming
            </span>
          }
        >
          <ActivityFeed />
        </Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Panel
          className="xl:col-span-2"
          title="Format performance"
          description="Plays (thousands) and completion rate by format"
        >
          <AnalyticsBarChart
            data={contentPerformance}
            xKey="format"
            series={[
              { key: "plays", label: "Plays (k)", color: "var(--color-chart-1)" },
              { key: "completion", label: "Completion %", color: "var(--color-chart-2)" },
            ]}
          />
        </Panel>

        <Panel title="Today at a glance" description="Rolling 24-hour snapshot">
          <dl className="space-y-4">
            {[
              ["New signups", "4,812", "+9%"],
              ["Episodes published", "312", "+4%"],
              ["Moderation reports", "48", "-12%"],
              ["Peak concurrent listeners", "61,204", "+3%"],
              ["Creator applications", "27", "+18%"],
            ].map(([label, value, delta]) => (
              <div key={label} className="flex items-center justify-between gap-4">
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="flex items-center gap-2">
                  <span className="font-display text-sm font-semibold tabular-nums">{value}</span>
                  <StatusPill tone={delta.startsWith("-") ? "danger" : "success"}>{delta}</StatusPill>
                </dd>
              </div>
            ))}
          </dl>
        </Panel>
      </div>
    </>
  );
}
