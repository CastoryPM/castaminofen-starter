import { useState } from "react";
import { Check, Plus } from "lucide-react";
import type { Creator } from "@/data/home";
import { cn } from "@/lib/utils";

/** Creator card with local-only follow state (presentation, no backend). */
export function CreatorCard({ creator }: { creator: Creator }) {
  const [following, setFollowing] = useState(false);

  return (
    <article className="card-elevated flex w-[168px] flex-col items-center rounded-2xl px-4 py-5 text-center sm:w-[186px]">
      <span className="grid size-16 place-items-center rounded-full bg-[image:var(--gradient-ember)] font-display text-lg font-semibold text-primary-foreground">
        {creator.initials}
      </span>
      <h3 className="mt-3 w-full truncate text-sm font-semibold">{creator.name}</h3>
      <p className="mt-0.5 w-full truncate text-[11px] text-muted-foreground">
        {creator.discipline}
      </p>
      <p className="mt-1 text-[11px] text-muted-foreground/80">
        {creator.works} works · {creator.followers}
      </p>
      <button
        type="button"
        aria-pressed={following}
        onClick={() => setFollowing((v) => !v)}
        className={cn(
          "mt-4 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
          following
            ? "border border-border bg-surface-raised text-muted-foreground"
            : "bg-[image:var(--gradient-ember)] text-primary-foreground",
        )}
      >
        {following ? <Check className="size-3.5" /> : <Plus className="size-3.5" />}
        {following ? "Following" : "Follow"}
      </button>
    </article>
  );
}
