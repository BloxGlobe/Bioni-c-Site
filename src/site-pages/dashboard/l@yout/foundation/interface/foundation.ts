// Foundation Layout Types & Interfaces
import type { Channel, Server, SidebarUser } from './sidebar';

export interface Message {
  id: string;
  author: User;
  content: string;
  timestamp: Date;
  edited?: Date;
  attachments?: Attachment[];
  reactions?: Reaction[];
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
}

export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface Reaction {
  emoji: string;
  count: number;
  userReacted: boolean;
}

export interface FoundationLayoutState {
  selectedChannel: Channel | null;
  selectedServer: Server | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  members: User[];
  currentUser: SidebarUser;
}

export interface FoundationLayoutProps {
  isDarkMode?: boolean;
  onSendMessage?: (content: string) => void;
  onLoadMore?: () => void;
  onUserProfile?: (userId: string) => void;
}

export interface ChatInputProps {
  placeholder?: string;
  disabled?: boolean;
  onSend: (message: string) => void;
}

export interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
  onLoadMore?: () => void;
}

export interface MemberListProps {
  members: User[];
  onMemberClick?: (userId: string) => void;
}

export interface HeaderProps {
  channelName: string;
  channelDescription?: string;
  memberCount?: number;
}

export type LayoutConfig = {
  sidebarWidth: number;
  headerHeight: number;
  memberListWidth: number;
  isDarkMode: boolean;
};
