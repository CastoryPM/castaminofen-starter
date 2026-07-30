import { SectionHeader } from "../shared/SectionHeader";
import type { Profile } from "@/lib/profile-data";

export function JourneyStats({ profile }: { profile: Profile }) {
  return (
    <section>
      <SectionHeader eyebrow="Journey overview" title="How far you've travelled" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {profile.journey.map((stat, i) => (
          <article
            key={stat.label}
            className="silk surface-panel group relative overflow-hidden p-5 hover:-translate-y-1"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span className="absolute inset-x-0 top-0 h-px bg-ember-gradient opacity-60" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{stat.label}</p>
            <p className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{stat.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.caption}</p>
          </article>
        ))}
      </div>
    </section>
  );
}