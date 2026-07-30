import { Play } from "lucide-react";
import type { MediaItem } from "@/data/home";

/** Square-artwork podcast card used across discovery shelves. */
export function PodcastCard({ item }: { item: MediaItem }) {
  return (
    <article className="group w-[156px] sm:w-[178px]">
      <div className="relative overflow-hidden rounded-2xl border border-hairline shadow-[var(--shadow-card)]">
        <img
          src={item.artwork}
          alt=""
          loading="lazy"
          className="aspect-square size-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-background/0 transition-colors duration-300 group-hover:bg-background/25" />
        <button
          type="button"
          aria-label={`Play ${item.title}`}
          className="absolute right-2 bottom-2 grid size-9 translate-y-1 place-items-center rounded-full bg-background/85 text-foreground opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <Play className="size-4 translate-x-px fill-current" />
        </button>
      </div>
      <h3 className="mt-2.5 truncate text-sm font-semibold">{item.title}</h3>
      <p className="mt-0.5 truncate text-xs text-muted-foreground">{item.creator}</p>
      <p className="mt-1 text-[11px] text-muted-foreground/80">
        {item.meta ? `${item.meta} · ` : ""}
        {item.duration}
      </p>
    </article>
  );
}
