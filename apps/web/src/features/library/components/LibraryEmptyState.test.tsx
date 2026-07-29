import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { LibraryEmptyState } from './LibraryEmptyState';

describe('LibraryEmptyState', () => {
  it('renders contextual guidance when an eyebrow label is provided', () => {
    const html = renderToStaticMarkup(
      <LibraryEmptyState
        title="هنوز چیزی اینجا نیست"
        description="برای شروع، اولین پادکست خود را پیدا کنید."
        eyebrow="یک قدم تا شروع"
      />,
    );

    expect(html).toContain('یک قدم تا شروع');
  });
});
