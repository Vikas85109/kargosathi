import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useBroker } from '../../context/BrokerContext';
import StatCard from '../../components/StatCard';
import StatusBadge from '../../components/StatusBadge';
import type { AppStatus } from '../../types';

export default function AdminDashboardPage() {
  const { applications } = useBroker();

  const total = applications.length;
  const submitted = applications.filter((a) => a.status === 'submitted').length;
  const underReview = applications.filter((a) => a.status === 'under_review').length;
  const approved = applications.filter((a) => a.status === 'approved').length;
  const rejected = applications.filter((a) => a.status === 'rejected').length;
  const correction = applications.filter((a) => a.status === 'correction_required').length;

  const pieData = [
    { name: 'Submitted', value: submitted, color: '#3b82f6' },
    { name: 'Under Review', value: underReview, color: '#f59e0b' },
    { name: 'Approved', value: approved, color: '#10b981' },
    { name: 'Rejected', value: rejected, color: '#ef4444' },
    { name: 'Correction', value: correction, color: '#f97316' },
  ].filter((d) => d.value > 0);

  // Recent 5 apps sorted by date
  const recent = [...applications].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  // Unique cities
  const cities = [...new Set(applications.map((a) => a.city).filter(Boolean))];
  // Unique business types
  const bizTypes = [...new Set(applications.map((a) => a.businessType).filter(Boolean))];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-800">Admin Dashboard</h1>
        <p className="text-sm text-slate-500 mt-0.5">Overview of all broker applications</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={'\uD83D\uDCCB'} label="Total Applications" value={total} color="blue" />
        <StatCard icon={'\u23F3'} label="Pending Review" value={submitted + underReview} color="amber" />
        <StatCard icon={'\u2705'} label="Approved" value={approved} color="emerald" />
        <StatCard icon={'\u274C'} label="Rejected" value={rejected} color="rose" />
      </div>

      {/* Charts + Quick Info */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-3">Application Status</h3>
          {pieData.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-sm text-slate-400">No applications yet</div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                    {pieData.map((e) => <Cell key={e.name} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {pieData.map((d) => (
                  <div key={d.name} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-xs text-slate-500">{d.name} ({d.value})</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Quick Insights */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-3">Quick Insights</h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Cities Covered ({cities.length})</p>
              <div className="flex flex-wrap gap-1.5">
                {cities.length === 0 ? <span className="text-xs text-slate-400">No data</span> :
                  cities.map((c) => (
                    <span key={c} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium">{c}</span>
                  ))
                }
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Business Types</p>
              <div className="flex flex-wrap gap-1.5">
                {bizTypes.length === 0 ? <span className="text-xs text-slate-400">No data</span> :
                  bizTypes.map((b) => (
                    <span key={b} className="px-2 py-0.5 bg-violet-50 text-violet-700 rounded text-xs font-medium">{b}</span>
                  ))
                }
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Correction Required</p>
              <p className="text-2xl font-bold text-orange-600">{correction}</p>
            </div>
          </div>
        </div>

        {/* Needs Attention */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-3">Needs Attention</h3>
          {submitted === 0 && underReview === 0 && correction === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm font-medium text-slate-700">All clear!</p>
              <p className="text-xs text-slate-400 mt-0.5">No pending actions</p>
            </div>
          ) : (
            <div className="space-y-3">
              {applications
                .filter((a) => ['submitted', 'under_review', 'correction_required'].includes(a.status))
                .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                .slice(0, 4)
                .map((a) => (
                  <Link key={a.id} to={`/admin/broker/${a.id}`} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100">
                    <div>
                      <p className="text-sm font-medium text-slate-700">{a.name}</p>
                      <p className="text-xs text-slate-400">{a.companyName}</p>
                    </div>
                    <StatusBadge status={a.status as AppStatus} />
                  </Link>
                ))
              }
            </div>
          )}
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">Recent Applications</h2>
          <Link to="/admin/applications" className="text-xs text-violet-600 hover:underline font-medium">View All</Link>
        </div>
        {applications.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-3">
              <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-sm font-medium text-slate-500">No applications yet</p>
            <p className="text-xs text-slate-400 mt-0.5">Broker applications will appear here once submitted</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {['Broker', 'Company / City', 'GST / PAN', 'Experience', 'Submitted', 'Status', ''].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recent.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-xs font-bold">{a.name?.[0]}</div>
                        <div>
                          <p className="font-medium text-slate-700">{a.name}</p>
                          <p className="text-xs text-slate-400">{a.phone} &middot; {a.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-slate-700 font-medium">{a.companyName}</p>
                      <p className="text-xs text-slate-400">{a.city}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs text-slate-600 font-mono">{a.gst}</p>
                      <p className="text-xs text-slate-400 font-mono">{a.pan}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{a.experience}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{new Date(a.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                    <td className="px-4 py-3"><StatusBadge status={a.status as AppStatus} /></td>
                    <td className="px-4 py-3">
                      <Link to={`/admin/broker/${a.id}`} className="px-3 py-1.5 bg-violet-50 text-violet-700 rounded-lg text-xs font-semibold hover:bg-violet-100 transition-colors">
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
