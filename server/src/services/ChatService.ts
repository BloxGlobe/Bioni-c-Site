import type { Message, User } from '../types/chat';

export class ChatService {
  private messages: Message[] = [];
  private users: User[] = [
    {
      id: '1',
      username: 'JohnDoe',
      avatar: 'https://via.placeholder.com/32',
      status: 'online',
    },
    {
      id: '2',
      username: 'JaneSmith',
      avatar: 'https://via.placeholder.com/32',
      status: 'idle',
    },
    {
      id: '3',
      username: 'BobJohnson',
      avatar: 'https://via.placeholder.com/32',
      status: 'offline',
    },
  ];

  async getMessages(channelId: string, limit: number = 50): Promise<Message[]> {
    return this.messages.filter((m) => m.channelId === channelId).slice(-limit);
  }

  async sendMessage(data: Omit<Message, 'id' | 'timestamp'>): Promise<Message> {
    const newMessage: Message = {
      ...data,
      id: `msg-${Date.now()}`,
      timestamp: new Date(),
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  async deleteMessage(messageId: string): Promise<boolean> {
    const index = this.messages.findIndex((m) => m.id === messageId);
    if (index > -1) {
      this.messages.splice(index, 1);
      return true;
    }
    return false;
  }

  async getUsers(): Promise<User[]> {
    return this.users;
  }

  async updateUserStatus(userId: string, status: 'online' | 'idle' | 'dnd' | 'offline'): Promise<User | null> {
    const user = this.users.find((u) => u.id === userId);
    if (user) {
      user.status = status;
      return user;
    }
    return null;
  }
}
