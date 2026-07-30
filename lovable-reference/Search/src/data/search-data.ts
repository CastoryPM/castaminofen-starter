/**
 * Static presentation data for the Castaminofen search UI.
 * UI-only: no backend, no indexing, no recommendation logic.
 */

export type ContentKind =
  | "episode"
  | "podcast"
  | "video"
  | "audiobook"
  | "short"
  | "creator"
  | "community";

export type Suggestion = {
  id: string;
  label: string;
  kind: "content" | "creator" | "category" | "community";
  meta?: string;
};

export type EpisodeResult = {
  id: string;
  title: string;
  creator: string;
  duration: string;
  show: string;
  hue: number;
};

export type PodcastResult = {
  id: string;
  title: string;
  creator: string;
  listeners: string;
  episodes: number;
  hue: number;
};

export type VideoResult = {
  id: string;
  title: string;
  creator: string;
  duration: string;
  views: string;
  hue: number;
};

export type AudiobookResult = {
  id: string;
  title: string;
  author: string;
  narrator: string;
  duration: string;
  hue: number;
};

export type ShortResult = {
  id: string;
  title: string;
  creator: string;
  plays: string;
  hue: number;
};

export type CreatorResult = {
  id: string;
  name: string;
  initials: string;
  bio: string;
  works: number;
  followers: string;
};

export type CommunityResult = {
  id: string;
  title: string;
  author: string;
  related: string;
  comments: number;
  activity: string;
};

export const RECENT_SEARCHES = [
  "history of space",
  "deep focus audiobooks",
  "Ali Example",
  "night driving shorts",
  "ocean documentaries",
];

export const TRENDING_SEARCHES = [
  { id: "t1", label: "Origins of Deep Space", tag: "Podcast", delta: "+218%" },
  { id: "t2", label: "Ali Example", tag: "Creator", delta: "+94%" },
  { id: "t3", label: "Sleep & Sound Design", tag: "Audiobook", delta: "+61%" },
  { id: "t4", label: "Is AI writing our stories?", tag: "Discussion", delta: "+47%" },
  { id: "t5", label: "60-second science", tag: "Shorts", delta: "+33%" },
  { id: "t6", label: "Quiet Cities", tag: "Video series", delta: "+29%" },
];

export const SAVED_SEARCHES = [
  { id: "s1", label: "long-form science podcasts", filters: "Podcasts · Long · EN" },
  { id: "s2", label: "narrated by Mira Oduya", filters: "Audiobooks · Newest" },
  { id: "s3", label: "community: creator tooling", filters: "Community · Popular" },
];

export const MOODS = [
  { id: "m1", label: "Learn something new", note: "curious, 20 min" },
  { id: "m2", label: "Relax", note: "ambient, slow" },
  { id: "m3", label: "Deep conversations", note: "90 min+" },
  { id: "m4", label: "Get moving", note: "high tempo" },
];

export const RELATED_SEARCHES = [
  "space archaeology",
  "voyager recordings",
  "astro-photography creators",
  "cosmology reading list",
  "night sky field guides",
];

export const CATEGORIES = [
  {
    id: "podcasts",
    title: "Podcasts",
    discover: "Shows · Episodes · Topics",
    count: "12.4k shows",
    hue: 178,
  },
  {
    id: "videos",
    title: "Videos",
    discover: "Creators · Channels · Episodes",
    count: "48k videos",
    hue: 210,
  },
  {
    id: "audiobooks",
    title: "Audiobooks",
    discover: "Books · Authors · Genres",
    count: "6.1k titles",
    hue: 68,
  },
  { id: "shorts", title: "Shorts", discover: "Quick content", count: "120k clips", hue: 330 },
  { id: "creators", title: "Creators", discover: "People", count: "9.8k people", hue: 140 },
  { id: "community", title: "Community", discover: "Discussions", count: "34k threads", hue: 25 },
];

export const SUGGESTIONS: Suggestion[] = [
  { id: "sg1", label: "History of Space", kind: "content", meta: "Episode · 3 matches" },
  { id: "sg2", label: "History of Space — narrated", kind: "content", meta: "Audiobook" },
  { id: "sg3", label: "Ali Example", kind: "creator", meta: "Creator · 214k followers" },
  { id: "sg4", label: "Science Podcasts", kind: "category", meta: "Category" },
  { id: "sg5", label: "Discussion about AI", kind: "community", meta: "1.2k comments" },
  { id: "sg6", label: "Historic launches in 4K", kind: "content", meta: "Video" },
];

export const FEATURED_RESULT = {
  title: "History of Space: The Long Silence",
  kind: "Episode",
  show: "Orbital Notes",
  creator: "Ali Example",
  duration: "48 min",
  released: "2 days ago",
  blurb:
    "A slow, cinematic account of the decade between Voyager's last transmission and the first exoplanet confirmation.",
};

export const EPISODES: EpisodeResult[] = [
  {
    id: "e1",
    title: "The Long Silence, Part II",
    creator: "Ali Example",
    show: "Orbital Notes",
    duration: "41 min",
    hue: 178,
  },
  {
    id: "e2",
    title: "Mapping the dark between stars",
    creator: "Nour Halabi",
    show: "Faint Signals",
    duration: "58 min",
    hue: 210,
  },
  {
    id: "e3",
    title: "What we heard from Titan",
    creator: "Dana Reyes",
    show: "Field Recordings",
    duration: "27 min",
    hue: 140,
  },
];

export const PODCASTS: PodcastResult[] = [
  {
    id: "p1",
    title: "Orbital Notes",
    creator: "Ali Example",
    listeners: "214k listeners",
    episodes: 128,
    hue: 178,
  },
  {
    id: "p2",
    title: "Faint Signals",
    creator: "Nour Halabi",
    listeners: "88k listeners",
    episodes: 64,
    hue: 25,
  },
  {
    id: "p3",
    title: "The Quiet Lab",
    creator: "Ines Marchetti",
    listeners: "51k listeners",
    episodes: 212,
    hue: 300,
  },
];

export const VIDEOS: VideoResult[] = [
  {
    id: "v1",
    title: "Every launch that changed the map",
    creator: "Ali Example",
    duration: "22:14",
    views: "1.2M views",
    hue: 210,
  },
  {
    id: "v2",
    title: "Building a radio telescope in a backyard",
    creator: "Tomas Field",
    duration: "14:03",
    views: "402k views",
    hue: 140,
  },
  {
    id: "v3",
    title: "Night sky, one year, one frame",
    creator: "Sora Ito",
    duration: "8:51",
    views: "890k views",
    hue: 68,
  },
];

export const AUDIOBOOKS: AudiobookResult[] = [
  {
    id: "a1",
    title: "A History of Space",
    author: "Marguerite Sol",
    narrator: "Mira Oduya",
    duration: "11h 20m",
    hue: 68,
  },
  {
    id: "a2",
    title: "The Cartographer's Silence",
    author: "Ivan Petrov",
    narrator: "Ali Example",
    duration: "8h 05m",
    hue: 25,
  },
  {
    id: "a3",
    title: "Signals & Noise",
    author: "Hana Kwon",
    narrator: "Dana Reyes",
    duration: "6h 44m",
    hue: 178,
  },
];

export const SHORTS: ShortResult[] = [
  { id: "sh1", title: "60-second black holes", creator: "Ali Example", plays: "3.1M", hue: 178 },
  { id: "sh2", title: "Why the sky hums", creator: "Sora Ito", plays: "820k", hue: 330 },
  { id: "sh3", title: "One photo, ten years", creator: "Tomas Field", plays: "1.4M", hue: 210 },
  { id: "sh4", title: "Sound of Saturn", creator: "Dana Reyes", plays: "640k", hue: 68 },
];

export const CREATORS: CreatorResult[] = [
  {
    id: "c1",
    name: "Ali Example",
    initials: "AE",
    bio: "Host of Orbital Notes. Writes slow science for restless people.",
    works: 342,
    followers: "214k",
  },
  {
    id: "c2",
    name: "Mira Oduya",
    initials: "MO",
    bio: "Narrator and sound designer. 60+ audiobooks recorded.",
    works: 87,
    followers: "96k",
  },
  {
    id: "c3",
    name: "Sora Ito",
    initials: "SI",
    bio: "Time-lapse filmmaker documenting light pollution.",
    works: 129,
    followers: "158k",
  },
];

export const COMMUNITY: CommunityResult[] = [
  {
    id: "d1",
    title: "Is the 'long silence' theory actually credible?",
    author: "kepler_ann",
    related: "Orbital Notes · Ep. 128",
    comments: 1243,
    activity: "active now",
  },
  {
    id: "d2",
    title: "Best narrators for slow non-fiction?",
    author: "quietreader",
    related: "A History of Space",
    comments: 318,
    activity: "2h ago",
  },
  {
    id: "d3",
    title: "Discussion about AI in audio storytelling",
    author: "m.fields",
    related: "The Quiet Lab · Ep. 44",
    comments: 902,
    activity: "yesterday",
  },
];

export const CONTENT_TYPES = [
  "All",
  "Podcasts",
  "Videos",
  "Audiobooks",
  "Shorts",
  "Creators",
  "Community",
] as const;

export const DURATIONS = ["Any", "Short", "Medium", "Long"] as const;
export const CREATOR_FILTERS = ["Anyone", "Ali Example", "Sora Ito", "Mira Oduya"] as const;
export const LANGUAGES = ["Any", "English", "Arabic", "Türkçe", "Español"] as const;
export const DATES = ["Anytime", "Newest", "Popular"] as const;
export const SORTS = ["Relevance", "Newest", "Popular", "Duration"] as const;