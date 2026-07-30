import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { PageContainer } from './page-container';
import { SectionHeader } from './section-header';

describe('design system layout primitives', () => {
  it('renders a shared page container with the expected spacing rhythm', () => {
    const html = renderToStaticMarkup(
      <PageContainer>
        <div>content</div>
      </PageContainer>,
    );

    expect(html).toContain('space-y-4');
    expect(html).toContain('content');
  });

  it('renders a section header with eyebrow, title, and actions', () => {
    const html = renderToStaticMarkup(
      <SectionHeader
        eyebrow="پادکست‌ها"
        title="جستجو"
        description="نتایج مرتبط"
        actions={<button type="button">افزودن</button>}
      />,
    );

    expect(html).toContain('پادکست‌ها');
    expect(html).toContain('جستجو');
    expect(html).toContain('نتایج مرتبط');
    expect(html).toContain('افزودن');
  });
});
