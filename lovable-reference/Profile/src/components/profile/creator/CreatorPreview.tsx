import { SectionHeader } from "../shared/SectionHeader";
import { ActionButton } from "../shared/ActionButton";
import type { Profile, ProfileMode } from "@/lib/profile-data";

export function CreatorPreview({ profile, mode }: { profile: Profile; mode: ProfileMode }) {
  const { creatorPreview } = profile;
  return (
    <section>
      <SectionHeader
        eyebrow="Creator layer"
        title={mode === "personal" ? "Your creator space" : "Published work"}
        action={mode === "personal" ? <ActionButton size="sm" variant="ember">Start creating</ActionButton> : undefined}
      />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div className="surface-panel grid grid-cols-3 gap-3 p-5">
          {[
            { label: "Published", value: creatorPreview.published },
            { label: "Drafts", value: creatorPreview.drafts },
            { label: "Followers", value: creatorPreview.followers },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-[11px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {creatorPreview.latest.map((item) => (
            <li key={item.id}>
              <article className="silk surface-panel flex items-center gap-3 p-3 hover:-translate-y-0.5">
                <img src={item.artwork} alt="" loading="lazy" className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold">{item.title}</h3>
                  <p className="truncate text-xs text-muted-foreground">{item.subtitle}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}