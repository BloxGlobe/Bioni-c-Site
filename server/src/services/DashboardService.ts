import type { Server, Channel, Category } from '../types/dashboard';

export class DashboardService {
  private servers: Server[] = [
    {
      id: '1',
      name: 'Main Server',
      icon: 'https://via.placeholder.com/50',
      isActive: true,
    },
    {
      id: '2',
      name: 'Dev Server',
      icon: 'https://via.placeholder.com/50',
      isActive: false,
    },
  ];

  private categories: Category[] = [
    {
      id: 'cat-1',
      name: 'General',
      channels: [
        {
          id: 'ch-1',
          name: 'general',
          type: 'text',
          isActive: true,
          unreadCount: 0,
        },
        {
          id: 'ch-2',
          name: 'announcements',
          type: 'text',
          isActive: false,
          unreadCount: 2,
        },
      ],
      isCollapsed: false,
    },
  ];

  async getServers(): Promise<Server[]> {
    return this.servers;
  }

  async getCategories(): Promise<Category[]> {
    return this.categories;
  }

  async getChannels(categoryId: string): Promise<Channel[]> {
    const category = this.categories.find((c) => c.id === categoryId);
    return category?.channels || [];
  }

  async createServer(data: Omit<Server, 'id'>): Promise<Server> {
    const newServer: Server = {
      ...data,
      id: `server-${Date.now()}`,
    };
    this.servers.push(newServer);
    return newServer;
  }

  async updateServer(serverId: string, data: Partial<Server>): Promise<Server | null> {
    const server = this.servers.find((s) => s.id === serverId);
    if (!server) return null;
    return { ...server, ...data };
  }
}
