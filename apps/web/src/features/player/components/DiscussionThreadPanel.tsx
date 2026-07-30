import { MessageCircleMore, ThumbsUp } from 'lucide-react';
import { CommentPreview } from '@/components/design-system/social/comment-preview';
import { DiscussionCard } from '@/components/design-system/social/discussion-card';
import { Reaction } from '@/components/design-system/social/reaction';

type DiscussionThreadProps = {
  currentTimestamp?: number;
};

export function DiscussionThreadPanel({ currentTimestamp = 320 }: DiscussionThreadProps) {
  return (
    <DiscussionCard title="بحث لحظه‌ای" body={`${currentTimestamp}s — ۲۳ نفر در این لحظه مشارکت کرده‌اند.`}>
      <CommentPreview title="نظریه‌ی جذاب" body="این بخش واقعا نقطه‌ی عطفی برای درک موضوع بود." meta="24:35 • 8 دقیقه قبل" />
      <CommentPreview title="یادداشت شخصی" body="به نظرم این مثال برای کارهای آینده خیلی کمک‌کننده است." meta="Chapter 3 • 2 دقیقه قبل" />
      <div className="flex flex-wrap gap-2">
        <Reaction active>👍 مفید</Reaction>
        <Reaction>🔁 دوباره گوش می‌کنم</Reaction>
        <Reaction>🎧 گوش دادن هم‌زمان</Reaction>
      </div>
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
