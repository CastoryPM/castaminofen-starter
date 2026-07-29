import { describe, expect, it } from 'vitest';
import { formatProgressSummary } from './library-mappers';

describe('formatProgressSummary', () => {
  it('formats progress as a percentage with remaining time when playback data exists', () => {
    const summary = formatProgressSummary(600, 1800);

    expect(summary).toContain('33%');
    expect(summary).toContain('باقی مانده');
  });

  it('returns null when duration data is unavailable', () => {
    expect(formatProgressSummary(600, undefined)).toBeNull();
  });
});
