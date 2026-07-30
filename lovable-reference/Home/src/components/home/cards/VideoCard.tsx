import { Eye, Play } from "lucide-react";
import type { MediaItem } from "@/data/home";

/** 16:9 video card with duration chip and views indicator. */
export function VideoCard({ item }: { item: MediaItem }) {
  return (
    <article className="group w-[260px] sm:w-[320px]">
      <div className="relative overflow-hidden rounded-2xl border border-hairline shadow-[var(--shadow-card)]">
        <img
          src={item.artwork}
          alt=""
          loading="lazy"
          className="aspect-video size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="veil absolute inset-0 opacity-70" aria-hidden />
        <span className="absolute right-2 bottom-2 rounded-md bg-background/80 px-1.5 py-0.5 text-[11px] font-medium tabular-nums backdrop-blur">
          {item.duration}
        </span>
        <button
          type="button"
          aria-label={`Play ${item.title}`}
          className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none"
        >
          <span className="grid size-12 place-items-center rounded-full bg-[image:var(--gradient-ember)] text-primary-foreground shadow-[var(--shadow-float)]">
            <Play className="size-5 translate-x-px fill-current" />
          </span>
        </button>
      </div>
      <h3 className="mt-2.5 line-clamp-2 text-sm leading-snug font-semibold">{item.title}</h3>
      <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-muted-foreground">
        {item.creator}
        {item.meta ? (
          <>
            <span aria-hidden>·</span>
            <Eye className="size-3.5" />
            {item.meta}
          </>
        ) : null}
      </p>
    </article>
  );
}
