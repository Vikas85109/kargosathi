import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {
  Package, Truck, IndianRupee, Clock, Building2, Users, CheckCircle2, TrendingUp, ArrowUpRight, ArrowDownRight,
} from 'lucide-react';
import { Container, SectionHeading } from '@/components/common/Section';
import { Card } from '@/components/common/Card';
import { StatusBadge } from '@/components/common/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import {
  monthlyRevenue, shipmentTrends, stateWiseBookings, truckUtilization,
  bookings, invoices, transporters, truckOwners,
} from '@/data';
import { formatINR, formatINRShort } from '@/utils';

const PIE_COLORS = ['#0f4c81', '#ff6b35', '#22c55e'];

const activeShipments = bookings.filter((b) => ['In Transit', 'Near Destination', 'Pickup Completed', 'Vehicle Assigned'].includes(b.status)).length;
const delivered = bookings.filter((b) => b.status === 'Delivered').length;
const revenue = invoices.reduce((s, i) => s + i.total, 0);
const pending = invoices.filter((i) => i.status !== 'Paid').reduce((s, i) => s + i.total, 0);

const kpis = [
  { label: 'Total Bookings', value: '1,248', delta: '+12.5%', up: true, icon: Package, tone: 'text-brand-600 bg-brand-50 dark:bg-brand-500/10' },
  { label: 'Active Shipments', value: String(activeShipments * 7), delta: '+8.2%', up: true, icon: Truck, tone: 'text-accent-600 bg-accent-50 dark:bg-accent-500/10' },
  { label: 'Revenue (6 mo)', value: formatINRShort(revenue * 12), delta: '+18.4%', up: true, icon: IndianRupee, tone: 'text-success-600 bg-success-50 dark:bg-success-500/10' },
  { label: 'Pending Payments', value: formatINRShort(pending * 8), delta: '-4.1%', up: false, icon: Clock, tone: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10' },
  { label: 'Transporters', value: String(transporters.length * 84), delta: '+5.7%', up: true, icon: Building2, tone: 'text-violet-600 bg-violet-50 dark:bg-violet-500/10' },
  { label: 'Truck Owners', value: String(truckOwners.length * 110), delta: '+9.3%', up: true, icon: Users, tone: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-500/10' },
  { label: 'Completed Deliveries', value: '1,02,540', delta: '+14.0%', up: true, icon: CheckCircle2, tone: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10' },
];

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <Card className="p-6">
      <div className="mb-5">
        <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>
      <div className="h-72">{children}</div>
    </Card>
  );
}

const tooltipStyle = {
  borderRadius: 12,
  border: '1px solid #e2e8f0',
  fontSize: 12,
  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
};

export default function Dashboard() {
  return (
    <>
      <PageHeader
        title="Logistics Dashboard"
        subtitle="Real-time overview of bookings, shipments, revenue, and fleet performance."
        crumbs={[{ label: 'Dashboard' }]}
      />

      <Container className="py-12">
        {/* KPI cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k) => (
            <Card key={k.label} hover className="p-5">
              <div className="flex items-start justify-between">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${k.tone}`}><k.icon size={20} /></span>
                <span className={`inline-flex items-center gap-0.5 text-xs font-bold ${k.up ? 'text-success-600' : 'text-red-500'}`}>
                  {k.up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{k.delta}
                </span>
              </div>
              <p className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white">{k.value}</p>
              <p className="text-sm text-slate-500">{k.label}</p>
            </Card>
          ))}
          {/* highlight card */}
          <Card className="relative overflow-hidden p-5 bg-gradient-to-br from-brand-800 to-brand-600 text-white border-brand-700">
            <div className="absolute -right-3 -bottom-3 opacity-20"><TrendingUp size={90} /></div>
            <TrendingUp size={20} />
            <p className="mt-4 text-2xl font-extrabold">98.2%</p>
            <p className="text-sm text-brand-100">On-Time Delivery Rate</p>
          </Card>
        </div>

        {/* Charts */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <ChartCard title="Monthly Revenue" subtitle="Revenue trend over the last 6 months">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue} margin={{ left: -8, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0f4c81" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#0f4c81" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => formatINRShort(Number(v))} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [formatINR(Number(v)), 'Revenue']} />
                <Area type="monotone" dataKey="revenue" stroke="#0f4c81" strokeWidth={2.5} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Shipment Trends" subtitle="Delivered vs in-transit shipments">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={shipmentTrends} margin={{ left: -16, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="delivered" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 3 }} name="Delivered" />
                <Line type="monotone" dataKey="inTransit" stroke="#ff6b35" strokeWidth={2.5} dot={{ r: 3 }} name="In Transit" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="State-Wise Bookings" subtitle="Top performing states by booking volume">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateWiseBookings} layout="vertical" margin={{ left: 24, right: 16, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="state" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={80} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(15,76,129,0.05)' }} />
                <Bar dataKey="bookings" fill="#0f4c81" radius={[0, 6, 6, 0]} barSize={18} name="Bookings" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Truck Utilization" subtitle="Current fleet status distribution">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={truckUtilization} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={3}>
                  {truckUtilization.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${Number(v)}%`, '']} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Recent bookings table */}
        <div className="mt-10">
          <SectionHeading title="Recent Bookings" />
          <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/60">
                <tr className="text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3">Booking ID</th><th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Route</th><th className="px-4 py-3">Truck</th>
                  <th className="px-4 py-3">Amount</th><th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                {bookings.slice(0, 8).map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-4 py-3.5 font-mono text-xs text-brand-600">{b.id}</td>
                    <td className="px-4 py-3.5 font-semibold text-slate-800 dark:text-slate-100">{b.customer}</td>
                    <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400">{b.source} → {b.destination}</td>
                    <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400">{b.truckType}</td>
                    <td className="px-4 py-3.5 font-semibold">{formatINR(b.amount)}</td>
                    <td className="px-4 py-3.5"><StatusBadge status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  );
}
