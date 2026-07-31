'use client';

import { LayoutGrid, ShieldCheck, SlidersHorizontal, Sparkles, Users2 } from 'lucide-react';
import { Avatar } from '@/components/design-system/identity/avatar';
import { PageContainer } from '@/components/design-system/layout/page-container';
import { SectionHeader } from '@/components/design-system/layout/section-header';
import { MediaCard } from '@/components/design-system/media/media-card';
import { Button } from '@/components/ui/button';
import { PageState } from '@/components/ui/page-state';
import { Tag } from '@/components/design-system/common/tag';
import { Badge } from '@/components/ui/badge';
import {
  adminCategoryItems,
  adminCommunityConfiguration,
  adminConfigurationStatus,
  adminContentConfiguration,
  adminCreatorConfiguration,
  adminFeatureVisibility,
  adminNavigationProfiles,
  adminNotificationSettings,
  adminPlayerConfiguration,
  adminSystemPreferences,
  adminThemePreview,
} from '../data/mockAdminConfigurationData';

const quickControlItems = [
  { label: 'Content settings', icon: LayoutGrid },
  { label: 'Community settings', icon: Users2 },
  { label: 'Creator settings', icon: Sparkles },
  { label: 'Player settings', icon: SlidersHorizontal },
  { label: 'User settings', icon: ShieldCheck },
];

function FeatureManagementPanel() {
  return (
    <MediaCard title="Feature Management Center" subtitle="Feature visibility manager" meta="UI only" className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        {adminFeatureVisibility.map((feature) => (
          <div key={feature.id} className="rounded-[1.1rem] border border-border/70 bg-surface-secondary/70 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold text-text-primary">{feature.name}</p>
              <Badge variant={feature.enabled ? 'success' : 'warning'}>{feature.enabled ? 'Enabled' : 'Disabled'}</Badge>
            </div>
            <p className="mt-2 text-sm text-text-secondary">{feature.description}</p>
            <p className="mt-2 text-xs text-text-secondary">Impact preview: {feature.impact}</p>
          </div>
        ))}
      </div>
    </MediaCard>
  );
}

function ContentConfigurationPanel() {
  return (
    <MediaCard title="Content Configuration" subtitle="Platform content rule previews" meta="Preview" className="space-y-4">
      <div className="grid gap-3 lg:grid-cols-2">
        {adminContentConfiguration.map((content) => (
          <div key={content.type} className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold text-text-primary">{content.type}</p>
              <Tag>{content.visibilityDefault}</Tag>
            </div>
            <p className="mt-2 text-sm text-text-secondary">Allowed categories: {content.allowedCategories.join(', ')}</p>
            <p className="mt-2 text-sm text-text-secondary">Publishing rules preview: {content.publishingRules}</p>
            <p className="mt-2 text-xs text-text-secondary">Discovery preferences: {content.discoveryPreference}</p>
          </div>
        ))}
      </div>
    </MediaCard>
  );
}

function NavigationManager() {
  return (
    <MediaCard title="Navigation Configuration" subtitle="Navigation customization and preview" meta="Preview" className="space-y-4">
      <div className="grid gap-3 lg:grid-cols-2">
        {adminNavigationProfiles.map((profile) => (
          <div key={profile.id} className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
            <p className="font-semibold text-text-primary">{profile.name}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.lanes.map((lane) => (
                <Tag key={lane}>{lane}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-[1rem] border border-dashed border-accent/40 bg-accent/5 p-3 text-sm text-text-secondary">
        Preview: mobile and desktop navigation show the same control-center ordering and visibility logic without changing live route behavior.
      </div>
    </MediaCard>
  );
}

function CategoryManager() {
  return (
    <MediaCard title="Category & Topic Management" subtitle="Taxonomy controls" meta="UI preview" className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {adminCategoryItems.map((item) => (
          <Tag key={item.id}>{item.name}</Tag>
        ))}
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="primary">Create</Button>
        <Button size="sm" variant="secondary">Edit</Button>
        <Button size="sm" variant="ghost">Archive</Button>
      </div>
    </MediaCard>
  );
}

function CreatorConfigurationPanel() {
  return (
    <MediaCard title="Creator Platform Settings" subtitle="Creator ecosystem configuration" meta="Preview" className="space-y-3">
      <p className="text-sm text-text-secondary">Publishing access: {adminCreatorConfiguration.publishingAccess}</p>
      <p className="text-sm text-text-secondary">Verification visibility: {adminCreatorConfiguration.verificationVisibility}</p>
      <p className="text-sm text-text-secondary">Monetization options preview: {adminCreatorConfiguration.monetizationPreview}</p>
      <p className="text-sm text-text-secondary">Onboarding settings: {adminCreatorConfiguration.onboarding}</p>
    </MediaCard>
  );
}

function CommunityConfigurationPanel() {
  return (
    <MediaCard title="Community Configuration" subtitle="Discussion and social controls" meta="Preview" className="space-y-3">
      <p className="text-sm text-text-secondary">Commenting availability: {adminCommunityConfiguration.commentingAvailability}</p>
      <p className="text-sm text-text-secondary">Reaction types: {adminCommunityConfiguration.reactionTypes.join(', ')}</p>
      <p className="text-sm text-text-secondary">Community visibility: {adminCommunityConfiguration.visibility}</p>
      <p className="text-sm text-text-secondary">Featured discussions: {adminCommunityConfiguration.featuredDiscussions.join(', ')}</p>
    </MediaCard>
  );
}

function PlayerConfigurationPanel() {
  return (
    <MediaCard title="Player Configuration" subtitle="Playback and immersive context" meta="Preview" className="space-y-3">
      <p className="text-sm text-text-secondary">Default playback speed: {adminPlayerConfiguration.defaultPlaybackSpeed}</p>
      <p className="text-sm text-text-secondary">Autoplay behavior: {adminPlayerConfiguration.autoplay}</p>
      <p className="text-sm text-text-secondary">Queue behavior preview: {adminPlayerConfiguration.queueBehavior}</p>
      <p className="text-sm text-text-secondary">Immersive player availability: {adminPlayerConfiguration.immersivePlayer}</p>
      <p className="text-sm text-text-secondary">Transcript feature availability: {adminPlayerConfiguration.transcriptAvailability}</p>
    </MediaCard>
  );
}

function NotificationSettingsPanel() {
  return (
    <MediaCard title="Notification Configuration" subtitle="Notification category control previews" meta="Preview" className="space-y-4">
      <div className="grid gap-3 md:grid-cols-3">
        {adminNotificationSettings.map((setting) => (
          <div key={setting.category} className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
            <p className="font-semibold text-text-primary">{setting.category}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {setting.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MediaCard>
  );
}

function ThemeBrandSettings() {
  return (
    <MediaCard title="Brand & Theme Configuration" subtitle="Preview-only identity definition" meta="Preview" className="space-y-3">
      <div className="flex items-center gap-3">
        <Avatar alt={adminThemePreview.logo} fallback="C" size="md" />
        <div>
          <p className="font-semibold text-text-primary">{adminThemePreview.logo}</p>
          <p className="text-sm text-text-secondary">Typography: {adminThemePreview.typography}</p>
        </div>
      </div>
      <p className="text-sm text-text-secondary">Surfaces: {adminThemePreview.surfaces}</p>
      <p className="text-sm text-text-secondary">Accent identity: {adminThemePreview.accentIdentity}</p>
    </MediaCard>
  );
}

function SystemPreferencesPanel() {
  return (
    <MediaCard title="System Preferences" subtitle="Global preference preview" meta="Preview" className="space-y-3">
      <p className="text-sm text-text-secondary">Language settings: {adminSystemPreferences.language}</p>
      <p className="text-sm text-text-secondary">Region settings: {adminSystemPreferences.region}</p>
      <p className="text-sm text-text-secondary">Maintenance mode preview: {adminSystemPreferences.maintenanceModePreview}</p>
      <p className="text-sm text-text-secondary">System messages: {adminSystemPreferences.systemMessage}</p>
    </MediaCard>
  );
}

export function AdminConfigurationCenter() {
  return (
    <PageContainer className="space-y-6">
      <SectionHeader
        title="Platform Configuration Workspace"
        description="Command-center mock configuration surface for platform control and product settings"
        actions={<Tag className="border-accent/20 bg-accent/10 text-accent">Mock-backed controls</Tag>}
      />

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <MediaCard title="Platform Status" subtitle="Current environment and control posture" meta="Operational" className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
              <p className="text-xs text-text-secondary">Current environment</p>
              <p className="mt-1 font-semibold text-text-primary">{adminConfigurationStatus.environment}</p>
            </div>
            <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
              <p className="text-xs text-text-secondary">Enabled features</p>
              <p className="mt-1 font-semibold text-text-primary">{adminConfigurationStatus.enabledFeatures}</p>
            </div>
            <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
              <p className="text-xs text-text-secondary">Active configurations</p>
              <p className="mt-1 font-semibold text-text-primary">{adminConfigurationStatus.activeConfigurations}</p>
            </div>
            <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
              <p className="text-xs text-text-secondary">System health summary</p>
              <p className="mt-1 font-semibold text-text-primary">{adminConfigurationStatus.healthSummary}</p>
            </div>
          </div>
        </MediaCard>

        <MediaCard title="Quick Controls" subtitle="Configuration entrypoints" meta="Launch" className="space-y-3">
          <div className="grid gap-2 sm:grid-cols-2">
            {quickControlItems.map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-2 rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                <span className="text-sm text-text-primary">{label}</span>
              </div>
            ))}
          </div>
        </MediaCard>
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        <FeatureManagementPanel />
        <ContentConfigurationPanel />
        <NavigationManager />
        <CategoryManager />
        <CreatorConfigurationPanel />
        <CommunityConfigurationPanel />
        <PlayerConfigurationPanel />
        <NotificationSettingsPanel />
        <ThemeBrandSettings />
        <SystemPreferencesPanel />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <MediaCard title="Empty state preview" subtitle="No pending configuration actions" meta="UI" className="space-y-3">
          <PageState variant="empty" title="No pending configuration actions" description="This control center is ready for future rule and settings workflows without altering the runtime surface." />
        </MediaCard>
        <MediaCard title="Loading state preview" subtitle="Loading configuration signals" meta="UI" className="space-y-3">
          <PageState variant="loading" title="Loading configuration signals" description="The structure is ready for typed mock configuration hooks without changing the admin boundary." />
        </MediaCard>
      </div>
    </PageContainer>
  );
}

export default AdminConfigurationCenter;
