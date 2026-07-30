import { Bookmark, Quote } from "lucide-react";
import { SectionHeader } from "../shared/SectionHeader";
import type { Profile } from "@/lib/profile-data";

export function SavedMoments({ profile, owned = true }: { profile: Profile; owned?: boolean }) {
  return (
    <section>
      <SectionHeader
        eyebrow="Moments"
        title={owned ? "My saved moments" : "Moments they saved"}
        action={<span>{profile.moments.length} highlighted</span>}
      />
      <ul className="grid gap-4 md:grid-cols-3">
        {profile.moments.map((moment) => (
          <li key={moment.id}>
            <article className="silk surface-panel group relative h-full overflow-hidden p-5 hover:-translate-y-1">
              <img
                src={moment.artwork}
                alt=""
                loading="lazy"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15"
              />
              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-ember-gradient px-2.5 py-1 font-mono text-[11px] font-bold text-ember-foreground">
                    {moment.timestamp}
                  </span>
                  <Bookmark className="h-4 w-4 fill-primary text-primary" />
                </div>
                <Quote className="mt-4 h-5 w-5 text-primary/70" />
                <p className="mt-2 text-base leading-snug font-medium">"{moment.quote}"</p>
                <p className="mt-4 text-xs text-muted-foreground">{moment.note}</p>
                <p className="mt-3 truncate border-t border-border pt-3 text-[11px] text-muted-foreground">
                  {moment.source}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}