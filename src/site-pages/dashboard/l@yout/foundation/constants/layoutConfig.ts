import type { LayoutConfig } from '../interface/foundation';

export const DEFAULT_LAYOUT_CONFIG: LayoutConfig = {
  sidebarWidth: 260,
  headerHeight: 60,
  memberListWidth: 240,
  isDarkMode: true,
};

export const LAYOUT_BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
};

export const COLORS = {
  primary: '#5865f2',
  success: '#43b581',
  warning: '#faa61a',
  danger: '#f04747',
  dark: '#2c2f33',
  darker: '#202225',
  light: '#99aab5',
  lighter: '#dbdee1',
};

export const MESSAGE_STATUS = {
  PENDING: 'pending',
  SENT: 'sent',
  FAILED: 'failed',
};
