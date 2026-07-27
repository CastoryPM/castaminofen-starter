import { Module } from '@nestjs/common';
import { FetcherService } from './fetcher/fetcher.service';
import { ParserService } from './parser/parser.service';
import { NormalizerService } from './normalizer/normalizer.service';
import { ImporterService } from './importer/importer.service';

@Module({
  providers: [FetcherService, ParserService, NormalizerService, ImporterService],
  exports: [ImporterService],
})
export class RssModule {}
