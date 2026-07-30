import artPodcast from "@/assets/art-podcast.jpg";
import artAudiobook from "@/assets/art-audiobook.jpg";
import artVideo from "@/assets/art-video.jpg";

export const artwork = { artPodcast, artAudiobook, artVideo };

export type ReactionKey = "insightful" | "helpful" | "agree" | "interesting" | "question";

export const reactionMeta: Record<ReactionKey, { label: string; glyph: string }> = {
  insightful: { label: "Insightful", glyph: "◆" },
  helpful: { label: "Helpful", glyph: "✦" },
  agree: { label: "Agree", glyph: "▲" },
  interesting: { label: "Interesting", glyph: "◎" },
  question: { label: "Question", glyph: "?" },
};

export type Person = {
  id: string;
  name: string;
  handle: string;
  initials: string;
  role?: "creator" | "member";
  badge?: string;
};

export const people: Record<string, Person> = {
  amara: { id: "amara", name: "Amara Vance", handle: "@amara", initials: "AV", role: "creator", badge: "Knowledge Builder" },
  tobias: { id: "tobias", name: "Tobias Lund", handle: "@tobias", initials: "TL", badge: "Thoughtful Contributor" },
  neve: { id: "neve", name: "Neve Okafor", handle: "@neve", initials: "NO", badge: "Community Helper" },
  idris: { id: "idris", name: "Idris Baran", handle: "@idris", initials: "IB", badge: "Early Explorer" },
  mira: { id: "mira", name: "Mira Solheim", handle: "@mira", role: "creator", initials: "MS", badge: "Creator" },
};

export type Conversation = {
  id: string;
  title: string;
  excerpt: string;
  relatedContent: { kind: "Podcast" | "Audiobook" | "Video" | "Essay"; title: string };
  author: Person;
  participants: number;
  reactions: number;
  activity: "Rising" | "Live" | "Deep dive" | "Steady";
  space: string;
  readTime: string;
};

export const trendingConversations: Conversation[] = [
  {
    id: "c1",
    title: "Is AI changing creativity forever?",
    excerpt:
      "Three episodes in, I keep returning to the idea that tools never replaced craft — they relocated it. Where does the craft live now?",
    relatedContent: { kind: "Podcast", title: "Signal & Noise — Ep. 42" },
    author: people.amara,
    participants: 148,
    reactions: 612,
    activity: "Live",
    space: "Technology",
    readTime: "4 min read",
  },
  {
    id: "c2",
    title: "Best lessons from this audiobook",
    excerpt:
      "A running collection of the ideas that actually changed behaviour, not just the ones that sounded good in the chapter.",
    relatedContent: { kind: "Audiobook", title: "The Quiet Architecture of Habit" },
    author: people.neve,
    participants: 92,
    reactions: 431,
    activity: "Rising",
    space: "Books",
    readTime: "6 min read",
  },
  {
    id: "c3",
    title: "Episode 42 discussion — the memory argument",
    excerpt:
      "At 14:32 the guest makes a claim about collective memory that I think is subtly wrong. Let's take it apart together.",
    relatedContent: { kind: "Podcast", title: "Signal & Noise — Ep. 42" },
    author: people.tobias,
    participants: 61,
    reactions: 288,
    activity: "Deep dive",
    space: "Philosophy",
    readTime: "8 min read",
  },
  {
    id: "c4",
    title: "What makes a documentary honest?",
    excerpt:
      "Editing is argument. Once you accept that, the question stops being about truth and starts being about disclosure.",
    relatedContent: { kind: "Video", title: "After the Horizon" },
    author: people.mira,
    participants: 74,
    reactions: 356,
    activity: "Steady",
    space: "Storytelling",
    readTime: "5 min read",
  },
];

export type FeedItem = {
  id: string;
  reason: string;
  type: "Discussion" | "Insight" | "Question" | "Note" | "Collection";
  title: string;
  body: string;
  author: Person;
  meta: string;
};

export const personalizedFeed: FeedItem[] = [
  {
    id: "f1",
    reason: "Because you follow Amara Vance",
    type: "Insight",
    title: "The interesting part of Ep. 42 isn't the answer",
    body: "It's that both guests silently agree on the premise. Nobody asks whether creativity was ever scarce to begin with.",
    author: people.amara,
    meta: "24 saved this insight",
  },
  {
    id: "f2",
    reason: "From a space you joined · Philosophy",
    type: "Question",
    title: "Can a summary ever be neutral?",
    body: "Every community note picks what matters. I'd like to hear from people who write them regularly.",
    author: people.idris,
    meta: "18 replies · 3 creators answered",
  },
  {
    id: "f3",
    reason: "You listened to this last night",
    type: "Note",
    title: "Chapter 7 — the two-minute rule, revisited",
    body: "Community note now includes the counter-evidence from the 2021 replication study, contributed by 6 members.",
    author: people.neve,
    meta: "Community note · v4",
  },
  {
    id: "f4",
    reason: "Continue a discussion you joined",
    type: "Discussion",
    title: "Books everyone should read before 30 — the argued list",
    body: "New entries need a defence paragraph. Yours is still a draft from Tuesday.",
    author: people.tobias,
    meta: "Draft waiting · 3 new replies",
  },
];

export const topicSpaces = [
  { id: "technology", name: "Technology", members: "48.2k", discussions: 1240, hue: "primary", blurb: "Systems, tools, and their consequences." },
  { id: "science", name: "Science", members: "31.7k", discussions: 890, hue: "insight", blurb: "Evidence, method, and honest doubt." },
  { id: "books", name: "Books", members: "62.4k", discussions: 2110, hue: "signal", blurb: "Close reading, out loud." },
  { id: "business", name: "Business", members: "27.9k", discussions: 740, hue: "primary", blurb: "Strategy without the theatre." },
  { id: "philosophy", name: "Philosophy", members: "19.3k", discussions: 655, hue: "insight", blurb: "Slow questions, kept open." },
  { id: "storytelling", name: "Storytelling", members: "38.1k", discussions: 1024, hue: "signal", blurb: "Structure, voice, and craft." },
  { id: "creativity", name: "Creativity", members: "44.6k", discussions: 1332, hue: "primary", blurb: "Process over inspiration." },
];

export type Post = {
  id: string;
  author: Person;
  kind: "Analysis" | "Question" | "Summary" | "Theory" | "Opinion";
  timestampRef?: string;
  body: string;
  posted: string;
  reactions: Partial<Record<ReactionKey, number>>;
  replies: {
    id: string;
    author: Person;
    body: string;
    posted: string;
    reactions: Partial<Record<ReactionKey, number>>;
    replies?: { id: string; author: Person; body: string; posted: string }[];
  }[];
};

export const discussionPosts: Post[] = [
  {
    id: "p1",
    author: people.tobias,
    kind: "Analysis",
    timestampRef: "14:32",
    body: "The guest treats collective memory as a storage problem. But memory in groups is a negotiation — it's edited every time it's retold. That reframes the whole second half of the episode: the risk isn't that machines forget, it's that they stop letting us re-narrate.",
    posted: "3h ago",
    reactions: { insightful: 84, agree: 31, question: 7 },
    replies: [
      {
        id: "p1r1",
        author: people.amara,
        body: "This is the reading I wish we'd had on the record. Retelling as a repair mechanism — I'm bringing it into the follow-up episode.",
        posted: "2h ago",
        reactions: { helpful: 22, agree: 14 },
        replies: [
          {
            id: "p1r1r1",
            author: people.idris,
            body: "If it makes the episode, the community note should credit the thread, not just the quote.",
            posted: "1h ago",
          },
        ],
      },
      {
        id: "p1r2",
        author: people.neve,
        body: "Counterpoint: negotiation assumes symmetric participants. Most archives aren't. Does the argument survive an asymmetry?",
        posted: "94 min ago",
        reactions: { question: 19, interesting: 26 },
      },
    ],
  },
  {
    id: "p2",
    author: people.idris,
    kind: "Question",
    timestampRef: "31:05",
    body: "She mentions a study on 'productive forgetting' but never names it. Does anyone have the reference? I'd like to add it to the community notes before this thread scrolls away.",
    posted: "5h ago",
    reactions: { question: 41, helpful: 12 },
    replies: [
      {
        id: "p2r1",
        author: people.neve,
        body: "Found it — Storm & Levy, 2012. Added to the references block in the community breakdown.",
        posted: "4h ago",
        reactions: { helpful: 57, insightful: 9 },
      },
    ],
  },
  {
    id: "p3",
    author: people.mira,
    kind: "Summary",
    body: "Running summary of where the thread stands: (1) memory as negotiation vs. storage, (2) the asymmetry objection, still open, (3) one missing citation, now resolved. Nobody has yet argued the opposite case seriously — that would help.",
    posted: "1h ago",
    reactions: { helpful: 63, insightful: 28, agree: 11 },
    replies: [],
  },
];

export const moments = [
  { id: "m1", at: "04:18", pct: 8, count: 12, label: "Cold open claim", note: "The framing question is smuggled in here." },
  { id: "m2", at: "14:32", pct: 27, count: 148, label: "The memory argument", note: "Interesting argument here — the whole thread starts at this minute." },
  { id: "m3", at: "31:05", pct: 52, count: 44, label: "Missing citation", note: "Study referenced but never named." },
  { id: "m4", at: "48:40", pct: 74, count: 67, label: "Best explanation", note: "Important explanation of why tools relocate craft." },
  { id: "m5", at: "1:02:11", pct: 91, count: 23, label: "Closing turn", note: "This quote changed my perspective." },
];

export const communityNotes = [
  {
    id: "n1",
    heading: "Main ideas",
    contributors: 14,
    version: "v6",
    points: [
      "Creativity is relocated by tools, not removed by them.",
      "Collective memory behaves like negotiation, not storage.",
      "Disclosure matters more than neutrality in edited media.",
    ],
  },
  {
    id: "n2",
    heading: "Best quotes",
    contributors: 9,
    version: "v3",
    points: [
      "“We didn't automate taste. We automated the first draft.”",
      "“An archive that can't be re-narrated is a monument.”",
    ],
  },
  {
    id: "n3",
    heading: "Practical lessons",
    contributors: 11,
    version: "v4",
    points: [
      "Write the counter-argument before you publish the summary.",
      "Cite at the moment, not at the end.",
      "Re-read your notes once the season closes.",
    ],
  },
];

export const insights = [
  {
    id: "i1",
    quote: "The craft didn't disappear. It moved from making the first draft to knowing which draft deserves a second.",
    author: people.amara,
    source: "Signal & Noise — Ep. 42 · 48:40",
    saves: 312,
  },
  {
    id: "i2",
    quote: "A summary is an argument about what mattered. Say so, and it becomes honest.",
    author: people.idris,
    source: "Philosophy · Can a summary ever be neutral?",
    saves: 188,
  },
];

export const collections = [
  { id: "k1", title: "Best AI resources", curators: 23, items: 41, blurb: "Papers, episodes, and essays that survive a second reading." },
  { id: "k2", title: "Books everyone should read", curators: 87, items: 64, blurb: "Every entry defended in one paragraph. No lists without arguments." },
  { id: "k3", title: "Best psychology podcasts", curators: 31, items: 28, blurb: "Ranked by how often members return to them." },
];

export const suggestions = [
  { id: "s1", creator: people.amara, prompt: "What topic should next episode cover?", options: [
    { id: "o1", text: "Memory and machine archives", votes: 412 },
    { id: "o2", text: "The economics of attention", votes: 287 },
    { id: "o3", text: "Craft after automation", votes: 356 },
  ] },
];

export const projects = [
  { id: "pr1", title: "A community-built reading path for beginners", role: "Open to contributors", members: 18, stage: "Drafting", need: "2 editors" },
  { id: "pr2", title: "Season 4 research dossier", role: "Creator-led", members: 9, stage: "Research", need: "Sources" },
  { id: "pr3", title: "Illustrated glossary of episode terms", role: "Open to contributors", members: 26, stage: "Review", need: "Illustrator" },
];

export const questions = [
  { id: "q1", body: "Which chapter of the audiobook should we analyse next month?", asker: people.neve, answers: 24, answeredByCreator: true },
  { id: "q2", body: "How do you take notes while listening without losing the thread?", asker: people.idris, answers: 61, answeredByCreator: false },
];

export const events = [
  { id: "e1", kind: "Live Discussion", title: "Unpacking Episode 42, together", when: "Tonight · 20:00", state: "live" as const, host: people.amara, attending: 214 },
  { id: "e2", kind: "Book Club", title: "Monthly reading — The Quiet Architecture of Habit", when: "Thu 12 · 18:30", state: "upcoming" as const, host: people.neve, attending: 96 },
  { id: "e3", kind: "Listening Party", title: "Listen together: After the Horizon", when: "Sat 14 · 21:00", state: "upcoming" as const, host: people.mira, attending: 148 },
  { id: "e4", kind: "Creator Session", title: "Ask the creator — anything about season 3", when: "Mon 16 · 17:00", state: "upcoming" as const, host: people.tobias, attending: 73 },
];

export const notifications = [
  { id: "nt1", text: "Amara replied to your discussion", detail: "“Is AI changing creativity forever?”", when: "12m", tone: "reply" as const },
  { id: "nt2", text: "Your insight was highlighted", detail: "Featured in Technology this week", when: "2h", tone: "highlight" as const },
  { id: "nt3", text: "Creator responded to your question", detail: "Mira Solheim · After the Horizon", when: "Yesterday", tone: "creator" as const },
];

export const pulse = [
  { id: "pl1", label: "Discussions today", value: "1,284", delta: "+18%" },
  { id: "pl2", label: "Insights saved", value: "3,910", delta: "+7%" },
  { id: "pl3", label: "Notes edited", value: "412", delta: "+24%" },
];

export const savedKnowledge = [
  { id: "sk1", kind: "Insight", title: "The craft moved to the second draft", from: "Ep. 42 · 48:40" },
  { id: "sk2", kind: "Discussion", title: "Can a summary ever be neutral?", from: "Philosophy" },
  { id: "sk3", kind: "Moment", title: "14:32 — the memory argument", from: "Signal & Noise" },
  { id: "sk4", kind: "Quote", title: "“An archive that can't be re-narrated is a monument.”", from: "Community notes" },
];
