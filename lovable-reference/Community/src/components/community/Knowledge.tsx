import { collections, communityNotes, insights } from "@/lib/community-data";
import { Avatar, GhostButton, SectionHeading, Tag } from "./Primitives";

export function CommunityNotes() {
  return (
    <section aria-labelledby="notes-heading">
      <SectionHeading
        eyebrow="Knowledge layer"
        title="Community notes"
        description="Written together, versioned openly. Every note carries its contributors."
        action={<GhostButton className="hidden sm:inline-flex">Contribute a note</GhostButton>}
      />
      <h2 id="notes-heading" className="sr-only">
        Community notes
      </h2>

      <div className="grid gap-3 lg:grid-cols-3">
        {communityNotes.map((n) => (
          <article key={n.id} className="surface-panel p-5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-display text-lg">{n.heading}</h3>
              <Tag>{n.version}</Tag>
            </div>
            <ul className="mt-4 space-y-2.5">
              {n.points.map((p) => (
                <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-foreground/85">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[11px] text-muted-foreground">{n.contributors} contributors</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function InsightCard() {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {insights.map((i) => (
        <figure
          key={i.id}
          className="surface-panel relative overflow-hidden p-6"
        >
          <span
            className="pointer-events-none absolute -left-4 -top-8 text-[120px] leading-none text-primary/10"
            aria-hidden
          >
            “
          </span>
          <blockquote className="text-display relative text-xl leading-snug sm:text-2xl">
            {i.quote}
          </blockquote>
          <figcaption className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <Avatar person={i.author} size="sm" />
              <span className="truncate text-xs text-muted-foreground">
                {i.author.name} · {i.source}
              </span>
            </div>
            <GhostButton className="shrink-0">Save · {i.saves}</GhostButton>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function KnowledgeCollection() {
  return (
    <section aria-labelledby="collections-heading">
      <SectionHeading
        eyebrow="Shared learning"
        title="Collections built together"
        description="Curated by many hands. Every entry has to earn its place."
      />
      <h2 id="collections-heading" className="sr-only">
        Knowledge collections
      </h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {collections.map((c) => (
          <article key={c.id} className="group surface-panel cursor-pointer p-5 transition-all hover:-translate-y-0.5">
            <div className="flex h-16 items-end gap-1" aria-hidden>
              {[38, 56, 30, 64, 44, 22].map((h, i) => (
                <span
                  key={i}
                  className="w-full rounded-t-sm bg-insight/25 transition-colors duration-300 group-hover:bg-insight/45"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <h3 className="text-display mt-4 text-lg">{c.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{c.blurb}</p>
            <p className="mt-4 text-[11px] text-muted-foreground">
              {c.items} items · {c.curators} curators
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ContentAnalysis() {
  return (
    <section className="surface-panel p-5 sm:p-6" aria-labelledby="breakdown-heading">
      <p className="label-eyebrow">Community breakdown</p>
      <h2 id="breakdown-heading" className="text-display mt-1.5 text-2xl">
        How the community reads Episode 42
      </h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {[
          { t: "Key ideas", items: ["Craft relocates, it doesn't vanish", "Memory is negotiated", "Disclosure > neutrality"] },
          { t: "Different opinions", items: ["The asymmetry objection", "Tools as co-authors", "Nothing new since photography"] },
          { t: "References", items: ["Storm & Levy, 2012", "Ep. 17 — The Archive Problem", "Essay: After the First Draft"] },
        ].map((col) => (
          <div key={col.t} className="rounded-2xl border border-border bg-background/40 p-4">
            <h3 className="text-xs font-medium tracking-wide text-foreground">{col.t}</h3>
            <ul className="mt-3 space-y-2">
              {col.items.map((it) => (
                <li key={it} className="text-sm leading-relaxed text-muted-foreground">
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
