import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  discussionPosts,
  reactionMeta,
  type Post,
  type ReactionKey,
} from "@/lib/community-data";
import { Avatar, GhostButton, Tag } from "./Primitives";

export function ReactionBar({
  reactions,
  compact,
}: {
  reactions: Partial<Record<ReactionKey, number>>;
  compact?: boolean;
}) {
  const [chosen, setChosen] = useState<ReactionKey | null>(null);
  const keys = Object.keys(reactionMeta) as ReactionKey[];

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {keys.map((k) => {
        const base = reactions[k] ?? 0;
        const shown = base + (chosen === k ? 1 : 0);
        if (compact && base === 0 && chosen !== k) return null;
        return (
          <button
            key={k}
            type="button"
            onClick={() => setChosen(chosen === k ? null : k)}
            aria-pressed={chosen === k}
            className={cn(
              "focus-ring inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground transition-all duration-200 hover:border-border-strong hover:text-foreground",
              chosen === k && "border-primary/50 bg-primary/10 text-primary",
            )}
          >
            <span aria-hidden>{reactionMeta[k].glyph}</span>
            <span>{reactionMeta[k].label}</span>
            {shown > 0 ? <span className="tabular-nums opacity-70">{shown}</span> : null}
          </button>
        );
      })}
    </div>
  );
}

export function ReplyThread({ post }: { post: Post }) {
  const [open, setOpen] = useState(true);
  if (post.replies.length === 0) return null;

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="focus-ring text-[11px] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        {open ? "Hide" : "Show"} {post.replies.length} repl{post.replies.length === 1 ? "y" : "ies"}
      </button>

      {open ? (
        <ul className="mt-3 space-y-3 border-l border-border pl-4">
          {post.replies.map((r) => (
            <li key={r.id}>
              <div className="flex items-start gap-3">
                <Avatar person={r.author} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">
                    <span className="text-foreground">{r.author.name}</span>
                    {r.author.role === "creator" ? (
                      <span className="ml-1.5 text-primary">· Creator</span>
                    ) : null}
                    <span className="ml-1.5">{r.posted}</span>
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{r.body}</p>
                  <div className="mt-2.5">
                    <ReactionBar reactions={r.reactions} compact />
                  </div>

                  {r.replies?.length ? (
                    <ul className="mt-3 space-y-3 border-l border-border pl-4">
                      {r.replies.map((rr) => (
                        <li key={rr.id} className="flex items-start gap-3">
                          <Avatar person={rr.author} size="sm" />
                          <div className="min-w-0">
                            <p className="text-xs text-muted-foreground">
                              <span className="text-foreground">{rr.author.name}</span>
                              <span className="ml-1.5">{rr.posted}</span>
                            </p>
                            <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{rr.body}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function DiscussionPost({ post }: { post: Post }) {
  return (
    <article className="surface-panel p-5 sm:p-6">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3">
        <Avatar person={post.author} />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="truncate text-sm font-medium text-foreground">{post.author.name}</span>
            {post.author.badge ? <Tag tone="neutral">{post.author.badge}</Tag> : null}
            <span className="text-[11px] text-muted-foreground">{post.posted}</span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Tag tone={post.kind === "Question" ? "primary" : post.kind === "Summary" ? "insight" : "neutral"}>
              {post.kind}
            </Tag>
            {post.timestampRef ? (
              <button
                type="button"
                className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-primary/35 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary transition-colors hover:bg-primary/20"
              >
                ▸ {post.timestampRef}
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <p className="mt-4 text-[15px] leading-relaxed text-foreground/90">{post.body}</p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <ReactionBar reactions={post.reactions} />
        <div className="flex items-center gap-2">
          <GhostButton>Reply</GhostButton>
          <GhostButton ariaLabel="Save to library">Save</GhostButton>
        </div>
      </div>

      <ReplyThread post={post} />
    </article>
  );
}

export function DiscussionRoom() {
  const [draft, setDraft] = useState("");

  return (
    <section aria-labelledby="room-heading" className="space-y-4">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <p className="label-eyebrow">Deep discussion</p>
          <h2 id="room-heading" className="text-display mt-1.5 truncate text-2xl">
            The memory argument
          </h2>
        </div>
        <GhostButton>Sort · Most insightful</GhostButton>
      </div>

      <div className="surface-panel p-4">
        <label htmlFor="quick-post" className="sr-only">
          Add to the discussion
        </label>
        <textarea
          id="quick-post"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={2}
          placeholder="Add an analysis, a question, or a summary…"
          className="focus-ring w-full resize-none rounded-xl border border-border bg-background/60 p-3 text-sm text-foreground placeholder:text-muted-foreground/70"
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {["Opinion", "Analysis", "Question", "Summary", "Theory"].map((t, i) => (
              <GhostButton key={t} active={i === 1}>
                {t}
              </GhostButton>
            ))}
          </div>
          <GhostButton className="border-primary/40 text-primary">Post</GhostButton>
        </div>
      </div>

      <div className="space-y-3">
        {discussionPosts.map((p) => (
          <DiscussionPost key={p.id} post={p} />
        ))}
      </div>
    </section>
  );
}
