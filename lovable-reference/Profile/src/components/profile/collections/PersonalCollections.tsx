import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "../shared/SectionHeader";
import { ActionButton } from "../shared/ActionButton";
import type { Profile, ProfileMode } from "@/lib/profile-data";

export function PersonalCollections({ profile, mode }: { profile: Profile; mode: ProfileMode }) {
  return (
    <section>
      <SectionHeader
        eyebrow="Collections"
        title={mode === "personal" ? "Collections I curate" : "Collections they curate"}
        action={mode === "personal" ? <ActionButton size="sm">New collection</ActionButton> : undefined}
      />
      <ul className="grid gap-4 md:grid-cols-3">
        {profile.collections.map((collection) => (
          <li key={collection.id}>
            <article className="silk surface-panel group h-full p-4 hover:-translate-y-1">
              <div className="flex gap-2">
                {collection.artworks.map((art, i) => (
                  <img
                    key={i}
                    src={art}
                    alt=""
                    loading="lazy"
                    className="silk h-24 flex-1 rounded-xl object-cover group-hover:opacity-90"
                    style={{ marginLeft: i ? "-18px" : 0, zIndex: 3 - i }}
                  />
                ))}
              </div>
              <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-base font-semibold">{collection.title}</h3>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{collection.description}</p>
                </div>
                <ArrowUpRight className="silk h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
              </div>
              <p className="mt-3 text-[11px] uppercase tracking-widest text-muted-foreground">
                {collection.count} pieces
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}