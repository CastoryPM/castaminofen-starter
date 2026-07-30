import { useState } from 'react';
import type { SocialDiscussion } from '../types/social.types';

type DiscussionComposerProps = {
  discussion: SocialDiscussion;
};

export function DiscussionComposer({ discussion }: DiscussionComposerProps) {
  const [title, setTitle] = useState(discussion.title);

  return (
    <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
      <label className="text-sm font-semibold text-text-primary" htmlFor="discussion-title">
        شروع بحث
      </label>
      <input
        id="discussion-title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className="mt-2 w-full rounded-full border border-border bg-surface-card px-3 py-2 text-sm text-text-primary"
        placeholder="موضوع یا سوال خود را بنویسید"
      />
      <p className="mt-2 text-sm text-text-secondary">{discussion.description}</p>
    </div>
  );
}
