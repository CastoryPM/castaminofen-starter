import artwork from "@/assets/artwork-primary.jpg";

export type PlayerMode = "audio" | "video" | "longform";

export type Chapter = {
  id: string;
  index: number;
  title: string;
  description: string;
  start: number;
};

export type TimestampComment = {
  id: string;
  author: string;
  initials: string;
  at: number;
  body: string;
  reactions: number;
  replies: { author: string; initials: string; body: string }[];
};

export type Moment = {
  id: string;
  at: number;
  label: string;
  note?: string;
  kind: "highlight" | "bookmark";
  category: string;
};

export type TranscriptLine = { id: string; at: number; speaker: string; text: string };

export type QueueItem = {
  id: string;
  title: string;
  creator: string;
  duration: number;
  kind: "Podcast" | "Audiobook" | "Video" | "Short";
};

export const ARTWORK = artwork;

export const track = {
  id: "ep-114",
  title: "The Architecture of Attention",
  series: "Deep Signal",
  episode: "Episode 114",
  category: "Ideas & Culture",
  duration: 3480,
  description:
    "Why attention is the scarcest material of our era — and how makers, writers and builders can design for depth instead of extracting it. Recorded live in Lisbon over two evenings.",
  tags: ["Attention", "Craft", "Deep work", "Media theory", "Live recording"],
  creator: {
    name: "Mira Solveig",
    handle: "@mirasolveig",
    initials: "MS",
    followers: "184K",
    bio: "Essayist and host. Making long-form feel urgent again.",
  },
};

export const chapters: Chapter[] = [
  { id: "c1", index: 1, title: "Introduction", description: "Setting the stage in Lisbon.", start: 0 },
  { id: "c2", index: 2, title: "The Main Idea", description: "Attention as material, not metric.", start: 420 },
  { id: "c3", index: 3, title: "Designing for Depth", description: "Craft rules for slow media.", start: 1180 },
  { id: "c4", index: 4, title: "The Counter-Argument", description: "Where the theory breaks.", start: 1980 },
  { id: "c5", index: 5, title: "Practice & Closing", description: "A weekly ritual to try.", start: 2760 },
];

export const comments: TimestampComment[] = [
  {
    id: "m1",
    author: "Noor Adeyemi",
    initials: "NA",
    at: 1355,
    body: "This explanation is amazing — the bit about attention having a grain like wood completely reframed it for me.",
    reactions: 214,
    replies: [
      { author: "Kai Renner", initials: "KR", body: "Same. I rewound three times." },
      { author: "Mira Solveig", initials: "MS", body: "That line took the whole second evening to find 🙂" },
    ],
  },
  {
    id: "m2",
    author: "Elif Bahar",
    initials: "EB",
    at: 2135,
    body: "I interpreted this differently — she's describing scarcity, not craft. Curious what others heard.",
    reactions: 88,
    replies: [{ author: "Jonas Vik", initials: "JV", body: "Both, I think. Chapter 4 resolves it." }],
  },
  {
    id: "m3",
    author: "Sam Okonjo",
    initials: "SO",
    at: 492,
    body: "This is the key point of the whole episode. Timestamp it, everyone.",
    reactions: 402,
    replies: [],
  },
  {
    id: "m4",
    author: "Petra Lang",
    initials: "PL",
    at: 2890,
    body: "The weekly ritual she describes here is genuinely worth trying for a month.",
    reactions: 57,
    replies: [],
  },
];

export const moments: Moment[] = [
  {
    id: "s1",
    at: 1402,
    label: "Important idea about creativity",
    note: "Attention has a grain — cut with it, not against it.",
    kind: "highlight",
    category: "Craft",
  },
  {
    id: "s2",
    at: 2210,
    label: "My favourite part",
    note: "The Lisbon balcony story.",
    kind: "bookmark",
    category: "Personal",
  },
  {
    id: "s3",
    at: 2805,
    label: "Try this ritual",
    kind: "bookmark",
    category: "Practice",
  },
];

export const transcript: TranscriptLine[] = [
  { id: "t1", at: 1330, speaker: "Mira", text: "We treat attention as a metric. It is closer to a material." },
  { id: "t2", at: 1352, speaker: "Mira", text: "Materials have a grain. Attention has a grain too." },
  { id: "t3", at: 1371, speaker: "Guest", text: "So cutting against it is what burnout actually feels like." },
  { id: "t4", at: 1390, speaker: "Mira", text: "Exactly. And most media is built entirely across the grain." },
  { id: "t5", at: 1412, speaker: "Mira", text: "The work is to design surfaces that let people stay." },
  { id: "t6", at: 1438, speaker: "Guest", text: "Which is a craft question long before it is a product question." },
];

export const keyPoints = [
  "Attention behaves like a material with a grain, not a resource to extract.",
  "Depth is a design decision made at the level of pacing and surface.",
  "Interruption cost compounds: every re-entry costs more than the last.",
  "Communities remember moments; platforms remember minutes.",
];

export const queue: QueueItem[] = [
  { id: "q1", title: "Slow Media, Fast World", creator: "Deep Signal", duration: 2940, kind: "Podcast" },
  { id: "q2", title: "The Craft of Noticing — Ch. 1", creator: "Ilse Norén", duration: 1860, kind: "Audiobook" },
  { id: "q3", title: "Inside a Two-Person Studio", creator: "Field Notes", duration: 1520, kind: "Video" },
  { id: "q4", title: "60 seconds on focus", creator: "Mira Solveig", duration: 60, kind: "Short" },
];

export const related = [
  { id: "r1", title: "Attention & the Long Form", meta: "Episode 98 · 44 min", kind: "Similar episode" },
  { id: "r2", title: "The Craft of Noticing", meta: "Audiobook · 6h 12m", kind: "Related book" },
  { id: "r3", title: "How we record in one take", meta: "Video · 12 min", kind: "Related video" },
  { id: "r4", title: "Is depth a privilege?", meta: "412 replies · active now", kind: "Discussion" },
];

export const discussions = [
  {
    id: "d1",
    author: "Kai Renner",
    initials: "KR",
    tag: "Question",
    body: "Does the grain metaphor still hold for shorts, or only long-form?",
    replies: 34,
    live: true,
  },
  {
    id: "d2",
    author: "Ana Ferreira",
    initials: "AF",
    tag: "Insight",
    body: "Chapter 3 pairs perfectly with the Lisbon field notes from last season.",
    replies: 12,
    live: false,
  },
  {
    id: "d3",
    author: "Tomas Weil",
    initials: "TW",
    tag: "Discussion",
    body: "Listening together at 20:00 CET tonight — 68 people in the room already.",
    replies: 68,
    live: true,
  },
];

export function formatTime(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  return `${m}:${String(sec).padStart(2, "0")}`;
}
