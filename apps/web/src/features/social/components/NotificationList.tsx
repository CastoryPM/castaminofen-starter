import type { SocialNotification } from '../types/social.types';

type NotificationListProps = {
  notifications: SocialNotification[];
  className?: string;
};

export function NotificationList({ notifications, className }: NotificationListProps) {
  return (
    <div className={className}>
      <div className="space-y-2">
        {notifications.map((notification) => (
          <div key={notification.id} className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-text-primary">{notification.title}</p>
                <p className="mt-1 text-sm text-text-secondary">{notification.description}</p>
              </div>
              {notification.unread ? <span className="rounded-full bg-accent/10 px-2 py-1 text-[11px] font-semibold text-accent">جدید</span> : null}
            </div>
            <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-text-secondary">{notification.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
