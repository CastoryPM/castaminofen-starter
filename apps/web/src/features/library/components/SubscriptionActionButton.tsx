'use client';

import clsx from 'clsx';
import { Check, LoaderCircle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SubscriptionActionButton({
  isSubscribed,
  onSubscribe,
  onUnsubscribe,
  isLoading = false,
  error,
  className,
}: {
  isSubscribed: boolean;
  onSubscribe: () => void | Promise<void>;
  onUnsubscribe: () => void | Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  className?: string;
}) {
  const handleClick = () => {
    if (isSubscribed) {
      void onUnsubscribe();
      return;
    }

    void onSubscribe();
  };

  const label = isSubscribed ? (isLoading ? 'در حال دنبال کردن' : 'دنبال می‌کنید') : isLoading ? 'در حال دنبال کردن' : 'دنبال کردن';
  const accessibleLabel = isSubscribed ? 'لغو دنبال کردن این پادکست' : 'دنبال کردن این پادکست';

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        variant={isSubscribed ? 'secondary' : 'primary'}
        size="sm"
        onClick={handleClick}
        loading={isLoading}
        aria-label={accessibleLabel}
        aria-pressed={isSubscribed}
        className={clsx(
          'min-h-[2.8rem] rounded-full px-4 text-sm font-medium transition-all duration-200',
          isSubscribed && 'border-accent/30 bg-accent/10 text-accent hover:border-accent/40 hover:bg-accent/15',
          className,
        )}
      >
        <span className="flex items-center gap-2">
          {isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : isSubscribed ? <Check className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
          <span>{label}</span>
        </span>
      </Button>
      {error ? (
        <p role="alert" className="text-xs text-rose-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
