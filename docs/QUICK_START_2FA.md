# Quick Start: 2FA Authentication & User Management

## What Changed?
✅ **Removed hardcoded credentials** - All users now stored in IndexedDB  
✅ **2FA with OTP** - Email verification required to login  
✅ **Admin user management** - Register new users in dashboard  
✅ **Role-based access** - Doctors can only view (read-only mode)  
✅ **Persistent storage** - Credentials saved locally in browser  

---

## 🚀 How to Test

### Step 1: Start the App
```bash
npm run dev
# Opens at http://localhost:5174
```

### Step 2: First Login (Admin)
1. **Username:** `admin`
2. **Password:** `admin123`
3. Click **"Send OTP"** button
4. **Open browser console** (F12) → Look for OTP message
5. Copy the **6-digit OTP** from console message
6. Paste OTP in the input field
7. Click **"Verify OTP"** 
8. ✅ You're in the dashboard!

### Step 3: Register New User (Admin Feature)
1. After login, click **"Manage Users"** button (top right, users icon)
2. Fill registration form:
   - **Username:** `john_doe`
   - **Full Name:** `John Doe`
   - **Email:** `john@example.com`
   - **Role:** `Doctor`
   - **Password:** `password123`
3. Click **"Register User"**
4. See new user in the list below

### Step 4: Test Doctor Access
1. **Logout** (click LogOut icon, top right)
2. **Login as Doctor:**
   - Username: `john_doe`
   - Password: `password123`
3. Click **"Send OTP"** → Copy OTP from console
4. Paste OTP and verify
5. ✅ Notice **"Read-Only Mode"** banner at top
6. Browse patient data (view-only)
7. Try clicking Settings → Dataset options are **hidden** for doctors

### Step 5: Try Another Admin Login
1. **Logout** and login as original admin
2. Click **"Manage Users"** again
3. See both `admin` and `john_doe` in the user list
4. Verify you can create more users

---

## 📱 Demo Accounts (Pre-loaded)

| Username | Password | Role | Status |
|----------|----------|------|--------|
| admin | admin123 | Admin | ✅ Works |
| doctor | doctor123 | Doctor | ✅ Works |

---

## 🔍 Where to Find OTP (Demo Mode)

**OTP appears in browser console:**
1. Press `F12` to open Developer Tools
2. Go to **Console** tab
3. Click "Send OTP" on login page
4. Look for message like:
```
╔════════════════════════════════════════════════════════════╗
║                     📧 OTP EMAIL SENT                       ║
╚════════════════════════════════════════════════════════════╝

To: vileshranjan@gmail.com
Username: admin
OTP Code: 456789
Expires in: 10 minutes
```

---

## 📋 Feature Checklist

### Authentication ✅
- [x] No hardcoded credentials
- [x] Login stored in IndexedDB
- [x] 2FA with OTP required
- [x] 10-minute OTP expiry
- [x] Resend OTP button
- [x] Multi-step login flow

### Admin Features ✅
- [x] Register new users
- [x] Assign roles (Admin/Doctor/Security Officer)
- [x] Set password and email
- [x] View all registered users
- [x] User management modal in dashboard

### Doctor Access Control ✅
- [x] Read-only mode banner
- [x] Cannot manage users
- [x] Cannot upload datasets
- [x] Can view patient data
- [x] Cannot modify any data
- [x] Settings menu restricted

### Data Storage ✅
- [x] Credentials in IndexedDB
- [x] OTP records in IndexedDB
- [x] Persists between sessions
- [x] No localStorage for passwords

---

## 🐛 Troubleshooting

### Q: OTP not showing in console?
**A:** 
1. Make sure DevTools is open (F12)
2. Click "Send OTP" after DevTools open
3. Check "Console" tab specifically
4. Look for the box with 📧 emoji

### Q: "Invalid or expired OTP" error?
**A:**
1. OTP expires in 10 minutes
2. Click "Resend OTP" to generate new code
3. Make sure you're copying the exact 6 digits

### Q: Can't register new user?
**A:**
1. You must be logged in as Admin
2. Username must be unique
3. Password minimum 6 characters
4. Fill all fields (Username, Email, Full Name, Password)

### Q: Database reset?
**A:** 
Clear browser cache/cookies:
1. Open DevTools (F12)
2. Go to **Application** tab
3. Find **IndexedDB** → **HealthCareSecurityDB**
4. Right-click and delete
5. Refresh page (new demo users will be created)

---

## 🔐 Security Notes

**This is a DEMO implementation:**
- ✅ Passwords are NOT hashed (plaintext in IndexedDB)
- ✅ OTP sent to console, not real email
- ✅ All for demonstration/learning purposes

**Production should add:**
- Hash passwords with bcrypt
- Use real email service (SendGrid, AWS SES)
- Move auth to backend
- Use JWT tokens
- HTTPS only

---

## 📁 Key Files Changed

| File | Change |
|------|--------|
| `src/app/utils/auth.ts` | Removed hardcoded creds, added 2FA flow |
| `src/app/utils/indexedDB.ts` | NEW - Database for credentials/OTP |
| `src/app/utils/otpEmailService.ts` | NEW - OTP generation & sending |
| `src/app/utils/rbac.ts` | NEW - Role-based access control |
| `src/app/components/LoginScreen.tsx` | Updated for 2-step OTP flow |
| `src/app/components/AdminUserManagement.tsx` | NEW - User registration modal |
| `src/app/components/EnhancedDashboard.tsx` | Added RBAC controls |
| `src/app/App.tsx` | Pass user role through app |

---

## 💡 Next Steps

1. **Test all features** using steps above
2. **Try edge cases** (wrong password, expired OTP, duplicate user)
3. **Check browser's IndexedDB** (DevTools → Application → IndexedDB)
4. **Read full documentation** in [2FA_AND_RBAC_GUIDE.md](2FA_AND_RBAC_GUIDE.md)
5. **For production** - follow security recommendations in docs

---

**Questions?** Check the console for error messages and the full documentation file.
