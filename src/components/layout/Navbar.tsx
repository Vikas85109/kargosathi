import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu, X, Moon, Sun, Truck, Bell, Search, ChevronDown,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { toggleTheme } from '@/redux/themeSlice';
import { markAllRead } from '@/redux/notificationSlice';
import { ButtonLink } from '@/components/common/Button';
import { cx } from '@/utils';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/transporters', label: 'Transporters' },
  { to: '/truck-owners', label: 'Truck Owners' },
  { to: '/fare-calculator', label: 'Fare Calculator' },
  { to: '/tracking', label: 'Live Tracking' },
  { to: '/enquiry', label: 'Enquiry' },
  { to: '/invoices', label: 'Invoices' },
  { to: '/contact', label: 'Contact Us' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.theme.mode);
  const notifs = useAppSelector((s) => s.notifications.items);
  const unread = notifs.filter((n) => !n.read).length;
  const location = useLocation();
  const navigate = useNavigate();
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/tracking?q=${encodeURIComponent(search.trim())}`);
    setSearch('');
  };

  return (
    <header
      className={cx(
        'sticky top-0 z-40 transition-all duration-300',
        scrolled
          ? 'glass shadow-md'
          : 'bg-white dark:bg-slate-950 border-b border-slate-200/70 dark:border-slate-800'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-8 h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-500 text-white shadow-lg shadow-brand-700/30">
            <Truck size={22} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
              Kargo<span className="text-accent-500">Sathi</span>
            </span>
            <span className="text-[10px] font-medium text-slate-400 hidden 2xl:block">Smart Logistics Network</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden xl:flex items-center gap-0.5">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cx(
                  'px-2 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap transition-colors',
                  isActive
                    ? 'text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-500/10'
                    : 'text-slate-600 dark:text-slate-300 hover:text-brand-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          {/* Global search */}
          <form onSubmit={onSearch} className="hidden 2xl:flex items-center relative">
            <Search size={15} className="absolute left-3 text-slate-400 pointer-events-none" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Track shipment…"
              className="w-36 focus:w-48 transition-all rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-800 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </form>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen((o) => !o)}
              className="relative p-2.5 rounded-lg text-slate-500 hover:text-brand-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition"
              aria-label="Notifications"
            >
              <Bell size={18} />
              {unread > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent-500 text-[9px] font-bold text-white">
                  {unread}
                </span>
              )}
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 animate-fade-in rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-slate-800 dark:text-white">Notifications</span>
                  <button onClick={() => dispatch(markAllRead())} className="text-xs font-semibold text-brand-600 hover:underline">
                    Mark all read
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                  {notifs.map((n) => (
                    <div key={n.id} className={cx('px-4 py-3 flex gap-3', !n.read && 'bg-brand-50/50 dark:bg-brand-500/5')}>
                      <span className={cx('mt-1 h-2 w-2 shrink-0 rounded-full', n.type === 'success' ? 'bg-success-500' : n.type === 'warning' ? 'bg-amber-500' : 'bg-brand-500')} />
                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{n.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{n.message}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2.5 rounded-lg text-slate-500 hover:text-brand-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <ButtonLink to="/dashboard" size="sm" className="hidden md:inline-flex">
            Dashboard
          </ButtonLink>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="xl:hidden p-2.5 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="xl:hidden animate-slide-up border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cx(
                    'flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium',
                    isActive ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  )
                }
              >
                {item.label}
                <ChevronDown size={14} className="-rotate-90 opacity-40" />
              </NavLink>
            ))}
            <ButtonLink to="/dashboard" className="w-full mt-3">Go to Dashboard</ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}
