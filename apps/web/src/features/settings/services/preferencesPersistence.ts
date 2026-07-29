import { DEFAULT_SETTINGS_PREFERENCES, type SettingsNotificationPreferences, type SettingsPreferences, type SettingsThemePreference } from '../model/preferences';

const SETTINGS_PREFERENCES_STORAGE_KEY = 'castaminofen-settings-preferences';

type BrowserWindowLike = Window & typeof globalThis;

const getBrowserWindow = (): BrowserWindowLike | undefined => {
  const candidate = (globalThis as typeof globalThis & { window?: BrowserWindowLike }).window;
  return candidate;
};

const isSettingsThemePreference = (value: unknown): value is SettingsThemePreference =>
  value === 'System' || value === 'Light' || value === 'Dark';

const normalizeDefaultVolume = (value: unknown): number => {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return DEFAULT_SETTINGS_PREFERENCES.defaultVolume;
  }

  return Math.min(1, Math.max(0, value));
};

const normalizeNotificationPreferences = (value: unknown): SettingsNotificationPreferences => {
  const source = typeof value === 'object' && value !== null ? (value as Record<string, unknown>) : {};

  return {
    enabled: typeof source.enabled === 'boolean' ? source.enabled : DEFAULT_SETTINGS_PREFERENCES.notifications.enabled,
    newEpisodes: typeof source.newEpisodes === 'boolean' ? source.newEpisodes : DEFAULT_SETTINGS_PREFERENCES.notifications.newEpisodes,
    productUpdates: typeof source.productUpdates === 'boolean' ? source.productUpdates : DEFAULT_SETTINGS_PREFERENCES.notifications.productUpdates,
  };
};

export function readSettingsPreferences(): SettingsPreferences {
  const storage = getBrowserWindow()?.localStorage;

  if (!storage) {
    return DEFAULT_SETTINGS_PREFERENCES;
  }

  const rawValue = storage.getItem(SETTINGS_PREFERENCES_STORAGE_KEY);

  if (!rawValue) {
    return DEFAULT_SETTINGS_PREFERENCES;
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<SettingsPreferences> | null;

    if (!parsed || typeof parsed !== 'object') {
      return DEFAULT_SETTINGS_PREFERENCES;
    }

    return {
      theme: isSettingsThemePreference(parsed.theme) ? parsed.theme : DEFAULT_SETTINGS_PREFERENCES.theme,
      autoplay: typeof parsed.autoplay === 'boolean' ? parsed.autoplay : DEFAULT_SETTINGS_PREFERENCES.autoplay,
      defaultVolume: normalizeDefaultVolume(parsed.defaultVolume),
      resumePlayback: typeof parsed.resumePlayback === 'boolean' ? parsed.resumePlayback : DEFAULT_SETTINGS_PREFERENCES.resumePlayback,
      notifications: normalizeNotificationPreferences(parsed.notifications),
    };
  } catch {
    return DEFAULT_SETTINGS_PREFERENCES;
  }
}

export function writeSettingsPreferences(preferences: SettingsPreferences): SettingsPreferences {
  const storage = getBrowserWindow()?.localStorage;

  if (!storage) {
    return preferences;
  }

  const normalizedPreferences: SettingsPreferences = {
    theme: isSettingsThemePreference(preferences.theme) ? preferences.theme : DEFAULT_SETTINGS_PREFERENCES.theme,
    autoplay: typeof preferences.autoplay === 'boolean' ? preferences.autoplay : DEFAULT_SETTINGS_PREFERENCES.autoplay,
    defaultVolume: normalizeDefaultVolume(preferences.defaultVolume),
    resumePlayback: typeof preferences.resumePlayback === 'boolean' ? preferences.resumePlayback : DEFAULT_SETTINGS_PREFERENCES.resumePlayback,
    notifications: normalizeNotificationPreferences(preferences.notifications),
  };

  try {
    storage.setItem(SETTINGS_PREFERENCES_STORAGE_KEY, JSON.stringify(normalizedPreferences));
  } catch {
    // Ignore persistence failures in non-browser environments.
  }

  return normalizedPreferences;
}

export function clearSettingsPreferences(): void {
  const storage = getBrowserWindow()?.localStorage;

  if (!storage) {
    return;
  }

  try {
    storage.removeItem(SETTINGS_PREFERENCES_STORAGE_KEY);
  } catch {
    // Ignore cleanup failures.
  }
}
