import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

const { AdminDashboard } = await import('./AdminDashboard');

describe('AdminDashboard', () => {
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

  it('renders the dashboard shell and supports navigation between sections', () => {
    act(() => {
      root.render(<AdminDashboard />);
    });

    expect(container.textContent).toContain('Platform Control Center');
    expect(container.textContent).toContain('Governance Mission Control');
    expect(container.textContent).toContain('کاربران');

    const userButton = Array.from(container.querySelectorAll('button')).find((button) => button.textContent?.includes('کاربران'));
    expect(userButton).not.toBeNull();

    act(() => {
      userButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container.textContent).toContain('آرمان نوری');
    expect(container.textContent).toContain('دنبال‌کننده');
  });

  it('renders the governance dashboard overview with trust and operations summaries', () => {
    act(() => {
      root.render(<AdminDashboard />);
    });

    const governanceButton = Array.from(container.querySelectorAll('button')).find((button) => button.textContent?.includes('Governance'));
    expect(governanceButton).not.toBeNull();

    act(() => {
      governanceButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container.textContent).toContain('Governance Mission Control');
    expect(container.textContent).toContain('Pending reviews');
    expect(container.textContent).toContain('Operational summary');
  });

  it('renders moderation queue sections for reviews and reports', () => {
    act(() => {
      root.render(<AdminDashboard />);
    });

    const moderationButton = Array.from(container.querySelectorAll('button')).find((button) => button.textContent?.includes('Moderation'));
    expect(moderationButton).not.toBeNull();

    act(() => {
      moderationButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container.textContent).toContain('Moderation queue');
    expect(container.textContent).toContain('Content review');
    expect(container.textContent).toContain('User reports');
  });

  it('renders content review surfaces with action states', () => {
    act(() => {
      root.render(<AdminDashboard />);
    });

    const contentReviewButton = Array.from(container.querySelectorAll('button')).find((button) => button.textContent?.includes('Content Review'));
    expect(contentReviewButton).not.toBeNull();

    act(() => {
      contentReviewButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container.textContent).toContain('Content review system');
    expect(container.textContent).toContain('Approve');
    expect(container.textContent).toContain('Request Review');
  });

  it('renders creator governance and review actions', () => {
    act(() => {
      root.render(<AdminDashboard />);
    });

    const creatorReviewButton = Array.from(container.querySelectorAll('button')).find((button) => button.textContent?.includes('Creator Review'));
    expect(creatorReviewButton).not.toBeNull();

    act(() => {
      creatorReviewButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container.textContent).toContain('Creator governance');
    expect(container.textContent).toContain('Verify');
    expect(container.textContent).toContain('Flag');
  });

  it('renders audit timeline and platform alerts', () => {
    act(() => {
      root.render(<AdminDashboard />);
    });

    const auditButton = Array.from(container.querySelectorAll('button')).find((button) => button.textContent?.includes('Audit'));
    expect(auditButton).not.toBeNull();

    act(() => {
      auditButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container.textContent).toContain('Audit timeline');
    expect(container.textContent).toContain('Platform alerts');
    expect(container.textContent).toContain('High');
  });

  it('shows empty and loading states for operational data', () => {
    act(() => {
      root.render(<AdminDashboard />);
    });

    expect(container.textContent).toContain('No pending reviews');
    expect(container.textContent).toContain('Loading operational data');
  });
});
