import { Heart } from "lucide-react";
import { favorites } from "@/lib/library-data";
import { FavoriteTile } from "./cards";
import { Section, SectionHeader } from "./primitives";

export function FavoriteCollection() {
  return (
    <Section>
      <SectionHeader eyebrow="The ones you keep returning to" title="Favorites" action="Open" />
      <div className="grid gap-6 rounded-3xl surface-panel p-5 sm:grid-cols-[220px_minmax(0,1fr)] sm:p-7">
        <div className="grid grid-cols-2 gap-2">
          {favorites.slice(0, 4).map((item) => (
            <FavoriteTile key={item.id} item={item} />
          ))}
        </div>
        <div className="flex min-w-0 flex-col justify-center">
          <Heart className="size-5 fill-primary text-primary" />
          <h3 className="mt-3 font-display text-2xl font-semibold">Loved by you</h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            34 episodes, films, chapters and creators you marked as favorites — the
            shortest path back to what moved you.
          </p>
          <ul className="mt-4 space-y-1.5">
            {favorites.map((item) => (
              <li key={item.id} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 text-sm">
                <span className="truncate">{item.title}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{item.creator}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
