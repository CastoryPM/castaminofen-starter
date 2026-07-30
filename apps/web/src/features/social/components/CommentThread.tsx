import { useMemo, useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { Avatar } from '@/components/design-system/identity/avatar';
import { CommentPreview } from '@/components/design-system/social/comment-preview';
import { ReactionBar } from './ReactionBar';
import type { SocialComment, SocialCommentSortMode } from '../types/social.types';

type CommentThreadProps = {
  comments: SocialComment[];
  className?: string;
};

const sortOptions: SocialCommentSortMode[] = ['newest', 'most-liked', 'most-relevant'];

export function CommentThread({ comments, className }: CommentThreadProps) {
  const [activeSort, setActiveSort] = useState<SocialCommentSortMode>('newest');
  const [draftReply, setDraftReply] = useState<Record<string, string>>({});
  const [visibleReplies, setVisibleReplies] = useState<Record<string, boolean>>(() => Object.fromEntries(comments.map((comment) => [comment.id, true])));
  const [items, setItems] = useState(comments);

  const sortedComments = useMemo(() => {
    const baseItems = [...items];

    if (activeSort === 'newest') {
      return baseItems.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }

    if (activeSort === 'most-liked') {
      return baseItems.sort((a, b) => b.reactions[0]?.count - a.reactions[0]?.count);
    }

    return baseItems.sort((a, b) => b.replies.length - a.replies.length);
  }, [activeSort, items]);

  const addReply = (commentId: string) => {
    const inputElement = document.getElementById(`reply-${commentId}`) as HTMLInputElement | null;
    const content = (inputElement?.value ?? draftReply[commentId] ?? '').trim();

    if (!content) {
      return;
    }

    setItems((current) => current.map((comment) => (comment.id === commentId ? { ...comment, replies: [...comment.replies, { id: `${comment.id}-reply`, author: { id: 'me', name: 'شما' }, content, createdAt: 'همین الان', reactions: [] }] } : comment)));
    setDraftReply((current) => ({ ...current, [commentId]: '' }));
    if (inputElement) {
      inputElement.value = '';
    }
    setVisibleReplies((current) => ({ ...current, [commentId]: true }));
  };

  return (
    <div className={className}>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-text-primary">ترتیب نمایش</span>
        {sortOptions.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setActiveSort(option)}
            className={activeSort === option ? 'rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent' : 'rounded-full border border-border px-3 py-1 text-sm text-text-secondary'}
          >
            {option === 'newest' ? 'جدیدترین' : option === 'most-liked' ? 'محبوب‌ترین' : 'مرتبط‌ترین'}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {sortedComments.map((comment) => (
          <CommentPreview
            key={comment.id}
            title={
              <div className="flex items-center gap-2">
                <Avatar alt={comment.author.name} fallback={comment.author.name.charAt(0)} size="sm" />
                <div>
                  <p className="font-semibold text-text-primary">{comment.author.name}</p>
                  <p className="text-[11px] text-text-secondary">{comment.createdAt}</p>
                </div>
              </div>
            }
            body={<div className="space-y-3">
              <p className="text-sm text-text-secondary">{comment.content}</p>
              <ReactionBar reactions={comment.reactions} />
              <div className="flex flex-wrap gap-2">
                <button type="button" aria-label="پاسخ به نظر" className="rounded-full border border-border px-2.5 py-1 text-sm text-text-secondary" onClick={() => setVisibleReplies((current) => ({ ...current, [comment.id]: true }))}>
                  پاسخ
                </button>
                <button type="button" className="rounded-full border border-border px-2.5 py-1 text-sm text-text-secondary">
                  ویرایش
                </button>
                <button type="button" className="rounded-full border border-border px-2.5 py-1 text-sm text-text-secondary">
                  حذف
                </button>
              </div>
              {visibleReplies[comment.id] ? (
                <div className="space-y-2 rounded-[1rem] border border-border/70 bg-surface-card/80 p-2.5">
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-accent" htmlFor={`reply-${comment.id}`}>
                    پاسخ شما
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      id={`reply-${comment.id}`}
                      aria-label="پاسخ شما"
                      value={draftReply[comment.id] ?? ''}
                      onChange={(event) => setDraftReply((current) => ({ ...current, [comment.id]: event.currentTarget.value }))}
                      className="w-full rounded-full border border-border bg-surface-secondary px-3 py-2 text-sm text-text-primary"
                      placeholder="به این بحث پاسخ بدهید"
                    />
                    <button type="button" aria-label="ارسال پاسخ" onClick={() => addReply(comment.id)} className="rounded-full bg-accent p-2 text-white">
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              ) : null}
              {comment.replies.length > 0 ? (
                <div className="space-y-2">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="rounded-[0.9rem] border border-border/60 bg-surface-card/70 p-2.5 text-sm text-text-secondary">
                      <div className="flex items-center gap-2">
                        <MessageCircle size={14} className="text-accent" />
                        <span className="font-semibold text-text-primary">{reply.author.name}</span>
                        <span className="text-[11px]">{reply.createdAt}</span>
                      </div>
                      <p className="mt-1">{reply.content}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>}
            meta={`${comment.replies.length} پاسخ`}
          />
        ))}
      </div>
    </div>
  );
}
