import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

const { AdminConfigurationCenter } = await import('./AdminConfigurationCenter');

describe('AdminConfigurationCenter', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it('renders the configuration dashboard shell and platform status summaries', () => {
    act(() => {
      root.render(<AdminConfigurationCenter />);
    });

    expect(container.textContent).toContain('Platform Configuration Workspace');
    expect(container.textContent).toContain('Platform Status');
    expect(container.textContent).toContain('Quick Controls');
    expect(container.textContent).toContain('Content settings');
  });

  it('renders feature management states, availability, and impact previews', () => {
    act(() => {
      root.render(<AdminConfigurationCenter />);
    });

    expect(container.textContent).toContain('Feature Management Center');
    expect(container.textContent).toContain('Home');
    expect(container.textContent).toContain('Creator Studio');
    expect(container.textContent).toContain('Impact preview');
  });

  it('renders navigation configuration, content configuration, and category management previews', () => {
    act(() => {
      root.render(<AdminConfigurationCenter />);
    });

    expect(container.textContent).toContain('Navigation Configuration');
    expect(container.textContent).toContain('Content Configuration');
    expect(container.textContent).toContain('Category & Topic Management');
    expect(container.textContent).toContain('Technology');
  });

  it('renders creator, community, player, notification, brand, and system preference sections', () => {
    act(() => {
      root.render(<AdminConfigurationCenter />);
    });

    expect(container.textContent).toContain('Creator Platform Settings');
    expect(container.textContent).toContain('Community Configuration');
    expect(container.textContent).toContain('Player Configuration');
    expect(container.textContent).toContain('Notification Configuration');
    expect(container.textContent).toContain('Brand & Theme Configuration');
    expect(container.textContent).toContain('System Preferences');
  });

  it('shows empty and loading states for configuration surfaces', () => {
    act(() => {
      root.render(<AdminConfigurationCenter />);
    });

    expect(container.textContent).toContain('No pending configuration actions');
    expect(container.textContent).toContain('Loading configuration signals');
  });
});
