import { useState } from "react";
import { projects, questions, suggestions, people } from "@/lib/community-data";
import { Avatar, GhostButton, SectionHeading, Tag } from "./Primitives";

export function CommunitySuggestions() {
  const s = suggestions[0];
  const total = s.options.reduce((a, o) => a + o.votes, 0);
  const [voted, setVoted] = useState<string | null>(null);

  return (
    <article className="surface-panel p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <Avatar person={s.creator} />
        <div className="min-w-0">
          <p className="truncate text-sm text-foreground">{s.creator.name}</p>
          <p className="text-[11px] text-muted-foreground">Creator asks the community</p>
        </div>
      </div>
      <h3 className="text-display mt-4 text-xl">{s.prompt}</h3>

      <ul className="mt-4 space-y-2">
        {s.options.map((o) => {
          const votes = o.votes + (voted === o.id ? 1 : 0);
          const pct = Math.round((votes / (total + (voted ? 1 : 0))) * 100);
          return (
            <li key={o.id}>
              <button
                type="button"
                onClick={() => setVoted(voted === o.id ? null : o.id)}
                aria-pressed={voted === o.id}
                className="focus-ring relative block w-full overflow-hidden rounded-xl border border-border bg-background/40 px-4 py-3 text-left transition-colors hover:border-border-strong"
              >
                <span
                  className={
                    "absolute inset-y-0 left-0 transition-all duration-500 " +
                    (voted === o.id ? "bg-primary/20" : "bg-muted/60")
                  }
                  style={{ width: `${pct}%` }}
                  aria-hidden
                />
                <span className="relative flex items-center justify-between gap-3">
                  <span className="truncate text-sm text-foreground/90">{o.text}</span>
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{pct}%</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-[11px] text-muted-foreground">{total} votes · 74 suggestions in the thread</span>
        <GhostButton>Suggest an idea</GhostButton>
      </div>
    </article>
  );
}

export function CollaborativeProjects() {
  return (
    <div className="grid gap-3">
      {projects.map((p) => (
        <article
          key={p.id}
          className="surface-panel grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-5"
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Tag tone={p.role === "Creator-led" ? "primary" : "insight"}>{p.role}</Tag>
              <span className="text-[11px] text-muted-foreground">{p.stage}</span>
            </div>
            <h3 className="mt-2 truncate text-sm font-medium text-foreground">{p.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {p.members} collaborators · needs {p.need}
            </p>
          </div>
          <GhostButton className="shrink-0">Join</GhostButton>
        </article>
      ))}
    </div>
  );
}

export function CommunityQuestions() {
  return (
    <div className="grid gap-3">
      {questions.map((q) => (
        <article key={q.id} className="surface-panel p-5">
          <div className="flex items-start gap-3">
            <Avatar person={q.asker} size="sm" />
            <div className="min-w-0">
              <p className="text-sm leading-relaxed text-foreground/90">{q.body}</p>
              <p className="mt-2 text-[11px] text-muted-foreground">
                {q.asker.name} · {q.answers} answers
                {q.answeredByCreator ? " · creator answered" : ""}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function CoCreation() {
  return (
    <section aria-labelledby="cocreate-heading">
      <SectionHeading
        eyebrow="Co-creation"
        title="Make things, not just comments"
        description="Suggestions creators actually read, projects you can join, and questions worth answering."
      />
      <h2 id="cocreate-heading" className="sr-only">
        Co-creation
      </h2>
      <div className="grid gap-3 lg:grid-cols-2">
        <CommunitySuggestions />
        <div className="grid gap-3">
          <CollaborativeProjects />
        </div>
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <CommunityQuestions />
        <CreatorLayer />
      </div>
    </section>
  );
}

export function CreatorLayer() {
  return (
    <article className="surface-panel p-5 sm:p-6">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
        <Avatar person={people.mira} size="lg" />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">{people.mira.name}</p>
          <p className="text-[11px] text-muted-foreground">Creator · 21.4k in her community</p>
        </div>
        <GhostButton className="shrink-0 border-primary/40 text-primary">Following</GhostButton>
      </div>
      <div className="mt-5 space-y-3">
        {[
          { t: "Update", b: "Cut 11 minutes from the next episode. The argument is sharper for it." },
          { t: "Asking you", b: "Should the season finale be a live discussion with the community?" },
          { t: "Feedback", b: "Reading every note on the chapter breakdown this week." },
        ].map((u) => (
          <div key={u.t} className="rounded-xl border border-border bg-background/40 p-4">
            <p className="label-eyebrow">{u.t}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{u.b}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
