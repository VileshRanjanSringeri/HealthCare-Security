# Authentication & User Management Implementation

## Overview
Implemented a complete 2FA authentication system with OTP email verification and role-based access control (RBAC). All credentials are now stored in **IndexedDB** (browser local database) instead of hardcoded values.

## Features Implemented

### 1. Two-Factor Authentication (2FA) with OTP
- **OTP Generation**: 6-digit random OTP codes generated upon login
- **Email Sending**: OTP sent to `vileshranjan@gmail.com` (configurable)
- **OTP Expiry**: 10-minute expiration timer
- **Verification**: Users must verify OTP to complete login
- **Resend**: Option to resend OTP if code expires

**Files:**
- [src/app/utils/otpEmailService.ts](src/app/utils/otpEmailService.ts) - OTP generation and email simulation
- [src/app/utils/auth.ts](src/app/utils/auth.ts) - Auth flow functions

### 2. IndexedDB for Credential Storage
- **No Hardcoded Credentials**: All user data stored in browser's IndexedDB
- **Persistent Storage**: Credentials persist between sessions
- **OTP Records**: OTP codes and verification status tracked
- **User Management**: Full CRUD operations for user management

**File:** [src/app/utils/indexedDB.ts](src/app/utils/indexedDB.ts)

**Database Structure:**
```
HealthCareSecurityDB (IDBDatabase)
├── userCredentials (ObjectStore)
│   └── Indexes: username (unique), email (unique)
└── otpData (ObjectStore)
    └── Indexes: username, email
```

### 3. Login Flow (Two-Step)

**Step 1: Credentials Submission**
```
User enters: Username + Password
↓
System validates against IndexedDB
↓
If valid: Generate OTP and send to email
↓
Proceed to Step 2
```

**Step 2: OTP Verification**
```
User enters: OTP code
↓
System verifies OTP and timestamp
↓
If valid: Create session and authenticate
↓
Redirect to Dashboard
```

### 4. Admin User Registration
Only **Admin** users can register new users. Access via "Manage Users" button in dashboard header.

**Features:**
- Create new user accounts
- Assign roles (Admin, Doctor, Security Officer)
- Set username, email, password, full name
- View all registered users
- Password validation (min 6 chars, confirmation match)

**File:** [src/app/components/AdminUserManagement.tsx](src/app/components/AdminUserManagement.tsx)

### 5. Role-Based Access Control (RBAC)

**Permissions by Role:**

| Permission | Admin | Doctor | Security Officer |
|-----------|-------|--------|------------------|
| canEdit | ✅ Yes | ❌ No | ❌ No |
| canDelete | ✅ Yes | ❌ No | ❌ No |
| canManageUsers | ✅ Yes | ❌ No | ❌ No |
| canViewSensitiveData | ✅ Yes | ✅ Yes | ✅ Yes |
| canExportData | ✅ Yes | ❌ No | ❌ No |

**File:** [src/app/utils/rbac.ts](src/app/utils/rbac.ts)

### 6. Doctor Read-Only Mode
- **Read-Only Banner**: Doctors see a banner indicating they are in read-only mode
- **Restricted Settings**: Dataset management hidden for doctors
- **View Access**: Doctors can still view all patient data and analytics
- **No Modifications**: Cannot upload datasets, create users, or modify data

## How to Use

### For Admin Users

**Register New Users:**
1. Login as admin
2. Click "Manage Users" button in top right
3. Fill in user details (username, email, password, role)
4. Click "Register User"
5. New user appears in the list below

**Load Datasets:**
1. Click Settings (gear icon)
2. Select "Load CSV Dataset"
3. Upload your CSV file
4. Data will be processed and persisted

### For Doctor Users

**Viewing Data:**
1. Login with doctor credentials
2. Dashboard displays "Read-Only Mode" banner
3. Browse patient data and alerts
4. View security analytics
5. Cannot make any modifications

**Demo Credentials:**
- Username: `doctor`
- Password: `doctor123`

### Login Process

**For Any User:**
1. Open login page
2. Enter username and password
3. Click "Send OTP"
4. Check console or email (demo mode shows OTP in console)
5. Enter 6-digit OTP
6. Click "Verify OTP"
7. Redirected to dashboard

**Demo Credentials:**
- Admin: `admin` / `admin123`
- Doctor: `doctor` / `doctor123`

## Testing

### Test OTP Flow
1. Open browser console (F12)
2. Look for OTP message after clicking "Send OTP"
3. Copy the OTP code from console
4. Paste into OTP input field

### Test Admin User Management
1. Login as admin
2. Click "Manage Users"
3. Register new doctor/security officer
4. Logout and login with new credentials
5. Verify new user can access system

### Test Role-Based Access
1. Login as admin - see full settings menu
2. Login as doctor - see read-only mode message
3. Verify dataset options hidden for doctor
4. Verify both can view patient data

## API Integration (Production)

### Replace Email Simulation
In `src/app/utils/otpEmailService.ts`, replace the simulated `sendOTPEmail`:

```typescript
export const sendOTPEmail = async (config: OTPEmailConfig): Promise<OTPResult> => {
  const otp = generateRandomOTP();
  const expiresAt = Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000;

  // Call your backend API
  await fetch('https://api.example.com/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: config.toEmail,
      otp,
      username: config.username
    })
  });

  return { otp, expiresAt, expiryMinutes: OTP_EXPIRY_MINUTES };
};
```

### Add Backend Authentication
Move credential validation to backend:

```typescript
export const authenticateUser = async (username: string, password: string) => {
  const response = await fetch('https://api.example.com/auth/validate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return response.json();
};
```

## Security Considerations

### Current Implementation (Demo)
- Credentials stored in IndexedDB (local storage)
- Passwords not hashed (demo purposes)
- OTP sent to console (demo purposes)

### Production Recommendations
1. **Hash Passwords**: Use bcrypt or PBKDF2 before storing
2. **Encrypt IndexedDB**: Add encryption layer for sensitive data
3. **Use HTTPS**: All API calls must be over HTTPS
4. **Backend Validation**: Move all auth logic to backend
5. **JWT Tokens**: Use JWT with short expiry (15 min) + refresh tokens
6. **Rate Limiting**: Implement rate limiting on OTP requests
7. **Audit Logging**: Log all authentication attempts
8. **CORS**: Restrict API access to authorized domains

## File Structure

```
src/app/
├── utils/
│   ├── auth.ts                    # Main auth functions
│   ├── indexedDB.ts               # IndexedDB operations
│   ├── otpEmailService.ts         # OTP generation and sending
│   └── rbac.ts                    # Role-based access control
├── components/
│   ├── LoginScreen.tsx            # Updated login UI with 2-step flow
│   ├── AdminUserManagement.tsx    # Admin user registration modal
│   ├── EnhancedDashboard.tsx      # Updated with RBAC and user mgmt button
│   └── ... (other components)
└── App.tsx                         # Updated with user role state
```

## Key Functions

### Authentication
- `registerUser()` - Register new user
- `initiateLogin()` - Send OTP after credential validation
- `verifyOTPAndLogin()` - Verify OTP and create session
- `ensureDemoUsersExist()` - Seed demo accounts on first load

### Database
- `saveCredentials()` - Store new user
- `getCredentialsByUsername()` - Fetch user by username
- `saveOTP()` - Store OTP record
- `verifyOTP()` - Verify OTP code

### RBAC
- `getPermissions()` - Get role permissions
- `canPerformAction()` - Check if action allowed
- `isAdmin()` - Check if user is admin
- `isDoctor()` - Check if user is doctor

## Troubleshooting

### OTP Not Appearing
- Check browser console (F12) for OTP message
- Verify email hasn't expired (10 min expiry)
- Click "Resend OTP" to generate new code

### IndexedDB Errors
- Clear browser cache: Settings → Clear browsing data → Cookies and site data
- Try in private/incognito mode to test fresh database
- Check browser console for specific error messages

### User Not Found After Registration
- Verify username is unique (error will show if duplicate)
- Check IndexedDB in DevTools → Application → IndexedDB → HealthCareSecurityDB
- Manually clear and restart app if needed

## Future Enhancements
- [ ] Biometric 2FA (fingerprint, face recognition)
- [ ] Backup codes for account recovery
- [ ] Password reset flow
- [ ] Account lockout after failed attempts
- [ ] Session management and logout all devices
- [ ] Activity logs for audit trail
- [ ] Two-step verification optional settings
- [ ] Custom OTP delivery method (SMS, authenticator app)
