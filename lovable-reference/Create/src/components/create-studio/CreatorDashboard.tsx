import {
  Archive,
  CalendarClock,
  Copy,
  MoreHorizontal,
  Pencil,
  Play,
  Trophy,
} from "lucide-react";
import {
  creationTypeMap,
  drafts,
  journeyStats,
  milestones,
  published,
  type CreationTypeId,
} from "./data";
import { Btn, Meter, Panel, Pill, SectionHeader, TypeGlyph } from "./primitives";
import { CreateEmptyState } from "./states";

export function DraftSection({ onContinue }: { onContinue: (t: CreationTypeId) => void }) {
  if (drafts.length === 0) {
    return (
      <section>
        <SectionHeader eyebrow="In progress" title="Drafts" />
        <CreateEmptyState />
      </section>
    );
  }
  return (
    <section>
      <SectionHeader
        eyebrow="In progress"
        title="Drafts"
        action={
          <Btn size="sm" variant="ghost">
            Manage all
          </Btn>
        }
      />
      <div className="grid gap-3 lg:grid-cols-3">
        {drafts.map((d) => (
          <article
            key={d.id}
            className="group flex flex-col rounded-3xl border border-border bg-surface p-5 transition hover:-translate-y-0.5 hover:shadow-cinematic"
          >
            <div className="flex items-start gap-3">
              <TypeGlyph type={d.type} />
              <div className="min-w-0 flex-1">
                <p className="eyebrow">{creationTypeMap[d.type].name}</p>
                <h3 className="mt-1 line-clamp-2 text-lg leading-snug">{d.title}</h3>
              </div>
              <button
                type="button"
                aria-label="More actions"
                className="shrink-0 rounded-lg p-1 text-muted-foreground hover:text-foreground"
              >
                <MoreHorizontal size={17} />
              </button>
            </div>
            <div className="mt-4">
              <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
                <span>{d.progress}% complete</span>
                <span>{d.lastEdited}</span>
              </div>
              <Meter value={d.progress} />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {d.missing.map((m) => (
                <Pill key={m}>Needs {m.toLowerCase()}</Pill>
              ))}
            </div>
            <Btn
              variant="ember"
              size="sm"
              className="mt-4 w-full"
              onClick={() => onContinue(d.type)}
            >
              Continue creating
            </Btn>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PublishedSection() {
  return (
    <section>
      <SectionHeader
        eyebrow="Out in the world"
        title="Published"
        action={
          <Btn size="sm" variant="ghost">
            Content manager
          </Btn>
        }
      />
      <ul className="divide-y divide-border overflow-hidden rounded-3xl border border-border bg-surface">
        {published.map((p) => (
          <li key={p.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 p-4 sm:p-5">
            <TypeGlyph type={p.type} size="sm" />
            <div className="min-w-0">
              <h3 className="truncate text-base">{p.title}</h3>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{p.meta}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Pill tone={p.status === "Live" ? "verdant" : "signal"}>{p.status}</Pill>
                <Pill>{p.visibility}</Pill>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1 text-muted-foreground">
              {[Play, Pencil, Copy, CalendarClock, Archive].map((Icon, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label="Content action"
                  className="hidden rounded-xl p-2 transition hover:bg-secondary hover:text-foreground sm:block"
                >
                  <Icon size={15} />
                </button>
              ))}
              <button
                type="button"
                aria-label="Actions"
                className="rounded-xl p-2 hover:text-foreground sm:hidden"
              >
                <MoreHorizontal size={17} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CreatorJourney() {
  return (
    <section>
      <SectionHeader eyebrow="Your path" title="Creator journey" />
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <Panel className="bg-stage">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {journeyStats.map((s) => (
              <div key={s.label} className="min-w-0">
                <p className="text-display text-3xl text-ember">{s.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <div className="mb-2 flex justify-between text-xs text-muted-foreground">
              <span>Toward your next milestone</span>
              <span>3 of 5</span>
            </div>
            <Meter value={60} />
            <p className="mt-3 text-sm text-foreground/80">
              You created 5 episodes and started 318 conversations. The next chapter is a
              collaboration.
            </p>
          </div>
        </Panel>
        <Panel>
          <h3 className="flex items-center gap-2 text-lg">
            <Trophy size={16} className="text-ember" /> Milestones
          </h3>
          <ul className="mt-4 space-y-2.5">
            {milestones.map((m) => (
              <li key={m.label} className="flex items-center gap-3 text-sm">
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[10px] ${
                    m.done
                      ? "border-ember/40 bg-ember/15 text-ember"
                      : "border-dashed border-border text-muted-foreground"
                  }`}
                >
                  {m.done ? "✓" : ""}
                </span>
                <span className={m.done ? "" : "text-muted-foreground"}>{m.label}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </section>
  );
}
