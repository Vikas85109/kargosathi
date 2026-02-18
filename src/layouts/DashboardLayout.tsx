import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import type { UserRole, NavItem } from '../types';

const navConfig: Record<UserRole, NavItem[]> = {
  broker: [
    { label: 'Dashboard', path: '/broker', icon: 'dashboard' },
    { label: 'Create Load', path: '/broker/create-load', icon: 'create-load' },
    { label: 'Load List', path: '/broker/loads', icon: 'loads' },
    { label: 'Assign Truck', path: '/broker/assign-truck', icon: 'assign-truck' },
    { label: 'Trip Tracking', path: '/broker/tracking', icon: 'tracking' },
    { label: 'Invoices', path: '/broker/invoices', icon: 'invoices' },
    { label: 'Reports', path: '/broker/reports', icon: 'reports' },
  ],
  shipper: [
    { label: 'Dashboard', path: '/shipper', icon: 'dashboard' },
    { label: 'My Loads', path: '/shipper/loads', icon: 'my-loads' },
    { label: 'Track Shipment', path: '/shipper/track', icon: 'track' },
    { label: 'Invoices', path: '/shipper/invoices', icon: 'invoices' },
  ],
  transporter: [
    { label: 'Fleet', path: '/transporter', icon: 'fleet' },
    { label: 'Add Truck', path: '/transporter/add-truck', icon: 'add-truck' },
    { label: 'Marketplace', path: '/transporter/marketplace', icon: 'marketplace' },
    { label: 'My Trips', path: '/transporter/trips', icon: 'trips' },
    { label: 'Earnings', path: '/transporter/earnings', icon: 'earnings' },
  ],
  driver: [
    { label: 'My Trips', path: '/driver', icon: 'trip-list' },
    { label: 'POD Upload', path: '/driver/pod-upload', icon: 'pod-upload' },
  ],
  admin: [
    { label: 'Dashboard', path: '/admin', icon: 'dashboard' },
    { label: 'User Approval', path: '/admin/users', icon: 'users' },
    { label: 'KYC Review', path: '/admin/kyc', icon: 'kyc' },
    { label: 'Disputes', path: '/admin/disputes', icon: 'disputes' },
  ],
};

interface Props {
  role: UserRole;
}

export default function DashboardLayout({ role }: Props) {
  const { isAuthenticated, role: userRole } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated || userRole !== role) {
    return <Navigate to="/" replace />;
  }

  const items = navConfig[role];

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar items={items} role={role} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
