import { Eye, UserCircle2 } from "lucide-react";
import type { Profile, ProfileMode } from "@/lib/profile-data";
import { ProfileHero } from "./identity/ProfileHero";
import { MediaPersonality } from "./identity/MediaPersonality";
import { JourneyStats } from "./journey/JourneyStats";
import { CurrentJourney } from "./journey/CurrentJourney";
import { FavoriteContent } from "./collections/FavoriteContent";
import { SavedMoments } from "./collections/SavedMoments";
import { PersonalCollections } from "./collections/PersonalCollections";
import { ContributionSummary } from "./community/ContributionSummary";
import { ActivityTimeline } from "./community/ActivityTimeline";
import { Connections } from "./community/Connections";
import { CreatorPreview } from "./creator/CreatorPreview";
import { CreatorEntry } from "./creator/CreatorEntry";
import { AchievementGrid } from "./retention/AchievementGrid";
import { MonthlyRecap } from "./retention/MonthlyRecap";
import { RetentionStrip } from "./retention/RetentionStrip";
import { ProfileSettings } from "./settings/ProfileSettings";
import { MobileNav } from "./shared/MobileNav";

export function ModeSwitch({ mode }: { mode: ProfileMode }) {
  const base =
    "silk inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors";
  return (
    <div className="fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-border bg-background/70 p-1 backdrop-blur-xl">
      <a href="/" className={`${base} ${mode === "personal" ? "bg-ember-gradient text-ember-foreground" : "text-muted-foreground hover:text-foreground"}`}>
        <UserCircle2 className="h-4 w-4" /> My profile
      </a>
      <a href="/u/mireille" className={`${base} ${mode === "public" ? "bg-ember-gradient text-ember-foreground" : "text-muted-foreground hover:text-foreground"}`}>
        <Eye className="h-4 w-4" /> Public view
      </a>
    </div>
  );
}

export function ProfilePage({ profile, mode }: { profile: Profile; mode: ProfileMode }) {
  const personal = mode === "personal";

  return (
    <div className="min-h-screen overflow-x-hidden pb-24 lg:pb-16">
      <ModeSwitch mode={mode} />
      <ProfileHero profile={profile} mode={mode} />

      <main className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
          <div className="min-w-0 space-y-12">
            <MediaPersonality profile={profile} />

            {personal ? (
              <>
                <JourneyStats profile={profile} />
                <CurrentJourney profile={profile} />
                <SavedMoments profile={profile} />
                <AchievementGrid profile={profile} />
                <MonthlyRecap profile={profile} />
                <PersonalCollections profile={profile} mode={mode} />
                <FavoriteContent profile={profile} />
                <ContributionSummary profile={profile} />
                <ActivityTimeline profile={profile} />
                <Connections profile={profile} mode={mode} />
                {profile.isCreator ? <CreatorPreview profile={profile} mode={mode} /> : <CreatorEntry />}
                <ProfileSettings />
              </>
            ) : (
              <>
                <JourneyStats profile={profile} />
                <FavoriteContent profile={profile} />
                <SavedMoments profile={profile} owned={false} />
                <ContributionSummary profile={profile} />
                <PersonalCollections profile={profile} mode={mode} />
                <CreatorPreview profile={profile} mode={mode} />
                <Connections profile={profile} mode={mode} />
              </>
            )}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <RetentionStrip profile={profile} className="lg:grid-cols-1" />
            </div>
          </aside>
        </div>

        <div className="mt-12 lg:hidden">
          <RetentionStrip profile={profile} className="sm:grid-cols-3" />
        </div>
      </main>

      <MobileNav />
    </div>
  );
}