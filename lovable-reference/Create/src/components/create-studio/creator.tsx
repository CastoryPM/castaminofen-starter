import { Camera, Coins, Crown, ImagePlus, Star } from "lucide-react";
import { Btn, Field, Panel, Pill, inputClass } from "./primitives";

const interests = ["Sound design", "Urban history", "Interviews", "Fiction", "Field recording"];

export function CreatorIdentity() {
  return (
    <Panel>
      <h3 className="text-lg">Creator identity</h3>
      <p className="mt-1 text-xs text-muted-foreground">How the ecosystem knows you.</p>
      <div className="mt-5 flex items-center gap-4">
        <button
          type="button"
          className="relative grid h-20 w-20 shrink-0 place-items-center rounded-3xl border border-border bg-ember/10 text-ember transition hover:border-ember/60"
          aria-label="Change avatar"
        >
          <Camera size={20} strokeWidth={1.5} />
        </button>
        <div className="min-w-0 flex-1 space-y-3">
          <Field label="Creator name">
            <input className={inputClass} defaultValue="Amara Vale" aria-label="Creator name" />
          </Field>
        </div>
      </div>
      <div className="mt-4 space-y-4">
        <Field label="Bio" hint="140 characters">
          <textarea
            rows={3}
            className={inputClass}
            defaultValue="I record cities after midnight and ask them questions."
          />
        </Field>
        <div>
          <span className="mb-2 block text-sm font-medium">Categories & interests</span>
          <div className="flex flex-wrap gap-2">
            {interests.map((i) => (
              <button key={i} type="button" className="focus:outline-none">
                <Pill tone={i === "Interviews" ? "ember" : "neutral"}>{i}</Pill>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

export function CreatorBranding() {
  return (
    <Panel>
      <h3 className="text-lg">Creator branding</h3>
      <p className="mt-1 text-xs text-muted-foreground">Banner, style, featured work.</p>
      <div className="mt-4 grid h-28 place-items-center rounded-2xl border border-dashed border-border bg-stage text-muted-foreground">
        <span className="flex items-center gap-2 text-xs">
          <ImagePlus size={16} /> Add a profile banner
        </span>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {["Cinematic", "Editorial", "Warm & spoken", "Minimal"].map((s, i) => (
          <button
            key={s}
            type="button"
            className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
              i === 0 ? "border-ember/60 bg-ember/10 text-ember" : "border-border bg-surface-raised"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-border bg-surface-raised p-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Star size={15} className="text-ember" /> Featured content
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Pin one piece to the top of your creator page.
        </p>
      </div>
    </Panel>
  );
}

export function MonetizationPreview() {
  const items = [
    { icon: Coins, title: "Creator support", body: "Let listeners back your work directly." },
    { icon: Crown, title: "Premium content", body: "Reserve chapters for members." },
    { icon: Star, title: "Membership", body: "Recurring circles around your studio." },
  ];
  return (
    <Panel>
      <header className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-lg">Support & revenue</h3>
        <Pill>Coming soon</Pill>
      </header>
      <div className="grid gap-2 sm:grid-cols-3">
        {items.map((i) => (
          <div key={i.title} className="rounded-2xl border border-border bg-surface-raised p-4 opacity-80">
            <i.icon size={17} className="text-ember" />
            <p className="mt-2 text-sm font-medium">{i.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{i.body}</p>
          </div>
        ))}
      </div>
      <Btn size="sm" variant="ghost" className="mt-3" disabled>
        Revenue overview
      </Btn>
    </Panel>
  );
}
