import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFeedSourceDto } from '../dto/create-feed-source.dto';
import { UpdateFeedSourceDto } from '../dto/update-feed-source.dto';
import { FeedSource } from '@prisma/client';

@Injectable()
export class FeedSourceService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new FeedSource.
   * Validates URL uniqueness and format.
   */
  async create(dto: CreateFeedSourceDto): Promise<FeedSource> {
    // Check for existing URL
    const existing = await this.prisma.feedSource.findUnique({
      where: { url: dto.url },
    });

    if (existing) {
      throw new ConflictException(`FeedSource with URL "${dto.url}" already exists`);
    }

    return this.prisma.feedSource.create({
      data: {
        url: dto.url,
        type: dto.type || 'RSS',
      },
    });
  }

  /**
   * List all FeedSources.
   */
  async findAll(): Promise<FeedSource[]> {
    return this.prisma.feedSource.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get a single FeedSource by ID.
   */
  async findById(id: string): Promise<FeedSource> {
    const feedSource = await this.prisma.feedSource.findUnique({
      where: { id },
    });

    if (!feedSource) {
      throw new NotFoundException(`FeedSource with ID "${id}" not found`);
    }

    return feedSource;
  }

  /**
   * Update a FeedSource.
   * Only allows updating operational fields that are safe to modify.
   */
  async update(id: string, dto: UpdateFeedSourceDto): Promise<FeedSource> {
    // Verify the FeedSource exists
    const feedSource = await this.findById(id);

    // If URL is being updated, check for duplicates
    if (dto.url && dto.url !== feedSource.url) {
      const existing = await this.prisma.feedSource.findUnique({
        where: { url: dto.url },
      });

      if (existing) {
        throw new ConflictException(`FeedSource with URL "${dto.url}" already exists`);
      }
    }

    const updateData: Record<string, unknown> = {};

    if (dto.url !== undefined) {
      updateData.url = dto.url;
    }

    // Type cannot be changed after creation (not exposed in update)
    // syncStatus, lastSyncedAt, lastError are operational and not exposed to API clients

    return this.prisma.feedSource.update({
      where: { id },
      data: updateData,
    });
  }

  /**
   * Delete a FeedSource.
   * Checks if it's safe to delete based on persistence constraints.
   */
  async delete(id: string): Promise<void> {
    // Verify the FeedSource exists
    await this.findById(id);

    // Check if FeedSource is associated with a Podcast
    const podcast = await this.prisma.podcast.findFirst({
      where: { feedSourceId: id },
    });

    if (podcast) {
      throw new ConflictException(
        `Cannot delete FeedSource "${id}" because it is associated with Podcast "${podcast.id}". ` +
        `Remove the Podcast first or update its feedSourceId.`
      );
    }

    await this.prisma.feedSource.delete({
      where: { id },
    });
  }
}
