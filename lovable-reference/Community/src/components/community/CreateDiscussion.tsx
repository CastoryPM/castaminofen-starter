import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { GhostButton, PrimaryButton } from "./Primitives";

const types = [
  { id: "discussion", label: "Discussion", note: "Open a question to the room." },
  { id: "question", label: "Question", note: "Ask for help or a reference." },
  { id: "review", label: "Review", note: "Judge it, and say why." },
  { id: "insight", label: "Insight", note: "One idea worth keeping." },
  { id: "recommendation", label: "Recommendation", note: "Point people somewhere good." },
];

export function DiscussionComposer({ type }: { type: string }) {
  const [tags, setTags] = useState<string[]>(["Technology"]);
  const suggested = ["Technology", "Philosophy", "Creativity", "Episode 42", "Books"];

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="d-title" className="label-eyebrow">
          Title
        </label>
        <input
          id="d-title"
          placeholder="Say the thing plainly…"
          className="focus-ring mt-2 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70"
        />
      </div>

      <div>
        <label htmlFor="d-content" className="label-eyebrow">
          Related content
        </label>
        <div className="mt-2 flex items-center gap-2 rounded-xl border border-border bg-background/60 px-4 py-3">
          <span className="text-muted-foreground" aria-hidden>
            ⌕
          </span>
          <input
            id="d-content"
            placeholder="Attach an episode, chapter, or video…"
            className="focus-ring min-w-0 flex-1 bg-transparent text-sm placeholder:text-muted-foreground/70"
          />
        </div>
      </div>

      <div>
        <label htmlFor="d-body" className="label-eyebrow">
          {type === "question" ? "Your question" : "Description"}
        </label>
        <textarea
          id="d-body"
          rows={5}
          placeholder="Give people something to disagree with."
          className="focus-ring mt-2 w-full resize-none rounded-xl border border-border bg-background/60 px-4 py-3 text-sm placeholder:text-muted-foreground/70"
        />
      </div>

      <div>
        <p className="label-eyebrow">Tags</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {suggested.map((t) => (
            <GhostButton
              key={t}
              active={tags.includes(t)}
              onClick={() => setTags(tags.includes(t) ? tags.filter((x) => x !== t) : [...tags, t])}
            >
              {t}
            </GhostButton>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <GhostButton>Attach quote</GhostButton>
        <GhostButton>Attach timestamp</GhostButton>
        <GhostButton>Attach image</GhostButton>
      </div>
    </div>
  );
}

export function CreateDiscussion({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [type, setType] = useState("discussion");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label="Create discussion">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
      />
      <div className="animate-in slide-in-from-bottom-4 fade-in relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-border bg-card p-5 duration-300 sm:max-w-2xl sm:rounded-3xl sm:p-8">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border-strong sm:hidden" aria-hidden />
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
          <div className="min-w-0">
            <p className="label-eyebrow">Create</p>
            <h2 className="text-display mt-1.5 text-2xl sm:text-3xl">Start something worth joining</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close composer"
            className="focus-ring grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 grid gap-2 sm:grid-cols-5">
          {types.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setType(t.id)}
              aria-pressed={type === t.id}
              className={cn(
                "focus-ring rounded-xl border p-3 text-left transition-colors",
                type === t.id
                  ? "border-primary/50 bg-primary/10"
                  : "border-border hover:border-border-strong",
              )}
            >
              <span className={cn("block text-xs font-medium", type === t.id ? "text-primary" : "text-foreground")}>
                {t.label}
              </span>
              <span className="mt-1 block text-[11px] leading-snug text-muted-foreground">{t.note}</span>
            </button>
          ))}
        </div>

        <div className="mt-6">
          <DiscussionComposer type={type} />
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-end gap-2">
          <GhostButton onClick={onClose}>Save draft</GhostButton>
          <PrimaryButton onClick={onClose}>Publish</PrimaryButton>
        </div>
      </div>
    </div>
  );
}
