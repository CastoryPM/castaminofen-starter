import test from 'node:test';
import assert from 'node:assert/strict';
import { ParserService } from '../src/rss/parser/parser.service';
import { NormalizerService } from '../src/rss/normalizer/normalizer.service';

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>Example Podcast</title>
    <description>Example description</description>
    <link>https://example.com</link>
    <itunes:author>Example Author</itunes:author>
    <image>
      <url>https://example.com/artwork.jpg</url>
    </image>
    <item>
      <title>Episode 1</title>
      <description>First episode</description>
      <guid>ep-1</guid>
      <pubDate>Mon, 01 Jan 2024 12:00:00 GMT</pubDate>
      <enclosure url="https://example.com/ep1.mp3" length="123" type="audio/mpeg" />
      <itunes:duration>00:32:10</itunes:duration>
    </item>
  </channel>
</rss>`;

test('parser extracts podcast and episode data from an RSS feed', () => {
  const parser = new ParserService();
  const result = parser.parse(xml);

  assert.equal(result.podcast.title, 'Example Podcast');
  assert.equal(result.podcast.author, 'Example Author');
  assert.equal(result.episodes[0].audioUrl, 'https://example.com/ep1.mp3');
  assert.equal(result.episodes[0].guid, 'ep-1');
});

test('normalizer prepares domain-compatible values', () => {
  const parser = new ParserService();
  const normalizer = new NormalizerService();
  const parsed = parser.parse(xml);
  const result = normalizer.normalize(parsed);

  assert.equal(result.podcast.title, 'Example Podcast');
  assert.equal(result.podcast.artworkUrl, 'https://example.com/artwork.jpg');
  assert.equal(result.episodes[0].duration, 1930);
  assert.equal(result.episodes[0].publishedAt instanceof Date, true);
});
