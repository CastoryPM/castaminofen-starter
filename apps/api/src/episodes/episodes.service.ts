import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { GetEpisodesQueryDto } from './dto/get-episodes-query.dto';

@Injectable()
export class EpisodesService {
  constructor(private prisma: PrismaService, private storageService: StorageService) {}

  async create(userId: string, data: CreateEpisodeDto) {
    const podcast = await this.prisma.podcast.findUnique({ where: { id: data.podcastId } });
    if (!podcast) {
      throw new NotFoundException('Podcast not found');
    }
    if (podcast.ownerId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.episode.create({ data });
  }

  async findAll(query: GetEpisodesQueryDto = {}) {
    const where = query.search
      ? {
          title: { contains: query.search, mode: 'insensitive' as const },
        }
      : undefined;

    return this.prisma.episode.findMany({
      where,
      select: {
        id: true,
        podcastId: true,
        title: true,
        description: true,
        audioUrl: true,
        duration: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
        podcast: {
          select: {
            title: true,
            artworkUrl: true,
          },
        },
      },
      orderBy: query.search ? { title: 'asc' } : { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return this.prisma.episode.findUnique({
      where: { id },
      select: {
        id: true,
        podcastId: true,
        title: true,
        description: true,
        audioUrl: true,
        duration: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(id: string, userId: string, data: UpdateEpisodeDto) {
    const episode = await this.prisma.episode.findUnique({
      where: { id },
      include: { podcast: true },
    });

    if (!episode) {
      throw new NotFoundException('Episode not found');
    }
    if (episode.podcast.ownerId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.episode.update({ where: { id }, data });
  }

  async uploadAudio(id: string, userId: string, file: Express.Multer.File, fileName: string) {
    const episode = await this.prisma.episode.findUnique({
      where: { id },
      include: { podcast: true },
    });

    if (!episode) {
      throw new NotFoundException('Episode not found');
    }
    if (episode.podcast.ownerId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    const key = `episodes/${id}/${Date.now()}-${fileName}`;
    const audioUrl = await this.storageService.uploadAudio(key, file.buffer, file.mimetype);

    return this.prisma.episode.update({
      where: { id },
      data: { audioUrl },
    });
  }

  async remove(id: string, userId: string) {
    const episode = await this.prisma.episode.findUnique({
      where: { id },
      include: { podcast: true },
    });

    if (!episode) {
      throw new NotFoundException('Episode not found');
    }
    if (episode.podcast.ownerId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.episode.delete({ where: { id } });
  }
}
