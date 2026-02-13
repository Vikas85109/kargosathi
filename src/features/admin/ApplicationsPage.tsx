import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBroker } from '../../context/BrokerContext';
import StatusBadge from '../../components/StatusBadge';
import type { AppStatus } from '../../types';

const statuses = ['all', 'submitted', 'under_review', 'approved', 'rejected', 'correction_required'] as const;

export default function ApplicationsPage() {
  const { applications } = useBroker();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name'>('newest');

  const filtered = applications
    .filter((a) => {
      const matchStatus = filter === 'all' || a.status === filter;
      const q = search.toLowerCase();
      const matchSearch = !q ||
        a.name?.toLowerCase().includes(q) ||
        a.companyName?.toLowerCase().includes(q) ||
        a.id?.toLowerCase().includes(q) ||
        a.city?.toLowerCase().includes(q) ||
        a.phone?.includes(q) ||
        a.gst?.toLowerCase().includes(q);
      return matchStatus && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return (a.name ?? '').localeCompare(b.name ?? '');
    });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Broker Applications</h1>
          <p className="text-sm text-slate-500 mt-0.5">{applications.length} total applications</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex gap-2 flex-wrap">
          {statuses.map((s) => {
            const count = s === 'all' ? applications.length : applications.filter((a) => a.status === s).length;
            return (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize
                  ${filter === s ? 'bg-violet-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                {s === 'all' ? 'All' : s.replace('_', ' ')}
                <span className="ml-1.5 opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
        <div className="sm:ml-auto">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, phone, company, GST, city..."
            className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent w-full sm:w-72" />
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-3">
              <svg className="w-7 h-7 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-slate-500">{applications.length === 0 ? 'No applications submitted yet' : 'No results match your search'}</p>
            <p className="text-xs text-slate-400 mt-0.5">{applications.length > 0 && 'Try a different search term or filter'}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {['Broker Details', 'Company / GST', 'Location', 'Commission', 'Submitted', 'Status', ''].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {a.name?.[0] ?? '?'}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{a.name}</p>
                          <p className="text-xs text-slate-400">+91 {a.phone} &middot; {a.email}</p>
                          <p className="text-xs text-slate-300 font-mono">{a.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-700">{a.companyName}</p>
                      <p className="text-xs text-slate-400 font-mono">{a.gst}</p>
                      <p className="text-xs text-slate-400">{a.businessType}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-slate-700">{a.city}</p>
                      <p className="text-xs text-slate-400">{a.routes?.length ?? 0} routes</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-700">{a.commissionPercent}%</p>
                      <p className="text-xs text-slate-400 capitalize">{a.commissionType?.replace('_', ' ')}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-slate-600 text-xs">{new Date(a.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                      <p className="text-xs text-slate-400">{new Date(a.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={a.status as AppStatus} /></td>
                    <td className="px-4 py-3">
                      <Link to={`/admin/broker/${a.id}`}
                        className="px-4 py-1.5 bg-violet-600 text-white rounded-lg text-xs font-semibold hover:bg-violet-700 transition-colors inline-block">
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 text-xs text-slate-400">
            Showing {filtered.length} of {applications.length} applications
          </div>
        )}
      </div>
    </div>
  );
}
