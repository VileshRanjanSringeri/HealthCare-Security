/**
 * OTP Email Service
 * Generates OTP codes and simulates sending them via email
 * In production, integrate with backend email service (SendGrid, AWS SES, etc.)
 */

const OTP_EXPIRY_MINUTES = 10; // OTP valid for 10 minutes
const OTP_LENGTH = 6;

export interface OTPEmailConfig {
  toEmail: string;
  username: string;
}

export interface OTPResult {
  otp: string;
  expiresAt: number;
  expiryMinutes: number;
}

/**
 * Generate a random 6-digit OTP
 */
const generateRandomOTP = (): string => {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < OTP_LENGTH; i++) {
    otp += digits.charAt(Math.floor(Math.random() * digits.length));
  }
  return otp;
};

/**
 * Send OTP via email (simulated)
 * In production, this would call a backend API that sends actual emails
 */
export const sendOTPEmail = async (config: OTPEmailConfig): Promise<OTPResult> => {
  const otp = generateRandomOTP();
  const expiresAt = Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000;

  // Simulate API call to backend email service
  return new Promise((resolve) => {
    setTimeout(() => {
      // In production, call your backend API:
      // await fetch('/api/send-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     email: config.toEmail,
      //     otp,
      //     username: config.username
      //   })
      // });

      // For demo purposes, log to console and show OTP
      console.log(`
╔════════════════════════════════════════════════════════════╗
║                     📧 OTP EMAIL SENT                       ║
╚════════════════════════════════════════════════════════════╝

To: ${config.toEmail}
Username: ${config.username}
OTP Code: ${otp}
Expires in: ${OTP_EXPIRY_MINUTES} minutes

⚠️  Demo Mode: OTP is displayed in console. In production, 
    this would be sent via real email service.
════════════════════════════════════════════════════════════
      `);

      resolve({
        otp,
        expiresAt,
        expiryMinutes: OTP_EXPIRY_MINUTES,
      });
    }, 500); // Simulate network delay
  });
};

/**
 * Validate OTP format
 */
export const validateOTPFormat = (otp: string): boolean => {
  const regex = /^\d{6}$/;
  return regex.test(otp);
};

/**
 * Check if OTP is expired
 */
export const isOTPExpired = (expiresAt: number): boolean => {
  return Date.now() > expiresAt;
};

/**
 * Calculate remaining time for OTP in seconds
 */
export const getRemainingOTPTime = (expiresAt: number): number => {
  const remaining = Math.floor((expiresAt - Date.now()) / 1000);
  return remaining > 0 ? remaining : 0;
};

/**
 * Format remaining time as MM:SS
 */
export const formatRemainingTime = (expiresAt: number): string => {
  const seconds = getRemainingOTPTime(expiresAt);
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
