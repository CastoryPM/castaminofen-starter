import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, TrendingUp } from "lucide-react";
import { PageHeader, Panel } from "@/components/admin/Panel";
import { StatusPill } from "@/components/admin/StatusPill";
import { GrowthChart } from "@/components/admin/Charts";
import { creators, growthSeries } from "@/data/admin-data";

export const Route = createFileRoute("/creators")({
  head: () => ({
    meta: [
      { title: "Creator Management · Castaminofen Admin" },
      {
        name: "description",
        content: "Verify creators, review analytics, published content and growth metrics.",
      },
      { property: "og:title", content: "Creator Management · Castaminofen Admin" },
      { property: "og:description", content: "Verification, analytics and creator growth." },
    ],
  }),
  component: CreatorsPage,
});

function CreatorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Audience"
        title="Creator Management"
        description="8,412 creators power the catalog. Verify applicants and track who is breaking out."
        actions={
          <StatusPill tone="warning" dot>
            12 pending verifications
          </StatusPill>
        }
      />

      <div className="grid gap-4 lg:grid-cols-4">
        {[
          ["Verified creators", "6,204"],
          ["Pending review", "12"],
          ["Avg. monthly uploads", "4.8"],
          ["Creator retention", "88%"],
        ].map(([label, value]) => (
          <div key={label} className="surface-panel p-4">
            <p className="text-xs text-muted-foreground uppercase">{label}</p>
            <p className="mt-2 font-display text-2xl font-semibold">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Panel title="Creators" description="Sorted by reach" bodyClassName="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/70 text-left text-xs text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Creator</th>
                  <th className="px-3 py-3 font-medium">Tier</th>
                  <th className="px-3 py-3 font-medium">Followers</th>
                  <th className="px-3 py-3 font-medium">Published</th>
                  <th className="px-3 py-3 font-medium">Hours</th>
                  <th className="px-5 py-3 text-right font-medium">Growth</th>
                </tr>
              </thead>
              <tbody>
                {creators.map((c) => (
                  <tr key={c.id} className="border-b border-border/40 last:border-0 hover:bg-muted/50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <span className="grid size-8 place-items-center rounded-lg bg-secondary text-xs font-semibold">
                          {c.name[0]}
                        </span>
                        <div>
                          <p className="flex items-center gap-1.5 font-medium">
                            {c.name}
                            {c.verified && <BadgeCheck className="size-3.5 text-accent" />}
                          </p>
                          <p className="text-xs text-muted-foreground">{c.handle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <StatusPill tone={c.tier === "Flagship" ? "primary" : "info"}>{c.tier}</StatusPill>
                    </td>
                    <td className="px-3 py-3 tabular-nums">{c.followers}</td>
                    <td className="px-3 py-3 tabular-nums">{c.published}</td>
                    <td className="px-3 py-3 tabular-nums">{c.hours}</td>
                    <td className="px-5 py-3 text-right text-success tabular-nums">{c.growth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel title="Verification queue" description="Applications awaiting review">
            <ul className="space-y-3">
              {creators
                .filter((c) => !c.verified)
                .map((c) => (
                  <li
                    key={c.id}
                    className="rounded-lg border border-border/70 bg-muted/40 p-3"
                  >
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.handle} · {c.published} uploads · {c.followers} followers
                    </p>
                    <div className="mt-3 flex gap-2">
                      <button className="rounded-md bg-primary px-2.5 py-1.5 text-xs font-semibold text-primary-foreground">
                        Verify
                      </button>
                      <button className="rounded-md border border-border px-2.5 py-1.5 text-xs font-medium">
                        Request info
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </Panel>

          <Panel
            title="Creator growth"
            description="Aggregate creator output and reach"
            action={<TrendingUp className="size-4 text-success" />}
          >
            <GrowthChart
              data={growthSeries}
              xKey="month"
              series={[
                { key: "content", label: "Uploads", color: "var(--color-chart-1)" },
                { key: "engagement", label: "Engagement", color: "var(--color-chart-3)" },
              ]}
              height={200}
            />
          </Panel>
        </div>
      </div>
    </>
  );
}
