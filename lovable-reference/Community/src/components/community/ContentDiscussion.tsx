import { useState } from "react";
import { cn } from "@/lib/utils";
import { artwork, moments, people } from "@/lib/community-data";
import { Avatar, GhostButton, Tag } from "./Primitives";

export function ContentDiscussionHeader() {
  return (
    <div className="surface-panel cinematic-veil overflow-hidden p-0">
      <div className="grid gap-0 sm:grid-cols-[180px_minmax(0,1fr)]">
        <img
          src={artwork.artPodcast}
          alt="Cover art for Signal & Noise, Episode 42"
          width={768}
          height={768}
          loading="lazy"
          className="h-40 w-full object-cover sm:h-full"
        />
        <div className="relative z-10 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Tag tone="primary">Podcast</Tag>
            <Tag>Discussion room</Tag>
          </div>
          <h2 className="text-display mt-3 text-2xl sm:text-3xl">
            Discussion about Episode 42
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Signal &amp; Noise · with {people.amara.name} · 1h 08m
          </p>
          <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <div className="flex min-w-0 items-center gap-2">
              {[people.amara, people.tobias, people.neve, people.idris].map((p) => (
                <Avatar key={p.id} person={p} size="sm" />
              ))}
              <span className="truncate text-xs text-muted-foreground">148 participants</span>
            </div>
            <GhostButton className="shrink-0">Open player</GhostButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MomentMarker({
  pct,
  count,
  active,
  onSelect,
  label,
}: {
  pct: number;
  count: number;
  active: boolean;
  onSelect: () => void;
  label: string;
}) {
  const scale = Math.min(1.6, 0.7 + count / 120);
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`${label}, ${count} comments`}
      aria-pressed={active}
      className="focus-ring group absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${pct}%` }}
    >
      <span
        className={cn(
          "block rounded-full border transition-all duration-300",
          active
            ? "border-primary bg-primary"
            : "border-primary/50 bg-primary/40 group-hover:bg-primary/70",
        )}
        style={{ width: `${10 * scale}px`, height: `${10 * scale}px` }}
      />
      {active ? (
        <span className="absolute -inset-2 -z-10 rounded-full bg-primary/25 blur-md" aria-hidden />
      ) : null}
    </button>
  );
}

export function TimestampTimeline() {
  const [activeId, setActiveId] = useState(moments[1].id);
  const active = moments.find((m) => m.id === activeId)!;

  return (
    <div className="space-y-4">
      <div className="surface-panel p-5 sm:p-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="min-w-0">
            <p className="label-eyebrow">Timestamp conversations</p>
            <h3 className="text-display mt-1.5 text-xl">Discuss the exact moment</h3>
          </div>
          <span className="shrink-0 text-xs text-muted-foreground">294 moment comments</span>
        </div>

        <div className="relative mt-8 mb-2 h-16">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border-strong" />
          <div
            className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-primary/60"
            style={{ width: `${active.pct}%` }}
          />
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
            {moments.map((m) => (
              <MomentMarker
                key={m.id}
                pct={m.pct}
                count={m.count}
                label={`${m.at} ${m.label}`}
                active={m.id === activeId}
                onSelect={() => setActiveId(m.id)}
              />
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-0 flex justify-between text-[10px] tabular-nums text-muted-foreground">
            <span>00:00</span>
            <span>1:08:00</span>
          </div>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {moments.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setActiveId(m.id)}
              className={cn(
                "focus-ring shrink-0 rounded-full border px-3 py-1 text-[11px] tabular-nums transition-colors",
                m.id === activeId
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {m.at} · {m.count}
            </button>
          ))}
        </div>
      </div>

      <MomentDiscussionPanel
        at={active.at}
        label={active.label}
        note={active.note}
        count={active.count}
      />
    </div>
  );
}

export function MomentDiscussionPanel({
  at,
  label,
  note,
  count,
}: {
  at: string;
  label: string;
  note: string;
  count: number;
}) {
  return (
    <aside className="surface-panel p-5 sm:p-6" aria-live="polite">
      <div className="flex flex-wrap items-center gap-2">
        <Tag tone="primary">▸ {at}</Tag>
        <span className="text-sm text-foreground">{label}</span>
        <span className="text-xs text-muted-foreground">· {count} comments</span>
      </div>

      <ul className="mt-5 space-y-4">
        {[
          { p: people.tobias, body: note, when: "3h ago", reacts: "84 insightful" },
          {
            p: people.neve,
            body: "Replaying this three times — the phrasing changes the claim more than the content does.",
            when: "2h ago",
            reacts: "31 agree",
          },
          {
            p: people.amara,
            body: "Creator note: this section was recorded last, after the rest of the conversation.",
            when: "1h ago",
            reacts: "57 helpful",
          },
        ].map((c, i) => (
          <li key={i} className="flex items-start gap-3">
            <Avatar person={c.p} size="sm" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">
                <span className="text-foreground">{c.p.name}</span>
                {c.p.role === "creator" ? <span className="ml-1.5 text-primary">· Creator</span> : null}
                <span className="ml-1.5">{c.when}</span>
              </p>
              <p className="mt-1 text-sm leading-relaxed text-foreground/85">{c.body}</p>
              <p className="mt-1.5 text-[11px] text-muted-foreground">{c.reacts}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <input
          aria-label={`Comment at ${at}`}
          placeholder={`Add a thought at ${at}…`}
          className="focus-ring min-w-0 flex-1 rounded-full border border-border bg-background/60 px-4 py-2.5 text-sm placeholder:text-muted-foreground/70"
        />
        <GhostButton className="border-primary/40 text-primary">Pin to moment</GhostButton>
      </div>
    </aside>
  );
}
