import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function RegisterPage() {
  const [step, setStep] = useState<'phone' | 'otp' | 'name'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { loginBroker } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const sendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phone)) { setError('Phone must be 10 digits'); return; }
    setError('');
    toast('info', 'OTP sent to +91 ' + phone);
    setStep('otp');
  };

  const verifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== '1234') { setError('Invalid OTP. Use 1234'); return; }
    setError('');
    toast('success', 'Phone verified!');
    setStep('name');
  };

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError('Name is required'); return; }
    await loginBroker(phone, name.trim());
    toast('success', 'Welcome to KargoSathi!');
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/welcome" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">KS</div>
            <span className="font-bold text-slate-800">KargoSathi</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Create Your Account</h1>
          <p className="text-sm text-slate-500">Register as a new broker</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          {step === 'phone' && (
            <form onSubmit={sendOtp} className="space-y-4">
              <div>
                <label htmlFor="reg-phone" className="block text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg text-sm text-slate-500">+91</span>
                  <input id="reg-phone" value={phone} onChange={(e) => { setPhone(e.target.value); setError(''); }}
                    maxLength={10} placeholder="Enter 10 digit number"
                    className="flex-1 px-3 py-2.5 border border-slate-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
                </div>
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
              </div>
              <button type="submit" className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">Send OTP</button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={verifyOtp} className="space-y-4">
              <div className="text-center mb-2">
                <p className="text-sm text-slate-600">OTP sent to <span className="font-semibold">+91 {phone}</span></p>
                <button type="button" onClick={() => setStep('phone')} className="text-xs text-blue-600 hover:underline mt-1">Change number</button>
              </div>
              <div>
                <label htmlFor="reg-otp" className="block text-sm font-medium text-slate-700 mb-1">Enter OTP</label>
                <input id="reg-otp" value={otp} onChange={(e) => { setOtp(e.target.value); setError(''); }}
                  maxLength={4} placeholder="Enter 4 digit OTP"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-center tracking-[0.5em] text-lg font-mono" />
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-700 text-center">Demo OTP: <span className="font-bold">1234</span></p>
              </div>
              <button type="submit" className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">Verify OTP</button>
            </form>
          )}

          {step === 'name' && (
            <form onSubmit={register} className="space-y-4">
              <div className="text-center mb-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm text-slate-600">Phone verified successfully!</p>
              </div>
              <div>
                <label htmlFor="reg-name" className="block text-sm font-medium text-slate-700 mb-1">Your Full Name</label>
                <input id="reg-name" value={name} onChange={(e) => { setName(e.target.value); setError(''); }}
                  placeholder="Enter your full name"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
              </div>
              <button type="submit" className="w-full py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors">Continue to Onboarding</button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-slate-500 mt-4">
          Already registered? <Link to="/login" className="text-blue-600 font-medium hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
