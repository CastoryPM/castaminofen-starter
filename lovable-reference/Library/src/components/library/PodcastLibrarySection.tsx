import { Play } from "lucide-react";
import { followedShows, savedEpisodes } from "@/lib/library-data";
import { PodcastCard } from "./cards";
import { ProgressLine, Rail, Section, SectionHeader } from "./primitives";

export function PodcastLibrarySection() {
  return (
    <Section>
      <SectionHeader eyebrow="My podcasts" title="Followed shows" action="All shows" />
      <Rail>
        {followedShows.map((show) => (
          <PodcastCard key={show.id} show={show} />
        ))}
      </Rail>

      <h3 className="mb-3 mt-9 text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
        Saved episodes
      </h3>
      <ul className="divide-y divide-border overflow-hidden rounded-2xl surface-panel">
        {savedEpisodes.map((episode) => (
          <li
            key={episode.id}
            className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4 py-3.5 transition-colors hover:bg-elevated/60"
          >
            <button
              aria-label={`Play ${episode.title}`}
              className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-primary transition-colors hover:bg-elevated"
            >
              <Play className="size-3.5 fill-current" />
            </button>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{episode.title}</p>
              <p className="truncate text-xs text-muted-foreground">{episode.show}</p>
              {episode.progress > 0 && episode.progress < 100 ? (
                <ProgressLine value={episode.progress} className="mt-2 max-w-40" />
              ) : null}
            </div>
            <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
              {episode.progress === 100 ? "Played" : episode.duration}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
