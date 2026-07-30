import { Bookmark, Play } from "lucide-react";
import { featured } from "@/data/home";

/** Cinematic featured slot: full-bleed artwork on mobile, split on desktop. */
export function FeaturedContentHero() {
  return (
    <section className="py-6 lg:py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="card-elevated relative overflow-hidden rounded-3xl">
          <div className="grid lg:grid-cols-[1.05fr_1fr]">
            <div className="relative aspect-[16/10] lg:order-2 lg:aspect-auto lg:min-h-[400px]">
              <img
                src={featured.artwork}
                alt={`Cover art for ${featured.title}`}
                width={1280}
                height={960}
                className="size-full object-cover"
              />
              <div
                className="veil absolute inset-0 lg:bg-[linear-gradient(90deg,var(--surface)_0%,transparent_55%)]"
                aria-hidden
              />
            </div>

            <div className="relative -mt-12 p-5 sm:p-7 lg:order-1 lg:mt-0 lg:flex lg:flex-col lg:justify-center lg:p-10">
              <p className="text-[11px] tracking-[0.2em] text-ember uppercase">
                {featured.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-2xl leading-tight font-semibold text-balance sm:text-3xl lg:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {featured.creator} · {featured.duration}
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                {featured.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-ember)] px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <Play className="size-4 fill-current" />
                  Play episode
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-raised px-5 py-3 text-sm font-medium transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <Bookmark className="size-4" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
