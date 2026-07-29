import { useEffect, useState } from 'react';
import { DEFAULT_SETTINGS_PREFERENCES, type SettingsNotificationPreferences, type SettingsPreferences, type SettingsThemePreference } from '../model/preferences';
import { readSettingsPreferences, writeSettingsPreferences } from '../services/preferencesPersistence';

export function useSettingsPreferences() {
  const [preferences, setPreferences] = useState<SettingsPreferences>(DEFAULT_SETTINGS_PREFERENCES);

  useEffect(() => {
    setPreferences(readSettingsPreferences());
  }, []);

  const updatePreference = (updates: Partial<SettingsPreferences>) => {
    setPreferences((currentPreferences) => {
      const nextPreferences = {
        ...currentPreferences,
        ...updates,
        notifications: {
          ...currentPreferences.notifications,
          ...(updates.notifications ?? {}),
        },
      };

      writeSettingsPreferences(nextPreferences);

      return nextPreferences;
    });
  };

  const updateTheme = (theme: SettingsThemePreference) => {
    updatePreference({ theme });
  };

  const updateAutoplay = (autoplay: boolean) => {
    updatePreference({ autoplay });
  };

  const updateDefaultVolume = (defaultVolume: number) => {
    updatePreference({ defaultVolume });
  };

  const updateResumePlayback = (resumePlayback: boolean) => {
    updatePreference({ resumePlayback });
  };

  const updateNotifications = (updates: Partial<SettingsNotificationPreferences>) => {
    updatePreference({
      notifications: {
        ...preferences.notifications,
        ...updates,
      },
    });
  };

  return {
    preferences,
    updateTheme,
    updateAutoplay,
    updateDefaultVolume,
    updateResumePlayback,
    updateNotifications,
  };
}
