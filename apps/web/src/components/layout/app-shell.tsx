'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { MobileHeader } from '@/components/layout/mobile-header';
import { BottomNavigation } from '@/components/layout/bottom-navigation';
import { MobileContainer } from '@/components/layout/mobile-container';
import { PlayerBar } from '@/features/player/components/PlayerBar';
import { InstallBanner } from '@/components/pwa/install-banner';

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === '/';
  const isAuthRoute = pathname === '/login' || pathname === '/register';

  if (isAuthRoute) {
    return (
      <div className="app-shell min-h-screen bg-surface-primary text-text-primary">
        <main className="min-h-screen">
          <div className="mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
            <div className="w-full">
              <InstallBanner />
              {children}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell min-h-screen flex flex-col bg-surface-primary text-text-primary">
      {!isLanding && <MobileHeader pathname={pathname} />}
      <main className="flex-1">
        <MobileContainer>
          <div className="app-shell__content px-1 py-3 sm:px-0 sm:py-4">
            <InstallBanner />
            {children}
          </div>
        </MobileContainer>
      </main>
      {!isLanding && (
        <div className="px-3 pb-3 pt-2 sm:px-6 lg:px-8">
          <PlayerBar />
        </div>
      )}
      {!isLanding && <BottomNavigation pathname={pathname} />}
    </div>
  );
}
