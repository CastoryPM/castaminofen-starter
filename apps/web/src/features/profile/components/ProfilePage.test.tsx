import { describe, expect, it } from 'vitest';
import { formatAccountDate, normalizeProfileName } from './ProfilePage';

describe('formatAccountDate', () => {
  it('formats ISO dates in Persian locale', () => {
    expect(formatAccountDate('2024-02-15T00:00:00.000Z')).toBe('۱۴۰۲/۱۱/۲۶');
  });

  it('returns a placeholder for missing values', () => {
    expect(formatAccountDate()).toBe('—');
  });
});

describe('normalizeProfileName', () => {
  it('trims whitespace and preserves meaningful content', () => {
    expect(normalizeProfileName('  علی محمد  ')).toBe('علی محمد');
  });

  it('returns an empty string for blank values', () => {
    expect(normalizeProfileName('   ')).toBe('');
  });
});
