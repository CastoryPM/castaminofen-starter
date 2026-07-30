import { SectionHeader } from "../shared/SectionHeader";
import type { Profile } from "@/lib/profile-data";

export function FavoriteContent({ profile }: { profile: Profile }) {
  return (
    <section>
      <SectionHeader eyebrow="Favorite universe" title="The things that made me" />

      <div className="space-y-8">
        {profile.favorites.map((group) => (
          <div key={group.label}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {group.label}
            </h3>
            <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
              {group.items.map((item) => (
                <li key={item.id} className="w-[62%] shrink-0 snap-start sm:w-auto">
                  <article className="silk group">
                    <div className="relative overflow-hidden rounded-2xl border border-border">
                      <img
                        src={item.artwork}
                        alt=""
                        loading="lazy"
                        className="silk aspect-square w-full object-cover group-hover:scale-105"
                      />
                      <div className="silk absolute inset-0 bg-background/0 group-hover:bg-background/25" />
                    </div>
                    <h4 className="mt-3 truncate text-sm font-semibold">{item.title}</h4>
                    <p className="truncate text-xs text-muted-foreground">{item.subtitle}</p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Favorite creators
          </h3>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {profile.creators.map((creator) => (
              <li key={creator.id} className="silk surface-panel flex items-center gap-3 p-3 hover:-translate-y-0.5">
                <img
                  src={creator.avatar}
                  alt=""
                  loading="lazy"
                  className="h-11 w-11 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{creator.name}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{creator.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}