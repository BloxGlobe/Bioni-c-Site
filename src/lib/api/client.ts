/**
 * API Client for frontend to communicate with backend
 */

const getApiBaseUrl = (): string => {
  if (typeof window !== 'undefined' && window.location) {
    const env = (window as unknown as Record<string, unknown>).REACT_APP_API_URL as string | undefined;
    return env || 'http://localhost:5000/api';
  }
  return 'http://localhost:5000/api';
};

const API_BASE_URL = getApiBaseUrl();

interface ApiError {
  statusCode: number;
  message: string;
  details?: Record<string, unknown>;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'API Error');
  }
  const data: ApiResponse<T> = await response.json();
  if (!data.success) {
    throw new Error(data.error?.message || 'Request failed');
  }
  return data.data as T;
};

export const apiClient = {
  // Dashboard APIs
  dashboard: {
    getServers: async () => {
      const response = await fetch(`${API_BASE_URL}/dashboard/servers`);
      return handleResponse(response);
    },

    getCategories: async (serverId: string) => {
      const response = await fetch(
        `${API_BASE_URL}/dashboard/servers/${serverId}/categories`
      );
      return handleResponse(response);
    },

    getChannels: async (categoryId: string) => {
      const response = await fetch(
        `${API_BASE_URL}/dashboard/categories/${categoryId}/channels`
      );
      return handleResponse(response);
    },

    createServer: async (data: Record<string, unknown>) => {
      const response = await fetch(`${API_BASE_URL}/dashboard/servers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },
  },

  // Chat APIs
  chat: {
    getMessages: async (channelId: string, limit?: number) => {
      const url = new URL(`${API_BASE_URL}/chat/channels/${channelId}/messages`);
      if (limit) url.searchParams.append('limit', String(limit));
      const response = await fetch(url);
      return handleResponse(response);
    },

    sendMessage: async (channelId: string, data: Record<string, unknown>) => {
      const response = await fetch(
        `${API_BASE_URL}/chat/channels/${channelId}/messages`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );
      return handleResponse(response);
    },

    deleteMessage: async (messageId: string) => {
      const response = await fetch(
        `${API_BASE_URL}/chat/messages/${messageId}`,
        { method: 'DELETE' }
      );
      return handleResponse(response);
    },

    getUsers: async (channelId: string) => {
      const response = await fetch(
        `${API_BASE_URL}/chat/channels/${channelId}/users`
      );
      return handleResponse(response);
    },
  },

  // User APIs
  user: {
    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}/user`);
      return handleResponse(response);
    },

    getById: async (userId: string) => {
      const response = await fetch(`${API_BASE_URL}/user/${userId}`);
      return handleResponse(response);
    },

    create: async (data: Record<string, unknown>) => {
      const response = await fetch(`${API_BASE_URL}/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },

    update: async (userId: string, data: Record<string, unknown>) => {
      const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },

    delete: async (userId: string) => {
      const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
        method: 'DELETE',
      });
      return handleResponse(response);
    },
  },
};

export default apiClient;
