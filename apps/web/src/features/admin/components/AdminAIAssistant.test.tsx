import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

const { AdminAIAssistant } = await import('./AdminAIAssistant');

describe('AdminAIAssistant', () => {
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

  it('renders the AI executive overview, risk detection, recommendations and conversation interface', () => {
    act(() => {
      root.render(<AdminAIAssistant />);
    });

    expect(container.textContent).toContain('Today on Castaminofen');
    expect(container.textContent).toContain('Platform health intelligence');
    expect(container.textContent).toContain('Risk detection');
    expect(container.textContent).toContain('Growth opportunities');
    expect(container.textContent).toContain('How is the platform doing?');
    expect(container.textContent).toContain('Priority');
  });

  it('renders empty and loading states for the assistant when live content is unavailable', () => {
    act(() => {
      root.render(<AdminAIAssistant />);
    });

    expect(container.textContent).toContain('No AI insight stream is available right now');
    expect(container.textContent).toContain('Loading intelligence overview');
  });
});
