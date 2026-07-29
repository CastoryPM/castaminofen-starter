import { describe, expect, it } from 'vitest';
import { getHomePageMode } from './home-page-mode';

describe('getHomePageMode', () => {
  it('returns loading while auth state is still hydrating', () => {
    expect(getHomePageMode({ isAuthenticated: false, isHydrated: false, hasSessionData: false })).toBe('loading');
  });

  it('routes authenticated users to the authenticated experience', () => {
    expect(getHomePageMode({ isAuthenticated: true, isHydrated: true, hasSessionData: true })).toBe('authenticated-home');
  });

  it('keeps unauthenticated users on the welcome experience', () => {
    expect(getHomePageMode({ isAuthenticated: false, isHydrated: true, hasSessionData: false })).toBe('welcome');
  });
});
