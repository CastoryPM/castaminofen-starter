import { Injectable } from '@nestjs/common';
import { get as httpGet } from 'http';
import { get as httpsGet } from 'https';

@Injectable()
export class FetcherService {
  async fetchFeed(url: string): Promise<string> {
    try {
      return await this.request(url);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown fetch error';
      throw new Error(`fetch failed: ${message}`);
    }
  }

  private request(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const client = url.startsWith('https://') ? httpsGet : httpGet;
      const request = client(
        url,
        { timeout: 5000 },
        (response) => {
          if (response.statusCode && response.statusCode >= 400) {
            response.destroy();
            reject(new Error(`request failed with status ${response.statusCode}`));
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
}
