import { Flame, MapPin } from "lucide-react";
import type { Profile, ProfileMode } from "@/lib/profile-data";
import { AvatarSection } from "./AvatarSection";
import { ProfileActions } from "./ProfileActions";
import { ProfileCover } from "./ProfileCover";
import { InterestTags } from "./InterestTags";

export function ProfileHero({ profile, mode }: { profile: Profile; mode: ProfileMode }) {
  return (
    <header className="relative isolate">
      <ProfileCover src={profile.cover} alt="" />

      <div className="relative mx-auto max-w-6xl px-4 pt-40 sm:px-6 sm:pt-52 lg:pt-64">
        <div className="rise-in flex flex-col gap-6 lg:flex-row lg:items-end">
          <AvatarSection
            src={profile.avatar}
            name={profile.displayName}
            isCreator={profile.isCreator}
            isOnline={profile.isOnline}
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">{profile.displayName}</h1>
              <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                <Flame className="mr-1 inline h-3 w-3" />
                {profile.streakDays} days exploring
              </span>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">@{profile.username}</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/85 sm:text-base">{profile.bio}</p>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {profile.location}
              </span>
              <span>
                <strong className="text-foreground">{profile.counts.followers}</strong> followers
              </span>
              <span>
                <strong className="text-foreground">{profile.counts.following}</strong> following
              </span>
              <span>
                <strong className="text-foreground">{profile.counts.communities}</strong> communities
              </span>
            </div>

            <div className="mt-5">
              <InterestTags interests={profile.interests.slice(0, 4)} />
            </div>
          </div>

          <div className="lg:pb-2">
            <ProfileActions mode={mode} name={profile.displayName} />
          </div>
        </div>
      </div>
    </header>
  );
}