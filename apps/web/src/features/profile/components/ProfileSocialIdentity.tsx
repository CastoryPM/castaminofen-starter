import { MediaCard } from '@/components/design-system/media/media-card';
import type { ProfileSocialGroup } from '../types/profile.types';

type ProfileSocialIdentityProps = {
  groups: ProfileSocialGroup[];
};

export function ProfileSocialIdentity({ groups }: ProfileSocialIdentityProps) {
  return (
    <MediaCard title="هویت اجتماعی" subtitle="افراد، سازندگان و موضوعات مورد علاقه" meta="Social" className="space-y-3">
      <div className="grid gap-3 md:grid-cols-3">
        {groups.map((group) => (
          <div key={group.id} className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
            <p className="text-sm font-semibold text-text-primary">{group.title}</p>
            <ul className="mt-2 space-y-1 text-sm text-text-secondary">
              {group.items.map((item) => (
                <li key={item} className="rounded-full border border-border/60 bg-surface-card/70 px-2.5 py-1">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </MediaCard>
  );
}
