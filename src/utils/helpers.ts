// General utility helper functions

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const isStrongPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password)
  );
};

// Generate random ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
};

// Debounce function
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  try {
    const token = localStorage.getItem('bionic_token');
    return !!token;
  } catch {
    return false;
  }
};

// Sleep/delay function
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Capitalize first letter
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Truncate text
export const truncate = (str: string, length: number): string => {
  return str.length > length ? str.substring(0, length) + '...' : str;
};

// Deep clone object
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

// Check if object is empty
export const isEmpty = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

export default {
  isValidEmail,
  isStrongPassword,
  generateId,
  debounce,
  throttle,
  isAuthenticated,
  sleep,
  capitalize,
  truncate,
  deepClone,
  isEmpty,
};