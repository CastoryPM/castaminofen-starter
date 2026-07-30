import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';
import { CommunityHome } from './CommunityHome';

function mount(ui: React.ReactElement) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(ui);
  });

  return { container, root };
}

describe('community experience', () => {
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

  it('renders the premium community landing experience', () => {
    const rendered = mount(<CommunityHome />);
    container = rendered.container;
    root = rendered.root;

    expect(rendered.container.textContent).toContain('اجتماع');
    expect(rendered.container.textContent).toContain('برای شما');
    expect(rendered.container.textContent).toContain('موضوعات پرطرفدار');
  });

  it('switches feed mode and updates the visible discussions', () => {
    const rendered = mount(<CommunityHome />);
    container = rendered.container;
    root = rendered.root;

    const trendingButton = Array.from(rendered.container.querySelectorAll('button')).find((button) => button.textContent?.includes('داغ'));

    act(() => {
      trendingButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(rendered.container.textContent).toContain('بحث داغ');
    expect(rendered.container.textContent).toContain('در حال رشد');
  });
});
