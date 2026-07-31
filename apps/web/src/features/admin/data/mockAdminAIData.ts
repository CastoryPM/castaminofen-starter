import type {
  AdminAIActionSuggestion,
  AdminAICommunityInsight,
  AdminAIContentOpportunity,
  AdminAICreatorInsight,
  AdminAIConversationPrompt,
  AdminAIInsight,
  AdminAIInsightHistoryItem,
  AdminAIOverview,
  AdminAIOpportunity,
  AdminAIRisk,
} from '../types/ai.types';

export const adminAiOverview: AdminAIOverview = {
  title: 'Today on Castaminofen',
  summary: 'User activity increased, community participation improved, creator publishing slowed, and a few topics are now trending with strong retention potential.',
  signals: [
    'User activity increased across listening and reply sessions.',
    'Community participation improved in creator-led discussion threads.',
    'Creator publishing slowed in educational formats over the past 72 hours.',
    'Short-form educational content is showing higher retention potential.',
  ],
};

export const adminAiInsights: AdminAIInsight[] = [
  { id: 'i1', title: 'Community discussions around technology increased 24% this week.', category: 'Community', detail: 'Audience quality is healthy and discussion depth continues to rise.', delta: '+24%' },
  { id: 'i2', title: 'Creator publishing rhythm softened in educational categories.', category: 'Creators', detail: 'Publishing volume is stable but less frequent than last week.', delta: '-8%' },
  { id: 'i3', title: 'Podcast discussions are retaining users longer than long-form audio alone.', category: 'Content', detail: 'Interactive discussion cards are raising completion quality.', delta: '+13%' },
  { id: 'i4', title: 'Player sessions remain strong across mobile-first discovery paths.', category: 'Player', detail: 'Offline resume and queue flow are supporting repeat sessions.', delta: '+9%' },
];

export const adminAiRisks: AdminAIRisk[] = [
  { id: 'r1', title: 'Unusual report growth', severity: 'high', explanation: 'Report volume increased in short-form educational discussions during the last 12 hours.', suggestedAction: 'Review moderation queue and update category guidance for emerging content clusters.' },
  { id: 'r2', title: 'Declining engagement', severity: 'medium', explanation: 'Creator-led educational posts are seeing fewer replies and fewer saves.', suggestedAction: 'Promote creator response prompts and spotlight meaningful discussion starters.' },
  { id: 'r3', title: 'Creator inactivity', severity: 'medium', explanation: 'A small group of high-potential creators has reduced publishing cadence.', suggestedAction: 'Offer a targeted creator boost via featured discovery and community outreach.' },
  { id: 'r4', title: 'Content quality concerns', severity: 'low', explanation: 'Some newly published content is missing category metadata and consistency signals.', suggestedAction: 'Update metadata quality checks and refresh the recommendation taxonomy.' },
];

export const adminAiOpportunities: AdminAIOpportunity[] = [
  { id: 'o1', title: 'Three creators are showing rapid growth.', summary: 'Their audience relationships are compounding through consistent episode cadence and community replies.', momentum: 'High' },
  { id: 'o2', title: 'Educational content category has increasing demand.', summary: 'Users are now exploring outcome-driven learning and guided listening formats.', momentum: 'Rising' },
  { id: 'o3', title: 'Community topic “AI literacy” has high engagement potential.', summary: 'The conversation shows strong retention and creators are already responding in the thread.', momentum: 'Hot' },
];

export const adminAiContentOpportunities: AdminAIContentOpportunity[] = [
  { id: 'co1', topic: 'Short-form educational content', category: 'Learning', format: 'Shorts', note: 'Short-form educational content is growing across discoverable listening journeys.' },
  { id: 'co2', topic: 'Podcast discussions', category: 'Conversation', format: 'Podcast', note: 'Podcast discussions receive higher retention because they create social re-entry moments.' },
  { id: 'co3', topic: 'Creator rituals and workflows', category: 'Behind the scenes', format: 'Audio essay', note: 'Creator rituals are attracting replies and community trust signals.' },
];

export const adminAiCreatorInsights: AdminAICreatorInsight[] = [
  { id: 'cr1', name: 'Niloofar Jahan', growth: '+18%', engagement: '8.2%', relationship: 'Strong', suggestion: 'Increase publishing opportunities around reflective storytelling and audience Q&A.' },
  { id: 'cr2', name: 'Parsa Gholipour', growth: '+6%', engagement: '6.7%', relationship: 'Steady', suggestion: 'Create light community interaction prompts to lift reply volume.', },
  { id: 'cr3', name: 'Shakiba Ahmadi', growth: '+3%', engagement: '4.9%', relationship: 'Building', suggestion: 'Focus on clearer category metadata and one guided audience interaction per episode.' },
];

export const adminAiCommunityInsights: AdminAICommunityInsight[] = [
  { id: 'cm1', title: 'Technology conversations are healthy and expanding.', quality: 'Meaningful conversations: 61%', action: 'Promote this discussion' },
  { id: 'cm2', title: 'Knowledge exchange communities need a better spotlight.', quality: 'Emerging topics: 3 active clusters', action: 'Highlight this creator' },
  { id: 'cm3', title: 'A few creator circles are inactive after initial growth.', quality: 'Inactive communities: 5 segments', action: 'Create community event' },
];

export const adminAiConversationPrompts: AdminAIConversationPrompt[] = [
  { id: 'p1', question: 'How is the platform doing?' },
  { id: 'p2', question: 'Where are the biggest growth opportunities?' },
  { id: 'p3', question: 'Which creators need support right now?' },
  { id: 'p4', question: 'What should admins pay attention to today?' },
];

export const adminAiActionSuggestions: AdminAIActionSuggestion[] = [
  { id: 'a1', priority: 'High', title: 'Review growing report volume', detail: 'Keep the moderation queue aligned with rising short-form discussion concerns.' },
  { id: 'a2', priority: 'Medium', title: 'Promote emerging creator', detail: 'Give a rapid-growth creator additional visibility in discovery surfaces.' },
  { id: 'a3', priority: 'Low', title: 'Update category metadata', detail: 'Reduce ambiguity on high-velocity educational content and support recall.' },
];

export const adminAiInsightHistory: AdminAIInsightHistoryItem[] = [
  { id: 'h1', date: '2026-07-30', recommendation: 'Creator growth opportunity identified', status: 'Reviewed' },
  { id: 'h2', date: '2026-07-29', recommendation: 'Content format trend flagged for moderate lift', status: 'Monitoring' },
  { id: 'h3', date: '2026-07-28', recommendation: 'Community quality signal highlighted', status: 'Action needed' },
];
