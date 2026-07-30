import { useState } from "react";
import { topicSpaces } from "@/lib/community-data";
import { CommunityHeader } from "./CommunityHeader";
import { TrendingConversations } from "./TrendingConversations";
import { PersonalizedFeed, TopicCommunities } from "./Discovery";
import { DiscussionRoom } from "./Discussion";
import { ContentDiscussionHeader, TimestampTimeline } from "./ContentDiscussion";
import { CommunityNotes, ContentAnalysis, InsightCard, KnowledgeCollection } from "./Knowledge";
import { CoCreation } from "./CoCreation";
import { CommunityEvents } from "./Events";
import { SmartLayer } from "./SmartLayer";
import {
  ContributorProfile,
  DailyPulse,
  NotificationsPreview,
  ReturningConversations,
  SavedKnowledge,
} from "./Identity";
import { EmptyCommunityState, ErrorState, LoadingState } from "./States";
import { CreateDiscussion } from "./CreateDiscussion";
import { MobileNav } from "./MobileNav";
import { GhostButton, SectionHeading, Tag } from "./Primitives";

function LeftRail() {
  return (
    <aside className="hidden lg:block" aria-label="Communities">
      <div className="sticky top-6 space-y-5">
        <div className="surface-panel p-4">
          <p className="label-eyebrow px-1">Your spaces</p>
          <ul className="mt-3 space-y-0.5">
            {topicSpaces.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  aria-current={i === 0 ? "true" : undefined}
                  className={
                    "focus-ring flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors " +
                    (i === 0
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-surface-raised hover:text-foreground")
                  }
                >
                  <span className="truncate">{s.name}</span>
                  <span className="shrink-0 text-[10px] tabular-nums opacity-70">{s.members}</span>
                </button>
              </li>
            ))}
          </ul>
          <GhostButton className="mt-3 w-full justify-center">Browse all spaces</GhostButton>
        </div>

        <div className="surface-panel p-4">
          <p className="label-eyebrow px-1">Filters</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["Unanswered", "Creator replied", "Deep dives", "Timestamped", "Notes"].map((f, i) => (
              <GhostButton key={f} active={i === 2}>
                {f}
              </GhostButton>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

function RightRail() {
  return (
    <aside className="space-y-4 xl:block" aria-label="Related and personal">
      <div className="sticky top-6 space-y-4">
        <NotificationsPreview />
        <DailyPulse />
        <ContributorProfile />
        <ReturningConversations />
        <SavedKnowledge />
      </div>
    </aside>
  );
}

function SearchResults({ query }: { query: string }) {
  const groups = [
    { label: "Discussions", items: ["Is AI changing creativity forever?", "Episode 42 — the memory argument"] },
    { label: "Topics", items: ["Technology", "Philosophy"] },
    { label: "People", items: ["Amara Vance · Creator", "Neve Okafor · Community Helper"] },
    { label: "Insights", items: ["“The craft moved to the second draft.”"] },
  ];
  return (
    <section className="surface-panel p-5" aria-live="polite">
      <p className="label-eyebrow">Community search</p>
      <h2 className="text-display mt-1.5 text-xl">Results for “{query}”</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {groups.map((g) => (
          <div key={g.label}>
            <p className="text-[11px] tracking-wide text-muted-foreground">{g.label}</p>
            <ul className="mt-2 space-y-1.5">
              {g.items.map((i) => (
                <li key={i} className="truncate text-sm text-foreground/85">
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CommunityPage() {
  const [composerOpen, setComposerOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [statesDemo, setStatesDemo] = useState<"loading" | "empty" | "error">("loading");

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-10">
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_330px]">
          <LeftRail />

          <main className="min-w-0 space-y-14">
            <CommunityHeader onCreate={() => setComposerOpen(true)} query={query} onQuery={setQuery} />

            {query ? <SearchResults query={query} /> : null}

            <TrendingConversations onOpen={() => setComposerOpen(false)} />

            <PersonalizedFeed />

            <TopicCommunities />

            <section aria-labelledby="room-section" className="space-y-4">
              <SectionHeading
                eyebrow="Content discussion room"
                title="Every piece of content gets a room"
                description="Artwork, creator, participants — and a timeline you can argue with, minute by minute."
              />
              <h2 id="room-section" className="sr-only">
                Content discussion room
              </h2>
              <ContentDiscussionHeader />
              <TimestampTimeline />
              <DiscussionRoom />
            </section>

            <section className="space-y-4">
              <CommunityNotes />
              <InsightCard />
              <ContentAnalysis />
            </section>

            <KnowledgeCollection />

            <CoCreation />

            <CommunityEvents />

            <SmartLayer />

            <section aria-labelledby="states-heading">
              <SectionHeading
                eyebrow="Interaction states"
                title="How it behaves when there's nothing"
                action={
                  <div className="flex gap-1.5">
                    {(["loading", "empty", "error"] as const).map((s) => (
                      <GhostButton key={s} active={statesDemo === s} onClick={() => setStatesDemo(s)}>
                        {s}
                      </GhostButton>
                    ))}
                  </div>
                }
              />
              <h2 id="states-heading" className="sr-only">
                Interaction states
              </h2>
              {statesDemo === "loading" ? <LoadingState /> : null}
              {statesDemo === "empty" ? <EmptyCommunityState onCreate={() => setComposerOpen(true)} /> : null}
              {statesDemo === "error" ? <ErrorState /> : null}
            </section>

            <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
              <p className="text-xs text-muted-foreground">
                Castaminofen Community — media becomes a living conversation.
              </p>
              <Tag tone="primary">Built for daily return, not endless scroll</Tag>
            </footer>
          </main>

          <div className="hidden xl:block">
            <RightRail />
          </div>
        </div>
      </div>

      <CreateDiscussion open={composerOpen} onClose={() => setComposerOpen(false)} />
      <MobileNav onCreate={() => setComposerOpen(true)} />
    </div>
  );
}
