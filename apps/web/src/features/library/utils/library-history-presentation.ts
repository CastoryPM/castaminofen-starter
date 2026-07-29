const MINUTE_MS = 60 * 1000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

export function formatRelativePlayedAt(value?: string | null, now = new Date()): string | null {
  if (!value) {
    return null;
  }

  const timestamp = new Date(value);
  if (Number.isNaN(timestamp.getTime())) {
    return null;
  }

  const diffMs = now.getTime() - timestamp.getTime();
  if (diffMs < 0) {
    return null;
  }

  if (diffMs < MINUTE_MS) {
    return 'همین الان';
  }

  if (diffMs < HOUR_MS) {
    const minutes = Math.floor(diffMs / MINUTE_MS);
    return `${minutes} دقیقه پیش`;
  }

  if (diffMs < DAY_MS) {
    const hours = Math.floor(diffMs / HOUR_MS);
    return `${hours} ساعت پیش`;
  }

  const days = Math.floor(diffMs / DAY_MS);
  if (days === 1) {
    return 'دیروز';
  }

  try {
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).format(timestamp);
  } catch {
    return null;
  }
}
