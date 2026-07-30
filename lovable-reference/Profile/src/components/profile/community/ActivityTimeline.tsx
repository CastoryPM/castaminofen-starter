import { Award, Bookmark, CheckCircle2, MessageSquare, UserPlus } from "lucide-react";
import { SectionHeader } from "../shared/SectionHeader";
import type { Profile, TimelineEntry } from "@/lib/profile-data";

const icons: Record<TimelineEntry["kind"], typeof Award> = {
  finished: CheckCircle2,
  moment: Bookmark,
  discussion: MessageSquare,
  follow: UserPlus,
  achievement: Award,
};

export function ActivityTimeline({ profile }: { profile: Profile }) {
  return (
    <section>
      <SectionHeader eyebrow="Timeline" title="Your recent memory" />
      <ol className="relative space-y-4 border-l border-border pl-6">
        {profile.timeline.map((entry) => {
          const Icon = icons[entry.kind];
          return (
            <li key={entry.id} className="relative">
              <span className="absolute -left-[35px] grid h-6 w-6 place-items-center rounded-full border border-border bg-surface text-primary">
                <Icon className="h-3 w-3" />
              </span>
              <div className="silk surface-panel grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4 hover:-translate-y-0.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{entry.label}</p>
                  <p className="truncate text-xs text-muted-foreground">{entry.detail}</p>
                </div>
                <span className="shrink-0 text-[11px] text-muted-foreground">{entry.when}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}