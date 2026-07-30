import clsx from 'clsx';

export function ProgressIndicator({ progress = 0, className }: { progress?: number; className?: string }) {
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={clsx('h-2 w-full overflow-hidden rounded-full bg-surface-secondary/80', className)} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={safeProgress}>
      <div className="h-full rounded-full bg-accent transition-all duration-200" style={{ width: `${safeProgress}%` }} />
    </div>
  );
}
