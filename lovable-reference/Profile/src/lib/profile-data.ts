import avatarOwner from "@/assets/avatar-owner.jpg";
import cover from "@/assets/profile-cover.jpg";
import art1 from "@/assets/art-1.jpg";
import art2 from "@/assets/art-2.jpg";
import art3 from "@/assets/art-3.jpg";
import art4 from "@/assets/art-4.jpg";

/**
 * UI-only mock data. No backend, no algorithms.
 * Swap these objects for real props when integrating.
 */

export type ProfileMode = "personal" | "public";

export type MediaItem = {
  id: string;
  title: string;
  subtitle: string;
  artwork: string;
  format: "Podcast" | "Video" | "Audiobook" | "Series";
  progress?: number;
  remaining?: string;
};

export type SavedMoment = {
  id: string;
  source: string;
  artwork: string;
  timestamp: string;
  quote: string;
  note: string;
};

export type Achievement = {
  id: string;
  name: string;
  detail: string;
  tier: "Bronze" | "Silver" | "Gold" | "Locked";
  progress: number;
};

export type Collection = {
  id: string;
  title: string;
  description: string;
  count: number;
  artworks: string[];
};

export type TimelineEntry = {
  id: string;
  kind: "finished" | "moment" | "discussion" | "follow" | "achievement";
  label: string;
  detail: string;
  when: string;
};

export type Profile = {
  displayName: string;
  username: string;
  bio: string;
  location: string;
  avatar: string;
  cover: string;
  isCreator: boolean;
  isOnline: boolean;
  personality: { title: string; description: string; formats: string[]; topics: string[] };
  interests: string[];
  streakDays: number;
  counts: { followers: string; following: string; communities: number };
  journey: { label: string; value: string; caption: string }[];
  current: MediaItem[];
  favorites: { label: string; items: MediaItem[] }[];
  creators: { id: string; name: string; role: string; avatar: string }[];
  moments: SavedMoment[];
  contributions: { label: string; value: string }[];
  reputation: { level: string; levelIndex: number; nextLevel: string; progress: number; badges: string[] };
  achievements: Achievement[];
  collections: Collection[];
  timeline: TimelineEntry[];
  recap: { period: string; headline: string; lines: { value: string; label: string }[] };
  creatorPreview: { published: number; drafts: number; followers: string; latest: MediaItem[] };
  goals: { label: string; detail: string; progress: number }[];
};

const artworks = [art1, art2, art3, art4];

export const ownerProfile: Profile = {
  displayName: "Aurel Nadeau",
  username: "aurel",
  bio: "Chasing long-form ideas after midnight. I collect the three minutes of a show that stay with you for a year.",
  location: "Lisbon, Portugal",
  avatar: avatarOwner,
  cover,
  isCreator: true,
  isOnline: true,
  personality: {
    title: "The Night Listener",
    description:
      "You go deepest between 22:00 and 02:00 — long episodes, slow narration, and the kind of essays that need a second pass.",
    formats: ["Long-form podcasts", "Narrated essays", "Audiobooks"],
    topics: ["Deep science", "Urbanism", "Sound design", "Memoir"],
  },
  interests: ["Deep Science", "Urbanism", "Narrative Craft", "Field Recording", "Philosophy", "Archive Cinema"],
  streakDays: 7,
  counts: { followers: "2.4k", following: "318", communities: 9 },
  journey: [
    { label: "Listening", value: "412 h", caption: "268 episodes completed" },
    { label: "Watching", value: "96 h", caption: "41 creators followed" },
    { label: "Reading", value: "23", caption: "audiobooks finished" },
    { label: "Discovering", value: "1,204", caption: "pieces explored" },
  ],
  current: [
    {
      id: "c1",
      title: "The Quiet Machinery",
      subtitle: "Episode 14 · Rooms that remember",
      artwork: art1,
      format: "Podcast",
      progress: 62,
      remaining: "24 min left",
    },
    {
      id: "c2",
      title: "Cities After Dark",
      subtitle: "Chapter 3 · The last tram",
      artwork: art3,
      format: "Video",
      progress: 31,
      remaining: "38 min left",
    },
    {
      id: "c3",
      title: "A Field Guide to Silence",
      subtitle: "Part 7 of 12",
      artwork: art2,
      format: "Audiobook",
      progress: 78,
      remaining: "2 h 05 left",
    },
  ],
  favorites: [
    {
      label: "Favorite podcasts",
      items: [
        { id: "f1", title: "The Quiet Machinery", subtitle: "84 episodes", artwork: art1, format: "Podcast" },
        { id: "f2", title: "Slow Signal", subtitle: "Weekly essays", artwork: art4, format: "Podcast" },
        { id: "f3", title: "Nocturne Notes", subtitle: "Sound design", artwork: art2, format: "Podcast" },
      ],
    },
    {
      label: "Favorite videos",
      items: [
        { id: "f4", title: "Cities After Dark", subtitle: "Documentary", artwork: art3, format: "Video" },
        { id: "f5", title: "The Grain of Film", subtitle: "Visual essay", artwork: art1, format: "Video" },
        { id: "f6", title: "Rooms of Memory", subtitle: "Short film", artwork: art4, format: "Video" },
      ],
    },
    {
      label: "Favorite audiobooks",
      items: [
        { id: "f7", title: "A Field Guide to Silence", subtitle: "12 h 40", artwork: art2, format: "Audiobook" },
        { id: "f8", title: "The Long Return", subtitle: "9 h 12", artwork: art4, format: "Audiobook" },
        { id: "f9", title: "Weather of the Mind", subtitle: "7 h 55", artwork: art1, format: "Audiobook" },
      ],
    },
  ],
  creators: [
    { id: "cr1", name: "Mireille Vasse", role: "Documentary sound", avatar: art1 },
    { id: "cr2", name: "Ivan Koray", role: "Narrative essays", avatar: art4 },
    { id: "cr3", name: "Studio Halcyon", role: "Audio fiction", avatar: art2 },
    { id: "cr4", name: "Noor Aydin", role: "Urbanism", avatar: art3 },
  ],
  moments: [
    {
      id: "m1",
      source: "The Quiet Machinery · Ep. 09",
      artwork: art1,
      timestamp: "34:12",
      quote: "A room keeps the shape of the people who waited in it.",
      note: "Use this for the archive piece.",
    },
    {
      id: "m2",
      source: "Cities After Dark · Ch. 2",
      artwork: art3,
      timestamp: "11:47",
      quote: "The last tram is a city talking to itself.",
      note: "Best framing of night infrastructure I've heard.",
    },
    {
      id: "m3",
      source: "A Field Guide to Silence",
      artwork: art2,
      timestamp: "01:22:05",
      quote: "Silence is not absence. It is unclaimed attention.",
      note: "Sent this to the listening circle.",
    },
  ],
  contributions: [
    { label: "Discussions started", value: "48" },
    { label: "Helpful answers", value: "212" },
    { label: "Insights shared", value: "96" },
    { label: "Reactions received", value: "5.1k" },
  ],
  reputation: {
    level: "Trusted Voice",
    levelIndex: 4,
    nextLevel: "Curator",
    progress: 68,
    badges: ["Thoughtful replies", "Archive keeper", "Community host"],
  },
  achievements: [
    { id: "a1", name: "Explorer", detail: "Discovered 100 pieces of content", tier: "Gold", progress: 100 },
    { id: "a2", name: "Deep Listener", detail: "Completed 50 episodes", tier: "Gold", progress: 100 },
    { id: "a3", name: "Moment Keeper", detail: "Saved 40 moments", tier: "Silver", progress: 100 },
    { id: "a4", name: "Community Voice", detail: "Created valuable discussions", tier: "Silver", progress: 100 },
    { id: "a5", name: "Long Form", detail: "Finish 25 audiobooks", tier: "Bronze", progress: 92 },
    { id: "a6", name: "First Publish", detail: "Publish your first piece", tier: "Locked", progress: 40 },
  ],
  collections: [
    {
      id: "col1",
      title: "Books That Changed Me",
      description: "Seven that rearranged something.",
      count: 7,
      artworks: [art2, art4, art1],
    },
    {
      id: "col2",
      title: "Podcasts I Recommend",
      description: "Start here if you like slow ideas.",
      count: 12,
      artworks: [art1, art3, art2],
    },
    {
      id: "col3",
      title: "Learning Journey",
      description: "Acoustics, from zero.",
      count: 18,
      artworks: [art4, art1, art3],
    },
  ],
  timeline: [
    { id: "t1", kind: "moment", label: "Saved a moment", detail: "The Quiet Machinery · 34:12", when: "2 h ago" },
    { id: "t2", kind: "finished", label: "Finished an episode", detail: "Slow Signal · The Long Wait", when: "Yesterday" },
    { id: "t3", kind: "discussion", label: "Started a discussion", detail: "What makes narration trustworthy?", when: "2 days ago" },
    { id: "t4", kind: "achievement", label: "Earned a badge", detail: "Moment Keeper · Silver", when: "4 days ago" },
    { id: "t5", kind: "follow", label: "Followed a creator", detail: "Mireille Vasse", when: "Last week" },
  ],
  recap: {
    period: "This month",
    headline: "You went deeper than 92% of your own year.",
    lines: [
      { value: "12", label: "podcasts discovered" },
      { value: "3", label: "audiobooks finished" },
      { value: "20", label: "discussions joined" },
      { value: "41", label: "moments saved" },
    ],
  },
  creatorPreview: {
    published: 6,
    drafts: 2,
    followers: "2.4k",
    latest: [
      { id: "p1", title: "Rooms of Memory", subtitle: "Published · 3.1k plays", artwork: art4, format: "Series" },
      { id: "p2", title: "Notes on Night Air", subtitle: "Draft · 12 min", artwork: art2, format: "Podcast" },
    ],
  },
  goals: [
    { label: "Finish A Field Guide to Silence", detail: "2 h 05 remaining", progress: 78 },
    { label: "Explore 3 new creators", detail: "2 of 3 this month", progress: 66 },
  ],
};

export const visitedProfile: Profile = {
  ...ownerProfile,
  displayName: "Mireille Vasse",
  username: "mireille",
  bio: "Documentary sound designer. I make things you hear once and remember twice.",
  location: "Marseille, France",
  avatar: art1,
  isOnline: false,
  personality: {
    title: "The Story Seeker",
    description: "Drawn to first-person reporting, field recordings, and the messy middle of a story.",
    formats: ["Documentary series", "Field audio", "Interviews"],
    topics: ["Coastal life", "Migration", "Sound", "Oral history"],
  },
  counts: { followers: "18.7k", following: "204", communities: 5 },
  streakDays: 21,
};