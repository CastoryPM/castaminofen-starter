import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';
import { MemoryPanel } from './MemoryPanel';
import { QueuePanel } from './QueuePanel';
import type { PlayableItem } from '../types';

function mount(ui: React.ReactElement) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(ui);
  });

  return { container, root };
}

const currentItem: PlayableItem = {
  id: 'ep-1',
  title: 'تجربه‌ی پخش تعاملی',
  subtitle: 'اپیزود آموزشی',
  sourceType: 'episode',
};

const queue: PlayableItem[] = [currentItem, { id: 'ep-2', title: 'جلسه‌ی بعدی', subtitle: 'پیشنهاد مرتبط', sourceType: 'episode' }];

describe('player data integration', () => {
  let root: Root | null = null;
  let container: HTMLDivElement | null = null;

  afterEach(() => {
    if (root) {
      const currentRoot = root;
      act(() => {
        currentRoot.unmount();
      });
    }
    container?.remove();
    root = null;
    container = null;
  });

  it('renders memory cards based on the shared player experience data', () => {
    const rendered = mount(<MemoryPanel />);
    root = rendered.root;
    container = rendered.container;

    expect(container.textContent).toContain('نشانک‌ها');
    expect(container.textContent).toContain('هایلایت‌ها');
    expect(container.textContent).toContain('یادداشت‌ها');
  });

  it('shows queue actions for play-next and play-later controls', () => {
    const rendered = mount(<QueuePanel queue={queue} currentItem={currentItem} currentIndex={0} onPlay={() => {}} onRemove={() => {}} />);
    root = rendered.root;
    container = rendered.container;

    expect(container.textContent).toContain('پخش بعدی');
    expect(container.textContent).toContain('بعداً');
  });
});
