import {
  AudioLines,
  BookOpen,
  Clapperboard,
  MessagesSquare,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type CreationTypeId =
  | "podcast"
  | "video"
  | "short"
  | "audiobook"
  | "community"
  | "collaborative";

export type CreationType = {
  id: CreationTypeId;
  name: string;
  tagline: string;
  purpose: string;
  icon: LucideIcon;
  workflow: string[];
  accent: string;
};

export const creationTypes: CreationType[] = [
  {
    id: "podcast",
    name: "Podcast",
    tagline: "Conversations & audio stories",
    purpose: "Turn a voice and an idea into an episode people return to.",
    icon: AudioLines,
    workflow: ["Record audio", "Upload audio", "Edit episode", "Chapters", "Transcript", "Publish"],
    accent: "var(--ember)",
  },
  {
    id: "video",
    name: "Video",
    tagline: "Visual storytelling",
    purpose: "Show the idea. Frame it, chapter it, release it.",
    icon: Clapperboard,
    workflow: ["Upload video", "Record video", "Thumbnail", "Description", "Chapters", "Publish"],
    accent: "var(--signal)",
  },
  {
    id: "short",
    name: "Short",
    tagline: "Fast creative expression",
    purpose: "A single thought, captured in under a minute.",
    icon: Zap,
    workflow: ["Record short", "Upload clip", "Captions", "Music", "Publish"],
    accent: "var(--ember-soft)",
  },
  {
    id: "audiobook",
    name: "Audiobook",
    tagline: "Long-form storytelling",
    purpose: "Build a book chapter by chapter, voice by voice.",
    icon: BookOpen,
    workflow: [
      "Create book project",
      "Upload chapters",
      "Author info",
      "Narrator",
      "Organize",
      "Publish",
    ],
    accent: "var(--verdant)",
  },
  {
    id: "community",
    name: "Community post",
    tagline: "Discussions, questions, knowledge",
    purpose: "Create conversation — a review, a question, a recommendation.",
    icon: MessagesSquare,
    workflow: ["Discussion", "Question", "Review", "Knowledge post", "Recommendation"],
    accent: "var(--signal)",
  },
  {
    id: "collaborative",
    name: "Community project",
    tagline: "Create together",
    purpose: "A community audiobook, a shared research thread, a learning collection.",
    icon: Users,
    workflow: ["Set the goal", "Invite contributors", "Assign parts", "Review", "Publish together"],
    accent: "var(--ember)",
  },
];

export const creationTypeMap = Object.fromEntries(creationTypes.map((t) => [t.id, t])) as Record<
  CreationTypeId,
  CreationType
>;

export type Draft = {
  id: string;
  title: string;
  type: CreationTypeId;
  progress: number;
  lastEdited: string;
  missing: string[];
};

export const drafts: Draft[] = [
  {
    id: "d1",
    title: "The Long Quiet — Episode 4",
    type: "podcast",
    progress: 70,
    lastEdited: "2 hours ago",
    missing: ["Transcript", "Cover art"],
  },
  {
    id: "d2",
    title: "How cities remember their rivers",
    type: "video",
    progress: 35,
    lastEdited: "Yesterday",
    missing: ["Media", "Chapters", "Description"],
  },
  {
    id: "d3",
    title: "Salt & Season — Chapter 2",
    type: "audiobook",
    progress: 55,
    lastEdited: "3 days ago",
    missing: ["Narrator", "Chapter order"],
  },
];

export type Published = {
  id: string;
  title: string;
  type: CreationTypeId;
  visibility: "Public" | "Private" | "Community";
  status: "Live" | "Scheduled" | "Archived";
  meta: string;
};

export const published: Published[] = [
  {
    id: "p1",
    title: "The Long Quiet — Episode 3",
    type: "podcast",
    visibility: "Public",
    status: "Live",
    meta: "1.2k listens · 48 highlights",
  },
  {
    id: "p2",
    title: "Field notes: making sound in small rooms",
    type: "community",
    visibility: "Community",
    status: "Live",
    meta: "94 replies · 12 saved",
  },
  {
    id: "p3",
    title: "Salt & Season — Chapter 1",
    type: "audiobook",
    visibility: "Public",
    status: "Scheduled",
    meta: "Releases Friday 09:00",
  },
];

export const milestones = [
  { label: "First published story", done: true },
  { label: "First community interaction", done: true },
  { label: "5 episodes created", done: true },
  { label: "First collaboration", done: false },
  { label: "1,000 minutes listened", done: false },
];

export const journeyStats = [
  { label: "Pieces created", value: "12" },
  { label: "Community replies", value: "318" },
  { label: "Highlights saved", value: "146" },
  { label: "Creating since", value: "Mar 2025" },
];

export const collaborators = [
  { name: "Noor Haddad", role: "Co-host", initials: "NH", status: "Recording part 2" },
  { name: "Elias Vance", role: "Editor", initials: "EV", status: "Reviewing transcript" },
  { name: "Mira Solberg", role: "Narrator", initials: "MS", status: "Invited" },
];

export const communityFeedback = [
  {
    name: "Aya R.",
    initials: "AR",
    text: "The pause before the last question in ep.3 — keep that pacing.",
    votes: 42,
  },
  {
    name: "Tomas L.",
    initials: "TL",
    text: "Would love a chapter on river restoration failures.",
    votes: 27,
  },
  { name: "Kenji O.", initials: "KO", text: "Please add a transcript, I read faster.", votes: 19 },
];

export const wizardSteps = [
  { id: 1, name: "Type", hint: "What are you making?" },
  { id: 2, name: "Idea", hint: "Give it a shape" },
  { id: 3, name: "Media", hint: "Bring in the material" },
  { id: 4, name: "Enhance", hint: "Chapters, transcript, highlights" },
  { id: 5, name: "Preview", hint: "See it as your audience will" },
  { id: 6, name: "Publish", hint: "Choose who it reaches" },
];
