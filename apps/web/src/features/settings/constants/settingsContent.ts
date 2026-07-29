export type SettingsItemContent = {
  label: string;
  value: string;
  status?: string;
  description?: string;
  options?: string[];
  disabled?: boolean;
};

export type SettingsSectionContent = {
  id: string;
  title: string;
  description: string;
  icon: 'monitor' | 'volume2' | 'bell' | 'sparkles';
  items: SettingsItemContent[];
};

export const settingsSections: SettingsSectionContent[] = [
  {
    id: 'appearance',
    title: 'Appearance',
    description: 'Theme preferences and display options.',
    icon: 'monitor',
    items: [
      {
        label: 'Theme',
        value: 'System',
        status: 'Coming Soon',
        description: 'Theme switching remains unavailable in this MVP.',
        options: ['System', 'Light', 'Dark'],
        disabled: true,
      },
      {
        label: 'Language',
        value: 'English / فارسی',
        status: 'Coming Soon',
        description: 'Localization remains unavailable in this MVP.',
        disabled: true,
      },
    ],
  },
  {
    id: 'playback',
    title: 'Playback',
    description: 'Playback defaults and media controls.',
    icon: 'volume2',
    items: [
      {
        label: 'Autoplay',
        value: 'Off',
        status: 'Coming Soon',
        description: 'Playback defaults will be added in a future phase.',
        disabled: true,
      },
      {
        label: 'Playback Speed',
        value: '1.0x',
        status: 'Coming Soon',
        description: 'Speed controls will be added in a future phase.',
        disabled: true,
      },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Notification preferences and reminders.',
    icon: 'bell',
    items: [
      {
        label: 'Notifications',
        value: 'Disabled',
        status: 'Coming Soon',
        description: 'Push notifications and reminder controls are not available in this MVP.',
        disabled: true,
      },
    ],
  },
  {
    id: 'about',
    title: 'About',
    description: 'Application details and project links.',
    icon: 'sparkles',
    items: [
      {
        label: 'Application Name',
        value: 'Castaminofen',
      },
      {
        label: 'Current Version',
        value: '0.1.0',
      },
      {
        label: 'Environment',
        value: 'Development',
      },
      {
        label: 'Project Links',
        value: 'No public links exposed in this MVP',
      },
    ],
  },
];
