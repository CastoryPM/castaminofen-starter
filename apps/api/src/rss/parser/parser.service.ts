import { Injectable } from '@nestjs/common';
import { ParsedEpisode, ParsedFeed, ParsedPodcast } from '../types';

@Injectable()
export class ParserService {
  parse(xml: string): ParsedFeed {
    const channelMatch = xml.match(/<channel\b[^>]*>([\s\S]*?)<\/channel>/i);
    if (!channelMatch) {
      throw new Error('invalid RSS');
    }

    const channel = channelMatch[1];
    const podcast = this.parsePodcast(channel);
    const episodes = this.parseEpisodes(channel);

    return { podcast, episodes };
  }

  private parsePodcast(channel: string): ParsedPodcast {
    return {
      title: this.extractText(channel, 'title'),
      description: this.extractText(channel, 'description'),
      author: this.extractText(channel, 'author') || this.extractText(channel, 'itunes:author'),
      image: this.extractImageUrl(channel),
      link: this.extractText(channel, 'link'),
    };
  }

  private parseEpisodes(channel: string): ParsedEpisode[] {
    const items = Array.from(channel.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi));

    return items.map((itemMatch) => {
      const itemContent = itemMatch[1];
      return {
        title: this.extractText(itemContent, 'title'),
        description: this.extractText(itemContent, 'description'),
        guid: this.extractText(itemContent, 'guid'),
        audioUrl: this.extractEnclosureUrl(itemContent),
        duration: this.extractText(itemContent, 'itunes:duration') || this.extractText(itemContent, 'duration'),
        publishedAt: this.extractText(itemContent, 'pubDate') || this.extractText(itemContent, 'published'),
      };
    });
  }

  private extractText(content: string, tagName: string): string | undefined {
    const tagPattern = new RegExp(`<(?:[^:>]+:)?${this.escapeRegex(tagName)}\\b[^>]*>([\\s\\S]*?)<\\/(?:[^:>]+:)?${this.escapeRegex(tagName)}>`, 'i');
    const match = content.match(tagPattern);

    if (!match) {
      return undefined;
    }

    return this.decodeHtmlEntities(this.stripTags(match[1]).trim());
  }

  private extractImageUrl(content: string): string | undefined {
    const imageMatch = content.match(/<image\b[^>]*>([\s\S]*?)<\/image>/i);
    if (!imageMatch) {
      return undefined;
    }

    return this.extractText(imageMatch[1], 'url');
  }

  private extractEnclosureUrl(content: string): string | undefined {
    const enclosureMatch = content.match(/<enclosure\b[^>]*url=["']([^"']+)["'][^>]*>/i);
    return enclosureMatch?.[1];
  }

  private stripTags(value: string): string {
    return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  private decodeHtmlEntities(value: string): string {
    return value
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  }

  private escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
