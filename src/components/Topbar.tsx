import { useState } from 'react';
import { Bell, Menu, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { notifications } from '../mock/data';

interface Props {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: Props) {
  const { userName, role } = useAuth();
  const [showNotif, setShowNotif] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

  const roleLabel = role ? role.charAt(0).toUpperCase() + role.slice(1) : '';

  const roleBadgeColor: Record<string, string> = {
    broker: 'bg-blue-100 text-blue-700',
    shipper: 'bg-violet-100 text-violet-700',
    transporter: 'bg-teal-100 text-teal-700',
    driver: 'bg-orange-100 text-orange-700',
    admin: 'bg-indigo-100 text-indigo-700',
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 shrink-0">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500">
          <Menu size={20} />
        </button>
        <div className="hidden sm:flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2 w-64">
          <Search size={16} className="text-slate-400" />
          <input type="text" placeholder="Search..." className="bg-transparent text-sm outline-none flex-1 text-slate-600 placeholder:text-slate-400" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 relative"
          >
            <Bell size={19} />
            {unread > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>

          {showNotif && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotif(false)} />
              <div className="absolute right-0 top-11 w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-semibold text-slate-800">Notifications</p>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
                  {notifications.slice(0, 6).map((n) => (
                    <div key={n.id} className={`px-4 py-3 hover:bg-slate-50 ${!n.read ? 'bg-blue-50/30' : ''}`}>
                      <p className="text-sm font-medium text-slate-800">{n.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{n.message}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{n.timestamp}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* User info */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">{userName}</p>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${roleBadgeColor[role ?? ''] ?? ''}`}>
              {roleLabel}
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-700 to-slate-500 flex items-center justify-center text-white text-sm font-bold">
            {userName.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
}
