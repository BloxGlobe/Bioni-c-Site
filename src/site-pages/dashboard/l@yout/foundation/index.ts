// Components
export { default as Sidebar } from './components/Sidebar';
export type { SidebarProps } from './components/Sidebar';

export { default as Header } from './components/Header';
export type { HeaderProps } from './components/Header';

export { default as ChatArea } from './components/ChatArea';
export type { MessageListProps } from './components/ChatArea';

export { default as ChatInput } from './components/ChatInput';
export type { ChatInputProps } from './components/ChatInput';

export { default as MemberList } from './components/MemberList';
export type { MemberListProps } from './components/MemberList';

// Hooks
export { useChat } from './hooks';

// Utils
export * from './utils';

// Constants
export * from './constants';

// Interfaces
export type {
  Message,
  User,
  Attachment,
  Reaction,
  FoundationLayoutState,
  FoundationLayoutProps,
  LayoutConfig,
} from './interface/foundation';

export type {
  Server,
  Channel,
  Category,
  SidebarState,
  SidebarUser,
} from './interface/sidebar';
