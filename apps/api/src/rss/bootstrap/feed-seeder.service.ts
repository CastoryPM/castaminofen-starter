import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { predefinedFeedSources, PredefinedFeedSourceConfig } from './feed-config';

export async function bootstrapFeedSources(
  prisma: PrismaClient,
  feedSources: PredefinedFeedSourceConfig[] = predefinedFeedSources,
): Promise<void> {
  for (const feedSource of feedSources) {
    const existing = await prisma.feedSource.findUnique({
      where: { url: feedSource.url },
    });

    if (existing) {
      continue;
    }

    await prisma.feedSource.create({
      data: {
        url: feedSource.url,
        type: feedSource.type,
      },
    });
  }
}

@Injectable()
export class FeedSourceSeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(FeedSourceSeederService.name);

  constructor(private readonly prisma: PrismaService) {}

  async onApplicationBootstrap(): Promise<void> {
    this.logger.log('Bootstrapping predefined RSS FeedSources');
    await bootstrapFeedSources(this.prisma);
    this.logger.log('Predefined RSS FeedSources are ensured');
  }
}
