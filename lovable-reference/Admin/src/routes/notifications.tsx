import { createFileRoute } from "@tanstack/react-router";
import { Megaphone, Send } from "lucide-react";
import { PageHeader, Panel } from "@/components/admin/Panel";
import { StatusPill, toneForStatus } from "@/components/admin/StatusPill";
import { campaigns } from "@/data/admin-data";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notification Center · Castaminofen Admin" },
      {
        name: "description",
        content: "Push notifications, campaigns and platform announcements for Castaminofen.",
      },
      { property: "og:title", content: "Notification Center · Castaminofen Admin" },
      { property: "og:description", content: "Compose and schedule audience messaging." },
    ],
  }),
  component: NotificationsPage,
});

function NotificationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Catalog"
        title="Notification Center"
        description="Reach 1.2M listeners across push, in-app, email and announcements."
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">
            <Megaphone className="size-4" /> New campaign
          </button>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <Panel title="Campaigns" description="All channels" bodyClassName="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/70 text-left text-xs text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Campaign</th>
                  <th className="px-3 py-3 font-medium">Channel</th>
                  <th className="px-3 py-3 font-medium">Audience</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-3 py-3 font-medium">Reach</th>
                  <th className="px-5 py-3 text-right font-medium">When</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.id} className="border-b border-border/40 last:border-0 hover:bg-muted/50">
                    <td className="px-5 py-3 font-medium">{c.title}</td>
                    <td className="px-3 py-3">
                      <StatusPill tone="info">{c.channel}</StatusPill>
                    </td>
                    <td className="px-3 py-3 text-muted-foreground">{c.audience}</td>
                    <td className="px-3 py-3">
                      <StatusPill tone={toneForStatus(c.status)} dot>
                        {c.status}
                      </StatusPill>
                    </td>
                    <td className="px-3 py-3 tabular-nums">{c.reach}</td>
                    <td className="px-5 py-3 text-right text-muted-foreground">{c.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Composer" description="Draft a new announcement">
          <div className="space-y-3">
            <div>
              <p className="mb-1.5 text-xs text-muted-foreground">Title</p>
              <input
                placeholder="Season premiere is live"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <div>
              <p className="mb-1.5 text-xs text-muted-foreground">Message</p>
              <textarea
                rows={4}
                placeholder="Tell listeners what just landed…"
                className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="mb-1.5 text-xs text-muted-foreground">Channel</p>
                <select className="h-9 w-full rounded-lg border border-input bg-background px-2 text-sm outline-none">
                  <option>Push</option>
                  <option>In-app</option>
                  <option>Email</option>
                  <option>Announcement</option>
                </select>
              </div>
              <div>
                <p className="mb-1.5 text-xs text-muted-foreground">Audience</p>
                <select className="h-9 w-full rounded-lg border border-input bg-background px-2 text-sm outline-none">
                  <option>Everyone</option>
                  <option>Premium</option>
                  <option>Creators</option>
                  <option>Inactive 30d</option>
                </select>
              </div>
            </div>

            <div className="rounded-xl border border-border/70 bg-muted/40 p-3">
              <p className="text-[11px] text-muted-foreground uppercase">Preview</p>
              <div className="mt-2 rounded-lg border border-border bg-card p-3">
                <p className="text-sm font-semibold">Castaminofen</p>
                <p className="text-xs text-muted-foreground">
                  Season premiere is live — tap to listen now.
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">
                <Send className="size-4" /> Send now
              </button>
              <button className="rounded-lg border border-border px-3 py-2 text-sm font-medium">
                Schedule
              </button>
            </div>
          </div>
        </Panel>
      </div>
    </>
  );
}
