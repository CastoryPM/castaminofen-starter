import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { DEFAULT_SETTINGS_PREFERENCES } from '../model/preferences';
import { readSettingsPreferences, writeSettingsPreferences } from './preferencesPersistence';

describe('preferencesPersistence', () => {
  const storage = new Map<string, string>();

  beforeEach(() => {
    storage.clear();
    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: {
        localStorage: {
          getItem: (key: string) => storage.get(key) ?? null,
          setItem: (key: string, value: string) => {
            storage.set(key, value);
          },
          removeItem: (key: string) => {
            storage.delete(key);
          },
          clear: () => {
            storage.clear();
          },
        },
      },
    });
  });

  afterEach(() => {
    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: undefined,
    });
  });

  it('returns the default preferences when no stored value exists', () => {
    expect(readSettingsPreferences()).toEqual(DEFAULT_SETTINGS_PREFERENCES);
  });

  it('persists and restores playback preferences through local storage', () => {
    const preferences = {
      theme: 'Dark' as const,
      autoplay: false,
      defaultVolume: 0.25 as const,
      resumePlayback: false,
    };

    writeSettingsPreferences(preferences);

    expect(readSettingsPreferences()).toEqual(preferences);
  });
});
