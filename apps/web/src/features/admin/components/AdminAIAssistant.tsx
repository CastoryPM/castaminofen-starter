'use client';

import { EmptyState } from '@/components/design-system/states/empty-state';
import { LoadingState } from '@/components/design-system/states/loading-state';
import { PageContainer } from '@/components/design-system/layout/page-container';
import { SectionHeader } from '@/components/design-system/layout/section-header';
import { Chip } from '@/components/design-system/common/chip';
import {
  adminAiActionSuggestions,
  adminAiCommunityInsights,
  adminAiContentOpportunities,
  adminAiConversationPrompts,
  adminAiCreatorInsights,
  adminAiInsightHistory,
  adminAiInsights,
  adminAiOpportunities,
  adminAiOverview,
  adminAiRisks,
} from '../data/mockAdminAIData';
import { ActionSuggestionPanel } from './ActionSuggestionPanel';
import { AdminConversationInterface } from './AdminConversationInterface';
import { AIOverviewPanel } from './AIOverviewPanel';
import { CommunityHealthAdvisor } from './CommunityHealthAdvisor';
import { ContentOpportunityPanel } from './ContentOpportunityPanel';
import { CreatorOpportunityPanel } from './CreatorOpportunityPanel';
import { DecisionHistoryPanel } from './DecisionHistoryPanel';
import { PlatformInsightFeed } from './PlatformInsightFeed';
import { RecommendationCenter } from './RecommendationCenter';
import { RiskDetectionPanel } from './RiskDetectionPanel';

export function AdminAIAssistant() {
  return (
    <PageContainer className="space-y-6">
      <SectionHeader
        eyebrow="AI Executive Overview"
        title="Today on Castaminofen"
        description="A calm, intelligent operating view for platform health, opportunities and trusted decision support"
        actions={<Chip active>Decision intelligence</Chip>}
      />

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <AIOverviewPanel overview={adminAiOverview} />
        <PlatformInsightFeed insights={adminAiInsights} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <RiskDetectionPanel risks={adminAiRisks} />
        <RecommendationCenter opportunities={adminAiOpportunities} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <ContentOpportunityPanel opportunities={adminAiContentOpportunities} />
        <CreatorOpportunityPanel creatorInsights={adminAiCreatorInsights} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <CommunityHealthAdvisor insights={adminAiCommunityInsights} />
        <AdminConversationInterface prompts={adminAiConversationPrompts} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <ActionSuggestionPanel suggestions={adminAiActionSuggestions} />
        <DecisionHistoryPanel history={adminAiInsightHistory} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <EmptyState title="No AI insight stream is available right now" description="The assistant remains mock-backed and ready for the next intelligence integration point." eyebrow="Mock-ready" />
        <LoadingState title="Loading intelligence overview" message="Preparing the executive summary and operational suggestions." />
      </div>
    </PageContainer>
  );
}

export default AdminAIAssistant;
