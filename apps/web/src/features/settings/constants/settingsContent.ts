export type SettingsSectionContent = {
  id: string;
  title: string;
  description: string;
  icon: 'monitor' | 'volume2' | 'bell' | 'sparkles';
  items: Array<{
    label: string;
    value: string;
    status?: string;
  }>;
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
      },
      {
        label: 'Language',
        value: 'English / فارسی',
        status: 'Coming Soon',
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
      },
      {
        label: 'Playback Speed',
        value: '1.0x',
        status: 'Coming Soon',
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
