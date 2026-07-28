import { Injectable } from '@nestjs/common';
import { get as httpGet } from 'http';
import { get as httpsGet } from 'https';

@Injectable()
export class FetcherService {
  private readonly retryCount = Number(process.env.RSS_FETCH_RETRY_COUNT ?? '2');
  private readonly retryDelayMs = Number(process.env.RSS_FETCH_RETRY_DELAY_MS ?? '250');

  async fetchFeed(url: string): Promise<string> {
    let attempt = 0;
    let lastError: Error | null = null;

    while (attempt <= this.retryCount) {
      try {
        return await this.request(url);
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        attempt += 1;

        if (attempt > this.retryCount || !this.isTransientError(lastError)) {
          const message = lastError.message || 'Unknown fetch error';
          throw new Error(`fetch failed: ${message}`);
        }

        await this.delay(this.retryDelayMs * attempt);
      }
    }

    throw new Error(`fetch failed: ${lastError?.message ?? 'unknown error'}`);
  }

  private request(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const client = url.startsWith('https://') ? httpsGet : httpGet;
      const request = client(
        url,
        { timeout: 5000 },
        (response) => {
          const contentType = response.headers['content-type'] ?? '';

          if (response.statusCode && response.statusCode >= 400) {
            response.destroy();
            reject(new Error(`request failed with status ${response.statusCode}`));
            return;
          }

          if (contentType && !/xml|rss|html|text\/plain|application\/xml|application\/rss\+xml/i.test(contentType)) {
            response.destroy();
            reject(new Error(`unsupported response content type: ${contentType}`));
            return;
          }

          const chunks: Buffer[] = [];
          response.on('data', (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
          response.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        },
      );

      request.on('error', reject);
      request.on('timeout', () => {
        request.destroy(new Error('request timeout'));
      });
    });
  }

  private isTransientError(error: Error): boolean {
    const transientPatterns = [
      /timeout/i,
      /ECONNRESET/i,
      /EAI_AGAIN/i,
      /ENOTFOUND/i,
      /EPIPE/i,
      /request failed with status 5\d\d/i,
      /request failed with status 429/i,
      /fetch failed/i,
    ];

    return transientPatterns.some((pattern) => pattern.test(error.message));
  }

  private delay(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }
}
