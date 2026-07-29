import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SettingsPage } from './SettingsPage';

describe('SettingsPage', () => {
  it('renders the MVP preference sections with placeholders', () => {
    const markup = renderToStaticMarkup(createElement(SettingsPage));

    expect(markup).toContain('تنظیمات');
    expect(markup).toContain('Appearance');
    expect(markup).toContain('Playback');
    expect(markup).toContain('Notifications');
    expect(markup).toContain('About');
    expect(markup).toContain('Coming Soon');
  });
});
