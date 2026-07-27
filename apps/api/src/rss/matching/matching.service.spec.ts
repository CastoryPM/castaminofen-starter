const assert = require('node:assert/strict');
const test = require('node:test');
const { MatchingService } = require('./matching.service');

test('Podcast matching returns existing when rssUrl matches', () => {
  const service = new MatchingService();

  const result = service.matchPodcast(
    { rssUrl: 'https://example.com/feed.xml' },
    [{ rssUrl: 'https://example.com/feed.xml' }],
  );

  assert.deepEqual(result, { kind: 'ExistingPodcast', matchedBy: 'rssUrl' });
});

test('Episode matching returns existing when guid matches', () => {
  const service = new MatchingService();

  const result = service.matchEpisode(
    { guid: 'guid-1', audioUrl: 'https://example.com/audio.mp3', title: 'Episode 1', publishedAt: new Date('2024-01-01T00:00:00.000Z') },
    [{ guid: 'guid-1', audioUrl: 'https://example.com/other.mp3', title: 'Episode 1', publishedAt: new Date('2024-01-01T00:00:00.000Z') }],
  );

  assert.deepEqual(result, { kind: 'ExistingEpisode', matchedBy: 'guid' });
});

test('Episode matching returns existing when audioUrl matches', () => {
  const service = new MatchingService();

  const result = service.matchEpisode(
    { guid: null, audioUrl: 'https://example.com/audio.mp3', title: 'Episode 1', publishedAt: new Date('2024-01-01T00:00:00.000Z') },
    [{ guid: null, audioUrl: 'https://example.com/audio.mp3', title: 'Episode 1', publishedAt: new Date('2024-01-01T00:00:00.000Z') }],
  );

  assert.deepEqual(result, { kind: 'ExistingEpisode', matchedBy: 'audioUrl' });
});

test('Episode matching returns existing when title and publishedAt match', () => {
  const service = new MatchingService();

  const result = service.matchEpisode(
    { guid: null, audioUrl: null, title: 'Episode 1', publishedAt: new Date('2024-01-01T00:00:00.000Z') },
    [{ guid: null, audioUrl: null, title: 'Episode 1', publishedAt: new Date('2024-01-01T00:00:00.000Z') }],
  );

  assert.deepEqual(result, { kind: 'ExistingEpisode', matchedBy: 'titleAndPublishedAt' });
});

test('Episode matching ignores items without enough identity', () => {
  const service = new MatchingService();

  const result = service.matchEpisode(
    { guid: null, audioUrl: null, title: 'Episode 1', publishedAt: null },
    [],
  );

  assert.deepEqual(result, { kind: 'Ignored', reason: 'insufficient-identity' });
});

test('Episode matching keeps the priority order deterministic', () => {
  const service = new MatchingService();

  const result = service.matchEpisode(
    { guid: 'guid-1', audioUrl: 'https://example.com/audio.mp3', title: 'Episode 1', publishedAt: new Date('2024-01-01T00:00:00.000Z') },
    [{ guid: null, audioUrl: 'https://example.com/audio.mp3', title: 'Episode 1', publishedAt: new Date('2024-01-01T00:00:00.000Z') }],
  );

  assert.deepEqual(result, { kind: 'NewEpisode', matchedBy: 'guid' });
});
