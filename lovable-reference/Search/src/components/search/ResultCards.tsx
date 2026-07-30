import { Play, Headphones, Clock3, Users, MessageSquare, Plus, Check, Eye } from "lucide-react";
import { useState } from "react";
import { Artwork, MetaDot } from "./primitives";
import type {
  EpisodeResult,
  PodcastResult,
  VideoResult,
  AudiobookResult,
  ShortResult,
  CreatorResult,
  CommunityResult,
} from "@/data/search-data";
import { FEATURED_RESULT } from "@/data/search-data";

function PlayButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      aria-label={`Play ${label}`}
      className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/12 text-primary transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-primary-foreground"
    >
      <Play className="size-4 fill-current" />
    </button>
  );
}

export function FeaturedResult() {
  const f = FEATURED_RESULT;
  return (
    <article className="relative overflow-hidden rounded-3xl border border-primary/25 aurora lift">
      <div className="grid gap-5 p-5 sm:grid-cols-[200px_minmax(0,1fr)] sm:p-6">
        <Artwork hue={178} label={f.title} className="aspect-square w-full" rounded="rounded-3xl" />
        <div className="min-w-0 self-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
            Top result · {f.kind}
          </p>
          <h3 className="mt-2 text-xl font-bold leading-tight sm:text-2xl">{f.title}</h3>
          <p className="mt-1.5 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            {f.show} <MetaDot /> {f.creator} <MetaDot /> {f.duration} <MetaDot /> {f.released}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{f.blurb}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full signal-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.02]"
            >
              <Play className="size-4 fill-current" />
              Play episode
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/40"
            >
              <Plus className="size-4" />
              Save
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function EpisodeResultCard({ item }: { item: EpisodeResult }) {
  return (
    <article className="grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-border/60 bg-card/40 p-3 transition-colors duration-300 hover:border-primary/30 hover:bg-card/70">
      <Artwork hue={item.hue} label={item.title} className="size-16" />
      <div className="min-w-0">
        <h3 className="truncate text-sm font-semibold">{item.title}</h3>
        <p className="mt-1 truncate text-xs text-muted-foreground">{item.creator}</p>
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock3 className="size-3" />
          {item.duration} <MetaDot /> {item.show}
        </p>
      </div>
      <PlayButton label={item.title} />
    </article>
  );
}

export function PodcastResultCard({ item }: { item: PodcastResult }) {
  return (
    <article className="group rounded-2xl border border-border/60 bg-card/40 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30">
      <Artwork hue={item.hue} label={item.title} className="aspect-square w-full" />
      <h3 className="mt-3 truncate text-sm font-semibold">{item.title}</h3>
      <p className="truncate text-xs text-muted-foreground">{item.creator}</p>
      <p className="mt-2 flex items-center gap-1.5 truncate text-xs text-muted-foreground">
        <Headphones className="size-3 shrink-0" />
        {item.listeners} <MetaDot /> {item.episodes} eps
      </p>
    </article>
  );
}

export function VideoResultCard({ item }: { item: VideoResult }) {
  return (
    <article className="group rounded-2xl border border-border/60 bg-card/40 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30">
      <div className="relative">
        <Artwork hue={item.hue} label={item.title} className="aspect-video w-full" />
        <span className="absolute bottom-2 right-2 rounded-md bg-surface-sunken/85 px-1.5 py-0.5 text-[11px] font-medium">
          {item.duration}
        </span>
        <span className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground">
            <Play className="size-4 fill-current" />
          </span>
        </span>
      </div>
      <h3 className="mt-3 line-clamp-2 text-sm font-semibold">{item.title}</h3>
      <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-muted-foreground">
        {item.creator} <MetaDot />
        <Eye className="size-3 shrink-0" />
        {item.views}
      </p>
    </article>
  );
}

export function AudiobookResultCard({ item }: { item: AudiobookResult }) {
  return (
    <article className="grid grid-cols-[56px_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-border/60 bg-card/40 p-3 transition-colors duration-300 hover:border-accent/30">
      <Artwork hue={item.hue} label={item.title} className="h-20 w-14" rounded="rounded-lg" />
      <div className="min-w-0">
        <h3 className="truncate text-sm font-semibold">{item.title}</h3>
        <p className="mt-1 truncate text-xs text-muted-foreground">by {item.author}</p>
        <p className="mt-1 truncate text-xs text-muted-foreground">
          Narrated by {item.narrator} <MetaDot /> {item.duration}
        </p>
      </div>
      <PlayButton label={item.title} />
    </article>
  );
}

export function ShortResultCard({ item }: { item: ShortResult }) {
  return (
    <article className="group w-36 shrink-0 sm:w-auto">
      <div className="relative">
        <Artwork hue={item.hue} label={item.title} className="aspect-9/16 w-full" />
        <span className="absolute bottom-2 left-2 right-2">
          <span className="block truncate text-xs font-semibold">{item.title}</span>
          <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
            {item.creator} · {item.plays}
          </span>
        </span>
      </div>
    </article>
  );
}

export function CreatorResultCard({ item }: { item: CreatorResult }) {
  const [following, setFollowing] = useState(false);
  return (
    <article className="rounded-2xl border border-border/60 bg-card/40 p-4 transition-colors duration-300 hover:border-primary/30">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-full signal-gradient text-sm font-bold text-primary-foreground">
          {item.initials}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold">{item.name}</h3>
          <p className="flex items-center gap-1.5 truncate text-xs text-muted-foreground">
            <Users className="size-3 shrink-0" />
            {item.followers} <MetaDot /> {item.works} works
          </p>
        </div>
      </div>
      <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{item.bio}</p>
      <button
        type="button"
        onClick={() => setFollowing((v) => !v)}
        aria-pressed={following}
        className={
          following
            ? "mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-primary/40 bg-primary/12 px-4 py-2 text-xs font-semibold text-primary"
            : "mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-border bg-secondary/60 px-4 py-2 text-xs font-semibold transition-colors hover:border-primary/40"
        }
      >
        {following ? <Check className="size-3.5" /> : <Plus className="size-3.5" />}
        {following ? "Following" : "Follow"}
      </button>
    </article>
  );
}

export function CommunityResultCard({ item }: { item: CommunityResult }) {
  return (
    <article className="rounded-2xl border border-border/60 bg-card/40 p-4 transition-colors duration-300 hover:border-accent/30">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <h3 className="min-w-0 text-sm font-semibold leading-snug">{item.title}</h3>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent/12 px-2.5 py-1 text-[11px] font-medium text-accent">
          <MessageSquare className="size-3" />
          {item.comments.toLocaleString()}
        </span>
      </div>
      <p className="mt-2 truncate text-xs text-muted-foreground">
        @{item.author} <MetaDot /> {item.activity}
      </p>
      <p className="mt-3 inline-flex max-w-full items-center gap-1.5 truncate rounded-lg border border-border/70 bg-surface-sunken/50 px-2.5 py-1.5 text-[11px] text-muted-foreground">
        <Headphones className="size-3 shrink-0" />
        {item.related}
      </p>
    </article>
  );
}