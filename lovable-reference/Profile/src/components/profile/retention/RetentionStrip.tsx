import { Flame, Sparkles, Target } from "lucide-react";
import type { Profile } from "@/lib/profile-data";

export function RetentionStrip({ profile, className = "lg:grid-cols-3" }: { profile: Profile; className?: string }) {
  return (
    <section className={`grid gap-4 ${className}`}>
      <article className="surface-panel p-5">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          <Flame className="h-3.5 w-3.5" /> Your journey continues
        </p>
        <p className="mt-3 text-lg font-semibold">{profile.streakDays} days exploring</p>
        <div className="mt-4 flex gap-1.5">
          {Array.from({ length: 7 }).map((_, i) => (
            <span
              key={i}
              className={`h-8 flex-1 rounded-md ${i < profile.streakDays % 8 ? "bg-ember-gradient" : "bg-surface-2"}`}
            />
          ))}
        </div>
      </article>

      <article className="surface-panel p-5">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          <Target className="h-3.5 w-3.5" /> Personal goals
        </p>
        <ul className="mt-3 space-y-3">
          {profile.goals.map((goal) => (
            <li key={goal.label}>
              <p className="truncate text-sm font-medium">{goal.label}</p>
              <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-surface-2">
                <div className="h-full rounded-full bg-ember-gradient" style={{ width: `${goal.progress}%` }} />
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">{goal.detail}</p>
            </li>
          ))}
        </ul>
      </article>

      <article className="surface-panel p-5">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          <Sparkles className="h-3.5 w-3.5" /> Waiting for you
        </p>
        <ul className="mt-3 space-y-2">
          {["A series about harbour towns", "3 moments your circle saved", "An essay on narration"].map((r) => (
            <li key={r} className="silk rounded-xl bg-surface-2 px-3 py-2 text-sm hover:bg-surface-2/60">
              {r}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}