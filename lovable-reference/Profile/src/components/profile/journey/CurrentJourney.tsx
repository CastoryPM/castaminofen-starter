import { Play } from "lucide-react";
import { SectionHeader } from "../shared/SectionHeader";
import { MediaProgress } from "./MediaProgress";
import type { Profile } from "@/lib/profile-data";

export function CurrentJourney({ profile }: { profile: Profile }) {
  return (
    <section>
      <SectionHeader
        eyebrow="Continue"
        title="What you're experiencing now"
        action={<span className="hidden sm:inline">Syncs with the player</span>}
      />
      <div className="grid gap-4 md:grid-cols-3">
        {profile.current.map((item) => (
          <article key={item.id} className="silk surface-panel group overflow-hidden hover:-translate-y-1">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={item.artwork}
                alt=""
                loading="lazy"
                className="silk h-full w-full object-cover group-hover:scale-105"
              />
              <div className="veil-bottom absolute inset-0 opacity-90" />
              <span className="absolute left-3 top-3 rounded-full bg-background/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground backdrop-blur">
                {item.format}
              </span>
              <button
                aria-label={`Resume ${item.title}`}
                className="silk absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-ember-gradient text-ember-foreground opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
              >
                <Play className="h-4 w-4 fill-current" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="truncate text-base font-semibold">{item.title}</h3>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{item.subtitle}</p>
              <div className="mt-4">
                <MediaProgress value={item.progress ?? 0} label={item.remaining} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}