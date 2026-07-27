"use client";

import Link from 'next/link';
import Image from 'next/image';

export function WelcomeScreen() {
  return (
    <section className="flex min-h-[70vh] w-full flex-col items-center justify-center px-4 py-8 text-center sm:px-6">
      <div className="flex w-full max-w-sm flex-col items-center gap-8">
        <Image src="/branding/mobile-logo.png" alt="Castaminofen" width={96} height={96} className="h-24 w-auto sm:h-28" />

        <Link href="/login" className="button button-primary w-full max-w-xs justify-center rounded-full px-6 py-4 text-base shadow-lg">
          Get Started
        </Link>

        <Link href="/offline-library" className="text-sm font-medium text-text-secondary transition hover:text-accent">
          Continue Offline
        </Link>
      </div>
    </section>
  );
}

export default WelcomeScreen;
