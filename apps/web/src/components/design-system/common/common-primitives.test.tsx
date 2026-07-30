import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { Chip } from './chip';
import { IconButton } from './icon-button';
import { Tag } from './tag';

describe('design system common primitives', () => {
  it('renders chip and tag content with the shared surface styling', () => {
    const html = renderToStaticMarkup(
      <div>
        <Chip>Trending</Chip>
        <Tag>New</Tag>
      </div>,
    );

    expect(html).toContain('Trending');
    expect(html).toContain('New');
  });

  it('renders icon buttons with accessible labels', () => {
    const html = renderToStaticMarkup(
      <IconButton label="Open actions" aria-label="Open actions">
        <span aria-hidden="true">+</span>
      </IconButton>,
    );

    expect(html).toContain('aria-label="Open actions"');
  });
});
