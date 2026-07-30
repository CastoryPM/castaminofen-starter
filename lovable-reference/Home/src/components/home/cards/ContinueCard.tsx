import { Play } from "lucide-react";
import type { MediaItem } from "@/data/home";
import { typeLabel } from "@/data/home";
import { ProgressBar } from "../ProgressBar";
import { cn } from "@/lib/utils";

/**
 * Continue-experience card. Wide 16:10 artwork, format badge, progress rail
 * and a resume affordance that appears on hover / focus (always visible on
 * touch, where hover doesn't exist).
 */
export function ContinueCard({ item }: { item: MediaItem }) {
  return (
    <article className="group card-elevated w-[248px] overflow-hidden rounded-2xl sm:w-[292px]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={item.artwork}
          alt=""
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="veil absolute inset-0" aria-hidden />
        <span className="absolute top-2.5 left-2.5 rounded-full bg-background/70 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase backdrop-blur">
          {typeLabel[item.type]}
        </span>
        <button
          type="button"
          aria-label={`Resume ${item.title}`}
          className={cn(
            "absolute right-2.5 bottom-2.5 grid size-11 place-items-center rounded-full bg-[image:var(--gradient-ember)] text-primary-foreground shadow-[var(--shadow-card)]",
            "transition-transform duration-300 group-hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
          )}
        >
          <Play className="size-4.5 translate-x-px fill-current" />
        </button>
      </div>
      <div className="p-3.5">
        <h3 className="truncate text-sm font-semibold">{item.title}</h3>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">{item.creator}</p>
        <ProgressBar value={item.progress ?? 0} className="mt-3" label={`${item.title} progress`} />
        <p className="mt-2 text-[11px] text-muted-foreground">{item.duration}</p>
      </div>
    </article>
  );
}
