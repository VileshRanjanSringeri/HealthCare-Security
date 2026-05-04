import { useState } from 'react';
import { Users, Plus, X, AlertCircle, CheckCircle } from 'lucide-react';
import { registerUser } from '../utils/auth';
import { getAllCredentials } from '../utils/indexedDB';

interface User {
  username: string;
  email: string;
  role: 'admin' | 'doctor' | 'security_officer';
  fullName: string;
  createdAt?: number;
}

export default function AdminUserManagement() {
  const [showModal, setShowModal] = useState(false);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState<User>({
    username: '',
    email: '',
    role: 'doctor',
    fullName: '',
  });

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const loadUsers = async () => {
    try {
      const users = await getAllCredentials();
      setUsersList(users);
    } catch (err: any) {
      setMessage({ type: 'error', text: 'Failed to load users' });
    }
  };

  const handleOpenModal = async () => {
    await loadUsers();
    setShowModal(true);
    setFormData({ username: '', email: '', role: 'doctor', fullName: '' });
    setPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Validation
    if (!formData.username || !formData.email || !formData.fullName || !password) {
      setMessage({ type: 'error', text: 'All fields are required' });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      setLoading(false);
      return;
    }

    try {
      const result = await registerUser({
        username: formData.username,
        email: formData.email,
        password,
        role: formData.role,
        fullName: formData.fullName,
      });

      if (result.success) {
        setMessage({ type: 'success', text: 'User registered successfully' });
        await loadUsers();
        setTimeout(() => {
          setFormData({ username: '', email: '', role: 'doctor', fullName: '' });
          setPassword('');
          setConfirmPassword('');
        }, 1000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Registration failed' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err?.message || 'Unexpected error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* User Management Button */}
      <button
        onClick={handleOpenModal}
        className="flex items-center gap-2 px-4 py-2 bg-[#1A5FB4] text-white rounded-lg hover:bg-[#1A5FB4]/90 transition-all"
      >
        <Users className="w-4 h-4" />
        Manage Users
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#E9EBEF]">
              <h2 className="text-2xl font-bold text-[#1E1E1E]">User Management</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#717182] hover:text-[#1E1E1E]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Register New User Form */}
              <div className="bg-[#F6F5F4] rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-[#1E1E1E]">Register New User</h3>

                {message && (
                  <div
                    className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
                      message.type === 'success'
                        ? 'bg-[#26A269]/10 border border-[#26A269]/20'
                        : 'bg-[#C01C28]/10 border border-[#C01C28]/20'
                    }`}
                  >
                    {message.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-[#26A269]" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-[#C01C28]" />
                    )}
                    <p
                      className={`text-sm font-semibold ${
                        message.type === 'success' ? 'text-[#26A269]' : 'text-[#C01C28]'
                      }`}
                    >
                      {message.text}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#1E1E1E]">Username</label>
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        placeholder="john_doe"
                        className="w-full px-3 py-2 border border-[#E9EBEF] rounded-lg focus:border-[#1A5FB4] focus:ring-2 focus:ring-[#1A5FB4]/20 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#1E1E1E]">Full Name</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-3 py-2 border border-[#E9EBEF] rounded-lg focus:border-[#1A5FB4] focus:ring-2 focus:ring-[#1A5FB4]/20 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#1E1E1E]">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-3 py-2 border border-[#E9EBEF] rounded-lg focus:border-[#1A5FB4] focus:ring-2 focus:ring-[#1A5FB4]/20 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#1E1E1E]">Role</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                        className="w-full px-3 py-2 border border-[#E9EBEF] rounded-lg focus:border-[#1A5FB4] focus:ring-2 focus:ring-[#1A5FB4]/20 focus:outline-none"
                      >
                        <option value="admin">Admin</option>
                        <option value="doctor">Doctor</option>
                        <option value="security_officer">Security Officer</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#1E1E1E]">Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3 py-2 border border-[#E9EBEF] rounded-lg focus:border-[#1A5FB4] focus:ring-2 focus:ring-[#1A5FB4]/20 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#1E1E1E]">Confirm Password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3 py-2 border border-[#E9EBEF] rounded-lg focus:border-[#1A5FB4] focus:ring-2 focus:ring-[#1A5FB4]/20 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-[#26A269] text-white rounded-lg hover:bg-[#26A269]/90 disabled:opacity-50 font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    {loading ? 'Registering...' : 'Register User'}
                  </button>
                </form>
              </div>

              {/* Users List */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-[#1E1E1E]">Registered Users ({usersList.length})</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {usersList.length === 0 ? (
                    <p className="text-sm text-[#717182]">No users registered yet</p>
                  ) : (
                    usersList.map((user, idx) => (
                      <div key={idx} className="p-3 bg-[#F6F5F4] rounded-lg border border-[#E9EBEF]">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold text-[#1E1E1E]">{user.fullName}</p>
                            <p className="text-sm text-[#717182]">@{user.username}</p>
                            <p className="text-xs text-[#717182]">{user.email}</p>
                          </div>
                          <span className="px-2 py-1 text-xs font-semibold rounded bg-[#1A5FB4]/10 text-[#1A5FB4]">
                            {user.role}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
