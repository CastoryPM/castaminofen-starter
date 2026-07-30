import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Archive, CalendarClock, Pencil, Plus, Sparkles, Upload } from "lucide-react";
import { PageHeader, Panel } from "@/components/admin/Panel";
import { StatusPill, toneForStatus } from "@/components/admin/StatusPill";
import { contentItems, type ContentKind } from "@/data/admin-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/content")({
  head: () => ({
    meta: [
      { title: "Content Management · Castaminofen Admin" },
      {
        name: "description",
        content: "Create, edit, publish, schedule, archive and feature podcasts, videos, audiobooks and shorts.",
      },
      { property: "og:title", content: "Content Management · Castaminofen Admin" },
      { property: "og:description", content: "The Castaminofen catalog control surface." },
    ],
  }),
  component: ContentPage,
});

const tabs: (ContentKind | "All")[] = ["All", "Podcast", "Video", "Audiobook", "Short"];

function ContentPage() {
  const [tab, setTab] = useState<ContentKind | "All">("All");
  const [selected, setSelected] = useState(contentItems[0]);
  const list = contentItems.filter((c) => tab === "All" || c.kind === tab);

  return (
    <>
      <PageHeader
        eyebrow="Catalog"
        title="Content Management"
        description="96,204 items across four formats. Editorial workflow from draft to featured placement."
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            <Plus className="size-4" /> New content
          </button>
        }
      />

      <div className="flex flex-wrap gap-1 rounded-xl border border-border bg-card p-1">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors",
              tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Panel title="Library" description={`${list.length} items`} bodyClassName="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/70 text-left text-xs text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Title</th>
                  <th className="px-3 py-3 font-medium">Format</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-3 py-3 font-medium">Plays</th>
                  <th className="px-5 py-3 text-right font-medium">Updated</th>
                </tr>
              </thead>
              <tbody>
                {list.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelected(c)}
                    className={cn(
                      "cursor-pointer border-b border-border/40 last:border-0 hover:bg-muted/50",
                      c.id === selected.id && "bg-primary/6",
                    )}
                  >
                    <td className="px-5 py-3">
                      <p className="flex items-center gap-2 font-medium">
                        {c.featured && <Sparkles className="size-3.5 text-primary" />}
                        {c.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {c.creator} · {c.duration}
                      </p>
                    </td>
                    <td className="px-3 py-3">
                      <StatusPill tone="info">{c.kind}</StatusPill>
                    </td>
                    <td className="px-3 py-3">
                      <StatusPill tone={toneForStatus(c.status)} dot>
                        {c.status}
                      </StatusPill>
                    </td>
                    <td className="px-3 py-3 tabular-nums">{c.plays}</td>
                    <td className="px-5 py-3 text-right text-muted-foreground">{c.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Media editor" description={selected.id}>
          <div className="aspect-video w-full rounded-xl border border-border bg-[image:var(--gradient-surface)]">
            <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
              <Upload className="size-5" />
              <p className="text-xs">Drop artwork or media file</p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <Field label="Title" value={selected.title} />
            <Field label="Creator" value={selected.creator} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Format" value={selected.kind} />
              <Field label="Duration" value={selected.duration} />
            </div>
            <div>
              <p className="mb-1.5 text-xs text-muted-foreground">Description</p>
              <textarea
                rows={3}
                defaultValue="A deep dive into how attention is priced, traded and reclaimed in modern media."
                className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <label className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/40 px-3 py-2 text-sm">
              Featured on homepage
              <input type="checkbox" defaultChecked={selected.featured} className="size-4 accent-[var(--color-primary)]" />
            </label>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">
              <Pencil className="size-3.5" /> Save & publish
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium">
              <CalendarClock className="size-3.5" /> Schedule
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground">
              <Archive className="size-3.5" /> Archive
            </button>
          </div>
        </Panel>
      </div>
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1.5 text-xs text-muted-foreground">{label}</p>
      <input
        defaultValue={value}
        key={value}
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
      />
    </div>
  );
}
