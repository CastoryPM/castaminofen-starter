import { useState } from 'react';
import type { FollowState } from '../types/social.types';

type FollowButtonProps = {
  initialState?: FollowState;
  className?: string;
};

export function FollowButton({ initialState = 'not-following', className }: FollowButtonProps) {
  const [state, setState] = useState<FollowState>(initialState);

  const copy = {
    'not-following': 'دنبال کن',
    following: 'دنبال می‌کنم',
    pending: 'در انتظار',
  }[state];

  return (
    <button
      type="button"
      className={className ?? 'rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-sm font-semibold text-accent'}
      onClick={() => setState((current) => (current === 'following' ? 'not-following' : 'following'))}
    >
      {copy}
    </button>
  );
}
