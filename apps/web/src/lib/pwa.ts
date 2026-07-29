export function isStandaloneMode(windowObject: Window = window): boolean {
  const standalone = windowObject.matchMedia?.('(display-mode: standalone)')?.matches;
  const navigatorWithStandalone = windowObject.navigator as Navigator & { standalone?: boolean };
  return Boolean(navigatorWithStandalone.standalone || standalone);
}

export function canRegisterServiceWorker(windowObject: Window = window): boolean {
  return Boolean(windowObject.navigator?.serviceWorker && typeof windowObject.navigator.serviceWorker.register === 'function');
}

export function getInstallPromptMessage(): string {
  return 'برای نصب برنامه روی دستگاه خود، از منوی مرورگر استفاده کنید.';
}
