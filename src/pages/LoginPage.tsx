import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types';
import {
  Briefcase, PackageSearch, Truck, UserCircle, ShieldCheck,
  ArrowRight, Zap,
} from 'lucide-react';

const roles: { role: UserRole; label: string; desc: string; icon: React.ReactNode; color: string; bg: string }[] = [
  {
    role: 'broker',
    label: 'Broker',
    desc: 'Manage loads, assign trucks, track trips and handle invoices',
    icon: <Briefcase size={28} />,
    color: 'text-blue-600',
    bg: 'bg-blue-50 hover:bg-blue-100 border-blue-200 hover:border-blue-300',
  },
  {
    role: 'shipper',
    label: 'Shipper',
    desc: 'Post shipments, track deliveries and manage payments',
    icon: <PackageSearch size={28} />,
    color: 'text-violet-600',
    bg: 'bg-violet-50 hover:bg-violet-100 border-violet-200 hover:border-violet-300',
  },
  {
    role: 'transporter',
    label: 'Transporter',
    desc: 'Manage fleet, bid on loads and track earnings',
    icon: <Truck size={28} />,
    color: 'text-teal-600',
    bg: 'bg-teal-50 hover:bg-teal-100 border-teal-200 hover:border-teal-300',
  },
  {
    role: 'driver',
    label: 'Driver',
    desc: 'View trips, update status and upload proof of delivery',
    icon: <UserCircle size={28} />,
    color: 'text-orange-600',
    bg: 'bg-orange-50 hover:bg-orange-100 border-orange-200 hover:border-orange-300',
  },
  {
    role: 'admin',
    label: 'Admin',
    desc: 'Approve users, review KYC, manage platform disputes',
    icon: <ShieldCheck size={28} />,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 hover:border-indigo-300',
  },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const enter = (role: UserRole) => {
    login(role);
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="text-center pt-12 pb-8 px-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Zap size={26} className="text-white" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Kargo<span className="text-blue-400">Sathi</span>
        </h1>
        <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-md mx-auto">
          India's smart transport broker platform — connecting shippers, transporters, and drivers
        </p>
      </div>

      {/* Role cards */}
      <div className="flex-1 flex items-start justify-center px-4 pb-12">
        <div className="w-full max-w-4xl">
          <p className="text-center text-slate-500 text-xs font-medium uppercase tracking-widest mb-6">
            Select a role to explore the platform
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((r, i) => (
              <button
                key={r.role}
                onClick={() => enter(r.role)}
                className={`group text-left p-5 rounded-2xl border transition-all duration-200 ${r.bg} animate-slide-up`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`${r.color} mb-3`}>{r.icon}</div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">{r.label}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{r.desc}</p>
                <div className={`flex items-center gap-1.5 text-xs font-semibold ${r.color}`}>
                  <span>Enter Dashboard</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>

          <p className="text-center text-slate-600 text-xs mt-8">
            Demo Mode — No authentication required · Mock data only
          </p>
        </div>
      </div>
    </div>
  );
}
