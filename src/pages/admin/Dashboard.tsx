import { Users, Truck, Package, AlertTriangle, IndianRupee, ShieldCheck, BarChart3, TrendingUp } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import MetricCard from '../../components/MetricCard';
import { users, loads, trucks, trips, disputes, chartData } from '../../mock/data';

const COLORS = ['#2563eb', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

const userRoleCounts = [
  { name: 'Brokers', value: users.filter((u) => u.role === 'broker').length },
  { name: 'Shippers', value: users.filter((u) => u.role === 'shipper').length },
  { name: 'Transporters', value: users.filter((u) => u.role === 'transporter').length },
  { name: 'Drivers', value: users.filter((u) => u.role === 'driver').length },
  { name: 'Admins', value: users.filter((u) => u.role === 'admin').length },
];

export default function AdminDashboard() {
  const pendingUsers = users.filter((u) => u.status === 'pending').length;
  const openDisputes = disputes.filter((d) => d.status === 'open' || d.status === 'investigating').length;
  const totalRevenue = loads.reduce((s, l) => s + l.rate, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Platform overview and key metrics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Users" value={users.length} icon={<Users size={20} />} color="indigo" trend={`${pendingUsers} pending`} />
        <MetricCard label="Total Loads" value={loads.length} icon={<Package size={20} />} color="blue" trend="+15% this month" trendUp />
        <MetricCard label="Platform Revenue" value={`₹${(totalRevenue / 100000).toFixed(1)}L`} icon={<IndianRupee size={20} />} color="emerald" trend="+22% growth" trendUp />
        <MetricCard label="Open Disputes" value={openDisputes} icon={<AlertTriangle size={20} />} color="red" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Active Trucks" value={trucks.filter((t) => t.status !== 'inactive').length} icon={<Truck size={20} />} color="cyan" />
        <MetricCard label="Active Trips" value={trips.filter((t) => t.status !== 'completed').length} icon={<TrendingUp size={20} />} color="violet" />
        <MetricCard label="KYC Verified" value={users.filter((u) => u.kycStatus === 'verified').length} icon={<ShieldCheck size={20} />} color="emerald" />
        <MetricCard label="Completed Trips" value={trips.filter((t) => t.status === 'completed').length} icon={<BarChart3 size={20} />} color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Platform Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip formatter={(v: number) => `₹${v.toLocaleString('en-IN')}`} />
              <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">User Distribution</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={userRoleCounts} cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {userRoleCounts.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 lg:col-span-2">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Monthly Activity</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="loads" fill="#2563eb" radius={[4, 4, 0, 0]} name="Loads" />
              <Bar dataKey="trips" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Trips" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
