import { DEFAULT_SETTINGS_PREFERENCES, type SettingsPreferences, type SettingsThemePreference } from '../model/preferences';

const SETTINGS_PREFERENCES_STORAGE_KEY = 'castaminofen-settings-preferences';

type BrowserWindowLike = Window & typeof globalThis;

const getBrowserWindow = (): BrowserWindowLike | undefined => {
  const candidate = (globalThis as typeof globalThis & { window?: BrowserWindowLike }).window;
  return candidate;
};

const isSettingsThemePreference = (value: unknown): value is SettingsThemePreference =>
  value === 'System' || value === 'Light' || value === 'Dark';

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
