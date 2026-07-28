import test from 'node:test';
import assert from 'node:assert/strict';
import { FetcherService } from './fetcher.service';

test('FetcherService retries transient failures and succeeds on a later attempt', async () => {
  const fetcher = new FetcherService();
  let callCount = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (fetcher as any).request = async () => {
    callCount += 1;
    if (callCount === 1) {
      throw new Error('request timeout');
    }
    return '<rss><channel><title>Feed</title></channel></rss>';
  };

  const body = await fetcher.fetchFeed('https://example.com/feed.xml');

  assert.equal(body, '<rss><channel><title>Feed</title></channel></rss>');
  assert.equal(callCount, 2);
});

test('FetcherService does not retry non-transient HTTP 404 failures', async () => {
  const fetcher = new FetcherService();
  let callCount = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (fetcher as any).request = async () => {
    callCount += 1;
    throw new Error('request failed with status 404');
  };

  await assert.rejects(
    async () => fetcher.fetchFeed('https://example.com/feed.xml'),
    {
      message: /fetch failed: request failed with status 404/i,
    },
  );

  assert.equal(callCount, 1);
});
