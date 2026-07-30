import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/admin/Panel";
import { StatusPill } from "@/components/admin/StatusPill";
import { featureFlags } from "@/data/admin-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/flags")({
  head: () => ({
    meta: [
      { title: "Feature Flags · Castaminofen Admin" },
      {
        name: "description",
        content: "Toggle Castaminofen capabilities on, off or into beta with staged rollouts.",
      },
      { property: "og:title", content: "Feature Flags · Castaminofen Admin" },
      { property: "og:description", content: "Staged rollout control for platform features." },
    ],
  }),
  component: FlagsPage,
});

const states = ["ON", "BETA", "OFF"] as const;

function FlagsPage() {
  const [flags, setFlags] = useState(featureFlags);

  const setState = (key: string, state: string) =>
    setFlags((f) =>
      f.map((x) =>
        x.key === key
          ? { ...x, state, rollout: state === "ON" ? 100 : state === "OFF" ? 0 : x.rollout || 25 }
          : x,
      ),
    );

  return (
    <>
      <PageHeader
        eyebrow="Platform"
        title="Feature Flags"
        description="Ship carefully. Every change here is written to the audit log."
      />

      <div className="grid gap-4">
        {flags.map((f) => (
          <Panel key={f.key} bodyClassName="p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="flex items-center gap-2 font-display text-base font-semibold">
                  {f.name}
                  <StatusPill
                    tone={f.state === "ON" ? "success" : f.state === "BETA" ? "warning" : "neutral"}
                    dot
                  >
                    {f.state}
                  </StatusPill>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden w-40 sm:block">
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>Rollout</span>
                    <span className="tabular-nums">{f.rollout}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-[image:var(--gradient-primary)] transition-all"
                      style={{ width: `${f.rollout}%` }}
                    />
                  </div>
                </div>

                <div className="flex rounded-lg border border-border p-0.5">
                  {states.map((s) => (
                    <button
                      key={s}
                      onClick={() => setState(f.key, s)}
                      className={cn(
                        "rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
                        f.state === s
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted",
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </>
  );
}
