import { people, pulse, savedKnowledge, notifications } from "@/lib/community-data";
import { Avatar, GhostButton, Tag } from "./Primitives";

export function ReputationBadge({ label, note }: { label: string; note: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-background/40 p-3">
      <span
        className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-primary/35 bg-primary/10 text-[11px] text-primary"
        aria-hidden
      >
        ✦
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-foreground">{label}</p>
        <p className="text-[11px] leading-relaxed text-muted-foreground">{note}</p>
      </div>
    </div>
  );
}

export function ContributorProfile() {
  return (
    <section className="surface-panel p-5" aria-labelledby="profile-heading">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
        <Avatar person={people.tobias} size="lg" />
        <div className="min-w-0">
          <h2 id="profile-heading" className="truncate text-sm font-medium text-foreground">
            {people.tobias.name}
          </h2>
          <p className="truncate text-[11px] text-muted-foreground">
            {people.tobias.handle} · joined 2 years ago
          </p>
          <div className="mt-1.5">
            <Tag tone="primary">{people.tobias.badge}</Tag>
          </div>
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-2">
        {[
          ["Discussions started", "14"],
          ["Helpful answers", "86"],
          ["Saved insights", "132"],
          ["Community impact", "50 helped"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl border border-border bg-background/40 px-3 py-2.5">
            <dt className="text-[11px] text-muted-foreground">{k}</dt>
            <dd className="text-display mt-0.5 text-lg text-foreground">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 space-y-2">
        <ReputationBadge label="Thoughtful Contributor" note="Posts that keep threads open, not closed." />
        <ReputationBadge label="Knowledge Builder" note="Notes edited by 40+ members." />
        <ReputationBadge label="Early Explorer" note="Here since the first season." />
      </div>
    </section>
  );
}

export function DailyPulse() {
  return (
    <section className="surface-panel p-5" aria-labelledby="pulse-heading">
      <p className="label-eyebrow">Daily community pulse</p>
      <h2 id="pulse-heading" className="text-display mt-1.5 text-xl">
        What people are discussing today
      </h2>
      <dl className="mt-4 space-y-2">
        {pulse.map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-3 border-b border-border pb-2 last:border-0">
            <dt className="truncate text-xs text-muted-foreground">{p.label}</dt>
            <dd className="flex shrink-0 items-baseline gap-2">
              <span className="text-sm tabular-nums text-foreground">{p.value}</span>
              <span className="text-[11px] text-insight">{p.delta}</span>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 rounded-xl border border-border bg-background/40 p-3 text-xs leading-relaxed text-muted-foreground">
        <span className="text-foreground">Your impact.</span> Your comments helped 50 people this
        month, and one of your insights was saved 312 times.
      </p>
    </section>
  );
}

export function ReturningConversations() {
  return (
    <section className="surface-panel p-5" aria-labelledby="returning-heading">
      <h2 id="returning-heading" className="text-display text-xl">
        Continue where you left off
      </h2>
      <ul className="mt-4 space-y-2.5">
        {[
          { t: "Is AI changing creativity forever?", m: "3 new replies since you left" },
          { t: "Chapter 7 Analysis", m: "Your draft is still unsent" },
          { t: "Books everyone should read", m: "Someone challenged your entry" },
        ].map((r) => (
          <li key={r.t}>
            <button
              type="button"
              className="focus-ring w-full rounded-xl border border-border bg-background/40 p-3 text-left transition-colors hover:border-border-strong"
            >
              <p className="truncate text-sm text-foreground/90">{r.t}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{r.m}</p>
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 rounded-xl border border-primary/25 bg-primary/5 p-3">
        <p className="label-eyebrow">Community memory</p>
        <p className="mt-1 text-xs leading-relaxed text-foreground/85">
          Two years ago today you started your first discussion: “Why do we re-read?”
        </p>
      </div>
    </section>
  );
}

export function SavedKnowledge() {
  return (
    <section className="surface-panel p-5" aria-labelledby="saved-heading">
      <div className="flex items-center justify-between gap-3">
        <h2 id="saved-heading" className="text-display text-xl">
          Saved to your library
        </h2>
        <GhostButton>Open library</GhostButton>
      </div>
      <ul className="mt-4 space-y-2">
        {savedKnowledge.map((s) => (
          <li key={s.id} className="flex items-start gap-3 border-b border-border pb-2.5 last:border-0">
            <Tag>{s.kind}</Tag>
            <div className="min-w-0">
              <p className="truncate text-xs text-foreground/90">{s.title}</p>
              <p className="text-[11px] text-muted-foreground">{s.from}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function NotificationsPreview() {
  return (
    <section className="surface-panel p-5" aria-labelledby="notif-heading">
      <div className="flex items-center justify-between gap-3">
        <h2 id="notif-heading" className="text-display text-xl">
          Activity
        </h2>
        <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[11px] text-primary">3 new</span>
      </div>
      <ul className="mt-4 space-y-2.5">
        {notifications.map((n) => (
          <li key={n.id} className="flex items-start gap-3">
            <span
              className={
                "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full " +
                (n.tone === "highlight" ? "bg-insight" : n.tone === "creator" ? "bg-primary" : "bg-signal")
              }
              aria-hidden
            />
            <div className="min-w-0">
              <p className="truncate text-xs text-foreground/90">{n.text}</p>
              <p className="truncate text-[11px] text-muted-foreground">
                {n.detail} · {n.when}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
