import { createFileRoute } from "@tanstack/react-router";
import { Flame, MessageSquare, ShieldAlert } from "lucide-react";
import { PageHeader, Panel } from "@/components/admin/Panel";
import { StatusPill, toneForStatus } from "@/components/admin/StatusPill";
import { discussions, moderationQueue } from "@/data/admin-data";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community Management · Castaminofen Admin" },
      {
        name: "description",
        content: "Discussions, reports, moderation queue and community health for Castaminofen.",
      },
      { property: "og:title", content: "Community Management · Castaminofen Admin" },
      { property: "og:description", content: "Keep conversations healthy and featured." },
    ],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Audience"
        title="Community Management"
        description="184,502 posts and replies this month. Four reports need a decision."
        actions={
          <StatusPill tone="danger" dot>
            1 critical report
          </StatusPill>
        }
      />

      <div className="grid gap-4 lg:grid-cols-4">
        {[
          ["Community health", "82 / 100", "success"],
          ["Open reports", "4", "warning"],
          ["Active discussions", "1,204", "info"],
          ["Contributors (30d)", "48,110", "primary"],
        ].map(([label, value, tone]) => (
          <div key={label} className="surface-panel p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground uppercase">{label}</p>
              <StatusPill tone={tone as "success"}>live</StatusPill>
            </div>
            <p className="mt-2 font-display text-2xl font-semibold">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel
          title="Moderation queue"
          description="Oldest first"
          action={<ShieldAlert className="size-4 text-destructive" />}
          bodyClassName="p-3"
        >
          <ul className="space-y-2">
            {moderationQueue.map((r) => (
              <li key={r.id} className="rounded-xl border border-border/70 bg-muted/30 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{r.target}</p>
                    <p className="text-xs text-muted-foreground">
                      {r.reason} · reported by {r.reporter} · {r.age}
                    </p>
                  </div>
                  <StatusPill tone={toneForStatus(r.severity)} dot>
                    {r.severity}
                  </StatusPill>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="rounded-md bg-destructive/12 px-2.5 py-1.5 text-xs font-medium text-destructive">
                    Remove
                  </button>
                  <button className="rounded-md bg-secondary px-2.5 py-1.5 text-xs font-medium">
                    Warn author
                  </button>
                  <button className="rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground">
                    Dismiss
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel
          title="Discussions"
          description="Featured and trending threads"
          action={<MessageSquare className="size-4 text-muted-foreground" />}
          bodyClassName="p-3"
        >
          <ul className="space-y-2">
            {discussions.map((d) => (
              <li
                key={d.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-muted/30 p-3"
              >
                <div className="min-w-0">
                  <p className="flex items-center gap-2 truncate text-sm font-medium">
                    {d.featured && <Flame className="size-3.5 text-primary" />}
                    {d.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {d.author} · {d.replies} replies
                  </p>
                </div>
                <StatusPill tone={toneForStatus(d.health)}>{d.health}</StatusPill>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
