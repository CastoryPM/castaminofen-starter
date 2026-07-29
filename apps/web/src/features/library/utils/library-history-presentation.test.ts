import { describe, expect, it } from 'vitest';
import { formatRelativePlayedAt } from './library-history-presentation';

describe('formatRelativePlayedAt', () => {
  const now = new Date('2026-07-29T12:00:00.000Z');

  it('returns "همین الان" for timestamps within a minute', () => {
    const ts = new Date(now.getTime() - 10 * 1000).toISOString();
    expect(formatRelativePlayedAt(ts, now)).toBe('همین الان');
  });

  it('returns minutes ago when within an hour', () => {
    const ts = new Date(now.getTime() - 5 * 60 * 1000).toISOString();
    expect(formatRelativePlayedAt(ts, now)).toBe('5 دقیقه پیش');
  });

  it('returns hours ago when within a day', () => {
    const ts = new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString();
    expect(formatRelativePlayedAt(ts, now)).toBe('2 ساعت پیش');
  });

  it('returns yesterday for 1 day difference', () => {
    const ts = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
    expect(formatRelativePlayedAt(ts, now)).toBe('دیروز');
  });

  it('returns a formatted date for older timestamps', () => {
    const ts = new Date('2026-01-15T08:30:00.000Z').toISOString();
    const out = formatRelativePlayedAt(ts, now);
    expect(out).toBeTruthy();
    expect(out).not.toMatch(/NaN|invalid|undefined/i);
  });

  it('handles invalid timestamp gracefully', () => {
    expect(formatRelativePlayedAt('not-a-date', now)).toBeNull();
  });

  it('handles missing value gracefully', () => {
    expect(formatRelativePlayedAt(undefined, now)).toBeNull();
    expect(formatRelativePlayedAt(null, now)).toBeNull();
  });
});
