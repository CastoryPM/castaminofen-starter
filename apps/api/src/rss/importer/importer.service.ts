import { Injectable } from '@nestjs/common';
import { FetcherService } from '../fetcher/fetcher.service';
import { ParserService } from '../parser/parser.service';
import { NormalizerService } from '../normalizer/normalizer.service';
import { RssPersistenceService } from '../persistence/rss-persistence.service';
import { NormalizedFeed } from '../types';

@Injectable()
export class ImporterService {
  constructor(
    private readonly fetcher: FetcherService,
    private readonly parser: ParserService,
    private readonly normalizer: NormalizerService,
    private readonly persistence: RssPersistenceService,
  ) {}

  async importFeed(feedUrl: string): Promise<NormalizedFeed> {
    const rawFeed = await this.fetcher.fetchFeed(feedUrl);
    const parsedFeed = this.parser.parse(rawFeed);
    return this.normalizer.normalize(parsedFeed, feedUrl);
  }

  async importFeedAndPersist(feedUrl: string) {
    const normalizedFeed = await this.importFeed(feedUrl);
    return this.persistence.persistNormalizedFeed(normalizedFeed);
  }
}
