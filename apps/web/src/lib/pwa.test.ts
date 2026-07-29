import { describe, expect, it } from 'vitest';
import { canRegisterServiceWorker, isStandaloneMode } from './pwa';

describe('pwa helpers', () => {
  it('detects standalone mode from navigator and media query', () => {
    const windowWithStandalone = {
      matchMedia: () => ({ matches: false }),
      navigator: { standalone: true },
    } as unknown as Window;

    const windowWithoutStandalone = {
      matchMedia: () => ({ matches: false }),
      navigator: {},
    } as unknown as Window;

    expect(isStandaloneMode(windowWithStandalone)).toBe(true);
    expect(isStandaloneMode(windowWithoutStandalone)).toBe(false);
  });

  it('detects service worker support when the browser exposes it', () => {
    const windowWithServiceWorker = {
      navigator: { serviceWorker: { register: () => Promise.resolve({} as ServiceWorkerRegistration) } },
    } as unknown as Window;

    const windowWithoutServiceWorker = {
      navigator: {},
    } as unknown as Window;

    expect(canRegisterServiceWorker(windowWithServiceWorker)).toBe(true);
    expect(canRegisterServiceWorker(windowWithoutServiceWorker)).toBe(false);
  });
});
