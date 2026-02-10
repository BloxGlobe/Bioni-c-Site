// User Types
export interface User {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  status: 'online' | 'idle' | 'offline';
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthUser extends User {
  token: string;
  refreshToken?: string;
}
