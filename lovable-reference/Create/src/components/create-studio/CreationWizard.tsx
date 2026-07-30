import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Globe,
  Image as ImageIcon,
  Lock,
  Mic,
  Play,
  Sparkles,
  Upload,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { creationTypeMap, wizardSteps, type CreationTypeId } from "./data";
import { Btn, Field, Meter, Panel, Pill, TypeGlyph, inputClass } from "./primitives";
import { CreationTypeSelector } from "./CreationTypeSelector";
import {
  AIAssistant,
  ChapterEditor,
  CommunityQuestions,
  HighlightManager,
  TimestampEditor,
  TranscriptPanel,
} from "./tools";
import { CollaborationPanel, CommunityFeedback } from "./community";
import { CreateErrorState, UploadSkeleton } from "./states";

export function StepNavigation({
  step,
  onStep,
  orientation = "horizontal",
}: {
  step: number;
  onStep: (n: number) => void;
  orientation?: "horizontal" | "vertical";
}) {
  if (orientation === "vertical") {
    return (
      <ol className="space-y-1">
        {wizardSteps.map((s) => {
          const state = s.id === step ? "current" : s.id < step ? "done" : "todo";
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => onStep(s.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition",
                  state === "current"
                    ? "bg-ember/10 text-ember"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[11px] font-semibold",
                    state === "done" && "border-verdant/40 bg-verdant/15 text-verdant",
                    state === "current" && "border-ember/50 bg-ember/15 text-ember",
                    state === "todo" && "border-border",
                  )}
                >
                  {state === "done" ? <Check size={13} /> : s.id}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{s.name}</span>
                  <span className="block truncate text-[11px] opacity-70">{s.hint}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
      {wizardSteps.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => onStep(s.id)}
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition",
            s.id === step
              ? "border-ember/50 bg-ember/10 text-ember"
              : "border-border text-muted-foreground",
          )}
        >
          <span className="font-mono">{String(s.id).padStart(2, "0")}</span>
          {s.name}
        </button>
      ))}
    </div>
  );
}

export function MetadataForm({ type }: { type: CreationTypeId }) {
  const t = creationTypeMap[type];
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-2xl">Define the idea</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          One clear sentence is enough to begin a {t.name.toLowerCase()}.
        </p>
      </div>
      <Field label="Title" hint="Make it sound like you">
        <input className={inputClass} placeholder="The Long Quiet — Episode 4" />
      </Field>
      <Field label="Description">
        <textarea
          rows={4}
          className={inputClass}
          placeholder="What will someone carry with them after this?"
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Category">
          <select className={inputClass} defaultValue="Documentary">
            {["Documentary", "Interview", "Fiction", "Knowledge", "Music", "Review"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Creator identity">
          <select className={inputClass}>
            <option>Amara Vale (personal)</option>
            <option>The Long Quiet (show)</option>
          </select>
        </Field>
      </div>
      <div>
        <span className="mb-2 block text-sm font-medium">Tags</span>
        <div className="flex flex-wrap gap-2">
          {["cities", "water", "night", "interview"].map((tag) => (
            <Pill key={tag} tone="neutral">
              #{tag} <X size={11} />
            </Pill>
          ))}
          <button type="button" className="text-xs text-ember">
            + add tag
          </button>
        </div>
      </div>
      <Panel className="flex items-start gap-3 border-dashed bg-stage">
        <Sparkles size={16} className="mt-0.5 shrink-0 text-ember" />
        <p className="text-xs text-muted-foreground">
          Stuck on a title? The assistant can offer three, based on your description.
        </p>
      </Panel>
    </div>
  );
}

export function MediaUploaderPreview({ loading }: { loading?: boolean }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-2xl">Add your media</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Record here, or bring something you already made.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="grid place-items-center rounded-3xl border border-dashed border-border bg-stage px-6 py-12 text-center transition hover:border-ember/50">
          <Upload size={22} className="text-ember" />
          <p className="mt-3 text-sm font-medium">Drop a file</p>
          <p className="mt-1 text-xs text-muted-foreground">Audio or video, up to 4 hours</p>
        </div>
        <div className="grid place-items-center rounded-3xl border border-border bg-surface px-6 py-12 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-ember-gradient text-primary-foreground shadow-ember">
            <Mic size={20} />
          </span>
          <p className="mt-3 text-sm font-medium">Record now</p>
          <p className="mt-1 text-xs text-muted-foreground">Studio-quiet capture</p>
        </div>
      </div>
      {loading ? <UploadSkeleton label="Analysing waveform…" /> : null}
      <Panel className="flex items-center gap-4">
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-surface-sunken text-muted-foreground">
          <ImageIcon size={20} />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium">Cover artwork</p>
          <p className="text-xs text-muted-foreground">Upload, or compose one from a still.</p>
        </div>
        <Btn size="sm" variant="quiet" className="ml-auto">
          Create cover
        </Btn>
      </Panel>
    </div>
  );
}

export function ContentPreview({ type }: { type: CreationTypeId }) {
  const t = creationTypeMap[type];
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-2xl">Audience preview</h3>
        <p className="mt-1 text-sm text-muted-foreground">Exactly how it will arrive to them.</p>
      </div>
      <Panel className="bg-stage">
        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="grid aspect-square w-full shrink-0 place-items-center rounded-3xl bg-ember-gradient text-primary-foreground shadow-cinematic sm:w-44">
            <t.icon size={34} strokeWidth={1.2} />
          </div>
          <div className="min-w-0 flex-1">
            <Pill tone="ember">{t.name}</Pill>
            <h4 className="mt-3 text-2xl leading-tight">The Long Quiet — Episode 4</h4>
            <p className="mt-1 text-sm text-muted-foreground">Amara Vale · 38 min</p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">
              There's a stream under this street. We went looking for a map and found a memory
              instead.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ember-gradient text-primary-foreground shadow-ember"
                aria-label="Play preview"
              >
                <Play size={18} fill="currentColor" />
              </button>
              <div className="min-w-0 flex-1">
                <Meter value={22} />
                <div className="mt-1.5 flex justify-between font-mono text-[11px] text-muted-foreground">
                  <span>08:24</span>
                  <span>38:10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-border bg-surface-raised p-4">
          <p className="text-xs font-medium text-muted-foreground">Conversation opens with</p>
          <p className="mt-1 text-sm">“What water runs under your city?”</p>
        </div>
      </Panel>
    </div>
  );
}

function PublishStep() {
  const [visibility, setVisibility] = useState("Public");
  const options = [
    { id: "Public", icon: Globe, body: "Everyone in Castaminofen can find it." },
    { id: "Community", icon: Users, body: "Only the circles you choose." },
    { id: "Private", icon: Lock, body: "Just you, for now." },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-2xl">Choose who it reaches</h3>
        <p className="mt-1 text-sm text-muted-foreground">You can change this after publishing.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => setVisibility(o.id)}
            className={cn(
              "rounded-3xl border p-5 text-left transition",
              visibility === o.id
                ? "border-ember/60 bg-ember/10 shadow-ember"
                : "border-border bg-surface hover:border-ember/40",
            )}
          >
            <o.icon size={18} className={visibility === o.id ? "text-ember" : "text-muted-foreground"} />
            <p className="mt-3 text-sm font-medium">{o.id}</p>
            <p className="mt-1 text-xs text-muted-foreground">{o.body}</p>
          </button>
        ))}
      </div>
      <Panel className="flex flex-wrap items-center gap-3">
        <p className="min-w-0 flex-1 text-sm text-muted-foreground">
          Publish now, or schedule for a quieter hour.
        </p>
        <Btn size="sm" variant="quiet">
          Schedule
        </Btn>
        <Btn size="sm" variant="ember">
          Publish
        </Btn>
      </Panel>
    </div>
  );
}

export function CreationWizard({
  open,
  onClose,
  initialType,
}: {
  open: boolean;
  onClose: () => void;
  initialType?: CreationTypeId;
}) {
  const [step, setStep] = useState(initialType ? 2 : 1);
  const [type, setType] = useState<CreationTypeId | undefined>(initialType);
  const [errored, setErrored] = useState(false);

  const progress = useMemo(() => Math.round((step / wizardSteps.length) * 100), [step]);
  if (!open) return null;

  const activeType = type ?? "podcast";

  const body = (
    <>
      {step === 1 && (
        <CreationTypeSelector
          value={type}
          onSelect={(id) => {
            setType(id);
            setStep(2);
          }}
        />
      )}
      {step === 2 && <MetadataForm type={activeType} />}
      {step === 3 && <MediaUploaderPreview />}
      {step === 4 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl">Enhance the piece</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Structure is what makes long content re-findable.
            </p>
          </div>
          <ChapterEditor />
          <TimestampEditor />
          <TranscriptPanel />
          <HighlightManager />
          <CommunityQuestions />
        </div>
      )}
      {step === 5 && <ContentPreview type={activeType} />}
      {step === 6 && <PublishStep />}
      {errored && <CreateErrorState onRetry={() => setErrored(false)} />}
    </>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close creation workspace"
        onClick={onClose}
        className="absolute inset-0 bg-background/70 backdrop-blur-md"
      />
      <div className="relative flex h-[92vh] w-full flex-col overflow-hidden rounded-t-[2rem] border border-border bg-background shadow-cinematic sm:h-[88vh] sm:max-w-6xl sm:rounded-[2rem]">
        <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-border sm:hidden" />
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border px-5 py-4 sm:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <TypeGlyph type={activeType} size="sm" />
            <div className="min-w-0">
              <p className="eyebrow">Create Studio</p>
              <h2 className="truncate text-lg">{creationTypeMap[activeType].name} workspace</h2>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="hidden text-xs text-muted-foreground sm:block">Draft saved</span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:text-foreground"
            >
              <X size={16} />
            </button>
          </div>
        </header>

        <div className="px-5 py-3 sm:hidden">
          <StepNavigation step={step} onStep={setStep} />
          <Meter value={progress} className="mt-3" />
        </div>

        <div className="flex min-h-0 flex-1">
          <aside className="hidden w-64 shrink-0 border-r border-border p-4 lg:block">
            <StepNavigation step={step} onStep={setStep} orientation="vertical" />
            <div className="mt-6 rounded-2xl border border-border bg-surface p-4">
              <p className="eyebrow">Progress</p>
              <Meter value={progress} className="mt-2" />
              <p className="mt-2 text-xs text-muted-foreground">{progress}% complete</p>
            </div>
          </aside>

          <main className="min-w-0 flex-1 overflow-y-auto p-5 sm:p-7">{body}</main>

          <aside className="hidden w-80 shrink-0 space-y-4 overflow-y-auto border-l border-border p-4 xl:block">
            <AIAssistant />
            <CollaborationPanel />
            <CommunityFeedback />
          </aside>
        </div>

        <footer className="flex items-center gap-3 border-t border-border px-5 py-4 sm:px-7">
          <Btn
            variant="ghost"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
          >
            <ArrowLeft size={16} /> Back
          </Btn>
          <button
            type="button"
            onClick={() => setErrored(true)}
            className="hidden text-xs text-muted-foreground hover:text-destructive sm:block"
          >
            Simulate failed action
          </button>
          <Btn
            variant="ember"
            className="ml-auto"
            onClick={() => setStep((s) => Math.min(wizardSteps.length, s + 1))}
          >
            {step === wizardSteps.length ? "Publish" : "Continue"} <ArrowRight size={16} />
          </Btn>
        </footer>
      </div>
    </div>
  );
}
