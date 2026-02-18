import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { chartData, loads } from '../../mock/data';

const COLORS = ['#2563eb', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

const statusCounts = [
  { name: 'Posted', value: loads.filter((l) => l.status === 'posted').length },
  { name: 'Assigned', value: loads.filter((l) => l.status === 'assigned').length },
  { name: 'In Transit', value: loads.filter((l) => l.status === 'in_transit').length },
  { name: 'Delivered', value: loads.filter((l) => l.status === 'delivered').length },
  { name: 'Cancelled', value: loads.filter((l) => l.status === 'cancelled').length },
];

const commissionData = chartData.map((d) => ({
  month: d.month,
  commission: Math.round(d.revenue * 0.05),
  revenue: d.revenue,
}));

export default function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Reports & Analytics</h1>
        <p className="text-sm text-slate-500 mt-1">Business performance overview</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Loads', value: loads.length, color: 'text-blue-600' },
          { label: 'Delivered', value: loads.filter((l) => l.status === 'delivered').length, color: 'text-emerald-600' },
          { label: 'Revenue', value: `₹${(loads.reduce((s, l) => s + l.rate, 0) / 100000).toFixed(1)}L`, color: 'text-violet-600' },
          { label: 'Avg Rate', value: `₹${Math.round(loads.reduce((s, l) => s + l.rate, 0) / loads.length).toLocaleString('en-IN')}`, color: 'text-amber-600' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500">{s.label}</p>
            <p className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Revenue trend */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Revenue vs Commission</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={commissionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip formatter={(v: number) => `₹${v.toLocaleString('en-IN')}`} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} name="Revenue" />
              <Line type="monotone" dataKey="commission" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} name="Commission" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Load status distribution */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Load Status Distribution</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={statusCounts} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {statusCounts.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly trips */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Monthly Trip Volume</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="trips" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Trips" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue area */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Cumulative Growth</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip />
              <Area type="monotone" dataKey="loads" stroke="#f59e0b" fill="#fef3c7" strokeWidth={2} name="Loads" />
              <Area type="monotone" dataKey="trips" stroke="#2563eb" fill="#dbeafe" strokeWidth={2} name="Trips" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
