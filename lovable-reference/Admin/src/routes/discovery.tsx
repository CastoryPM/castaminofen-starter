import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, GripVertical, Sparkles } from "lucide-react";
import { PageHeader, Panel } from "@/components/admin/Panel";
import { StatusPill } from "@/components/admin/StatusPill";
import { contentItems, homepageSections } from "@/data/admin-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/discovery")({
  head: () => ({
    meta: [
      { title: "Homepage & Discovery · Castaminofen Admin" },
      {
        name: "description",
        content: "Reorder homepage sections, toggle blocks and curate featured Castaminofen content.",
      },
      { property: "og:title", content: "Homepage & Discovery · Castaminofen Admin" },
      { property: "og:description", content: "Curate the first screen of Castaminofen." },
    ],
  }),
  component: DiscoveryPage,
});

function DiscoveryPage() {
  const [sections, setSections] = useState(homepageSections);

  const move = (index: number, dir: -1 | 1) => {
    const next = [...sections];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setSections(next);
  };

  const toggle = (id: string) =>
    setSections((s) => s.map((x) => (x.id === id ? { ...x, enabled: !x.enabled } : x)));

  return (
    <>
      <PageHeader
        eyebrow="Catalog"
        title="Homepage & Discovery"
        description="Compose the first screen every listener sees. Order, visibility and editorial picks."
      />

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <Panel title="Homepage sections" description="Drag order top to bottom" bodyClassName="p-3">
          <ul className="space-y-2">
            {sections.map((s, i) => (
              <li
                key={s.id}
                className={cn(
                  "flex items-center gap-3 rounded-xl border border-border/70 bg-muted/30 p-3 transition-opacity",
                  !s.enabled && "opacity-55",
                )}
              >
                <GripVertical className="size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-sm font-medium">
                    {s.name}
                    <StatusPill tone="info">{s.type}</StatusPill>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {s.items} items · {s.note}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => move(i, -1)}
                    className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-muted"
                    aria-label="Move up"
                  >
                    <ArrowUp className="size-3.5" />
                  </button>
                  <button
                    onClick={() => move(i, 1)}
                    className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-muted"
                    aria-label="Move down"
                  >
                    <ArrowDown className="size-3.5" />
                  </button>
                  <button
                    onClick={() => toggle(s.id)}
                    className={cn(
                      "ml-1 h-6 w-11 rounded-full p-0.5 transition-colors",
                      s.enabled ? "bg-primary" : "bg-secondary",
                    )}
                    aria-label="Toggle section"
                  >
                    <span
                      className={cn(
                        "block size-5 rounded-full bg-card transition-transform",
                        s.enabled && "translate-x-5",
                      )}
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <div className="space-y-4">
          <Panel title="Hero spotlight" description="Currently rotating placements">
            <ul className="space-y-2">
              {contentItems
                .filter((c) => c.featured)
                .map((c) => (
                  <li
                    key={c.id}
                    className="flex items-center gap-3 rounded-lg border border-border/70 bg-muted/30 p-3"
                  >
                    <Sparkles className="size-4 text-primary" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{c.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {c.kind} · {c.creator}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
            <button className="mt-3 w-full rounded-lg border border-dashed border-border py-2 text-xs font-medium text-muted-foreground hover:bg-muted">
              + Select featured content
            </button>
          </Panel>

          <Panel title="Live preview" description="Approximate homepage rendering">
            <div className="space-y-2 rounded-xl border border-border bg-background p-3">
              {sections
                .filter((s) => s.enabled)
                .map((s) => (
                  <div key={s.id} className="rounded-lg bg-muted/60 p-3">
                    <p className="text-[11px] font-semibold tracking-wide uppercase">{s.name}</p>
                    <div className="mt-2 flex gap-2">
                      {Array.from({ length: Math.min(4, s.items) }).map((_, i) => (
                        <div key={i} className="h-10 flex-1 rounded-md bg-elevated" />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}
