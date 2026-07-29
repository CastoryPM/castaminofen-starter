import { describe, expect, it } from 'vitest';
import { getLibraryGreeting, getListeningStreakFromHistory, getLastActivityLabel } from './library-personalization';

describe('getLibraryGreeting', () => {
  it('returns a calm morning greeting before noon', () => {
    expect(getLibraryGreeting(new Date('2024-01-01T08:30:00'))).toBe('صبح بخیر');
  });

  it('returns an afternoon greeting in the middle of the day', () => {
    expect(getLibraryGreeting(new Date('2024-01-01T15:00:00'))).toBe('عصر بخیر');
  });

  it('returns an evening greeting late in the day', () => {
    expect(getLibraryGreeting(new Date('2024-01-01T20:00:00'))).toBe('شب بخیر');
  });
});

describe('getLastActivityLabel', () => {
  it('returns null when no timestamp exists', () => {
    expect(getLastActivityLabel(undefined)).toBeNull();
  });

  it('returns a localized label for a recent activity timestamp', () => {
    expect(getLastActivityLabel('2024-01-01T08:30:00.000Z', new Date('2024-01-02T08:30:00.000Z'))).toContain('روز');
  });
});

describe('getListeningStreakFromHistory', () => {
  it('returns null when there is not enough reliable history', () => {
    expect(getListeningStreakFromHistory([{ lastPlayedAt: '2024-01-01T08:30:00.000Z' } as any])).toBeNull();
  });

  it('returns a streak count when recent listening dates are consecutive', () => {
    const streak = getListeningStreakFromHistory([
      { lastPlayedAt: '2024-01-03T08:30:00.000Z' },
      { lastPlayedAt: '2024-01-02T08:30:00.000Z' },
      { lastPlayedAt: '2024-01-01T08:30:00.000Z' },
    ] as any);

    expect(streak).toBe(3);
  });
});
