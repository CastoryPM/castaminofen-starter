import { Heart, MessageCircle, Radio } from "lucide-react";
import { discussions, communityFavorites } from "@/data/home";
import { SectionHeader } from "./MediaCarousel";

/**
 * Community preview only — Home surfaces the pulse and hands off to the
 * Community tab. No posting, threading or social state lives here.
 */
export function CommunityHighlights() {
  return (
    <section className="py-6 lg:py-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Community highlights"
          subtitle="What listeners are talking about right now"
          action="Open community"
        />

        <div className="rail edge-fade px-4 sm:px-6">
          {discussions.map((d) => (
            <article
              key={d.id}
              className="card-elevated w-[290px] rounded-2xl p-4 sm:w-[340px]"
            >
              <p className="truncate text-[11px] tracking-[0.14em] text-ember uppercase">
                {d.topic}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">"{d.quote}"</p>
              <div className="mt-4 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-raised text-[11px] font-semibold">
                  {d.initials}
                </span>
                <span className="min-w-0 truncate text-xs text-muted-foreground">{d.author}</span>
                <span className="flex shrink-0 items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Heart className="size-3.5" />
                    {d.reactions}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle className="size-3.5" />
                    {d.replies}
                  </span>
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 px-4 sm:px-6">
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
            <Radio className="size-4 text-ember" />
            People are listening to
          </h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {communityFavorites.map((item, i) => (
              <li
                key={item.id}
                className="grid grid-cols-[auto_auto_minmax(0,1fr)] items-center gap-3 rounded-2xl border border-hairline bg-surface p-2.5"
              >
                <span className="w-5 shrink-0 text-center font-display text-sm text-muted-foreground tabular-nums">
                  {i + 1}
                </span>
                <img
                  src={item.artwork}
                  alt=""
                  loading="lazy"
                  className="size-11 shrink-0 rounded-lg object-cover"
                />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{item.title}</span>
                  <span className="block truncate text-[11px] text-muted-foreground">
                    {item.meta}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
