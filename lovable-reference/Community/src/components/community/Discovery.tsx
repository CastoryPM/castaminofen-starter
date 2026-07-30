import { personalizedFeed, topicSpaces } from "@/lib/community-data";
import { Avatar, GhostButton, SectionHeading, Tag } from "./Primitives";

export function PersonalizedFeed() {
  return (
    <section aria-labelledby="foryou-heading">
      <SectionHeading
        eyebrow="For you"
        title="Shaped by what you follow"
        description="Drawn from your topics, creators, listening history, and the spaces you joined. Finite by design — it ends."
        action={<GhostButton className="hidden sm:inline-flex">Tune this feed</GhostButton>}
      />
      <h2 id="foryou-heading" className="sr-only">
        Personalized feed
      </h2>

      <ul className="grid gap-3">
        {personalizedFeed.map((item) => (
          <li
            key={item.id}
            className="group surface-panel cursor-pointer p-5 transition-colors duration-300 hover:border-border-strong"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Tag tone={item.type === "Insight" ? "insight" : item.type === "Question" ? "primary" : "neutral"}>
                {item.type}
              </Tag>
              <span className="text-[11px] text-muted-foreground">{item.reason}</span>
            </div>
            <h3 className="text-display mt-3 text-lg sm:text-xl">{item.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <Avatar person={item.author} size="sm" />
                <span className="truncate text-xs text-muted-foreground">{item.author.name}</span>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">{item.meta}</span>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        That's everything relevant today. Nothing infinite below.
      </p>
    </section>
  );
}

export function TopicCommunities() {
  return (
    <section aria-labelledby="spaces-heading">
      <SectionHeading
        eyebrow="Community spaces"
        title="Rooms with a point of view"
        description="Each space keeps its own discussions, members, and featured content."
      />
      <h2 id="spaces-heading" className="sr-only">
        Topic communities
      </h2>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {topicSpaces.map((s) => (
          <article
            key={s.id}
            className="group surface-panel cursor-pointer p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong"
          >
            <div className="flex items-center gap-3">
              <span
                className={
                  "grid h-10 w-10 shrink-0 place-items-center rounded-xl border text-sm " +
                  (s.hue === "insight"
                    ? "border-insight/30 bg-insight/10 text-insight"
                    : s.hue === "signal"
                      ? "border-signal/30 bg-signal/10 text-signal"
                      : "border-primary/30 bg-primary/10 text-primary")
                }
                aria-hidden
              >
                {s.name.slice(0, 1)}
              </span>
              <div className="min-w-0">
                <h3 className="truncate text-sm font-medium text-foreground">{s.name}</h3>
                <p className="truncate text-xs text-muted-foreground">{s.blurb}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>{s.members} members</span>
              <span>{s.discussions} discussions</span>
            </div>
            <GhostButton className="mt-4 w-full justify-center">Enter space</GhostButton>
          </article>
        ))}
      </div>
    </section>
  );
}
