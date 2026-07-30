import { GhostButton, SectionHeading } from "./Primitives";

export function SmartLayer() {
  return (
    <section aria-labelledby="smart-heading">
      <SectionHeading
        eyebrow="Coming to community"
        title="Smart layers, still human"
        description="Assistance that compresses noise instead of generating it. Preview only."
      />
      <h2 id="smart-heading" className="sr-only">
        Smart community concepts
      </h2>

      <div className="grid gap-3 lg:grid-cols-3">
        <article className="surface-panel relative overflow-hidden p-5">
          <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-cinematic)" }} aria-hidden />
          <div className="relative">
            <p className="label-eyebrow">Preview</p>
            <h3 className="text-display mt-2 text-lg">Summarize this conversation</h3>
            <div className="mt-4 space-y-2">
              {[92, 74, 58].map((w, i) => (
                <span key={i} className="block h-2 rounded-full bg-foreground/10" style={{ width: `${w}%` }} aria-hidden />
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Three positions, one unresolved objection, one citation added by the room.
            </p>
            <GhostButton className="mt-4">Try summary</GhostButton>
          </div>
        </article>

        <article className="surface-panel p-5">
          <p className="label-eyebrow">Preview</p>
          <h3 className="text-display mt-2 text-lg">People with similar views</h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {["AV", "TL", "NO", "IB", "MS", "+12"].map((n) => (
              <span
                key={n}
                className="grid h-9 w-9 place-items-center rounded-full border border-insight/30 bg-insight/10 text-[10px] text-insight"
              >
                {n}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Matched on the arguments you agreed with — including the ones you argued against.
          </p>
          <GhostButton className="mt-4">See overlap</GhostButton>
        </article>

        <article className="surface-panel p-5">
          <p className="label-eyebrow">Preview</p>
          <h3 className="text-display mt-2 text-lg">Knowledge map</h3>
          <svg viewBox="0 0 200 110" className="mt-4 w-full" role="img" aria-label="Connected ideas map preview">
            <g stroke="var(--color-border-strong)" strokeWidth="1">
              <line x1="40" y1="30" x2="100" y2="55" />
              <line x1="100" y1="55" x2="160" y2="28" />
              <line x1="100" y1="55" x2="70" y2="92" />
              <line x1="100" y1="55" x2="150" y2="88" />
            </g>
            <g>
              {[
                [40, 30, 5],
                [160, 28, 4],
                [70, 92, 4],
                [150, 88, 5],
              ].map(([x, y, r], i) => (
                <circle key={i} cx={x} cy={y} r={r} fill="var(--color-insight)" opacity="0.65" />
              ))}
              <circle cx="100" cy="55" r="9" fill="var(--color-primary)" />
            </g>
          </svg>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Explore how one idea in Episode 42 connects to four other conversations.
          </p>
          <GhostButton className="mt-4">Explore map</GhostButton>
        </article>
      </div>
    </section>
  );
}
