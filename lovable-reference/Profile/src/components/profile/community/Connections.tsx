import { SectionHeader } from "../shared/SectionHeader";
import { ActionButton } from "../shared/ActionButton";
import { InterestTags } from "../identity/InterestTags";
import type { Profile, ProfileMode } from "@/lib/profile-data";

export function Connections({ profile, mode }: { profile: Profile; mode: ProfileMode }) {
  const personal = mode === "personal";
  return (
    <section>
      <SectionHeader
        eyebrow="Connections"
        title={personal ? "Manage your circles" : "Who they follow"}
        action={personal ? <ActionButton size="sm">Manage</ActionButton> : undefined}
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="surface-panel p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Creators followed</p>
          <ul className="mt-4 space-y-3">
            {profile.creators.slice(0, 3).map((c) => (
              <li key={c.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
                <img src={c.avatar} alt="" loading="lazy" className="h-9 w-9 shrink-0 rounded-full object-cover" />
                <span className="truncate text-sm">{c.name}</span>
                <ActionButton size="sm" variant="ghost">
                  {personal ? "Following" : "Follow"}
                </ActionButton>
              </li>
            ))}
          </ul>
        </div>

        <div className="surface-panel p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Communities joined</p>
          <ul className="mt-4 space-y-2">
            {["Night Listeners", "Field Recording Circle", "Slow Media Club", "Urbanism Reading Room"].map((c) => (
              <li key={c} className="silk rounded-xl bg-surface-2 px-3 py-2 text-sm hover:bg-surface-2/60">
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="surface-panel p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {personal ? "Your interests" : "Their interests"}
          </p>
          <div className="mt-4">
            <InterestTags interests={profile.interests} editable={personal} />
          </div>
        </div>
      </div>
    </section>
  );
}