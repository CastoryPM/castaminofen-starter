import { useEffect, useState } from 'react';
import { DEFAULT_SETTINGS_PREFERENCES, type SettingsPreferences, type SettingsThemePreference } from '../model/preferences';
import { readSettingsPreferences, writeSettingsPreferences } from '../services/preferencesPersistence';

export function useSettingsPreferences() {
  const [preferences, setPreferences] = useState<SettingsPreferences>(DEFAULT_SETTINGS_PREFERENCES);

  useEffect(() => {
    setPreferences(readSettingsPreferences());
  }, []);

  const updateTheme = (theme: SettingsThemePreference) => {
    setPreferences((currentPreferences) => {
      const nextPreferences = {
        ...currentPreferences,
        theme,
      };

      writeSettingsPreferences(nextPreferences);

      return nextPreferences;
    });
  };

  return {
    preferences,
    updateTheme,
  };
}
