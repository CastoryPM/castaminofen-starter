import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  it('renders a loading state with busy semantics', () => {
    const html = renderToStaticMarkup(createElement(Button, { loading: true }, 'ذخیره'));

    expect(html).toContain('aria-busy="true"');
    expect(html).toContain('disabled');
    expect(html).toContain('ذخیره');
  });
});
