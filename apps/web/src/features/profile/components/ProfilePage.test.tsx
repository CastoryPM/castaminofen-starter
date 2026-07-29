import { describe, expect, it } from 'vitest';
import { formatAccountDate } from './ProfilePage';

describe('formatAccountDate', () => {
  it('formats ISO dates in Persian locale', () => {
    expect(formatAccountDate('2024-02-15T00:00:00.000Z')).toBe('۱۵/۲/۲۰۲۴');
  });

  it('returns a placeholder for missing values', () => {
    expect(formatAccountDate()).toBe('—');
  });
});
