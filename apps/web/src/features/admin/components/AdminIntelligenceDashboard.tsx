'use client';

import { BarChart3, Sparkles } from 'lucide-react';
import { EmptyState } from '@/components/design-system/states/empty-state';
import { LoadingState } from '@/components/design-system/states/loading-state';
import { PageContainer } from '@/components/design-system/layout/page-container';
import { SectionHeader } from '@/components/design-system/layout/section-header';
import { MediaCard } from '@/components/design-system/media/media-card';
import { Chip } from '@/components/design-system/common/chip';
import { ProgressIndicator } from '@/components/design-system/player/progress-indicator';
import { adminAnalyticsKpis, adminCommunitySignals, adminContentPerformances, adminCreatorInsights, adminForecastItems, adminGrowthSignals, adminRecommendations, adminRetentionStages, adminTrendSignals } from '../data/mockAdminAnalyticsData';

export function AdminIntelligenceDashboard() {
  return (
    <PageContainer className="space-y-6">
      <SectionHeader
        eyebrow="Platform intelligence"
        title="Platform intelligence"
        description="A premium command center for ecosystem growth, content performance, creator health, and community momentum"
        actions={<Chip active>Growth pulse</Chip>}
      />

      <div className="grid gap-4 xl:grid-cols-3">
        {adminAnalyticsKpis.map((metric) => (
          <MediaCard key={metric.id} title={metric.label} subtitle={metric.detail} meta={metric.delta} className="space-y-3">
            <div className="flex items-end justify-between gap-3">
              <p className="text-2xl font-semibold text-text-primary">{metric.value}</p>
              <div className="rounded-full border border-border/70 bg-surface-secondary/80 px-2.5 py-1 text-[11px] font-medium text-text-secondary">{metric.tone}</div>
            </div>
          </MediaCard>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <MediaCard title="User growth analytics" subtitle="Acquisition, behavior and retention" meta="Live signals" className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            {adminGrowthSignals.map((signal) => (
              <div key={signal.id} className="rounded-2xl border border-border/70 bg-surface-secondary/80 p-3">
                <p className="text-xs text-text-secondary">{signal.label}</p>
                <p className="mt-2 text-xl font-semibold text-text-primary">{signal.value}</p>
                <p className="text-sm text-accent">{signal.change}</p>
                <p className="mt-2 text-sm text-text-secondary">{signal.note}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-border/70 bg-surface-secondary/80 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-text-primary">Retention overview</p>
              <Chip>Discovery → Creator relationship</Chip>
            </div>
            <div className="mt-4 space-y-3">
              {adminRetentionStages.map((stage) => (
                <div key={stage.id} className="space-y-1">
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="font-medium text-text-primary">{stage.stage}</span>
                    <span className="text-text-secondary">{stage.users}</span>
                  </div>
                  <ProgressIndicator progress={Number.parseInt(stage.users, 10)} className="h-2" />
                  <p className="text-xs text-text-secondary">{stage.note}</p>
                </div>
              ))}
            </div>
          </div>
        </MediaCard>

        <MediaCard title="Recommendation insights" subtitle="Future-facing discovery logic" meta="UI only" className="space-y-3">
          {adminRecommendations.map((recommendation) => (
            <div key={recommendation.id} className="rounded-2xl border border-border/70 bg-surface-secondary/80 p-3">
              <p className="font-semibold text-text-primary">{recommendation.title}</p>
              <p className="mt-2 text-sm text-text-secondary">{recommendation.detail}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {recommendation.basis.map((item) => (
                  <Chip key={item}>{item}</Chip>
                ))}
              </div>
            </div>
          ))}
        </MediaCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <MediaCard title="Content intelligence" subtitle="Top performing content and rising opportunities" meta="Content signals" className="space-y-3">
          {adminContentPerformances.map((content) => (
            <div key={content.id} className="rounded-2xl border border-border/70 bg-surface-secondary/80 p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-text-primary">{content.title}</p>
                  <p className="text-sm text-text-secondary">{content.creator} • {content.type}</p>
                </div>
                <Chip active={content.status === 'Rising'}>{content.status}</Chip>
              </div>
              <div className="mt-3 grid gap-2 text-sm text-text-secondary sm:grid-cols-2">
                <p>Plays: {content.plays}</p>
                <p>Completion: {content.completionRate}</p>
                <p>Saves: {content.saves}</p>
                <p>Shares: {content.shares}</p>
                <p>Comments: {content.comments}</p>
                <p>Community: {content.communityActivity}</p>
              </div>
            </div>
          ))}
        </MediaCard>

        <MediaCard title="Creator intelligence dashboard" subtitle="Creator growth, quality and health" meta="Creator health" className="space-y-3">
          {adminCreatorInsights.map((creator) => (
            <div key={creator.id} className="rounded-2xl border border-border/70 bg-surface-secondary/80 p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-text-primary">{creator.name}</p>
                  <p className="text-sm text-text-secondary">Audience growth: {creator.audienceGrowth}</p>
                </div>
                <Chip active={creator.health === 'Growing'}>{creator.health}</Chip>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-sm text-text-secondary">
                <span>Impact: {creator.contentImpact}</span>
                <span>•</span>
                <span>Engagement: {creator.engagement}</span>
              </div>
            </div>
          ))}
        </MediaCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <MediaCard title="Community intelligence" subtitle="Discussion health and quality signals" meta="Community health" className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-3">
            {adminCommunitySignals.map((signal) => (
              <div key={signal.id} className="rounded-2xl border border-border/70 bg-surface-secondary/80 p-3">
                <p className="text-xs text-text-secondary">{signal.label}</p>
                <p className="mt-2 text-lg font-semibold text-text-primary">{signal.value}</p>
                <p className="mt-1 text-sm text-accent">{signal.delta}</p>
                <p className="mt-2 text-sm text-text-secondary">{signal.note}</p>
              </div>
            ))}
          </div>
        </MediaCard>

        <MediaCard title="Trending content intelligence" subtitle="Discovery signals and emerging momentum" meta="Signals" className="space-y-3">
          {adminTrendSignals.map((signal) => (
            <div key={signal.id} className="rounded-2xl border border-border/70 bg-surface-secondary/80 p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-text-primary">{signal.title}</p>
                <Chip>{signal.signal}</Chip>
              </div>
              <p className="mt-2 text-sm text-text-secondary">{signal.detail}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-text-secondary">{signal.focus}</p>
            </div>
          ))}
        </MediaCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <MediaCard title="Platform forecast panel" subtitle="Expected growth and opportunities" meta="Future view" className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-3">
            {adminForecastItems.map((item) => (
              <div key={item.id} className="rounded-2xl border border-border/70 bg-surface-secondary/80 p-3">
                <p className="text-xs text-text-secondary">{item.label}</p>
                <p className="mt-2 text-lg font-semibold text-text-primary">{item.value}</p>
                <p className="mt-2 text-sm text-text-secondary">{item.note}</p>
              </div>
            ))}
          </div>
        </MediaCard>

        <MediaCard title="Intelligence states" subtitle="Prepared for future data wiring and empty/loading moments" meta="Ready" className="space-y-3">
          <EmptyState title="No live analytics feed yet" description="This panel stays mock-backed while preserving a premium intelligence experience." eyebrow="Mock-ready" />
          <LoadingState title="Loading intelligence signals" message="The structure is ready for real analytics hooks without changing the admin boundary." />
        </MediaCard>
      </div>
    </PageContainer>
  );
}

export default AdminIntelligenceDashboard;
