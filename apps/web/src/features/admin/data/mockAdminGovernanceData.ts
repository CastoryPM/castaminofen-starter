import type { AdminAuditEvent, AdminContentReviewItem, AdminCreatorReviewItem, AdminGovernanceMetric, AdminModerationItem, AdminOperationsTask, AdminPlatformAlert, AdminRolePreview, AdminTrustHealthMetric, AdminTrustUser } from '../types/governance.types';

export const adminGovernanceMetrics: AdminGovernanceMetric[] = [
  { label: 'Active users', value: '128K', detail: 'Daily engagement remains elevated', tone: 'accent' },
  { label: 'Active creators', value: '8.4K', detail: 'Creator activity is trending upward', tone: 'success' },
  { label: 'Content growth', value: '+14%', detail: 'New episodes and discussions are rising', tone: 'accent' },
  { label: 'Community activity', value: '92%', detail: 'Healthy interaction across key communities', tone: 'success' },
];

export const adminGovernanceTrustSignals: AdminGovernanceMetric[] = [
  { label: 'Pending reviews', value: '24', detail: 'Moderation queue is active', tone: 'warning' },
  { label: 'Reported content', value: '12', detail: 'Need fast triage this week', tone: 'warning' },
  { label: 'Flagged discussions', value: '7', detail: 'Community health is still watchful', tone: 'neutral' },
  { label: 'Unresolved issues', value: '3', detail: 'Escalations require follow-up', tone: 'warning' },
];

export const adminGovernanceOperations: AdminGovernanceMetric[] = [
  { label: 'Tasks waiting', value: '11', detail: 'Creator and trust workflows are pending', tone: 'accent' },
  { label: 'Recent decisions', value: '18', detail: 'Reviewers resolved several escalations', tone: 'success' },
  { label: 'Platform events', value: '6', detail: 'Community and creator milestones today', tone: 'neutral' },
];

export const adminModerationQueue: AdminModerationItem[] = [
  { id: 'm1', entity: 'Podcast episode', actor: 'Niloofar Jahan', reason: 'Sensitive claim', priority: 'High', status: 'Pending', createdAt: '12 min ago' },
  { id: 'm2', entity: 'Discussion thread', actor: 'Parsa Gholipour', reason: 'Repeated harassment', priority: 'Medium', status: 'Reviewing', createdAt: '34 min ago' },
  { id: 'm3', entity: 'Creator post', actor: 'Shakiba Ahmadi', reason: 'Policy overlap', priority: 'Low', status: 'Resolved', createdAt: '1 hr ago' },
];

export const adminContentReviews: AdminContentReviewItem[] = [
  { id: 'c1', title: 'The Ritual of Deep Listening', creator: 'Niloofar Jahan', category: 'Knowledge', reports: 3, visibility: 'Review', type: 'Podcast' },
  { id: 'c2', title: 'Night Library Notes', creator: 'Shakiba Ahmadi', category: 'Narrative', reports: 1, visibility: 'Visible', type: 'Audiobook' },
  { id: 'c3', title: 'Brief Lessons in Reflection', creator: 'Parsa Gholipour', category: 'Short-form', reports: 2, visibility: 'Hidden', type: 'Short' },
];

export const adminCreatorReviews: AdminCreatorReviewItem[] = [
  { id: 'cr1', identity: 'Niloofar Jahan', quality: 'High production quality', audience: 'Engaged and loyal', reputation: 'High', communityImpact: 'Strong positive discourse', status: 'Verify' },
  { id: 'cr2', identity: 'Parsa Gholipour', quality: 'Steady publishing cadence', audience: 'Growing steadily', reputation: 'Medium', communityImpact: 'Constructive contributor', status: 'Review' },
  { id: 'cr3', identity: 'Shakiba Ahmadi', quality: 'Needs more editorial polish', audience: 'Early traction', reputation: 'Watch', communityImpact: 'Needs moderation support', status: 'Flag' },
];

export const adminTrustUsers: AdminTrustUser[] = [
  { id: 'u1', name: 'Arman Nouri', activity: '3 active discussions', reports: 1, contributions: '12 thoughtful replies', behavior: 'Stable' },
  { id: 'u2', name: 'Sara Erfani', activity: '2 community posts', reports: 0, contributions: '7 curated recommendations', behavior: 'Positive' },
  { id: 'u3', name: 'Mahdi Moeini', activity: '1 recent report', reports: 3, contributions: '2 low-signal posts', behavior: 'Needs review' },
];

export const adminAuditEvents = [
  { id: 'a1', actor: 'Admin Sara', action: 'Verified creator', target: 'Niloofar Jahan', time: '10 min ago' },
  { id: 'a2', actor: 'Admin Arman', action: 'Reviewed reported content', target: 'The Ritual of Deep Listening', time: '28 min ago' },
  { id: 'a3', actor: 'Admin Mina', action: 'Updated platform setting', target: 'Community moderation notice', time: '1 hr ago' },
  { id: 'a4', actor: 'Admin Reza', action: 'Resolved community report', target: 'Discussion thread', time: '2 hrs ago' },
] satisfies AdminAuditEvent[];

export const adminPlatformAlerts = [
  { id: 'p1', title: 'Rapid content growth', detail: 'Publishing volume is 18% above the weekly average', severity: 'Medium' },
  { id: 'p2', title: 'High report volume', detail: 'Several new reports require quick triage', severity: 'High' },
  { id: 'p3', title: 'Community spike', detail: 'Discussion participation increased across top communities', severity: 'Low' },
] satisfies AdminPlatformAlert[];

export const adminTrustHealthMetrics: AdminTrustHealthMetric[] = [
  { label: 'Resolved reports', value: '84%', detail: 'Escalations are being addressed steadily' },
  { label: 'Pending reviews', value: '24', detail: 'Moderation queue remains active' },
  { label: 'Healthy communities', value: '6', detail: 'Most communities remain calm and engaged' },
  { label: 'Content quality signals', value: 'Strong', detail: 'Creator quality indicators are trending positive' },
];

export const adminRolePreviews: AdminRolePreview[] = [
  { id: 'r1', role: 'Owner', scope: 'Full platform oversight and strategic decisions' },
  { id: 'r2', role: 'Administrator', scope: 'Operations, review queues, and platform configuration' },
  { id: 'r3', role: 'Moderator', scope: 'Trust signals, escalations, and community review' },
  { id: 'r4', role: 'Content Manager', scope: 'Review, approve, and route content workflows' },
];

export const adminOperationsTasks: AdminOperationsTask[] = [
  { id: 'o1', title: 'Review pending creator applications', detail: 'Three applications need a decision', status: 'Pending' },
  { id: 'o2', title: 'Check recent report spikes', detail: 'New signals require triage', status: 'In review' },
  { id: 'o3', title: 'Approve high-quality content', detail: 'Several episodes are ready for publishing', status: 'Ready' },
];
