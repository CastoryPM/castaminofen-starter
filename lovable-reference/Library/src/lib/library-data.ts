import art1 from "@/assets/art-1.jpg";
import art2 from "@/assets/art-2.jpg";
import art3 from "@/assets/art-3.jpg";
import art4 from "@/assets/art-4.jpg";
import art5 from "@/assets/art-5.jpg";
import art6 from "@/assets/art-6.jpg";

export type MediaType = "podcast" | "video" | "audiobook" | "short";

export type LibraryItem = {
  id: string;
  title: string;
  creator: string;
  type: MediaType;
  artwork: string;
  /** 0–100 */
  progress?: number;
  remaining?: string;
  duration?: string;
  savedAt?: string;
};

export const art = { art1, art2, art3, art4, art5, art6 };

export const libraryStats = {
  name: "Amara",
  saved: 48,
  hoursThisWeek: 12,
  collections: 6,
  streakDays: 9,
};

export const continueJourney: LibraryItem[] = [
  {
    id: "c1",
    title: "The Quiet Architecture of Cities",
    creator: "Nocturne Studio",
    type: "podcast",
    artwork: art1,
    progress: 62,
    remaining: "24 min left",
  },
  {
    id: "c2",
    title: "Mountains We Carry — Chapter 7",
    creator: "Ilse Vandermeer · narrated by J. Okafor",
    type: "audiobook",
    artwork: art2,
    progress: 38,
    remaining: "4 h 12 min left",
  },
  {
    id: "c3",
    title: "Dusk Frequencies: A Film Essay",
    creator: "Halo Pictures",
    type: "video",
    artwork: art3,
    progress: 81,
    remaining: "9 min left",
  },
];

export const savedItems: LibraryItem[] = [
  { id: "s1", title: "Notes on Slow Craft", creator: "Field & Form", type: "podcast", artwork: art4, savedAt: "Saved 2 days ago", duration: "58 min" },
  { id: "s2", title: "Deep Water Thinking", creator: "Marin Lu", type: "audiobook", artwork: art6, savedAt: "Saved last week", duration: "7 h" },
  { id: "s3", title: "City at 5AM", creator: "Halo Pictures", type: "video", artwork: art3, savedAt: "Saved Mar 4", duration: "22 min" },
  { id: "s4", title: "Signal & Static", creator: "Nocturne Studio", type: "podcast", artwork: art1, savedAt: "Saved Mar 1", duration: "41 min" },
  { id: "s5", title: "Sunrise Ritual", creator: "Ana Beltrán", type: "short", artwork: art5, savedAt: "Saved Feb 27", duration: "0:48" },
  { id: "s6", title: "The Long Green Hour", creator: "Field & Form", type: "audiobook", artwork: art2, savedAt: "Saved Feb 22", duration: "9 h 30" },
];

export const favorites: LibraryItem[] = [
  { id: "f1", title: "Letters to a Younger Listener", creator: "Nocturne Studio", type: "podcast", artwork: art4 },
  { id: "f2", title: "Mountains We Carry", creator: "Ilse Vandermeer", type: "audiobook", artwork: art2 },
  { id: "f3", title: "Dusk Frequencies", creator: "Halo Pictures", type: "video", artwork: art3 },
  { id: "f4", title: "Tidewater", creator: "Marin Lu", type: "podcast", artwork: art6 },
];

export const followedShows = [
  { id: "p1", title: "Nocturne", creator: "Nocturne Studio", artwork: art1, latest: "Ep. 142 · The Quiet Architecture of Cities" },
  { id: "p2", title: "Field & Form", creator: "Ada Reyes", artwork: art4, latest: "Ep. 88 · Notes on Slow Craft" },
  { id: "p3", title: "Tidewater", creator: "Marin Lu", artwork: art6, latest: "Ep. 12 · Deep Water Thinking" },
];

export const savedEpisodes = [
  { id: "e1", title: "The Quiet Architecture of Cities", show: "Nocturne", duration: "62 min", progress: 62 },
  { id: "e2", title: "Notes on Slow Craft", show: "Field & Form", duration: "58 min", progress: 0 },
  { id: "e3", title: "What the Harbour Remembers", show: "Tidewater", duration: "44 min", progress: 100 },
  { id: "e4", title: "A Room Made of Sound", show: "Nocturne", duration: "37 min", progress: 15 },
];

export const currentlyReading = [
  {
    id: "b1",
    title: "Mountains We Carry",
    author: "Ilse Vandermeer",
    narrator: "J. Okafor",
    artwork: art2,
    chapter: "Chapter 7 of 19",
    progress: 38,
    remaining: "4 h 12 min left",
  },
  {
    id: "b2",
    title: "Deep Water Thinking",
    author: "Marin Lu",
    narrator: "Sena Ito",
    artwork: art6,
    chapter: "Chapter 2 of 14",
    progress: 11,
    remaining: "6 h 20 min left",
  },
];

export const audiobookShelf = [
  { id: "ab1", title: "Mountains We Carry", author: "Ilse Vandermeer", artwork: art2, status: "38% read" },
  { id: "ab2", title: "Deep Water Thinking", author: "Marin Lu", artwork: art6, status: "11% read" },
  { id: "ab3", title: "The Long Green Hour", author: "Ada Reyes", artwork: art4, status: "Finished" },
  { id: "ab4", title: "Ember Country", author: "T. Halvorsen", artwork: art1, status: "Not started" },
];

export const videoItems: LibraryItem[] = [
  { id: "v1", title: "Dusk Frequencies: A Film Essay", creator: "Halo Pictures", type: "video", artwork: art3, duration: "48 min", progress: 81 },
  { id: "v2", title: "City at 5AM", creator: "Halo Pictures", type: "video", artwork: art3, duration: "22 min", progress: 0 },
  { id: "v3", title: "The Colour of Rooms", creator: "Studio Kite", type: "video", artwork: art4, duration: "31 min", progress: 45 },
];

export const shorts: LibraryItem[] = [
  { id: "sh1", title: "Sunrise Ritual", creator: "Ana Beltrán", type: "short", artwork: art5, duration: "0:48" },
  { id: "sh2", title: "One Minute of Rain", creator: "Nocturne", type: "short", artwork: art1, duration: "1:02" },
  { id: "sh3", title: "Paper Study", creator: "Field & Form", type: "short", artwork: art4, duration: "0:33" },
  { id: "sh4", title: "Harbour Light", creator: "Tidewater", type: "short", artwork: art6, duration: "0:56" },
];

export const collections = [
  { id: "col1", name: "Morning Listening", count: 14, artwork: art4, tint: "primary" as const },
  { id: "col2", name: "Learning", count: 22, artwork: art6, tint: "accent" as const },
  { id: "col3", name: "Travel", count: 9, artwork: art3, tint: "secondary" as const },
  { id: "col4", name: "Late Night", count: 11, artwork: art1, tint: "primary" as const },
];

export const history = {
  played: [
    { id: "h1", title: "The Quiet Architecture of Cities", creator: "Nocturne", when: "Today · 07:20", artwork: art1 },
    { id: "h2", title: "Notes on Slow Craft", creator: "Field & Form", when: "Yesterday · 21:05", artwork: art4 },
  ],
  watched: [
    { id: "h3", title: "Dusk Frequencies", creator: "Halo Pictures", when: "Yesterday · 19:40", artwork: art3 },
  ],
  completed: [
    { id: "h4", title: "What the Harbour Remembers", creator: "Tidewater", when: "Mar 2", artwork: art6 },
  ],
};

export const creators = [
  { id: "cr1", name: "Nocturne Studio", artwork: art1, latest: "New episode · 2 days ago", following: true },
  { id: "cr2", name: "Ilse Vandermeer", artwork: art2, latest: "New chapter release", following: true },
  { id: "cr3", name: "Halo Pictures", artwork: art3, latest: "Film essay · last week", following: true },
  { id: "cr4", name: "Ana Beltrán", artwork: art5, latest: "3 new shorts", following: false },
];

export const communitySaved = [
  { id: "cs1", kind: "Discussion", title: "What makes a podcast feel intimate?", meta: "Nocturne Circle · 148 replies" },
  { id: "cs2", kind: "Shared", title: "Marin Lu shared “Deep Water Thinking”", meta: "From Tidewater Listeners" },
  { id: "cs3", kind: "Conversation", title: "Ada Reyes on making things slowly", meta: "Creator AMA · saved Feb 19" },
];
