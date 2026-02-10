// Chat & Message Types
export interface Message {
  id: string;
  channelId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  avatar?: string;
  content: string;
  timestamp: string;
  edited?: boolean;
}

export interface Channel {
  id: string;
  name: string;
  description?: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  serverId: string;
  channels?: Channel[];
}

export interface Server {
  id: string;
  name: string;
  icon?: string;
}
