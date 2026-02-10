export interface User {
  id: string;
  username: string;
  avatar: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
}

export interface Message {
  id: string;
  channelId: string;
  authorId: string;
  content: string;
  timestamp: Date;
  edited?: Date;
  attachments?: Attachment[];
  reactions?: Reaction[];
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
