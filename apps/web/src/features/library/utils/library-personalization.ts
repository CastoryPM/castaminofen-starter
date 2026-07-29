import type { LibraryListeningHistoryItem } from '../types';

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export function getLibraryGreeting(now = new Date()) {
  const hour = now.getHours();

  if (hour < 12) {
    return 'صبح بخیر';
  }

  if (hour < 18) {
    return 'عصر بخیر';
  }

  if (hour < 22) {
    return 'شب بخیر';
  }

  return 'خوش آمدی';
}

export function getLastActivityLabel(lastPlayedAt?: string | null, now = new Date()) {
  if (!lastPlayedAt) {
    return null;
  }

  const timestamp = new Date(lastPlayedAt);
  if (Number.isNaN(timestamp.getTime())) {
    return null;
  }

  const diffDays = Math.floor((now.getTime() - timestamp.getTime()) / DAY_IN_MS);

  if (diffDays <= 0) {
    return 'امروز';
  }

  if (diffDays === 1) {
    return 'دیروز';
  }

  if (diffDays < 7) {
    return `${diffDays} روز پیش`;
  }

  return null;
}

export function getListeningStreakFromHistory(items: Pick<LibraryListeningHistoryItem, 'lastPlayedAt'>[]) {
  if (items.length < 2) {
    return null;
  }

  const uniqueDates = Array.from(new Set(items
    .map((item) => item.lastPlayedAt)
    .filter(Boolean)
    .map((timestamp) => new Date(timestamp))
    .filter((date) => !Number.isNaN(date.getTime()))
    .map((date) => date.toISOString().slice(0, 10))));

  if (uniqueDates.length < 2) {
    return null;
  }

  const sortedDates = uniqueDates.sort();
  let streak = 1;

  for (let index = 1; index < sortedDates.length; index += 1) {
    const previous = new Date(sortedDates[index - 1]).getTime();
    const current = new Date(sortedDates[index]).getTime();
    const differenceDays = (current - previous) / DAY_IN_MS;

    if (differenceDays === 1) {
      streak += 1;
    } else {
      break;
    }
  }

  return streak;
}
