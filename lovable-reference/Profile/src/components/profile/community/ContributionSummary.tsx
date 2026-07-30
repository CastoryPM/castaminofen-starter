import { SectionHeader } from "../shared/SectionHeader";
import { ReputationBadge } from "./ReputationBadge";
import type { Profile } from "@/lib/profile-data";

export function ContributionSummary({ profile }: { profile: Profile }) {
  return (
    <section>
      <SectionHeader eyebrow="Community identity" title="Contribution, not just consumption" />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
          {profile.contributions.map((c) => (
            <article key={c.label} className="silk surface-panel p-5 hover:-translate-y-0.5">
              <p className="text-2xl font-bold sm:text-3xl">{c.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{c.label}</p>
            </article>
          ))}
        </div>
        <ReputationBadge reputation={profile.reputation} />
      </div>
    </section>
  );
}