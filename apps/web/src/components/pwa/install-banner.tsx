'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { canRegisterServiceWorker, getInstallPromptMessage, isStandaloneMode } from '@/lib/pwa';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || isStandaloneMode()) {
      return;
    }

    if (canRegisterServiceWorker()) {
      void window.navigator.serviceWorker.register('/sw.js').catch(() => undefined);
    }

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    const onAppInstalled = () => {
      setDeferredPrompt(null);
      setIsVisible(false);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  if (!isVisible || !deferredPrompt || isStandaloneMode()) {
    return null;
  }

  return (
    <div className="mb-3 rounded-[var(--radius-20)] border border-border bg-surface-card p-3 shadow-sm sm:mb-4">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-text-primary">نصب Castaminofen</p>
          <p className="text-sm text-text-secondary">{getInstallPromptMessage()}</p>
        </div>
        <button
          type="button"
          onClick={handleInstallClick}
          className="inline-flex items-center gap-2 rounded-[var(--radius-16)] border border-border bg-surface-secondary px-3 py-2 text-sm font-medium text-text-primary"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          نصب
        </button>
      </div>
    </div>
  );
}
