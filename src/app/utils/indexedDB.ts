/**
 * IndexedDB Utility
 * Manages local storage of credentials and OTP data in browser's IndexedDB
 */

const DB_NAME = 'HealthCareSecurityDB';
const DB_VERSION = 1;
const CREDENTIALS_STORE = 'userCredentials';
const OTP_STORE = 'otpData';

export interface StoredCredential {
  id?: number;
  username: string;
  email: string;
  password: string; // In production, should be hashed
  role: 'admin' | 'doctor' | 'security_officer';
  fullName: string;
  createdAt: number;
  lastLogin?: number;
}

export interface StoredOTP {
  id?: number;
  username: string;
  email: string;
  otp: string;
  createdAt: number;
  expiresAt: number;
  attempts: number;
  verified: boolean;
}

/**
 * Initialize IndexedDB database
 */
const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create credentials store
      if (!db.objectStoreNames.contains(CREDENTIALS_STORE)) {
        const credStore = db.createObjectStore(CREDENTIALS_STORE, { keyPath: 'id', autoIncrement: true });
        credStore.createIndex('username', 'username', { unique: true });
        credStore.createIndex('email', 'email', { unique: true });
      }

      // Create OTP store
      if (!db.objectStoreNames.contains(OTP_STORE)) {
        const otpStore = db.createObjectStore(OTP_STORE, { keyPath: 'id', autoIncrement: true });
        otpStore.createIndex('username', 'username', { unique: false });
        otpStore.createIndex('email', 'email', { unique: false });
      }
    };
  });
};

/**
 * Save credentials to IndexedDB
 */
export const saveCredentials = async (credential: Omit<StoredCredential, 'id' | 'createdAt'>): Promise<number> => {
  const db = await initDB();
  const store = db.transaction([CREDENTIALS_STORE], 'readwrite').objectStore(CREDENTIALS_STORE);

  const credentialWithTimestamp: StoredCredential = {
    ...credential,
    createdAt: Date.now(),
  };

  return new Promise((resolve, reject) => {
    const request = store.add(credentialWithTimestamp);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result as number);
  });
};

/**
 * Get credentials by username
 */
export const getCredentialsByUsername = async (username: string): Promise<StoredCredential | null> => {
  const db = await initDB();
  const store = db.transaction([CREDENTIALS_STORE], 'readonly').objectStore(CREDENTIALS_STORE);
  const index = store.index('username');

  return new Promise((resolve, reject) => {
    const request = index.get(username);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result || null);
  });
};

/**
 * Get credentials by email
 */
export const getCredentialsByEmail = async (email: string): Promise<StoredCredential | null> => {
  const db = await initDB();
  const store = db.transaction([CREDENTIALS_STORE], 'readonly').objectStore(CREDENTIALS_STORE);
  const index = store.index('email');

  return new Promise((resolve, reject) => {
    const request = index.get(email);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result || null);
  });
};

/**
 * Update last login timestamp
 */
export const updateLastLogin = async (username: string): Promise<void> => {
  const credential = await getCredentialsByUsername(username);
  if (!credential) throw new Error('Credential not found');

  const db = await initDB();
  const store = db.transaction([CREDENTIALS_STORE], 'readwrite').objectStore(CREDENTIALS_STORE);

  const updated = {
    ...credential,
    lastLogin: Date.now(),
  };

  return new Promise((resolve, reject) => {
    const request = store.put(updated);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

/**
 * Save OTP data
 */
export const saveOTP = async (otpData: Omit<StoredOTP, 'id'>): Promise<number> => {
  const db = await initDB();
  const store = db.transaction([OTP_STORE], 'readwrite').objectStore(OTP_STORE);

  return new Promise((resolve, reject) => {
    const request = store.add(otpData);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result as number);
  });
};

/**
 * Get latest OTP for username
 */
export const getLatestOTP = async (username: string): Promise<StoredOTP | null> => {
  const db = await initDB();
  const store = db.transaction([OTP_STORE], 'readonly').objectStore(OTP_STORE);
  const index = store.index('username');

  return new Promise((resolve, reject) => {
    const request = index.getAll(username);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const results = request.result as StoredOTP[];
      if (results.length === 0) {
        resolve(null);
      } else {
        // Return the most recent OTP
        resolve(results[results.length - 1]);
      }
    };
  });
};

/**
 * Verify and mark OTP as verified
 */
export const verifyOTP = async (username: string, otp: string): Promise<boolean> => {
  const latestOTP = await getLatestOTP(username);

  if (!latestOTP) {
    return false;
  }

  // Check if OTP matches
  if (latestOTP.otp !== otp) {
    // Increment attempts
    const db = await initDB();
    const store = db.transaction([OTP_STORE], 'readwrite').objectStore(OTP_STORE);
    latestOTP.attempts += 1;

    return new Promise((resolve, reject) => {
      const request = store.put(latestOTP);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(false);
    });
  }

  // Check if OTP is expired
  if (Date.now() > latestOTP.expiresAt) {
    return false;
  }

  // Mark as verified
  const db = await initDB();
  const store = db.transaction([OTP_STORE], 'readwrite').objectStore(OTP_STORE);
  latestOTP.verified = true;

  return new Promise((resolve, reject) => {
    const request = store.put(latestOTP);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(true);
  });
};

/**
 * Get all stored credentials (for admin/debug purposes)
 */
export const getAllCredentials = async (): Promise<StoredCredential[]> => {
  const db = await initDB();
  const store = db.transaction([CREDENTIALS_STORE], 'readonly').objectStore(CREDENTIALS_STORE);

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result as StoredCredential[]);
  });
};

/**
 * Clear all data (for testing purposes)
 */
export const clearAllData = async (): Promise<void> => {
  const db = await initDB();
  const transaction = db.transaction([CREDENTIALS_STORE, OTP_STORE], 'readwrite');

  return new Promise((resolve, reject) => {
    const credReq = transaction.objectStore(CREDENTIALS_STORE).clear();
    const otpReq = transaction.objectStore(OTP_STORE).clear();

    transaction.onerror = () => reject(transaction.error);
    transaction.oncomplete = () => resolve();
  });
};
