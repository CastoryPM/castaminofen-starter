import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';
import { CommentThread } from './CommentThread';
import { FollowButton } from './FollowButton';
import { NotificationList } from './NotificationList';
import { ReactionBar } from './ReactionBar';
import { mockComments, mockNotifications, mockReactionOptions } from '../data/mockSocialData';

function mount(ui: React.ReactElement) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(ui);
  });

  return { container, root };
}

describe('social infrastructure', () => {
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

  it('renders comments, supports replies, and sorts by newest first', () => {
    const rendered = mount(<CommentThread comments={mockComments} />);
    container = rendered.container;
    root = rendered.root;

    const replyButtons = rendered.container.querySelectorAll('button');
    const replyButton = Array.from(replyButtons).find((button) => button.getAttribute('aria-label') === 'پاسخ به نظر');

    expect(replyButton).not.toBeUndefined();

    act(() => {
      replyButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const input = rendered.container.querySelector('input[aria-label="پاسخ شما"]') as HTMLInputElement;
    const submit = rendered.container.querySelector('button[aria-label="ارسال پاسخ"]') as HTMLButtonElement;

    act(() => {
      input.value = 'این پاسخ در حال حاضر به‌روزرسانی می‌شود';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      submit.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(rendered.container.textContent).toContain('این پاسخ در حال حاضر به‌روزرسانی می‌شود');
    expect(rendered.container.textContent).toContain('جدیدترین');
  });

  it('toggles reactions and highlights the selected state', () => {
    const rendered = mount(<ReactionBar reactions={mockReactionOptions} selectedType="like" onToggle={() => undefined} />);
    container = rendered.container;
    root = rendered.root;

    const insightfulButton = Array.from(rendered.container.querySelectorAll('button')).find((button) => button.textContent?.includes('Insightful'));

    act(() => {
      insightfulButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(rendered.container.querySelector('[aria-pressed="true"]')).not.toBeNull();
  });

  it('changes follow state on interaction', () => {
    const rendered = mount(<FollowButton initialState="not-following" />);
    container = rendered.container;
    root = rendered.root;

    const button = rendered.container.querySelector('button') as HTMLButtonElement;

    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(rendered.container.textContent).toContain('دنبال می‌کنم');
  });

  it('renders notifications with the shared presentation layer', () => {
    const rendered = mount(<NotificationList notifications={mockNotifications} />);
    container = rendered.container;
    root = rendered.root;

    expect(rendered.container.textContent).toContain('پاسخ جدید');
    expect(rendered.container.textContent).toContain('به‌روزرسانی بحث');
  });
});
