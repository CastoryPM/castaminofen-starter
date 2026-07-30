import { ArrowUp, Heart, Share2, UserPlus } from "lucide-react";
import { collaborators, communityFeedback } from "./data";
import { Btn, Panel, Pill } from "./primitives";

export function CollaborationPanel() {
  return (
    <Panel>
      <header className="mb-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg">Shared workspace</h3>
          <p className="text-xs text-muted-foreground">Co-hosts, contributors, editors</p>
        </div>
        <Btn size="sm" variant="quiet">
          <UserPlus size={15} /> Invite
        </Btn>
      </header>
      <ul className="space-y-2">
        {collaborators.map((c) => (
          <li
            key={c.name}
            className="flex items-center gap-3 rounded-2xl border border-border bg-surface-raised px-3 py-2.5"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ember/15 text-xs font-semibold text-ember">
              {c.initials}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium">{c.name}</span>
              <span className="block truncate text-xs text-muted-foreground">{c.status}</span>
            </span>
            <Pill tone={c.status === "Invited" ? "neutral" : "verdant"}>{c.role}</Pill>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

export function CommunityFeedback() {
  return (
    <Panel>
      <header className="mb-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg">Community feedback</h3>
          <p className="text-xs text-muted-foreground">From your shared draft</p>
        </div>
        <Btn size="sm" variant="ghost">
          <Share2 size={15} /> Share draft
        </Btn>
      </header>
      <ul className="space-y-2">
        {communityFeedback.map((f) => (
          <li
            key={f.name}
            className="flex items-start gap-3 rounded-2xl border border-border bg-surface-raised p-3"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-signal/15 text-xs font-semibold text-signal">
              {f.initials}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs text-muted-foreground">{f.name}</span>
              <span className="mt-0.5 block text-sm leading-relaxed">{f.text}</span>
            </span>
            <span className="flex shrink-0 flex-col items-center rounded-xl bg-surface-sunken px-2 py-1 text-[11px] text-muted-foreground">
              <ArrowUp size={13} />
              {f.votes}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap gap-2">
        <Btn size="sm" variant="quiet">
          <Heart size={15} /> Thank contributors
        </Btn>
        <Btn size="sm" variant="ghost">
          Collect more feedback
        </Btn>
      </div>
    </Panel>
  );
}
