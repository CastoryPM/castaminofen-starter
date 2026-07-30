import { useState } from "react";
import { BookOpen, Check, ChevronDown, ChevronUp, Highlighter, Search, Trash2, X } from "lucide-react";
import { chapters, formatTime, keyPoints, related, track, transcript } from "../data";
import { usePlayer } from "../player-store";
import { EmptyQueueState, EmptyState } from "./states";

export function ChapterList() {
  const { position, seek, currentChapter } = usePlayer();
  return (
    <ol className="space-y-2">
      {chapters.map((c, i) => {
        const next = chapters[i + 1]?.start ?? track.duration;
        const active = c.id === currentChapter.id;
        const pct = Math.min(100, Math.max(0, ((position - c.start) / (next - c.start)) * 100));
        return (
          <li key={c.id}>
            <button
              onClick={() => seek(c.start)}
              className={`w-full rounded-xl border p-3 text-left transition-all ${
                active ? "border-primary/50 bg-surface-raised" : "border-border bg-surface/60 hover:border-primary/30"
              }`}
            >
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    <span className="text-muted-foreground">Chapter {c.index} · </span>
                    {c.title}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{c.description}</p>
                </div>
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{formatTime(c.start)}</span>
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted-foreground/20">
                <div className="ember-bg h-full" style={{ width: `${position >= next ? 100 : active ? pct : 0}%` }} />
              </div>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

export function TranscriptPanel() {
  const { position, seek } = usePlayer();
  const [q, setQ] = useState("");
  const lines = transcript.filter((l) => l.text.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 rounded-full border border-border bg-surface-sunken px-3 py-2">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search the transcript…"
          aria-label="Search transcript"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </label>

      {lines.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="h-5 w-5" />}
          title="Nothing found"
          body="Transcript will appear here as it syncs with playback."
        />
      ) : (
        <div className="space-y-1">
          {lines.map((l, i) => {
            const next = transcript[transcript.indexOf(l) + 1]?.at ?? Infinity;
            const active = position >= l.at && position < next;
            return (
              <button
                key={l.id}
                onClick={() => seek(l.at)}
                className={`grid w-full grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-lg px-2 py-2 text-left transition-colors ${
                  active ? "bg-surface-raised" : "hover:bg-surface/60"
                }`}
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <span className="shrink-0 text-xs tabular-nums text-primary">{formatTime(l.at)}</span>
                <span className={`text-sm leading-relaxed ${active ? "text-foreground" : "text-muted-foreground"}`}>
                  <span className="font-medium text-foreground/70">{l.speaker}: </span>
                  {l.text}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function QueuePanel() {
  const { items, removeQueueItem, moveQueueItem } = usePlayer();
  if (items.length === 0) return <EmptyQueueState />;
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-primary/40 bg-primary/10 p-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Coming next</p>
        <p className="mt-1 truncate text-sm font-medium">{items[0].title}</p>
        <p className="text-xs text-muted-foreground">
          {items[0].creator} · {formatTime(items[0].duration)}
        </p>
      </div>
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li
            key={it.id}
            className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-surface/60 p-3"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-surface-raised text-xs font-semibold tabular-nums">
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{it.title}</p>
              <p className="truncate text-xs text-muted-foreground">
                {it.kind} · {it.creator} · {formatTime(it.duration)}
              </p>
            </div>
            <span className="flex shrink-0 items-center gap-1">
              <button
                onClick={() => moveQueueItem(it.id, -1)}
                aria-label={`Move ${it.title} up`}
                className="grid h-7 w-7 place-items-center rounded-md hover:bg-surface-raised"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <button
                onClick={() => moveQueueItem(it.id, 1)}
                aria-label={`Move ${it.title} down`}
                className="grid h-7 w-7 place-items-center rounded-md hover:bg-surface-raised"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
              <button
                onClick={() => removeQueueItem(it.id)}
                aria-label={`Remove ${it.title}`}
                className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-destructive/15 hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SavedMoments() {
  const { savedMoments, seek, addMoment, position } = usePlayer();
  const [note, setNote] = useState("");

  return (
    <div className="space-y-3">
      <form
        className="rounded-xl border border-border bg-surface-sunken p-3"
        onSubmit={(e) => {
          e.preventDefault();
          addMoment("highlight", note.trim() || "Saved moment", undefined);
          setNote("");
        }}
      >
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          <Highlighter className="h-3.5 w-3.5" /> Highlight at {formatTime(position)}
        </p>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a personal note or quote…"
          aria-label="Highlight note"
          className="mt-2 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          className="ember-bg mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-primary-foreground"
        >
          <Check className="h-3.5 w-3.5" /> Save moment
        </button>
      </form>

      {savedMoments.length === 0 ? (
        <EmptyState
          icon={<Highlighter className="h-5 w-5" />}
          title="No saved moments"
          body="Highlight a line or bookmark a timestamp and it lives here."
        />
      ) : (
        savedMoments.map((m) => (
          <article key={m.id} className="rounded-xl border border-border bg-surface/60 p-3">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{m.label}</p>
                {m.note && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">“{m.note}”</p>}
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => seek(m.at)}
                    className="text-xs font-semibold tabular-nums text-primary hover:underline"
                  >
                    {formatTime(m.at)}
                  </button>
                  <span className="glass-chip rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider">
                    {m.category}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                      m.kind === "highlight" ? "bg-primary/15 text-primary" : "bg-signal/15 text-signal"
                    }`}
                  >
                    {m.kind}
                  </span>
                </div>
              </div>
              <Trash2 className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            </div>
          </article>
        ))
      )}
    </div>
  );
}

export function LearningMode() {
  const { seek } = usePlayer();
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-signal/40 bg-signal/10 p-3">
        <p className="text-sm font-medium">Learning mode is on</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Key points, chapter summaries and your notes stay in view while the episode plays.
        </p>
      </div>
      <section>
        <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Key points</h4>
        <ul className="mt-2 space-y-2">
          {keyPoints.map((k, i) => (
            <li key={i} className="flex gap-3 rounded-xl border border-border bg-surface/60 p-3">
              <span className="ember-bg mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold text-primary-foreground">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-foreground/85">{k}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Chapter summaries</h4>
        <ul className="mt-2 space-y-1.5">
          {chapters.map((c) => (
            <li key={c.id}>
              <button
                onClick={() => seek(c.start)}
                className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-surface-raised"
              >
                <span className="text-muted-foreground">{formatTime(c.start)} · </span>
                {c.description}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export function ContentContext() {
  const { following, setFollowing } = usePlayer();
  return (
    <div className="space-y-5">
      <section>
        <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">About</h4>
        <p className="mt-2 text-sm leading-relaxed text-foreground/85">{track.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {track.tags.map((t) => (
            <span key={t} className="glass-chip rounded-full px-2.5 py-1 text-xs text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-surface/60 p-4">
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
          <span className="ember-bg grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-bold text-primary-foreground">
            {track.creator.initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{track.creator.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {track.creator.handle} · {track.creator.followers} followers
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{track.creator.bio}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => setFollowing(!following)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              following ? "glass-chip text-foreground" : "ember-bg text-primary-foreground"
            }`}
          >
            {following ? "Following" : "Follow creator"}
          </button>
          <button className="glass-chip rounded-full px-4 py-1.5 text-xs font-medium">View profile</button>
          <button className="glass-chip rounded-full px-4 py-1.5 text-xs font-medium">All episodes</button>
        </div>
      </section>

      <section className="rounded-xl border border-dashed border-border p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Creator analytics · preview
        </p>
        <div className="mt-3 grid grid-cols-3 gap-3 text-center">
          {[
            ["12.4K", "Listeners"],
            ["68%", "Completion"],
            ["341", "Comments"],
          ].map(([v, l]) => (
            <div key={l} className="rounded-lg bg-surface/60 py-3">
              <p className="text-lg font-semibold text-ember">{v}</p>
              <p className="text-[11px] text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Up next for you</h4>
        <ul className="mt-2 space-y-2">
          {related.map((r) => (
            <li
              key={r.id}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-surface/60 p-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{r.title}</p>
                <p className="truncate text-xs text-muted-foreground">{r.meta}</p>
              </div>
              <span className="glass-chip shrink-0 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider">
                {r.kind}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
