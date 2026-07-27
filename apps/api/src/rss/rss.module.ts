import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { FetcherService } from './fetcher/fetcher.service';
import { ParserService } from './parser/parser.service';
import { NormalizerService } from './normalizer/normalizer.service';
import { ImporterService } from './importer/importer.service';
import { MatchingService } from './matching/matching.service';
import { RssPersistenceService } from './persistence/rss-persistence.service';
import { SynchronizationService } from './synchronization/synchronization.service';
import { RssSyncOrchestrator } from './orchestration/rss-sync.orchestrator';
import { RssSyncController } from './controllers/rss-sync.controller';

@Module({
  imports: [PrismaModule],
  controllers: [RssSyncController],
  providers: [
    FetcherService,
    ParserService,
    NormalizerService,
    ImporterService,
    MatchingService,
    RssPersistenceService,
    SynchronizationService,
    RssSyncOrchestrator,
  ],
  exports: [ImporterService],
})
export class RssModule {}
