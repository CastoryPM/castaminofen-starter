export type SettingsThemePreference = 'System' | 'Light' | 'Dark';

export interface SettingsPreferences {
  theme: SettingsThemePreference;
  autoplay: boolean;
  defaultVolume: number;
  resumePlayback: boolean;
}

export const DEFAULT_SETTINGS_PREFERENCES: SettingsPreferences = {
  theme: 'System',
  autoplay: false,
  defaultVolume: 0.8,
  resumePlayback: true,
};
