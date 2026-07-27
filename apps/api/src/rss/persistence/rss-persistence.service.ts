import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NormalizedFeed } from '../types';

@Injectable()
export class RssPersistenceService {
  constructor(private readonly prisma: PrismaService) {}

  async persistNormalizedFeed(feed: NormalizedFeed) {
    this.assertValidFeed(feed);

    return this.prisma.$transaction(async (tx) => {
      const feedSource = await tx.feedSource.upsert({
        where: { url: feed.podcast.rssUrl ?? '' },
        update: {},
        create: {
          url: feed.podcast.rssUrl ?? '',
          type: 'RSS',
        },
      });

      const podcast = await tx.podcast.create({
        data: {
          title: feed.podcast.title,
          rssUrl: feed.podcast.rssUrl ?? '',
          description: feed.podcast.description ?? null,
          website: feed.podcast.website ?? null,
          artworkUrl: feed.podcast.artworkUrl ?? null,
          feedSourceId: feedSource.id,
        },
      });

      const episodes = await Promise.all(
        feed.episodes.map(async (episode) =>
          tx.episode.create({
            data: {
              podcastId: podcast.id,
              title: episode.title,
              description: episode.description ?? null,
              guid: episode.guid ?? null,
              audioUrl: episode.audioUrl ?? null,
              duration: episode.duration ?? null,
              publishedAt: episode.publishedAt ?? null,
            },
          }),
        ),
      );

      return { podcast, episodes };
    });
  }

  private assertValidFeed(feed: NormalizedFeed) {
    if (!feed?.podcast?.title || !feed?.podcast?.rssUrl) {
      throw new BadRequestException('RSS persistence requires a podcast title and RSS URL');
    }
  }
}
