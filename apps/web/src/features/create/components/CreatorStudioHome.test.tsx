import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';
import { CreatorStudioHome } from './CreatorStudioHome';
import { ContentTypeSelector } from './ContentTypeSelector';
import { DraftManager } from './DraftManager';
import { ContentMetadataEditor } from './ContentMetadataEditor';

function mount(ui: React.ReactElement) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(ui);
  });

  return { container, root };
}

describe('creator studio experience', () => {
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

  it('renders the premium creator studio dashboard', () => {
    const rendered = mount(<CreatorStudioHome />);
    container = rendered.container;
    root = rendered.root;

    expect(rendered.container.textContent).toContain('استودیو سازنده');
    expect(rendered.container.textContent).toContain('ایجاد محتوا');
    expect(rendered.container.textContent).toContain('پیش‌نمایش مخاطب');
  });

  it('supports selecting a content type and showing its description', () => {
    const rendered = mount(<ContentTypeSelector initialType="podcast" />);
    container = rendered.container;
    root = rendered.root;

    const podcastButton = Array.from(rendered.container.querySelectorAll('button')).find((button) => button.textContent?.includes('پادکست'));

    expect(podcastButton).toBeTruthy();
    expect(rendered.container.textContent).toContain('اشتراک‌گذاری گفت‌وگو، روایت و دانش');
  });

  it('shows draft states and their statuses', () => {
    const rendered = mount(<DraftManager drafts={[{ id: '1', title: 'فصل جدید', status: 'Draft', updatedAt: '۲ ساعت پیش', type: 'پادکست' }, { id: '2', title: 'اپیزود هفت', status: 'Published', updatedAt: 'دیروز', type: 'اپیزود' }]} />);
    container = rendered.container;
    root = rendered.root;

    expect(rendered.container.textContent).toContain('فصل جدید');
    expect(rendered.container.textContent).toContain('Published');
  });

  it('renders metadata editor fields for publishing', () => {
    const rendered = mount(<ContentMetadataEditor />);
    container = rendered.container;
    root = rendered.root;

    expect(rendered.container.textContent).toContain('عنوان');
    expect(rendered.container.textContent).toContain('توضیحات');
    expect(rendered.container.textContent).toContain('برچسب‌ها');
  });
});
