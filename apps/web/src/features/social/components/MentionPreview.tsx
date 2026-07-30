import type { SocialAuthor } from '../types/social.types';

type MentionPreviewProps = {
  users: SocialAuthor[];
  className?: string;
};

export function MentionPreview({ users, className }: MentionPreviewProps) {
  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2">
        {users.map((user) => (
          <span key={user.id} className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-sm font-semibold text-accent">
            @{user.handle ?? user.name}
          </span>
        ))}
      </div>
    </div>
  );
}
