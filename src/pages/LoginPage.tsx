import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBroker } from '../context/BrokerContext';
import { useToast } from '../context/ToastContext';

export default function LoginPage() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const { loginBroker } = useAuth();
  const { getAppByPhone } = useBroker();
  const { toast } = useToast();
  const navigate = useNavigate();

  const sendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phone)) { setError('Phone must be 10 digits'); return; }
    setError('');
    setStep('otp');
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== '1234') { setError('Invalid OTP. Use 1234'); return; }

    const app = getAppByPhone(phone);
    const name = app?.name ?? 'Broker';
    await loginBroker(phone, name);
    toast('success', `Welcome back, ${name}!`);

    if (app?.status === 'approved') navigate('/dashboard');
    else if (app) navigate('/status');
    else navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/welcome" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">KS</div>
            <span className="font-bold text-slate-800">KargoSathi</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Welcome Back</h1>
          <p className="text-sm text-slate-500">Login with your registered mobile</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          {step === 'phone' ? (
            <form onSubmit={sendOtp} className="space-y-4">
              <div>
                <label htmlFor="login-phone" className="block text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg text-sm text-slate-500">+91</span>
                  <input id="login-phone" value={phone} onChange={(e) => { setPhone(e.target.value); setError(''); }}
                    maxLength={10} placeholder="Enter 10 digit number"
                    className="flex-1 px-3 py-2.5 border border-slate-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
                </div>
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
              </div>
              <button type="submit" className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">Send OTP</button>
            </form>
          ) : (
            <form onSubmit={verifyOtp} className="space-y-4">
              <div className="text-center mb-2">
                <p className="text-sm text-slate-600">OTP sent to <span className="font-semibold">+91 {phone}</span></p>
                <button type="button" onClick={() => setStep('phone')} className="text-xs text-blue-600 hover:underline mt-1">Change number</button>
              </div>
              <div>
                <label htmlFor="login-otp" className="block text-sm font-medium text-slate-700 mb-1">Enter OTP</label>
                <input id="login-otp" value={otp} onChange={(e) => { setOtp(e.target.value); setError(''); }}
                  maxLength={4} placeholder="Enter 4 digit OTP"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-center tracking-[0.5em] text-lg font-mono" />
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-700 text-center">Demo OTP: <span className="font-bold">1234</span></p>
              </div>
              <button type="submit" className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">Login</button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-slate-500 mt-4">
          New broker? <Link to="/register" className="text-blue-600 font-medium hover:underline">Register Now</Link>
        </p>
      </div>
    </div>
  );
}
