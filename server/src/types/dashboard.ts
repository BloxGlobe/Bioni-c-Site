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

export interface DashboardState {
  servers: Server[];
  selectedServerId: string | null;
  categories: Category[];
  isCollapsed: boolean;
}
