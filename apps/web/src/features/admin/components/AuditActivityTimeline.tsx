import { MediaCard } from '@/components/design-system/media/media-card';
import { adminAuditEvents } from '../data/mockAdminGovernanceData';

export function AuditActivityTimeline() {
  return (
    <div className="space-y-4">
      <div className="rounded-[1.4rem] border border-border/80 bg-surface-card/90 p-4 shadow-soft">
        <p className="text-sm font-semibold text-text-primary">Audit timeline</p>
        <p className="text-sm text-text-secondary">Operational transparency for decisions, review actions, config updates, and report resolutions.</p>
      </div>
      <div className="rounded-[1.4rem] border border-border/80 bg-surface-card/90 p-4 shadow-soft">
        <p className="text-sm font-semibold text-text-primary">Platform alerts</p>
        <p className="text-sm text-text-secondary">High report volume and rapid content growth remain under watch.</p>
      </div>
      <div className="space-y-3">
        {adminAuditEvents.map((event) => (
          <MediaCard key={event.id} title={event.action} subtitle={event.target} meta={event.time} className="space-y-2">
            <p className="text-sm text-text-secondary">Actor: {event.actor}</p>
          </MediaCard>
        ))}
      </div>
      <div className="rounded-[1.4rem] border border-border/80 bg-surface-card/90 p-4 shadow-soft">
        <p className="text-sm font-semibold text-text-primary">High</p>
        <p className="text-sm text-text-secondary">Multiple moderation escalations remain active.</p>
      </div>
    </div>
  );
}

export default AuditActivityTimeline;
