'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingState } from '@/components/ui/loading-state';
import { useSession } from '@/lib/auth';
import { useAuthStore } from '@/stores/authStore';
import { DiscoveryPage } from '@/features/discovery/components/DiscoveryPage';
import { getHomePageMode } from './home-page-mode';

export default function HomePage() {
  const router = useRouter();
  const { data, isLoading } = useSession();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  const mode = getHomePageMode({
    isAuthenticated,
    isHydrated,
    hasSessionData: Boolean(data),
  });

  useEffect(() => {
    if (mode === 'authenticated-home') {
      router.replace('/library');
    }
  }, [mode, router]);

  if (mode === 'loading' || isLoading) {
    return <LoadingState message="Checking session..." />;
  }

  if (mode === 'authenticated-home') {
    return <LoadingState message="Opening your library..." />;
  }

  return <DiscoveryPage />;
}
