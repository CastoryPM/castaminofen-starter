import { trendingConversations, people } from "@/lib/community-data";
import { Avatar, AvatarStack, SectionHeading, Tag } from "./Primitives";

const stack = [people.amara, people.tobias, people.neve, people.idris];

export function TrendingConversations({ onOpen }: { onOpen: () => void }) {
  return (
    <section aria-labelledby="trending-heading">
      <SectionHeading
        eyebrow="Right now"
        title="Trending conversations"
        description="What the community is thinking through today — not what shouted loudest."
      />
      <h2 id="trending-heading" className="sr-only">
        Trending conversations
      </h2>

      <div className="grid gap-4 lg:grid-cols-2">
        {trendingConversations.map((c, i) => (
          <article
            key={c.id}
            className="group surface-panel relative cursor-pointer overflow-hidden p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong sm:p-6"
            onClick={onOpen}
          >
            <div
              className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden
            />
            <div className="flex flex-wrap items-center gap-2">
              <Tag tone={c.activity === "Live" ? "signal" : c.activity === "Rising" ? "primary" : "neutral"}>
                {c.activity === "Live" ? (
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" aria-hidden />
                ) : null}
                {c.activity}
              </Tag>
              <Tag>{c.space}</Tag>
              <span className="text-[11px] text-muted-foreground">{c.readTime}</span>
            </div>

            <h3 className="text-display mt-4 text-xl sm:text-2xl">{c.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{c.excerpt}</p>

            <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-background/50 px-3 py-2">
              <span className="label-eyebrow shrink-0">{c.relatedContent.kind}</span>
              <span className="truncate text-xs text-foreground/80">{c.relatedContent.title}</span>
            </div>

            <footer className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <Avatar person={c.author} size="sm" />
                <span className="truncate text-xs text-muted-foreground">
                  {c.author.name}
                  {c.author.role === "creator" ? " · Creator" : ""}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <AvatarStack people={stack.slice(0, 3 + (i % 2))} extra={c.participants - 4} />
                <span className="text-xs text-muted-foreground">{c.reactions} reactions</span>
              </div>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
