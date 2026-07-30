import { MessageCircleMore, ThumbsUp } from 'lucide-react';
import { DiscussionCard } from '@/components/design-system/social/discussion-card';
import { CommentThread } from '@/features/social/components/CommentThread';
import { ReactionBar } from '@/features/social/components/ReactionBar';
import { mockComments, mockReactionOptions } from '@/features/social/data/mockSocialData';
import { getPlayerExperienceViewModel } from '../data/mockPlayerExperience';

type DiscussionThreadProps = {
  currentTimestamp?: number;
};

export function DiscussionThreadPanel({ currentTimestamp = 320 }: DiscussionThreadProps) {
  const { discussionThreads } = getPlayerExperienceViewModel(currentTimestamp);

  return (
    <DiscussionCard title="بحث لحظه‌ای" body={`${currentTimestamp}s — ${discussionThreads.length} گفت‌وگوی لحظه‌ای در این بخش فعال است.`}>
      {discussionThreads.map((thread) => (
        <div key={thread.id} className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-text-primary">{thread.author}</p>
              <p className="text-xs text-text-secondary">{thread.createdAtLabel} • {thread.participationLabel}</p>
            </div>
            <span className="rounded-full bg-accent/10 px-2 py-1 text-[11px] font-semibold text-accent">{thread.likes} پسند</span>
          </div>
          <p className="mt-2 text-sm text-text-secondary">{thread.body}</p>
          <div className="mt-2">
            <ReactionBar reactions={mockReactionOptions} />
          </div>
          <div className="mt-3">
            <CommentThread comments={mockComments} className="space-y-2" />
          </div>
        </div>
      ))}
      <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3 text-sm text-text-secondary">
        <div className="flex items-center gap-2 font-semibold text-text-primary">
          <MessageCircleMore size={14} className="text-accent" />
          <span>۴۲ نفر در این لحظه بحث کردند</span>
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm text-text-secondary">
          <ThumbsUp size={14} className="text-accent" />
          <span>۷۲ واکنش ثبت‌شده و ۳ پاسخ جدید</span>
        </div>
      </div>
    </DiscussionCard>
  );
}
