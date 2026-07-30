import { ChevronRight } from "lucide-react";
import { SectionTitle } from "./primitives";
import {
  FeaturedResult,
  EpisodeResultCard,
  PodcastResultCard,
  VideoResultCard,
  AudiobookResultCard,
  ShortResultCard,
  CreatorResultCard,
  CommunityResultCard,
} from "./ResultCards";
import {
  EPISODES,
  PODCASTS,
  VIDEOS,
  AUDIOBOOKS,
  SHORTS,
  CREATORS,
  COMMUNITY,
} from "@/data/search-data";
import type { Filters } from "./filters";

function SeeAll() {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-0.5 text-xs font-medium text-primary transition-colors hover:text-accent"
    >
      See all
      <ChevronRight className="size-3.5" />
    </button>
  );
}

export function SearchResults({ filters }: { filters: Filters }) {
  const show = (t: Filters["type"]) => filters.type === "All" || filters.type === t;

  return (
    <div className="space-y-10">
      {filters.type === "All" ? <FeaturedResult /> : null}

      {show("Podcasts") ? (
        <section aria-label="Episode results">
          <SectionTitle title="Episodes" caption="Best matching episodes" action={<SeeAll />} />
          <div className="space-y-3">
            {EPISODES.map((e) => (
              <EpisodeResultCard key={e.id} item={e} />
            ))}
          </div>
        </section>
      ) : null}

      {show("Podcasts") ? (
        <section aria-label="Podcast results">
          <SectionTitle title="Podcasts" action={<SeeAll />} />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {PODCASTS.map((p) => (
              <PodcastResultCard key={p.id} item={p} />
            ))}
          </div>
        </section>
      ) : null}

      {show("Videos") ? (
        <section aria-label="Video results">
          <SectionTitle title="Videos" action={<SeeAll />} />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {VIDEOS.map((v) => (
              <VideoResultCard key={v.id} item={v} />
            ))}
          </div>
        </section>
      ) : null}

      {show("Audiobooks") ? (
        <section aria-label="Audiobook results">
          <SectionTitle title="Audiobooks" action={<SeeAll />} />
          <div className="grid gap-3 xl:grid-cols-2">
            {AUDIOBOOKS.map((a) => (
              <AudiobookResultCard key={a.id} item={a} />
            ))}
          </div>
        </section>
      ) : null}

      {show("Shorts") ? (
        <section aria-label="Shorts results">
          <SectionTitle title="Shorts" caption="Swipe-length discoveries" action={<SeeAll />} />
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-4 sm:px-0">
            {SHORTS.map((s) => (
              <ShortResultCard key={s.id} item={s} />
            ))}
          </div>
        </section>
      ) : null}

      {show("Creators") ? (
        <section aria-label="Creator results">
          <SectionTitle title="Creators" action={<SeeAll />} />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {CREATORS.map((c) => (
              <CreatorResultCard key={c.id} item={c} />
            ))}
          </div>
        </section>
      ) : null}

      {show("Community") ? (
        <section aria-label="Community results">
          <SectionTitle
            title="Community"
            caption="Discussions tied to this search"
            action={<SeeAll />}
          />
          <div className="grid gap-3 xl:grid-cols-2">
            {COMMUNITY.map((d) => (
              <CommunityResultCard key={d.id} item={d} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}