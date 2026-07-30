import { Headphones, Play, Shuffle } from "lucide-react";

function greeting(hour: number) {
  if (hour < 5) return "Still awake";
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

/**
 * Personalized entry point. Greeting is derived client-side from the clock at
 * integration time; here it uses a stable fixture hour to avoid SSR mismatch.
 */
export function WelcomeHero({ name = "Elin", hour = 19 }: { name?: string; hour?: number }) {
  return (
    <section className="relative overflow-hidden">
      <div className="aurora absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 pt-8 pb-6 sm:px-6 lg:pt-14 lg:pb-10">
        <p className="text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
          {greeting(hour)}, {name}
        </p>
        <h1 className="mt-3 max-w-2xl font-display text-3xl leading-[1.08] font-semibold text-balance sm:text-4xl lg:text-5xl">
          Continue your journey through{" "}
          <span className="ember-text">sound, story and screen.</span>
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Three unfinished episodes, a chapter waiting at 27%, and eleven new
          things picked for the way you actually listen.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-ember)] px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-card)] transition-transform hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <Play className="size-4 fill-current" />
            Resume listening
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium transition-colors hover:bg-surface-raised focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <Shuffle className="size-4" />
            Surprise me
          </button>
          <span className="ml-1 hidden items-center gap-2 text-xs text-muted-foreground sm:inline-flex">
            <Headphones className="size-4" />
            4 h 12 listened this week
          </span>
        </div>
      </div>
    </section>
  );
}
