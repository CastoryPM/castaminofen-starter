import { Lock, Medal } from "lucide-react";
import { SectionHeader } from "../shared/SectionHeader";
import type { Profile } from "@/lib/profile-data";

const tierRing: Record<string, string> = {
  Gold: "border-gold/50",
  Silver: "border-signal/40",
  Bronze: "border-primary/40",
  Locked: "border-border",
};

export function AchievementGrid({ profile }: { profile: Profile }) {
  return (
    <section>
      <SectionHeader
        eyebrow="Milestones"
        title="Achievements you've collected"
        action={<span>{profile.achievements.filter((a) => a.progress === 100).length} of {profile.achievements.length}</span>}
      />
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {profile.achievements.map((a) => {
          const locked = a.tier === "Locked";
          return (
            <li key={a.id}>
              <article
                className={`silk surface-panel h-full border ${tierRing[a.tier]} p-4 text-center hover:-translate-y-1 ${
                  locked ? "opacity-60" : ""
                }`}
              >
                <span
                  className={`mx-auto grid h-12 w-12 place-items-center rounded-2xl ${
                    locked ? "bg-surface-2 text-muted-foreground" : "bg-ember-gradient text-ember-foreground"
                  }`}
                >
                  {locked ? <Lock className="h-5 w-5" /> : <Medal className="h-5 w-5" />}
                </span>
                <h3 className="mt-3 text-sm font-semibold">{a.name}</h3>
                <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{a.detail}</p>
                {a.progress < 100 ? (
                  <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-surface-2">
                    <div className="h-full rounded-full bg-ember-gradient" style={{ width: `${a.progress}%` }} />
                  </div>
                ) : (
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">{a.tier}</p>
                )}
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}