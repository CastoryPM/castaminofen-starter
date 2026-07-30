import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';
import { CreatorContentManager } from './CreatorContentManager';
import { ContentStatusFilter } from './ContentStatusFilter';
import { DraftWorkspace } from './DraftWorkspace';
import { PublishingWorkflow } from './PublishingWorkflow';
import { ScheduledContentPanel } from './ScheduledContentPanel';
import { ContentVersionHistory } from './ContentVersionHistory';

function mount(ui: React.ReactElement) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(ui);
  });

  return { container, root };
}

describe('creator content lifecycle experience', () => {
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

  it('renders the creator dashboard summary and content library', () => {
    const rendered = mount(<CreatorContentManager />);
    container = rendered.container;
    root = rendered.root;

    expect(rendered.container.textContent).toContain('داشبورد مدیریت محتوا');
    expect(rendered.container.textContent).toContain('کل محتوا');
    expect(rendered.container.textContent).toContain('اپیزود ۱۲');
  });

  it('supports switching content tabs and showing filtered results', () => {
    const rendered = mount(<ContentStatusFilter initialTab="drafts" />);
    container = rendered.container;
    root = rendered.root;

    expect(rendered.container.textContent).toContain('پیش‌نویس');
    expect(rendered.container.textContent).toContain('در حال آماده‌سازی');
  });

  it('shows draft management guidance and warnings', () => {
    const rendered = mount(<DraftWorkspace />);
    container = rendered.container;
    root = rendered.root;

    expect(rendered.container.textContent).toContain('ادامه ویرایش');
    expect(rendered.container.textContent).toContain('اپیزود نیاز به پوستر دارد');
  });

  it('renders publishing workflow steps and preview messaging', () => {
    const rendered = mount(<PublishingWorkflow />);
    container = rendered.container;
    root = rendered.root;

    expect(rendered.container.textContent).toContain('مرحله ۱');
    expect(rendered.container.textContent).toContain('پیش‌نمایش نهایی');
  });

  it('displays scheduled publishing queue actions', () => {
    const rendered = mount(<ScheduledContentPanel />);
    container = rendered.container;
    root = rendered.root;

    expect(rendered.container.textContent).toContain('صف انتشار آینده');
    expect(rendered.container.textContent).toContain('لغو زمان‌بندی');
  });

  it('shows content version history entries', () => {
    const rendered = mount(<ContentVersionHistory />);
    container = rendered.container;
    root = rendered.root;

    expect(rendered.container.textContent).toContain('تاریخچه نسخه‌ها');
    expect(rendered.container.textContent).toContain('بهبود کیفیت صدا');
  });
});
