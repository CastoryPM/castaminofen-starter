export type AdminAISeverity = 'high' | 'medium' | 'low';

export type AdminAIInsight = {
  id: string;
  title: string;
  detail: string;
  category: string;
  delta: string;
};

export type AdminAIRisk = {
  id: string;
  title: string;
  severity: AdminAISeverity;
  explanation: string;
  suggestedAction: string;
};

export type AdminAIOpportunity = {
  id: string;
  title: string;
  summary: string;
  momentum: string;
};

export type AdminAIContentOpportunity = {
  id: string;
  topic: string;
  category: string;
  format: string;
  note: string;
};

export type AdminAICreatorInsight = {
  id: string;
  name: string;
  growth: string;
  engagement: string;
  relationship: string;
  suggestion: string;
};

export type AdminAICommunityInsight = {
  id: string;
  title: string;
  quality: string;
  action: string;
};

export type AdminAIConversationPrompt = {
  id: string;
  question: string;
};

export type AdminAIActionSuggestion = {
  id: string;
  priority: 'High' | 'Medium' | 'Low';
  title: string;
  detail: string;
};

export type AdminAIInsightHistoryItem = {
  id: string;
  date: string;
  recommendation: string;
  status: 'Reviewed' | 'Monitoring' | 'Action needed';
};

export type AdminAIOverview = {
  title: string;
  summary: string;
  signals: string[];
};
