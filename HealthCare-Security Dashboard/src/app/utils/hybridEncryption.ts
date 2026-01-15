/**
 * Hybrid Encryption Implementation
 * 
 * Combines AES-256-GCM (symmetric) and RSA-OAEP-2048 (asymmetric) encryption
 * for secure healthcare IoT data transmission
 * 
 * Implementation:
 * 1. Generate AES-256 key for data encryption (fast, efficient)
 * 2. Encrypt data with AES-256-GCM
 * 3. Encrypt AES key with RSA-2048 public key (secure key exchange)
 * 4. Return encrypted data + encrypted key
 */

export interface EncryptionResult {
  encryptedData: string;
  encryptedKey: string;
  iv: string;
  authTag: string;
  encryptionTime: number; // milliseconds
}

export interface DecryptionResult {
  decryptedData: string;
  decryptionTime: number; // milliseconds
  verified: boolean;
}

export interface EncryptionMetrics {
  aesEncryptionTime: number;
  rsaKeyEncryptionTime: number;
  totalEncryptionTime: number;
  dataSize: number;
}

/**
 * Generate RSA-2048 key pair
 */
export async function generateRSAKeyPair(): Promise<CryptoKeyPair> {
  return await window.crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true,
    ['encrypt', 'decrypt']
  );
}

/**
 * Generate AES-256 key
 */
export async function generateAESKey(): Promise<CryptoKey> {
  return await window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt']
  );
}

/**
 * Hybrid Encryption: AES-256-GCM + RSA-OAEP-2048
 */
export async function hybridEncrypt(
  data: string,
  rsaPublicKey: CryptoKey
): Promise<EncryptionResult> {
  const startTime = performance.now();

  // Step 1: Generate AES-256 key
  const aesKey = await generateAESKey();
  const aesStartTime = performance.now();

  // Step 2: Generate IV (Initialization Vector)
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  // Step 3: Encrypt data with AES-256-GCM
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);

  const encryptedDataBuffer = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
      tagLength: 128,
    },
    aesKey,
    dataBuffer
  );

  const aesEncryptionTime = performance.now() - aesStartTime;

  // Step 4: Encrypt AES key with RSA-2048 public key
  const rsaStartTime = performance.now();
  const aesKeyBuffer = await window.crypto.subtle.exportKey('raw', aesKey);
  const encryptedKeyBuffer = await window.crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP',
    },
    rsaPublicKey,
    aesKeyBuffer
  );
  const rsaKeyEncryptionTime = performance.now() - rsaStartTime;

  const totalEncryptionTime = performance.now() - startTime;

  // Convert to base64 for transmission
  const encryptedData = arrayBufferToBase64(encryptedDataBuffer);
  const encryptedKey = arrayBufferToBase64(encryptedKeyBuffer);
  const ivBase64 = arrayBufferToBase64(iv);

  return {
    encryptedData,
    encryptedKey,
    iv: ivBase64,
    authTag: '', // GCM mode includes auth tag in encrypted data
    encryptionTime: totalEncryptionTime,
  };
}

/**
 * Hybrid Decryption: AES-256-GCM + RSA-OAEP-2048
 */
export async function hybridDecrypt(
  encryptedData: string,
  encryptedKey: string,
  iv: string,
  rsaPrivateKey: CryptoKey
): Promise<DecryptionResult> {
  const startTime = performance.now();

  try {
    // Step 1: Decrypt AES key with RSA-2048 private key
    const encryptedKeyBuffer = base64ToArrayBuffer(encryptedKey);
    const aesKeyBuffer = await window.crypto.subtle.decrypt(
      {
        name: 'RSA-OAEP',
      },
      rsaPrivateKey,
      encryptedKeyBuffer
    );

    // Step 2: Import AES key
    const aesKey = await window.crypto.subtle.importKey(
      'raw',
      aesKeyBuffer,
      {
        name: 'AES-GCM',
        length: 256,
      },
      false,
      ['decrypt']
    );

    // Step 3: Decrypt data with AES-256-GCM
    const encryptedDataBuffer = base64ToArrayBuffer(encryptedData);
    const ivBuffer = base64ToArrayBuffer(iv);

    const decryptedDataBuffer = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: ivBuffer,
        tagLength: 128,
      },
      aesKey,
      encryptedDataBuffer
    );

    const decoder = new TextDecoder();
    const decryptedData = decoder.decode(decryptedDataBuffer);

    const decryptionTime = performance.now() - startTime;

    return {
      decryptedData,
      decryptionTime,
      verified: true,
    };
  } catch (error) {
    console.error('Decryption failed:', error);
    return {
      decryptedData: '',
      decryptionTime: performance.now() - startTime,
      verified: false,
    };
  }
}

/**
 * HMAC-SHA256 for data integrity verification
 */
export async function generateHMAC(data: string, key: CryptoKey): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  
  const signature = await window.crypto.subtle.sign(
    'HMAC',
    key,
    dataBuffer
  );
  
  return arrayBufferToBase64(signature);
}

/**
 * Verify HMAC-SHA256 signature
 */
export async function verifyHMAC(
  data: string,
  signature: string,
  key: CryptoKey
): Promise<boolean> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const signatureBuffer = base64ToArrayBuffer(signature);
  
  return await window.crypto.subtle.verify(
    'HMAC',
    key,
    signatureBuffer,
    dataBuffer
  );
}

/**
 * Generate HMAC key for SHA-256
 */
export async function generateHMACKey(): Promise<CryptoKey> {
  return await window.crypto.subtle.generateKey(
    {
      name: 'HMAC',
      hash: 'SHA-256',
    },
    true,
    ['sign', 'verify']
  );
}

// Utility functions
function arrayBufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToArrayBuffer(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Simulate encryption metrics for demonstration
 */
export function calculateEncryptionMetrics(
  dataSize: number,
  encryptionTime: number
): EncryptionMetrics {
  // AES is typically 10-20x faster than RSA
  const rsaKeyEncryptionTime = encryptionTime * 0.15; // ~15% of total time
  const aesEncryptionTime = encryptionTime * 0.85; // ~85% of total time

  return {
    aesEncryptionTime,
    rsaKeyEncryptionTime,
    totalEncryptionTime: encryptionTime,
    dataSize,
  };
}
