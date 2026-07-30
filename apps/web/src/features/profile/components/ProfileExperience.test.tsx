import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';
import { ProfileHero } from './ProfileHero';
import { ProfileKnowledgeSection } from './ProfileKnowledgeSection';
import { mockProfileExperience } from '../data/mockProfileExperience';

function mount(ui: React.ReactElement) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(ui);
  });

  return { container, root };
}

describe('profile experience', () => {
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

  it('renders owner controls and identity metadata', () => {
    const rendered = mount(<ProfileHero profile={mockProfileExperience.profile} mode="owner" />);
    container = rendered.container;
    root = rendered.root;

    expect(rendered.container.textContent).toContain('علی محمدی');
    expect(rendered.container.textContent).toContain('ویرایش پروفایل');
    expect(rendered.container.textContent).toContain('مدیریت تنظیمات');
  });

  it('supports follow interaction in viewer mode', () => {
    const rendered = mount(<ProfileHero profile={mockProfileExperience.profile} mode="viewer" />);
    container = rendered.container;
    root = rendered.root;

    const followButton = Array.from(rendered.container.querySelectorAll('button')).find((button) => button.textContent?.includes('دنبال کردن'));

    act(() => {
      followButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(rendered.container.textContent).toContain('دنبال می‌کنم');
  });

  it('renders knowledge collections and memory cards', () => {
    const rendered = mount(
      <ProfileKnowledgeSection memories={mockProfileExperience.memories} collections={mockProfileExperience.collections} />,
    );
    container = rendered.container;
    root = rendered.root;

    expect(rendered.container.textContent).toContain('لحظه‌های ذخیره‌شده');
    expect(rendered.container.textContent).toContain('کتاب‌هایی که ذهنم را تغییر دادند');
  });
});
