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
        description: 'Choose the app theme used across the interface.',
        options: ['System', 'Light', 'Dark'],
        disabled: false,
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
        description: 'Continue automatically to the next item when playback ends.',
        options: ['Off', 'On'],
        disabled: false,
      },
      {
        label: 'Default Volume',
        value: '80%',
        description: 'Set the initial player volume for new playback sessions.',
        disabled: false,
      },
      {
        label: 'Resume Playback',
        value: 'On',
        description: 'Restore the last saved playback position after a refresh.',
        options: ['Off', 'On'],
        disabled: false,
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
        label: 'Enable Notifications',
        value: 'Off',
        description: 'Remember whether notifications are enabled for this device.',
        options: ['Off', 'On'],
        disabled: false,
      },
      {
        label: 'New Episode Notifications',
        value: 'Off',
        description: 'Store a preference for future episode alerts.',
        options: ['Off', 'On'],
        disabled: false,
      },
      {
        label: 'Product Updates',
        value: 'Off',
        description: 'Store a preference for product and feature updates.',
        options: ['Off', 'On'],
        disabled: false,
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
