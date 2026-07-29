export function getHomePageMode({
  isAuthenticated,
  isHydrated,
  hasSessionData,
}: {
  isAuthenticated: boolean;
  isHydrated: boolean;
  hasSessionData: boolean;
}) {
  if (!isHydrated) {
    return 'loading';
  }

  if (isAuthenticated && hasSessionData) {
    return 'authenticated-home';
  }

  return 'welcome';
}
