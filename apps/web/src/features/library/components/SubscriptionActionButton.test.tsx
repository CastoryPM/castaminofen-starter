import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SubscriptionActionButton } from './SubscriptionActionButton';

describe('SubscriptionActionButton', () => {
  it('renders follow copy for podcasts that are not yet followed', () => {
    const html = renderToStaticMarkup(
      <SubscriptionActionButton isSubscribed={false} onSubscribe={() => {}} onUnsubscribe={() => {}} />,
    );

    expect(html).toContain('دنبال کردن');
    expect(html).toContain('aria-pressed="false"');
  });

  it('renders the following state and loading feedback when pending', () => {
    const html = renderToStaticMarkup(
      <SubscriptionActionButton isSubscribed isLoading onSubscribe={() => {}} onUnsubscribe={() => {}} />,
    );

    expect(html).toContain('در حال دنبال کردن');
    expect(html).toContain('aria-busy="true"');
    expect(html).toContain('aria-pressed="true"');
  });
});
