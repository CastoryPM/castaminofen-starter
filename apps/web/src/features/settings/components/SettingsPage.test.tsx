import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SettingsPage } from './SettingsPage';

describe('SettingsPage', () => {
  it('renders the MVP preference sections with notification preferences', () => {
    const markup = renderToStaticMarkup(createElement(SettingsPage));

    expect(markup).toContain('Settings');
    expect(markup).toContain('Appearance');
    expect(markup).toContain('Theme');
    expect(markup).toContain('System');
    expect(markup).toContain('Light');
    expect(markup).toContain('Dark');
    expect(markup).toContain('Playback');
    expect(markup).toContain('Autoplay');
    expect(markup).toContain('Default Volume');
    expect(markup).toContain('Resume Playback');
    expect(markup).toContain('Notifications');
    expect(markup).toContain('Enable Notifications');
    expect(markup).toContain('New Episode Notifications');
    expect(markup).toContain('Product Updates');
    expect(markup).toContain('About');
    expect(markup).toContain('Castaminofen');
    expect(markup).toContain('Coming Soon');
  });
});
