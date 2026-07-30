import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';
import { CreatorProfilePage } from './CreatorProfilePage';

function mount(ui: React.ReactElement) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(ui);
  });

  return { container, root };
}

describe('creator profile experience', () => {
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

  it('renders creator identity, content, collections, community, and activity sections', () => {
    const rendered = mount(<CreatorProfilePage mode="viewer" />);
    container = rendered.container;
    root = rendered.root;

    expect(rendered.container.textContent).toContain('آرمان نژاد');
    expect(rendered.container.textContent).toContain('آینده‌ی AI در پادکست‌های روزانه');
    expect(rendered.container.textContent).toContain('AI Learning Path');
    expect(rendered.container.textContent).toContain('پادکست و روایت');
    expect(rendered.container.textContent).toContain('منتشر شد');
  });

  it('supports owner and viewer modes with different actions', () => {
    const rendered = mount(<CreatorProfilePage mode="owner" />);
    expect(rendered.container.textContent).toContain('ویرایش پروفایل');
    expect(rendered.container.textContent).toContain('باز کردن استودیو');
  });
});
