import { useState } from 'react';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { login, emergencyOverride } from '../utils/auth';

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [emergencyOverrideChecked, setEmergencyOverrideChecked] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      // Emergency override
      if (emergencyOverrideChecked) {
        emergencyOverride();
        setLoading(false);
        onLogin();
        return;
      }

      // Normal login
      const result = login({ username, password, twoFactorCode });

      if (result.success) {
        setLoading(false);
        onLogin();
      } else {
        setError(result.error || 'Login failed');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A5FB4] to-[#99C1F1]">
      <div className="w-full max-w-[400px] p-6">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm mb-4 shadow-2xl border-2 border-white/30">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">
            Healthcare Data
          </h1>
          <h2 className="text-xl text-white/90">
            Security System
          </h2>
        </div>

        {/* Login Form Card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-2xl space-y-4">
          {/* Error Message */}
          {error && (
            <div className="p-3 bg-[#C01C28]/10 border border-[#C01C28]/20 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#C01C28]" />
              <p className="text-sm text-[#C01C28] font-semibold">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2 text-[#1E1E1E]">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
              disabled={emergencyOverrideChecked}
              className="w-full px-3 py-3 rounded-lg border border-[#E9EBEF] focus:border-[#1A5FB4] focus:ring-2 focus:ring-[#1A5FB4]/20 focus:outline-none transition-all disabled:bg-[#F6F5F4] disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#1E1E1E]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={emergencyOverrideChecked}
              className="w-full px-3 py-3 rounded-lg border border-[#E9EBEF] focus:border-[#1A5FB4] focus:ring-2 focus:ring-[#1A5FB4]/20 focus:outline-none transition-all disabled:bg-[#F6F5F4] disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#1E1E1E]">2FA Code</label>
            <input
              type="text"
              value={twoFactorCode}
              onChange={(e) => setTwoFactorCode(e.target.value)}
              placeholder="123456"
              maxLength={6}
              required
              disabled={emergencyOverrideChecked}
              className="w-full px-3 py-3 rounded-lg border border-[#E9EBEF] focus:border-[#1A5FB4] focus:ring-2 focus:ring-[#1A5FB4]/20 focus:outline-none font-mono text-center text-lg tracking-widest transition-all disabled:bg-[#F6F5F4] disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="emergency"
              checked={emergencyOverrideChecked}
              onChange={(e) => setEmergencyOverrideChecked(e.target.checked)}
              className="w-4 h-4 rounded border-[#E9EBEF] text-[#C01C28] focus:ring-[#C01C28]"
            />
            <label htmlFor="emergency" className="text-sm text-[#1E1E1E]">
              Emergency Override Access
            </label>
          </div>

          {emergencyOverrideChecked && (
            <div className="p-3 bg-[#E5A50A]/10 border border-[#E5A50A]/20 rounded-lg">
              <p className="text-xs text-[#E5A50A] font-semibold">
                ⚠️ Emergency override will bypass authentication. This action will be logged.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-lg bg-[#1A5FB4] text-white font-semibold hover:bg-[#1A5FB4]/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? 'Authenticating...' : 'Secure Login'}
          </button>

          {/* Demo Credentials Help */}
          <div className="mt-4 p-3 bg-[#F6F5F4] rounded-lg">
            <p className="text-xs text-[#717182] font-semibold mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-xs text-[#717182]">
              <p>• Username: <span className="font-mono">admin</span> | Password: <span className="font-mono">admin123</span> | 2FA: <span className="font-mono">123456</span></p>
              <p>• Username: <span className="font-mono">doctor</span> | Password: <span className="font-mono">doctor123</span> | 2FA: <span className="font-mono">654321</span></p>
            </div>
          </div>
        </form>

        {/* Status Indicators */}
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 space-y-2">
          <div className="flex items-center gap-2 text-white">
            <CheckCircle className="w-5 h-5 text-[#2EC27E]" />
            <span className="text-sm">Secure connection active</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Shield className="w-5 h-5 text-[#2EC27E]" />
            <span className="text-sm">End-to-end encryption: AES-256-GCM + HMAC-SHA256</span>
          </div>
        </div>
      </div>
    </div>
  );
}