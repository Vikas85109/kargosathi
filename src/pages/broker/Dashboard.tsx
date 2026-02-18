import { Package, Truck, IndianRupee, Route, TrendingUp, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import MetricCard from '../../components/MetricCard';
import StatusBadge from '../../components/StatusBadge';
import { loads, trips, chartData } from '../../mock/data';

export default function BrokerDashboard() {
  const activeTrips = trips.filter((t) => t.status === 'in_transit' || t.status === 'pickup');
  const recentLoads = loads.slice(0, 5);
  const totalRevenue = loads.filter((l) => l.status === 'delivered').reduce((s, l) => s + l.rate, 0);
  const totalCommission = loads.filter((l) => l.status === 'delivered').reduce((s, l) => s + l.brokerCommission, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Broker Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Overview of your brokerage operations</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Loads" value={loads.length} icon={<Package size={20} />} color="blue" trend="+12% this month" trendUp />
        <MetricCard label="Active Trips" value={activeTrips.length} icon={<Route size={20} />} color="violet" />
        <MetricCard label="Total Revenue" value={`₹${(totalRevenue / 100000).toFixed(1)}L`} icon={<IndianRupee size={20} />} color="emerald" trend="+18% this month" trendUp />
        <MetricCard label="Commission Earned" value={`₹${totalCommission.toLocaleString('en-IN')}`} icon={<TrendingUp size={20} />} color="amber" trend="+8% this month" trendUp />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip formatter={(v: number) => [`₹${v.toLocaleString('en-IN')}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#2563eb" fill="#dbeafe" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Monthly Loads & Trips</h3>
          <ResponsiveContainer width="100%" height={240}>
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

      {/* Recent loads + Active trips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Recent Loads</h3>
          <div className="space-y-3">
            {recentLoads.map((l) => (
              <div key={l.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-800">{l.origin} → {l.destination}</p>
                  <p className="text-xs text-slate-500">{l.material} · {l.weight}</p>
                </div>
                <div className="text-right">
                  <StatusBadge status={l.status} />
                  <p className="text-xs text-slate-500 mt-1">₹{l.rate.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Active Trips</h3>
          {activeTrips.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-8">No active trips</p>
          ) : (
            <div className="space-y-3">
              {activeTrips.map((t) => (
                <div key={t.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                      <Truck size={16} className="text-violet-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{t.origin} → {t.destination}</p>
                      <p className="text-xs text-slate-500">{t.truckNumber} · {t.driverName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={14} className="text-blue-500 animate-pulse-dot" />
                    <span className="text-xs font-medium text-slate-600">{t.currentLocation}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
