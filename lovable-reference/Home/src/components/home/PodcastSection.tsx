import { Play } from "lucide-react";
import { podcastEpisodes, creators } from "@/data/home";
import { SectionHeader } from "./MediaCarousel";

/** Dedicated podcast surface: latest episodes as rows + creator shortcuts. */
export function PodcastSection() {
  return (
    <section className="py-6 lg:py-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader title="Podcasts" subtitle="New episodes and the conversations around them" />
        <div className="grid gap-2.5 px-4 sm:px-6 lg:grid-cols-2">
          {podcastEpisodes.map((ep) => (
            <article
              key={ep.id}
              className="group card-elevated grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3.5 rounded-2xl p-3"
            >
              <img
                src={ep.artwork}
                alt=""
                loading="lazy"
                className="size-16 shrink-0 rounded-xl object-cover sm:size-[72px]"
              />
              <div className="min-w-0">
                {ep.meta ? (
                  <span className="text-[10px] font-semibold tracking-[0.16em] text-ember uppercase">
                    {ep.meta}
                  </span>
                ) : null}
                <h3 className="mt-0.5 truncate text-sm font-semibold">{ep.title}</h3>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">{ep.creator}</p>
                <p className="mt-1 text-[11px] text-muted-foreground/80">{ep.duration}</p>
              </div>
              <button
                type="button"
                aria-label={`Play ${ep.title}`}
                className="grid size-10 shrink-0 place-items-center rounded-full border border-border bg-surface-raised transition-colors group-hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <Play className="size-4 translate-x-px fill-current" />
              </button>
            </article>
          ))}
        </div>

        <div className="rail edge-fade mt-4 px-4 sm:px-6">
          {creators.slice(0, 5).map((c) => (
            <button
              key={c.id}
              type="button"
              className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface py-1.5 pr-4 pl-1.5 text-sm transition-colors hover:bg-surface-raised focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <span className="grid size-8 place-items-center rounded-full bg-surface-raised text-[11px] font-semibold">
                {c.initials}
              </span>
              <span className="whitespace-nowrap">{c.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
