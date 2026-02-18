import { NavLink } from 'react-router-dom';
import type { UserRole, NavItem } from '../types';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, PlusCircle, Package, Truck, MapPin, FileText, BarChart3,
  ShoppingCart, Route, IndianRupee, Users, ShieldCheck, AlertTriangle,
  Camera, LogOut, X,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  dashboard: <LayoutDashboard size={18} />,
  'create-load': <PlusCircle size={18} />,
  loads: <Package size={18} />,
  'assign-truck': <Truck size={18} />,
  tracking: <MapPin size={18} />,
  invoices: <FileText size={18} />,
  reports: <BarChart3 size={18} />,
  'create-shipment': <PlusCircle size={18} />,
  'my-loads': <Package size={18} />,
  track: <MapPin size={18} />,
  fleet: <Truck size={18} />,
  'add-truck': <PlusCircle size={18} />,
  marketplace: <ShoppingCart size={18} />,
  trips: <Route size={18} />,
  earnings: <IndianRupee size={18} />,
  'trip-list': <Route size={18} />,
  'pod-upload': <Camera size={18} />,
  users: <Users size={18} />,
  kyc: <ShieldCheck size={18} />,
  disputes: <AlertTriangle size={18} />,
  metrics: <BarChart3 size={18} />,
};

const roleColors: Record<UserRole, string> = {
  broker: 'bg-blue-600',
  shipper: 'bg-violet-600',
  transporter: 'bg-teal-600',
  driver: 'bg-orange-500',
  admin: 'bg-indigo-600',
};

interface Props {
  items: NavItem[];
  role: UserRole;
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ items, role, open, onClose }: Props) {
  const { logout } = useAuth();
  const roleName = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col transform transition-transform duration-200 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="px-5 py-5 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg ${roleColors[role]} flex items-center justify-center font-bold text-sm`}>
                KS
              </div>
              <div>
                <p className="font-bold text-sm">KargoSathi</p>
                <p className="text-[11px] text-slate-400">{roleName} Panel</p>
              </div>
            </div>
            <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {items.map((item) => {
            const iconKey = item.path.split('/').pop() ?? 'dashboard';
            const icon = iconMap[iconKey] ?? iconMap.dashboard;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === `/${role}`}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {icon}
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 pb-4">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-white/5 transition-all w-full"
          >
            <LogOut size={18} />
            <span>Switch Role</span>
          </button>
        </div>
      </aside>
    </>
  );
}
