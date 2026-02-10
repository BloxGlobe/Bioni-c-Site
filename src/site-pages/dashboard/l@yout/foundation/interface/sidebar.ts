// Sidebar Types & Interfaces
export interface Server {
  id: string;
  name: string;
  icon: string;
  isActive: boolean;
}

export interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice' | 'category';
  isActive: boolean;
  unreadCount?: number;
}

export interface Category {
  id: string;
  name: string;
  channels: Channel[];
  isCollapsed: boolean;
}

export interface SidebarState {
  servers: Server[];
  selectedServerId: string | null;
  categories: Category[];
  isCollapsed: boolean;
  expandedCategories: Set<string>;
}

export interface SidebarUser {
  id: string;
  username: string;
  avatar: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
}

export interface SidebarProps {
  servers: Server[];
  categories: Category[];
  onServerSelect: (serverId: string) => void;
  onChannelSelect: (channelId: string) => void;
  onToggleCategory: (categoryId: string) => void;
  user?: SidebarUser;
  isDarkMode?: boolean;
}
