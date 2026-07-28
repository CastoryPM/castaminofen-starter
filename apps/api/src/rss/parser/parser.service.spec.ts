import test from 'node:test';
import assert from 'node:assert/strict';
import { ParserService } from './parser.service';

test('ParserService parses valid RSS feeds', () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Example Podcast</title>
    <item>
      <title>Episode 1</title>
      <guid>guid-1</guid>
      <enclosure url="https://example.com/audio.mp3" />
    </item>
  </channel>
</rss>`;

  const parser = new ParserService();
  const result = parser.parse(xml);

  assert.equal(result.podcast.title, 'Example Podcast');
  assert.equal(result.episodes.length, 1);
  assert.equal(result.episodes[0].title, 'Episode 1');
});

test('ParserService rejects empty RSS text', () => {
  const parser = new ParserService();

  assert.throws(
    () => parser.parse(''),
    {
      message: /invalid RSS format: empty response/i,
    },
  );
});

test('ParserService rejects unsupported feed content', () => {
  const parser = new ParserService();
  const invalidXml = '<html><body>Not RSS</body></html>';

  assert.throws(
    () => parser.parse(invalidXml),
    {
      message: /invalid RSS format: unsupported feed type/i,
    },
  );
});
