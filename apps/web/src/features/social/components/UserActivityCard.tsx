import type { SocialContribution } from '../types/social.types';

type UserActivityCardProps = {
  contributions: SocialContribution[];
  className?: string;
};

export function UserActivityCard({ contributions, className }: UserActivityCardProps) {
  return (
    <div className={className}>
      <div className="space-y-2">
        {contributions.map((item) => (
          <div key={item.id} className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-text-primary">{item.label}</p>
              <span className="text-sm font-semibold text-accent">{item.value}</span>
            </div>
            {item.detail ? <p className="mt-1 text-sm text-text-secondary">{item.detail}</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
