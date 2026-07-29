import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PodcastsService } from '../podcasts/podcasts.service';
import { UpdateListeningHistoryDto } from './dto/update-listening-history.dto';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class LibraryService {
  constructor(private prisma: PrismaService, private podcastsService: PodcastsService) {}

  async getFavorites(userId: string) {
    return this.prisma.favoriteEpisode.findMany({
      where: { userId },
      include: { episode: { include: { podcast: true } } },
      orderBy: { savedAt: 'desc' },
      take: 100,
    });
  }

  async saveFavorite(userId: string, dto: CreateFavoriteDto) {
    const { episodeId } = dto;

    const episode = await this.prisma.episode.findUnique({ where: { id: episodeId } });
    if (!episode) throw new NotFoundException('Episode not found');

    try {
      return await this.prisma.favoriteEpisode.create({
        data: { userId, episodeId },
        include: { episode: { include: { podcast: true } } },
      });
    } catch (e: any) {
      if (
        (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') ||
        e?.code === 'P2002'
      ) {
        throw new ConflictException('Already saved');
      }
      throw e;
    }
  }

  async removeFavorite(userId: string, episodeId: string) {
    const existing = await this.prisma.favoriteEpisode.findUnique({
      where: { userId_episodeId: { userId, episodeId } },
    });

    if (!existing) {
      throw new NotFoundException('Favorite not found');
    }

    return this.prisma.favoriteEpisode.delete({ where: { id: existing.id } });
  }

  async subscribe(userId: string, podcastId: string) {
    // validate podcast exists
    await this.podcastsService.findById(podcastId);

    try {
      return await this.prisma.userSubscription.create({
        data: { userId, podcastId },
        include: { podcast: true },
      });
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException('Already subscribed');
      }
      throw e;
    }
  }

  async unsubscribe(userId: string, podcastId: string) {
    const existing = await this.prisma.userSubscription.findUnique({
      where: { userId_podcastId: { userId, podcastId } },
    });

    if (!existing) {
      throw new NotFoundException('Subscription not found');
    }

    return this.prisma.userSubscription.delete({ where: { id: existing.id } });
  }

  async getSubscriptions(userId: string) {
    return this.prisma.userSubscription.findMany({
      where: { userId },
      include: { podcast: true },
      orderBy: { subscribedAt: 'desc' },
    });
  }

  async getContinueListening(userId: string) {
    const items = await this.prisma.listeningHistory.findMany({
      where: { userId, completed: false },
      orderBy: { lastPlayedAt: 'desc' },
      include: { episode: { include: { podcast: true } } },
      take: 20,
    });

    return items;
  }

  async getHistory(userId: string) {
    const items = await this.prisma.listeningHistory.findMany({
      where: { userId },
      orderBy: { lastPlayedAt: 'desc' },
      include: { episode: { include: { podcast: true } } },
      take: 20,
    });

    return items;
  }

  async updateListeningProgress(userId: string, episodeId: string, dto: UpdateListeningHistoryDto) {
    const episode = await this.prisma.episode.findUnique({ where: { id: episodeId } });
    if (!episode) throw new NotFoundException('Episode not found');

    const data: any = {
      positionSeconds: dto.positionSeconds,
      completed: dto.completed ?? false,
      lastPlayedAt: new Date(),
    };

    return this.prisma.listeningHistory.upsert({
      where: { userId_episodeId: { userId, episodeId } },
      update: data,
      create: { userId, episodeId, ...data },
    });
  }
}
