import type { User } from '../types/chat';

export class UserService {
  private users: User[] = [];

  async getUserById(userId: string): Promise<User | null> {
    return this.users.find((u) => u.id === userId) || null;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.users.find((u) => u.username === username) || null;
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async createUser(data: Omit<User, 'id'>): Promise<User> {
    const newUser: User = {
      ...data,
      id: `user-${Date.now()}`,
    };
    this.users.push(newUser);
    return newUser;
  }

  async updateUser(userId: string, data: Partial<User>): Promise<User | null> {
    const user = this.users.find((u) => u.id === userId);
    if (!user) return null;
    return { ...user, ...data };
  }

  async deleteUser(userId: string): Promise<boolean> {
    const index = this.users.findIndex((u) => u.id === userId);
    if (index > -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
