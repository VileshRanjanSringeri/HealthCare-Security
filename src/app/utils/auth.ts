/**
 * Authentication Utility
 * Handles login, logout, and session management
 */

import { 
  getCredentialsByUsername, 
  saveCredentials, 
  updateLastLogin
} from './indexedDB';

export interface User {
  username: string;
  role: 'admin' | 'doctor' | 'security_officer';
  fullName: string;
}

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface FailedAuthAttempt {
  timestamp: string;
  username: string;
  ip: string;
  location: string;
  status: string;
  method: string;
  reason: string;
}

const AUTH_TOKEN_KEY = 'healthcareDataSecurity_authToken';
const USER_DATA_KEY = 'healthcareDataSecurity_userData';
const FAILED_AUTH_KEY = 'healthcareDataSecurity_failedAuth';

/**
 * Get a simulated IP address (in production, this would come from the server)
 */
const getSimulatedIP = (): string => {
  const ips = [
    '192.168.1.105',
    '10.0.0.88',
    '172.16.0.55',
    '203.0.113.45',
    '198.51.100.23',
  ];
  return ips[Math.floor(Math.random() * ips.length)];
};

/**
 * Determine the failure reason for logging (simplified)
 */
const getFailureReason = (_credentials: AuthCredentials): string => {
  return 'Authentication Failed';
};

/**
 * Log a failed authentication attempt
 */
export const logFailedAuthAttempt = (credentials: AuthCredentials): void => {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });

  const failedAttempt: FailedAuthAttempt = {
    timestamp: timeString,
    username: credentials.username || '(empty)',
    ip: getSimulatedIP(),
    location: 'External Network',
    status: 'Blocked',
    method: 'Brute Force Attempt',
    reason: getFailureReason(credentials),
  };

  // Get existing attempts
  const existing = getFailedAuthAttempts();
  
  // Add new attempt at the beginning (most recent first)
  const updated = [failedAttempt, ...existing];
  
  // Keep only last 50 attempts
  const limited = updated.slice(0, 50);
  
  // Save to localStorage
  localStorage.setItem(FAILED_AUTH_KEY, JSON.stringify(limited));
};

/**
 * Get all failed authentication attempts
 */
export const getFailedAuthAttempts = (): FailedAuthAttempt[] => {
  try {
    const stored = localStorage.getItem(FAILED_AUTH_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

/**
 * Clear all failed authentication attempts
 */
export const clearFailedAuthAttempts = (): void => {
  localStorage.removeItem(FAILED_AUTH_KEY);
};

/**
 * Register a new user into IndexedDB
 */
export const registerUser = async (data: {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'doctor' | 'security_officer';
  fullName: string;
}): Promise<{ success: boolean; error?: string }> => {
  try {
    await saveCredentials({
      username: data.username,
      email: data.email,
      password: data.password,
      role: data.role,
      fullName: data.fullName,
    });
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Registration failed' };
  }
};

/**
 * Validate login credentials
 */
/**
 * Initiate login by validating username/password
 */
export const login = async (credentials: AuthCredentials): Promise<{ success: boolean; user?: User; error?: string }> => {
  try {
    const stored = await getCredentialsByUsername(credentials.username);
    if (!stored) {
      logFailedAuthAttempt(credentials);
      return { success: false, error: 'Invalid username or password' };
    }

    if (stored.password !== credentials.password) {
      logFailedAuthAttempt(credentials);
      return { success: false, error: 'Invalid username or password' };
    }

    const user: User = {
      username: stored.username,
      role: stored.role,
      fullName: stored.fullName,
    };

    const authToken = generateAuthToken(user.username);
    localStorage.setItem(AUTH_TOKEN_KEY, authToken);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));

    await updateLastLogin(user.username);

    return { success: true, user };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Login failed' };
  }
};

/**
 * Ensure demo users exist in IndexedDB for testing/demo purposes
 */
export const ensureDemoUsersExist = async (): Promise<void> => {
  try {
    const admin = await getCredentialsByUsername('admin');
    if (!admin) {
      await saveCredentials({
        username: 'admin',
        email: 'vileshranjan@gmail.com',
        password: 'admin123',
        role: 'admin',
        fullName: 'Admin User',
      });
    }

    const doctor = await getCredentialsByUsername('doctor');
    if (!doctor) {
      await saveCredentials({
        username: 'doctor',
        email: 'doctor@example.com',
        password: 'doctor123',
        role: 'doctor',
        fullName: 'Dr. Sarah Smith',
      });
    }
  } catch (err) {
    // ignore errors during demo seeding
    console.warn('Demo user seeding failed', err);
  }
};

/**
 * Generate a simple auth token (in production, use JWT)
 */
const generateAuthToken = (username: string): string => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2);
  return btoa(`${username}:${timestamp}:${randomStr}`);
};

// Note: Legacy synchronous login removed. Use async login() function.

/**
 * Logout user and clear session
 */
export const logout = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
  return authToken !== null;
};

/**
 * Get current user data
 */
export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem(USER_DATA_KEY);
  if (!userData) return null;

  try {
    return JSON.parse(userData);
  } catch {
    return null;
  }
};

/**
 * Validate user credentials exist in IndexedDB
 * Ensures stored auth data hasn't become stale
 */
export const validateUserInDatabase = async (username: string): Promise<boolean> => {
  try {
    const credentials = await getCredentialsByUsername(username);
    return credentials !== null;
  } catch {
    return false;
  }
};

/**
 * Emergency override (bypasses normal authentication)
 * Used for critical situations - logs the override
 */
export const emergencyOverride = (): User => {
  console.warn('🚨 EMERGENCY OVERRIDE ACTIVATED - This action is logged');
  
  const emergencyUser: User = {
    username: 'emergency_override',
    role: 'admin',
    fullName: 'Emergency Access',
  };

  const authToken = generateAuthToken('emergency_override');
  localStorage.setItem(AUTH_TOKEN_KEY, authToken);
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(emergencyUser));

  return emergencyUser;
};