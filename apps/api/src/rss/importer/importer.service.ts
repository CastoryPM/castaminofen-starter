import { Injectable } from '@nestjs/common';
import { FetcherService } from '../fetcher/fetcher.service';
import { ParserService } from '../parser/parser.service';
import { NormalizerService } from '../normalizer/normalizer.service';
import { NormalizedFeed } from '../types';

@Injectable()
export class ImporterService {
  constructor(
    private readonly fetcher: FetcherService,
    private readonly parser: ParserService,
    private readonly normalizer: NormalizerService,
  ) {}

  async importFeed(feedUrl: string): Promise<NormalizedFeed> {
    const rawFeed = await this.fetcher.fetchFeed(feedUrl);
    const parsedFeed = this.parser.parse(rawFeed);
    return this.normalizer.normalize(parsedFeed, feedUrl);
  }
}
