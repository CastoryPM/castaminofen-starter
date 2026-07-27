import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { FetcherService } from './fetcher/fetcher.service';
import { ParserService } from './parser/parser.service';
import { NormalizerService } from './normalizer/normalizer.service';
import { ImporterService } from './importer/importer.service';
import { MatchingService } from './matching/matching.service';
import { RssPersistenceService } from './persistence/rss-persistence.service';
import { SynchronizationService } from './synchronization/synchronization.service';

@Module({
  imports: [PrismaModule],
  providers: [FetcherService, ParserService, NormalizerService, ImporterService, MatchingService, RssPersistenceService, SynchronizationService],
  exports: [ImporterService],
})
export class RssModule {}
