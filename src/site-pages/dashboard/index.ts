// Dashboard Foundation Layout & Components
export * from './l@yout/foundation';

// Layout imports
export { default as DashboardLayout } from './l@yout';

// Re-export all foundation components and types
export type {
  FoundationLayoutState,
  FoundationLayoutProps,
  Message,
  User,
  Attachment,
  Reaction,
  ChatInputProps,
  MessageListProps,
  MemberListProps,
  HeaderProps,
  LayoutConfig,
} from './l@yout/foundation';

export type {
  Server,
  Channel,
  Category,
  SidebarState,
  SidebarUser,
  SidebarProps,
} from './l@yout/foundation';
