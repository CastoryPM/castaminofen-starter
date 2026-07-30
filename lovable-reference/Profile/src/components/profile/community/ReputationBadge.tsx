import { ShieldCheck } from "lucide-react";
import type { Profile } from "@/lib/profile-data";

export function ReputationBadge({ reputation }: { reputation: Profile["reputation"] }) {
  return (
    <div className="surface-panel p-5">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-ember-gradient text-ember-foreground">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Contributor level</p>
          <p className="truncate text-lg font-semibold">{reputation.level}</p>
        </div>
      </div>

      <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
        <div className="h-full rounded-full bg-ember-gradient" style={{ width: `${reputation.progress}%` }} />
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">
        {reputation.progress}% toward {reputation.nextLevel}
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {reputation.badges.map((badge) => (
          <li
            key={badge}
            className="rounded-full border border-border bg-surface-2 px-3 py-1 text-[11px] font-medium text-muted-foreground"
          >
            {badge}
          </li>
        ))}
      </ul>
    </div>
  );
}