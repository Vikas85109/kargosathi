import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginAdmin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginAdmin(username, password);
      toast('success', 'Welcome, Admin!');
      navigate('/admin/dashboard');
    } catch {
      setError('Invalid credentials. Use admin / admin');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/welcome" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold text-xs">KS</div>
            <span className="font-bold text-slate-800">KargoSathi</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Admin Login</h1>
          <p className="text-sm text-slate-500">Access the admin panel</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-user" className="block text-sm font-medium text-slate-700 mb-1">Username</label>
              <input id="admin-user" value={username} onChange={(e) => { setUsername(e.target.value); setError(''); }}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm" placeholder="Enter username" />
            </div>
            <div>
              <label htmlFor="admin-pass" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input id="admin-pass" type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm" placeholder="Enter password" />
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
            <div className="bg-violet-50 border border-violet-200 rounded-lg p-3">
              <p className="text-xs text-violet-700 text-center">Demo: <span className="font-bold">admin</span> / <span className="font-bold">admin</span></p>
            </div>
            <button type="submit" className="w-full py-2.5 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors">Login</button>
          </form>
        </div>
        <p className="text-center text-sm text-slate-500 mt-4"><Link to="/welcome" className="text-violet-600 font-medium hover:underline">Back to Home</Link></p>
      </div>
    </div>
  );
}
