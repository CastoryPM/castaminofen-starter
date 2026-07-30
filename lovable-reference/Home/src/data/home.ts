import featuredHero from "@/assets/featured-hero.jpg";
import art1 from "@/assets/art-1.jpg";
import art2 from "@/assets/art-2.jpg";
import art3 from "@/assets/art-3.jpg";

/**
 * Static presentation fixtures for the Home surface.
 * UI-only: no fetching, no business logic. Replace with real data at
 * integration time — the shapes below are the component contracts.
 */

export type MediaType = "podcast" | "video" | "audiobook" | "short";

export type MediaItem = {
  id: string;
  title: string;
  creator: string;
  type: MediaType;
  artwork: string;
  duration: string;
  /** 0–100, present only for in-progress items */
  progress?: number;
  meta?: string;
};

export const artwork = { featuredHero, art1, art2, art3 };

const art = [art2, art1, art3, art2, art1, art3];
const pick = (i: number) => art[i % art.length];

export const featured = {
  id: "f1",
  eyebrow: "Featured this week",
  title: "The Long Signal",
  creator: "Ada Ferreira",
  type: "podcast" as MediaType,
  description:
    "Nine conversations about the quiet systems that shape how we think — recorded across three continents in a single winter.",
  duration: "52 min",
  artwork: featuredHero,
};

export const continueItems: MediaItem[] = [
  {
    id: "c1",
    title: "Cartography of Attention",
    creator: "Ada Ferreira",
    type: "podcast",
    artwork: pick(0),
    duration: "18 min left",
    progress: 64,
  },
  {
    id: "c2",
    title: "How Studios Really Work",
    creator: "Noor Halim",
    type: "video",
    artwork: pick(2),
    duration: "9 min left",
    progress: 38,
  },
  {
    id: "c3",
    title: "The Salt Archive",
    creator: "Ines Okoro",
    type: "audiobook",
    artwork: pick(1),
    duration: "Ch. 7 of 24",
    progress: 27,
  },
  {
    id: "c4",
    title: "Night Shift Frequencies",
    creator: "Marek Vidal",
    type: "podcast",
    artwork: pick(3),
    duration: "31 min left",
    progress: 12,
  },
];

export const categories = [
  { id: "all", label: "All" },
  { id: "podcasts", label: "Podcasts" },
  { id: "videos", label: "Videos" },
  { id: "audiobooks", label: "Audiobooks" },
  { id: "shorts", label: "Shorts" },
  { id: "live", label: "Live / Community" },
] as const;

const make = (
  prefix: string,
  type: MediaType,
  rows: [string, string, string][],
): MediaItem[] =>
  rows.map(([title, creator, duration], i) => ({
    id: `${prefix}-${i}`,
    title,
    creator,
    type,
    duration,
    artwork: pick(i + prefix.length),
  }));

export const trending = make("tr", "podcast", [
  ["Slow Machines", "Kaya Lindqvist", "44 min"],
  ["The Understory", "Field Notes Co.", "38 min"],
  ["Second Language", "Tomas Aro", "1 h 02"],
  ["Ledger of Small Wins", "Priya Raman", "27 min"],
  ["Quiet Capital", "Halden House", "51 min"],
  ["Analogue Futures", "Ruth Adeyemi", "33 min"],
]);

export const recommended = make("rc", "audiobook", [
  ["A Room of Signals", "Ines Okoro", "9 h 12"],
  ["The Patient Craft", "Bo Nakamura", "6 h 40"],
  ["Everything We Kept", "Lila Verhoeven", "11 h 05"],
  ["Northbound", "Sami Reza", "7 h 21"],
  ["The Glass Interval", "Cora Blythe", "5 h 55"],
  ["Ash & Almanac", "Jonah Pike", "8 h 30"],
]);

export const newReleases = make("nr", "video", [
  ["Inside a Sound Room", "Noor Halim", "22:14"],
  ["Drawing With Constraints", "Studio Palta", "14:02"],
  ["The Editor's Cut", "Mira Solano", "31:45"],
  ["Building in the Open", "Odd Hours", "18:09"],
  ["A Year of Field Recording", "Kaya Lindqvist", "26:33"],
  ["Letters From the Bench", "Tomas Aro", "11:58"],
]);

export const editorPicks = make("ep", "podcast", [
  ["The Repair Hour", "Guild Radio", "47 min"],
  ["Margins", "Halden House", "35 min"],
  ["Blue Hour Interviews", "Mira Solano", "58 min"],
  ["Practice, Daily", "Priya Raman", "12 min"],
  ["Old Maps, New Roads", "Field Notes Co.", "41 min"],
  ["The Third Draft", "Ruth Adeyemi", "29 min"],
]);

export const hiddenGems = make("hg", "podcast", [
  ["Kitchen Table Theory", "Ana Duarte", "24 min"],
  ["Two Chairs", "Wren & Silas", "36 min"],
  ["The Ferry Report", "Coastal Desk", "19 min"],
  ["Undercurrent", "Léo Marchand", "43 min"],
  ["Small Press", "Ada Ferreira", "30 min"],
  ["Static Garden", "Nia Osei", "22 min"],
]);

export const podcastEpisodes: MediaItem[] = make("pe", "podcast", [
  ["Ep. 41 — The Attention Ledger", "Cartography of Attention", "48 min"],
  ["Ep. 12 — Making Room", "Slow Machines", "35 min"],
  ["Ep. 07 — Field Season", "The Understory", "52 min"],
  ["Ep. 88 — After the Draft", "The Third Draft", "27 min"],
]).map((e, i) => ({ ...e, meta: ["New", "Trending", "New", "Discussed"][i] }));

export const videos: MediaItem[] = make("vd", "video", [
  ["The Anatomy of a Long Take", "Mira Solano", "19:42"],
  ["Learning to Listen Again", "Noor Halim", "12:08"],
  ["A Workshop in the Woods", "Studio Palta", "24:31"],
  ["Why Analogue Still Wins", "Odd Hours", "16:55"],
]).map((v, i) => ({ ...v, meta: ["412K views", "88K views", "1.2M views", "230K views"][i] }));

export type Audiobook = MediaItem & {
  author: string;
  narrator: string;
  chapters: number;
};

export const audiobooks: Audiobook[] = [
  {
    id: "ab1",
    title: "The Salt Archive",
    creator: "Ines Okoro",
    author: "Ines Okoro",
    narrator: "Delphine Roux",
    type: "audiobook",
    artwork: art1,
    duration: "12 h 40",
    chapters: 24,
    progress: 27,
  },
  {
    id: "ab2",
    title: "A Room of Signals",
    creator: "Bo Nakamura",
    author: "Bo Nakamura",
    narrator: "Ellis Grant",
    type: "audiobook",
    artwork: art2,
    duration: "9 h 12",
    chapters: 18,
    progress: 61,
  },
  {
    id: "ab3",
    title: "Everything We Kept",
    creator: "Lila Verhoeven",
    author: "Lila Verhoeven",
    narrator: "Maren Idris",
    type: "audiobook",
    artwork: art3,
    duration: "11 h 05",
    chapters: 31,
  },
  {
    id: "ab4",
    title: "Northbound",
    creator: "Sami Reza",
    author: "Sami Reza",
    narrator: "Jae Whitfield",
    type: "audiobook",
    artwork: art1,
    duration: "7 h 21",
    chapters: 15,
  },
];

export const audiobookCategories = [
  "Literary fiction",
  "Essays",
  "History",
  "Craft & work",
  "Memoir",
  "Science",
];

export type Short = {
  id: string;
  title: string;
  creator: string;
  artwork: string;
  duration: string;
  reactions: string;
  comments: string;
};

export const shorts: Short[] = [
  {
    id: "s1",
    title: "One minute on why silence edits better",
    creator: "Mira Solano",
    artwork: art3,
    duration: "0:58",
    reactions: "12.4K",
    comments: "318",
  },
  {
    id: "s2",
    title: "The cheapest microphone trick I know",
    creator: "Odd Hours",
    artwork: art2,
    duration: "0:41",
    reactions: "8.9K",
    comments: "204",
  },
  {
    id: "s3",
    title: "Reading three pages before sunrise",
    creator: "Ines Okoro",
    artwork: art1,
    duration: "1:12",
    reactions: "22.1K",
    comments: "641",
  },
  {
    id: "s4",
    title: "How I storyboard with index cards",
    creator: "Studio Palta",
    artwork: art3,
    duration: "0:47",
    reactions: "5.3K",
    comments: "97",
  },
  {
    id: "s5",
    title: "A field recording from the ferry deck",
    creator: "Coastal Desk",
    artwork: art2,
    duration: "1:04",
    reactions: "3.8K",
    comments: "72",
  },
];

export type Creator = {
  id: string;
  name: string;
  initials: string;
  discipline: string;
  works: number;
  followers: string;
};

export const creators: Creator[] = [
  { id: "cr1", name: "Ada Ferreira", initials: "AF", discipline: "Podcasts", works: 128, followers: "412K" },
  { id: "cr2", name: "Mira Solano", initials: "MS", discipline: "Video essays", works: 64, followers: "289K" },
  { id: "cr3", name: "Ines Okoro", initials: "IO", discipline: "Audiobooks", works: 22, followers: "96K" },
  { id: "cr4", name: "Odd Hours", initials: "OH", discipline: "Shorts & video", works: 310, followers: "1.1M" },
  { id: "cr5", name: "Priya Raman", initials: "PR", discipline: "Daily practice", works: 540, followers: "77K" },
  { id: "cr6", name: "Halden House", initials: "HH", discipline: "Documentary", works: 41, followers: "158K" },
];

export type Discussion = {
  id: string;
  topic: string;
  quote: string;
  author: string;
  initials: string;
  replies: number;
  reactions: number;
};

export const discussions: Discussion[] = [
  {
    id: "d1",
    topic: "Cartography of Attention · Ep. 41",
    quote:
      "The bit about scheduled boredom completely changed how I plan my mornings. Anyone else trying it?",
    author: "Tobi A.",
    initials: "TA",
    replies: 84,
    reactions: 612,
  },
  {
    id: "d2",
    topic: "Trending topic · Field recording",
    quote:
      "Post your best ambient capture from this week — I'll start with a rainy tram stop in Porto.",
    author: "Léa M.",
    initials: "LM",
    replies: 231,
    reactions: 1490,
  },
  {
    id: "d3",
    topic: "Creator conversation · Mira Solano",
    quote:
      "I'm cutting the next essay live on Thursday. Bring questions about pacing and I'll answer on air.",
    author: "Mira Solano",
    initials: "MS",
    replies: 57,
    reactions: 903,
  },
];

export const communityFavorites: MediaItem[] = make("cf", "podcast", [
  ["The Repair Hour", "Guild Radio", "47 min"],
  ["Two Chairs", "Wren & Silas", "36 min"],
  ["Blue Hour Interviews", "Mira Solano", "58 min"],
  ["Quiet Capital", "Halden House", "51 min"],
]).map((c, i) => ({ ...c, meta: `${[18, 12, 9, 7][i]}K listening now` }));

export const typeLabel: Record<MediaType, string> = {
  podcast: "Podcast",
  video: "Video",
  audiobook: "Audiobook",
  short: "Short",
};
