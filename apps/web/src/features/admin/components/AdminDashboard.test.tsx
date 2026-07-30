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
    expect(container.textContent).toContain('داشبورد');
    expect(container.textContent).toContain('کاربران');

    const userButton = Array.from(container.querySelectorAll('button')).find((button) => button.textContent?.includes('کاربران'));
    expect(userButton).not.toBeNull();

    act(() => {
      userButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container.textContent).toContain('آرمان نوری');
    expect(container.textContent).toContain('دنبال‌کننده');
  });

  it('shows empty and loading states for overview content', () => {
    act(() => {
      root.render(<AdminDashboard />);
    });

    expect(container.textContent).toContain('No creators yet');
    expect(container.textContent).toContain('Loading platform data');
  });
});
