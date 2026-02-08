// Local storage utility functions
const STORAGE_KEYS = {
  USER: 'bionic_user',
  TOKEN: 'bionic_token',
  THEME: 'bionic_theme',
  PREFERENCES: 'bionic_preferences',
} as const;

export const storage = {
  // Get item from localStorage
  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Error getting from storage:', error);
      return null;
    }
  },

  // Set item in localStorage
  set: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Error setting to storage:', error);
    }
  },

  // Remove item from localStorage
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from storage:', error);
    }
  },

  // Clear all localStorage
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },

  // Get JSON object
  getJSON: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error parsing JSON from storage:', error);
      return null;
    }
  },

  // Set JSON object
  setJSON: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error stringifying JSON to storage:', error);
    }
  },
};

// User-specific storage helpers
export const userStorage = {
  getUser: () => storage.getJSON(STORAGE_KEYS.USER),
  setUser: (user: unknown) => storage.setJSON(STORAGE_KEYS.USER, user),
  removeUser: () => storage.remove(STORAGE_KEYS.USER),

  getToken: () => storage.get(STORAGE_KEYS.TOKEN),
  setToken: (token: string) => storage.set(STORAGE_KEYS.TOKEN, token),
  removeToken: () => storage.remove(STORAGE_KEYS.TOKEN),

  getPreferences: () => storage.getJSON(STORAGE_KEYS.PREFERENCES),
  setPreferences: (prefs: unknown) => storage.setJSON(STORAGE_KEYS.PREFERENCES, prefs),
};

export default storage;