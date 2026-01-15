/**
 * Authentication Utility
 * Handles login, logout, and session management
 */

export interface User {
  username: string;
  role: 'admin' | 'doctor' | 'security_officer';
  fullName: string;
}

export interface AuthCredentials {
  username: string;
  password: string;
  twoFactorCode: string;
}

// Demo credentials (in production, this would be in a backend database)
const VALID_CREDENTIALS = [
  {
    username: 'admin',
    password: 'admin123',
    twoFactorCode: '123456',
    role: 'admin' as const,
    fullName: 'Admin User',
  },
  {
    username: 'doctor',
    password: 'doctor123',
    twoFactorCode: '654321',
    role: 'doctor' as const,
    fullName: 'Dr. Sarah Smith',
  },
  {
    username: 'security',
    password: 'security123',
    twoFactorCode: '111111',
    role: 'security_officer' as const,
    fullName: 'Security Officer',
  },
];

const AUTH_TOKEN_KEY = 'healthcareDataSecurity_authToken';
const USER_DATA_KEY = 'healthcareDataSecurity_userData';

/**
 * Validate login credentials
 */
export const validateCredentials = (credentials: AuthCredentials): User | null => {
  const validUser = VALID_CREDENTIALS.find(
    (cred) =>
      cred.username === credentials.username &&
      cred.password === credentials.password &&
      cred.twoFactorCode === credentials.twoFactorCode
  );

  if (validUser) {
    return {
      username: validUser.username,
      role: validUser.role,
      fullName: validUser.fullName,
    };
  }

  return null;
};

/**
 * Generate a simple auth token (in production, use JWT)
 */
const generateAuthToken = (username: string): string => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2);
  return btoa(`${username}:${timestamp}:${randomStr}`);
};

/**
 * Login user and create session
 */
export const login = (credentials: AuthCredentials): { success: boolean; user?: User; error?: string } => {
  const user = validateCredentials(credentials);

  if (!user) {
    return {
      success: false,
      error: 'Invalid username, password, or 2FA code',
    };
  }

  // Generate and store auth token
  const authToken = generateAuthToken(user.username);
  localStorage.setItem(AUTH_TOKEN_KEY, authToken);
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));

  return {
    success: true,
    user,
  };
};

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
