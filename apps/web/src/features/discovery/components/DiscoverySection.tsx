'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Sparkles } from 'lucide-react';
import type { Episode, Podcast } from '@/lib/types';
import type { DiscoverySectionDefinition } from '../utils/discovery-content';

function isPodcast(item: Podcast | Episode | { id: string; title: string; description: string }): item is Podcast {
  return 'rssUrl' in item;
}

function isEpisode(item: Podcast | Episode | { id: string; title: string; description: string }): item is Episode {
  return 'podcastId' in item;
}

export function DiscoverySection({ section }: { section: DiscoverySectionDefinition }) {
  const Icon = section.icon;

  return (
    <section className="rounded-[1.75rem] border border-border/80 bg-surface-secondary/70 p-4 shadow-soft sm:p-5" aria-labelledby={`${section.id}-heading`}>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">{section.eyebrow}</p>
          <h2 id={`${section.id}-heading`} className="text-subheading">{section.title}</h2>
          <p className="m-0 text-sm text-text-secondary">{section.description}</p>
        </div>
        {section.actionLabel ? (
          <Link href="/podcasts" className="inline-flex items-center gap-2 text-sm font-medium text-accent transition hover:text-accent/80">
            <span>{section.actionLabel}</span>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        ) : null}
      </div>

      {section.mode === 'placeholder' ? (
        <div className="rounded-[1.5rem] border border-dashed border-border/80 bg-surface-primary/90 p-5" role="status" aria-live="polite">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-text-primary">{section.title}</h3>
              <p className="m-0 text-sm text-text-secondary">{section.placeholder}</p>
            </div>
          </div>
        </div>
      ) : null}

      {section.mode === 'podcasts' && section.items?.length ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {section.items.map((item) => {
            const podcast = isPodcast(item) ? item : null;
            if (!podcast) {
              return null;
            }
            return (
              <article key={podcast.id} className="group flex flex-col gap-3 rounded-[1.5rem] border border-border/80 bg-surface-primary/90 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-surface-primary">
                {podcast.artworkUrl ? (
                  <Image src={podcast.artworkUrl} alt={podcast.title} width={480} height={270} className="h-36 w-full rounded-[1.25rem] object-cover" unoptimized />
                ) : (
                  <div className="flex h-36 w-full items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-accent/20 to-accent/5 text-accent">
                    <Sparkles className="h-8 w-8" aria-hidden="true" />
                  </div>
                )}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-text-primary">{podcast.title}</h3>
                  <p className="m-0 text-sm text-text-secondary">{podcast.description || 'توضیحی برای این پادکست ثبت نشده است.'}</p>
                </div>
                <Link href={`/podcasts/${podcast.id}`} className="mt-auto inline-flex min-h-[2.75rem] items-center justify-center rounded-[1rem] border border-border bg-surface-secondary px-3 py-2 text-sm font-medium text-text-primary transition hover:border-accent/30 hover:bg-surface-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-secondary">
                  باز کردن پادکست
                </Link>
              </article>
            );
          })}
        </div>
      ) : null}

      {section.mode === 'episodes' && section.items?.length ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {section.items.map((item) => {
            const episode = isEpisode(item) ? item : null;
            if (!episode) {
              return null;
            }
            return (
              <article key={episode.id} className="group flex flex-col gap-3 rounded-[1.5rem] border border-border/80 bg-surface-primary/90 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-surface-primary">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Sparkles className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-text-primary">{episode.title}</h3>
                    <p className="m-0 text-sm text-text-secondary">{episode.description || 'بدون توضیح'}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : null}

      {section.mode === 'categories' ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {section.items?.map((item) => (
            <div key={item.id} className="rounded-[1.5rem] border border-border/80 bg-surface-primary/90 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-text-primary">{item.title}</h3>
              <p className="mt-2 text-sm text-text-secondary">{item.description}</p>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
