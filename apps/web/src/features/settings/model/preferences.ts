export type SettingsThemePreference = 'System' | 'Light' | 'Dark';

export interface SettingsPreferences {
  theme: SettingsThemePreference;
}

export const DEFAULT_SETTINGS_PREFERENCES: SettingsPreferences = {
  theme: 'System',
};
