import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mockPlayerState = {
  currentItem: {
    title: 'The Quiet Hour',
    subtitle: 'A calm conversation about modern listening',
  },
};

vi.mock('@/features/player/hooks/usePlayerState', () => ({
  usePlayerState: () => mockPlayerState,
}));

const { CommunityPage } = await import('./CommunityPage');

describe('CommunityPage', () => {
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

  it('renders the shared community experience with player-aware context', () => {
    act(() => {
      root.render(<CommunityPage />);
    });

    expect(container.textContent).toContain('اجتماع');
    expect(container.textContent).toContain('The Quiet Hour');
    expect(container.textContent).toContain('نظرات');
  });
});
