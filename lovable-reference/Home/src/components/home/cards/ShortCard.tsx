import { Heart, MessageCircle, Play } from "lucide-react";
import type { Short } from "@/data/home";

/** Vertical short-form card: 9:16 artwork with copy set inside the veil. */
export function ShortCard({ item }: { item: Short }) {
  return (
    <article className="group relative w-[152px] overflow-hidden rounded-2xl border border-hairline shadow-[var(--shadow-card)] sm:w-[172px]">
      <img
        src={item.artwork}
        alt=""
        loading="lazy"
        className="aspect-[9/16] size-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
      />
      <div className="veil absolute inset-0" aria-hidden />
      <span className="absolute top-2 right-2 rounded-md bg-background/75 px-1.5 py-0.5 text-[10px] font-medium tabular-nums backdrop-blur">
        {item.duration}
      </span>
      <span className="absolute top-2 left-2 grid size-8 place-items-center rounded-full bg-background/70 backdrop-blur transition-transform duration-300 group-hover:scale-105">
        <Play className="size-3.5 translate-x-px fill-current" />
      </span>
      <div className="absolute inset-x-0 bottom-0 p-3">
        <h3 className="line-clamp-2 text-xs leading-snug font-semibold">{item.title}</h3>
        <p className="mt-1 truncate text-[11px] text-muted-foreground">{item.creator}</p>
        <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Heart className="size-3.5" />
            {item.reactions}
          </span>
          <span className="inline-flex items-center gap-1">
            <MessageCircle className="size-3.5" />
            {item.comments}
          </span>
        </div>
      </div>
    </article>
  );
}
