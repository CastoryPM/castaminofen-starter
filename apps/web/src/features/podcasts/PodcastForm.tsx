import { Form, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { MediaCard } from '@/components/design-system/media/media-card';
import { SectionHeader } from '@/components/design-system/layout/section-header';
import type { ReactNode, FormHTMLAttributes } from 'react';

export type PodcastFormProps = {
  title: string;
  submitLabel: string;
  error?: string | null;
  isLoading?: boolean;
  children: ReactNode;
} & FormHTMLAttributes<HTMLFormElement>;

export function PodcastForm({ title, submitLabel, error, isLoading, children, className, ...props }: PodcastFormProps) {
  return (
    <MediaCard title={<SectionHeader eyebrow="Create" title={title} description="Fill the metadata with the shared Castaminofen form surface." />} className={['space-y-4', className].filter(Boolean).join(' ')}>
      <Form {...props} className="form-root">
        {children}
        {error && <FormMessage>{error}</FormMessage>}
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? 'Saving...' : submitLabel}
        </Button>
      </Form>
    </MediaCard>
  );
}
