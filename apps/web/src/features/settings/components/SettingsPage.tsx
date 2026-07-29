'use client';

import Link from 'next/link';
import { ArrowLeft, Bell, Monitor, Settings as SettingsIcon, Sparkles, Volume2 } from 'lucide-react';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getPublicEnv } from '@/shared/lib/env';
import packageJson from '../../../../../../package.json';
import { settingsSections, type SettingsItemContent } from '../constants/settingsContent';
import { useSettingsPreferences } from '../hooks/useSettingsPreferences';
import type { SettingsThemePreference } from '../model/preferences';

const iconMap = {
  monitor: Monitor,
  volume2: Volume2,
  bell: Bell,
  sparkles: Sparkles,
};

export function SettingsPage() {
  const { preferences, updateTheme } = useSettingsPreferences();
  const appEnvironment = getPublicEnv().NEXT_PUBLIC_APP_ENV;
  const appEnvironmentLabel =
    appEnvironment === 'production'
      ? 'Production'
      : appEnvironment === 'test'
        ? 'Test'
        : 'Development';

  const aboutItems = useMemo<SettingsItemContent[]>(
    () => [
      { label: 'Application Name', value: 'Castaminofen' },
      { label: 'Current Version', value: packageJson.version },
      { label: 'Environment', value: appEnvironmentLabel },
      { label: 'Project Links', value: 'No public links exposed in this MVP' },
    ],
    [appEnvironmentLabel],
  );

  return (
    <main className="page-container">
      <section className="space-y-6">
        <div className="rounded-2xl border border-border/80 bg-surface-secondary/70 p-4 shadow-soft sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5 text-accent" aria-hidden="true" />
                <h1 className="text-heading">تنظیمات</h1>
              </div>
              <p className="text-body m-0">
                مدیریت ترجیحات برنامه در MVP با تمرکز بر تنظیمات ساده و قابل‌فهم.
              </p>
            </div>
            <Link href="/profile" className="button button-secondary inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              بازگشت به پروفایل
            </Link>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {settingsSections.map((section) => {
            const Icon = iconMap[section.icon];
            const displayItems: SettingsItemContent[] = section.id === 'about' ? aboutItems : section.items;

            return (
              <Card key={section.id} className="space-y-4 p-4 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl border border-border/80 bg-surface-secondary/70 p-2">
                    <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-heading text-lg">{section.title}</h2>
                    <p className="text-body m-0 text-sm">{section.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {displayItems.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-border bg-surface-secondary/70 p-3"
                      aria-disabled={item.disabled || undefined}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="text-caption">{item.label}</p>
                          <p className="text-body m-0 font-medium">
                            {section.id === 'about' ? item.value : item.label === 'Theme' ? preferences.theme : item.value}
                          </p>
                          {item.description ? (
                            <p className="mt-1 text-sm text-text-secondary">{item.description}</p>
                          ) : null}
                        </div>
                        {item.status ? (
                          <span className="rounded-full border border-border bg-surface-primary px-2.5 py-1 text-[11px] text-text-secondary">
                            {item.status}
                          </span>
                        ) : null}
                      </div>
                      {item.options?.length ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {item.options.map((option: string) => {
                            const isActive = item.label === 'Theme' && preferences.theme === option;

                            return (
                              <Button
                                key={option}
                                type="button"
                                size="sm"
                                variant={isActive ? 'primary' : 'secondary'}
                                disabled={item.disabled}
                                onClick={() => {
                                  if (item.label === 'Theme') {
                                    updateTheme(option as SettingsThemePreference);
                                  }
                                }}
                                className="min-w-[84px] justify-center"
                              >
                                {option}
                              </Button>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default SettingsPage;
