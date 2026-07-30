import { useState } from "react";
import {
  Bookmark,
  FileText,
  GripVertical,
  MessageCircleQuestion,
  Plus,
  Quote,
  Sparkles,
  Trash2,
} from "lucide-react";
import { Btn, Field, Panel, Pill, inputClass } from "./primitives";

type Chapter = { id: string; time: string; title: string };

export function ChapterEditor() {
  const [chapters, setChapters] = useState<Chapter[]>([
    { id: "c1", time: "00:00", title: "Cold open — the river at night" },
    { id: "c2", time: "04:12", title: "Why cities buried their water" },
    { id: "c3", time: "18:40", title: "A conversation with Noor" },
  ]);

  const add = () =>
    setChapters((c) => [...c, { id: crypto.randomUUID(), time: "00:00", title: "New chapter" }]);

  return (
    <Panel>
      <header className="mb-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg">Chapters</h3>
          <p className="text-xs text-muted-foreground">Podcasts, audiobooks and video</p>
        </div>
        <Pill tone="ember">
          <Sparkles size={12} /> AI suggestions
        </Pill>
      </header>
      <ul className="space-y-2">
        {chapters.map((ch) => (
          <li
            key={ch.id}
            className="group flex items-center gap-2 rounded-2xl border border-border bg-surface-raised px-3 py-2.5"
          >
            <GripVertical size={16} className="shrink-0 cursor-grab text-muted-foreground" />
            <input
              defaultValue={ch.time}
              aria-label="Chapter start time"
              className="w-16 shrink-0 rounded-lg bg-surface-sunken px-2 py-1 text-center font-mono text-xs text-muted-foreground focus:outline-none"
            />
            <input
              defaultValue={ch.title}
              aria-label="Chapter title"
              className="min-w-0 flex-1 bg-transparent text-sm focus:outline-none"
            />
            <button
              type="button"
              aria-label="Remove chapter"
              onClick={() => setChapters((c) => c.filter((x) => x.id !== ch.id))}
              className="shrink-0 rounded-lg p-1.5 text-muted-foreground opacity-0 transition group-hover:opacity-100 hover:text-destructive"
            >
              <Trash2 size={15} />
            </button>
          </li>
        ))}
      </ul>
      <Btn size="sm" variant="quiet" className="mt-3" onClick={add}>
        <Plus size={15} /> Add chapter
      </Btn>
    </Panel>
  );
}

export function TimestampEditor() {
  const marks = [
    { at: "06:22", label: "The question that changed the episode", tone: "ember" as const },
    { at: "21:05", label: "Quote: “A river is only hidden, never gone.”", tone: "signal" as const },
  ];
  return (
    <Panel>
      <h3 className="text-lg">Timestamp highlights</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        Marked moments surface inside the Castaminofen player.
      </p>
      <div className="relative mt-5 h-14 overflow-hidden rounded-2xl bg-surface-sunken">
        <div className="absolute inset-0 flex items-center gap-[3px] px-3 opacity-60">
          {Array.from({ length: 72 }).map((_, i) => (
            <span
              key={i}
              className="w-full rounded-full bg-muted-foreground/40"
              style={{ height: `${18 + Math.abs(Math.sin(i * 0.7)) * 60}%` }}
            />
          ))}
        </div>
        {[28, 62].map((left, i) => (
          <span
            key={left}
            className="absolute top-0 bottom-0 w-0.5 bg-ember"
            style={{ left: `${left}%`, opacity: i === 0 ? 1 : 0.7 }}
          />
        ))}
      </div>
      <ul className="mt-4 space-y-2">
        {marks.map((m) => (
          <li
            key={m.at}
            className="flex items-center gap-3 rounded-2xl border border-border bg-surface-raised px-3 py-2.5"
          >
            <Bookmark size={15} className="shrink-0 text-ember" />
            <span className="shrink-0 font-mono text-xs text-muted-foreground">{m.at}</span>
            <span className="min-w-0 flex-1 truncate text-sm">{m.label}</span>
          </li>
        ))}
      </ul>
      <Btn size="sm" variant="quiet" className="mt-3">
        <Plus size={15} /> Mark this moment
      </Btn>
    </Panel>
  );
}

export function TranscriptPanel() {
  return (
    <Panel>
      <header className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-lg">Transcript</h3>
        <Pill tone="ember">
          <Sparkles size={12} /> AI cleanup
        </Pill>
      </header>
      <div className="max-h-56 space-y-3 overflow-y-auto pr-1 text-sm leading-relaxed scrollbar-none">
        {[
          ["00:04", "There's a stream under this street. Nobody here has ever seen it."],
          ["00:19", "We started this episode looking for a map, and found a memory instead."],
          ["01:02", "Noor: The city didn't lose the river. It just stopped listening to it."],
        ].map(([t, line]) => (
          <p key={t} className="flex gap-3">
            <span className="shrink-0 font-mono text-xs text-muted-foreground">{t}</span>
            <span className="min-w-0 text-foreground/85">{line}</span>
          </p>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Btn size="sm" variant="quiet">
          <FileText size={15} /> Generate transcript
        </Btn>
        <Btn size="sm" variant="ghost">
          Make searchable
        </Btn>
      </div>
    </Panel>
  );
}

export function HighlightManager() {
  return (
    <Panel>
      <h3 className="text-lg">Highlights & pull quotes</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        What you mark here becomes shareable in feed and community.
      </p>
      <blockquote className="mt-4 rounded-2xl border-l-2 border-ember bg-surface-sunken px-4 py-3 text-sm italic">
        <Quote size={14} className="mb-1 text-ember" />
        “A river is only hidden, never gone.”
        <footer className="mt-2 text-xs not-italic text-muted-foreground">
          21:05 · Noor Haddad
        </footer>
      </blockquote>
      <Btn size="sm" variant="quiet" className="mt-3">
        <Plus size={15} /> New highlight
      </Btn>
    </Panel>
  );
}

export function CommunityQuestions() {
  return (
    <Panel>
      <h3 className="text-lg">Community questions</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        Attach prompts that open under your piece.
      </p>
      <div className="mt-4 space-y-3">
        <Field label="Discussion prompt">
          <input
            className={inputClass}
            defaultValue="What water runs under your city?"
            aria-label="Discussion prompt"
          />
        </Field>
        <div className="flex flex-wrap gap-2">
          <Btn size="sm" variant="quiet">
            <MessageCircleQuestion size={15} /> Add question
          </Btn>
          <Btn size="sm" variant="ghost">
            Create a poll
          </Btn>
        </div>
      </div>
    </Panel>
  );
}

export function AIAssistant() {
  const items = [
    { title: "Title ideas", body: "Three alternatives tuned to your last episode's audience." },
    { title: "Description draft", body: "A 220-character summary from your transcript." },
    { title: "Chapter suggestions", body: "Six sections detected from topic shifts." },
    { title: "Content insights", body: "Where listeners are likely to drop off." },
  ];
  return (
    <Panel className="relative overflow-hidden bg-stage">
      <header className="flex items-center gap-2">
        <Sparkles size={16} className="text-ember" />
        <h3 className="text-lg">Creative assistant</h3>
      </header>
      <p className="mt-1 text-xs text-muted-foreground">
        Suggestions only — you keep every decision.
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {items.map((i) => (
          <button
            key={i.title}
            type="button"
            className="rounded-2xl border border-border bg-surface-raised p-3 text-left transition hover:border-ember/50"
          >
            <span className="block text-sm font-medium">{i.title}</span>
            <span className="mt-1 block text-xs text-muted-foreground">{i.body}</span>
          </button>
        ))}
      </div>
    </Panel>
  );
}
