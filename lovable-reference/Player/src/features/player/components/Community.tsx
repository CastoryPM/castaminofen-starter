import { useState } from "react";
import { Heart, MessageCircle, Send, Sparkles, Users } from "lucide-react";
import { discussions, formatTime } from "../data";
import { usePlayer } from "../player-store";
import { EmptyState } from "./states";

function Avatar({ initials, tone = "surface" }: { initials: string; tone?: "surface" | "ember" }) {
  return (
    <span
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-semibold ${
        tone === "ember" ? "ember-bg text-primary-foreground" : "bg-surface-raised text-foreground"
      }`}
    >
      {initials}
    </span>
  );
}

export function TimestampComments() {
  const { threads, activeCommentId, setActiveCommentId, seek, position, addComment } = usePlayer();
  const [draft, setDraft] = useState("");
  const sorted = [...threads].sort((a, b) => a.at - b.at);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
        <p className="text-sm text-muted-foreground">
          Comments are pinned to exact moments — tap a time to jump there.
        </p>
      </div>

      <div className="no-scrollbar mt-3 flex-1 space-y-3 overflow-y-auto pr-1">
        {sorted.length === 0 && (
          <EmptyState
            icon={<MessageCircle className="h-5 w-5" />}
            title="No comments yet"
            body="Be the first person to start the conversation."
          />
        )}
        {sorted.map((c) => {
          const active = c.id === activeCommentId;
          return (
            <article
              key={c.id}
              onClick={() => setActiveCommentId(active ? null : c.id)}
              className={`cursor-pointer rounded-xl border p-3 transition-all duration-200 ${
                active
                  ? "border-primary/50 bg-surface-raised shadow-[var(--shadow-ember)]"
                  : "border-border bg-surface/60 hover:border-primary/30"
              }`}
            >
              <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
                <Avatar initials={c.initials} tone={c.author === "You" ? "ember" : "surface"} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{c.author}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      seek(c.at);
                    }}
                    className="text-xs font-semibold tabular-nums text-primary hover:underline"
                  >
                    {formatTime(c.at)}
                  </button>
                </div>
                <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                  <Heart className="h-3.5 w-3.5" /> {c.reactions}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/85">{c.body}</p>

              {active && (
                <div className="mt-3 space-y-2 border-l-2 border-primary/40 pl-3">
                  {c.replies.length === 0 && <p className="text-xs text-muted-foreground">No replies yet.</p>}
                  {c.replies.map((r, i) => (
                    <div key={i} className="flex gap-2">
                      <Avatar initials={r.initials} />
                      <div className="min-w-0">
                        <p className="text-xs font-medium">{r.author}</p>
                        <p className="text-sm text-foreground/80">{r.body}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["🔥", "💡", "🤔", "❤️"].map((e) => (
                      <button key={e} className="glass-chip rounded-full px-2 py-1 text-xs hover:border-primary/50">
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <form
        className="mt-3 flex items-center gap-2 rounded-full border border-border bg-surface-sunken p-1.5"
        onSubmit={(e) => {
          e.preventDefault();
          if (!draft.trim()) return;
          addComment(draft.trim());
          setDraft("");
        }}
      >
        <span className="shrink-0 rounded-full bg-surface-raised px-2.5 py-1 text-xs font-semibold tabular-nums text-primary">
          {formatTime(position)}
        </span>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Comment on this moment…"
          aria-label="Comment on this moment"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          aria-label="Post comment"
          className="ember-bg grid h-8 w-8 shrink-0 place-items-center rounded-full text-primary-foreground"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  );
}

export function DiscussionPanel() {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-signal/40 bg-signal/10 p-3">
        <p className="flex items-center gap-2 text-sm font-medium">
          <Users className="h-4 w-4 text-signal" /> Listen Together · 68 people in this room
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Live discussion opens at chapter 3. Reactions from the room appear over the timeline.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button className="ember-bg rounded-full px-3 py-1.5 text-xs font-semibold text-primary-foreground">
            Join session
          </button>
          <button className="glass-chip rounded-full px-3 py-1.5 text-xs font-medium">Ask the community</button>
        </div>
      </div>

      {discussions.map((d) => (
        <article key={d.id} className="rounded-xl border border-border bg-surface/60 p-3">
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
            <Avatar initials={d.initials} />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{d.author}</p>
              <p className="text-xs text-muted-foreground">{d.tag}</p>
            </div>
            {d.live && (
              <span className="shrink-0 rounded-full bg-destructive/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-destructive">
                Live
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-foreground/85">{d.body}</p>
          <p className="mt-2 text-xs text-muted-foreground">{d.replies} replies</p>
        </article>
      ))}

      <div className="rounded-xl border border-dashed border-border p-3">
        <p className="flex items-center gap-2 text-sm font-medium">
          <Sparkles className="h-4 w-4 text-primary" /> Reaction moments
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          The three most-reacted seconds of this episode: 08:12, 22:35, 35:35.
        </p>
      </div>
    </div>
  );
}
