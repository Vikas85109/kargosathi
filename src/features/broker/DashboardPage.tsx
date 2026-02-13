import { Link } from 'react-router-dom';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import StatCard from '../../components/StatCard';
import { useAuth } from '../../context/AuthContext';
import { useBroker } from '../../context/BrokerContext';
import { dashboardStats, chartData, mockLoads, mockTrucks } from '../../mock/data';

const loadBadge: Record<string, string> = {
  delivered: 'bg-emerald-50 text-emerald-700',
  in_transit: 'bg-blue-50 text-blue-700',
  booked: 'bg-amber-50 text-amber-700',
};

const truckBadge: Record<string, string> = {
  active: 'bg-emerald-50 text-emerald-700',
  idle: 'bg-amber-50 text-amber-700',
  maintenance: 'bg-red-50 text-red-700',
};

const pieData = [
  { name: 'Delivered', value: mockLoads.filter(l => l.status === 'delivered').length, color: '#10b981' },
  { name: 'In Transit', value: mockLoads.filter(l => l.status === 'in_transit').length, color: '#3b82f6' },
  { name: 'Booked', value: mockLoads.filter(l => l.status === 'booked').length, color: '#f59e0b' },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const { applications } = useBroker();
  const app = applications.find((a) => a.phone === user?.phone);

  const commLabel: Record<string, string> = { per_load: 'Per Load', monthly: 'Monthly Fixed', hybrid: 'Hybrid' };

  return (
    <div>
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 mb-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold">Welcome back, {user?.name ?? 'Broker'}!</h1>
            {app && (
              <p className="text-blue-100 text-sm mt-1">
                {app.companyName} &middot; {app.city} &middot; GST: {app.gst}
              </p>
            )}
            <p className="text-blue-200 text-xs mt-2">Last login: {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          {app && (
            <div className="flex gap-3">
              <div className="bg-white/15 backdrop-blur rounded-lg px-4 py-2 text-center">
                <p className="text-2xl font-bold">{app.routes?.length ?? 0}</p>
                <p className="text-xs text-blue-200">Routes</p>
              </div>
              <div className="bg-white/15 backdrop-blur rounded-lg px-4 py-2 text-center">
                <p className="text-2xl font-bold">{app.truckTypes?.length ?? 0}</p>
                <p className="text-xs text-blue-200">Truck Types</p>
              </div>
              <div className="bg-white/15 backdrop-blur rounded-lg px-4 py-2 text-center">
                <p className="text-2xl font-bold">{app.commissionPercent ? `${app.commissionPercent}%` : '—'}</p>
                <p className="text-xs text-blue-200">Commission</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={'\uD83D\uDCE6'} label="Total Loads" value={dashboardStats.totalLoads} color="blue" />
        <StatCard icon={'\uD83D\uDE9B'} label="Active Trucks" value={dashboardStats.activeTrucks} color="emerald" />
        <StatCard icon={'\uD83D\uDCB0'} label="Total Earnings" value={dashboardStats.totalEarnings} color="amber" prefix={'\u20B9'} />
        <StatCard icon={'\u23F3'} label="Pending Payments" value={dashboardStats.pendingPayments} color="rose" prefix={'\u20B9'} />
      </div>

      {/* Broker Profile Quick Info */}
      {app && (
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Business Info</p>
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Type</span>
                <span className="font-medium text-slate-700">{app.businessType}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Experience</span>
                <span className="font-medium text-slate-700">{app.experience} yrs</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">PAN</span>
                <span className="font-medium text-slate-700">{app.pan}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Commission</p>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-3xl font-bold text-blue-600">{app.commissionPercent}%</span>
              <span className="text-sm text-slate-500 pb-1">{commLabel[app.commissionType] ?? app.commissionType}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(Number(app.commissionPercent) / 15) * 100}%` }} />
            </div>
            <p className="text-xs text-slate-400 mt-1">Max: 15%</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Bank Account</p>
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Holder</span>
                <span className="font-medium text-slate-700">{app.accountName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">A/C No.</span>
                <span className="font-medium text-slate-700">****{app.accountNumber?.slice(-4)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">IFSC</span>
                <span className="font-medium text-slate-700">{app.ifsc}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Earnings Trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="earnGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(v) => `\u20B9${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => [`\u20B9${v.toLocaleString('en-IN')}`, 'Earnings']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
              <Area type="monotone" dataKey="earnings" stroke="#3b82f6" fill="url(#earnGrad)" strokeWidth={2.5} dot={{ r: 4, fill: '#3b82f6' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Load Status</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                {pieData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-xs text-slate-500">{d.name} ({d.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loads Per Month Bar Chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm mb-6">
        <h3 className="font-semibold text-slate-800 mb-4">Loads Per Month</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
            <Bar dataKey="loads" fill="#10b981" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Operating Routes */}
      {app && app.routes && app.routes.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm mb-6">
          <h3 className="font-semibold text-slate-800 mb-3">Your Active Routes</h3>
          <div className="flex flex-wrap gap-2">
            {app.routes.map((r) => (
              <span key={r} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100">{r}</span>
            ))}
          </div>
        </div>
      )}

      {/* Recent Loads + Active Trucks side by side */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Loads */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Recent Loads</h2>
            <Link to="/loads" className="text-xs text-blue-600 hover:underline font-medium">View All</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {mockLoads.slice(0, 5).map((l) => (
              <div key={l.id} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">{l.from} → {l.to}</p>
                  <p className="text-xs text-slate-400">{l.id} &middot; {l.weight} &middot; {l.truck}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-800">{'\u20B9'}{l.amount.toLocaleString('en-IN')}</p>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${loadBadge[l.status]}`}>
                    {l.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Trucks */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Fleet Status</h2>
            <Link to="/trucks" className="text-xs text-blue-600 hover:underline font-medium">View All</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {mockTrucks.slice(0, 5).map((t) => (
              <div key={t.id} className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-sm">{'\uD83D\uDE9B'}</div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">{t.number}</p>
                    <p className="text-xs text-slate-400">{t.type} &middot; {t.capacity} &middot; {t.driver}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${truckBadge[t.status]}`}>
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
