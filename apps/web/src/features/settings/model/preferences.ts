export type SettingsThemePreference = 'System' | 'Light' | 'Dark';

export interface SettingsNotificationPreferences {
  enabled: boolean;
  newEpisodes: boolean;
  productUpdates: boolean;
}

export interface SettingsPreferences {
  theme: SettingsThemePreference;
  autoplay: boolean;
  defaultVolume: number;
  resumePlayback: boolean;
  notifications: SettingsNotificationPreferences;
}

export const DEFAULT_SETTINGS_PREFERENCES: SettingsPreferences = {
  theme: 'System',
  autoplay: false,
  defaultVolume: 0.8,
  resumePlayback: true,
  notifications: {
    enabled: false,
    newEpisodes: false,
    productUpdates: false,
  },
};
