import { IndianRupee, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import MetricCard from '../../components/MetricCard';
import StatusBadge from '../../components/StatusBadge';
import { payments, invoices, chartData } from '../../mock/data';

export default function Earnings() {
  const totalEarned = payments.filter((p) => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
  const pendingAmount = payments.filter((p) => p.status === 'pending').reduce((s, p) => s + p.amount, 0);
  const processingAmount = payments.filter((p) => p.status === 'processing').reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Earnings</h1>
        <p className="text-sm text-slate-500 mt-1">Your financial overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Earned" value={`₹${(totalEarned / 100000).toFixed(1)}L`} icon={<IndianRupee size={20} />} color="emerald" trend="+22% vs last month" trendUp />
        <MetricCard label="Pending" value={`₹${pendingAmount.toLocaleString('en-IN')}`} icon={<Clock size={20} />} color="amber" />
        <MetricCard label="Processing" value={`₹${processingAmount.toLocaleString('en-IN')}`} icon={<TrendingUp size={20} />} color="blue" />
        <MetricCard label="Completed Payments" value={payments.filter((p) => p.status === 'paid').length} icon={<CheckCircle2 size={20} />} color="cyan" />
      </div>

      {/* Earnings chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Earnings Trend</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickFormatter={(v) => `₹${v / 1000}k`} />
            <Tooltip formatter={(v: number) => [`₹${v.toLocaleString('en-IN')}`, 'Revenue']} />
            <Area type="monotone" dataKey="revenue" stroke="#0d9488" fill="#ccfbf1" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Payment history */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-800">Payment History</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {payments.map((p) => {
            const inv = invoices.find((i) => i.id === p.invoiceId);
            return (
              <div key={p.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-slate-800">{p.id} — {inv?.from} → {inv?.to}</p>
                  <p className="text-xs text-slate-500">{p.method} · {p.reference || 'Awaiting payment'}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-slate-800">₹{p.amount.toLocaleString('en-IN')}</span>
                  <StatusBadge status={p.status} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
