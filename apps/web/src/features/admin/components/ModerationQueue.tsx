import { AlertTriangle, CheckCircle2, Eye, MessageCircleMore } from 'lucide-react';
import { MediaCard } from '@/components/design-system/media/media-card';
import { Tag } from '@/components/design-system/common/tag';
import { adminModerationQueue } from '../data/mockAdminGovernanceData';

export function ModerationQueue() {
  return (
    <div className="space-y-4">
      <div className="rounded-[1.4rem] border border-border/80 bg-surface-card/90 p-4 shadow-soft">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-text-primary">Moderation queue</p>
            <p className="text-sm text-text-secondary">Operational review workspace for content, communities, and reports</p>
          </div>
          <Tag className="border-accent/20 bg-accent/10 text-accent">UI only</Tag>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <MediaCard title="Content review" subtitle="Reported media and podcast content" meta="Pending" className="space-y-3">
          {adminModerationQueue.slice(0, 2).map((item) => (
            <div key={item.id} className="rounded-2xl border border-border/70 bg-surface-secondary/70 p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-text-primary">{item.entity}</p>
                  <p className="text-sm text-text-secondary">{item.actor}</p>
                </div>
                <Tag>{item.priority}</Tag>
              </div>
              <p className="mt-2 text-sm text-text-secondary">{item.reason}</p>
              <div className="mt-3 flex items-center justify-between text-sm text-text-secondary">
                <span>{item.createdAt}</span>
                <span>{item.status}</span>
              </div>
            </div>
          ))}
        </MediaCard>

        <MediaCard title="Community review" subtitle="Discussion and trust surfaces" meta="Reviewing" className="space-y-3">
          <div className="rounded-2xl border border-border/70 bg-surface-secondary/70 p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-text-primary">Discussion thread</p>
                <p className="text-sm text-text-secondary">Flagged interaction</p>
              </div>
              <Tag>Medium</Tag>
            </div>
            <div className="mt-3 flex gap-2">
              <div className="flex items-center gap-1 text-sm text-text-secondary"><Eye className="h-4 w-4" /> Review</div>
              <div className="flex items-center gap-1 text-sm text-text-secondary"><MessageCircleMore className="h-4 w-4" /> Discuss</div>
            </div>
          </div>
          <div className="rounded-2xl border border-border/70 bg-surface-secondary/70 p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-text-primary">User reports</p>
                <p className="text-sm text-text-secondary">Escalations and complaints</p>
              </div>
              <Tag>High</Tag>
            </div>
            <div className="mt-3 flex gap-2">
              <div className="flex items-center gap-1 text-sm text-text-secondary"><AlertTriangle className="h-4 w-4" /> Escalate</div>
              <div className="flex items-center gap-1 text-sm text-text-secondary"><CheckCircle2 className="h-4 w-4" /> Resolve</div>
            </div>
          </div>
        </MediaCard>
      </div>
    </div>
  );
}

export default ModerationQueue;
