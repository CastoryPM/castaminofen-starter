import type {
  AdminAnalyticsKpi,
  AdminCommunitySignal,
  AdminContentPerformance,
  AdminCreatorInsight,
  AdminForecastItem,
  AdminGrowthSignal,
  AdminRecommendation,
  AdminRetentionStage,
  AdminTrendSignal,
} from '../types/analytics.types';

export const adminAnalyticsKpis: AdminAnalyticsKpi[] = [
  { id: 'k1', label: 'Total users', value: '128K', delta: '+12.4%', detail: 'Monthly expansion', tone: 'accent' },
  { id: 'k2', label: 'Active users', value: '74K', delta: '+8.1%', detail: 'Daily engaged audience', tone: 'success' },
  { id: 'k3', label: 'Active creators', value: '2.1K', delta: '+5.3%', detail: 'Verified and thriving', tone: 'accent' },
  { id: 'k4', label: 'Published content', value: '18.4K', delta: '+13.2%', detail: 'Fresh episodes and posts', tone: 'success' },
  { id: 'k5', label: 'Community interactions', value: '96K', delta: '+9.8%', detail: 'Replies, reactions and discussions', tone: 'accent' },
  { id: 'k6', label: 'Listening hours', value: '1.2M', delta: '+16.7%', detail: 'Daily attention across formats', tone: 'success' },
];

export const adminGrowthSignals: AdminGrowthSignal[] = [
  { id: 'g1', label: 'Daily growth', value: '+2.8%', change: '+1.4K', note: 'New registrations from creator-led discovery' },
  { id: 'g2', label: 'Weekly growth', value: '+6.3%', change: '+8.2K', note: 'Returning users are increasing week over week' },
  { id: 'g3', label: 'Monthly trend', value: '+14.1%', change: '+18.6K', note: 'Cross-format consumption is accelerating' },
];

export const adminContentPerformances: AdminContentPerformance[] = [
  { id: 'c1', title: 'The Ritual of Deep Listening', creator: 'Niloofar Jahan', type: 'پادکست', plays: '56K', completionRate: '82%', saves: '4.2K', shares: '1.3K', comments: '480', communityActivity: 'High', status: 'Rising' },
  { id: 'c2', title: 'Midnight Notes', creator: 'Arman Shafie', type: 'کتاب صوتی', plays: '31K', completionRate: '74%', saves: '2.1K', shares: '640', comments: '210', communityActivity: 'Medium', status: 'Stable' },
  { id: 'c3', title: 'Short Form: Creator Rituals', creator: 'Mina Rahimi', type: 'شورت', plays: '24K', completionRate: '68%', saves: '1.8K', shares: '820', comments: '124', communityActivity: 'High', status: 'Needs attention' },
];

export const adminCreatorInsights: AdminCreatorInsight[] = [
  { id: 'cr1', name: 'Niloofar Jahan', audienceGrowth: '+18%', contentImpact: 'High', engagement: '8.2%', health: 'Growing' },
  { id: 'cr2', name: 'Parsa Gholipour', audienceGrowth: '+6%', contentImpact: 'Medium', engagement: '6.7%', health: 'Stable' },
  { id: 'cr3', name: 'Shakiba Ahmadi', audienceGrowth: '+3%', contentImpact: 'Low', engagement: '4.9%', health: 'Needs support' },
];

export const adminCommunitySignals: AdminCommunitySignal[] = [
  { id: 'm1', label: 'Active discussions', value: '4.8K', delta: '+11%', note: 'Conversations are deepening across creator spaces' },
  { id: 'm2', label: 'Creator interaction', value: '72%', delta: '+5%', note: 'More creators are responding to conversation threads' },
  { id: 'm3', label: 'Meaningful conversations', value: '61%', delta: '+7%', note: 'Quality signals are improving in core communities' },
];

export const adminRetentionStages: AdminRetentionStage[] = [
  { id: 'r1', stage: 'Discovery', users: '88%', drop: '12%', note: 'Initial exploration remains healthy' },
  { id: 'r2', stage: 'First interaction', users: '64%', drop: '24%', note: 'First content touchpoint has a clear drop-off' },
  { id: 'r3', stage: 'Content consumption', users: '51%', drop: '13%', note: 'Consistent consumption is rising' },
  { id: 'r4', stage: 'Community participation', users: '39%', drop: '12%', note: 'Community contribution shows room to grow' },
  { id: 'r5', stage: 'Creator relationship', users: '27%', drop: '12%', note: 'Returning creator affinity is the next opportunity' },
];

export const adminTrendSignals: AdminTrendSignal[] = [
  { id: 't1', title: 'Creator-led audio rituals', signal: 'Fast growth', detail: 'Fast-moving creator communities around intimate audio experiences', focus: 'Creators' },
  { id: 't2', title: 'Cultural commentary shorts', signal: 'High engagement', detail: 'Shorts are driving discovery and replay behaviour', focus: 'Topics' },
  { id: 't3', title: 'Knowledge exchange communities', signal: 'Community impact', detail: 'High-quality discussion clusters are forming around expert themes', focus: 'Discussions' },
];

export const adminRecommendations: AdminRecommendation[] = [
  { id: 'p1', title: 'Users who enjoy this also discover…', detail: 'Narrative podcasts, creator commentary, and reflective audio experiences', basis: ['Content categories', 'Listening behaviour', 'Community interests'] },
  { id: 'p2', title: 'Rising creator opportunities', detail: 'Support creators with strong early momentum through featured curation', basis: ['Audience growth', 'Engagement quality', 'Creator health'] },
];

export const adminForecastItems: AdminForecastItem[] = [
  { id: 'f1', label: 'Expected users', value: '+14.5K', note: 'Projected next month growth' },
  { id: 'f2', label: 'Expected creators', value: '+280', note: 'Creators with increasing retention' },
  { id: 'f3', label: 'Expected content', value: '+1.2K', note: 'Content volume should expand across formats' },
];
