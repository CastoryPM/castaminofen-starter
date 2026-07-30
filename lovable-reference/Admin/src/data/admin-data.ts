// Static mock data for the Castaminofen Admin Command Center (UI only).

export type Role = "User" | "Creator" | "Moderator" | "Admin";
export type ContentKind = "Podcast" | "Video" | "Audiobook" | "Short";
export type ContentStatus = "Published" | "Draft" | "Scheduled" | "Archived";

export const platformMetrics = [
  { label: "Total Users", value: "1,284,930", delta: "+4.8%", trend: "up", hint: "vs last 30 days" },
  { label: "Active Users", value: "412,760", delta: "+2.1%", trend: "up", hint: "30-day active" },
  { label: "Creators", value: "8,412", delta: "+11.4%", trend: "up", hint: "verified + pending" },
  { label: "Published Content", value: "96,204", delta: "+1.9%", trend: "up", hint: "all formats" },
  { label: "Listening Hours", value: "3.42M", delta: "+7.6%", trend: "up", hint: "this month" },
  { label: "Community Activity", value: "184,502", delta: "-1.2%", trend: "down", hint: "posts + replies" },
] as const;

export const growthSeries = [
  { month: "Jan", users: 640, content: 210, engagement: 320 },
  { month: "Feb", users: 712, content: 244, engagement: 358 },
  { month: "Mar", users: 798, content: 286, engagement: 402 },
  { month: "Apr", users: 861, content: 322, engagement: 461 },
  { month: "May", users: 940, content: 368, engagement: 517 },
  { month: "Jun", users: 1024, content: 405, engagement: 566 },
  { month: "Jul", users: 1108, content: 452, engagement: 631 },
  { month: "Aug", users: 1180, content: 498, engagement: 688 },
  { month: "Sep", users: 1285, content: 541, engagement: 742 },
];

export const activityFeed = [
  { id: 1, kind: "content", text: "Nadia Reyes published episode “Signal & Noise #48”", time: "2 min ago" },
  { id: 2, kind: "users", text: "500 users joined today — best Thursday this quarter", time: "18 min ago" },
  { id: 3, kind: "creator", text: "Creator application approved: Studio Umbra", time: "41 min ago" },
  { id: 4, kind: "moderation", text: "3 reports escalated in “Late Night Listeners”", time: "1 h ago" },
  { id: 5, kind: "system", text: "Transcoding queue drained — 0 pending jobs", time: "2 h ago" },
  { id: 6, kind: "content", text: "Audiobook “The Quiet Machine” scheduled for Friday", time: "3 h ago" },
  { id: 7, kind: "users", text: "Retention cohort W12 crossed 41% — up 3 pts", time: "5 h ago" },
];

export const users = [
  { id: "u_1042", name: "Amara Osei", email: "amara@castamino.fm", role: "Creator" as Role, status: "Active", plan: "Premium", joined: "2024-03-11", sessions: 482, hours: 318 },
  { id: "u_1043", name: "Tobias Lund", email: "tobias@castamino.fm", role: "Admin" as Role, status: "Active", plan: "Staff", joined: "2023-08-02", sessions: 1204, hours: 96 },
  { id: "u_1044", name: "Priya Nair", email: "priya.n@gmail.com", role: "User" as Role, status: "Active", plan: "Free", joined: "2025-01-19", sessions: 92, hours: 141 },
  { id: "u_1045", name: "Marco Bianchi", email: "marco@umbra.studio", role: "Creator" as Role, status: "Pending", plan: "Premium", joined: "2025-06-04", sessions: 33, hours: 24 },
  { id: "u_1046", name: "Yuki Tanaka", email: "yuki@castamino.fm", role: "Moderator" as Role, status: "Active", plan: "Staff", joined: "2024-11-27", sessions: 640, hours: 58 },
  { id: "u_1047", name: "Elena Duarte", email: "elena.d@proton.me", role: "User" as Role, status: "Suspended", plan: "Free", joined: "2025-02-08", sessions: 12, hours: 6 },
  { id: "u_1048", name: "Samuel Adeyemi", email: "sam@nightwave.io", role: "Creator" as Role, status: "Active", plan: "Premium", joined: "2024-05-22", sessions: 371, hours: 502 },
  { id: "u_1049", name: "Chloé Marchand", email: "chloe.m@icloud.com", role: "User" as Role, status: "Active", plan: "Premium", joined: "2025-04-14", sessions: 208, hours: 264 },
];

export const userActivity = [
  { day: "Mon", minutes: 42 },
  { day: "Tue", minutes: 68 },
  { day: "Wed", minutes: 31 },
  { day: "Thu", minutes: 94 },
  { day: "Fri", minutes: 77 },
  { day: "Sat", minutes: 120 },
  { day: "Sun", minutes: 88 },
];

export const creators = [
  { id: "c_01", name: "Nadia Reyes", handle: "@signalnoise", verified: true, tier: "Flagship", followers: "482K", published: 148, hours: "912K", growth: "+8.4%" },
  { id: "c_02", name: "Studio Umbra", handle: "@studioumbra", verified: false, tier: "Rising", followers: "38K", published: 22, hours: "61K", growth: "+31.2%" },
  { id: "c_03", name: "Samuel Adeyemi", handle: "@nightwave", verified: true, tier: "Flagship", followers: "311K", published: 96, hours: "604K", growth: "+5.1%" },
  { id: "c_04", name: "Hana Kovač", handle: "@hanareads", verified: true, tier: "Established", followers: "127K", published: 64, hours: "288K", growth: "+12.7%" },
  { id: "c_05", name: "Deep Field Media", handle: "@deepfield", verified: false, tier: "Rising", followers: "19K", published: 14, hours: "22K", growth: "+44.9%" },
];

export const contentItems = [
  { id: "ct_01", title: "Signal & Noise #48 — The Attention Economy", kind: "Podcast" as ContentKind, creator: "Nadia Reyes", status: "Published" as ContentStatus, plays: "182K", duration: "58:12", updated: "2h ago", featured: true },
  { id: "ct_02", title: "The Quiet Machine — Chapter 1", kind: "Audiobook" as ContentKind, creator: "Hana Kovač", status: "Scheduled" as ContentStatus, plays: "—", duration: "41:08", updated: "5h ago", featured: false },
  { id: "ct_03", title: "Nightwave Sessions: Analog Dreams", kind: "Video" as ContentKind, creator: "Samuel Adeyemi", status: "Published" as ContentStatus, plays: "94K", duration: "23:44", updated: "1d ago", featured: true },
  { id: "ct_04", title: "60 Seconds on Sound Design", kind: "Short" as ContentKind, creator: "Studio Umbra", status: "Draft" as ContentStatus, plays: "—", duration: "00:58", updated: "1d ago", featured: false },
  { id: "ct_05", title: "Deep Field — Orbit Notes", kind: "Podcast" as ContentKind, creator: "Deep Field Media", status: "Published" as ContentStatus, plays: "31K", duration: "44:20", updated: "2d ago", featured: false },
  { id: "ct_06", title: "Archive: Season 1 Retrospective", kind: "Video" as ContentKind, creator: "Nadia Reyes", status: "Archived" as ContentStatus, plays: "412K", duration: "1:12:03", updated: "3w ago", featured: false },
  { id: "ct_07", title: "Micro Interview: Marco Bianchi", kind: "Short" as ContentKind, creator: "Studio Umbra", status: "Published" as ContentStatus, plays: "58K", duration: "01:14", updated: "4d ago", featured: false },
  { id: "ct_08", title: "The Quiet Machine — Chapter 2", kind: "Audiobook" as ContentKind, creator: "Hana Kovač", status: "Draft" as ContentStatus, plays: "—", duration: "38:51", updated: "6d ago", featured: false },
];

export const homepageSections = [
  { id: "hs_1", name: "Hero Spotlight", type: "Hero", enabled: true, items: 3, note: "Rotating flagship placement" },
  { id: "hs_2", name: "Trending Now", type: "Trending", enabled: true, items: 12, note: "Auto-ranked, 6h refresh" },
  { id: "hs_3", name: "Recommended For You", type: "Recommended", enabled: true, items: 20, note: "Personalized" },
  { id: "hs_4", name: "Featured Creators", type: "Featured", enabled: false, items: 8, note: "Editorial pick" },
  { id: "hs_5", name: "Browse Categories", type: "Categories", enabled: true, items: 14, note: "Static taxonomy" },
];

export const discussions = [
  { id: "d_1", title: "What makes a great cold open?", author: "@hanareads", replies: 142, health: "Healthy", featured: true },
  { id: "d_2", title: "Mic recommendations under $300", author: "@deepfield", replies: 88, health: "Healthy", featured: false },
  { id: "d_3", title: "Weekly listening thread — Sept", author: "@signalnoise", replies: 311, health: "Hot", featured: true },
  { id: "d_4", title: "Is AI narration acceptable?", author: "@nightwave", replies: 507, health: "Heated", featured: false },
];

export const moderationQueue = [
  { id: "r_1", target: "Comment on “Analog Dreams”", reason: "Harassment", reporter: "@priyan", severity: "High", age: "12 min" },
  { id: "r_2", target: "Post in “Late Night Listeners”", reason: "Spam / promotion", reporter: "@elenad", severity: "Low", age: "48 min" },
  { id: "r_3", target: "Creator bio — @deepfield", reason: "Misleading claims", reporter: "system", severity: "Medium", age: "3 h" },
  { id: "r_4", target: "Reply thread #4482", reason: "Hate speech", reporter: "@yuki", severity: "Critical", age: "5 h" },
];

export const retentionCohorts = [
  { cohort: "W1", d1: 62, d7: 44, d30: 31 },
  { cohort: "W2", d1: 65, d7: 47, d30: 33 },
  { cohort: "W3", d1: 61, d7: 43, d30: 30 },
  { cohort: "W4", d1: 68, d7: 51, d30: 38 },
  { cohort: "W5", d1: 71, d7: 54, d30: 41 },
];

export const playerStats = [
  { label: "Sessions", value: "2.9M", sub: "+6.2% WoW" },
  { label: "Avg. session", value: "34m 12s", sub: "+1m 04s" },
  { label: "Skip rate", value: "8.4%", sub: "-0.9 pts" },
  { label: "Saves", value: "418K", sub: "+12.1%" },
];

export const contentPerformance = [
  { format: "Podcasts", plays: 1420, completion: 71 },
  { format: "Videos", plays: 980, completion: 58 },
  { format: "Audiobooks", plays: 610, completion: 64 },
  { format: "Shorts", plays: 2140, completion: 88 },
];

export const dbTables = [
  { name: "users", rows: "1,284,930", size: "4.2 GB", relations: ["profiles", "sessions", "roles"] },
  { name: "creators", rows: "8,412", size: "310 MB", relations: ["users", "content"] },
  { name: "content", rows: "96,204", size: "2.8 GB", relations: ["creators", "categories", "plays"] },
  { name: "plays", rows: "84,102,933", size: "61 GB", relations: ["users", "content"] },
  { name: "community_posts", rows: "1,842,110", size: "9.1 GB", relations: ["users", "discussions"] },
  { name: "audit_logs", rows: "412,088", size: "1.4 GB", relations: ["users"] },
];

export const dbRecords = [
  { id: "u_1042", email: "amara@castamino.fm", role: "creator", created_at: "2024-03-11T09:22:41Z", status: "active" },
  { id: "u_1043", email: "tobias@castamino.fm", role: "admin", created_at: "2023-08-02T14:03:12Z", status: "active" },
  { id: "u_1044", email: "priya.n@gmail.com", role: "user", created_at: "2025-01-19T18:44:02Z", status: "active" },
  { id: "u_1045", email: "marco@umbra.studio", role: "creator", created_at: "2025-06-04T07:11:55Z", status: "pending" },
  { id: "u_1046", email: "yuki@castamino.fm", role: "moderator", created_at: "2024-11-27T21:30:09Z", status: "active" },
];

export const services = [
  { name: "Public API", status: "Operational", latency: "128 ms", uptime: "99.98%" },
  { name: "Streaming Edge", status: "Operational", latency: "42 ms", uptime: "99.99%" },
  { name: "Primary Database", status: "Operational", latency: "9 ms", uptime: "99.97%" },
  { name: "Transcoding Workers", status: "Degraded", latency: "1.4 s", uptime: "98.71%" },
  { name: "Search Cluster", status: "Operational", latency: "61 ms", uptime: "99.94%" },
  { name: "Notification Gateway", status: "Down", latency: "—", uptime: "97.10%" },
];

export const latencySeries = [
  { t: "00:00", api: 132, db: 11 },
  { t: "04:00", api: 118, db: 9 },
  { t: "08:00", api: 164, db: 14 },
  { t: "12:00", api: 208, db: 18 },
  { t: "16:00", api: 176, db: 12 },
  { t: "20:00", api: 141, db: 10 },
];

export const logLines = [
  { level: "INFO", time: "09:41:02", msg: "edge/stream: cache warm complete (region eu-west-1)" },
  { level: "WARN", time: "09:39:55", msg: "transcode/worker-7: queue backpressure 1.4s p95" },
  { level: "ERROR", time: "09:38:14", msg: "notify/gateway: APNs handshake failed (retry 3/5)" },
  { level: "INFO", time: "09:37:41", msg: "api: 12,441 req/min · error rate 0.12%" },
  { level: "DEBUG", time: "09:36:20", msg: "search: reindex batch 402/900 committed" },
  { level: "INFO", time: "09:35:03", msg: "db: autovacuum finished on public.plays" },
  { level: "ERROR", time: "09:31:47", msg: "notify/gateway: 27 push deliveries dropped" },
];

export const featureFlags = [
  { key: "community", name: "Community", description: "Discussions, replies and reactions across the app", state: "ON", rollout: 100 },
  { key: "creator_system", name: "Creator System", description: "Creator onboarding, studio and payouts", state: "BETA", rollout: 35 },
  { key: "ai_features", name: "AI Features", description: "Auto-summaries, chapters and smart search", state: "OFF", rollout: 0 },
  { key: "shorts", name: "Shorts Feed", description: "Vertical short-form multimedia feed", state: "BETA", rollout: 60 },
  { key: "offline", name: "Offline Downloads", description: "Premium offline playback for all formats", state: "ON", rollout: 100 },
];

export const campaigns = [
  { id: "n_1", title: "New season: Signal & Noise", channel: "Push", audience: "All listeners", status: "Sent", reach: "812K", when: "Sep 21, 09:00" },
  { id: "n_2", title: "Creator payouts are live", channel: "In-app", audience: "Creators", status: "Scheduled", reach: "8.4K", when: "Sep 30, 12:00" },
  { id: "n_3", title: "Weekend picks digest", channel: "Email", audience: "Premium", status: "Draft", reach: "—", when: "—" },
  { id: "n_4", title: "Community guidelines update", channel: "Announcement", audience: "Everyone", status: "Sent", reach: "1.2M", when: "Sep 12, 16:30" },
];

export const auditLogs = [
  { id: "a_1", actor: "tobias@castamino.fm", action: "feature_flag.update", target: "ai_features → OFF", time: "Today 09:22", ip: "10.4.22.8" },
  { id: "a_2", actor: "yuki@castamino.fm", action: "content.archive", target: "ct_06 Season 1 Retrospective", time: "Today 08:47", ip: "10.4.19.2" },
  { id: "a_3", actor: "tobias@castamino.fm", action: "user.suspend", target: "u_1047 Elena Duarte", time: "Yesterday 19:03", ip: "10.4.22.8" },
  { id: "a_4", actor: "amara@castamino.fm", action: "creator.verify", target: "c_04 Hana Kovač", time: "Yesterday 15:31", ip: "88.12.4.90" },
  { id: "a_5", actor: "system", action: "homepage.reorder", target: "Trending ↔ Recommended", time: "Sep 22 11:08", ip: "internal" },
];

export const adminRoles = [
  { name: "Super Admin", members: 3, level: "Full access", scope: ["All modules", "Billing", "Security", "Roles"] },
  { name: "Content Lead", members: 9, level: "Elevated", scope: ["Content", "Discovery", "Creators"] },
  { name: "Moderator", members: 24, level: "Standard", scope: ["Community", "Reports", "Users (read)"] },
  { name: "Analyst", members: 6, level: "Read only", scope: ["Analytics", "Database (read)"] },
];

export const permissionMatrix = [
  { capability: "View analytics", superAdmin: true, contentLead: true, moderator: false, analyst: true },
  { capability: "Publish content", superAdmin: true, contentLead: true, moderator: false, analyst: false },
  { capability: "Suspend users", superAdmin: true, contentLead: false, moderator: true, analyst: false },
  { capability: "Manage feature flags", superAdmin: true, contentLead: false, moderator: false, analyst: false },
  { capability: "Access database explorer", superAdmin: true, contentLead: false, moderator: false, analyst: true },
  { capability: "Edit admin roles", superAdmin: true, contentLead: false, moderator: false, analyst: false },
];
