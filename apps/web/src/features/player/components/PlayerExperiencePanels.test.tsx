import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { BookmarkPanel } from './BookmarkPanel';
import { TimelineMarkers } from './TimelineMarkers';

function mount(ui: React.ReactElement) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(ui);
  });

  return { container, root };
}

describe('player experience panels', () => {
  let root: Root | null = null;
  let container: HTMLDivElement | null = null;

  afterEach(() => {
    if (root) {
      act(() => {
        root.unmount();
      });
    }
    container?.remove();
    root = null;
    container = null;
  });

  it('renders timeline markers and highlights the selected marker', () => {
    const { container: renderedContainer } = mount(<TimelineMarkers markers={[{ id: 'intro', label: 'معرفی', timestamp: 0, type: 'chapter', colorToken: 'accent' }, { id: 'idea', label: 'ایده اصلی', timestamp: 320, type: 'discussion', colorToken: 'sky' }]} selectedMarkerId="idea" />);

    expect(renderedContainer.textContent).toContain('معرفی');
    expect(renderedContainer.textContent).toContain('ایده اصلی');
    expect(renderedContainer.querySelector('[data-selected="true"]')).not.toBeNull();
  });

  it('adds a bookmark and surfaces the note in the panel', () => {
    const { container: renderedContainer } = mount(<BookmarkPanel />);

    const input = renderedContainer.querySelector('input[aria-label="یادداشت نشانک"]') as HTMLInputElement;
    const button = renderedContainer.querySelector('button[aria-label="ذخیره نشانک"]') as HTMLButtonElement;

    act(() => {
      input.value = 'نکته‌ی مهم برای بازگشت';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(renderedContainer.textContent).toContain('نکته‌ی مهم برای بازگشت');
  });
});
