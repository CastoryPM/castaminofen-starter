import { events } from "@/lib/community-data";
import { Avatar, GhostButton, SectionHeading, Tag } from "./Primitives";

export function CommunityEventCard({ event }: { event: (typeof events)[number] }) {
  const live = event.state === "live";
  return (
    <article className="surface-panel flex flex-col p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Tag tone={live ? "signal" : "neutral"}>
          {live ? <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" aria-hidden /> : null}
          {event.kind}
        </Tag>
        <span className="text-[11px] text-muted-foreground">{event.when}</span>
      </div>
      <h3 className="text-display mt-3 text-lg leading-snug">{event.title}</h3>
      <div className="mt-4 flex items-center gap-2.5">
        <Avatar person={event.host} size="sm" />
        <span className="truncate text-xs text-muted-foreground">
          {event.host.name} · {event.attending} attending
        </span>
      </div>
      <GhostButton className={"mt-4 w-full justify-center " + (live ? "border-signal/50 text-signal" : "")}>
        {live ? "Join now" : "Remind me"}
      </GhostButton>
    </article>
  );
}

export function CommunityEvents() {
  return (
    <section aria-labelledby="events-heading">
      <SectionHeading
        eyebrow="Together, live"
        title="Community events"
        description="Listening parties, book clubs, and sessions with the people who made the thing."
      />
      <h2 id="events-heading" className="sr-only">
        Community events
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {events.map((e) => (
          <CommunityEventCard key={e.id} event={e} />
        ))}
      </div>
    </section>
  );
}
