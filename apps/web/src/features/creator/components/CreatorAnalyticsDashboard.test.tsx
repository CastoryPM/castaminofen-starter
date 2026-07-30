import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';
import { CreatorAnalyticsDashboard } from './CreatorAnalyticsDashboard';
import { mockCreatorAnalyticsData } from '../data/mockCreatorAnalyticsData';

function mount(ui: React.ReactElement) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(ui);
  });

  return { container, root };
}

describe('creator analytics dashboard', () => {
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

  it('renders headline metrics and content performance sections', () => {
    const rendered = mount(<CreatorAnalyticsDashboard data={mockCreatorAnalyticsData} />);
    container = rendered.container;
    root = rendered.root;

    expect(rendered.container.textContent).toContain('بازخورد رشد');
    expect(rendered.container.textContent).toContain('۲۵K');
    expect(rendered.container.textContent).toContain('پادکست اصلی');
    expect(rendered.container.textContent).toContain('هوش مصنوعی');
  });

  it('shows empty-state guidance for new creators', () => {
    const rendered = mount(<CreatorAnalyticsDashboard data={null} />);
    container = rendered.container;
    root = rendered.root;

    expect(rendered.container.textContent).toContain('هنوز داده‌ای برای تحلیل وجود ندارد');
    expect(rendered.container.textContent).toContain('برای دیدن بازخورد رشد');
  });
});
